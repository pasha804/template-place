"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const STAGES = [
  { max: 30,  label: "Detecting adorableness...",   color: "#f472b6" },
  { max: 60,  label: "Measuring your smile... 😊",  color: "#ec4899" },
  { max: 90,  label: "Calculating charm level... 💫", color: "#e11d48" },
  { max: 110, label: "Overloading the system... 💖",  color: "#a855f7" },
  { max: 120, label: "ERROR: TOO CUTE TO MEASURE 🚨", color: "#fbbf24" },
]

export default function CutenessLoaderScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 3200
    const intervalTime = 28
    const steps = duration / intervalTime
    const increment = 120 / steps

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 120) { clearInterval(timer); return 120 }
        return next
      })
    }, intervalTime)

    const done = setTimeout(() => onComplete(), duration + 400)
    return () => { clearInterval(timer); clearTimeout(done) }
  }, [onComplete])

  const stage = STAGES.find((s) => progress <= s.max) || STAGES[STAGES.length - 1]
  const pct = Math.round(progress)
  const barPct = Math.min(progress, 100)

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 relative z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "#0d0008" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(60,0,35,0.6) 0%, transparent 100%)" }} />

      <div className="glass-card relative z-30 w-full max-w-md mx-auto flex flex-col items-center text-center p-8 md:p-12 rounded-[40px]">
        <div className="absolute inset-0 rounded-[40px] pointer-events-none" style={{ boxShadow: "inset 0 0 40px rgba(225,29,72,0.1)" }} />

        {/* Emoji indicator */}
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {pct < 50 ? "🔍" : pct < 90 ? "😍" : pct < 110 ? "🤯" : "💥"}
        </motion.div>

        {/* Title */}
        <h2 className="text-white/85 text-lg md:text-xl font-semibold mb-2" style={{ fontFamily: "'Shantell Sans', cursive" }}>
          Jana Cuteness Scanner™
        </h2>

        {/* Stage label */}
        <motion.p
          key={stage.label}
          className="text-sm mb-6 italic"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {stage.label}
        </motion.p>

        {/* Big percentage */}
        <motion.div
          className="text-7xl md:text-8xl font-bold mb-6 leading-none"
          style={{ fontFamily: "monospace", color: stage.color, filter: `drop-shadow(0 0 20px ${stage.color}80)` }}
          animate={pct >= 120 ? { scale: [1, 1.08, 1] } : {}}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          {pct}%
        </motion.div>

        {/* Progress bar */}
        <div className="w-full rounded-full overflow-hidden mb-4" style={{ height: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${barPct}%`,
              background: `linear-gradient(90deg, #e11d48, ${stage.color})`,
              boxShadow: `0 0 14px ${stage.color}90`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* OVER 100 warning */}
        <AnimatePresence>
          {pct > 100 && (
            <motion.div
              className="flex items-center gap-2 mt-2 font-bold text-sm tracking-widest"
              style={{ color: "#fbbf24" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: [1, 1.05, 0.97, 1] }}
              transition={{ duration: 0.5 }}
            >
              🚨 EXCEEDS MAXIMUM CUTENESS 🚨
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
