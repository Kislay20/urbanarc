import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductRail from "@/components/home/ProductRail";
import PageSection from "@/components/layout/PageSection";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="space-y-12 pb-16">
      <HeroBanner />

      <PageSection
        title="Shop by Category"
        subtitle="Sneakers, jackets, shirts and tees built for the city."
      >
        <CategoryGrid />
      </PageSection>

      <PageSection
        title="Featured Heat"
        subtitle="Fresh drops and on-sale pieces the community is loving."
        ctaLabel="View all"
        ctaHref="/shop"
      >
        <ProductRail products={featured} />
      </PageSection>
    </div>
  );
}
