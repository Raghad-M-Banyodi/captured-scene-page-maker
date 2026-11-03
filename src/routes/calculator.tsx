import { createFileRoute } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

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
  component: () => (
    <ComingSoon icon={Calculator} title={{ en: "Cost Calculator", ar: "حاسبة التكلفة" }} text={{ en: "Estimate your monthly packaging spend and compare the cost of switching.", ar: "قدّر إنفاقك الشهري على التغليف وقارن تكلفة التحوّل." }} />
  ),
});
