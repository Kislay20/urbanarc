import { getAllCategories } from "@/lib/categories";

export default function DebugCategories() {
  const cats = getAllCategories();
  return (
    <div className="p-6">
      <h1 className="mb-4 text-lg font-semibold">Category slugs</h1>
      <ul>
        {cats.map((c) => (
          <li key={c.slug} className="mb-2">
            <strong>{c.name}</strong> → <code>/category/{c.slug}</code> (count: {c.count})
          </li>
        ))}
      </ul>
    </div>
  );
}
