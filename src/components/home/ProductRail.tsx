import type { Product } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";

export default function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1">
      {products.map((p) => (
        <div key={p.id} className="w-[220px] flex-none">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
