import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

/**
 * The inline "read more" link with a trailing arrow. This pattern was repeated
 * 19 times across 7 files with slightly different classes each time. One
 * component now, so hover and focus behave identically everywhere.
 *
 * Navy, not accent. Red is reserved for booking.
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
  const tone = invert
    ? "text-white/85 hover:text-white decoration-white/30 hover:decoration-white"
    : "text-navy hover:text-ink decoration-navy/30 hover:decoration-ink/60";

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex w-fit items-center gap-1.5 text-small underline decoration-1 underline-offset-[6px] transition-colors duration-200 ${tone} ${className}`}
    >
      {children}
      <ArrowUpRight
        size={14}
        weight="bold"
        className="shrink-0 transition-transform duration-200 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
