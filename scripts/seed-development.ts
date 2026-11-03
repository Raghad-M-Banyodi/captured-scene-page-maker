// Development-only seeding. Never accepts a hosted backend URL.
import { createClient } from '@supabase/supabase-js';
const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_SERVICE_ROLE_KEY'];
if(!url||!key||!['localhost','127.0.0.1','supabase_kong'].includes(new URL(url).hostname)||process.env['GREENSWITCH_TEST_BACKEND']!=='true')throw new Error('Seed requires an isolated local test backend and GREENSWITCH_TEST_BACKEND=true. Live seeding is refused.');
const client=createClient(url,key,{auth:{persistSession:false}});
const supplierId='11111111-1111-4111-8111-111111111111';
const supplier=await client.from('supplier_profiles').upsert({id:supplierId,company_name:'DEMO DATA — Olive Leaf Packaging (fictional)',city:'Nablus',description:'Fictional demonstration supplier. No environmental certifications.',verification_status:'approved',is_demo:true});
if(supplier.error)throw supplier.error;
const sample=[['22222222-2222-4222-8222-222222222222','DEMO DATA — Kraft takeaway carton','علبة كرافت تجريبية','boxes','cardboard',0.75,200,3000],['33333333-3333-4333-8333-333333333333','DEMO DATA — Paper shopping bag','كيس ورقي تجريبي','paper-bags','kraft',0.4,500,5000],['44444444-4444-4444-8444-444444444444','DEMO DATA — Wooden cutlery set','أدوات مائدة خشبية تجريبية','cutlery','wood',0.3,1000,8000]] as const;
for(const [id,name_en,name_ar,category_slug,material,price,moq,stock] of sample){const r=await client.from('products').upsert({id,supplier_id:supplierId,name_en,name_ar,category_slug,material,price,moq,stock,status:'published',is_demo:true,description_en:'Fictional demonstration record. No environmental certifications.',non_plastic:true,composition:material==='wood'?'100% untreated wood':'100% paper fibre; no plastic coating',price_unit:'piece',volume_discounts:[{min_quantity:moq*2,unit_price:Math.round(price*90)/100}]});if(r.error)throw r.error;}
console.log('Created 1 fictional DEMO DATA supplier and 3 DEMO DATA products in the isolated test backend.');
