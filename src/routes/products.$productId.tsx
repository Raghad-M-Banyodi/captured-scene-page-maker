import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, FileCheck2, FileClock, FileX2, Minus, Plus, ShoppingCart, Heart, Scale, MapPin, Leaf } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/site/ProductCard";
import { formatILS, useI18n } from "@/lib/i18n";
import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogueOptions } from "@/lib/account/catalogue";
import { useAccount } from "@/lib/account/session";
import { supabase } from "@/integrations/supabase/client";
import { unitPrice, validQuantity } from '@/lib/account/commerce';
import { ATTRIBUTES, CATEGORIES, MATERIALS, labelOf } from "@/data/products";

export const Route = createFileRoute("/products/$productId")({
  loader: async ({ params,context }) => {
    const data=await context.queryClient.ensureQueryData(catalogueOptions);
    const product = data.products.find(p=>p.id===params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.product.name.en ?? "Product";
    const desc = loaderData?.product.description.en ?? "Sustainable packaging product on GreenSwitch.";
    return {
      meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
        { title: `${name} — GreenSwitch` },
        { name: "description", content: desc },
        { property: "og:title", content: `${name} — GreenSwitch` },
        { property: "og:description", content: desc },
        ...(loaderData?.product.image.startsWith('https://') ? [{property:'og:image',content:loaderData.product.image},{name:'twitter:image',content:loaderData.product.image}] : []),
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
  const {data:{products:PRODUCTS,suppliers}}=useSuspenseQuery(catalogueOptions);
  const supplier = suppliers.find(s=>s.id===p.supplierId);
  const account=useAccount();
  const [busy,setBusy]=useState(false);
  async function buyerAction(action:"save"|"cart") {
    if(!account.user||!account.roles.includes("buyer")){toast(t.account.signInRequired);return;}
    setBusy(true);
    try {
      if(action==="save") {const r=await supabase.from("saved_products").upsert({user_id:account.user.id,product_id:p.id},{onConflict:"user_id,product_id"});if(r.error)throw r.error;toast.success(t.account.savedNotice);}
      else {if(!validQuantity(qty,p.moq,p.stock??0)){toast.error(t.account.invalid);return;}const c=await supabase.from("shopping_carts").upsert({user_id:account.user.id},{onConflict:"user_id"}).select("id").single();if(c.error)throw c.error;const r=await supabase.from("cart_items").upsert({cart_id:c.data.id,product_id:p.id,quantity:qty},{onConflict:"cart_id,product_id"});if(r.error)throw r.error;toast.success(t.account.addedCart);}
    }catch(e){toast.error(e instanceof Error?e.message:t.account.error);}finally{setBusy(false);}
  }
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
        {p.images&&p.images.length>1&&<div className="flex gap-2 p-3">{p.images.slice(1).map(url=><a key={url} href={url} target="_blank" rel="noopener noreferrer"><img src={url} alt={p.name[lang]} className="size-20 object-cover rounded-md"/></a>)}</div>}</div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow">{labelOf(CATEGORIES, p.category)?.[lang]}</span>

          </div>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-forest md:text-5xl">{p.name[lang]}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{p.description[lang]}</p>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold text-forest">{formatILS(p.price, lang)}</span>
            <span className="text-muted-foreground">{p.unit[lang]}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{t.detail.minNote} {p.moq.toLocaleString()}</p>

          <p className="mt-2 text-sm">{t.account.commerce.availability}: {p.stock}</p>{p.volumeDiscounts?.map(d=><p key={d.min_quantity} className="text-sm mt-2">{d.min_quantity}+ · {formatILS(d.unit_price,lang)} {p.unit[lang]}</p>)}
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
                <Input id="qty" type="number" min={p.moq} max={p.stock} step={1} value={qty} onChange={(e) => setQty(Math.max(p.moq, Number(e.target.value) || p.moq))} className="h-10 w-24 border-0 text-center shadow-none focus-visible:ring-0" />
                <Button variant="ghost" size="icon" aria-label="Increase" onClick={() => setQty((q) => Math.min(p.stock??q+step,q + step))}><Plus /></Button>
              </div>
              <span className="text-sm text-muted-foreground">= <strong className="text-forest">{formatILS(qty * unitPrice(p.price,p.volumeDiscounts,qty), lang)}</strong></span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button size="lg" disabled={busy} onClick={() => void buyerAction("cart")}><ShoppingCart /> {t.detail.addCart}</Button>
              <Button size="lg" variant="outline" disabled={busy} onClick={() => void buyerAction("save")}><Heart /> {t.account.saveProduct}</Button>
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
          <p className="font-semibold">{labelOf(MATERIALS, p.material)?.[lang]}</p><p className="mt-2 text-sm">{p.composition}</p>
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
          <p className={`flex items-center gap-2 font-medium ${certCls}`}><CertIcon className="h-5 w-5" />{certText}</p>{p.documents?.map(d=><a key={d.url} href={d.url} target="_blank" rel="noopener noreferrer" className="block mt-3 text-primary underline">{d.name}</a>)}
        </InfoCard>
      </div>

      <section className="mt-20">
        <h2 className="text-3xl font-semibold text-forest">{t.detail.related}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{fallback.map((r) => <ProductCard key={r.id} product={r} supplier={suppliers.find(s=>s.id===r.supplierId)} />)}</div>
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
