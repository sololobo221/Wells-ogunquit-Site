import Link from "next/link";

/**
 * "Learn more" in tracked capitals over a hairline, the standard hotel-site
 * secondary link. The rule darkens to the text colour on hover.
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
    ? "text-shell border-shell/40 hover:border-shell"
    : "text-ink border-ink/30 hover:border-ink";

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`caps inline-block w-fit border-b pb-1.5 transition-colors duration-300 ${tone} ${className}`}
    >
      {children}
    </Link>
  );
}
