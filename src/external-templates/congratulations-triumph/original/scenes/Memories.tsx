// @ts-nocheck
import { motion } from "framer-motion"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { between, series } from "../components/rand"

const DEFAULT_PHOTOS = [
  { src: "/templates/congratulations-triumph/memory-1.jpg", caption: "Late nights, lamp still on" },
  { src: "/templates/congratulations-triumph/memory-2.jpg", caption: "The people who believed" },
  { src: "/templates/congratulations-triumph/memory-3.jpg", caption: "Fuelled by coffee" },
  { src: "/templates/congratulations-triumph/memory-4.jpg", caption: "Proof, in your hands" },
  { src: "/templates/congratulations-triumph/memory-5.jpg", caption: "Sunrise after the storm" },
  { src: "/templates/congratulations-triumph/memory-6.jpg", caption: "The final moment" },
]

export function Memories({ onNext, photos }: { onNext: () => void; photos?: Array<{src:string;caption:string}> }) {
  const items = (photos && photos.length > 0) ? photos : DEFAULT_PHOTOS
  const tilts = series(6060, items.length, r => ({ rotate: between(r, -9, 9), delay: between(r, 0, 0.6) }))
  const lights = series(8080, 22, r => ({ delay: between(r, 0, 2.5) }))

  return (
    <SceneShell title="Memories of the Grind" subtitle="The moments that quietly built this victory." footer={<GlowButton onClick={onNext}>Continue</GlowButton>}>
      <div aria-hidden className="mb-10 flex items-center justify-between px-2">
        {lights.map((l, i) => (
          <span key={i} className="ct-animate-twinkle h-2 w-2 rounded-full" style={{ background: "var(--ct-primary)", boxShadow: "var(--ct-shadow-gold)", animationDelay: `${l.delay}s`, transform: `translateY(${i % 2 === 0 ? 0 : 8}px)` }} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((photo, i) => {
          const t = tilts[i] ?? { rotate: 0, delay: 0 }
          return (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: -80, rotate: t.rotate * 2.2 }}
              animate={{ opacity: 1, y: 0, rotate: t.rotate }}
              transition={{ delay: 0.2 + t.delay, type: "spring", stiffness: 90, damping: 12 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              className="relative rounded-sm p-3 pb-10 shadow-2xl"
              style={{ background: "var(--ct-parchment)" }}
            >
              <span aria-hidden className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] opacity-80" style={{ backgroundImage: "var(--ct-gradient-gold)" }} />
              <img src={photo.src} alt={photo.caption} width={768} height={768} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
              <figcaption className="ct-font-script absolute right-0 bottom-3 left-0 px-3 text-sm" style={{ color: "var(--ct-ink)" }}>{photo.caption}</figcaption>
            </motion.figure>
          )
        })}
      </div>
    </SceneShell>
  )
}
