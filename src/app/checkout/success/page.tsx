"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CheckoutSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ua_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch (e) { console.warn(e); }
  }, []);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-heading font-semibold">No recent order</h1>
        <p className="mt-4 text-muted">We couldn't find a recent order.</p>
        <div className="mt-6">
          <Link href="/shop" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-black">Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-lg border border-border bg-surface p-6">
        <h1 className="text-2xl font-heading font-semibold">Order confirmed</h1>
        <p className="text-sm text-muted mt-1">Order #{order.id} • {new Date(order.createdAt).toLocaleString()}</p>
        <div className="mt-6">
          {order.items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium">{it.name}</div>
                <div className="text-[0.8rem] text-muted">Size {it.size ?? "-"} • Qty {it.quantity}</div>
              </div>
              <div className="text-sm font-semibold">₹{(it.price * it.quantity).toLocaleString("en-IN")}</div>
            </div>
          ))}
          <div className="mt-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Subtotal</span>
              <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Shipping</span>
              <span>₹{order.shipping.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>₹{order.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/shop" className="rounded border border-border px-4 py-2 text-sm text-muted">Continue shopping</Link>
            <Link href="/account" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-black">View account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
