import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/account/AuthForm';
export const Route=createFileRoute('/forgot-password')({
 head:()=>({meta:[{title:'Forgot password — GreenSwitch'},{name:'description',content:'Recover access to your GreenSwitch account.'},{property:'og:title',content:'Forgot password — GreenSwitch'},{property:'og:description',content:'Recover access to your GreenSwitch account.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Page
});
function Page(){return <AuthForm mode="forgot"/>;}
