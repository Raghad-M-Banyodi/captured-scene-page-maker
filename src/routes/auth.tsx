import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/account/AuthForm';
export const Route=createFileRoute('/auth')({
 head:()=>({meta:[{title:'Sign in — GreenSwitch'},{name:'description',content:'Secure access to GreenSwitch dashboards.'},{property:'og:title',content:'Sign in — GreenSwitch'},{property:'og:description',content:'Secure access to GreenSwitch dashboards.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Page
});
function Page(){return <AuthForm mode="login"/>;}
