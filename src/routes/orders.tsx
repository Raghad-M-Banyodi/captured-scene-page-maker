import { createFileRoute } from "@tanstack/react-router";
import { Orders } from '@/components/account/Orders';
import { useI18n } from '@/lib/i18n';

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Orders — GreenSwitch" },
      { name: "description", content: "View and track your orders and group purchases here." },
      { property: "og:title", content: "Orders — GreenSwitch" },
      { property: "og:description", content: "View and track your orders and group purchases here." },
    ],
  }),
  component: OrdersPage,
});
function OrdersPage(){const {t}=useI18n();return <div className="container-page py-12"><h1 className="text-4xl text-forest mb-8">{t.account.orders}</h1><Orders/></div>;}
