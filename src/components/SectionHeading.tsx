import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Headline over a short intro, stacked. Pass an <em> inside the title for an
 * italic emphasis in the same family.
 *
 * The label renders as an eyebrow. Use it rarely: a page gets a few at most.
 */
export default function SectionHeading({
  label,
  title,
  intro,
  invert = false,
  className = "",
  titleClassName = "max-w-[18ch]",
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  invert?: boolean;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal className={className}>
      {label && <span className={`eyebrow ${invert ? "eyebrow-invert" : ""}`}>{label}</span>}
      <h2 className={`text-h2 ${titleClassName} ${invert ? "!text-foam" : ""}`}>{title}</h2>
      {intro && (
        <p className={`measure mt-7 text-lead ${invert ? "text-foam-muted" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
