// src/app/about/page.tsx
import PageSection from "@/components/layout/PageSection";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <PageSection title="About URBANARC" subtitle="Street. Sport. Statement.">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: Brand story */}
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-muted">
              URBANARC started as a simple idea: clothing that performs for the city and looks great
              in it too. We design functional pieces with clean lines — jackets built for movement,
              sneakers engineered for everyday runs, and staples that last.
            </p>

            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-2 text-sm font-semibold">Our approach</h3>
              <ul className="space-y-2 text-sm text-muted">
                <li>Thoughtful materials — breathable, durable, easy-care.</li>
                <li>Timeless details — minimal branding, maximum wearability.</li>
                <li>Sustainable choices — small batch, considered sourcing.</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Link href="/shop" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-black">
                Shop the collection
              </Link>
              <a href="#contact" className="rounded border border-border px-4 py-2 text-sm text-muted">
                Contact us
              </a>
            </div>
          </div>

          {/* Right: Team / stats */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-3 text-sm font-semibold">By the numbers</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="text-xl font-heading font-semibold">50+</div>
                  <div className="text-xs text-muted">SKUs (prototype)</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-heading font-semibold">4.8★</div>
                  <div className="text-xs text-muted">Avg customer rating</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-heading font-semibold">3</div>
                  <div className="text-xs text-muted">Designers & makers</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-heading font-semibold">100%</div>
                  <div className="text-xs text-muted">Passion</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-surface p-4">
              <h3 className="mb-3 text-sm font-semibold">Our values</h3>
              <div className="flex flex-col gap-2 text-sm text-muted">
                <div><strong>Design with intent.</strong> Every seam should serve a purpose.</div>
                <div><strong>Keep it honest.</strong> Simple, durable, responsibly made.</div>
                <div><strong>Community first.</strong> We make for people who move, create and explore.</div>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold">Press & partnerships</h4>
              <p className="text-sm text-muted">
                Interested in collaborating? Email{" "}
                <a href="mailto:collabs@urbanarc.example" className="text-primary underline">
                  collabs@urbanarc.example
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* Mission section */}
      <PageSection title="Our mission" subtitle="">
        <p className="text-sm text-muted leading-relaxed">
          We build thoughtfully — focusing on design details that improve everyday life.
          Whether you commute, train, or wander the city, URBANARC pieces are designed to
          move with you and withstand real use.
        </p>
      </PageSection>

      {/* Contact CTA */}
      <PageSection title="Get in touch" subtitle="Questions, collabs, or press?">
        <div className="rounded-lg border border-border bg-surface p-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted">
            For wholesale and press: <strong>collabs@urbanarc.example</strong>
            <br />
            For general inquiries: <strong>hello@urbanarc.example</strong>
          </div>
          <a id="contact" href="/contact" className="rounded bg-primary px-4 py-2 text-sm font-semibold text-black">
            Contact us
          </a>
        </div>
      </PageSection>
    </div>
  );
}
