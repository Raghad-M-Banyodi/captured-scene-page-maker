import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '@/components/account/AuthForm';
export const Route=createFileRoute('/signup')({
 validateSearch:(s:Record<string,unknown>):{role?:'buyer'|'supplier'}=>({role:s['role']==='supplier'?'supplier':s['role']==='buyer'?'buyer':undefined}),
 head:()=>({meta:[{title:'Create an account — GreenSwitch'},{name:'description',content:'Join GreenSwitch as a buyer or supplier.'},{property:'og:title',content:'Create an account — GreenSwitch'},{property:'og:description',content:'Join GreenSwitch as a buyer or supplier.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component:Page
});
function Page(){return <AuthForm mode="signup" initialRole={Route.useSearch().role}/>;}
