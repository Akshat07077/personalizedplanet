"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { useStore } from "@/components/store";
import { cn } from "@/lib/cn";
import { generalOrderMessage, whatsappHref } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { openSearch, openCart, cartCount } = useStore();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="h-0.5 bg-gradient-to-r from-gold via-blush to-teal" />
      <div className="border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-ivory lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Logo />
          <nav className="ml-6 hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm transition hover:text-blush",
                    active ? "text-ink" : "text-muted",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="hidden h-10 w-10 place-items-center rounded-full hover:bg-ivory lg:grid"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart${cartCount ? `, ${cartCount} items` : ""}`}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-ivory"
            >
              <ShoppingBag className="h-4 w-4" />
              {cartCount > 0 ? (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] text-ivory">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <a
              href={whatsappHref(generalOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ivory transition hover:bg-[#2b2724] lg:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Order
            </a>
          </div>
        </div>
      </div>
      {open ? (
        <nav
          className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto border-t border-line bg-ivory px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-3 py-3 text-base hover:bg-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openSearch();
            }}
            className="mt-2 flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-base hover:bg-paper"
          >
            <Search className="h-4 w-4" />
            Search
          </button>
          <a
            href={whatsappHref(generalOrderMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-medium text-white"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Order on WhatsApp
          </a>
        </nav>
      ) : null}
    </header>
  );
}
