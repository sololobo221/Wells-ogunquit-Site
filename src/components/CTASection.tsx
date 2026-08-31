import Image from "next/image";
import { site } from "@/lib/site";
import BookNow from "./BookNow";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <Image
        src="/images/hero-sunrise-wide.jpg"
        alt="Sunrise over the water near Wells and Ogunquit"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="hero-wash absolute inset-0" />
      <div className="section relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <h2 className="max-w-[16ch] text-h2 !text-white">Find your dates on the Maine coast</h2>
          <p className="measure mt-6 text-lead text-white/85">
            Our own booking page always has the best rate. {site.cancellation}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BookNow size="lg" />
            <a
              href={site.phones.tollFreeHref}
              className="text-small tabular-nums text-white/80 underline decoration-white/30 decoration-1 underline-offset-[6px] transition-colors duration-200 hover:text-white hover:decoration-white"
            >
              or call {site.phones.tollFree}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
