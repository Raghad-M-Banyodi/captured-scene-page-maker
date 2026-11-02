import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ComingSoon } from "@/components/site/ComingSoon";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "AI Recommendations — GreenSwitch" },
      { name: "description", content: "Describe your business and current packaging and our AI advisor will suggest the best sustainable alternatives." },
      { property: "og:title", content: "AI Recommendations — GreenSwitch" },
      { property: "og:description", content: "Describe your business and current packaging and our AI advisor will suggest the best sustainable alternatives." },
    ],
  }),
  component: () => (
    <ComingSoon icon={Sparkles} title={{ en: "AI Recommendations", ar: "التوصيات الذكية" }} text={{ en: "Describe your business and current packaging and our AI advisor will suggest the best sustainable alternatives.", ar: "صف عملك وتغليفك الحالي وسيقترح مستشارنا الذكي أفضل البدائل المستدامة." }} />
  ),
});
