export type CategorySlug =
  | "shoes"
  | "jackets"
  | "shirts"
  | "t-shirts"
  | "new-in"
  | "sale";

export type Product = {
  id: string;
  slug: string;
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  price: number;
  oldPrice?: number;
  category: CategorySlug;
  tags: string[];
  isNew: boolean;
  isOnSale: boolean;
  images: string[];
  sizes: string[];
  subtitle?: string;
  description?: string;
  sku?: string;
  isFeatured?: boolean;
};
