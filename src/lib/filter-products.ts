import type { Product } from "@/data/products";

export type Filters = {
  q: string;
  categories: string[];
  materials: string[];
  attributes: string[];
  maxPrice: number;
  supplier: string;
  maxMoq: number;
  sort: "featured" | "price-asc" | "price-desc" | "moq";
};

export const defaultFilters: Filters = {
  q: "", categories: [], materials: [], attributes: [], maxPrice: 50, supplier: "all", maxMoq: 100000, sort: "featured",
};

export function filterProducts(list: Product[], f: Filters, searchText: (p: Product) => string): Product[] {
  const q = f.q.trim().toLowerCase();
  const out = list.filter((p) =>
    (!q || searchText(p).toLowerCase().includes(q)) &&
    (f.categories.length === 0 || f.categories.includes(p.category)) &&
    (f.materials.length === 0 || f.materials.includes(p.material)) &&
    f.attributes.every((a) => p.attributes.includes(a as Product["attributes"][number])) &&
    p.price <= f.maxPrice &&
    (f.supplier === "all" || p.supplierId === f.supplier) &&
    p.moq <= f.maxMoq,
  );
  if (f.sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") out.sort((a, b) => b.price - a.price);
  if (f.sort === "moq") out.sort((a, b) => a.moq - b.moq);
  return out;
}
