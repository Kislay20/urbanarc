"use client";

import React, { useState } from "react";
import clsx from "clsx";

type Values = {
  category?: string;
  size?: string;
  min?: number;
  max?: number;
  sort?: string;
};

export default function ShopFilters({
  categories,
  sizes,
  minPrice,
  maxPrice,
  values,
  onChange,
  onCloseMobile
}: {
  categories: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  values: Values;
  onChange: (next: Partial<Values>) => void;
  onCloseMobile?: () => void;
}) {
  const [localMin, setLocalMin] = useState(values.min ?? minPrice);
  const [localMax, setLocalMax] = useState(values.max ?? maxPrice);

  const reset = () => {
    onChange({ category: undefined, size: undefined, min: undefined, max: undefined, sort: undefined });
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
    onCloseMobile?.();
  };

  const applyPrice = () => {
    const min = Number(localMin) || minPrice;
    const max = Number(localMax) || maxPrice;
    onChange({ min, max });
    onCloseMobile?.();
  };

  // Full controls JSX (used for desktop and modal)
  const FullControls = (
    <div className="space-y-6">
      <div>
        <label className="block text-[0.7rem] font-semibold mb-1">Category</label>
        <select
          className="w-full rounded border border-border bg-bg px-2 py-1 text-sm"
          value={values.category ?? ""}
          onChange={(e) => onChange({ category: e.target.value || undefined })}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[0.7rem] font-semibold mb-1">Size</label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onChange({ size: undefined })}
            className={clsx(
              "rounded border border-border px-2 py-1 text-xs",
              !values.size && "bg-primary text-black"
            )}
          >
            All
          </button>
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange({ size: s })}
              className={clsx(
                "rounded border border-border px-2 py-1 text-xs",
                values.size === s && "bg-primary text-black"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-[0.7rem] font-semibold mb-1">Price</label>
        <div className="flex gap-2">
          <input
            type="number"
            className="w-1/2 rounded border border-border bg-bg px-2 py-1 text-sm"
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            placeholder={String(minPrice)}
          />
          <input
            type="number"
            className="w-1/2 rounded border border-border bg-bg px-2 py-1 text-sm"
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            placeholder={String(maxPrice)}
          />
        </div>
        <div className="mt-2 flex gap-2">
          <button onClick={applyPrice} className="rounded bg-primary px-3 py-1 text-xs font-semibold text-black">
            Apply
          </button>
          <button onClick={reset} className="rounded border border-border px-3 py-1 text-xs text-muted">
            Reset
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[0.7rem] font-semibold mb-1">Sort</label>
        <select
          className="w-full rounded border border-border bg-bg px-2 py-1 text-sm"
          value={values.sort ?? "new"}
          onChange={(e) => onChange({ sort: e.target.value })}
        >
          <option value="new">Newest</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
        </select>
      </div>
    </div>
  );

  // Condensed mobile controls (only used when NOT in modal)
  const MobileCondensed = (
    <div className="md:hidden">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="block text-[0.7rem] font-semibold mb-1">Sort</label>
          <select
            className="w-full rounded border border-border bg-bg px-2 py-1 text-sm"
            value={values.sort ?? "new"}
            onChange={(e) => onChange({ sort: e.target.value })}
          >
            <option value="new">Newest</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>
        <button
          onClick={() => onChange({ category: undefined, size: undefined, min: undefined, max: undefined })}
          className="rounded border border-border px-3 py-1 text-xs text-muted"
          aria-label="Clear"
        >
          Clear
        </button>
      </div>
    </div>
  );

  return (
    // main wrapper keeps width behaviour for desktop; when in modal we'll still render it but modal container controls scrolling
    <aside className="w-full md:w-64">
      {/* Desktop: full controls */}
      <div className="hidden md:block">{FullControls}</div>

      {/* Mobile: if onCloseMobile (i.e. rendered inside modal) show full controls; else show condensed */}
      <div className={clsx(onCloseMobile ? "md:hidden max-h-screen overflow-auto p-2" : "md:hidden")}>
        {onCloseMobile ? FullControls : MobileCondensed}
      </div>
    </aside>
  );
}
