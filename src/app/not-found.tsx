import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import BookNow from "@/components/BookNow";

export default function NotFound() {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative flex min-h-[calc(100dvh-1rem)] items-end overflow-hidden rounded-[var(--radius-frame)] bg-atlantic sm:min-h-[calc(100dvh-1.5rem)]">
        <div className="animate-hero-settle absolute inset-0">
          <Image
            src="/images/hero-sunrise-wide.jpg"
            alt="Sunrise over the water near Wells and Ogunquit"
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero-wash absolute inset-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-36 lg:px-10 lg:pb-28">
          <span className="eyebrow eyebrow-invert animate-rise">Page not found</span>
          <h1
            className="animate-rise max-w-[13ch] text-h1 !text-white"
            style={{ animationDelay: "80ms" }}
          >
            That page has <em>drifted off somewhere</em>
          </h1>
          <p
            className="animate-rise mt-7 max-w-[48ch] text-lead text-white/85"
            style={{ animationDelay: "160ms" }}
          >
            The link may be old, or the page may have moved. Here is the way back.
          </p>

          <nav
            aria-label="Site"
            className="animate-rise mt-10 flex flex-wrap gap-2"
            style={{ animationDelay: "220ms" }}
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-white/[0.06] px-4 py-2 text-small text-white/85 ring-1 ring-inset ring-white/25 transition-[background-color,color,box-shadow] duration-300 hover:bg-white/[0.12] hover:text-white hover:ring-white/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ animationDelay: "280ms" }}
          >
            <BookNow size="lg" href="/" label="Back to the home page" />
            <a
              href={site.phones.tollFreeHref}
              className="text-small tabular-nums text-white/75 underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:text-white hover:decoration-white"
            >
              or call {site.phones.tollFree}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
