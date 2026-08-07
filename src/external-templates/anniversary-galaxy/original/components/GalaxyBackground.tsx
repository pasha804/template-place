// @ts-nocheck
import { motion } from "framer-motion"
import { series } from "./rand"
import { Butterfly } from "./Butterfly"
import { Heart } from "./Heart"

const stars = series(7, 130, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 1 + r() * 2.2,
  delay: r() * 5,
  dur: 2.5 + r() * 4,
}))

const bigStars = series(19, 14, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 8 + r() * 10,
  delay: r() * 6,
}))

const shooting = series(31, 4, (r) => ({
  x: r() * 60,
  y: r() * 40,
  delay: r() * 12,
  dur: 5 + r() * 4,
}))

const dust = series(53, 30, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 2 + r() * 4,
  dur: 12 + r() * 14,
  delay: r() * 8,
  drift: -30 + r() * 60,
}))

const flutters = series(71, 5, (r) => ({
  x: 5 + r() * 88,
  y: 8 + r() * 78,
  size: 22 + r() * 26,
  dur: 14 + r() * 10,
  delay: r() * 6,
  sway: 40 + r() * 90,
}))

const hearts = series(97, 7, (r) => ({
  x: 4 + r() * 92,
  size: 10 + r() * 14,
  dur: 16 + r() * 12,
  delay: r() * 10,
}))

export function GalaxyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden galaxy-bg">
      {/* nebula clouds */}
      <div className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] animate-nebula rounded-full bg-nebula/30 blur-[120px]" />
      <div
        className="absolute -right-1/5 top-1/3 h-[60vh] w-[60vw] animate-nebula rounded-full bg-magenta/25 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-[-15%] left-1/4 h-[55vh] w-[55vw] animate-nebula rounded-full bg-violet/25 blur-[140px]"
        style={{ animationDelay: "-14s" }}
      />

      {/* tiny stars */}
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full bg-star animate-twinkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}

      {/* sparkle stars */}
      {bigStars.map((s, i) => (
        <span
          key={`b${i}`}
          className="absolute animate-twinkle text-primary/70"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.4L22.6 12l-8.4 2.2L12 24l-2.2-9.8L1.4 12l8.4-3.6z" />
          </svg>
        </span>
      ))}

      {/* shooting stars */}
      {shooting.map((s, i) => (
        <span
          key={`sh${i}`}
          className="absolute h-px w-32 origin-left rounded-full bg-gradient-to-r from-star via-primary/70 to-transparent"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `shooting ${s.dur}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* floating dust particles */}
      {dust.map((p, i) => (
        <motion.span
          key={`d${i}`}
          className="absolute rounded-full bg-primary/40 blur-[1px]"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -90, 0], x: [0, p.drift, 0], opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* butterflies */}
      {flutters.map((b, i) => (
        <motion.div
          key={`f${i}`}
          className="absolute text-primary/60 neon-outline"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: b.size }}
          animate={{ x: [0, b.sway, 0], y: [0, -70, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: b.dur, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ scaleX: [1, 0.55, 1] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <Butterfly className="h-full w-full" />
          </motion.div>
        </motion.div>
      ))}

      {/* rising hearts */}
      {hearts.map((h, i) => (
        <motion.div
          key={`h${i}`}
          className="absolute bottom-[-8%] text-primary/50 neon-outline"
          style={{ left: `${h.x}%`, width: h.size }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 0.8, 0], rotate: [-10, 12, -10] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="h-full w-full" />
        </motion.div>
      ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.05_0.02_300/0.8))]" />
    </div>
  )
}
