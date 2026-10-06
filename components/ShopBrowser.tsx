"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/store";
import { WhatsAppIcon } from "@/components/icons";
import { Button, Container } from "@/components/ui";
import { categories, getCategory } from "@/lib/catalog";
import { filterProducts } from "@/lib/products";
import { generalOrderMessage, whatsappHref } from "@/lib/whatsapp";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "name-asc", label: "Name, A–Z" },
  { id: "name-desc", label: "Name, Z–A" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
];

export function ShopBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const category = params.get("category") ?? "all";
  const query = params.get("q") ?? "";
  const sort = params.get("sort") ?? "featured";
  const [draft, setDraft] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setDraft(query);
  }
  const activeCategory = category === "all" ? undefined : getCategory(category);
  const results = filterProducts({
    category: activeCategory ? category : "all",
    query: draft,
    sort,
  });

  function update(partial: { category?: string; q?: string; sort?: string }) {
    const next = new URLSearchParams(params.toString());
    const merged = {
      category: partial.category ?? category,
      q: partial.q ?? query,
      sort: partial.sort ?? sort,
    };

    if (merged.q.trim()) next.set("q", merged.q);
    else next.delete("q");

    if (merged.category && merged.category !== "all") next.set("category", merged.category);
    else next.delete("category");

    if (merged.sort && merged.sort !== "featured") next.set("sort", merged.sort);
    else next.delete("sort");

    const value = next.toString();
    router.replace(value ? `/shop?${value}` : "/shop", { scroll: false });
  }

  useEffect(() => {
    if (draft === query) return;
    const handle = window.setTimeout(() => update({ q: draft }), 250);
    return () => window.clearTimeout(handle);
    // update closes over the latest filters; draft is the only trigger we want.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  return (
    <Container className="py-10 md:py-14">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Shop</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl tracking-tight md:text-5xl">
            {activeCategory ? activeCategory.name : "All gifts"}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            {activeCategory
              ? activeCategory.blurb
              : "Personalised gifts from Indore. Prices are shared on request."}
          </p>
        </div>
        {results.length > 0 ? (
          <p className="text-sm text-muted">
            {results.length} {results.length === 1 ? "gift" : "gifts"}
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <FilterChip active={category === "all" || !activeCategory} onClick={() => update({ category: "all" })}>
            All
          </FilterChip>
          {categories.map((item) => (
            <FilterChip
              key={item.slug}
              active={category === item.slug}
              onClick={() => update({ category: item.slug })}
            >
              {item.name}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Search gifts</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Search gifts"
              className="h-11 w-full rounded-full border border-line bg-ivory py-2 pl-10 pr-4 text-sm outline-none sm:w-56"
            />
          </label>
          <label className="sr-only" htmlFor="sort">
            Sort
          </label>
          <select
            id="sort"
            value={sorts.some((item) => item.id === sort) ? sort : "featured"}
            onChange={(event) => update({ sort: event.target.value })}
            className="h-11 rounded-full border border-line bg-ivory px-4 text-sm outline-none"
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-[2rem] bg-ivory px-6 py-16 text-center">
          <p className="font-serif text-3xl tracking-tight">Nothing in this view yet.</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            {draft.trim()
              ? "No gifts match that search. Try another word, or tell us what you need on WhatsApp."
              : activeCategory
                ? "Nothing from this category is listed yet. Tell us the occasion and we will help you find or customise a gift."
                : "Tell us the occasion, a name, or a photo reference. We will help you find or customise a gift, and confirm the price on WhatsApp."}
          </p>
          <Button href={whatsappHref(generalOrderMessage())} external variant="whatsapp" className="mt-6">
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
        active ? "bg-ink text-ivory" : "bg-ivory text-ink hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}
