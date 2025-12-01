import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "URBANARC | Street. Sport. Statement.",
  description: "Streetwear & athleisure clothing store prototype.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <UIProvider>
          <div className="flex min-h-screen flex-col bg-bg">
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          </UIProvider>
        </CartProvider>
      </body>
    </html>
  );
}

