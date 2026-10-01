import { ratings, quotes, googleReviewsUrl } from "@/lib/reviews";
import Reveal from "./Reveal";
import TextLink from "./TextLink";

/**
 * Proof, not decoration. The first section of the Atlantic passage that closes
 * the page: the heading held to the left, three large scores to the right,
 * separated by hairlines rather than boxed.
 */
export default function Reviews() {
  return (
    // Always followed by the closing call to action on the same dark ground,
    // so the bottom padding is short and the CTA supplies the rest.
    <section className="bg-atlantic pb-[calc(var(--section-y)*0.35)] pt-[var(--section-y)] text-foam">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow eyebrow-invert">What guests say</span>
              <h2 className="max-w-[12ch] text-h2 !text-foam">
                Same families, <em>most summers</em>
              </h2>
              <div className="mt-10 flex flex-col items-start gap-4">
                <TextLink href={ratings[0].href ?? googleReviewsUrl} external invert>
                  Read them on TripAdvisor
                </TextLink>
                <TextLink href={googleReviewsUrl} external invert>
                  Read them on Google
                </TextLink>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:pt-3">
            <dl className="grid grid-cols-1 sm:grid-cols-3">
              {ratings.map((r, i) => (
                <Reveal
                  key={r.platform}
                  delay={0.08 + i * 0.08}
                  className="flex flex-col-reverse justify-end border-t border-foam/15 py-8 sm:border-l sm:border-t-0 sm:px-8 sm:py-2 sm:first:border-l-0 sm:first:pl-0 lg:px-10"
                >
                  <div className="mt-6">
                    <dt className="text-small text-foam">{r.platform}</dt>
                    <p className="mt-1 text-micro text-foam-muted">{r.detail}</p>
                  </div>
                  <dd className="font-display text-[clamp(3.5rem,2.2rem+4vw,6.5rem)] font-[300] leading-[0.9] tracking-[-0.04em] text-white">
                    {r.score}
                  </dd>
                </Reveal>
              ))}
            </dl>

            {quotes.length > 0 && (
              <div className="mt-16 grid gap-5 sm:grid-cols-2">
                {quotes.map((q, i) => (
                  <Reveal as="figure" key={q.name + i} delay={i * 0.06} className="bezel bezel-dark">
                    <div className="bezel-core p-7">
                      <blockquote className="font-display text-lead italic leading-snug text-foam">
                        &ldquo;{q.text}&rdquo;
                      </blockquote>
                      <figcaption className="mt-5 text-micro text-foam-muted">
                        {q.name}, {q.source}
                        {q.stay ? `, ${q.stay}` : ""}
                      </figcaption>
                    </div>
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
