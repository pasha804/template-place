// @ts-nocheck
import { Reveal, SectionTitle } from "./atoms"

const DEFAULT_SHOTS = [
  { src: "/templates/wedding-petals/g4.jpg", alt: "Reception table set with candles and roses", span: "md:col-span-2 md:row-span-2" },
  { src: "/templates/wedding-petals/g2.jpg", alt: "Blush rose bouquet with copper ribbon", span: "" },
  { src: "/templates/wedding-petals/g3.jpg", alt: "Two rings resting on rose petals", span: "" },
  { src: "/templates/wedding-petals/g5.jpg", alt: "Couple dancing under string lights", span: "md:col-span-2" },
  { src: "/templates/wedding-petals/g6.jpg", alt: "Hands with henna and rings", span: "md:col-span-2" },
  { src: "/templates/wedding-petals/g1.jpg", alt: "Couple walking at sunset", span: "md:col-span-2" },
]

export function Gallery({ galleryImages }: { galleryImages?: string[] }) {
  const items = (galleryImages && galleryImages.length > 0)
    ? galleryImages.map((src, i) => ({
        src,
        alt: `Wedding photo ${i + 1}`,
        span: i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 || i === 4 || i === 5 ? "md:col-span-2" : "",
      }))
    : DEFAULT_SHOTS

  return (
    <section id="gallery" className="py-24 md:py-32">
      <SectionTitle kicker="Chapter Four" title="Moments" sub="A few frames from the road here." />

      <div className="mx-auto mt-14 grid max-w-6xl auto-rows-[150px] grid-cols-2 gap-3 px-5 md:auto-rows-[190px] md:grid-cols-4">
        {items.map((s, i) => (
          <Reveal key={i} delay={i * 70} className={`h-full ${s.span}`}>
            <figure className="group relative h-full overflow-hidden rounded-sm border border-copper/20">
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-115"
              />
              <div className="absolute inset-0 bg-plum-deep/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-3 border border-copper/0 transition-colors duration-500 group-hover:border-copper/50" />
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
