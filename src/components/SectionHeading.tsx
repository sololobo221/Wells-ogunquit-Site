import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * Kicker, heading, short intro. Left aligned by default; `center` for the
 * few places a section opens on its own, like the welcome on the home page.
 */
export default function SectionHeading({
  label,
  title,
  intro,
  invert = false,
  center = false,
  className = "",
  titleClassName = "max-w-[20ch]",
  as: Tag = "h2",
}: {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  invert?: boolean;
  center?: boolean;
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} ${className}`}>
      {label && <span className={`kicker ${invert ? "kicker-light" : ""}`}>{label}</span>}
      <Tag
        className={`text-h2 ${titleClassName} ${center ? "mx-auto" : ""} ${invert ? "!text-shell" : ""}`}
      >
        {title}
      </Tag>
      {intro && (
        <p
          className={`measure mt-6 text-lead ${center ? "mx-auto" : ""} ${
            invert ? "text-shell-muted" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
