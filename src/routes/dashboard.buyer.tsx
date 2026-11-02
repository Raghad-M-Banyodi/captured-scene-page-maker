import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/dashboard/buyer")({
  head: () => ({
    meta: [
      { title: "Buyer Dashboard — GreenSwitch" },
      { name: "description", content: "Manage orders, saved products and your impact — after sign-in is connected." },
      { property: "og:title", content: "Buyer Dashboard — GreenSwitch" },
      { property: "og:description", content: "Manage orders, saved products and your impact — after sign-in is connected." },
    ],
  }),
  component: () => (
    <ComingSoon icon={LayoutDashboard} title={{ en: "Buyer Dashboard", ar: "لوحة المشتري" }} text={{ en: "Manage orders, saved products and your impact — after sign-in is connected.", ar: "أدر طلباتك ومنتجاتك المحفوظة وأثرك — بعد ربط تسجيل الدخول." }} />
  ),
});
