import type { Metadata } from "next";
import { ContactSection } from "@/components/home";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Personalised Planet at RK Digital Studio, B-228 Silicon City, Indore. Chat on WhatsApp or Instagram.",
};

export default function ContactPage() {
  return <ContactSection as="h1" />;
}
