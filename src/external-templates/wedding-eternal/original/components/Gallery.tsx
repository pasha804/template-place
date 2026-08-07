// @ts-nocheck
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

const DEFAULT_GALLERY = [
  { src: "/templates/wedding-eternal/gallery-1.jpg", alt: "Bridal bouquet of blush roses and white peonies" },
  { src: "/templates/wedding-eternal/gallery-2.jpg", alt: "Golden candelabra reception table setting" },
  { src: "/templates/wedding-eternal/hero-couple.jpg", alt: "The couple together under warm chandelier light" },
  { src: "/templates/wedding-eternal/gallery-3.jpg", alt: "The couple sharing their first dance" },
  { src: "/templates/wedding-eternal/gallery-4.jpg", alt: "Two gold wedding bands resting on marble" },
  { src: "/templates/wedding-eternal/bride.jpg", alt: "Portrait of the bride in ivory and gold" },
  { src: "/templates/wedding-eternal/gallery-5.jpg", alt: "Close detail of embroidered bridal fabric and veil" },
  { src: "/templates/wedding-eternal/gallery-6.jpg", alt: "Ceremony aisle beneath a floral arch at golden hour" },
]

export function Gallery({ galleryImages }: { galleryImages?: string[] }) {
  const items = (galleryImages && galleryImages.length > 0)
    ? galleryImages.map((src, i) => ({ src, alt: `Wedding photo ${i + 1}` }))
    : DEFAULT_GALLERY

  const [index, setIndex] = useState<number | null>(null)
  const touchX = useRef(0)

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [index, close, step])

  return (
    <section id="gallery" className="section-pad relative overflow-hidden bg-navy-deep">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          eyebrow="Chapter Four"
          script="Photo Gallery"
          title="Moments we keep"
          subtitle="A collection of frames from the years that led us here."
        />

        <div className="mt-16 columns-2 gap-4 sm:gap-5 lg:columns-3 xl:columns-4">
          {items.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group relative mb-4 block w-full overflow-hidden rounded-sm border border-gold/15 sm:mb-5"
              aria-label={`Open image ${i + 1}: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-navy-abyss/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/70 text-gold">
                  <Expand className="h-4 w-4" strokeWidth={1.3} aria-hidden />
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-navy-abyss/95 backdrop-blur-xl"
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? 0)}
            onTouchEnd={(e) => {
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
            }}
          >
            <button
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/15"
            >
              <X className="h-4 w-4" strokeWidth={1.4} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                step(-1)
              }}
              aria-label="Previous image"
              className="absolute left-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/15 sm:left-8"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.3} />
            </button>

            <motion.img
              key={index}
              src={items[index]?.src}
              alt={items[index]?.alt ?? ""}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[78vh] max-w-[86vw] rounded-sm border border-gold/25 object-contain shadow-[var(--shadow-luxe)]"
            />

            <button
              onClick={(e) => {
                e.stopPropagation()
                step(1)
              }}
              aria-label="Next image"
              className="absolute right-3 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold/15 sm:right-8"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.3} />
            </button>

            <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-center text-[0.65rem] tracking-[0.3em] text-gold/80 uppercase">
              {index + 1} / {items.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
