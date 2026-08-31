import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

/**
 * Two variants only.
 *   primary — lobster fill, reserved for booking calls to action
 *   ghost   — outline, everything secondary
 * There is no second filled colour anywhere on the site.
 */
type Variant = "primary" | "ghost" | "ghostOnDark";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] font-medium " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-[var(--ease-out)] " +
  "active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-deep focus-visible:outline-accent-deep",
  ghost:
    "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03] focus-visible:outline-accent",
  ghostOnDark:
    "border border-white/45 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "text-small px-4 py-2",
  md: "text-small px-5 py-2.5",
  // Tighter side padding on small screens so a long label still fits 375px
  // without wrapping. Full padding returns from sm up.
  lg: "text-body px-5 py-3.5 sm:px-7",
};

export default function BookNow({
  variant = "primary",
  size = "md",
  className = "",
  label = "Book a room",
  href = site.bookingUrl,
  external = true,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
      <ArrowUpRight
        size={15}
        weight="bold"
        className="transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
