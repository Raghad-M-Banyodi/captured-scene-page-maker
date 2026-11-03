import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useI18n } from "@/lib/i18n";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "About Us — GreenSwitch" },
      { name: "description", content: "GreenSwitch is a Palestinian environmental technology initiative for sustainable procurement." },
      { property: "og:title", content: "About GreenSwitch" },
      { property: "og:description", content: "Supporting sustainable procurement and a greener Palestinian economy." },
    ],
  }),
  component: About,
});

const COPY = {
  en: {
    eyebrow: "About us", title: "A Palestinian initiative for a greener local economy",
    text: "GreenSwitch is an environmental technology startup helping businesses across Palestine replace single-use plastic with sustainable packaging — without the complexity or the cost penalty.",
    values: [
      ["Our mission", "Make sustainable packaging the easy, affordable default for every Palestinian business."],
      ["Local first", "We prioritise Palestinian manufacturers and distributors to keep value inside the local economy."],
      ["Honest impact", "We clearly separate estimates from verified data and never overstate environmental claims."],
    ],
  },
  ar: {
    eyebrow: "من نحن", title: "مبادرة فلسطينية من أجل اقتصاد محلي أكثر خضرة",
    text: "GreenSwitch شركة ناشئة في التكنولوجيا البيئية تساعد الأعمال في فلسطين على استبدال البلاستيك أحادي الاستخدام بتغليف مستدام — دون تعقيد أو تكلفة إضافية.",
    values: [
      ["رسالتنا", "جعل التغليف المستدام الخيار السهل والميسور لكل عمل فلسطيني."],
      ["المحلي أولاً", "نعطي الأولوية للمصنّعين والموزعين الفلسطينيين لإبقاء القيمة داخل الاقتصاد المحلي."],
      ["أثر صادق", "نفصل بوضوح بين التقديرات والبيانات الموثّقة ولا نبالغ في الادعاءات البيئية."],
    ],
  },
};

function About() {
  const { lang } = useI18n();
  const c = COPY[lang];
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} text={c.text} />
      <section className="container-page grid items-center gap-12 py-20 lg:grid-cols-2">
        <img src={hero} alt="" loading="lazy" width={1600} height={1200} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
        <div className="space-y-6">
          {c.values.map(([h, p]) => (
            <div key={h} className="border-s-2 border-primary ps-5">
              <h2 className="font-sans text-xl font-semibold text-forest">{h}</h2>
              <p className="mt-1 text-muted-foreground">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
