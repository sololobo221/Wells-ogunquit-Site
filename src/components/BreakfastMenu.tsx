import { Coffee } from "@phosphor-icons/react/dist/ssr";
import Reveal from "./Reveal";

const items = [
  "Muffins baked that morning",
  "Bagels, rolls and toast",
  "Fresh fruit and yogurt",
  "Coffee, tea and hot chocolate",
];

/**
 * A small printed-menu card for the breakfast spread. Overlaps a photograph
 * at a slight angle on desktop, like a card propped on the counter; sits
 * square below the photograph on small screens.
 */
export default function BreakfastMenu({ className = "" }: { className?: string }) {
  return (
    <Reveal delay={0.15} y={36} className={className}>
      <div className="bezel bezel-solid">
        <div className="bezel-core p-7 sm:p-8">
          <p className="font-display text-h3 italic leading-none">Breakfast</p>
          <p className="mt-3 text-micro tabular-nums text-faint">Every morning, 7:00 to 9:30</p>
          <ul className="mt-6 border-t border-line text-small text-muted">
            {items.map((item) => (
              <li key={item} className="border-b border-line py-3">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2.5 text-small font-medium text-ink">
            <Coffee size={18} weight="light" aria-hidden />
            Free for every guest
          </p>
        </div>
      </div>
    </Reveal>
  );
}
