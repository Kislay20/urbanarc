"use client";
import { useCart } from "@/context/CartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import CartSummary from "@/components/cart/CartSummary";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const { items, subtotal, clearCart } = useCart();
  const hasItems = items.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-heading font-semibold">Cart</h1>

      {!hasItems && (
        <p className="text-sm text-muted">
          Your cart is empty. <Link href="/shop" className="underline">Continue shopping</Link>
        </p>
      )}

      {hasItems && (
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemRow key={`${item.product.id}-${item.size}`} item={item} />
            ))}
            <button onClick={clearCart} className="text-sm text-muted underline">Clear cart</button>
          </div>

          <CartSummary subtotal={subtotal}>
            <Link href="/checkout"><Button className="w-full mt-4">Checkout</Button></Link>
          </CartSummary>
        </div>
      )}
    </div>
  );
}
