"""Clearly simulated QA records; refuses every non-local database.

Requires a disposable database loaded with all project migrations and minimal
auth/storage prerequisites. Never creates hosted accounts or fake certifications.
"""
import concurrent.futures
import json
import os
import subprocess
import uuid

if os.environ.get('GREENSWITCH_FINAL_QA_DB') != 'true' or os.environ.get('PGHOST') not in ('127.0.0.1', 'localhost'):
    raise RuntimeError('Explicitly enabled disposable localhost database required.')

def sql(query, ok=True):
    result = subprocess.run(['psql', '-X', '-At', '-v', 'ON_ERROR_STOP=1', '-c', query], capture_output=True, text=True)
    if ok and result.returncode:
        raise RuntimeError(result.stderr)
    return result

def value(query):
    return sql(query).stdout.strip().splitlines()[-1]

def as_user(user, query, ok=True):
    return sql(f"SELECT set_config('request.jwt.claim.sub','{user}',false); SET ROLE authenticated; {query}", ok)

def action(user, name, payload, ok=True):
    return as_user(user, f"SELECT recycling_action('{name}','{json.dumps(payload)}'::jsonb)", ok)

def manage(admin, name, payload):
    result = as_user(admin, f"SELECT admin_manage('{name}','{json.dumps(payload)}'::jsonb)")
    assert json.loads(result.stdout.strip().splitlines()[-1])['ok'], result.stdout

def signup(role):
    user = str(uuid.uuid4())
    meta = json.dumps(dict(account_type=role, full_name='SIMULATED QA contact', business_name='SIMULATED QA restaurant' if role == 'buyer' else 'SIMULATED QA supplier', business_type='restaurant', city='Nablus', phone='0599000000'))
    sql(f"INSERT INTO auth.users(id,raw_user_meta_data,email_confirmed_at) VALUES('{user}','{meta}',now())")
    assert value(f"SELECT count(*) FROM profiles WHERE id='{user}'") == '1'
    return user

admin = signup('buyer')
sql(f"INSERT INTO user_roles(user_id,role) VALUES('{admin}','admin')")
assert value("SELECT has_function_privilege('anon','public.recycling_rankings(date)','EXECUTE'),has_function_privilege('authenticated','public.recycling_rankings(date)','EXECUTE')") == 'f|f'
assert sql("SET ROLE anon; SELECT recycling_rankings(date_trunc('month',now())::date)",False).returncode
assert as_user(admin,"SELECT recycling_rankings(date_trunc('month',now())::date)",False).returncode
supplier = signup('supplier')
buyers = [signup('buyer') for _ in range(5)]
buyer = buyers[0]
partner = signup('buyer')
for user in buyers:
    action(admin, 'approve_business', dict(userId=user, approved=True))
sid = value(f"SELECT id FROM supplier_profiles WHERE user_id='{supplier}'")
as_user(supplier, f"UPDATE supplier_profiles SET verification_status='approved' WHERE id='{sid}'", False)
assert value(f"SELECT verification_status FROM supplier_profiles WHERE id='{sid}'") == 'pending'
draft = str(uuid.uuid4())
as_user(supplier, f"INSERT INTO products(id,supplier_id,name_en,name_ar,price,stock,moq,material,composition,non_plastic,status) VALUES('{draft}','{sid}','SIMULATED QA draft bowl','وعاء تجريبي',1.25,100,10,'kraft','Uncoated paper',true,'pending')")
assert value(f"SELECT status FROM products WHERE id='{draft}'") == 'pending'
assert as_user(supplier, f"UPDATE products SET status='published' WHERE id='{draft}'", False).returncode
assert value(f"SELECT status FROM products WHERE id='{draft}'") == 'pending'
assert value(f"SET ROLE anon; SELECT count(*) FROM products WHERE id='{draft}'") == '0'
as_user(admin, f"SELECT admin_verify_supplier('{sid}','approved')")
pid = str(uuid.uuid4())
as_user(supplier, f"INSERT INTO products(id,supplier_id,name_en,name_ar,price,stock,moq,material,composition,non_plastic,status) VALUES('{pid}','{sid}','SIMULATED QA paper container','علبة ورقية تجريبية',0.75,20000,500,'kraft','Uncoated paper',true,'pending')")
manage(admin, 'product', dict(id=pid, status='published'))
assert value(f"SET ROLE anon; SELECT count(*) FROM products WHERE id='{pid}'") == '1'
assert as_user(partner, f"SELECT admin_manage('product','{{\"id\":\"{pid}\",\"status\":\"rejected\"}}')", False).returncode

