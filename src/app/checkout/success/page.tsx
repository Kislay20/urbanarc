// src/app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * A lightweight Order type used only for rendering the success page.
 * Adjust fields to match how you save the order (localStorage or server).
 */
type OrderItem = {
  product: {
    id?: string;
    name: string;
    price: number;
    images?: string[];
  };
  size?: string;
  quantity: number;
};

type Order = {
  id: string | number;
  createdAt: string;
  items: OrderItem[];
  subtotal?: number;
  shipping?: number;
  total?: number;
};

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to read a saved order from localStorage (demo flow).
    // Replace this logic if you obtain the order from server or query params.
    try {
      const raw = localStorage.getItem("last_order");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Basic runtime validation
        if (
          parsed &&
          (parsed.id || parsed.id === 0) &&
          Array.isArray(parsed.items)
        ) {
          // Ensure createdAt exists
          if (!parsed.createdAt) parsed.createdAt = new Date().toISOString();
          // Compute totals if not present
          const subtotal =
            typeof parsed.subtotal === "number"
              ? parsed.subtotal
              : parsed.items.reduce((s: number, it: any) => s + (it.product?.price ?? 0) * (it.quantity ?? 1), 0);
          const shipping = typeof parsed.shipping === "number" ? parsed.shipping : subtotal > 0 ? 199 : 0;
          const total = typeof parsed.total === "number" ? parsed.total : subtotal + shipping;

          setOrder({
            id: parsed.id,
            createdAt: parsed.createdAt,
            items: parsed.items,
            subtotal,
            shipping,
            total,
          });
        } else {
          setOrder(null);
        }
      } else {
        setOrder(null);
      }
    } catch (err) {
      console.warn("Could not load last_order from localStorage", err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="text-sm text-muted">Loading order…</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-lg border border-border bg-surface p-6">
          <h1 className="text-2xl font-heading font-semibold">Order not found</h1>
          <p className="mt-2 text-sm text-muted">
            We couldn't find your order details. If you just completed checkout, try refreshing the page.
            Otherwise, check your email for a confirmation or view your cart.
          </p>

          <div className="mt-4 flex gap-3">
            <Link href="/shop" className="rounded bg-primary px-3 py-2 text-sm font-semibold text-black">
              Continue shopping
            </Link>
            <Link href="/cart" className="rounded border border-border px-3 py-2 text-sm text-muted">
              View cart
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render a clean summary
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-lg border border-border bg-surface p-6">
        <h1 className="text-2xl font-heading font-semibold">Order confirmed</h1>
        <p className="text-sm text-muted mt-1">
          Order #{order.id} • {new Date(order.createdAt).toLocaleString()}
        </p>

        <div className="mt-6">
          <div className="space-y-4">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-[#111]">
                    {it.product?.images?.[0] ? (
                      <img src={it.product.images[0]} alt={it.product.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{it.product?.name}</div>
                    <div className="text-xs text-muted">Size {it.size ?? "—"} • Qty {it.quantity}</div>
                  </div>
                </div>

                <div className="text-sm font-semibold">
                  ₹{((it.product?.price ?? 0) * it.quantity).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between text-muted">
            <div>Subtotal</div>
            <div>₹{(order.subtotal ?? 0).toLocaleString("en-IN")}</div>
          </div>

          <div className="mt-2 flex items-center justify-between text-muted">
            <div>Shipping</div>
            <div>₹{(order.shipping ?? 0).toLocaleString("en-IN")}</div>
          </div>

          <div className="mt-3 flex items-center justify-between font-semibold">
            <div>Total</div>
            <div>₹{(order.total ?? 0).toLocaleString("en-IN")}</div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href="/shop" className="rounded bg-primary px-3 py-2 text-sm font-semibold text-black">
            Continue shopping
          </Link>
          <Link href="/" className="rounded border border-border px-3 py-2 text-sm text-muted">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
