import Image from "next/image";
import { LogoMark } from "@/components/Logo";
import { cn } from "@/lib/cn";
import type { FrameTone } from "@/lib/site";

const tones: Record<FrameTone, string> = {
  sand: "bg-[#efe4d6]",
  blush: "bg-[#f3e3e4]",
  mist: "bg-[#e4eeeb]",
  stone: "bg-[#ece7e1]",
  sage: "bg-[#e7eee6]",
  rose: "bg-[#f6e8e2]",
};

export function MediaFrame({
  src,
  alt,
  tone = "sand",
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  className,
}: {
  src: string | null;
  alt: string;
  tone?: FrameTone;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", !src && tones[tone], className)}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0">
          <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/50" />
          <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/40" />
          <div className="absolute inset-5 rounded-[1.25rem] border border-white/80" />
          <div className="relative flex h-full items-center justify-center text-ink/80">
            <LogoMark className="h-12 w-12" />
          </div>
        </div>
      )}
    </div>
  );
}
