import { queryOptions } from '@tanstack/react-query';
import { fetchCatalogue } from './catalogue.functions';
import { CATEGORIES, MATERIALS, type Product, type Supplier } from '@/data/products';
import { parseDiscounts } from './commerce';
import fallbackImage from '@/assets/hero.jpg';
function browserMediaUrl(url:string){if(!url)return '';try{const parsed=new URL(url);const browserBase=import.meta.env['VITE_SUPABASE_URL'];return browserBase&&parsed.pathname.includes('/storage/v1/object/sign/product-media/')?`${browserBase}${parsed.pathname}${parsed.search}`:url;}catch{return '';}}
export const catalogueOptions=queryOptions({queryKey:['catalogue'],queryFn:async()=>{
 const data=await fetchCatalogue();
 for(const p of data.products)for(const image of p.product_images)image.url=browserMediaUrl(image.url);
 for(const document of data.documents)document.url=browserMediaUrl(document.url);
 const suppliers:Supplier[]=data.suppliers.map(s=>({id:s.id,name:{en:s.company_name,ar:s.company_name},city:{en:s.city,ar:s.city},verified:true,since:Number(s.created_at.slice(0,4))}));
 const products:Product[]=data.products.filter(p=>suppliers.some(s=>s.id===p.supplier_id)).map(p=>({id:p.id,name:{en:p.name_en,ar:p.name_ar||p.name_en},description:{en:p.description_en,ar:p.description_ar||p.description_en},category:CATEGORIES.find(c=>c.id===p.category_slug)?.id??'other',material:MATERIALS.find(m=>m.id===p.material)?.id??'kraft',attributes:p.product_sustainability_attributes.map(a=>a.attribute as Product['attributes'][number]),price:Number(p.price),unit:p.price_unit==='pack'?{en:`per pack (${p.pack_size} pieces)`,ar:`للعبوة (${p.pack_size} قطعة)`}:{en:'per piece',ar:'للقطعة'},moq:p.moq,supplierId:p.supplier_id,image:p.product_images.sort((a,b)=>a.position-b.position)[0]?.url??fallbackImage,sizes:p.sizes,specs:[],certification:'none',plasticSavedG:0,stock:p.stock,composition:p.composition,volumeDiscounts:parseDiscounts(p.volume_discounts),images:p.product_images.map(i=>i.url).filter(Boolean),documents:data.documents.filter(d=>d.productId===p.id)}));products.sort((a,b)=>Number(data.featuredIds.includes(b.id))-Number(data.featuredIds.includes(a.id)));return {products,suppliers};
},staleTime:30000});
