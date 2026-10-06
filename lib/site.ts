export const site = {
  name: "Personalised Planet",
  handle: "@personalisedplanet",
  instagram: "https://www.instagram.com/personalisedplanet/",
  tagline: "Thoughtful personalised gifts made to make every occasion unforgettable.",
  about:
    "Personalised Planet is a gifting store based in Indore, creating personalised and thoughtful gifts for special moments.",
  /**
   * WhatsApp number printed on Personalised Planet's own Instagram posts
   * and listed for RK Digital Studio, B-228 Silicon City, Indore.
   */
  whatsappNumber: "917566772838",
  whatsappDisplay: "+91 75667 72838",
  address: {
    studio: "RK DIGITAL STUDIO",
    line: "B-228 Silicon City",
    city: "Indore",
    region: "Madhya Pradesh",
    country: "India",
    postalCode: "452020",
  },
  logoImage: "/brand/logo.jpg",
  heroImage: "/products/leather-gift-set.jpg",
};

export function mapsHref() {
  const query = [
    site.name,
    site.address.studio,
    site.address.line,
    site.address.city,
    site.address.region,
    site.address.postalCode,
  ].join(", ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export const lookbook: { src: string | null; alt: string; tone: FrameTone }[] = [
  { src: "/products/diary-gift-set.jpg", alt: "Diary gift set", tone: "sand" },
  { src: "/products/leather-gift-set.jpg", alt: "Personalised leather gift set", tone: "blush" },
  { src: "/products/wooden-engraving.jpg", alt: "Custom wooden engraving", tone: "stone" },
  { src: "/products/photo-frames.jpg", alt: "Custom photo frames", tone: "rose" },
  { src: "/products/hot-cold-tumbler.jpg", alt: "1200 ml hot and cold tumbler", tone: "mist" },
  { src: "/products/mini-steel-bottle.jpg", alt: "Mini steel water bottle", tone: "sage" },
];

export type FrameTone = "sand" | "blush" | "mist" | "stone" | "sage" | "rose";
