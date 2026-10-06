import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="33" r="13" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <ellipse
        cx="32"
        cy="33"
        rx="20"
        ry="7.5"
        fill="none"
        stroke="#7A5C3E"
        strokeWidth="1.7"
        transform="rotate(-18 32 33)"
      />
      <circle cx="45" cy="20" r="3.2" fill="#8D5362" />
      <circle cx="18" cy="44" r="2.2" fill="#3D6D6A" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="Personalised Planet">
      <Image
        src={site.logoImage}
        alt=""
        width={972}
        height={1024}
        priority
        className="h-14 w-14 rounded-full object-cover"
      />
    </Link>
  );
}

