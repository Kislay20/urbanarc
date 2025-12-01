// src/components/category/CategoryCard.tsx
import Link from "next/link";
import React from "react";
import type { CategoryInfo } from "@/lib/categories";

export default function CategoryCard({ c }: { c: CategoryInfo }) {
  return (
    <Link href={`/category/${c.slug}`} className="block group">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface p-4 transition-transform duration-300 group-hover:scale-105">
        <div className="mb-3 h-40 w-full rounded bg-ua-shimmer" />
        <div className="mt-auto">
          <div className="text-sm font-semibold">{c.name}</div>
          <div className="mt-1 text-xs text-muted">{c.count} items</div>
        </div>
      </div>
    </Link>
  );
}
