// src/app/category/[slug]/page.tsx
import { notFound } from "next/navigation";
import ShopPageClient from "@/components/shop/page";
import { getProductsByCategorySlug } from "@/lib/categories";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const categoryProducts = getProductsByCategorySlug(slug);

  if (!categoryProducts || categoryProducts.length === 0) {
    return notFound();
  }

  // Use readable title (first product's category name or slug->friendly)
  const title = categoryProducts[0].category ?? slug.replace("-", " ").toUpperCase();

  return (
    <ShopPageClient
      initialCategory={title.toLowerCase()}
      products={categoryProducts}
      title={title}
      subtitle="Browse the collection"
    />
  );
}
