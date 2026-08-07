// @ts-nocheck
import { motion } from "framer-motion"
import { series } from "./rand"

const pieces = series(211, 70, r => ({
  x: (r() - 0.5) * 700,
  y: -120 - r() * 420,
  rot: r() * 720 - 360,
  size: 6 + r() * 10,
  delay: r() * 0.35,
  round: r() > 0.5,
  hue: Math.floor(r() * 3),
}))

const COLORS = [
  "oklch(0.7 0.24 350)",
  "oklch(0.87 0.12 88)",
  "oklch(0.55 0.24 300)",
]

export function Confetti({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute neon-outline"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.5,
            borderRadius: p.round ? "9999px" : "2px",
            background: COLORS[p.hue],
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 620], opacity: [0, 1, 0], rotate: p.rot, scale: 1 }}
          transition={{ duration: 2.6, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  )
}
