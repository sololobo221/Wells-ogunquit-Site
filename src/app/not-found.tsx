import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import BookNow from "@/components/BookNow";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] items-end overflow-hidden bg-ink pt-24">
      <Image
        src="/images/hero-sunrise-wide.jpg"
        alt="Sunrise over the water near Wells and Ogunquit"
        fill
        priority
        sizes="100vw"
        className="z-0 object-cover"
      />
      <div className="hero-wash absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-10 lg:pb-24">
        <Logo width={190} className="mb-8" />
        <span className="eyebrow eyebrow-invert">Page not found</span>
        <h1 className="mt-5 max-w-[16ch] text-h2 text-white">
          That page has drifted off somewhere
        </h1>
        <p className="mt-5 max-w-[48ch] text-white/85">
          The link may be old, or the page may have moved. Here is the way back.
        </p>

        <nav aria-label="Site" className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-white/75 underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:text-white hover:decoration-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BookNow size="lg" href="/" external={false} label="Back to the home page" />
          <a
            href={site.phones.tollFreeHref}
            className="text-small tabular-nums text-white/70 underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:text-white hover:decoration-white"
          >
            or call {site.phones.tollFree}
          </a>
        </div>
      </div>
    </section>
  );
}
