import { describe,it,expect } from 'vitest';
import { registrationSchema, dashboardPath } from '@/lib/account/rules';
const valid={account_type:'buyer',full_name:'Test Buyer',business_name:'Test Cafe',business_type:'Cafe',phone:'0599000000',city:'Nablus',description:'',email:'buyer@example.test',password:'Strong-Pass-42'};
describe('Account rules',()=>{
 it('allows buyer registration',()=>expect(registrationSchema.safeParse(valid).success).toBe(true));
 it('allows supplier registration',()=>expect(registrationSchema.safeParse({...valid,account_type:'supplier'}).success).toBe(true));
 it('rejects public admin registration',()=>expect(registrationSchema.safeParse({...valid,account_type:'admin'}).success).toBe(false));
 it('allows recycling company registration with cities and materials',()=>expect(registrationSchema.safeParse({...valid,account_type:'recycling',operating_cities:['hebron','ramallah'],accepted_materials:['paper','cardboard','aluminum']}).success).toBe(true));
 it('rejects recycling registration with unlisted materials',()=>expect(registrationSchema.safeParse({...valid,account_type:'recycling',accepted_materials:['plastic']}).success).toBe(false));
 it('sends buyers to their own dashboard',()=>expect(dashboardPath(['buyer'])).toBe('/dashboard/buyer'));
 it('sends suppliers to their own dashboard',()=>expect(dashboardPath(['supplier'])).toBe('/dashboard/supplier'));
 it('sends recycling companies to their own dashboard',()=>expect(dashboardPath(['recycling'])).toBe('/dashboard/recycling'));
 it('sends admins to their own dashboard',()=>expect(dashboardPath(['admin'])).toBe('/dashboard/admin'));
});
