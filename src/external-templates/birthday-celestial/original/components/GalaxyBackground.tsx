import { motion } from "framer-motion";
import { series } from "../lib/rand";
import { Butterfly } from "./Butterfly";
import { Heart } from "./Heart";
import { memo } from "react";

const stars = series(7, 85, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 1.2 + r() * 2.4,
  delay: r() * 5,
  dur: 2.5 + r() * 3.5,
}));

const bigStars = series(19, 12, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 8 + r() * 10,
  delay: r() * 6,
}));

const shooting = series(31, 4, (r) => ({
  x: r() * 70,
  y: r() * 45,
  delay: r() * 10,
  dur: 4 + r() * 3,
}));

const dust = series(53, 16, (r) => ({
  x: r() * 100,
  y: r() * 100,
  size: 2 + r() * 4,
  dur: 10 + r() * 12,
  delay: r() * 6,
  drift: -30 + r() * 60,
}));

const flutters = series(71, 4, (r) => ({
  x: 5 + r() * 88,
  y: 8 + r() * 78,
  size: 22 + r() * 26,
  dur: 12 + r() * 8,
  delay: r() * 5,
  sway: 40 + r() * 90,
}));

const hearts = series(97, 6, (r) => ({
  x: 4 + r() * 92,
  size: 12 + r() * 16,
  dur: 14 + r() * 10,
  delay: r() * 8,
}));

export const GalaxyBackground = memo(function GalaxyBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden galaxy-bg"
      style={{ willChange: "transform" }}
    >
      {/* nebula clouds */}
      <div
        className="absolute -left-1/4 top-[-10%] h-[70vh] w-[70vw] animate-nebula rounded-full blur-[100px]"
        style={{
          backgroundColor: "oklch(0.38 0.24 300 / 0.45)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute -right-1/5 top-1/3 h-[60vh] w-[60vw] animate-nebula rounded-full blur-[110px]"
        style={{
          backgroundColor: "oklch(0.58 0.28 340 / 0.4)",
          animationDelay: "-8s",
          willChange: "transform",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-1/4 h-[55vh] w-[55vw] animate-nebula rounded-full blur-[120px]"
        style={{
          backgroundColor: "oklch(0.45 0.26 285 / 0.4)",
          animationDelay: "-14s",
          willChange: "transform",
        }}
      />

      {/* tiny stars */}
      {stars.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            backgroundColor: "oklch(0.96 0.08 85)",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.9)",
          }}
        />
      ))}

      {/* sparkle stars */}
      {bigStars.map((s, i) => (
        <span
          key={`b${i}`}
          className="absolute animate-twinkle text-primary"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            filter: "drop-shadow(0 0 6px oklch(0.72 0.25 348 / 0.8))",
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
          className="absolute h-[2px] w-40 origin-left rounded-full"
          style={{
            background: "linear-gradient(90deg, #ffffff, oklch(0.72 0.25 348), transparent)",
            left: `${s.x}%`,
            top: `${s.y}%`,
            animation: `shooting ${s.dur}s linear ${s.delay}s infinite`,
            boxShadow: "0 0 10px oklch(0.72 0.25 348)",
          }}
        />
      ))}

      {/* floating dust particles */}
      {dust.map((p, i) => (
        <motion.span
          key={`d${i}`}
          className="absolute rounded-full bg-primary/50 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 8px oklch(0.72 0.25 348 / 0.6)",
          }}
          animate={{ y: [0, -90, 0], x: [0, p.drift, 0], opacity: [0.15, 0.8, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* butterflies */}
      {flutters.map((b, i) => (
        <motion.div
          key={`f${i}`}
          className="absolute text-primary/70 neon-outline"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.size}px` }}
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
          className="absolute bottom-[-8%] text-primary/60 neon-outline"
          style={{ left: `${h.x}%`, width: `${h.size}px` }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 0.85, 0], rotate: [-10, 12, -10] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          <Heart className="h-full w-full" />
        </motion.div>
      ))}

      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,oklch(0.05_0.02_300/0.8))]" />
    </div>
  );
});
