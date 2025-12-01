// src/app/product/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getProductBySlug, getFeaturedProducts } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";
import ProductRail from "@/components/home/ProductRail";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 16: params is now a Promise
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const related = getFeaturedProducts().filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <ProductDetail product={product} />

      {related.length > 0 && (
        <div>
          <h2 className="mb-3 text-2xl font-heading font-semibold">
            You might also like
          </h2>
          <ProductRail products={related} />
        </div>
      )}
    </div>
  );
}
