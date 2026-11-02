import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — GreenSwitch" },
      { name: "description", content: "Verify suppliers, moderate listings and monitor the platform." },
      { property: "og:title", content: "Admin Dashboard — GreenSwitch" },
      { property: "og:description", content: "Verify suppliers, moderate listings and monitor the platform." },
    ],
  }),
  component: () => (
    <ComingSoon icon={ShieldCheck} title={{ en: "Admin Dashboard", ar: "لوحة الإدارة" }} text={{ en: "Verify suppliers, moderate listings and monitor the platform.", ar: "وثّق الموردين وراجع المنتجات وراقب المنصة." }} />
  ),
});
