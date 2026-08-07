// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Heart } from "../components/Heart"
import { series } from "../components/rand"

const floaters = series(409, 12, r => ({
  x: r() * 100, y: r() * 100,
  size: 10 + r() * 18,
  dur: 6 + r() * 6,
  delay: r() * 4,
}))

export function Forever({ onNext, title, text, partnerName }: { onNext: () => void; title?: string; text?: string; partnerName?: string }) {
  return (
    <SceneShell
      title={title || "Forever Yours"}
      subtitle={<>Just a little something for<br />my forever person.</>}
      footerSlot={<GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
    >
      <div className="relative mx-auto flex h-64 w-full max-w-sm items-center justify-center sm:h-72">
        {floaters.map((f, i) => (
          <motion.span
            key={i}
            className="absolute neon-outline"
            style={{ left: `${f.x}%`, top: `${f.y}%`, width: f.size, color: "oklch(0.7 0.24 350 / 50%)" }}
            animate={{ y: [0, -26, 0], opacity: [0.3, 0.85, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="h-full w-full" />
          </motion.span>
        ))}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative animate-heartbeat"
        >
          <svg viewBox="0 0 200 180" className="h-56 w-56 neon-outline sm:h-64 sm:w-64">
            <motion.path
              d="M100 165C100 165 20 118 20 66C20 38 42 20 66 20C82 20 93 29 100 40C107 29 118 20 134 20C158 20 180 38 180 66C180 118 100 165 100 165Z"
              fill="none"
              stroke="oklch(0.72 0.25 348)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: "oklch(0.7 0.24 350 / 25%)" }} />
          <p className="script absolute inset-0 flex items-center justify-center px-12 text-center text-2xl leading-tight text-glow sm:text-3xl" style={{ color: "var(--primary)" }}>
            {text || "I love you forever"}
          </p>
        </motion.div>
      </div>
    </SceneShell>
  )
}
