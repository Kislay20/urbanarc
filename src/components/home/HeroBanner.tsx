import Button from "@/components/ui/Button";
import { brandConfig } from "@/config/brand";
import Link from "next/link";

export default function HeroBanner() {
  const hero = brandConfig.hero;

  return (
    <section className="border-b border-border bg-gradient-to-b from-bg to-bg/95">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 py-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-4">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            New drop
          </p>
          <h1 className="text-4xl font-heading font-semibold md:text-5xl">
            {hero.title}
          </h1>
          <p className="max-w-xl text-sm text-muted">{hero.subtitle}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/shop">
              <Button>{hero.primaryCta}</Button>
            </Link>
            <Button variant="ghost">{hero.secondaryCta}</Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="aspect-[4/3] w-full rounded-xl border border-border bg-[radial-gradient(circle_at_top,_#FF4D4D33,_transparent_55%),_radial-gradient(circle_at_bottom,_#111827,_#050608)]" />
        </div>
      </div>
    </section>
  );
}
