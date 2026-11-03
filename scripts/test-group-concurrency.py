import subprocess,os,json,uuid,concurrent.futures
from pathlib import Path
ENV={**os.environ,'PGSSLMODE':'disable'}
if os.environ.get('GREENSWITCH_GROUP_TEST_DB')!='true' or os.environ.get('PGHOST') not in ('127.0.0.1','localhost'):
 raise RuntimeError('Requires explicitly enabled disposable local test database; hosted backends refused.')
BASE=['psql','-X','-At','-v','ON_ERROR_STOP=1','-c']
def sql(s,ok=True):
 r=subprocess.run(BASE+[s],env=ENV,capture_output=True,text=True)
 if ok and r.returncode:raise RuntimeError(r.stderr)
 return r
supplier=str(uuid.uuid4());sid=str(uuid.uuid4());pid=str(uuid.uuid4());buyers=[str(uuid.uuid4()) for _ in range(9)]
sql(f"INSERT INTO supplier_profiles VALUES('{sid}','{supplier}','approved',false); INSERT INTO products VALUES('{pid}','{sid}','Paper box','علبة',0.75,20000,500,'piece',1,'published',true,false,'kraft');")
for b in buyers:sql(f"INSERT INTO auth.users VALUES('{b}',now()); INSERT INTO profiles VALUES('{b}'); INSERT INTO user_roles VALUES('{b}','buyer');")
def campaign(target,maximum):
 payload=json.dumps(dict(productId=pid,title='Fictional isolated campaign',groupPrice=0.6,target=target,maximum=maximum,startsAt='2026-11-03T00:00:00Z',deadline='2026-11-10T00:00:00Z',state='active'))
 return sql(f"SELECT set_config('request.jwt.claim.sub','{supplier}',false); SELECT create_group_campaign('{payload}'::jsonb);").stdout.strip().splitlines()[-1]
address=json.dumps(dict(name='Fictional Test',phone='0599000000',city='Nablus',address='Isolated test street',notes='No live data'))
def join(c,b,q):return sql(f"SELECT set_config('request.jwt.claim.sub','{b}',false); SELECT join_group_campaign('{c}',{q},'{address}'::jsonb);",False)
c=campaign(5000,5000)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:results=list(ex.map(lambda b:join(c,b,1000),buyers[:5]))
assert all(r.returncode==0 for r in results),[r.stderr for r in results]
row=sql(f"SELECT committed_quantity,business_count,lifecycle FROM group_buying_campaigns WHERE id='{c}'; SELECT count(*),sum(total),min(total),max(total) FROM orders WHERE campaign_id='{c}';").stdout.strip().splitlines()
assert row==['5000|5|target_reached','5|3000.0|600.0|600.0'],row
assert join(c,buyers[0],1000).returncode==0
assert sql(f"SELECT count(*) FROM orders WHERE campaign_id='{c}'").stdout.strip()=='5'
print('Five concurrent restaurants: 5000 units, five requests, 600 ILS each; duplicate replay unchanged')
c2=campaign(2000,2000)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as ex:results=list(ex.map(lambda b:join(c2,b,1000),buyers[5:8]))
assert sum(r.returncode==0 for r in results)==2,[r.stderr for r in results]
assert sql(f"SELECT committed_quantity FROM group_buying_campaigns WHERE id='{c2}'").stdout.strip()=='2000'
print('Concurrent over-commitment: two accepted, one rejected; 2000 maximum preserved')
c3=campaign(2000,3000);assert join(c3,buyers[0],1000).returncode==0
before=int(sql(f"SELECT stock FROM products WHERE id='{pid}'").stdout)
sql(f"SELECT set_config('request.jwt.claim.sub','{supplier}',false); SELECT manage_group_campaign('{c3}','cancel');")
after=int(sql(f"SELECT stock FROM products WHERE id='{pid}'").stdout);assert after==before+1000
print('Cancellation: reserved 1000 units released')
c4=campaign(2000,3000);assert join(c4,buyers[0],1000).returncode==0
sql(f"UPDATE group_buying_campaigns SET closes_at=now()-interval '1 minute' WHERE id='{c4}'; SELECT expire_group_campaigns();")
assert sql(f"SELECT lifecycle FROM group_buying_campaigns WHERE id='{c4}'").stdout.strip()=='expired'
assert sql(f"SELECT commitment_status FROM group_buying_participants WHERE campaign_id='{c4}'").stdout.strip()=='released'
print('Expiration: commitment released, campaign expired')
sql(f"UPDATE orders SET status='delivered' WHERE campaign_id='{c}';")
assert sql(f"SELECT lifecycle FROM group_buying_campaigns WHERE id='{c}'").stdout.strip()=='completed'
print('All delivered at full capacity: campaign completed')
assert sql("SELECT has_table_privilege('authenticated','group_buying_participants','INSERT'),has_table_privilege('authenticated','group_buying_campaigns','UPDATE')").stdout.strip()=='f|f'
print('Direct buyer/supplier campaign writes revoked; verified RPCs remain the mutation boundary')
