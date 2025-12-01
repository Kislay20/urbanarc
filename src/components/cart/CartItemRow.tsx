"use client";

import type { CartItem } from "@/lib/cart";
import { useCart } from "@/context/CartContext";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-3">
      <div className="h-16 w-16 rounded-md bg-gradient-to-b from-surface to-bg" />
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-medium">{item.product.name}</h3>
            <p className="text-[0.7rem] text-muted">
              Size {item.size} · Qty {item.quantity}
            </p>
          </div>
          <button
            className="text-[0.7rem] text-muted underline"
            onClick={() => removeFromCart(item.product.id, item.size)}
          >
            Remove
          </button>
        </div>
        <div className="text-sm font-semibold">
          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
        </div>
      </div>
    </div>
  );
}
