import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — GreenSwitch" },
      { name: "description", content: "Our terms of service will be published before ordering goes live." },
      { property: "og:title", content: "Terms of Service — GreenSwitch" },
      { property: "og:description", content: "Our terms of service will be published before ordering goes live." },
    ],
  }),
  component: () => (
    <ComingSoon icon={FileText} title={{ en: "Terms of Service", ar: "شروط الخدمة" }} text={{ en: "Our terms of service will be published before ordering goes live.", ar: "سيتم نشر شروط الخدمة قبل تفعيل الطلب." }} />
  ),
});
