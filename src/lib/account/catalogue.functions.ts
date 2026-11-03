import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
export const fetchCatalogue=createServerFn({method:'GET'}).handler(async()=>{
 const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_PUBLISHABLE_KEY'];
 if(!url||!key)throw new Error('Catalogue unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const [products,suppliers]=await Promise.all([client.from('products').select('*,product_images(*),product_sustainability_attributes(*)').eq('status','published').eq('is_demo',false).limit(1000),client.from('supplier_profiles').select('id,company_name,city,created_at,verification_status').eq('verification_status','approved').eq('is_demo',false).limit(1000)]);
 if(products.error)throw products.error;if(suppliers.error)throw suppliers.error;
 return {products:products.data??[],suppliers:suppliers.data??[]};
});
