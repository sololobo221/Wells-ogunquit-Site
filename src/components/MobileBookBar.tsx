import Link from "next/link";
import { Phone, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

/**
 * Pinned booking call to action on small screens, as a floating island rather
 * than a bar welded to the bottom edge. A server component: it ships no
 * JavaScript.
 *
 * z-30 keeps it below the full-screen menu (z-40), which carries its own
 * booking button. The safe-area offset clears the iPhone home indicator, and
 * the footer reserves matching space so nothing sits behind it.
 */
export default function MobileBookBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="glass-dark pointer-events-auto mx-auto flex max-w-md items-center gap-2 rounded-full bg-atlantic/90 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_-16px_rgba(15,39,48,0.6)] backdrop-blur-xl">
        <a
          href={site.phones.tollFreeHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-small text-foam transition-colors duration-300 active:bg-white/10"
        >
          <Phone size={16} weight="regular" aria-hidden />
          Call us
        </a>
        <Link
          href="/booking"
          className="group flex h-12 flex-[1.4] items-center justify-between gap-2 rounded-full bg-accent pl-5 pr-1.5 text-small font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition-transform duration-300 active:scale-[0.98]"
        >
          Book a room
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
            <ArrowUpRight size={14} weight="bold" />
          </span>
        </Link>
      </div>
    </div>
  );
}
