"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ShopFilters from "@/components/shop/ShopFilters";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";
import type { Product } from "@/types/product";

type Filters = {
  category?: string;
  size?: string;
  min?: number;
  max?: number;
  sort?: string;
};

function parseNumber(value: string | null, fallback = 0) {
  if (!value) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export default function ShopPageClient() {
  const all = getAllProducts();
  const router = useRouter();
  const search = useSearchParams();

  // derive available categories/sizes/prices from data
  const categories = Array.from(new Set(all.map((p) => p.category ?? "Other")));
  const sizes = Array.from(new Set(all.flatMap((p) => p.sizes ?? []))).sort((a, b) => a.localeCompare(b));
  const prices = all.map((p) => p.price || 0);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 0);

  // initialize filters from query string
  const initial: Filters = {
    category: search.get("category") || undefined,
    size: search.get("size") || undefined,
    min: search.get("min") ? parseNumber(search.get("min"), minPrice) : undefined,
    max: search.get("max") ? parseNumber(search.get("max"), maxPrice) : undefined,
    sort: search.get("sort") || "new"
  };

  const [filters, setFilters] = useState<Filters>(initial);

  // keep URL in sync with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.size) params.set("size", filters.size);
    if (typeof filters.min === "number") params.set("min", String(filters.min));
    if (typeof filters.max === "number") params.set("max", String(filters.max));
    if (filters.sort) params.set("sort", filters.sort);

    const qs = params.toString();
    const url = qs ? `/shop?${qs}` : "/shop";
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // filter & sort logic
  const filtered = useMemo(() => {
    const fmin = typeof filters.min === "number" ? filters.min : minPrice;
    const fmax = typeof filters.max === "number" ? filters.max : maxPrice;

    let list = all.slice();

    if (filters.category) {
      list = list.filter((p) => (p.category ?? "Other") === filters.category);
    }
    if (filters.size) {
      list = list.filter((p) => (p.sizes ?? []).includes(filters.size!));
    }
    list = list.filter((p) => {
      const price = p.price ?? 0;
      return price >= fmin && price <= fmax;
    });

    if (filters.sort === "price-asc") {
      list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (filters.sort === "price-desc") {
      list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else {
      // new / default: keep original order (assumed newest first in your source)
    }

    return list;
  }, [all, filters, minPrice, maxPrice]);

  // mobile filters toggle (simple)
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold">Shop</h1>
          <p className="text-sm text-muted">Browse all products</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden rounded border border-border px-3 py-1 text-xs"
            aria-label="Open filters"
          >
            Filters
          </button>
          <div className="hidden md:block text-sm text-muted">{filtered.length} results</div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[250px,1fr]">
        {/* sidebar */}
        <div className="hidden md:block">
          <ShopFilters
            categories={categories}
            sizes={sizes}
            minPrice={minPrice}
            maxPrice={maxPrice}
            values={filters}
            onChange={(next) => setFilters((s) => ({ ...s, ...next }))}
          />
        </div>

        {/* mobile filters modal */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex items-start bg-black/50 p-4 md:hidden">
            <div className="w-full max-w-md rounded bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Filters</h3>
                <button onClick={() => setMobileOpen(false)} className="text-sm text-muted">Close</button>
              </div>

              <ShopFilters
                categories={categories}
                sizes={sizes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                values={filters}
                onChange={(next) => setFilters((s) => ({ ...s, ...next }))}
                onCloseMobile={() => setMobileOpen(false)}
              />
            </div>
          </div>
        )}

        {/* product grid */}
        <div>
          <div className="mb-4 hidden md:block text-sm text-muted">{filtered.length} results</div>

          <ProductGrid products={filtered as Product[]} />
        </div>
      </div>
    </div>
  );
}
