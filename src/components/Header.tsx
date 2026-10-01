"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import BookNow from "./BookNow";
import Logo from "./Logo";

/**
 * A floating glass island that stays put. The best hotel sites keep the book
 * button in reach the whole way down the page, so the header no longer hides
 * on scroll.
 *
 * Whether the page has scrolled is read from a 24px sentinel at the top of
 * the document with an IntersectionObserver, so there is no scroll listener
 * and no animation library: the menu is plain CSS transitions.
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

  // Dark glass over the home hero only. Interior heroes are shorter, and the
  // light island reads better against them from the start.
  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute left-0 top-0 h-6 w-px" />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 rounded-full pl-3 pr-2 transition-[background-color,box-shadow] duration-500 ease-[var(--ease-glide)] sm:pl-4 ${
            overHero
              ? "glass-dark bg-[rgba(10,26,32,0.22)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md"
              : "glass bg-canvas/80 shadow-[inset_0_0_0_1px_rgba(15,30,36,0.07),inset_0_1px_0_rgba(255,255,255,0.7),var(--shadow-nav)] backdrop-blur-xl backdrop-saturate-150"
          }`}
        >
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            onClick={() => setOpen(false)}
            className="shrink-0 rounded-full"
          >
            <Logo width={96} eager />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-small transition-colors duration-300 ${
                    overHero
                      ? "text-white/85 hover:bg-white/10 hover:text-white"
                      : active
                        ? "bg-ink/[0.06] text-ink"
                        : "text-muted hover:bg-ink/[0.04] hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={site.phones.tollFreeHref}
              className={`hidden rounded-full px-3 py-2 text-small tabular-nums transition-colors duration-300 xl:block ${
                overHero ? "text-white/85 hover:text-white" : "text-muted hover:text-ink"
              }`}
            >
              {site.phones.tollFree}
            </a>
            <span className="hidden sm:block">
              <BookNow size="sm" />
            </span>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`relative grid h-12 w-12 place-items-center rounded-full transition-colors duration-300 lg:hidden ${
                overHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/[0.05]"
              }`}
            >
              {/* Two lines that rotate into an X */}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-glide)] ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-glide)] ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu. Always in the DOM so it can fade, but inert and
          invisible while closed. Links rise in one after another. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`glass fixed inset-0 z-40 flex flex-col bg-canvas/90 backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-[var(--ease-glide)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Menu" className="flex flex-1 flex-col justify-center px-6 pt-24 sm:px-10">
          {nav.map((item, i) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <div key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
                  className={`block py-2.5 font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-[1.1] tracking-[-0.02em] transition-transform duration-700 ease-[var(--ease-glide)] motion-reduce:transition-none ${
                    open ? "translate-y-0" : "translate-y-[110%]"
                  } ${active ? "italic text-ink" : "text-ink/80 hover:text-ink"}`}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>
        <div
          style={{ transitionDelay: open ? "350ms" : "0ms" }}
          className={`flex flex-col gap-3 px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 transition-[opacity,transform] duration-700 ease-[var(--ease-glide)] motion-reduce:transition-none sm:px-10 ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <BookNow size="lg" className="w-full" />
          <a
            href={site.phones.tollFreeHref}
            className="py-3 text-center text-small tabular-nums text-muted"
          >
            Or call {site.phones.tollFree}
          </a>
        </div>
      </div>
    </>
  );
}
