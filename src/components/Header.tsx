"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import BookNow from "./BookNow";
import Logo from "./Logo";

/** Pages that open on a full-bleed photograph, where the bar starts clear. */
const heroPages = new Set([
  "/",
  "/rooms",
  "/amenities",
  "/breakfast",
  "/attractions",
  "/contact",
  "/specials",
]);

/**
 * A full-width bar, clear over the opening photograph and solid paper once
 * the page moves. The book button stays in reach the whole way down.
 *
 * Whether the page has scrolled is read from a sentinel at the top of the
 * document with an IntersectionObserver, so there is no scroll listener.
 */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Lock the page behind the menu while it is open, and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const clear = heroPages.has(pathname) && !scrolled && !open;

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-8 w-px" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300 ${
          clear
            ? "border-b border-white/15 bg-transparent text-white"
            : "border-b border-line bg-canvas text-ink"
        }`}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-6 lg:h-20">
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            onClick={() => setOpen(false)}
            className="shrink-0"
          >
            <Logo width={104} eager />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex xl:gap-10">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`caps border-b py-1.5 transition-colors duration-300 ${
                    active
                      ? clear
                        ? "border-white"
                        : "border-accent"
                      : "border-transparent hover:border-current"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-5">
            <a
              href={site.phones.tollFreeHref}
              className="hidden text-small tabular-nums tracking-wide opacity-90 transition-opacity duration-300 hover:opacity-100 xl:block"
            >
              {site.phones.tollFree}
            </a>
            <span className="hidden sm:block">
              <BookNow size="sm" className="lg:h-11 lg:px-6" />
            </span>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="caps -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
            >
              <span aria-hidden className="relative block h-2.5 w-6">
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-6 bg-current transition-transform duration-300 ${
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
              <span className="hidden min-[400px]:inline">{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu below lg. Always in the DOM so it can fade, but
          inert and invisible while closed. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-canvas pt-[72px] transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu" className="container-site flex-1 pt-6">
          <ul className="border-t border-line">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Specials", href: "/specials" }].map(
              (item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-display text-[1.75rem] leading-tight ${
                        active ? "text-accent" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              },
            )}
          </ul>
        </nav>
        <div className="container-site flex flex-col gap-3 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8">
          <BookNow size="lg" className="w-full" label="Book a room" />
          <a
            href={site.phones.tollFreeHref}
            className="caps flex h-14 items-center justify-center border border-ink/70 tabular-nums"
          >
            Call {site.phones.tollFree}
          </a>
        </div>
      </div>
    </>
  );
}
