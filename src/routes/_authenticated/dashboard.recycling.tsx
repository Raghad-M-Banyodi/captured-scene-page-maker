import {createFileRoute} from '@tanstack/react-router';
import {Recycling} from '@/components/account/Recycling';
import {useI18n} from '@/lib/i18n';
export const Route=createFileRoute('/_authenticated/dashboard/recycling')({head:()=>({meta:[{title:'Recycling Partner Dashboard — GreenSwitch'},{name:'description',content:'Manage assigned pickups, collection weights and private recycling evidence.'},{property:'og:title',content:'Recycling Partner Dashboard — GreenSwitch'},{property:'og:description',content:'Private assigned recycling jobs and collection history.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:PartnerPage});
function PartnerPage(){const {t}=useI18n();return <div className="container-page py-10 space-y-8"><h1 className="text-3xl text-forest">{t.account.recycling.partnerTitle}</h1><Recycling partnerMode/></div>;}
