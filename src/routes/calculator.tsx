import { createFileRoute } from "@tanstack/react-router";
import { BuyerTools } from '@/components/account/BuyerTools';
import { useI18n } from '@/lib/i18n';


export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Cost Calculator — GreenSwitch" },
      { name: "description", content: "Estimate your monthly packaging spend and compare the cost of switching." },
      { property: "og:title", content: "Cost Calculator — GreenSwitch" },
      { property: "og:description", content: "Estimate your monthly packaging spend and compare the cost of switching." },
    ],
  }),
  component: ToolPage,
});
function ToolPage(){const {t}=useI18n();return <div className="container-page py-12"><h1 className="text-4xl text-forest mb-8">{t.account.tools.calculator}</h1><BuyerTools initial="cost"/></div>;}
