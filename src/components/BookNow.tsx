import Link from "next/link";

/**
 * The site's button: a square-cornered block with tracked capitals, the way
 * hotel sites have always done it.
 *
 *   primary       lobster fill, reserved for booking
 *   outline       ink hairline on light surfaces, everything secondary
 *   outlineLight  white hairline on photography and on the navy
 */
type Variant = "primary" | "outline" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "caps inline-flex items-center justify-center whitespace-nowrap rounded-[2px] text-center " +
  "transition-[background-color,border-color,color,transform] duration-300 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-deep",
  outline: "border border-ink/70 text-ink hover:bg-ink hover:text-canvas",
  outlineLight: "border border-white/80 text-white hover:bg-white hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5",
  md: "h-12 px-7",
  lg: "h-14 px-9",
};

export default function BookNow({
  variant = "primary",
  size = "md",
  className = "",
  label = "Book now",
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
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {label}
    </Link>
  );
}
