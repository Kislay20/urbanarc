export default function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] w-full rounded-lg border border-border bg-gradient-to-b from-surface to-bg" />
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <div
            key={img + idx}
            className="h-16 flex-1 rounded-md border border-border bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
