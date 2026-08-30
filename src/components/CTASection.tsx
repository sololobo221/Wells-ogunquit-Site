import Image from "next/image";
import { site } from "@/lib/site";
import BookNow from "./BookNow";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/hero-sunrise-wide.jpg"
        alt="Sunrise over the water near Wells and Ogunquit"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/58" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-24 lg:px-10 lg:py-28">
        <Reveal className="max-w-xl">
          <h2 className="text-[1.9rem] leading-[1.1] text-white sm:text-[2.6rem]">
            Find your dates on the Maine coast
          </h2>
          <p className="mt-5 leading-[1.65] text-white/85">
            Our own booking page always has the best rate. {site.cancellation}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookNow size="lg" variant="onDark" />
            <a
              href={site.phones.tollFreeHref}
              className="text-[0.92rem] tabular-nums text-white/80 underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:text-white"
            >
              or call {site.phones.tollFree}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
