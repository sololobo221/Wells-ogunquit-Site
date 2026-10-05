import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import BookNow from "@/components/BookNow";

export default function NotFound() {
  return (
    <section className="container-site grid items-center gap-14 pb-[var(--section-y)] pt-32 lg:grid-cols-12 lg:gap-x-16 lg:pt-44">
      <div className="lg:col-span-6">
        <span className="kicker">Page not found</span>
        <h1 className="max-w-[14ch] text-h1">That page has drifted off somewhere</h1>
        <p className="mt-6 max-w-[46ch] text-lead text-muted">
          The link may be old, or the page may have moved. One of these should get you where you
          were going.
        </p>

        <nav aria-label="Site" className="mt-10">
          <ul className="border-t border-ink/15">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/15">
                <Link
                  href={item.href}
                  className="block py-3.5 font-display text-h4 transition-colors duration-200 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <BookNow size="lg" href="/" label="Back to the home page" variant="outline" />
          <a
            href={site.phones.tollFreeHref}
            className="text-small tabular-nums text-muted transition-colors duration-200 hover:text-ink"
          >
            or call {site.phones.tollFree}
          </a>
        </div>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-sand lg:col-span-6">
        <Image
          src="/images/hero-sunrise.jpg"
          alt="Sunrise over the water near Wells and Ogunquit"
          fill
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
