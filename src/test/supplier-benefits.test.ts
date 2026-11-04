import {describe,it,expect} from 'vitest';
import {supplierBenefitRules,benefitSchema} from '@/lib/account/supplier-benefits';
describe('Supplier benefit rules',()=>{
 it('features a product for 7 days at 500 points',()=>expect(supplierBenefitRules.featured).toEqual({points:500,days:7}));
 it('unlocks analytics for 30 days at 800 points',()=>expect(supplierBenefitRules.analytics).toEqual({points:800,days:30}));
 it('requires an actual product for featured benefits',()=>expect(benefitSchema.safeParse({kind:'featured',requestId:'11111111-1111-4111-8111-111111111111'}).success).toBe(false));
});