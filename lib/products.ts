import { getCategory, type CategorySlug } from "@/lib/catalog";

export type Product = {
  id: string;
  name: string;
  image: string | null;
  price: number | null;
  category: CategorySlug;
  description: string;
  customizable: boolean;
  featured: boolean;
  customization?: string;
};

/**
 * Add a gift by dropping its photo in /public/products
 * and appending an object here. Leave price as null until
 * the studio confirms a real price — the site will show
 * "Price on request" or "Customize & enquire".
 *
 * {
 *   id: "linen-photo-frame",
 *   name: "Linen photo frame",
 *   image: "/products/linen-photo-frame.jpg",
 *   price: null,
 *   category: "photo-gifts",
 *   description: "A frame for a photograph you want to give.",
 *   customizable: true,
 *   featured: true,
 *   customization: "Share the photo, names, and date on WhatsApp.",
 * }
 */
export const products: Product[] = [
  {
    id: "hot-cold-tumbler",
    name: "1200 ml hot & cold tumbler",
    image: "/products/hot-cold-tumbler.jpg",
    price: null,
    category: "trending-gifts",
    description:
      "A 1200 ml double-wall tumbler with a handle and spill-proof lid. It is made to hold hot and cold drinks.",
    customizable: true,
    featured: true,
    customization: "Tell us the colour, and if you want a name added.",
  },
  {
    id: "photo-frames",
    name: "Custom photo frames",
    image: "/products/photo-frames.jpg",
    price: null,
    category: "photo-gifts",
    description:
      "Printed photo frames made around pictures, a number, or a message.",
    customizable: true,
    featured: true,
    customization: "Share the photos and the words you want in the frame.",
  },
  {
    id: "diary-gift-set",
    name: "Diary gift set",
    image: "/products/diary-gift-set.jpg",
    price: null,
    category: "personalised-gifts",
    description:
      "A four-in-one set with a diary, pen, card holder, and keychain.",
    customizable: true,
    featured: true,
    customization: "Tell us the name or message you want added.",
  },
  {
    id: "leather-gift-set",
    name: "Personalised leather gift set",
    image: "/products/leather-gift-set.jpg",
    price: null,
    category: "personalised-gifts",
    description:
      "Wallet, card holder, keychain, and passport holder in one box. Names can be added on the pieces.",
    customizable: true,
    featured: true,
    customization: "Share the name you want on the leather pieces.",
  },
  {
    id: "wooden-engraving",
    name: "Custom wooden engraving",
    image: "/products/wooden-engraving.jpg",
    price: null,
    category: "home-decor",
    description:
      "A wooden piece engraved with names, dates, a quote, or a message. Made for birthdays, anniversaries, weddings, and other gifts.",
    customizable: true,
    featured: true,
    customization: "Share the words, names, or photo reference for the engraving.",
  },
  {
    id: "mini-steel-bottle",
    name: "Mini steel water bottle",
    image: "/products/mini-steel-bottle.jpg",
    price: null,
    category: "personalised-gifts",
    description:
      "A compact stainless steel bottle for hot and cold drinks. A name can be added.",
    customizable: true,
    featured: true,
    customization: "Tell us the name and the colour you want.",
  },
  {
    id: "custom-photo-mug",
    name: "Custom photo mug",
    image: "/products/custom-photo-mug.jpg",
    price: null,
    category: "photo-gifts",
    description: "A mug printed with a photo, name, quote, or your own design.",
    customizable: true,
    featured: true,
    customization: "Share the photo, name, or line you want on the mug.",
  },
  {
    id: "kids-sipper",
    name: "Kids sipper",
    image: "/products/kids-sipper.jpg",
    price: null,
    category: "trending-gifts",
    description: "A kids sipper from the current collection at the studio.",
    customizable: false,
    featured: true,
  },
  {
    id: "photo-fridge-magnet",
    name: "Photo fridge magnet",
    image: "/products/photo-fridge-magnet.jpg",
    price: null,
    category: "photo-gifts",
    description:
      "A fridge magnet with photographs and a short line. Often ordered as a teacher gift.",
    customizable: true,
    featured: true,
    customization: "Share the photos and the line you want printed.",
  },
  {
    id: "song-photo-keychain",
    name: "Song photo keychain",
    image: "/products/song-photo-keychain.jpg",
    price: null,
    category: "personalised-gifts",
    description: "An acrylic keychain with a photo and a song, for keys, bags, and gifting.",
    customizable: true,
    featured: true,
    customization: "Share the photo and the song you want on the keychain.",
  },
  {
    id: "hanuman-magnet",
    name: "Hanuman fridge magnet",
    image: "/products/hanuman-magnet.jpg",
    price: null,
    category: "festive-gifts",
    description: "A devotional fridge magnet with Hanuman Ji, for the home, car, or workspace.",
    customizable: false,
    featured: true,
  },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts() {
  const featured = products.filter((product) => product.featured);
  return featured.length > 0 ? featured : products.slice(0, 8);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 4);
}

export type SortId = "featured" | "name-asc" | "name-desc" | "price-asc" | "price-desc";

export function filterProducts(options: {
  category?: string;
  query?: string;
  sort?: string;
}) {
  const query = options.query?.trim().toLowerCase() ?? "";
  let list = products.slice();

  if (options.category && options.category !== "all") {
    list = list.filter((product) => product.category === options.category);
  }

  if (query) {
    list = list.filter((product) => {
      const categoryName = getCategory(product.category)?.name ?? "";
      return [product.name, product.description, product.customization, categoryName]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }

  const sort = (options.sort ?? "featured") as SortId;

  list.sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name);
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    if (sort === "price-asc" || sort === "price-desc") {
      const direction = sort === "price-asc" ? 1 : -1;
      if (a.price == null && b.price == null) return a.name.localeCompare(b.name);
      if (a.price == null) return 1;
      if (b.price == null) return -1;
      return (a.price - b.price) * direction;
    }
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return list;
}

export function formatPrice(product: Pick<Product, "price" | "customizable">) {
  if (product.price == null) {
    return product.customizable ? "Customize & enquire" : "Price on request";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);
}
