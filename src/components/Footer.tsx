import Link from "next/link";
import { site, nav } from "@/lib/site";
import BookNow from "./BookNow";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-10 border-b border-line pb-14 lg:flex-row lg:items-end">
          <p className="max-w-lg font-display text-[1.7rem] leading-[1.15] sm:text-[2.2rem]">
            Come and stay a while on the Southern Maine coast.
          </p>
          <BookNow size="lg" className="w-fit shrink-0" />
        </div>

        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo width={210} />
            <address className="mt-6 space-y-1.5 text-[0.87rem] not-italic leading-[1.7] text-muted">
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

          <nav aria-label="Footer" className="flex flex-col gap-3 text-[0.87rem]">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/specials" className="text-muted transition-colors duration-200 hover:text-ink">
              Specials
            </Link>
          </nav>

          <div className="flex flex-col gap-3 text-[0.87rem]">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-200 hover:text-ink"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-200 hover:text-ink"
            >
              Instagram
            </a>
            <Link href="/policies" className="text-muted transition-colors duration-200 hover:text-ink">
              Policies
            </Link>
            <Link href="/privacy" className="text-muted transition-colors duration-200 hover:text-ink">
              Privacy
            </Link>
          </div>
        </div>

        <p className="border-t border-line pt-8 text-[0.78rem] text-faint">
          {new Date().getFullYear()} {site.name}. {site.season}
        </p>
      </div>
    </footer>
  );
}
