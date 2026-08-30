"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 20));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open ? "border-line bg-canvas" : "border-transparent bg-canvas"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1400px] items-center justify-between gap-8 px-5 lg:px-10">
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Logo width={132} priority />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-[0.86rem] transition-colors duration-200 ${
                    active ? "text-navy" : "text-muted hover:text-ink"
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
              className="hidden text-[0.86rem] tabular-nums text-muted transition-colors duration-200 hover:text-ink xl:block"
            >
              {site.phones.tollFree}
            </a>
            <BookNow size="sm" className="hidden sm:inline-flex" />
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-[var(--radius-control)] text-ink transition-colors duration-200 hover:bg-ink/5 lg:hidden"
            >
              {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </header>

      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-40 bg-canvas lg:hidden"
      >
        <nav className="flex h-full flex-col justify-center gap-1 px-8">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              className={`border-b border-line py-4 font-display text-[1.9rem] transition-all duration-400 ${
                pathname === item.href ? "text-navy" : "text-ink"
              } ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {item.label}
            </Link>
          ))}
          <div
            style={{ transitionDelay: open ? `${80 + nav.length * 45}ms` : "0ms" }}
            className={`mt-9 flex flex-col items-start gap-4 transition-all duration-400 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <BookNow size="lg" />
            <a href={site.phones.tollFreeHref} className="text-[0.9rem] tabular-nums text-muted">
              {site.phones.tollFree}
            </a>
          </div>
        </nav>
      </motion.div>
    </>
  );
}
