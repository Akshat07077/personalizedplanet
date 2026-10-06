import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsAppIcon } from "@/components/icons";
import { categories } from "@/lib/catalog";
import { mapsHref, site } from "@/lib/site";
import { generalOrderMessage, whatsappHref } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.about}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-blush">Shop</Link></li>
            <li><Link href="/#categories" className="hover:text-blush">Categories</Link></li>
            <li><Link href="/about" className="hover:text-blush">About</Link></li>
            <li><Link href="/contact" className="hover:text-blush">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Categories</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/shop?category=${category.slug}`} className="hover:text-blush">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Contact</p>
          <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted">
            <p className="text-ink">{site.name}</p>
            <p>{site.address.studio}</p>
            <p>{site.address.line}</p>
            <p>
              {site.address.city}, {site.address.region}
            </p>
            <p>
              {site.address.country} – {site.address.postalCode}
            </p>
          </address>
          <div className="mt-4 space-y-2 text-sm">
            <a
              href={whatsappHref(generalOrderMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-blush"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {site.whatsappDisplay}
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-blush"
            >
              {site.handle}
            </a>
            <a href={mapsHref()} target="_blank" rel="noopener noreferrer" className="block hover:text-blush">
              Open in Maps
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Personalised Planet. All rights reserved.</p>
          <p>Indore</p>
        </div>
      </div>
      <div className="h-20 md:hidden" />
    </footer>
  );
}