# Five simulated restaurants, 1,000 containers each, target 5,000, ILS 0.60.
payload = json.dumps(dict(productId=pid, title='SIMULATED QA campaign', groupPrice=0.6, target=5000, maximum=5000, startsAt=value("SELECT (now()-interval '1 day')::text"), deadline=value("SELECT (now()+interval '7 days')::text"), state='active'))
cid = as_user(supplier, f"SELECT create_group_campaign('{payload}')").stdout.strip().splitlines()[-1]
address = json.dumps(dict(name='SIMULATED QA contact', phone='0599000000', city='Nablus', address='SIMULATED QA location'))
def join(user):
    return as_user(user, f"SELECT join_group_campaign('{cid}',1000,'{address}')")
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
    list(pool.map(join, buyers))
join(buyer)
assert value(f"SELECT count(*) FROM orders WHERE campaign_id='{cid}'") == '0'
assert value(f"SELECT lifecycle FROM group_buying_campaigns WHERE id='{cid}'") == 'target_reached'
for user in buyers:
    as_user(user, f"SELECT confirm_group_commitment('{cid}')")
as_user(buyer, f"SELECT confirm_group_commitment('{cid}')")
assert value(f"SELECT count(*),sum(total),min(total),max(total) FROM orders WHERE campaign_id='{cid}'") == '5|3000.00|600.00|600.00'
assert value(f"SELECT stock FROM products WHERE id='{pid}'") == '15000'
assert as_user(partner, f"SELECT join_group_campaign('{cid}',1,'{address}')", False).returncode

# Supplier-specific cart request, retry, private readback, and fulfillment.
cart = str(uuid.uuid4())
as_user(buyer, f"INSERT INTO shopping_carts(id,user_id) VALUES('{cart}','{buyer}'); INSERT INTO cart_items(cart_id,product_id,quantity) VALUES('{cart}','{pid}',1000)")
key = str(uuid.uuid4())
oid = as_user(buyer, f"SELECT request_cart_order('{key}','{address}')").stdout.strip().splitlines()[-1]
assert as_user(buyer, f"SELECT request_cart_order('{key}','{address}')").stdout.strip().splitlines()[-1] == oid
assert value(f"SELECT total FROM orders WHERE id='{oid}'") == '750.00'
assert as_user(buyers[1], f"SELECT count(*) FROM orders WHERE id='{oid}'").stdout.strip().splitlines()[-1] == '0'
assert value(f"SELECT stock FROM products WHERE id='{pid}'") == '14000'

# Request, assigned company, receipt metadata, actual collected weight, independent verification.
action(admin, 'partner', dict(userId=partner, name='SIMULATED QA collection company', approved=True))
partner_id = value(f"SELECT id FROM recycling_partners WHERE user_id='{partner}'")
pickup = dict(key=str(uuid.uuid4()), weights={'paper':10,'cardboard':5}, city='Nablus', location='SIMULATED QA restaurant')
rid = json.loads(action(buyer, 'submit', pickup).stdout.strip().splitlines()[-1])['id']
action(buyer, 'submit', pickup)
assert action(buyer, 'submit', {**pickup, 'key':str(uuid.uuid4()), 'weights':{'plastic':10}}, False).returncode
action(admin, 'assign', dict(id=rid, partnerId=partner_id))
action(partner, 'accept', dict(id=rid))
action(partner, 'schedule', dict(id=rid, date=value("SELECT (now()+interval '1 day')::text")))
path = f'{rid}/SIMULATED-QA-receipt.pdf'
sql(f"INSERT INTO storage.objects(bucket_id,name,owner_id) VALUES('recycling-evidence','{path}','{partner}')")
action(partner, 'file', dict(id=rid,path=path,name='SIMULATED-QA-receipt.pdf',kind='receipt'))
action(partner, 'collect', dict(id=rid,weights={'paper':10,'cardboard':5}))
assert action(partner, 'verify', dict(id=rid,weights={'paper':10},recycled=False), False).returncode
action(admin, 'verify', dict(id=rid,weights={'paper':10,'cardboard':5},recycled=False))
action(admin, 'verify', dict(id=rid,weights={'paper':10,'cardboard':5},recycled=False))
assert value(f"SELECT sum(amount),count(*) FROM green_points_ledger WHERE user_id='{buyer}'") == '150.000|1'
board = json.loads(value('SET ROLE anon; SELECT recycling_public_board()'))
assert any(row['kg'] == 15 for row in board['rankings'])
assert all('user_id' not in row for row in board['rankings'])
action(buyer,'opt_out',dict(participate=False))
assert json.loads(value('SET ROLE anon; SELECT recycling_public_board()'))['rankings'] == []
action(buyer,'opt_out',dict(participate=True))
def redeem(_):
    return action(buyer,'redeem',dict(key=str(uuid.uuid4()),points=100),False)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    redemptions=list(pool.map(redeem,range(3)))
