import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/group-buying")({
  head: () => ({
    meta: [
      { title: "Group Buying — GreenSwitch" },
      { name: "description", content: "Pool orders with nearby businesses to unlock volume pricing. Open group orders will appear here once accounts and ordering are live." },
      { property: "og:title", content: "Group Buying — GreenSwitch" },
      { property: "og:description", content: "Pool orders with nearby businesses to unlock volume pricing. Open group orders will appear here once accounts and ordering are live." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Users} title={{ en: "Group Buying", ar: "الشراء الجماعي" }} text={{ en: "Pool orders with nearby businesses to unlock volume pricing. Open group orders will appear here once accounts and ordering are live.", ar: "اجمع طلباتك مع أعمال قريبة للحصول على أسعار الجملة. ستظهر الطلبات الجماعية المفتوحة هنا عند تفعيل الحسابات والطلب." }} />
  ),
});
