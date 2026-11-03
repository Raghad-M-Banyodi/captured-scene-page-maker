import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/account/AuthForm';
export const Route=createFileRoute('/login')({
 head:()=>({meta:[{title:'Log in — GreenSwitch'},{name:'description',content:'Access your GreenSwitch business account.'},{property:'og:title',content:'Log in — GreenSwitch'},{property:'og:description',content:'Access your GreenSwitch business account.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Page
});
function Page(){return <AuthForm mode="login"/>;}
