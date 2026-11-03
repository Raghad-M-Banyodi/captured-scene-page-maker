import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/account/Dashboard';
export const Route=createFileRoute('/_authenticated/dashboard/buyer')({head:()=>({meta:[{title:'Buyer Dashboard — GreenSwitch'},{name:'description',content:'Manage your GreenSwitch buyer account.'},{property:'og:title',content:'Buyer Dashboard — GreenSwitch'},{property:'og:description',content:'Manage your GreenSwitch buyer account.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <Dashboard role="buyer"/>});
