import { trustPoints } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Big number, small label, real separation. Sits on sand so it reads as a
 * distinct band without needing a border.
 */
export default function TrustBar() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          {trustPoints.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <div className="flex flex-col gap-3 border-t border-ink/12 pt-6">
                <dd className="font-display text-h3 leading-none text-ink">{p.stat}</dd>
                <dt className="max-w-[20ch] text-micro uppercase tracking-[0.1em] text-faint">
                  {p.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
