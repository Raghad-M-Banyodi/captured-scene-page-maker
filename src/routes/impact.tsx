import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Environmental Impact — GreenSwitch" },
      { name: "description", content: "Track estimated plastic avoided and items replaced, calculated from your real orders. Tracking starts when ordering goes live." },
      { property: "og:title", content: "Environmental Impact — GreenSwitch" },
      { property: "og:description", content: "Track estimated plastic avoided and items replaced, calculated from your real orders. Tracking starts when ordering goes live." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Leaf} title={{ en: "Environmental Impact", ar: "الأثر البيئي" }} text={{ en: "Track estimated plastic avoided and items replaced, calculated from your real orders. Tracking starts when ordering goes live.", ar: "تابع تقدير البلاستيك المُتجنَّب والقطع المستبدلة بناءً على طلباتك الحقيقية. يبدأ التتبع عند تفعيل الطلب." }} />
  ),
});
