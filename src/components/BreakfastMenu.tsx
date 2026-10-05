import Reveal from "./Reveal";

const items = [
  "Muffins baked that morning",
  "Bagels, rolls and toast",
  "Fresh fruit and yogurt",
  "Coffee, tea and hot chocolate",
];

/** The breakfast spread set like a small printed menu card. */
export default function BreakfastMenu({ className = "" }: { className?: string }) {
  return (
    <Reveal delay={0.1} className={className}>
      <div className="border border-ink/15 bg-surface px-8 py-10 text-center">
        <span className="caps text-accent">Every morning</span>
        <p className="mt-3 font-display text-h3">Breakfast</p>
        <p className="mt-1 text-small tabular-nums text-muted">7:00 to 9:30</p>
        <ul className="mt-7 space-y-3 border-t border-line pt-7 text-body text-ink">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-7 border-t border-line pt-6 text-small text-muted">Free for every guest</p>
      </div>
    </Reveal>
  );
}
