import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { deliverySchema } from './commerce';
export const requestOrder=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({requestId:z.string().uuid(),delivery:deliverySchema,voucherId:z.string().uuid().optional(),supplierId:z.string().uuid().optional()})).handler(async({data,context})=>{
 const result=await context.supabase.rpc('request_cart_with_voucher',{request_id:data.requestId,address:data.delivery,voucher:data.voucherId,supplier:data.supplierId});
 if(result.error)throw new Error('Order request could not be submitted. Check quantities and availability.');
 return result.data;
});
export const updateOrderStatus=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid(),status:z.enum(['accepted','rejected','processing','shipped','delivered','cancelled'])})).handler(async({data,context})=>{
 const result=await context.supabase.rpc('change_order_status',{order_id:data.id,next_status:data.status});
 if(result.error)throw new Error('Order update not permitted.');return {ok:true};
});