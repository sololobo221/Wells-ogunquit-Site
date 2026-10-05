import Reveal from "./Reveal";

/**
 * Distances from the motel as a plain two-column table, nearest first:
 * place on the left, distance on the right, a hairline under each.
 */
export default function DistanceScale({
  items,
  columns = 2,
  invert = false,
  className = "",
}: {
  items: readonly { place: string; value: string }[];
  columns?: 1 | 2;
  invert?: boolean;
  className?: string;
}) {
  const rule = invert ? "border-shell/20" : "border-ink/15";

  return (
    <Reveal as="div" className={className}>
      <dl className={`grid gap-x-14 border-t ${columns === 2 ? "sm:grid-cols-2" : ""} ${rule}`}>
        {items.map((d) => (
          <div
            key={d.place}
            className={`flex items-baseline justify-between gap-6 border-b py-4 ${rule}`}
          >
            <dt className={invert ? "text-shell" : "text-ink"}>{d.place}</dt>
            <dd
              className={`shrink-0 text-small tabular-nums ${invert ? "text-shell-muted" : "text-muted"}`}
            >
              {d.value}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
