import { trustPoints } from "@/lib/site";
import Reveal from "./Reveal";

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 lg:grid-cols-4 lg:px-10">
        {trustPoints.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.06} className="flex flex-col gap-1.5">
            <span className="font-display text-[2rem] leading-none text-navy sm:text-[2.4rem]">
              {p.stat}
            </span>
            <span className="max-w-[24ch] text-[0.83rem] leading-[1.5] text-muted">{p.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
