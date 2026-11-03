import { createFileRoute } from "@tanstack/react-router";
import { GroupBuying } from '@/components/account/GroupBuying';
import { useI18n } from '@/lib/i18n';

export const Route = createFileRoute("/group-buying")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Group Buying — GreenSwitch" },
      { name: "description", content: "Combine real packaging commitments to unlock supplier discounts and purchase requests." },
      { property: "og:title", content: "Group Buying — GreenSwitch" },
      { property: "og:description", content: "Combine real packaging commitments to unlock supplier discounts and purchase requests." },
    ],
  }),
  component: GroupPage,
});
function GroupPage(){const {t}=useI18n();return <div className="container-page py-12"><h1 className="text-4xl text-forest mb-8">{t.account.campaign.title}</h1><GroupBuying/></div>;}
