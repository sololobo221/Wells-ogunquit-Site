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
    <section className="relative flex min-h-[54dvh] items-end overflow-hidden bg-ink pt-24">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="z-0 object-cover" />
      <div className="wash absolute inset-0 z-0" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pb-14 lg:px-10 lg:pb-18">
        <h1 className="max-w-[16ch] text-[2.3rem] leading-[1.05] text-white sm:text-[3rem] lg:text-[3.6rem]">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-[52ch] leading-[1.65] text-white/85">{intro}</p>}
      </div>
    </section>
  );
}
