export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="h-4 w-24 animate-pulse rounded-full bg-line" />
      <div className="mt-4 h-12 w-2/3 max-w-md animate-pulse rounded-2xl bg-line" />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="aspect-[3/4] animate-pulse rounded-[1.6rem] bg-ivory" />
        ))}
      </div>
    </div>
  );
}
