// src/components/checkout/CheckoutForm.tsx
"use client";

import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create fake order
    const orderId = `ORD${Date.now()}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: items.map((it) => ({
        id: it.product.id,
        slug: it.product.slug,
        name: it.product.name,
        price: it.product.price,
        size: it.size,
        quantity: it.quantity,
        image: it.product.images?.[0] ?? null
      })),
      subtotal,
      shipping: subtotal > 0 ? 199 : 0,
      total: subtotal + (subtotal > 0 ? 199 : 0),
      customer: {
        // in a real app you gather these from inputs, for now keep minimal
        name: (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>(
          'input[name="name"]'
        )?.value,
        email: (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>(
          'input[name="email"]'
        )?.value
      }
    };

    // Save a snapshot for the success page
    try {
      localStorage.setItem("ua_last_order", JSON.stringify(order));
    } catch (err) {
      console.warn("Could not save last order", err);
    }

    // Clear cart and navigate to success
    clearCart();
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Shipping details</h2>
        <Input name="name" placeholder="Full name" required />
        <Input name="email" placeholder="Email" type="email" required />
        <Input name="phone" placeholder="Phone" required />
        <Input name="address" placeholder="Address line" required />
        <div className="grid grid-cols-2 gap-2">
          <Input name="city" placeholder="City" required />
          <Input name="pincode" placeholder="Pincode" required />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Payment</h2>
        <p className="text-[0.7rem] text-muted">
          Payment is mocked for this prototype. Clicking “Place order” will create a fake order and clear the cart.
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black"
      >
        Place order
      </button>
    </form>
  );
}
