import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogueOptions } from "@/lib/account/catalogue";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/site/ProductCard";
import { useI18n } from "@/lib/i18n";
import { ATTRIBUTES, CATEGORIES, MATERIALS } from "@/data/products";
import { filterProducts, type Filters, defaultFilters } from "@/lib/filter-products";

export const Route = createFileRoute("/marketplace")({
  loader: ({context}) => context.queryClient.ensureQueryData(catalogueOptions),
  head: () => ({
    meta: [
      { title: "Marketplace — GreenSwitch" },
      { name: "description", content: "Search and compare sustainable packaging by category, material, price and supplier." },
      { property: "og:title", content: "Sustainable Packaging Marketplace — GreenSwitch" },
      { property: "og:description", content: "Compare eco-friendly packaging from trusted Palestinian suppliers." },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { t, lang } = useI18n();
  const {data:{products:PRODUCTS,suppliers:SUPPLIERS}} = useSuspenseQuery(catalogueOptions);
  const getSupplier=(id:string)=>SUPPLIERS.find(s=>s.id===id);
  const [f, setF] = useState<Filters>(defaultFilters);

  const results = useMemo(
    () => filterProducts(PRODUCTS, f, (p) => [p.name.en, p.name.ar, getSupplier(p.supplierId)?.name.en ?? "", getSupplier(p.supplierId)?.name.ar ?? "", MATERIALS.find((m) => m.id === p.material)?.en ?? ""].join(" ")),
    [f, PRODUCTS, SUPPLIERS],
  );

  const toggle = <K extends "categories" | "materials" | "attributes">(key: K, id: string) =>
    setF((s) => ({ ...s, [key]: s[key].includes(id as never) ? s[key].filter((x) => x !== id) : [...s[key], id] }));

  const FilterPanel = (
    <div className="space-y-7">
      <FilterGroup title={t.market.category}>
        {CATEGORIES.map((c) => <Check key={c.id} id={`cat-${c.id}`} label={c[lang]} checked={f.categories.includes(c.id)} onChange={() => toggle("categories", c.id)} />)}
      </FilterGroup>
      <FilterGroup title={t.market.material}>
        {MATERIALS.map((m) => <Check key={m.id} id={`mat-${m.id}`} label={m[lang]} checked={f.materials.includes(m.id)} onChange={() => toggle("materials", m.id)} />)}
      </FilterGroup>
      <FilterGroup title={`${t.market.price}: ₪${f.maxPrice}`}>
        <Slider aria-label={t.market.price} min={1} max={50} step={1} value={[f.maxPrice]} onValueChange={([v]) => setF((s) => ({ ...s, maxPrice: v ?? s.maxPrice }))} />
      </FilterGroup>
      <FilterGroup title={t.market.supplier}>
        <Select value={f.supplier} onValueChange={(v) => setF((s) => ({ ...s, supplier: v }))}>
          <SelectTrigger aria-label={t.market.supplier}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.market.all}</SelectItem>
            {SUPPLIERS.map((s) => <SelectItem key={s.id} value={s.id}>{s.name[lang]}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>
      <FilterGroup title={t.market.moq}>
        <Select value={String(f.maxMoq)} onValueChange={(v) => setF((s) => ({ ...s, maxMoq: Number(v) }))}>
          <SelectTrigger aria-label={t.market.moq}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="100000">{t.market.any}</SelectItem>
            {[50, 200, 500, 1000].map((n) => <SelectItem key={n} value={String(n)}>≤ {n}</SelectItem>)}
          </SelectContent>
        </Select>
      </FilterGroup>
      <FilterGroup title={t.market.attributes}>
        {ATTRIBUTES.map((a) => <Check key={a.id} id={`attr-${a.id}`} label={a[lang]} checked={f.attributes.includes(a.id)} onChange={() => toggle("attributes", a.id)} />)}
      </FilterGroup>
      <Button variant="outline" className="w-full" onClick={() => setF(defaultFilters)}>{t.market.reset}</Button>
    </div>
  );

  return (
    <div className="container-page py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-forest md:text-5xl">{t.market.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.market.subtitle}</p>
        </div>

      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label={t.market.search} placeholder={t.market.search} value={f.q} onChange={(e) => setF((s) => ({ ...s, q: e.target.value }))} className="h-12 rounded-full bg-card ps-11" />
        </div>
        <Select value={f.sort} onValueChange={(v) => setF((s) => ({ ...s, sort: v as Filters["sort"] }))}>
          <SelectTrigger className="h-12 rounded-full bg-card sm:w-56" aria-label={t.market.sort}><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">{t.market.sortFeatured}</SelectItem>
            <SelectItem value="price-asc">{t.market.sortPriceAsc}</SelectItem>
            <SelectItem value="price-desc">{t.market.sortPriceDesc}</SelectItem>
            <SelectItem value="moq">{t.market.sortMoq}</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild><Button variant="outline" className="h-12 lg:hidden"><SlidersHorizontal /> {t.market.filters}</Button></SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto bg-background">
            <SheetTitle className="mb-6">{t.market.filters}</SheetTitle>
            {FilterPanel}
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-3xl border border-border bg-card p-6 lg:block lg:self-start" aria-label={t.market.filters}>{FilterPanel}</aside>
        <div>
          <p className="mb-4 text-sm text-muted-foreground" aria-live="polite">{results.length} {t.market.results}</p>
          {results.length === 0 ? (
            <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
              <PackageSearch className="h-12 w-12 text-primary/50" />
              <h2 className="mt-4 font-sans text-xl font-semibold">{t.market.emptyTitle}</h2>
              <p className="mt-2 text-muted-foreground">{t.market.emptyText}</p>
              <Button className="mt-6" onClick={() => setF(defaultFilters)}>{t.market.reset}</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => <ProductCard key={p.id} product={p} supplier={getSupplier(p.supplierId)} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs font-bold uppercase tracking-wider text-forest">{title}</legend>
      <div className="space-y-2.5">{children}</div>
    </fieldset>
  );
}

function Check({ id, label, checked, onChange }: { id: string; label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-2.5">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={id} className="cursor-pointer text-sm font-normal">{label}</Label>
    </div>
  );
}
