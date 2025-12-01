import { ReactNode } from "react";
import Card from "@/components/ui/Card";

export default function CartSummary({
  subtotal,
  children
}: {
  subtotal: number;
  children?: ReactNode;
}) {
  const shipping = subtotal > 0 ? 199 : 0;
  const total = subtotal + shipping;

  return (
    <Card className="p-4 space-y-3">
      <h2 className="text-sm font-semibold">Order summary</h2>
      <div className="space-y-1 text-sm">
        <Row label="Subtotal" value={subtotal} />
        <Row label="Shipping" value={shipping} />
        <div className="mt-2 border-t border-border pt-2 font-semibold">
          <Row label="Total" value={total} />
        </div>
      </div>
      {children}
      <p className="text-[0.7rem] text-muted">
        This is a prototype. No real payment will be processed.
      </p>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span>₹{value.toLocaleString("en-IN")}</span>
    </div>
  );
}
