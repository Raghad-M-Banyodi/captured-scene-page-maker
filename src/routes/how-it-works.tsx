import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Scale, Sparkles, Coins, Users, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "How It Works — GreenSwitch" },
      { name: "description", content: "Discover, compare and buy sustainable packaging — individually or through group orders." },
      { property: "og:title", content: "How GreenSwitch Works" },
      { property: "og:description", content: "From product discovery to impact tracking in one platform." },
    ],
  }),
  component: HowPage,
});

const BLOCKS = [
  { icon: Search, en: ["Product discovery", "Browse a curated catalogue of sustainable packaging grouped by category, material and sustainability attributes."], ar: ["اكتشاف المنتجات", "تصفّح كتالوجاً منسقاً من التغليف المستدام مصنفاً حسب الفئة والمادة والخصائص البيئية."], live: true },
  { icon: Scale, en: ["Supplier comparison", "See prices in shekels, minimum order quantities and verification status side by side."], ar: ["مقارنة الموردين", "اطّلع على الأسعار بالشيكل والحد الأدنى للطلب وحالة التوثيق جنباً إلى جنب."], live: true },
  { icon: Sparkles, en: ["AI-assisted recommendations", "Describe your business and current packaging; get matched alternatives with reasons."], ar: ["توصيات بمساعدة الذكاء الاصطناعي", "صف عملك وتغليفك الحالي واحصل على بدائل مطابقة مع الأسباب."], live: false },
  { icon: Coins, en: ["Cost optimization", "Estimate monthly packaging spend and find the most affordable switch for your volumes."], ar: ["تحسين التكلفة", "قدّر إنفاقك الشهري على التغليف واعثر على أوفر بديل لكمياتك."], live: false },
  { icon: Users, en: ["Group purchasing", "Join nearby businesses in pooled orders to reach volume pricing tiers."], ar: ["الشراء الجماعي", "انضم إلى أعمال قريبة في طلبات مجمّعة للوصول إلى أسعار الجملة."], live: false },
  { icon: LineChart, en: ["Environmental impact tracking", "Each order updates an estimate of plastic avoided and items replaced."], ar: ["تتبع الأثر البيئي", "يحدّث كل طلب تقديراً للبلاستيك المُتجنَّب والقطع المستبدلة."], live: false },
];

function HowPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader eyebrow={t.how.eyebrow} title={t.how.title} />
      <section className="container-page grid gap-6 py-20 md:grid-cols-2 lg:grid-cols-3">
        {BLOCKS.map((b) => (
          <article key={b.en[0]} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><b.icon className="h-6 w-6" /></span>
              {!b.live && <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold text-accent-foreground">{t.comingSoon}</span>}
            </div>
            <h2 className="mt-6 font-sans text-xl font-semibold">{b[lang][0]}</h2>
            <p className="mt-2 text-muted-foreground">{b[lang][1]}</p>
          </article>
        ))}
      </section>
      <div className="container-page pb-24 text-center"><Button size="lg" asChild><Link to="/marketplace">{t.hero.cta1}</Link></Button></div>
    </>
  );
}
