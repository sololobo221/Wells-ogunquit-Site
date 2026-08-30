import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

type Variant = "solid" | "outline" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // #111111 on light, white text. Contrast 17:1.
  solid: "bg-ink text-white hover:bg-ink-2",
  outline: "text-ink border border-line hover:border-ink/40 bg-surface",
  onDark: "bg-white text-ink hover:bg-canvas",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.8rem] px-4 py-2 gap-1.5",
  md: "text-[0.87rem] px-5 py-2.5 gap-2",
  lg: "text-[0.93rem] px-7 py-3.5 gap-2",
};

export default function BookNow({
  variant = "solid",
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
      className={`group inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-control)] font-medium transition-all duration-200 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
      <ArrowUpRight
        size={14}
        weight="bold"
        className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
      />
    </Link>
  );
}
