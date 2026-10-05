import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";

export type FeatureTile = { icon: Icon; title: string; text: string };

/**
 * Short, parallel facts in columns: a thin icon, a title, one line of detail,
 * each under a hairline. No boxes.
 */
export default function FeatureTiles({
  items,
  columns = 2,
  className = "",
}: {
  items: FeatureTile[];
  columns?: 2 | 3;
  className?: string;
}) {
  const grid = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  return (
    <ul className={`grid grid-cols-1 gap-x-12 gap-y-10 ${grid} ${className}`}>
      {items.map(({ icon: Glyph, title, text }, i) => (
        <Reveal as="li" key={title} delay={(i % columns) * 0.05} className="border-t border-ink/15 pt-7">
          <Glyph size={28} weight="light" className="text-accent" aria-hidden />
          <h3 className="mt-5 text-h4">{title}</h3>
          <p className="mt-2 text-small text-muted">{text}</p>
        </Reveal>
      ))}
    </ul>
  );
}
