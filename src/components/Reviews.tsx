import { ratings, quotes, googleReviewsUrl } from "@/lib/reviews";
import Reveal from "./Reveal";
import TextLink from "./TextLink";

/**
 * Proof, not decoration. A single quiet row of scores separated by dividers,
 * with the heading held to the left so the numbers carry the weight.
 */
export default function Reviews() {
  return (
    <section className="section bg-sand">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">What guests say</span>
              <h2 className="text-h2 max-w-[14ch]">Same families, most summers</h2>
              <div className="mt-8 flex flex-col items-start gap-3">
                <TextLink href={ratings[0].href ?? googleReviewsUrl} external>
                  Read them on TripAdvisor
                </TextLink>
                <TextLink href={googleReviewsUrl} external>
                  Read them on Google
                </TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.05}>
              <dl className="grid grid-cols-1 divide-y divide-ink/12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {ratings.map((r) => (
                  <div key={r.platform} className="py-8 sm:px-8 sm:py-0 sm:first:pl-0 sm:last:pr-0">
                    <dd className="font-display text-h2 leading-none text-ink">{r.score}</dd>
                    <dt className="mt-4 text-small text-ink">{r.platform}</dt>
                    <p className="mt-1 text-micro text-faint">{r.detail}</p>
                  </div>
                ))}
              </dl>
            </Reveal>

            {quotes.length > 0 && (
              <div className="mt-14 grid gap-6 sm:grid-cols-2">
                {quotes.map((q, i) => (
                  <Reveal as="figure" key={q.name + i} delay={i * 0.05}>
                    <blockquote className="rounded-[var(--radius-card)] bg-surface p-7 text-small text-muted shadow-card">
                      {q.text}
                    </blockquote>
                    <figcaption className="mt-3 text-micro text-faint">
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
