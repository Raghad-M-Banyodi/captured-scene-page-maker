"""Admin security checks against an explicitly enabled disposable localhost database."""
import os,subprocess,json,uuid
if os.environ.get('GREENSWITCH_ADMIN_TEST_DB')!='true' or os.environ.get('PGHOST') not in ('127.0.0.1','localhost'):
 raise RuntimeError('Only explicitly enabled disposable localhost databases are permitted.')
def sql(q,ok=True):
 r=subprocess.run(['psql','-X','-At','-v','ON_ERROR_STOP=1','-c',q],capture_output=True,text=True)
 if ok and r.returncode:raise RuntimeError(r.stderr)
 return r
admin,buyer,supplier,partner=[str(uuid.uuid4()) for _ in range(4)]
for user,role in [(admin,'buyer'),(buyer,'buyer'),(supplier,'supplier'),(partner,'buyer')]:
 meta=json.dumps({'account_type':role,'full_name':'Isolated '+role,'business_name':'Isolated business','phone':'0599000000','city':'Nablus'})
 sql(f"INSERT INTO auth.users(id,raw_user_meta_data,email_confirmed_at) VALUES('{user}','{meta}',now())")
sql(f"INSERT INTO user_roles(user_id,role) VALUES('{admin}','admin')")
def as_user(user,q,ok=True):return sql(f"SELECT set_config('request.jwt.claim.sub','{user}',false);SET ROLE authenticated;{q}",ok)
def manage(user,action,payload):return as_user(user,f"SELECT admin_manage('{action}','{json.dumps(payload)}')").stdout.strip().splitlines()[-1]
for user in [buyer,supplier,partner]:
 assert as_user(user,'SELECT admin_session_allowed()').stdout.strip().splitlines()[-1]=='f'
 assert as_user(user,"SELECT admin_manage('settings','{}')",False).returncode
 assert as_user(user,'SELECT count(*) FROM admin_audit_log').stdout.strip().splitlines()[-1]=='0'
assert as_user(admin,'SELECT admin_session_allowed()').stdout.strip().splitlines()[-1]=='t'
assert json.loads(manage(admin,'account',dict(userId=buyer,status='suspended',reason='Isolated review')))['ok']
assert as_user(buyer,f"SELECT account_active('{buyer}');SELECT count(*) FROM profiles").stdout.strip().splitlines()[-2:]==['f','0']
assert as_user(buyer,f"SELECT request_cart_order('{uuid.uuid4()}','{{}}')",False).returncode
assert as_user(buyer,"SELECT recycling_action('redeem','{}')",False).returncode
assert as_user(buyer,"SELECT create_group_campaign('{}')",False).returncode
assert as_user(buyer,f"UPDATE profiles SET city='Test' WHERE id='{buyer}' RETURNING id").stdout.strip().splitlines()[-1]=='UPDATE 0'
assert json.loads(manage(admin,'account',dict(userId=buyer,status='active',reason='Cleared')))['ok']
assert as_user(buyer,f"SELECT account_active('{buyer}')").stdout.strip().splitlines()[-1]=='t'
assert not json.loads(manage(admin,'account',dict(userId=admin,status='suspended',reason='Forbidden')))['ok']
assert json.loads(manage(admin,'settings',dict(supportEmail='test@example.invalid',en='Isolated review',ar='اختبار')))['ok']
as_user(admin,f"SELECT recycling_action('partner','{json.dumps(dict(userId=partner,name='Isolated Recycler',approved=True))}')")
pid=sql(f"SELECT id FROM recycling_partners WHERE user_id='{partner}'").stdout.strip()
assert json.loads(manage(admin,'partner_areas',dict(id=pid,areas=['Nablus','Ramallah'])))['ok']
assert sql(f"SELECT operating_areas::text FROM recycling_partners WHERE id='{pid}'").stdout.strip()=='{Nablus,Ramallah}'
vid=str(uuid.uuid4());sql(f"INSERT INTO green_vouchers(id,user_id,percent,maximum_discount,expires_at,source_key) VALUES('{vid}','{buyer}',5,100,now()+interval '30 days','isolated-review')")
assert json.loads(manage(admin,'voucher_review',dict(id=vid,status='approved')))['ok']
assert sql(f"SELECT admin_review FROM green_vouchers WHERE id='{vid}'").stdout.strip()=='approved'
assert as_user(buyer,"INSERT INTO account_access(user_id,status) VALUES(gen_random_uuid(),'active')",False).returncode
assert as_user(buyer,"INSERT INTO user_roles(user_id,role) VALUES(gen_random_uuid(),'admin')",False).returncode
assert as_user(admin,"DELETE FROM admin_audit_log",False).returncode
assert int(sql(f"SELECT count(*) FROM admin_audit_log WHERE actor_id='{admin}' AND entity_type='account_access'").stdout)>=2
assert int(sql(f"SELECT count(*) FROM admin_audit_log WHERE actor_id='{admin}' AND outcome='failed'").stdout)>=1
assert as_user(buyer,'SELECT count(*) FROM platform_settings').stdout.strip().splitlines()[-1]=='0'
print('PASS: buyer/supplier/partner admin denial, explicit admin allowance, suspension blocks RLS and order/group/recycling RPCs, reactivation, self-suspension rejection, partner cities, voucher review, settings, immutable private success/failure audit')
