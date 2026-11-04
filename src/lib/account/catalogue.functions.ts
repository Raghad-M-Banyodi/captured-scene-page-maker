import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
export const fetchCatalogue=createServerFn({method:'GET'}).handler(async()=>{
 const url=process.env['SUPABASE_URL'];const key=process.env['SUPABASE_PUBLISHABLE_KEY'];
 if(!url||!key)throw new Error('Catalogue unavailable');
 const client=createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const headers=new Headers(init?.headers);if(key.startsWith('sb_')&&headers.get('Authorization')===`Bearer ${key}`)headers.delete('Authorization');headers.set('apikey',key);return fetch(input,{...init,headers});}}});
 const [products,suppliers]=await Promise.all([client.from('products').select('*,product_images(*),product_sustainability_attributes(*),product_documents(*)').eq('status','published').eq('is_demo',false).limit(1000),client.from('supplier_profiles').select('id,company_name,city,created_at,verification_status').eq('verification_status','approved').eq('is_demo',false).limit(1000)]);
 if(products.error)throw products.error;if(suppliers.error)throw suppliers.error;
 for(const product of products.data??[]){for(const image of product.product_images){if(image.storage_path){const r=await client.storage.from('product-media').createSignedUrl(image.storage_path,3600);image.url=r.data?.signedUrl??'';}}for(const doc of product.product_documents){const r=await client.storage.from('product-media').createSignedUrl(doc.storage_path,3600);Object.assign(doc,{url:r.data?.signedUrl??''});}}
 const featured=await client.rpc("featured_product_ids");if(featured.error)throw new Error("Featured products unavailable");
 return {featuredIds:featured.data??[],products:products.data??[],suppliers:suppliers.data??[],documents:(products.data??[]).flatMap(p=>p.product_documents.map(d=>({productId:p.id,name:d.file_name,url:(d as typeof d & {url?:string}).url??''})))};
});
