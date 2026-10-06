import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5", className)}>{children}</div>
  );
}

const buttonStyles = {
  primary:
    "bg-ink text-ivory hover:bg-[#2b2724] shadow-[0_10px_30px_-18px_rgba(28,25,23,0.8)]",
  secondary: "border border-ink/15 bg-ivory text-ink hover:border-ink/35",
  whatsapp: "bg-whatsapp text-white hover:bg-[#116848]",
  ghost: "text-ink hover:bg-ink/5",
} as const;

type ButtonStyle = keyof typeof buttonStyles;

export function Button({
  href,
  external,
  variant = "primary",
  className,
  children,
  ...props
}: {
  href?: string;
  external?: boolean;
  variant?: ButtonStyle;
  className?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition duration-300",
    buttonStyles[variant],
    className,
  );

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  action,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-5 md:mb-10">
      <div className="max-w-xl">
        {eyebrow ? (
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-[0.18em]",
              tone === "dark" ? "text-[#e4c9a8]" : "text-gold",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-serif text-3xl tracking-tight md:text-4xl",
            eyebrow && "mt-2",
            tone === "dark" ? "text-ivory" : "text-ink",
          )}
        >
          {title}
        </h2>
        {text ? (
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              tone === "dark" ? "text-ivory/70" : "text-muted",
            )}
          >
            {text}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
