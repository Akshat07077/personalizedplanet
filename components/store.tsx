"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { createContext, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Minus, Plus, Search, ShoppingBag, Trash, X } from "lucide-react";
import { formatPrice, getProduct, products, type Product } from "@/lib/products";
import {
  cartOrderMessage,
  productOrderMessage,
  type CartLine,
  whatsappHref,
} from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";
import { MediaFrame } from "@/components/MediaFrame";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "personalised-planet-cart";
const CART_EVENT = "personalised-planet-cart-change";

function parseLines(raw: string) {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
}

function subscribeCart(onStoreChange: () => void) {
  window.addEventListener(CART_EVENT, onStoreChange);
  return () => window.removeEventListener(CART_EVENT, onStoreChange);
}

function getCartSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function writeCart(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

type StoreContextValue = {
  lines: CartLine[];
  cartCount: number;
  cartOpen: boolean;
  searchOpen: boolean;
  quickView: Product | null;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  addLine: (productId: string, quantity: number, notes: string) => void;
  updateLine: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return (
    typeof line.key === "string" &&
    typeof line.productId === "string" &&
    typeof line.quantity === "number" &&
    typeof line.notes === "string"
  );
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const rawLines = useSyncExternalStore(subscribeCart, getCartSnapshot, () => "[]");
  const lines = useMemo(() => parseLines(rawLines), [rawLines]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const pathname = usePathname();
  const [route, setRoute] = useState(pathname);

  if (pathname !== route) {
    setRoute(pathname);
    setCartOpen(false);
    setSearchOpen(false);
    setQuickView(null);
  }

  const overlayOpen = cartOpen || searchOpen || quickView !== null;

  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  const value = useMemo<StoreContextValue>(
    () => ({
      lines,
      cartCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      cartOpen,
      searchOpen,
      quickView,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      openQuickView: (product) => setQuickView(product),
      closeQuickView: () => setQuickView(null),
      addLine: (productId, quantity, notes) => {
        const trimmed = notes.trim();
        const existing = lines.find(
          (line) => line.productId === productId && line.notes === trimmed,
        );
        const next = existing
          ? lines.map((line) =>
              line.key === existing.key
                ? { ...line, quantity: Math.min(99, line.quantity + quantity) }
                : line,
            )
          : [
              ...lines,
              {
                key: `${productId}-${Date.now()}`,
                productId,
                quantity,
                notes: trimmed,
              },
            ];
        writeCart(next);
        setCartOpen(true);
        setQuickView(null);
      },
      updateLine: (key, quantity) => {
        writeCart(
          lines.flatMap((line) => {
            if (line.key !== key) return [line];
            if (quantity < 1) return [];
            return [{ ...line, quantity: Math.min(99, quantity) }];
          }),
        );
      },
      removeLine: (key) => {
        writeCart(lines.filter((line) => line.key !== key));
      },
    }),
    [lines, cartOpen, searchOpen, quickView],
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      <SearchDialog />
      <QuickView />
      <CartDrawer />
    </StoreContext.Provider>
  );
}

function Overlay({
  label,
  onClose,
  children,
  align = "center",
}: {
  label: string;
  onClose: () => void;
  children: ReactNode;
  align?: "center" | "end" | "sheet";
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex bg-ink/40 p-3 backdrop-blur-[2px] md:p-6",
        align === "end" && "justify-end",
        align === "center" && "items-end justify-center md:items-center",
        align === "sheet" && "items-end justify-center md:items-center",
      )}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="relative z-10 max-h-[92vh] overflow-y-auto"
      >
        {children}
      </div>
    </div>
  );
}

