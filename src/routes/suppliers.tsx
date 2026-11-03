import { createFileRoute } from "@tanstack/react-router";
import { Factory } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/suppliers")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Suppliers — GreenSwitch" },
      { name: "description", content: "A directory of verified sustainable packaging suppliers across Palestine is on the way." },
      { property: "og:title", content: "Suppliers — GreenSwitch" },
      { property: "og:description", content: "A directory of verified sustainable packaging suppliers across Palestine is on the way." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Factory} title={{ en: "Suppliers", ar: "الموردون" }} text={{ en: "A directory of verified sustainable packaging suppliers across Palestine is on the way.", ar: "دليل الموردين الموثّقين للتغليف المستدام في فلسطين قادم قريباً." }} />
  ),
});
