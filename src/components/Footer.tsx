import Link from "next/link";
import { site, nav } from "@/lib/site";
import Logo from "./Logo";

/**
 * The end of the Atlantic passage. The closing call to action above it
 * carries the booking button, so the footer only orients: where we are, how
 * to reach us, and the remaining links.
 */
export default function Footer() {
  const linkCls =
    "text-small text-foam-muted transition-colors duration-300 hover:text-white";
  const head = "mb-5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foam-muted/80";

  return (
    <footer className="mt-auto overflow-hidden bg-atlantic pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-foam lg:pb-0">
      {/* The bottom padding above reserves room for the floating MobileBookBar
          in the footer's own colour, so nothing hides behind it. Removed at lg. */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 lg:px-10 lg:pt-32">
        <div className="grid gap-14 border-b border-foam/12 pb-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-5">
            <Logo width={176} />
            <p className="mt-10 max-w-[26ch] font-display text-h3 font-[340] text-foam">
              Open spring through late October, <em>foliage season included.</em>
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className={head}>Find us</p>
            <address className="space-y-2.5 text-small not-italic text-foam-muted">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-white"
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
              <a
                href={site.phones.tollFreeHref}
                className="block tabular-nums transition-colors duration-300 hover:text-white"
              >
                {site.phones.tollFree}
              </a>
              <a
                href={site.phones.localHref}
                className="block tabular-nums transition-colors duration-300 hover:text-white"
              >
                {site.phones.local}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="block transition-colors duration-300 hover:text-white"
              >
                {site.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className={head}>The motel</p>
            <ul className="flex flex-col items-start gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/specials" className={linkCls}>
                  Specials
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className={head}>Elsewhere</p>
            <ul className="flex flex-col items-start gap-2.5">
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/policies" className={linkCls}>
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkCls}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-micro text-foam-muted">
          {new Date().getFullYear()} {site.name}. Family run on Route 1 in Wells, Maine.
        </p>
      </div>

      {/* Oversized name set in the display face, cropped by the page edge. */}
      <p
        aria-hidden
        className="pointer-events-none mt-10 select-none whitespace-nowrap text-center font-display text-[15.5vw] font-[300] leading-[0.78] tracking-[-0.045em] text-foam/[0.07] lg:mt-14"
      >
        Wells-Ogunquit
      </p>
    </footer>
  );
}