function SearchDialog() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(searchOpen);
  const router = useRouter();

  if (searchOpen !== wasOpen) {
    setWasOpen(searchOpen);
    if (searchOpen) setQuery("");
  }

  if (!searchOpen) return null;

  const results = products
    .filter((product) => {
      const haystack = `${product.name} ${product.description}`.toLowerCase();
      return haystack.includes(query.trim().toLowerCase());
    })
    .slice(0, 6);

  return (
    <Overlay label="Search gifts" onClose={closeSearch} align="center">
      <div className="w-[min(100%,36rem)] rounded-3xl bg-ivory p-4 shadow-2xl md:p-6">
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <Search className="h-4 w-4 text-muted" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                closeSearch();
                router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
              }
            }}
            placeholder="Search gifts"
            className="w-full bg-transparent text-base outline-none placeholder:text-muted"
            aria-label="Search gifts"
          />
          <button type="button" onClick={closeSearch} aria-label="Close search" className="rounded-full p-2 hover:bg-paper">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">
          {products.length === 0 ? (
            <p className="px-1 py-6 text-sm leading-relaxed text-muted">
              Tell us the occasion on WhatsApp and we will help you find a gift.
            </p>
          ) : results.length === 0 ? (
            <p className="px-1 py-6 text-sm text-muted">No gifts match that search.</p>
          ) : (
            <ul className="space-y-1">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={closeSearch}
                    className="flex items-center justify-between rounded-2xl px-3 py-3 hover:bg-paper"
                  >
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-xs text-muted">{formatPrice(product)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop"}
            onClick={closeSearch}
            className="mt-2 inline-flex px-3 py-2 text-sm font-medium text-gold"
          >
            View the shop
          </Link>
        </div>
      </div>
    </Overlay>
  );
}

function QuickView() {
  const { quickView, closeQuickView, addLine } = useStore();
  const productId = quickView?.id ?? "";
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [formFor, setFormFor] = useState(productId);

  if (productId !== formFor) {
    setFormFor(productId);
    setQuantity(1);
    setNotes("");
  }

  if (!quickView) return null;

  return (
    <Overlay label={quickView.name} onClose={closeQuickView} align="sheet">
      <div className="grid w-[min(100%,52rem)] overflow-hidden rounded-3xl bg-ivory shadow-2xl md:grid-cols-2">
        <div className="relative aspect-square bg-paper">
          <MediaFrame
            src={quickView.image}
            alt={quickView.name}
            sizes="(min-width: 768px) 26rem, 100vw"
          />
        </div>
        <div className="relative p-5 md:p-7">
          <button
            type="button"
            onClick={closeQuickView}
            aria-label="Close quick view"
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-paper"
          >
            <X className="h-4 w-4" />
          </button>
          {quickView.customizable ? (
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Personalised</p>
          ) : null}
          <h2 className="mt-2 pr-8 font-serif text-3xl tracking-tight">{quickView.name}</h2>
          <p className="mt-3 text-sm text-muted">{formatPrice(quickView)}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">{quickView.description}</p>
          <QuantityField quantity={quantity} onChange={setQuantity} />
          <label className="mt-4 block text-sm">
            <span className="font-medium">Customization notes</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Names, dates, colours, or a message"
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-paper px-3 py-3 text-sm outline-none"
            />
          </label>
          <div className="mt-5 flex flex-col gap-2">
            <Button
              href={whatsappHref(productOrderMessage(quickView, quantity, notes))}
              external
              variant="whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </Button>
            <Button variant="secondary" onClick={() => addLine(quickView.id, quantity, notes)}>
              <ShoppingBag className="h-4 w-4" />
              Add to cart
            </Button>
            <Link
              href={`/product/${quickView.id}`}
              onClick={closeQuickView}
              className="py-2 text-center text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </Overlay>
  );
}

