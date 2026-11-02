import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { defaultFilters, filterProducts } from "@/lib/filter-products";

const text = (p: (typeof PRODUCTS)[number]) => p.name.en;

describe("marketplace filters", () => {
  it("max price excludes products above it", () => {
    const r = filterProducts(PRODUCTS, { ...defaultFilters, maxPrice: 1 }, text);
    expect(r.every((p) => p.price <= 1)).toBe(true);
    expect(r.find((p) => p.id === "cotton-tote")).toBeUndefined();
  });
  it("sorts by price ascending", () => {
    const r = filterProducts(PRODUCTS, { ...defaultFilters, sort: "price-asc" }, text);
    expect(r[0].price).toBe(Math.min(...PRODUCTS.map((p) => p.price)));
  });
  it("requires all selected attributes", () => {
    const r = filterProducts(PRODUCTS, { ...defaultFilters, attributes: ["reusable", "compostable"] }, text);
    expect(r.map((p) => p.id)).toEqual(["beeswax-glassine"]);
  });
});
