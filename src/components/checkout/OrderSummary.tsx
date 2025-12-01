"use client";

import { useCart } from "@/context/CartContext";
import CartSummary from "@/components/cart/CartSummary";

export default function OrderSummary() {
  const { subtotal } = useCart();
  return <CartSummary subtotal={subtotal} />;
}
