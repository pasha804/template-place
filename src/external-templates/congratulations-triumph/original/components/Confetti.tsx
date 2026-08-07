// @ts-nocheck
import { motion } from "framer-motion"
import { series, between } from "./rand"

export function Confetti({ seed = 9931 }: { seed?: number }) {
  const pieces = series(seed, 90, r => ({
    x: (r() - 0.5) * 800,
    y: -80 - r() * 500,
    rot: r() * 720 - 360,
    size: 5 + r() * 10,
    delay: r() * 0.5,
    round: r() > 0.5,
    col: Math.floor(r() * 3),
  }))
  const COLORS = ["var(--ct-primary)", "var(--ct-accent)", "oklch(0.98 0.02 90)"]
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute ct-neon-gold"
          style={{ width: p.size, height: p.round ? p.size : p.size * 0.45, borderRadius: p.round ? "9999px" : "2px", background: COLORS[p.col] }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 700], opacity: [0, 1, 0], rotate: p.rot, scale: 1 }}
          transition={{ duration: 3, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
