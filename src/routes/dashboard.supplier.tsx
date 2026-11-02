import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/dashboard/supplier")({
  head: () => ({
    meta: [
      { title: "Supplier Dashboard — GreenSwitch" },
      { name: "description", content: "List products, manage inventory and receive group orders — after sign-in is connected." },
      { property: "og:title", content: "Supplier Dashboard — GreenSwitch" },
      { property: "og:description", content: "List products, manage inventory and receive group orders — after sign-in is connected." },
    ],
  }),
  component: () => (
    <ComingSoon icon={LayoutDashboard} title={{ en: "Supplier Dashboard", ar: "لوحة المورد" }} text={{ en: "List products, manage inventory and receive group orders — after sign-in is connected.", ar: "اعرض منتجاتك وأدر المخزون واستقبل الطلبات الجماعية — بعد ربط تسجيل الدخول." }} />
  ),
});
