import Reveal from "./Reveal";

/**
 * Distances from the motel drawn as stops along one line, nearest first.
 * It is a scale of "how far", not a map: the line says further away, not
 * which direction.
 *
 * Horizontal from lg, wrapping into rows of `columns`. Below lg it turns into
 * a vertical line with the stops hanging off it. The first stop's marker is
 * filled to mark the start of the line.
 */
export default function DistanceScale({
  items,
  columns = 6,
  invert = false,
  on = "canvas",
}: {
  items: readonly { place: string; value: string }[];
  columns?: 5 | 6;
  invert?: boolean;
  /** The section background, so hollow markers read as rings on it. */
  on?: "canvas" | "mist";
}) {
  const grid = columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-5";
  const line = invert ? "border-foam/25" : "border-ink/20";
  const value = invert ? "text-foam" : "text-ink";
  const place = invert ? "text-foam-muted" : "text-muted";

  return (
    <ol className={`grid grid-cols-1 lg:gap-y-14 ${grid}`}>
      {items.map((d, i) => (
        <Reveal
          as="li"
          key={d.place}
          delay={(i % columns) * 0.06}
          y={16}
          className={`relative border-l pb-9 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-9 ${line}`}
        >
          <span
            aria-hidden
            className={`absolute -left-[6px] top-1.5 h-[11px] w-[11px] rounded-full ring-2 lg:-top-[6px] lg:left-0 ${
              invert
                ? i === 0
                  ? "bg-foam ring-foam"
                  : "bg-atlantic ring-foam/70"
                : i === 0
                  ? "bg-ink ring-ink"
                  : `${on === "mist" ? "bg-mist" : "bg-canvas"} ring-ink/60`
            }`}
          />
          <span
            className={`block font-display text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] font-[340] leading-none tracking-[-0.02em] tabular-nums ${value}`}
          >
            {d.value}
          </span>
          <span className={`mt-3 block max-w-[18ch] text-small leading-snug ${place}`}>{d.place}</span>
        </Reveal>
      ))}
    </ol>
  );
}
