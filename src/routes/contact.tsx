import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Contact — GreenSwitch" },
      { name: "description", content: "A contact form is coming soon. We'd love to hear from businesses and suppliers." },
      { property: "og:title", content: "Contact — GreenSwitch" },
      { property: "og:description", content: "A contact form is coming soon. We'd love to hear from businesses and suppliers." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Mail} title={{ en: "Contact", ar: "تواصل معنا" }} text={{ en: "A contact form is coming soon. We'd love to hear from businesses and suppliers.", ar: "نموذج التواصل قادم قريباً. يسعدنا التواصل مع الأعمال والموردين." }} />
  ),
});
