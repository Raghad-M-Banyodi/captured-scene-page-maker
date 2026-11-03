import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { readIdentity } from '@/lib/account/session';
export const Route=createFileRoute('/_authenticated')({ssr:false,beforeLoad:async()=>{const identity=await readIdentity();if(!identity.user)throw redirect({to:'/auth'});return {identity};},component:Outlet});
