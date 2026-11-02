import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, FileCheck2, FileClock, FileX2, Minus, Plus, ShoppingCart, Scale, MapPin, Leaf } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard, DemoBadge } from "@/components/site/ProductCard";
import { formatILS, useI18n } from "@/lib/i18n";
import { ATTRIBUTES, CATEGORIES, MATERIALS, PRODUCTS, getProduct, getSupplier, labelOf } from "@/data/products";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.product.name.en ?? "Product";
    const desc = loaderData?.product.description.en ?? "Sustainable packaging product on GreenSwitch.";
    return {
      meta: [
        { title: `${name} — GreenSwitch` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — GreenSwitch` },
        { property: "og:description", content: desc },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: NotFoundProduct,
  component: ProductPage,
});

function NotFoundProduct() {
  const { t } = useI18n();
  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl font-semibold text-forest">{t.detail.notFound}</h1>
      <Button className="mt-6" asChild><Link to="/marketplace">{t.detail.back}</Link></Button>
    </div>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const supplier = getSupplier(p.supplierId);
  const [qty, setQty] = useState(p.moq);
  const related = PRODUCTS.filter((x) => x.id !== p.id && (x.category === p.category || x.material === p.material)).slice(0, 4);
  const fallback = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);
  const step = p.moq >= 100 ? 100 : 1;
  const certMap = {
    documented: [FileCheck2, t.detail.certDocumented, "text-primary"],
    pending: [FileClock, t.detail.certPending, "text-muted-foreground"],
    none: [FileX2, t.detail.certNone, "text-muted-foreground"],
  } as const;
  const [CertIcon, certText, certCls] = certMap[p.certification];

  return (
    <div className="container-page py-10">
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-forest">
        <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" /> {t.detail.back}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-muted shadow-soft">
          <img src={p.image} alt={p.name[lang]} width={816} height={816} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">{labelOf(CATEGORIES, p.category)?.[lang]}</span>
            <DemoBadge />
          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-forest md:text-5xl">{p.name[lang]}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description[lang]}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-forest">{formatILS(p.price, lang)}</span>
            <span className="text-muted-foreground">{p.unit[lang]}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t.detail.minNote} {p.moq.toLocaleString()}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.attributes.map((a) => (
              <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"><Leaf className="h-3.5 w-3.5" />{labelOf(ATTRIBUTES, a)?.[lang]}</span>
            ))}
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <Label htmlFor="qty" className="text-sm font-semibold">{t.detail.quantity}</Label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-input">
                <Button variant="ghost" size="icon" aria-label="Decrease" onClick={() => setQty((q) => Math.max(p.moq, q - step))}><Minus /></Button>
                <Input id="qty" type="number" min={p.moq} step={step} value={qty} onChange={(e) => setQty(Math.max(p.moq, Number(e.target.value) || p.moq))} className="h-10 w-24 border-0 text-center shadow-none focus-visible:ring-0" />
                <Button variant="ghost" size="icon" aria-label="Increase" onClick={() => setQty((q) => q + step)}><Plus /></Button>
              </div>
              <span className="text-sm text-muted-foreground">= <strong className="text-forest">{formatILS(qty * p.price, lang)}</strong></span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button size="lg" onClick={() => toast(t.comingSoon, { description: t.detail.placeholderCart })}><ShoppingCart /> {t.detail.addCart}</Button>
              <Button size="lg" variant="outline" onClick={() => toast(t.comingSoon, { description: t.detail.placeholderCompare })}><Scale /> {t.detail.compare}</Button>
            </div>
          </div>

          {supplier && (
            <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-secondary p-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.detail.supplierInfo}</div>
                <div className="mt-1 flex items-center gap-1.5 font-semibold">{supplier.name[lang]}{supplier.verified && <BadgeCheck className="h-4 w-4 text-primary" />}</div>
                <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{supplier.city[lang]} · {t.detail.since} {supplier.since}</div>
              </div>
              <span className="text-xs font-semibold text-primary">{supplier.verified ? t.product.verified : t.product.unverified}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <InfoCard title={t.detail.composition}>
          <p className="font-semibold">{labelOf(MATERIALS, p.material)?.[lang]}</p>
          {p.plasticSavedG > 0 && <p className="mt-2 text-sm text-muted-foreground">~{p.plasticSavedG} g {t.detail.savedPer}</p>}
        </InfoCard>
        <InfoCard title={t.detail.specs}>
          <dl className="space-y-2 text-sm">
            {p.specs.map((s) => <div key={s.label.en} className="flex justify-between gap-3"><dt className="text-muted-foreground">{s.label[lang]}</dt><dd className="font-medium">{s.value[lang]}</dd></div>)}
          </dl>
          <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t.detail.sizes}</h4>
          <div className="mt-2 flex flex-wrap gap-2">{p.sizes.map((s) => <span key={s} dir="ltr" className="rounded-full border border-border px-3 py-1 text-sm">{s}</span>)}</div>
        </InfoCard>
        <InfoCard title={t.detail.cert}>
          <p className={`flex items-center gap-2 font-medium ${certCls}`}><CertIcon className="h-5 w-5" />{certText}</p>
        </InfoCard>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-forest">{t.detail.related}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{fallback.map((r) => <ProductCard key={r.id} product={r} />)}</div>
      </section>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="mb-4 font-sans text-xs font-bold uppercase tracking-wider text-forest">{title}</h3>
      {children}
    </div>
  );
}
