import Link from "next/link";
import { site, nav } from "@/lib/site";
import Logo from "./Logo";

/**
 * Where we are, how to reach us, and the rest of the links. Harbour navy,
 * so the page ends on the colour of the wave in the sign.
 */
export default function Footer() {
  const link = "text-small text-shell-muted transition-colors duration-200 hover:text-white";
  const head = "caps mb-5 block text-gold";

  return (
    <footer className="mt-auto bg-harbor pb-[calc(3.5rem+env(safe-area-inset-bottom))] text-shell lg:pb-0">
      {/* The bottom padding reserves room for the MobileBookBar below lg. */}
      <div className="container-site pt-20 lg:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo width={168} />
            <p className="mt-8 max-w-[34ch] text-small text-shell-muted">{site.season}</p>
          </div>

          <div className="lg:col-span-3">
            <span className={head}>Find us</span>
            <address className="space-y-1 text-small not-italic">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link} block`}
              >
                {site.address.street}
                <br />
                {site.address.city}, {site.address.state} {site.address.zip}
              </a>
              <a href={site.phones.tollFreeHref} className={`${link} block pt-3 tabular-nums`}>
                {site.phones.tollFree}
              </a>
              <a href={site.phones.localHref} className={`${link} block tabular-nums`}>
                {site.phones.local}
              </a>
              <a href={`mailto:${site.email}`} className={`${link} block`}>
                {site.email}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <span className={head}>Explore</span>
            <ul className="space-y-1.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={link}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/specials" className={link}>
                  Specials
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <span className={head}>Follow along</span>
            <ul className="space-y-1.5">
              <li>
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                  Instagram {site.social.instagramHandle}
                </a>
              </li>
              <li>
                <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className={link}>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-shell/15 py-7 text-micro text-shell-muted sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Family run on Route 1 in Wells, Maine.
          </p>
          <div className="flex gap-6">
            <Link href="/policies" className="transition-colors duration-200 hover:text-white">
              Policies
            </Link>
            <Link href="/privacy" className="transition-colors duration-200 hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
