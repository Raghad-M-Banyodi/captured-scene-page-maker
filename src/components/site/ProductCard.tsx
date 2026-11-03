import { Link } from "@tanstack/react-router";
import { BadgeCheck, ArrowUpRight } from "lucide-react";
import { formatILS, useI18n } from "@/lib/i18n";
import { MATERIALS, getSupplier, labelOf, type Product, type Supplier } from "@/data/products";

export function DemoBadge() {
  const { t } = useI18n();
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-primary/40 bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-primary">
      {t.demo}
    </span>
  );
}

export function ProductCard({ product, supplier: providedSupplier }: { product: Product; supplier?: Supplier | undefined }) {
  const { lang, t } = useI18n();
  const supplier = providedSupplier ?? getSupplier(product.supplierId);
  const material = labelOf(MATERIALS, product.material);

  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={product.image} alt={product.name[lang]} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute start-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-forest backdrop-blur">
          {material?.[lang]}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-base font-semibold leading-snug text-foreground">{product.name[lang]}</h3>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary rtl:-scale-x-100" aria-hidden />
        </div>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          {t.product.by} {supplier?.name[lang]}
          {supplier?.verified && <BadgeCheck className="h-4 w-4 text-primary" aria-label={t.product.verified} />}
        </p>
        <div className="mt-auto flex items-end justify-between border-t border-border pt-3">
          <div>
            <div className="text-lg font-bold text-forest">{formatILS(product.price, lang)}</div>
            <div className="text-xs text-muted-foreground">{product.unit[lang]}</div>
          </div>
          <div className="text-end text-xs text-muted-foreground">
            {t.product.moq}<div className="font-semibold text-foreground">{product.moq.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
