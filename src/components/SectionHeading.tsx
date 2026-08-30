import Reveal from "./Reveal";

export default function SectionHeading({
  label,
  title,
  intro,
  className = "",
}: {
  label?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {label && <p className="label mb-4">{label}</p>}
      <h2 className="text-[1.95rem] leading-[1.1] sm:text-[2.5rem] lg:text-[2.9rem]">{title}</h2>
      {intro && <p className="mt-5 max-w-[62ch] text-[1rem] leading-[1.65] text-muted">{intro}</p>}
    </Reveal>
  );
}
