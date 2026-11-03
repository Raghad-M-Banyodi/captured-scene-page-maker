import {createServerFn} from '@tanstack/react-start';
import {createClient} from '@supabase/supabase-js';
import {z} from 'zod';
import {requireSupabaseAuth} from '@/integrations/supabase/auth-middleware';
import type {Database} from '@/integrations/supabase/types';
import {campaignSchema} from './group-buying';
import {deliverySchema} from './commerce';
export const fetchCampaigns=createServerFn({method:'GET'}).handler(async()=>{
 const url=process.env['SUPABASE_URL'],key=process.env['SUPABASE_PUBLISHABLE_KEY'];if(!url||!key)throw new Error('Campaigns unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const expire=await client.rpc('expire_group_campaigns');if(expire.error)throw new Error('Campaign refresh unavailable');
 const r=await client.from('group_buying_campaigns').select('*').neq('lifecycle','draft').order('closes_at');if(r.error)throw new Error('Campaigns unavailable');return r.data;
});
export const createCampaign=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(campaignSchema).handler(async({data,context})=>{const r=await context.supabase.rpc('create_group_campaign',{payload:data});if(r.error)throw new Error('Campaign details or supplier eligibility are invalid');return r.data;});
export const manageCampaign=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid(),action:z.enum(['activate','cancel'])})).handler(async({data,context})=>{const r=await context.supabase.rpc('manage_group_campaign',{cid:data.id,action:data.action});if(r.error)throw new Error('Campaign update not allowed');return r.data;});
export const joinCampaign=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(z.object({id:z.string().uuid(),quantity:z.number().int().positive().max(1000000),delivery:deliverySchema})).handler(async({data,context})=>{const r=await context.supabase.rpc('join_group_campaign',{cid:data.id,qty:data.quantity,address:data.delivery});if(r.error)throw new Error('Commitment failed. Check eligibility, deadline and capacity.');return r.data;});