assert sum(result.returncode == 0 for result in redemptions) == 1
assert value(f"SELECT sum(amount) FROM green_points_ledger WHERE user_id='{buyer}'") == '50.000'

# A monthly winner voucher goes through independent review and supplier consent.
period = value("SELECT (date_trunc('month',now() AT TIME ZONE 'Asia/Gaza')-interval '1 month')::date")
sql(f"UPDATE recycling_requests SET verified_at=('{period}'::date+interval '10 days') WHERE id='{rid}'")
for user, kg in [(buyers[1],10),(buyers[2],5)]:
    sql(f"INSERT INTO recycling_requests(buyer_id,estimated_weights,actual_weights,city,location,status,verified_at,verified_kg,request_key) VALUES('{user}','{{\"paper\":{kg}}}','{{\"paper\":{kg}}}','Nablus','SIMULATED QA historical weight','verified','{period}'::date+interval '10 days',{kg},'{uuid.uuid4()}')")
action(admin, 'finalize', dict(period=period))
action(admin, 'finalize', dict(period=period))
assert value(f"SELECT count(*),string_agg(percent::text,',' ORDER BY percent DESC) FROM green_vouchers WHERE source_key LIKE 'monthly:{period}:%'") == '3|20,15,10'
vid = value(f"SELECT id FROM green_vouchers WHERE user_id='{buyer}' AND source_key='monthly:{period}:{buyer}'")
assert value(f"SELECT admin_review FROM green_vouchers WHERE id='{vid}'") == 'pending'
assert action(buyer, 'apply', dict(orderId=oid,voucherId=vid), False).returncode
manage(admin, 'voucher_review', dict(id=vid,status='approved'))
action(supplier, 'consent', dict(supplierId=sid,approved=True))
action(buyer, 'apply', dict(orderId=oid,voucherId=vid))
assert value(f"SELECT total,green_discount::numeric(12,2) FROM orders WHERE id='{oid}'") == '650.00|100.00'
as_user(supplier, f"SELECT change_order_status('{oid}','accepted')")

# Concrete bug regressions, run all three so pre-fix results identify each defect.
failures = []
replay = action(buyer, 'apply', dict(orderId=oid,voucherId=vid), False)
if replay.returncode:
    failures.append('voucher replay after supplier acceptance rejected')
assert value(f"SELECT total,green_discount::numeric(12,2) FROM orders WHERE id='{oid}'") == '650.00|100.00'
manage(admin, 'account', dict(userId=buyer,status='suspended',reason='SIMULATED QA suspension'))
revoke = action(admin, 'approve_business', dict(userId=buyer,approved=False), False)
if revoke.returncode:
    failures.append('cannot revoke recycling approval while buyer suspended')
manage(admin, 'account', dict(userId=buyer,status='active',reason='SIMULATED QA reactivation'))
if not revoke.returncode:
    assert action(buyer, 'submit', {**pickup,'key':str(uuid.uuid4())}, False).returncode
as_user(admin, f"SELECT admin_set_role('{buyers[3]}','supplier')")
if value(f"SELECT count(*) FROM supplier_profiles WHERE user_id='{buyers[3]}' AND verification_status='pending'") != '1':
    failures.append('supplier role grant has no pending supplier profile')

# Another closed month must remain distinct, and retries must not duplicate results.
older = value(f"SELECT ('{period}'::date-interval '1 month')::date")
action(admin,'finalize',dict(period=older)); action(admin,'finalize',dict(period=older))
assert value(f"SELECT count(*) FROM recycling_months WHERE period IN ('{period}','{older}')") == '2'
for state in ['processing','shipped','delivered']:
    as_user(supplier,f"SELECT change_order_status('{oid}','{state}')")
assert as_user(buyer,f"SELECT status FROM orders WHERE id='{oid}'").stdout.strip().splitlines()[-1] == 'delivered'
if failures:
    raise AssertionError('; '.join(failures))
print('PASS: SIMULATED local signup/approval, supplier product/public catalogue, five concurrent group buyers, exact ILS requests/stock/retries/private readback, paper/cardboard pickup/independent collection verification, 150 points once, live rankings, monthly top-three 20/15/10 vouchers once, independent review/consent/cap, progressed voucher replay, suspended approval revocation, pending supplier role provisioning and fulfillment.')