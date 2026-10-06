"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { generalOrderMessage, whatsappHref } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <a
      href={whatsappHref(generalOrderMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 text-sm font-medium text-white shadow-[0_16px_40px_-12px_rgba(21,122,86,0.8)] transition hover:bg-[#116848] md:hidden"
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
