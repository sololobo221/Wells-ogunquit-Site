import Link from "next/link";
import { site, nav } from "@/lib/site";
import BookNow from "./BookNow";
import Logo from "./Logo";

export default function Footer() {
  const linkCls =
    "text-small text-muted transition-colors duration-200 hover:text-ink";

  return (
    <footer className="mt-auto bg-sand">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col justify-between gap-10 border-b border-ink/12 pb-16 lg:flex-row lg:items-end">
          <p className="max-w-[18ch] font-display text-h2">
            Come and stay a while on the Southern Maine coast.
          </p>
          <BookNow size="lg" className="w-fit shrink-0" />
        </div>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <Logo width={196} />
            <address className="mt-8 space-y-2 text-small not-italic text-muted">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-200 hover:text-ink"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
              <a
                href={site.phones.tollFreeHref}
                className="block tabular-nums transition-colors duration-200 hover:text-ink"
              >
                {site.phones.tollFree}
              </a>
              <a
                href={site.phones.localHref}
                className="block tabular-nums transition-colors duration-200 hover:text-ink"
              >
                {site.phones.local}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block transition-colors duration-200 hover:text-ink"
              >
                {site.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="flex flex-col items-start gap-3">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className={linkCls}>
                {item.label}
              </Link>
            ))}
            <Link href="/specials" className={linkCls}>
              Specials
            </Link>
          </nav>

          <div className="flex flex-col items-start gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Facebook
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
              Instagram
            </a>
            <Link href="/policies" className={linkCls}>
              Policies
            </Link>
            <Link href="/privacy" className={linkCls}>
              Privacy
            </Link>
          </div>
        </div>

        <p className="border-t border-ink/12 pt-8 text-micro text-faint">
          {new Date().getFullYear()} {site.name}. {site.season}
        </p>
      </div>
    </footer>
  );
}