function CartDrawer() {
  const { cartOpen, closeCart, lines, updateLine, removeLine } = useStore();
  if (!cartOpen) return null;

  const detailed = lines.flatMap((line) => {
    const product = getProduct(line.productId);
    if (!product) return [];
    return [{ line, product }];
  });

  const message = cartOrderMessage(
    detailed.map(({ line, product }) => ({
      name: product.name,
      quantity: line.quantity,
      notes: line.notes,
    })),
  );

  const allPriced = detailed.length > 0 && detailed.every(({ product }) => product.price != null);
  const total = detailed.reduce(
    (sum, { line, product }) => sum + (product.price ?? 0) * line.quantity,
    0,
  );

  return (
    <Overlay label="Cart" onClose={closeCart} align="end">
      <div className="flex h-[min(92vh,44rem)] w-[min(100vw-1.5rem,24rem)] flex-col rounded-3xl bg-ivory shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 className="font-serif text-2xl">Cart</h2>
            <p className="text-xs text-muted">Send this list on WhatsApp. Nothing is paid online.</p>
          </div>
          <button type="button" onClick={closeCart} aria-label="Close cart" className="rounded-full p-2 hover:bg-paper">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {detailed.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-serif text-2xl">Your cart is empty.</p>
              <p className="mt-2 text-sm text-muted">Browse the shop and add a gift to enquire.</p>
              <Button href="/shop" className="mt-6" onClick={closeCart}>
                Shop gifts
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {detailed.map(({ line, product }) => (
                <li key={line.key} className="flex gap-3">
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl">
                    <MediaFrame src={product.image} alt="" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="mt-1 text-xs text-muted">{formatPrice(product)}</p>
                    {line.notes ? <p className="mt-1 line-clamp-2 text-xs text-muted">{line.notes}</p> : null}
                    <div className="mt-2 flex items-center gap-2">
                      <QuantityField
                        quantity={line.quantity}
                        onChange={(quantity) => updateLine(line.key, quantity)}
                        compact
                      />
                      <button
                        type="button"
                        onClick={() => removeLine(line.key)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-full p-2 text-muted hover:bg-paper hover:text-ink"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {detailed.length > 0 ? (
          <div className="border-t border-line px-5 py-4">
            <p className="mb-3 text-sm text-muted">
              {allPriced
                ? `Total ${new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(total)}`
                : "Price on request"}
            </p>
            <Button href={whatsappHref(message)} external variant="whatsapp" className="w-full">
              <WhatsAppIcon className="h-4 w-4" />
              Order on WhatsApp
            </Button>
          </div>
        ) : null}
      </div>
    </Overlay>
  );
}

export function QuantityField({
  quantity,
  onChange,
  compact = false,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("mt-4", compact && "mt-0")}>
      {compact ? null : <span className="text-sm font-medium">Quantity</span>}
      <div
        className={cn(
          "inline-flex items-center rounded-full border border-line bg-paper",
          compact ? "" : "mt-2",
        )}
      >
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => onChange(quantity - 1)}
          disabled={quantity <= 1}
          className="grid h-10 w-10 place-items-center disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-6 text-center text-sm">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => onChange(Math.min(99, quantity + 1))}
          className="grid h-10 w-10 place-items-center"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { openQuickView } = useStore();

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-ivory shadow-[0_16px_40px_-28px_rgba(28,25,23,0.45)]">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={product.name} />
        <MediaFrame src={product.image} alt="" sizes="(min-width: 1024px) 22vw, 45vw" />
        {product.customizable ? (
          <span className="absolute left-3 top-3 z-20 rounded-full bg-ivory/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink">
            Personalised
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          <Link href={`/product/${product.id}`} className="hover:text-blush">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{formatPrice(product)}</p>
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            onClick={() => openQuickView(product)}
            className="inline-flex h-10 items-center justify-center rounded-full border border-line bg-ivory px-3 text-xs font-medium transition hover:border-ink/30"
          >
            Quick view
          </button>
          <a
            href={whatsappHref(productOrderMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-whatsapp px-2 py-2 text-center text-[11px] font-medium leading-tight text-white transition hover:bg-[#116848]"
          >
            <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
            Order on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

export function OrderPanel({ product }: { product: Product }) {
  const { addLine } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  return (
    <div className="mt-6">
      <QuantityField quantity={quantity} onChange={setQuantity} />
      <label className="mt-4 block text-sm">
        <span className="font-medium">Customization notes</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={4}
          placeholder="Names, dates, colours, photos, or a message"
          className="mt-2 w-full resize-none rounded-2xl border border-line bg-ivory px-4 py-3 text-sm outline-none"
        />
      </label>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button
          href={whatsappHref(productOrderMessage(product, quantity, notes))}
          external
          variant="whatsapp"
          className="sm:flex-1"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Order on WhatsApp
        </Button>
        <Button variant="secondary" onClick={() => addLine(product.id, quantity, notes)}>
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </Button>
      </div>
    </div>
  );
}
