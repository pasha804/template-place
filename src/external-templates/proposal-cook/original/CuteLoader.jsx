"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"

const LINES = [
  "Wrapping it with love... 🌹",
  "Making it perfect for Jana...",
  "Almost ready... 💕",
  "One moment more... ✨",
]

export default function CuteLoader() {
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setLineIdx((i) => (i + 1) % LINES.length), 950)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.9 }}
      className="min-h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden px-4"
    >
      <PremiumBackground particleCount={10} />

      {/* GIF ring — 1 Framer entrance + CSS glow */}
      <motion.div
        className="mb-10 flex items-center justify-center relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.2 }}
      >
        {/* CSS-only pulse rings */}
        <div className="ring-pulse absolute rounded-full pointer-events-none"
          style={{ width: 260, height: 260, border: "1.5px solid rgba(225,29,72,0.3)" }} />
        <div className="ring-pulse-slow absolute rounded-full pointer-events-none"
          style={{ width: 230, height: 230, border: "1px solid rgba(244,114,182,0.18)", animationDelay: "1s" }} />

        {/* Gradient ring */}
        <div style={{
          width: 196, height: 196, borderRadius: "50%",
          background: "linear-gradient(135deg, #e11d48, #ec4899, #a855f7, #e11d48)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 5s ease infinite, pulseGlow 3s ease-in-out infinite",
          padding: 5,
          boxShadow: "0 0 55px rgba(225,29,72,0.38), 0 0 110px rgba(225,29,72,0.12)",
        }}>
          <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "#0d0008" }}>
            <img
              src="/templates/proposal-cook/gif/1.gif"
              alt="Loading"
              className="w-44 h-44 object-contain"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* 3 static orbiting emojis — CSS-only rotation */}
        {[
          { e: "🌹", angle: 0 },
          { e: "💕", angle: 120 },
          { e: "✨", angle: 240 },
        ].map(({ e, angle }, i) => {
          const r = 115
          const rad = (angle * Math.PI) / 180
          return (
            <span
              key={i}
              className="absolute text-lg select-none pointer-events-none spark-pulse"
              style={{
                left: `calc(50% + ${r * Math.cos(rad) - 12}px)`,
                top:  `calc(50% + ${r * Math.sin(rad) - 12}px)`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {e}
            </span>
          )
        })}
      </motion.div>

      {/* Title — 1 Framer animation */}
      <motion.h2
        className="gradient-text text-3xl md:text-5xl font-bold mb-3 text-center relative z-10"
        style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        Just For Jana 🌹
      </motion.h2>

      {/* Cycling subtitle — 1 AnimatePresence */}
      <div className="h-7 overflow-hidden relative z-10 mb-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={lineIdx}
            className="text-sm md:text-base italic text-center"
            style={{ color: "rgba(255,255,255,0.4)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {LINES[lineIdx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 4 pulsing dots — CSS only */}
      <div className="flex justify-center space-x-3 relative z-10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-full dot-pulse"
            style={{
              width: 10, height: 10,
              background: "linear-gradient(135deg, #e11d48, #ec4899)",
              animationDelay: `${i * 0.22}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
