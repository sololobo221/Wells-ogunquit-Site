import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  title,
  intro,
  invert = false,
  className = "",
}: {
  label?: string;
  title: string;
  intro?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      {label && <span className={`eyebrow ${invert ? "eyebrow-invert" : ""}`}>{label}</span>}
      <h2 className={`text-h2 max-w-[18ch] ${invert ? "!text-white" : ""}`}>{title}</h2>
      {intro && (
        <p
          className={`measure mt-6 text-lead ${invert ? "text-white/80" : "text-muted"}`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
