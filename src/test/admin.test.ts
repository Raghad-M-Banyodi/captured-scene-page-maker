import {describe,it,expect} from 'vitest';
import {canAdmin,adminActionSchema} from '../lib/account/admin';
describe('explicit administrator access',()=>{
 it('denies buyers',()=>expect(canAdmin(['buyer'])).toBe(false));
 it('denies suppliers',()=>expect(canAdmin(['supplier'])).toBe(false));
 it('denies recycling partners',()=>expect(canAdmin(['recycling_partner'])).toBe(false));
 it('permits explicit active administrators',()=>expect(canAdmin(['admin'])).toBe(true));
 it('denies inactive administrators',()=>expect(canAdmin(['admin'],false)).toBe(false));
 it('accepts only bounded operating areas',()=>expect(adminActionSchema.safeParse({action:'partner_areas',payload:{id:'11111111-1111-4111-8111-111111111111',areas:['Nablus','Ramallah']}}).success).toBe(true));
 it('rejects invalid account statuses',()=>expect(adminActionSchema.safeParse({action:'account',payload:{userId:'11111111-1111-4111-8111-111111111111',status:'self-admin',reason:''}}).success).toBe(false));
});
