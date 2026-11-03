import { createFileRoute } from "@tanstack/react-router";
import { BuyerTools } from '@/components/account/BuyerTools';
import { useI18n } from '@/lib/i18n';


export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "AI Recommendations — GreenSwitch" },
      { name: "description", content: "Describe your business and current packaging and our AI advisor will suggest the best sustainable alternatives." },
      { property: "og:title", content: "AI Recommendations — GreenSwitch" },
      { property: "og:description", content: "Describe your business and current packaging and our AI advisor will suggest the best sustainable alternatives." },
    ],
  }),
  component: ToolPage,
});
function ToolPage(){const {t}=useI18n();return <div className="container-page py-12"><h1 className="text-4xl text-forest mb-8">{t.account.tools.advisor}</h1><BuyerTools initial="advisor"/></div>;}
