import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The site's button. A full pill with the arrow nested in its own circle,
 * flush with the right inner edge. On hover the circle nudges up and to the
 * right; on press the whole pill sinks slightly.
 *
 *   primary     lobster fill, reserved for booking calls to action
 *   ghost       hairline outline on light surfaces, everything secondary
 *   ghostOnDark the same on photography and on the Atlantic
 *
 * There is no second filled colour anywhere on the site.
 */
type Variant = "primary" | "ghost" | "ghostOnDark";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-between whitespace-nowrap rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-500 ease-[var(--ease-glide)] " +
  "active:scale-[0.98]";

const variants: Record<Variant, { pill: string; dot: string }> = {
  primary: {
    pill:
      "bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_24px_-12px_rgba(177,56,40,0.7)] hover:bg-accent-deep",
    dot: "bg-white/15",
  },
  ghost: {
    pill: "text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/45 hover:bg-ink/[0.03]",
    dot: "bg-ink/[0.07]",
  },
  ghostOnDark: {
    pill: "text-white ring-1 ring-inset ring-white/40 bg-white/[0.06] hover:ring-white/80 hover:bg-white/[0.12]",
    dot: "bg-white/15",
  },
};

const sizes: Record<Size, { pill: string; dot: string; icon: number }> = {
  sm: { pill: "h-11 gap-2.5 pl-5 pr-1.5 text-small", dot: "h-8 w-8", icon: 13 },
  md: { pill: "h-12 gap-3 pl-6 pr-1.5 text-small", dot: "h-9 w-9", icon: 14 },
  // Tighter left padding below sm so a long label still fits 375px.
  lg: { pill: "h-14 gap-3 pl-5 pr-2 text-body sm:pl-7", dot: "h-10 w-10", icon: 15 },
};

export default function BookNow({
  variant = "primary",
  size = "md",
  className = "",
  label = "Book a room",
  href = "/booking",
  external = false,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
  href?: string;
  external?: boolean;
}) {
  const v = variants[variant];
  const s = sizes[size];

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${v.pill} ${s.pill} ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className={`grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 ${v.dot} ${s.dot}`}
      >
        <ArrowUpRight size={s.icon} weight="bold" />
      </span>
    </Link>
  );
}
