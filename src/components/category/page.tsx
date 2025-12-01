// src/app/category/page.tsx
import { getAllCategories } from "@/lib/categories";
import CategoryCard from "@/components/category/CategoryCard";

export default function CategoryIndexPage() {
  const cats = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold">Categories</h1>
        <p className="text-sm text-muted">Browse by category</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {cats.map((c) => (
          <div key={c.slug} className="h-full">
            <CategoryCard c={c} />
          </div>
        ))}
      </div>
    </div>
  );
}
