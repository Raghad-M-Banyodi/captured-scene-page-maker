import { createFileRoute } from "@tanstack/react-router";
import { BuyerTools } from '@/components/account/BuyerTools';
import { useI18n } from '@/lib/i18n';


export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Environmental Impact — GreenSwitch" },
      { name: "description", content: "Estimate plastic avoided using your baseline weights and track delivered packaging separately." },
      { property: "og:title", content: "Environmental Impact — GreenSwitch" },
      { property: "og:description", content: "Estimate plastic avoided using your baseline weights and track delivered packaging separately." },
    ],
  }),
  component: ToolPage,
});
function ToolPage(){const {t}=useI18n();return <div className="container-page py-12"><h1 className="text-4xl text-forest mb-8">{t.account.tools.impact}</h1><BuyerTools initial="impact"/></div>;}
