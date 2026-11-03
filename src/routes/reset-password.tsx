import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/account/AuthForm';
export const Route=createFileRoute('/reset-password')({
 head:()=>({meta:[{title:'Reset password — GreenSwitch'},{name:'description',content:'Set a new GreenSwitch account password.'},{property:'og:title',content:'Reset password — GreenSwitch'},{property:'og:description',content:'Set a new GreenSwitch account password.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Page
});
function Page(){return <AuthForm mode="reset"/>;}
