import type { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
}
