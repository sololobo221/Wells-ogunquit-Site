import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ratings, quotes, googleReviewsUrl } from "@/lib/reviews";
import Reveal from "./Reveal";

export default function Reviews() {
  return (
    <section className="border-y border-line bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label mb-4">What guests say</p>
              <h2 className="text-[1.95rem] leading-[1.1] sm:text-[2.5rem] lg:text-[2.9rem]">
                Same families, most summers
              </h2>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
                <a
                  href={ratings[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.9rem] text-navy transition-colors duration-200 hover:text-ink"
                >
                  Read them on TripAdvisor
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  />
                </a>
                <a
                  href={googleReviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[0.9rem] text-navy transition-colors duration-200 hover:text-ink"
                >
                  Read them on Google
                  <ArrowUpRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <dl className="grid gap-x-10 sm:grid-cols-3">
              {ratings.map((r, i) => (
                <Reveal key={r.platform} delay={i * 0.07}>
                  <div className="border-t border-line py-6">
                    <dd className="font-display text-[2.4rem] leading-none text-navy">{r.score}</dd>
                    <dt className="mt-3 text-[0.95rem] text-ink">{r.platform}</dt>
                    <p className="mt-1 text-[0.84rem] leading-[1.5] text-muted">{r.detail}</p>
                  </div>
                </Reveal>
              ))}
            </dl>

            {quotes.length > 0 && (
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {quotes.map((q, i) => (
                  <Reveal as="figure" key={q.name + i} delay={i * 0.07}>
                    <blockquote className="rounded-[var(--radius-card)] border border-line bg-canvas p-6 text-[0.95rem] leading-[1.65] text-ink-2">
                      {q.text}
                    </blockquote>
                    <figcaption className="mt-3 text-[0.82rem] text-muted">
                      {q.name}, {q.source}
                      {q.stay ? `, ${q.stay}` : ""}
                    </figcaption>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
