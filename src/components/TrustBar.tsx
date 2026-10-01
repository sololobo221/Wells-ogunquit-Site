import { trustPoints } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Big number, small label, one hairline above each. No box around them: the
 * numbers carry the weight and the spacing does the grouping.
 */
export default function TrustBar({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-4 ${className}`}>
      {trustPoints.map((p, i) => (
        <Reveal
          key={p.label}
          delay={i * 0.07}
          className="flex flex-col-reverse justify-end gap-4 border-t border-ink/15 pt-6"
        >
          <dt className="max-w-[24ch] text-small leading-snug text-muted">{p.label}</dt>
          <dd className="font-display text-[clamp(2.5rem,1.6rem+2.6vw,4rem)] font-[320] leading-none tracking-[-0.03em] text-ink">
            {p.stat}
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
