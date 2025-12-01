// src/app/shop/page.tsx
import { Suspense } from "react";
import ShopPageClient from "@/components/shop/page"; // your client component
import { getAllProducts } from "@/lib/products";

export const revalidate = 0; // optional: keep dynamic during dev; remove or change for production

export default function ShopPage() {
  // server-side: get product list synchronously from your lib
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Suspense fallback={<div className="py-16 text-center text-sm text-muted">Loading shop…</div>}>
        {/* ShopPageClient handles filters, uses useSearchParams (client-only) */}
        <ShopPageClient products={products} />
      </Suspense>
    </div>
  );
}
