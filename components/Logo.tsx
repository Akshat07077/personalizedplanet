import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

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
  if (site.logoImage) {
    return (
      <Link href="/" className={cn("inline-flex shrink-0 items-center", className)}>
        <Image
          src={site.logoImage}
          alt="Personalised Planet"
          width={160}
          height={160}
          priority
          className="h-14 w-14 rounded-2xl bg-white object-contain"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center gap-2.5", className)}>
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-ivory text-ink shadow-[inset_0_0_0_1px_rgba(28,25,23,0.06)]">
        <LogoMark className="h-7 w-7" />
      </span>
      <span className="font-serif text-[15px] leading-[1.05] tracking-tight text-ink">
        Personalised
        <span className="block">Planet</span>
      </span>
    </Link>
  );
}
