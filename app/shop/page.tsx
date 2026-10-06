import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopBrowser } from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse personalised gifts from Personalised Planet in Indore. Filter by category and order on WhatsApp.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-5 py-16 text-sm text-muted">Loading the shop…</div>
      }
    >
      <ShopBrowser />
    </Suspense>
  );
}
