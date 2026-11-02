import { createFileRoute } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — GreenSwitch" },
      { name: "description", content: "Your cart will be available once ordering is connected." },
      { property: "og:title", content: "Shopping Cart — GreenSwitch" },
      { property: "og:description", content: "Your cart will be available once ordering is connected." },
    ],
  }),
  component: () => (
    <ComingSoon icon={ShoppingCart} title={{ en: "Shopping Cart", ar: "سلة التسوق" }} text={{ en: "Your cart will be available once ordering is connected.", ar: "ستتوفر سلتك عند ربط نظام الطلب." }} />
  ),
});
