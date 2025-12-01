import Link from "next/link";

const categories = [
  { slug: "shoes", label: "Shoes", description: "Sneakers & runners" },
  { slug: "jackets", label: "Jackets", description: "Bombers & puffers" },
  { slug: "shirts", label: "Shirts", description: "Overshirts & layers" },
  { slug: "t-shirts", label: "T-shirts", description: "Graphics & basics" }
];

export default function CategoryGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="group rounded-lg border border-border bg-surface p-4 transition hover:border-primary hover:bg-bg"
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-heading text-sm font-semibold">
              {cat.label}
            </h3>
            <span className="text-[0.6rem] uppercase text-muted group-hover:text-primary">
              Shop
            </span>
          </div>
          <p className="text-[0.7rem] text-muted">{cat.description}</p>
        </Link>
      ))}
    </div>
  );
}
