import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Cake,
  Flower2,
  Heart,
  Image as PhotoIcon,
  Lamp,
  Sparkles,
  Star,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { InstagramIcon } from "@/components/icons";
import { MediaFrame } from "@/components/MediaFrame";
import { ProductCard } from "@/components/store";
import { WhatsAppIcon } from "@/components/icons";
import { Button, Container, SectionHeading } from "@/components/ui";
import { categories, occasions, reasons, trustPoints } from "@/lib/catalog";
import { getFeaturedProducts } from "@/lib/products";
import { lookbook, site } from "@/lib/site";
import { generalOrderMessage, whatsappHref } from "@/lib/whatsapp";

const categoryIcons = {
  "personalised-gifts": Sparkles,
  "home-decor": Lamp,
  "photo-gifts": PhotoIcon,
  "corporate-gifts": Briefcase,
  "birthday-gifts": Cake,
  "wedding-gifts": Heart,
  "festive-gifts": Flower2,
  "trending-gifts": Star,
} as const;

export function Hero() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
            Indore · Personalised gifts
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-[3.1rem] leading-[0.98] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Make Every Gift <span className="italic text-blush">Personal.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{site.tagline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/shop">Shop Gifts</Button>
            <Button href={whatsappHref(generalOrderMessage())} external variant="secondary">
              <WhatsAppIcon className="h-4 w-4 text-whatsapp" />
              Order on WhatsApp
            </Button>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

const heroGifts = [
  {
    src: "/products/diary-gift-set.jpg",
    alt: "Open diary gift set with a pen, card holder, and keychain",
    label: "Diary gift set",
    frame: "hero-gift-front",
  },
  {
    src: "/products/leather-gift-set.jpg",
    alt: "Personalised leather gift set in an open box",
    label: "Leather gift set",
    frame: "hero-gift-back",
  },
] as const;

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-ivory shadow-[0_30px_80px_-36px_rgba(28,25,23,0.45)]">
      {heroGifts.map((gift, index) => (
        <div key={gift.src} className={`absolute inset-0 ${gift.frame}`}>
          <Image
            src={gift.src}
            alt={gift.alt}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 28rem, 92vw"
            className="object-cover"
          />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-16 text-sm font-medium text-white">
            {gift.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-ivory/70" aria-label="Why people order">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {trustPoints.map((point, index) => (
          <p
            key={point}
            className={`px-2 py-5 text-center text-sm font-medium text-ink sm:px-4 ${
              index > 0 ? "lg:border-l lg:border-line" : ""
            }`}
          >
            {point}
          </p>
        ))}
      </Container>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section id="categories" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Shop by category"
          text="These are the kinds of gifts Personalised Planet makes. Ask on WhatsApp if you do not see the exact piece yet."
          action={
            <Link href="/shop" className="text-sm font-medium text-ink underline-offset-4 hover:underline">
              View the shop
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug];
            return (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[1.6rem] p-4 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-28px_rgba(28,25,23,0.5)] sm:p-5"
              >
                <span className="absolute inset-0 z-0">
                  <MediaFrame
                    src={category.image}
                    alt=""
                    tone={category.tone}
                    imageClassName={"imageClass" in category ? category.imageClass : undefined}
                  />
                </span>
                <span className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/25 to-black/15" />
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-ivory/90 text-ink">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="relative z-10 text-white">
                  <span className="block font-serif text-xl leading-tight tracking-tight sm:text-2xl">
                    {category.name}
                  </span>
                  <span className="mt-2 hidden text-sm leading-relaxed text-white/85 sm:block">
                    {category.blurb}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <SectionHeading
          eyebrow="The shop"
          title="Featured gifts"
          text="Each gift can be opened, personalised, and ordered on WhatsApp."
        />
        {featured.length === 0 ? (
          <div className="rounded-[2rem] bg-ivory px-6 py-12 text-center shadow-[0_20px_50px_-36px_rgba(28,25,23,0.45)] sm:px-10 sm:py-16">
            <p className="mx-auto max-w-xl font-serif text-3xl tracking-tight sm:text-4xl">
              Looking for a particular gift?
            </p>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted">
              Share the occasion, a name, or a photo reference. We will help you find or customise it, and confirm the price on WhatsApp.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={whatsappHref(generalOrderMessage())} external variant="whatsapp">
                <WhatsAppIcon className="h-4 w-4" />
                Order on WhatsApp
              </Button>
              <Button href="/shop" variant="secondary">
                Browse the shop
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="bg-[#221f1c] py-16 text-ivory md:py-24">
      <Container>
        <SectionHeading
          eyebrow="The studio"
          title="Why Choose Personalised Planet?"
          tone="dark"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6 transition duration-300 hover:bg-white/8"
            >
              <h3 className="font-serif text-2xl tracking-tight">{reason.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/70">{reason.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Occasions() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Occasions"
          title="Find a Gift For Every Moment"
          text="Start with the moment. We will help with the gift."
        />
        <ul className="divide-y divide-line border-y border-line">
          {occasions.map((occasion) => (
            <li key={occasion.name}>
              <Link
                href={occasion.href}
                className="group flex items-center justify-between gap-4 py-5 transition hover:px-2"
              >
                <span>
                  <span className="block font-serif text-2xl tracking-tight sm:text-3xl">
                    {occasion.name}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{occasion.line}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-gold transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function HowToOrder() {
  const steps = [
    {
      title: "Choose a gift",
      text: "Browse by category, or tell us the occasion.",
    },
    {
      title: "Share the details",
      text: "Names, dates, photos, or a short note.",
    },
    {
      title: "Confirm on WhatsApp",
      text: "We reply with the price and how it can be personalised.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading eyebrow="Ordering" title="From the studio to WhatsApp" />
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-[1.6rem] bg-ivory p-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">
                0{index + 1}
              </p>
              <h3 className="mt-3 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <SectionHeading
          eyebrow="Instagram"
          title="See More From Personalised Planet"
          text="The latest gifts and custom orders live on Instagram."
          action={
            <Button href={site.instagram} external variant="secondary">
              <InstagramIcon className="h-4 w-4" />
              Follow us on Instagram
            </Button>
          }
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {lookbook.map((item, index) =>
            item.src ? (
              <a
                key={`${item.tone}-${index}`}
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-[1.4rem]"
              >
                <MediaFrame src={item.src} alt={item.alt} tone={item.tone} sizes="(min-width: 640px) 30vw, 45vw" />
              </a>
            ) : (
              <div
                key={`${item.tone}-${index}`}
                className="relative aspect-square overflow-hidden rounded-[1.4rem]"
              >
                <MediaFrame src={null} alt="" tone={item.tone} />
              </div>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}

export function AboutSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const Title = as;

  return (
    <section id="about" className="scroll-mt-20 border-t border-line py-16 md:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">About</p>
          <Title className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Thoughtful gifts, made in Indore.
          </Title>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{site.about}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" variant="primary">
              Contact the studio
            </Button>
            <Button href={site.instagram} external variant="secondary">
              <InstagramIcon className="h-4 w-4" />
              {site.handle}
            </Button>
          </div>
        </div>
        <address className="rounded-[1.8rem] bg-ivory p-7 not-italic shadow-[0_20px_50px_-36px_rgba(28,25,23,0.4)]">
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            {site.address.studio}
            <br />
            {site.address.line}
            <br />
            {site.address.city}, {site.address.region}
            <br />
            {site.address.country} – {site.address.postalCode}
          </p>
        </address>
      </Container>
    </section>
  );
}

export function ContactSection({ as = "h2" }: { as?: "h1" | "h2" }) {
  const Title = as;

  return (
    <section id="contact" className="scroll-mt-20 bg-ivory py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">Contact</p>
          <Title className="mt-3 font-serif text-4xl tracking-tight md:text-5xl">
            Have something specific in mind?
          </Title>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Tell us what you&apos;re looking for and we&apos;ll help you find or customise it.
          </p>
          <address className="mt-8 space-y-1 text-sm not-italic leading-relaxed">
            <p className="font-medium">{site.name}</p>
            <p className="text-muted">{site.address.studio}</p>
            <p className="text-muted">{site.address.line}</p>
            <p className="text-muted">
              {site.address.city}, {site.address.region}
            </p>
            <p className="text-muted">
              {site.address.country} – {site.address.postalCode}
            </p>
          </address>
          <div className="mt-6 space-y-2 text-sm">
            <p>
              <span className="text-muted">WhatsApp: </span>
              <a
                href={whatsappHref(generalOrderMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                {site.whatsappDisplay}
              </a>
            </p>
            <p>
              <span className="text-muted">Instagram: </span>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline-offset-4 hover:underline"
              >
                {site.handle}
              </a>
            </p>
          </div>
        </div>
        <ContactForm />
      </Container>
    </section>
  );
}
