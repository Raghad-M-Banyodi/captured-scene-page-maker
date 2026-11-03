import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { recyclingActionSchema,boardSchema } from './recycling';
export const recyclingAction=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(recyclingActionSchema).handler(async({data,context})=>{const r=await context.supabase.rpc('recycling_action',{action:data.action,payload:data.payload});if(r.error)throw new Error('Recycling action not permitted');return r.data;});
export const getRecyclingBoard=createServerFn({method:'GET'}).handler(async()=>{
 const url=process.env['SUPABASE_URL'],key=process.env['SUPABASE_PUBLISHABLE_KEY'];if(!url||!key)throw new Error('Rankings unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const r=await client.rpc('recycling_public_board');if(r.error)throw new Error('Rankings unavailable');return boardSchema.parse(r.data);
});
