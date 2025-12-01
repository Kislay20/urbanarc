// src/components/product/ProductDetail.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

function svgPlaceholderDataUrl(title: string, width = 1200, height = 800) {
  const safe = String(title || "Product").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
    <defs>
      <linearGradient id="g" x1="0" x2="1"><stop stop-color="#0b0b0b" offset="0"/><stop stop-color="#141414" offset="1"/></linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" font-size="28" fill="#7b7b7b" font-family="system-ui, sans-serif" dominant-baseline="middle" text-anchor="middle">${safe}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [mainIndex, setMainIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [mainSrc, setMainSrc] = useState<string | undefined>(product.images?.[0]);

  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) setSelectedSize((s) => s ?? product.sizes![0]);
    else setSelectedSize(undefined);
  }, [product.sizes]);

  useEffect(() => {
    if (!product.images || product.images.length === 0) setMainSrc(undefined);
    else if (mainIndex >= product.images.length) setMainIndex(0);
    else setMainSrc(product.images[mainIndex]);
  }, [product.images, mainIndex]);

  const canAdd = useMemo(() => {
    if (product.sizes && product.sizes.length > 0) return !!selectedSize;
    return true;
  }, [product.sizes, selectedSize]);

  const handleAdd = () => {
    if (!canAdd) return;
    addToCart(product, selectedSize ?? "OS", qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[1fr,420px]">
        <div>
          <div className="mb-6">
            <div className="w-full rounded bg-gray-900">
              {mainSrc ? (
                <div className="relative">
                  <div className="h-[60vh] max-h-[720px] w-full overflow-hidden rounded-md bg-[#0b0b0b]">
                    <img
                      src={mainSrc}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = svgPlaceholderDataUrl(product.name);
                        setMainSrc(undefined);
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="h-96 w-full rounded-md bg-ua-shimmer flex items-center justify-center text-muted">
                  {product.name}
                </div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-auto py-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setMainIndex(i)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded border ${
                      i === mainIndex ? "border-primary ring-2 ring-primary/40" : "border-border"
                    }`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${product.name} ${i + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = svgPlaceholderDataUrl(product.name, 400, 300);
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none text-sm text-muted">
            <h2 className="mb-2 text-xl font-heading font-semibold">{product.name}</h2>
            {product.subtitle && <p className="text-sm text-muted mb-2">{product.subtitle}</p>}
            {product.description ? (
              <div className="text-sm leading-relaxed">{product.description}</div>
            ) : (
              <div className="text-sm text-muted">No description available.</div>
            )}
          </div>
        </div>

        <aside className="md:sticky md:top-24">
          <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
            <div className="mb-3">
              <div className="text-xs text-muted">Price</div>
              <div className="mt-1 text-2xl font-heading font-semibold">₹{(product.price ?? 0).toLocaleString("en-IN")}</div>
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-3">
                <div className="mb-2 text-xs font-semibold">Size</div>
                <div className="flex flex-wrap gap-2">
                  <select
                    aria-label="Select size"
                    value={selectedSize ?? ""}
                    onChange={(e) => setSelectedSize(e.target.value || undefined)}
                    className="rounded border border-border bg-bg px-3 py-2 text-sm"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="mb-2 text-xs font-semibold">Quantity</div>
              <div className="flex w-full items-center gap-2">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="rounded border border-border px-3 py-1 text-sm">-</button>
                <div className="min-w-[44px] text-center text-sm">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="rounded border border-border px-3 py-1 text-sm">+</button>
              </div>
            </div>

            <div className="mb-3">
              <button
                onClick={handleAdd}
                disabled={!canAdd}
                className={`w-full rounded px-4 py-3 text-sm font-semibold ${canAdd ? (added ? "bg-green-400 text-black" : "bg-primary text-black") : "bg-gray-600/60 text-muted cursor-not-allowed"}`}
                aria-disabled={!canAdd}
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>
            </div>

            <div className="text-xs text-muted">
              {product.sku && <div>SKU: {product.sku}</div>}
              {product.category && <div>Category: {product.category}</div>}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
