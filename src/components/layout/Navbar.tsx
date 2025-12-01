"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandConfig } from "@/config/brand";
import { mainNav } from "@/config/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import clsx from "clsx";
import { useUI } from "@/context/UIContext";

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const { openCart } = useUI();

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-lg bg-primary px-3 py-1 text-xs font-semibold">
            UA
          </div>
          <div>
            <div className="font-heading text-lg font-semibold tracking-tight">
              {brandConfig.logoText}
            </div>
            <div className="text-[0.65rem] text-muted">
              {brandConfig.tagline}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative group">
                <button className="text-xs uppercase tracking-wide text-muted hover:text-white">
                  {item.label}
                </button>
                <div className="invisible absolute left-0 mt-2 min-w-[160px] rounded-md border border-border bg-surface p-2 text-xs opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={`${item.label}-${child.href}`}
                      href={child.href}
                      className="block rounded px-2 py-1 text-muted hover:bg-bg hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "text-xs uppercase tracking-wide hover:text-white",
                  pathname === item.href ? "text-white" : "text-muted"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <input
              aria-label="Search"
              placeholder="Search products"
              className="rounded-md border border-border bg-bg px-3 py-1 text-sm text-white placeholder:text-muted focus:border-primary focus:outline-none"
            />
          </div>

          {/* Cart button - opens drawer */}
          <button
            onClick={openCart}
            className="relative text-xs uppercase"
            aria-label="Open cart"
          >
            <span className="rounded-full border border-border px-3 py-1 text-muted hover:border-primary hover:text-white">
              Cart
            </span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.1rem] items-center justify-center rounded-full bg-primary px-1 text-[0.65rem] font-semibold leading-none text-black">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="text-xs uppercase text-muted md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-bg px-4 py-3 text-sm md:hidden">
          <nav className="flex flex-col gap-3">
            {mainNav.map((item) =>
              item.children ? (
                <div key={`mobile-${item.label}`} className="flex flex-col gap-2">
                  <span className="text-xs uppercase text-muted">{item.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={`mobile-${item.label}-${child.href}`}
                        href={child.href}
                        className="rounded border border-border px-2 py-1 text-xs text-muted"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={`mobile-${item.href}`}
                  href={item.href}
                  className="text-xs uppercase text-muted"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
