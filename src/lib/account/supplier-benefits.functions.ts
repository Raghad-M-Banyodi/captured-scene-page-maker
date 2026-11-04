import {createServerFn} from '@tanstack/react-start';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import {benefitSchema} from './supplier-benefits';
export const redeemSupplierBenefit=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(benefitSchema).handler(async({data,context})=>{
 const r=await context.supabase.rpc('supplier_reward_redeem',{kind_value:data.kind,product:data.productId??null,request_id:data.requestId});
 if(r.error)throw new Error('Benefit not available');return r.data;
});
export const supplierAnalytics=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const s=await context.supabase.from('supplier_profiles').select('id').eq('user_id',context.userId).eq('verification_status','approved').single();if(s.error)throw new Error('Supplier required');
 const reward=await context.supabase.from('supplier_rewards').select('id').eq('supplier_id',s.data.id).eq('kind','analytics').gt('expires_at',new Date().toISOString()).limit(1);if(reward.error||!reward.data?.length)throw new Error('Analytics benefit required');
 const r=await context.supabase.from('orders').select('id,total,status,created_at,order_items(name_en,name_ar,quantity,unit_price,pack_size,price_unit)').eq('supplier_id',s.data.id).eq('is_demo',false);if(r.error)throw new Error('Analytics unavailable');return r.data;
});