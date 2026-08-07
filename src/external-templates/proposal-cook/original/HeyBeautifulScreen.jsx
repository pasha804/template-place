"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const COMPLIMENTS = [
  "You are absolutely gorgeous 🌹",
  "Your smile is my favourite thing 💕",
  "You make everything brighter ✨",
  "You're one in a billion, Jana 👑",
  "I can't stop thinking about you 🥺",
]

export default function HeyBeautifulScreen({ onOpenHeart }) {
  const [complimentIdx, setComplimentIdx] = useState(0)
  const [cycled, setCycled] = useState(false)

  const nextCompliment = () => {
    const next = (complimentIdx + 1) % COMPLIMENTS.length
    setComplimentIdx(next)
    if (next === COMPLIMENTS.length - 1) setCycled(true)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={25} />

      <motion.div
        className="glass-card relative z-30 w-full max-w-lg mx-auto flex flex-col items-center p-8 md:p-12 rounded-[40px] overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        {/* Glows */}
        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.12)", filter: "blur(50px)" }} />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.1)", filter: "blur(50px)" }} />

        {/* GIF with orbiting sparks */}
        <motion.div
          className="mb-7 flex items-center justify-center relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          {/* Pulse rings */}
          {[240, 210].map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{ width: s, height: s, border: `1.5px solid rgba(225,29,72,${0.25 - i * 0.1})` }}
              animate={{ scale: [1, 1.1 + i * 0.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}

          {/* Main ring */}
          <div style={{
            width: 190, height: 190, borderRadius: "50%",
            background: "linear-gradient(135deg, #e11d48, #ec4899, #a855f7, #e11d48)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 4s ease infinite, pulseGlow 2.5s ease-in-out infinite",
            padding: 4,
          }}>
            <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#0d0008" }}>
              <img src="/templates/proposal-cook/gif/cute.gif" alt="Jana" className="w-full h-full object-cover rounded-full" loading="lazy" />
            </div>
          </div>

          {/* Sparkles */}
          {[{ e: "💖", x: 105, y: -10 }, { e: "🌹", x: -20, y: 95 }, { e: "✨", x: 95, y: 100 }].map(({ e, x, y }, i) => (
            <motion.div
              key={i}
              className="absolute text-xl select-none pointer-events-none"
              style={{ left: `calc(50% + ${x - 12}px)`, top: `calc(50% + ${y - 12}px)` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5], y: [0, -6, 0] }}
              transition={{ duration: 2 + i * 0.6, repeat: Infinity, delay: i * 0.4 }}
            >
              {e}
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="gradient-text text-4xl md:text-6xl font-bold text-center mb-2"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Jana 💕
        </motion.h1>

        {/* Cycling compliments */}
        <div className="h-10 mb-6 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={complimentIdx}
              className="text-base md:text-lg font-light text-center"
              style={{ color: "rgba(255,255,255,0.7)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              {COMPLIMENTS[complimentIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Tap to cycle */}
        {!cycled ? (
          <motion.button
            onClick={nextCompliment}
            className="mb-6 px-5 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105"
            style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(244,114,182,0.3)", color: "rgba(255,255,255,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            tap for more 💬
          </motion.button>
        ) : (
          <motion.p
            className="mb-6 text-xs italic"
            style={{ color: "rgba(255,255,255,0.3)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            and there's even more inside... 🥺
          </motion.p>
        )}

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <PremiumButton onClick={onOpenHeart}>
            Open What's In My Heart 💖
          </PremiumButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
