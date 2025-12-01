import { ReactNode } from "react";
import clsx from "clsx";


export default function Badge({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "success" | "danger";
}) {
  const styles: Record<string, string> = {
    default: "bg-surface text-muted border border-border",
    success: "bg-green-500/10 text-green-400 border border-green-500/40",
    danger: "bg-red-500/10 text-red-400 border border-red-500/40"
  };

  return (
    <span className={clsx("inline-flex items-center rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase", styles[variant])}>
      {children}
    </span>
  );
}
