// src/components/cart/CartDrawer.tsx
"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import Link from "next/link";

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { items, subtotal, removeFromCart, addToCart } = useCart();

  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;

  return (
    // backdrop
    <div
      aria-hidden={!cartOpen}
      className={`fixed inset-0 z-50 pointer-events-none transition-opacity ${
        cartOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 transition-opacity ${cartOpen ? "pointer-events-auto" : ""}`}
      />

      {/* drawer */}
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-surface shadow-lg transition-transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b border-border p-4">
            <div className="font-heading text-sm font-semibold">Your cart</div>
            <button onClick={closeCart} className="text-sm text-muted">Close</button>
          </header>

          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="text-sm text-muted">Your cart is empty.</div>
            ) : (
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={`${it.product.id}-${it.size}`} className="flex gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded bg-[#111]">
                      {it.product.images?.[0] ? (
                        <img src={it.product.images[0]} alt={it.product.name} className="h-full w-full object-cover" />
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{it.product.name}</div>
                        <div className="text-sm font-semibold">{formatINR(it.product.price * it.quantity)}</div>
                      </div>
                      <div className="mt-1 text-xs text-muted">Size {it.size} • Qty {it.quantity}</div>

                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => addToCart(it.product, it.size, 1)}
                          className="rounded border border-border px-2 py-1 text-xs"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(it.product.id, it.size)}
                          className="rounded border border-border px-2 py-1 text-xs text-muted"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between text-sm text-muted">
              <span>Shipping</span>
              <span>{formatINR(shipping)}</span>
            </div>
            <div className="mb-4 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>

            <div className="flex gap-2">
              <Link href="/checkout" onClick={closeCart} className="flex-1 rounded bg-primary px-3 py-2 text-sm font-semibold text-black text-center">
                Checkout
              </Link>
              <button onClick={closeCart} className="rounded border border-border px-3 py-2 text-sm text-muted">
                Continue
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
