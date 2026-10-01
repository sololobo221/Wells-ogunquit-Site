import { site } from "@/lib/site";
import BookNow from "./BookNow";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

/**
 * The closing call to action. It sits on the Atlantic, the dark passage that
 * ends every page and runs straight into the footer, and holds the sunrise
 * photograph in a framed tray.
 */
export default function CTASection() {
  return (
    <section className="bg-atlantic">
      <div className="mx-auto max-w-[1400px] px-3 pt-[calc(var(--section-y)*0.6)] sm:px-6 lg:px-10">
        <Reveal y={40} className="bezel bezel-dark">
          <div className="bezel-core relative flex min-h-[520px] items-end lg:min-h-[600px]">
            <ParallaxImage
              src="/images/hero-sunrise-wide.jpg"
              alt="Sunrise over the water near Wells and Ogunquit"
              sizes="(max-width: 1400px) 100vw, 1400px"
              travel={7}
            />
            <div className="hero-wash absolute inset-0" />
            <div className="relative w-full p-7 sm:p-10 lg:p-16">
              <h2 className="max-w-[14ch] text-h2 !text-white">
                Find your dates on the <em>Maine coast</em>
              </h2>
              <p className="measure mt-6 text-lead text-white/85">
                Our own booking page always has the best rate. {site.cancellation}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <BookNow size="lg" />
                <a
                  href={site.phones.tollFreeHref}
                  className="text-small tabular-nums text-white/80 underline decoration-white/30 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-white hover:decoration-white"
                >
                  or call {site.phones.tollFree}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
