"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-4xl tracking-tight">Something went wrong.</h1>
      <p className="mt-3 text-sm text-muted">Please try again. If it continues, message the studio on WhatsApp.</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-ivory"
      >
        Try again
      </button>
    </div>
  );
}
