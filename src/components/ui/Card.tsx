import { ReactNode } from "react";
import clsx from "clsx";


export default function Card({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-lg border border-border bg-surface", className)}>
      {children}
    </div>
  );
}
