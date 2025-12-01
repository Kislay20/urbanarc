"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-bg";
  const variants: Record<typeof variant, string> = {
    primary:
      "bg-primary text-black hover:bg-primary-dark disabled:bg-muted disabled:text-bg",
    outline:
      "border border-border bg-transparent text-white hover:border-primary hover:text-primary",
    ghost:
      "bg-transparent text-muted hover:bg-surface hover:text-white"
  };

  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
}
