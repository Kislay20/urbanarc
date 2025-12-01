// src/components/product/ProductCard.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

function svgPlaceholderDataUrl(title: string, width = 600, height = 400) {
  const safe = String(title || "Product").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
    <defs>
      <linearGradient id="g" x1="0" x2="1"><stop stop-color="#0b0b0b" offset="0"/><stop stop-color="#141414" offset="1"/></linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" font-size="22" fill="#7b7b7b" font-family="system-ui, sans-serif" dominant-baseline="middle" text-anchor="middle">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(product.images?.[0]);

  const defaultSize = (product.sizes && product.sizes.length > 0) ? product.sizes[0] : "OS";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // avoid outer link navigation if click is inside
    addToCart(product, defaultSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  // Programmatic navigation for inner "View" button
  const goToProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // avoid bubbling to outer link
    router.push(`/product/${product.slug}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface animate-ua-fade-in">
      {/* Outer Link: entire card is clickable (renders <a>) */}
      <Link href={`/product/${product.slug}`} className="block no-underline">
        {/* IMAGE */}
        <div className="h-48 w-full overflow-hidden bg-[#0b0b0b]">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = svgPlaceholderDataUrl(product.name);
                setImgSrc(undefined);
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-ua-shimmer text-sm text-muted">
              {product.name}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-1 flex-col gap-3 p-3">
          <h3 className="mb-1 text-sm font-medium leading-snug">{product.name}</h3>
          <div className="text-xs text-muted">₹{product.price?.toLocaleString("en-IN")}</div>

          <div className="mt-auto flex items-center justify-between gap-3">
            {/* Quick Add: button that won't trigger outer link */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`rounded px-3 py-1 text-xs font-semibold ${added ? "bg-green-400 text-black" : "bg-primary text-black"}`}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? "Added ✓" : "Add"}
            </button>

            {/* View: not an <a>; use button + programmatic navigation */}
            <button
              type="button"
              onClick={goToProduct}
              className="text-xs text-muted underline"
              aria-label={`View ${product.name}`}
            >
              View
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
