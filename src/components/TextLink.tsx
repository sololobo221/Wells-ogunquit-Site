import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The inline "read more" link with a trailing arrow. One component so hover
 * and focus behave identically everywhere.
 *
 * The underline draws in from the left on hover rather than just changing
 * colour. Deep sea ink, not accent: red is reserved for booking.
 */
export default function TextLink({
  href,
  children,
  external = false,
  invert = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  invert?: boolean;
  className?: string;
}) {
  const tone = invert ? "text-foam hover:text-white" : "text-navy hover:text-ink";
  const rule = invert ? "bg-foam/30 after:bg-white" : "bg-navy/25 after:bg-ink";

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex w-fit items-center gap-2 text-small font-medium transition-colors duration-300 ${tone} ${className}`}
    >
      <span className="relative pb-1">
        {children}
        <span
          aria-hidden
          className={`absolute inset-x-0 bottom-0 h-px overflow-hidden ${rule} after:absolute after:inset-0 after:origin-left after:scale-x-0 after:transition-transform after:duration-500 after:ease-[var(--ease-glide)] after:content-[''] group-hover:after:scale-x-100`}
        />
      </span>
      <ArrowUpRight
        size={14}
        weight="bold"
        className="mb-1 shrink-0 transition-transform duration-500 ease-[var(--ease-glide)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
