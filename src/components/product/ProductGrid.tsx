// src/components/product/ProductGrid.tsx
import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return <div className="py-8 text-sm text-muted">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        // ensure each grid cell stretches to same height by making the child h-full
        <div key={p.id} className="h-full">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
