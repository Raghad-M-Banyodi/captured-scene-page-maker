import { z } from 'zod';
import Decimal from 'decimal.js';
import { parseDiscounts } from './commerce';
export const advisorSchema=z.object({businessType:z.string().trim().min(1).max(100),packagedProduct:z.string().trim().min(1).max(150),temperature:z.enum(['hot','cold']),foodUse:z.boolean(),size:z.string().trim().min(1).max(100),monthlyQuantity:z.coerce.number().int().positive().max(1000000),currentPackaging:z.string().trim().min(1).max(150),currentPrice:z.coerce.number().nonnegative().max(999999).multipleOf(0.01),budget:z.coerce.number().nonnegative().max(999999999).multipleOf(0.01),priority:z.enum(['cost','durability','sustainability','balanced']),category:z.string().max(80),lang:z.enum(['en','ar']).default('en')});
export type AdvisorInput=z.infer<typeof advisorSchema>;
export const costSchema=z.object({currentPrice:z.coerce.number().nonnegative().max(999999).multipleOf(0.01),quantity:z.coerce.number().int().positive().max(1000000),productId:z.string().uuid(),tierQuantity:z.coerce.number().int().nonnegative().max(1000000).default(0)});
export const impactSchema=z.object({productId:z.string().uuid(),baselineGrams:z.coerce.number().positive().max(100000).multipleOf(0.001),quantity:z.coerce.number().int().positive().max(1000000),month:z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),orderId:z.string().uuid().optional()});
export type PricingProduct={id:string;price:number;moq:number;stock:number;price_unit:string;pack_size:number;volume_discounts:unknown};
export function costBreakdown(currentPrice:number,quantity:number,product:PricingProduct,tierQuantity=0){
 const packSize=product.price_unit==='pack'?product.pack_size:1;
 const purchaseQuantity=Math.max(product.moq,Math.ceil(quantity/packSize));
 const tiers=parseDiscounts(product.volume_discounts);const tier=tierQuantity?tiers.find(t=>t.min_quantity===tierQuantity):undefined;
 if(tierQuantity&&(!tier||purchaseQuantity<tier.min_quantity))throw new Error('Tier not eligible');
 const price=tier?.unit_price??product.price;
 const current=new Decimal(currentPrice).times(quantity);const alternative=new Decimal(price).times(purchaseQuantity);const difference=alternative.minus(current);
 return {currentMonthly:current.toNumber(),alternativeMonthly:alternative.toNumber(),monthlyDifference:difference.toNumber(),annualDifference:difference.times(12).toNumber(),percentageChange:current.isZero()?null:difference.div(current).times(100).toDecimalPlaces(4).toNumber(),purchaseQuantity,suppliedPieces:purchaseQuantity*packSize,unitPrice:price,packSize,available:purchaseQuantity<=product.stock};
}
export function impactCalculation(grams:number,quantity:number){const kg=new Decimal(grams).times(quantity).div(1000);return {units:quantity,kg:kg.toNumber(),annualKg:kg.times(12).toNumber(),annualUnits:quantity*12};}
export type AdvisorProduct=PricingProduct&{name_en:string;description_en:string;category_slug:string;material:string;sizes:string[];composition:string;non_plastic:boolean;status:string;is_demo:boolean};
export function recommendProducts(input:AdvisorInput,products:AdvisorProduct[]){return products.filter(p=>p.non_plastic&&!p.is_demo&&p.status==='published'&&p.material!=='pla'&&(!input.category||p.category_slug===input.category)).map(p=>{
 const pieces=p.price_unit==='pack'?p.pack_size:1;const purchaseQuantity=Math.max(p.moq,Math.ceil(input.monthlyQuantity/pieces));const tiers=parseDiscounts(p.volume_discounts).filter(t=>t.min_quantity<=purchaseQuantity).sort((a,b)=>b.min_quantity-a.min_quantity);const costs=costBreakdown(input.currentPrice,input.monthlyQuantity,p,tiers[0]?.min_quantity??0);
 const sizeMatch=p.sizes.some(s=>s.toLowerCase().includes(input.size.toLowerCase()));
 let score=sizeMatch?20:0;score+=input.priority==='cost'?100/(1+costs.alternativeMonthly):input.priority==='durability'&&['wood','cotton','beeswax'].includes(p.material)?10:input.priority==='sustainability'?5:10/(1+costs.alternativeMonthly);
 return {id:p.id,monthlyCost:costs.alternativeMonthly,purchaseQuantity:costs.purchaseQuantity,sizeMatch,score};
 }).filter(r=>r.monthlyCost<=input.budget&&r.purchaseQuantity<=(products.find(p=>p.id===r.id)?.stock??0)).sort((a,b)=>b.score-a.score||a.monthlyCost-b.monthlyCost).slice(0,5);}