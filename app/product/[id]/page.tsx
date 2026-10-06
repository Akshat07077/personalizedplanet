import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MediaFrame } from "@/components/MediaFrame";
import { OrderPanel, ProductCard } from "@/components/store";
import { Container } from "@/components/ui";
import { getCategory } from "@/lib/catalog";
import {
  formatPrice,
  getProduct,
  getRelatedProducts,
  products,
  type Product,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Gift" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

  return (
    <Container className="py-8 md:py-14">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/shop" className="hover:text-ink">
          Shop
        </Link>
        {category ? (
          <>
            <span aria-hidden="true">/</span>
            <Link href={`/shop?category=${category.slug}`} className="hover:text-ink">
              {category.name}
            </Link>
          </>
        ) : null}
      </nav>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-ivory lg:sticky lg:top-24">
          <MediaFrame
            src={product.image}
            alt={product.name}
            priority
            sizes="(min-width: 1024px) 36rem, 100vw"
          />
        </div>
        <div>
          {product.customizable ? (
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold">Personalised</p>
          ) : null}
          <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg">{formatPrice(product)}</p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">{product.description}</p>
          <div className="mt-6 rounded-[1.4rem] bg-ivory p-5">
            <h2 className="text-sm font-medium">Customization</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{customizationCopy(product)}</p>
          </div>
          <OrderPanel product={product} />
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-serif text-3xl tracking-tight">More in {category?.name ?? "this category"}</h2>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}

function customizationCopy(product: Product) {
  if (product.customization) return product.customization;
  if (product.customizable) {
    return "This gift can be personalised. Share names, dates, photos, or a message in the notes, and we will confirm what is possible on WhatsApp.";
  }
  return "Ask us on WhatsApp if you would like this adapted for your occasion.";
}
