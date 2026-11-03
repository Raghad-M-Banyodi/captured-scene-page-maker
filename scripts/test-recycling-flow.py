"""Run only on an explicitly enabled disposable local database containing recycling migrations."""
import os,subprocess,json,uuid,concurrent.futures
if os.environ.get('GREENSWITCH_RECYCLING_TEST_DB')!='true' or os.environ.get('PGHOST') not in ('127.0.0.1','localhost'):
 raise RuntimeError('Only an explicitly enabled disposable local database is permitted.')
def sql(query,ok=True):
 r=subprocess.run(['psql','-X','-At','-v','ON_ERROR_STOP=1','-c',query],capture_output=True,text=True)
 if ok and r.returncode:raise RuntimeError(r.stderr)
 return r
ids=[str(uuid.uuid4()) for _ in range(6)];buyer,admin,partner,other,b2,b3=ids
for i,x in enumerate(ids):
 sql(f"INSERT INTO profiles VALUES('{x}');INSERT INTO auth.users VALUES('{x}',now());INSERT INTO user_roles VALUES('{x}','{'admin' if i==1 else 'buyer'}');INSERT INTO business_profiles VALUES('{x}','Isolated fictional business {i}');")
def action(user,name,payload,ok=True):
 return sql(f"SELECT set_config('request.jwt.claim.sub','{user}',false);SET ROLE authenticated;SELECT recycling_action('{name}','{json.dumps(payload)}'::jsonb);",ok)
