import { z } from 'zod';
export const accountType = z.enum(['buyer', 'supplier', 'recycling']);
export const materialType = z.enum(['paper', 'cardboard', 'aluminum']);
export const registrationSchema = z.object({ account_type: accountType, full_name: z.string().trim().min(1).max(100), business_name: z.string().trim().min(1).max(150), business_type: z.string().trim().max(100), phone: z.string().trim().min(5).max(30), city: z.string().trim().min(1).max(100), description: z.string().trim().max(2000), operating_cities: z.array(z.string().trim().min(1).max(100)).max(20).default([]), accepted_materials: z.array(materialType).max(3).default([]), email: z.string().trim().email().max(255), password: z.string().min(8).max(128) });
export const loginSchema = z.object({ email: z.string().trim().email().max(255), password: z.string().min(1).max(128) });
export type AppRole = 'buyer' | 'supplier' | 'admin' | 'recycling';
export const dashboardPath = (roles: AppRole[]) => roles.includes('admin') ? '/dashboard/admin' as const : roles.includes('supplier') ? '/dashboard/supplier' as const : roles.includes('recycling') ? '/dashboard/recycling' as const : '/dashboard/buyer' as const;
