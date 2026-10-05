import { site } from "@/lib/site";
import BookNow from "./BookNow";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

/**
 * The closing band on most pages: a full-bleed photograph with one line, one
 * button and the phone number. It runs straight into the navy footer.
 */
export default function CTASection({
  image = "/images/hero-sunrise-wide.jpg",
  alt = "Sunrise over the water near Wells and Ogunquit",
}: {
  image?: string;
  alt?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-harbor lg:min-h-[600px]">
      <ParallaxImage src={image} alt={alt} sizes="100vw" travel={6} />
      <div className="photo-shade-even absolute inset-0" />
      <Reveal className="container-site relative py-24 text-center">
        <span className="kicker !text-white/85">Book direct</span>
        <h2 className="mx-auto max-w-[18ch] text-h1 !text-white">Find your dates on the Maine coast</h2>
        <p className="measure mx-auto mt-6 text-lead text-white/85">
          Our own booking page always has the best rate. {site.cancellation}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <BookNow size="lg" label="Check availability" />
          <a
            href={site.phones.tollFreeHref}
            className="caps flex h-14 items-center border border-white/80 px-9 tabular-nums text-white transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            Call {site.phones.tollFree}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
