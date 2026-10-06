import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StoreProvider } from "@/components/store";
import { site } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: {
    default: "Personalised Planet | Personalised Gifts in Indore",
    template: "%s · Personalised Planet",
  },
  description: site.tagline,
  icons: {
    icon: [{ url: site.logoImage, type: "image/jpeg" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: site.name,
  description: site.about,
  telephone: `+${site.whatsappNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.studio}, ${site.address.line}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: "IN",
  },
  sameAs: [site.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <StoreProvider>
          <Navbar />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </StoreProvider>
      </body>
    </html>
  );
}
