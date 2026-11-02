import { createFileRoute } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "Orders — GreenSwitch" },
      { name: "description", content: "View and track your orders and group purchases here." },
      { property: "og:title", content: "Orders — GreenSwitch" },
      { property: "og:description", content: "View and track your orders and group purchases here." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Package} title={{ en: "Orders", ar: "الطلبات" }} text={{ en: "View and track your orders and group purchases here.", ar: "اعرض طلباتك ومشترياتك الجماعية وتابعها هنا." }} />
  ),
});
