import {describe,it,expect} from 'vitest';
import {weightsSchema,verifiedPoints,defaultRewards,defaultWinners,palestineMonth,recyclingActionSchema} from '../lib/account/recycling';
describe('recycling rules',()=>{
 it('accepts paper, cardboard and aluminum',()=>expect(weightsSchema.parse({paper:1,cardboard:2,aluminum:3})).toEqual({paper:1,cardboard:2,aluminum:3}));
 it('rejects plastic',()=>expect(weightsSchema.safeParse({plastic:1}).success).toBe(false));
 it('earns exactly 10 Green Points per verified kg',()=>expect(verifiedPoints({paper:10.25,aluminum:.75})).toBe(110));
 it('has 100 points for 5%',()=>expect(defaultRewards.find(x=>x.points===100)?.percent).toBe(5));
 it('has 250 points for 10%',()=>expect(defaultRewards.find(x=>x.points===250)?.percent).toBe(10));
 it('has 500 points for 15%',()=>expect(defaultRewards.find(x=>x.points===500)?.percent).toBe(15));
 it('awards top three 20%,15%,10%',()=>expect(defaultWinners).toEqual([20,15,10]));
 it('starts a new month at Palestine midnight',()=>expect(palestineMonth(new Date('2026-10-31T22:30:00Z'))).includes('11'));
 it('rejects empty and negative weights',()=>{expect(weightsSchema.safeParse({}).success).toBe(false);expect(weightsSchema.safeParse({paper:-1}).success).toBe(false);});
 it('requires independent verify input with actual weights',()=>expect(recyclingActionSchema.safeParse({action:'verify',payload:{id:'11111111-1111-4111-8111-111111111111',weights:{plastic:1},recycled:false}}).success).toBe(false));
});