for b in [buyer,b2,b3]:action(admin,'approve_business',dict(userId=b,approved=True))
action(admin,'partner',dict(userId=partner,name='Isolated fictional recycler',approved=True))
pid=sql(f"SELECT id FROM recycling_partners WHERE user_id='{partner}'").stdout.strip()
assert action(buyer,'approve_business',dict(userId=buyer,approved=True),False).returncode
assert action(buyer,'submit',dict(key=str(uuid.uuid4()),weights={'plastic':10},city='Nablus',location='Test'),False).returncode
key=str(uuid.uuid4());payload=dict(key=key,weights={'paper':10,'cardboard':5,'aluminum':5},city='Nablus',location='Isolated test location')
res=action(buyer,'submit',payload);rid=json.loads(res.stdout.strip().splitlines()[-1])['id'];action(buyer,'submit',payload)
assert sql(f"SELECT count(*) FROM recycling_requests WHERE request_key='{key}'").stdout.strip()=='1'
assert sql(f"SELECT set_config('request.jwt.claim.sub','{other}',false);SET ROLE authenticated;SELECT count(*) FROM recycling_requests WHERE id='{rid}'").stdout.strip().splitlines()[-1]=='0'
action(admin,'assign',dict(id=rid,partnerId=pid));assert action(other,'accept',dict(id=rid),False).returncode
action(partner,'accept',dict(id=rid));action(partner,'schedule',dict(id=rid,date='2026-12-01T12:00:00Z'))
assert action(partner,'collect',dict(id=rid,weights={'paper':10}),False).returncode
path=f'{rid}/receipt.pdf';sql(f"INSERT INTO storage.objects(bucket_id,name,owner_id) VALUES('recycling-evidence','{path}','{partner}')")
action(partner,'file',dict(id=rid,path=path,name='receipt.pdf',kind='receipt'))
action(partner,'collect',dict(id=rid,weights={'paper':10,'cardboard':5,'aluminum':5}))
assert sql(f"SELECT count(*) FROM green_points_ledger WHERE user_id='{buyer}'").stdout.strip()=='0'
assert action(partner,'verify',dict(id=rid,weights={'paper':10},recycled=False),False).returncode
assert action(admin,'verify',dict(id=rid,weights={'paper':11},recycled=False),False).returncode
assert action(admin,'verify',dict(id=rid,weights={'paper':10},recycled=True),False).returncode
action(admin,'verify',dict(id=rid,weights={'paper':10,'cardboard':5,'aluminum':5},recycled=False));action(admin,'verify',dict(id=rid,weights={'paper':10},recycled=False))
assert sql(f"SELECT sum(amount),count(*) FROM green_points_ledger WHERE user_id='{buyer}'").stdout.strip()=='200.000|1'
assert sql(f"SELECT confirmed_recycled,verified_kg FROM recycling_requests WHERE id='{rid}'").stdout.strip()=='f|20'
board=json.loads(sql('SET ROLE anon;SELECT recycling_public_board()').stdout.strip().splitlines()[-1]);assert board['rankings'][0]['kg']==20
assert 'user_id' not in board['rankings'][0]
action(buyer,'opt_out',dict(participate=False));assert json.loads(sql('SET ROLE anon;SELECT recycling_public_board()').stdout.strip().splitlines()[-1])['rankings']==[]
action(buyer,'opt_out',dict(participate=True))
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as e:results=list(e.map(lambda _:action(buyer,'redeem',dict(key=str(uuid.uuid4()),points=100),False),range(3)))
assert sum(r.returncode==0 for r in results)==2
assert sql(f"SELECT sum(amount) FROM green_points_ledger WHERE user_id='{buyer}'").stdout.strip()=='0.000'
vid=sql(f"SELECT id FROM green_vouchers WHERE user_id='{buyer}' LIMIT 1").stdout.strip();sid=str(uuid.uuid4());oid=str(uuid.uuid4())
sql(f"INSERT INTO supplier_profiles VALUES('{sid}','{partner}','approved');INSERT INTO orders(id,buyer_id,supplier_id,status,total) VALUES('{oid}','{buyer}','{sid}','pending',5000)")
assert action(buyer,'apply',dict(orderId=oid,voucherId=vid),False).returncode
action(partner,'consent',dict(supplierId=sid,approved=True))
assert action(buyer,'apply',dict(orderId=oid,voucherId=vid),False).returncode
review=sql(f"SELECT set_config('request.jwt.claim.sub','{admin}',false);SET ROLE authenticated;SELECT admin_manage('voucher_review','{json.dumps(dict(id=vid,status='approved'))}'::jsonb)").stdout.strip().splitlines()[-1]
assert json.loads(review)['ok']
action(buyer,'apply',dict(orderId=oid,voucherId=vid));action(buyer,'apply',dict(orderId=oid,voucherId=vid))
assert sql(f"SELECT total,green_discount FROM orders WHERE id='{oid}'").stdout.strip()=='4900|100'
other_v=sql(f"SELECT id FROM green_vouchers WHERE user_id='{buyer}' AND id<>'{vid}' LIMIT 1").stdout.strip()
assert action(buyer,'apply',dict(orderId=oid,voucherId=other_v),False).returncode
# Historical results: independently verified fixture dates in disposable database only.
for b,kg in [(b2,15),(b3,10)]:
 sql(f"INSERT INTO recycling_requests(buyer_id,estimated_weights,actual_weights,city,location,status,verified_at,verified_kg,request_key) VALUES('{b}','{{\"paper\":{kg}}}','{{\"paper\":{kg}}}','Test','Test','verified','2026-10-15T12:00:00Z',{kg},'{uuid.uuid4()}')")
sql(f"UPDATE recycling_requests SET verified_at='2026-10-10T12:00:00Z' WHERE id='{rid}'")
action(admin,'finalize',dict(period='2026-10-01'));action(admin,'finalize',dict(period='2026-10-01'))
assert sql("SELECT count(*),string_agg(percent::text,',' ORDER BY percent DESC) FROM green_vouchers WHERE source_key LIKE 'monthly:%'").stdout.strip()=='3|20,15,10'
assert sql('SELECT count(*) FROM recycling_months').stdout.strip()=='1'
assert sql("SELECT has_table_privilege('authenticated','green_points_ledger','INSERT'),has_table_privilege('authenticated','recycling_requests','UPDATE')").stdout.strip()=='f|f'
print('PASS: buyer pickup, admin assignment, partner receipt/collection, independent verification, 200 points once, public board/opt-out, concurrent redemption, capped single-use supplier-approved voucher, monthly top three once, ownership and plastic rejection')
