import { ratings, quotes, googleReviewsUrl } from "@/lib/reviews";
import Reveal from "./Reveal";
import TextLink from "./TextLink";

/**
 * Accolades, the way hotel sites show them: a centred row of the scores the
 * listing sites give us, divided by hairlines, with links to read the real
 * reviews. Guest quotes appear below only once real ones are added.
 */
export default function Reviews() {
  return (
    <section className="bg-sand section">
      <div className="container-site">
        <Reveal className="text-center">
          <span className="kicker">Guest reviews</span>
          <h2 className="mx-auto max-w-[22ch] text-h2">The same families come back most summers</h2>
        </Reveal>

        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-1 sm:grid-cols-3 lg:mt-16">
          {ratings.map((r, i) => (
            <Reveal
              key={r.platform}
              delay={i * 0.06}
              className="flex flex-col-reverse items-center border-t border-ink/15 py-8 text-center first:border-t-0 sm:border-l sm:border-t-0 sm:px-6 sm:py-2 sm:first:border-l-0"
            >
              <div className="mt-4">
                <dt className="caps text-ink">{r.platform}</dt>
                <p className="mt-1.5 text-small text-muted">{r.detail}</p>
              </div>
              <dd className="font-display text-[clamp(3rem,2.2rem+2.6vw,4.5rem)] leading-none tracking-[-0.02em] text-ink">
                {r.score}
              </dd>
            </Reveal>
          ))}
        </dl>

        {quotes.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-5xl gap-10 sm:grid-cols-2">
            {quotes.map((q, i) => (
              <Reveal as="figure" key={q.name + i} delay={i * 0.06} className="border-t border-ink/15 pt-8">
                <blockquote className="font-display text-h4 text-ink">&ldquo;{q.text}&rdquo;</blockquote>
                <figcaption className="mt-4 text-small text-muted">
                  {q.name}, {q.source}
                  {q.stay ? `, ${q.stay}` : ""}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <TextLink href={ratings[0].href ?? googleReviewsUrl} external>
            Read reviews on TripAdvisor
          </TextLink>
          <TextLink href={googleReviewsUrl} external>
            Read reviews on Google
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
