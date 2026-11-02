import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — GreenSwitch" },
      { name: "description", content: "Our privacy policy will be published before accounts go live." },
      { property: "og:title", content: "Privacy Policy — GreenSwitch" },
      { property: "og:description", content: "Our privacy policy will be published before accounts go live." },
    ],
  }),
  component: () => (
    <ComingSoon icon={ShieldCheck} title={{ en: "Privacy Policy", ar: "سياسة الخصوصية" }} text={{ en: "Our privacy policy will be published before accounts go live.", ar: "سيتم نشر سياسة الخصوصية قبل تفعيل الحسابات." }} />
  ),
});
