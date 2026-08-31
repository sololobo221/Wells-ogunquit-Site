import Image from "next/image";

export default function PageHero({
  image,
  imageAlt,
  title,
  intro,
}: {
  image: string;
  imageAlt: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative flex min-h-[56dvh] items-end overflow-hidden bg-ink pt-20">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="z-0 object-cover" />
      <div className="hero-wash absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 lg:px-10 lg:pb-20">
        <h1 className="max-w-[16ch] text-h1 !text-white">{title}</h1>
        {intro && <p className="measure mt-6 text-lead text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
