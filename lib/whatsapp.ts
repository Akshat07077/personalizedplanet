import { site } from "@/lib/site";
import type { Product } from "@/lib/products";

export function whatsappHref(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export function productOrderMessage(
  product: Pick<Product, "name">,
  quantity = 1,
  notes = "",
) {
  const lines = [
    "Hi Personalised Planet, I am interested in ordering:",
    product.name,
  ];

  if (quantity > 1) {
    lines.push("", `Quantity: ${quantity}`);
  }

  const trimmed = notes.trim();
  if (trimmed) {
    lines.push("", `Customization notes: ${trimmed}`);
  }

  lines.push("", "I would like to know the price and customization options.");
  return lines.join("\n");
}

export function generalOrderMessage() {
  return [
    "Hi Personalised Planet, I would like to order a personalised gift.",
    "",
    "I would like to know the price and customization options.",
  ].join("\n");
}

export function enquiryMessage(details: string) {
  const trimmed = details.trim();
  return [
    "Hi Personalised Planet, I have something specific in mind.",
    "",
    trimmed || "I would like help finding or customising a gift.",
    "",
    "I would like to know the price and customization options.",
  ].join("\n");
}

export type CartLine = {
  key: string;
  productId: string;
  quantity: number;
  notes: string;
};

export function cartOrderMessage(
  lines: { name: string; quantity: number; notes: string }[],
) {
  const items = lines.map((line, index) => {
    const parts = [`${index + 1}. ${line.name}`];
    if (line.quantity > 1) parts.push(`Quantity: ${line.quantity}`);
    if (line.notes.trim()) parts.push(`Customization notes: ${line.notes.trim()}`);
    return parts.join("\n");
  });

  return [
    "Hi Personalised Planet, I am interested in ordering:",
    "",
    items.join("\n\n"),
    "",
    "I would like to know the price and customization options.",
  ].join("\n");
}
