import type { CategorySlug, Product } from "@/types/product";

const mockProducts: Product[] = [
  {
    id: "1",
    slug: "night-shift-runner-black",
    name: "Night Shift Runner - Black",
    descriptionShort: "Stealth knit sneaker with reflective panels.",
    descriptionLong:
      "Built for late-night city runs and everyday flex. Breathable knit upper with reflective overlays and cushioned midsole.",
    price: 3999,
    oldPrice: 4999,
    category: "shoes",
    tags: ["night-shift", "sneakers"],
    isNew: true,
    isOnSale: true,
    images: ["/images/products/night-shift-runner-1.jpg"],
    sizes: ["7", "8", "9", "10", "11"],
    subtitle: "Reflective jackets & stealth sneakers", // short tagline shown under title
    description:
      "Built for night runs and late nights. Breathable mesh upper, responsive midsole foam, and a reflective heel tab for visibility. Comfortable for everyday wear and engineered for performance.",
    sku: "NSR-BLK-001",
    isFeatured: true
  },
  {
    id: "2",
    slug: "thermal-puffer-ember-red",
    name: "Thermal Puffer - Ember Red",
    descriptionShort: "Insulated puffer jacket for cold commutes.",
    descriptionLong:
      "High-fill insulation with water-resistant outer shell. Internal media pocket and adjustable hood.",
    price: 4499,
    oldPrice: 0,
    category: "jackets",
    tags: ["winter-core"],
    isNew: true,
    isOnSale: false,
    images: ["/images/products/thermal-puffer-ember-1.jpg"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    slug: "oversize-graphic-tee-noise-white",
    name: "Oversize Graphic Tee - Noise White",
    descriptionShort: "Heavyweight tee with glitch graphic print.",
    descriptionLong:
      "240 GSM cotton, boxy fit, dropped shoulders. Screen-printed artwork inspired by city noise.",
    price: 1299,
    oldPrice: 1499,
    category: "t-shirts",
    tags: ["graphic", "street"],
    isNew: false,
    isOnSale: true,
    images: ["/images/products/graphic-tee-noise-1.jpg"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "4",
    slug: "check-overshirt-slate-olive",
    name: "Check Overshirt - Slate Olive",
    descriptionShort: "Layer-friendly overshirt in brushed cotton.",
    descriptionLong:
      "Perfect for layering over tees. Brushed cotton with dual chest pockets and curved hem.",
    price: 1999,
    oldPrice: 0,
    category: "shirts",
    tags: ["layering"],
    isNew: false,
    isOnSale: false,
    images: ["/images/products/check-overshirt-slate-1.jpg"],
    sizes: ["S", "M", "L", "XL"]
  }
];

export function getAllProducts(): Product[] {
  return mockProducts;
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  if (category === "new-in") {
    return mockProducts.filter((p) => p.isNew);
  }
  if (category === "sale") {
    return mockProducts.filter((p) => p.isOnSale);
  }
  return mockProducts.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((p) => p.isNew || p.isOnSale).slice(0, 8);
}
