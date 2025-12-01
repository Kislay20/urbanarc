// src/lib/slugify.ts
export function slugify(input: string | undefined): string {
  if (!input) return "other";
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[@'’"“”`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
