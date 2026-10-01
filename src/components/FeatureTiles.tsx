import type { Icon } from "@phosphor-icons/react";
import Reveal from "./Reveal";

export type FeatureTile = { icon: Icon; title: string; text: string };

/**
 * Short, parallel facts as a grid of quiet tiles: a light icon, a title in the
 * display face, one line of detail. For lists too long to read as a single
 * column and too small to deserve photographs.
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
    <ul className={`grid grid-cols-1 gap-3 ${grid} ${className}`}>
      {items.map(({ icon: Glyph, title, text }, i) => (
        <Reveal
          as="li"
          key={title}
          delay={(i % columns) * 0.06}
          y={20}
          className="flex flex-col gap-8 rounded-[var(--radius-card)] bg-surface p-7 shadow-[inset_0_0_0_1px_rgba(15,30,36,0.06),inset_0_1px_0_rgba(255,255,255,0.8)]"
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-navy">
            <Glyph size={22} weight="light" aria-hidden />
          </span>
          <div>
            <h3 className="text-h4">{title}</h3>
            <p className="mt-2 text-small text-muted">{text}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
