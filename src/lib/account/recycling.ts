import { z } from 'zod';
import Decimal from 'decimal.js';
export const materials = ['paper','cardboard','aluminum'] as const;
export const weightsSchema=z.record(z.enum(materials),z.number().positive().max(100000).multipleOf(.001)).refine(w=>Object.keys(w).length>0);
const id=z.string().uuid(), bool=z.boolean(), short=z.string().trim().min(1).max(150);
export const recyclingActionSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('submit'),payload:z.object({key:id,weights:weightsSchema,city:short.max(100),location:short.max(500)})}),
 z.object({action:z.literal('approve_business'),payload:z.object({userId:id,approved:bool})}),
 z.object({action:z.literal('partner'),payload:z.object({userId:id,name:short,approved:bool})}),
 z.object({action:z.literal('opt_out'),payload:z.object({participate:bool})}),
 z.object({action:z.literal('assign'),payload:z.object({id,partnerId:id})}),
 ...(['accept','reject'] as const).map(action=>z.object({action:z.literal(action),payload:z.object({id})})),
 z.object({action:z.literal('schedule'),payload:z.object({id,date:z.string().datetime({offset:true})})}),
 z.object({action:z.literal('collect'),payload:z.object({id,weights:weightsSchema})}),
 z.object({action:z.literal('verify'),payload:z.object({id,weights:weightsSchema,recycled:bool})}),
 z.object({action:z.literal('file'),payload:z.object({id,path:z.string().min(1).max(500),name:short.max(200),kind:z.enum(['photo','receipt','evidence'])})}),
 z.object({action:z.literal('redeem'),payload:z.object({key:id,points:z.number().int().positive()})}),
 z.object({action:z.literal('issue'),payload:z.object({key:id,userId:id,percent:z.number().int().min(1).max(100)})}),
 z.object({action:z.literal('apply'),payload:z.object({orderId:id,voucherId:id})}),
 z.object({action:z.literal('consent'),payload:z.object({supplierId:id,approved:bool})}),
 z.object({action:z.literal('finalize'),payload:z.object({period:z.string().regex(/^\d{4}-\d{2}-01$/)})}),
 z.object({action:z.literal('configure'),payload:z.object({rate:z.number().min(0).max(10000),rewards:z.array(z.object({points:z.number().int().positive(),percent:z.number().int().min(1).max(100)})).min(1).max(20),winners:z.tuple([z.number().int().min(1).max(100),z.number().int().min(1).max(100),z.number().int().min(1).max(100)]),days:z.number().int().min(1).max(365),cap:z.number().positive(),minimum:z.number().min(0)})})
]);
export type RecyclingAction=z.infer<typeof recyclingActionSchema>;
export const defaultRewards=[{points:100,percent:5},{points:250,percent:10},{points:500,percent:15}];
export const defaultWinners=[20,15,10];
export const verifiedPoints=(weights:unknown,rate=10)=>Object.values(weightsSchema.parse(weights)).reduce((s,n)=>s.plus(n),new Decimal(0)).times(rate).toNumber();
export const palestineMonth=(date:Date)=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Gaza',year:'numeric',month:'2-digit'}).format(date);
export const boardSchema=z.object({period:z.string(),rewardPercents:z.array(z.number()).default([20,15,10]),rankings:z.array(z.object({name:z.string(),kg:z.number(),rank:z.number()})),history:z.array(z.object({period:z.string(),winners:z.array(z.object({name:z.string(),kg:z.number(),rank:z.number()}))}))});
export type Board=z.infer<typeof boardSchema>;
