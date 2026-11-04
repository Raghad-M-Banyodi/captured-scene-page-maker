import {z} from 'zod';
export const supplierBenefitRules={featured:{points:500,days:7},analytics:{points:800,days:30}} as const;
export const benefitSchema=z.object({kind:z.enum(['featured','analytics']),productId:z.string().uuid().optional(),requestId:z.string().uuid()}).refine(v=>v.kind==='featured'?!!v.productId:!v.productId);