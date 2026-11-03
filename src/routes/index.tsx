import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Users, Leaf, Search, Scale, ShoppingBag, LineChart, Building2, Store, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, DemoBadge } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/PageHeader";
import { useI18n, formatILS } from "@/lib/i18n";
import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogueOptions } from "@/lib/account/catalogue";
import { CATEGORIES } from "@/data/products";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  loader:({context})=>context.queryClient.ensureQueryData(catalogueOptions),
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "GreenSwitch — Smarter Packaging. Greener Business." },
      { name: "description", content: "Discover sustainable packaging, compare trusted Palestinian suppliers and buy together for better prices." },
      { property: "og:title", content: "GreenSwitch — Smarter Packaging. Greener Business." },
      { property: "og:description", content: "Sustainable packaging B2B marketplace for businesses in Palestine." },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const {data:{products:PRODUCTS,suppliers}}=useSuspenseQuery(catalogueOptions);
  const steps = [
    { icon: Building2, t: t.how.s1, d: t.how.s1t },
    { icon: Search, t: t.how.s2, d: t.how.s2t },
    { icon: Scale, t: t.how.s3, d: t.how.s3t },
    { icon: ShoppingBag, t: t.how.s4, d: t.how.s4t },
    { icon: LineChart, t: t.how.s5, d: t.how.s5t },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-hero relative overflow-hidden text-forest-foreground">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="fade-up">
            <p className="eyebrow !text-lime">{t.hero.eyebrow}</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] md:text-7xl">
              {t.hero.title1}
              <br />
              <span className="italic text-lime rtl:not-italic">{t.hero.title2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-forest-foreground/75">{t.hero.text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/marketplace">{t.hero.cta1} <ArrowRight className="rtl:-scale-x-100" /></Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/recommendations"><Sparkles /> {t.hero.cta2}</Link>
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-forest-foreground/15 pt-6">
              {[[String(CATEGORIES.length), t.hero.stat1], [String(suppliers.length), t.account.suppliers], ["₪", t.hero.stat3]].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl text-lime">{v}</dd>
                  <dd className="mt-1 text-xs text-forest-foreground/60">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative fade-up [animation-delay:150ms]">
            <img src={hero} alt="Kraft cups, bagasse containers, paper bags and wooden cutlery" width={1600} height={1200} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-lift" />
            <div className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl bg-card p-4 text-card-foreground shadow-lift">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary"><Recycle className="h-5 w-5" /></span>
              <div>
                <div className="text-sm font-semibold">{t.hero.plasticFree}</div>
                <div className="text-xs text-muted-foreground">{t.hero.curated}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow={t.intro.eyebrow} title={t.intro.title} />
          <p className="text-lg leading-relaxed text-muted-foreground lg:pt-10">{t.intro.text}</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[[Store, t.intro.p1, t.intro.p1t], [Users, t.intro.p2, t.intro.p2t], [Leaf, t.intro.p3, t.intro.p3t]].map(([Icon, title, text], i) => {
            const I = Icon as typeof Store;
            return (
              <div key={i} className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary"><I className="h-6 w-6" /></span>
                <h3 className="mt-5 font-sans text-lg font-semibold">{title as string}</h3>
                <p className="mt-2 text-muted-foreground">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-secondary py-24">
        <div className="container-page">
          <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} center />
          <ol className="mt-14 grid gap-4 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={i} className="relative rounded-3xl bg-card p-6 shadow-soft">
                <span className="font-display text-5xl text-primary/25">0{i + 1}</span>
                <s.icon className="absolute end-6 top-7 h-6 w-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-sans text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURED */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionHeading eyebrow={t.featured.eyebrow} title={t.featured.title} />

          </div>
          <Button variant="outline" asChild><Link to="/marketplace">{t.featured.all} <ArrowRight className="rtl:-scale-x-100" /></Link></Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} supplier={suppliers.find(s=>s.id===p.supplierId)} />)}
        </div>
      </section>

      {/* AI */}
      <section className="container-page pb-24">
        <div className="bg-hero relative overflow-hidden rounded-[2rem] p-10 text-forest-foreground md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow !text-lime">{t.ai.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-5xl">{t.ai.title}</h2>
              <p className="mt-5 text-lg text-forest-foreground/75">{t.ai.text}</p>
              <Button variant="hero" size="lg" className="mt-8" asChild><Link to="/recommendations"><Sparkles /> {t.ai.cta}</Link></Button>
            </div>
            <div className="space-y-3 rounded-3xl border border-forest-foreground/15 bg-forest-foreground/5 p-6 backdrop-blur" aria-hidden>
              <div className="text-xs text-forest-foreground/60">{t.ai.example}</div>
              {t.ai.examples.map(([a, b]) => (
                <div key={a} className="flex items-center justify-between gap-3 rounded-2xl bg-forest-foreground/10 px-4 py-3 text-sm">
                  <span className="text-forest-foreground/60 line-through">{a}</span>
                  <ArrowRight className="h-4 w-4 text-lime rtl:-scale-x-100" />
                  <span className="font-semibold">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROUP BUYING */}
      <section className="bg-secondary py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={t.group.eyebrow} title={t.group.title} text={t.group.text} />
            <ul className="mt-8 space-y-3">
              {[t.group.b1, t.group.b2, t.group.b3].map((b, i) => (
                <li key={b} className="flex items-center gap-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>{b}</li>
              ))}
            </ul>
            <Button className="mt-8" asChild><Link to="/group-buying">{t.group.cta}</Link></Button>
          </div>
          <div className="rounded-3xl bg-card p-8 shadow-lift">
            <div className="flex items-center justify-between"><h3 className="font-sans font-semibold">{t.group.tier}</h3><DemoBadge /></div>
            <div className="mt-6 space-y-5">
              {[[t.group.t1, 0.65, 30], [t.group.t2, 0.54, 65], [t.group.t3, 0.46, 100]].map(([label, price, w]) => (
                <div key={label as string}>
                  <div className="mb-2 flex justify-between text-sm"><span>{label as string}</span><span className="font-bold text-forest">{formatILS(price as number, lang)}</span></div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${w}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="container-page py-24">
        <SectionHeading eyebrow={t.impact.eyebrow} title={t.impact.title} text={t.impact.text} center />
        <p className="mt-4 text-center"><DemoBadge /></p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[["1,240 kg", t.impact.m1], ["86,500", t.impact.m2], ["72%", t.impact.m3]].map(([v, l]) => (
            <div key={l} className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
              <div className="font-display text-5xl text-primary">{v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t.impact.example}</p>
        <div className="mt-8 text-center"><Button variant="outline" asChild><Link to="/impact">{t.impact.cta}</Link></Button></div>
      </section>

      {/* SUPPLIER */}
      <section className="container-page pb-24">
        <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-border bg-accent/40 p-10 md:flex-row md:items-center md:p-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-forest md:text-4xl">{t.supplier.title}</h2>
            <p className="mt-3 text-muted-foreground">{t.supplier.text}</p>
          </div>
          <Button size="lg" asChild><Link to="/signup" search={{ role: "supplier" }}>{t.supplier.cta}</Link></Button>
        </div>
      </section>
    </>
  );
}
