"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { nav, site } from "@/lib/site";
import BookNow from "./BookNow";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const last = useRef(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
    const prev = last.current;
    last.current = v;
    // Near the top, or with the menu open, keep the bar in place.
    if (v < 80 || open) {
      setHidden(false);
      return;
    }
    // Slide it away while scrolling down, bring it back the instant the user
    // scrolls up. The small threshold avoids flicker from momentum jitter.
    if (v > prev + 4) setHidden(true);
    else if (v < prev - 4) setHidden(false);
  });

  // Transparent over the hero on the home page only; interior pages have
  // shorter heroes and read better with the bar present from the start.
  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-out)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          overHero ? "bg-transparent" : "bg-canvas/95 shadow-nav backdrop-blur-[2px]"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-8 px-6 lg:h-20 lg:px-10">
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Logo width={124} priority />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-small transition-colors duration-200 ${
                    overHero
                      ? "text-white/85 hover:text-white"
                      : active
                        ? "text-navy"
                        : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <a
              href={site.phones.tollFreeHref}
              className={`hidden text-small tabular-nums transition-colors duration-200 xl:block ${
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
              onClick={() => setOpen((v) => !v)}
              className={`grid h-11 w-11 place-items-center rounded-[var(--radius-control)] transition-colors duration-200 lg:hidden ${
                overHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-ink/5"
              }`}
            >
              {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu. Large tap targets, booking CTA always visible. */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[45] flex flex-col bg-canvas lg:hidden"
      >
        <nav className="flex flex-1 flex-col justify-center px-6 pt-20">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              className={`border-b border-line py-5 font-display text-h3 transition-[opacity,transform] duration-300 ease-[var(--ease-out)] ${
                pathname === item.href ? "text-navy" : "text-ink"
              } ${open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-4 border-t border-line px-6 pb-10 pt-6">
          <BookNow size="lg" className="w-full" />
          <a
            href={site.phones.tollFreeHref}
            className="py-2 text-center text-small tabular-nums text-muted"
          >
            {site.phones.tollFree}
          </a>
        </div>
      </motion.div>
    </>
  );
}
