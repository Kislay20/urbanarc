"use client";

import { clsx } from "clsx";

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect
}: {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onSelect(size)}
          className={clsx(
            "min-w-[2.5rem] rounded-md border px-2 py-1 text-xs font-semibold uppercase",
            selectedSize === size
              ? "border-primary bg-primary text-black"
              : "border-border bg-bg text-muted hover:border-primary hover:text-white"
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
