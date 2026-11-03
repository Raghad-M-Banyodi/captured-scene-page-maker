import {describe,it,expect} from 'vitest';
import {campaignSchema,groupProgress,commitmentAllowed,commitmentSavings} from '@/lib/account/group-buying';
describe('Group-buying rules',()=>{
 it('five restaurants each committing 1000 reach a 5000 target',()=>{const committed=Array.from({length:5},()=>1000).reduce((a,b)=>a+b,0);expect(groupProgress(committed,5000,5000)).toEqual({percent:100,remaining:0,capacity:0,reached:true});});
 it('rejects commitments exceeding remaining maximum or stock',()=>{expect(commitmentAllowed(1000,4000,5000,1000)).toBe(true);expect(commitmentAllowed(1001,4000,5000,2000)).toBe(false);expect(commitmentAllowed(1000,0,5000,999)).toBe(false);expect(commitmentAllowed(1.5,0,5000,100)).toBe(false);});
 it('keeps progress and remaining quantities bounded',()=>{expect(groupProgress(1000,5000,6000)).toEqual({percent:20,remaining:4000,capacity:5000,reached:false});expect(groupProgress(5500,5000,6000).percent).toBe(100);});
 it('calculates agreed ILS savings accurately',()=>expect(commitmentSavings(0.75,0.6,1000)).toBe(150));
 it('requires valid target capacity and ordered dates',()=>{const valid={productId:'11111111-1111-4111-8111-111111111111',title:'Paper containers',groupPrice:0.6,target:5000,maximum:5000,startsAt:'2026-11-03T11:00:00Z',deadline:'2026-11-10T11:00:00Z',state:'active'};expect(campaignSchema.safeParse(valid).success).toBe(true);expect(campaignSchema.safeParse({...valid,maximum:4999}).success).toBe(false);expect(campaignSchema.safeParse({...valid,deadline:'2026-11-01T11:00:00Z'}).success).toBe(false);});
});