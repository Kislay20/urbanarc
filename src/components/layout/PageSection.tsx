import Link from "next/link";
import { ReactNode } from "react";

export default function PageSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  children
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-semibold">{title}</h2>
          {subtitle && (
            <p className="text-xs text-muted mt-1 max-w-xl">{subtitle}</p>
          )}
        </div>
        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            className="text-xs uppercase tracking-wide text-muted hover:text-white"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
