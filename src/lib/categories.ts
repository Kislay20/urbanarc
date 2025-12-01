// src/lib/categories.ts
import { getAllProducts } from "./products";
import { slugify } from "./slugify";

export type CategoryInfo = {
  slug: string;
  name: string;
  count: number;
};

export function getAllCategories(): CategoryInfo[] {
  const all = getAllProducts();
  const map = new Map<string, CategoryInfo>();

  for (const p of all) {
    const name = p.category ?? "Other";
    const slug = slugify(name);
    const entry = map.get(slug);
    if (entry) {
      entry.count += 1;
    } else {
      map.set(slug, { slug, name, count: 1 });
    }
  }

  return Array.from(map.values());
}

export function getProductsByCategorySlug(slug: string) {
  const all = getAllProducts();
  return all.filter((p) => slugify(p.category ?? "Other") === slug);
}
