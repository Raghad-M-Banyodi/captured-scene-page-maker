import {z} from 'zod';
const id=z.string().uuid();
export const adminActionSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('supplier'),payload:z.object({id,status:z.enum(['approved','rejected']),reason:z.string().trim().max(500).default('')})}),
 z.object({action:z.literal('account'),payload:z.object({userId:id,status:z.enum(['active','pending','rejected','suspended']),reason:z.string().trim().max(500)})}),
 z.object({action:z.literal('partner_areas'),payload:z.object({id,areas:z.array(z.string().trim().min(1).max(100)).max(30)})}),
 z.object({action:z.literal('product'),payload:z.object({id,status:z.enum(['published','rejected','pending']),reason:z.string().trim().max(500).default('')})}),
 z.object({action:z.literal('voucher_review'),payload:z.object({id,status:z.enum(['approved','rejected']),fundingSource:z.enum(['platform','supplier']).optional()})}),
 z.object({action:z.literal('settings'),payload:z.object({supportEmail:z.union([z.literal(''),z.string().email().max(255)]),en:z.string().max(500),ar:z.string().max(500)})})
]);
export type AdminAction=z.infer<typeof adminActionSchema>;
export const canAdmin=(roles:string[],active=true)=>active&&roles.includes('admin');
