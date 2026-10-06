export const categories = [
  {
    slug: "personalised-gifts",
    name: "Personalised Gifts",
    blurb: "Names, dates, and details made for one person.",
    tone: "sand",
    image: "/categories/personalised-gifts.jpg",
  },
  {
    slug: "home-decor",
    name: "Home & Decor",
    blurb: "Pieces that stay in the home after the occasion.",
    tone: "stone",
    image: "/categories/home-decor.jpg",
  },
  {
    slug: "photo-gifts",
    name: "Photo Gifts",
    blurb: "Memories turned into something you can hold.",
    tone: "mist",
    image: "/categories/photo-gifts.jpg",
  },
  {
    slug: "corporate-gifts",
    name: "Corporate Gifts",
    blurb: "Thoughtful gifting for teams and clients.",
    tone: "sage",
    image: "/categories/corporate-gifts.jpg",
  },
  {
    slug: "birthday-gifts",
    name: "Birthday Gifts",
    blurb: "For the day that belongs to them.",
    tone: "blush",
    image: "/categories/birthday-gifts.jpg",
  },
  {
    slug: "wedding-gifts",
    name: "Wedding Gifts",
    blurb: "For couples, guests, and the celebration around them.",
    tone: "rose",
    image: "/categories/wedding-gifts.jpg",
  },
  {
    slug: "festive-gifts",
    name: "Festive Gifts",
    blurb: "For the festivals you mark together.",
    tone: "sand",
    image: "/categories/festive-gifts.jpg",
  },
  {
    slug: "trending-gifts",
    name: "Trending Gifts",
    blurb: "Current gifting ideas from the studio.",
    tone: "mist",
    image: "/categories/trending-gifts.jpg",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export const occasions = [
  {
    name: "Birthday",
    href: "/shop?category=birthday-gifts",
    line: "A gift with their name on it.",
  },
  {
    name: "Anniversary",
    href: "/shop?category=personalised-gifts",
    line: "Something they will keep.",
  },
  {
    name: "Wedding",
    href: "/shop?category=wedding-gifts",
    line: "For the couple and the people around them.",
  },
  {
    name: "Festivals",
    href: "/shop?category=festive-gifts",
    line: "Celebration, with a personal detail.",
  },
  {
    name: "Corporate",
    href: "/shop?category=corporate-gifts",
    line: "Gifting for teams and clients.",
  },
  {
    name: "Housewarming",
    href: "/shop?category=home-decor",
    line: "A piece for a new home.",
  },
  {
    name: "Special Moments",
    href: "/shop?category=trending-gifts",
    line: "When a regular gift is not enough.",
  },
] as const;

export const trustPoints = [
  "Personalised With Care",
  "Unique Gift Ideas",
  "Perfect For Every Occasion",
  "Order Easily on WhatsApp",
] as const;

export const reasons = [
  {
    title: "Made For You",
    text: "Personalised products created around your occasion and preferences.",
  },
  {
    title: "Unique Gift Ideas",
    text: "Products that feel more thoughtful than ordinary gifts.",
  },
  {
    title: "Made With Care",
    text: "Focused on creating memorable gifting experiences.",
  },
  {
    title: "Local & Easy to Order",
    text: "Based in Indore with simple WhatsApp ordering.",
  },
] as const;
