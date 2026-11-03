import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/components/account/Dashboard';
export const Route=createFileRoute('/_authenticated/dashboard/admin')({head:()=>({meta:[{title:'Admin Dashboard — GreenSwitch'},{name:'description',content:'Manage your GreenSwitch admin account.'},{property:'og:title',content:'Admin Dashboard — GreenSwitch'},{property:'og:description',content:'Manage your GreenSwitch admin account.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:()=> <Dashboard role="admin"/>});
