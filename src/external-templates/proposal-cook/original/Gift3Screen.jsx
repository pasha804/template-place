"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"
import { revealBurst } from "./lib/fireworks"

const REASONS = [
  { emoji: "😊", text: "Your smile makes the whole world feel like a better place" },
  { emoji: "💫", text: "The way your eyes light up when you talk about things you love" },
  { emoji: "🌹", text: "You're gentle and strong at the same time — rare & beautiful" },
  { emoji: "🎵", text: "Your laugh is literally my favorite sound in the universe" },
  { emoji: "👑", text: "You carry yourself like a queen without even trying" },
  { emoji: "🌙", text: "You're the last thought on my mind every single night" },
  { emoji: "💪", text: "Your strength — the way you handle life with grace at 18" },
  { emoji: "🦋", text: "You give me butterflies every single time I think of you" },
  { emoji: "🌟", text: "You make ordinary moments feel magical just by being there" },
  { emoji: "🥺", text: "You make me want to be a better person, every day" },
  { emoji: "💕", text: "Because loving you feels like the most natural thing in the world" },
  { emoji: "🌹", text: "Because you are Jana — and that alone is reason enough" },
]

export default function Gift3Screen({ onBack }) {
  const [revealed, setRevealed] = useState(Array(REASONS.length).fill(false))
  const [hovering, setHovering] = useState(null)

  const total = REASONS.length
  const revealedCount = revealed.filter(Boolean).length
  const allDone = revealedCount === total

  const handleReveal = (i) => {
    if (revealed[i]) return
    const next = [...revealed]
    next[i] = true
    setRevealed(next)

    if (next.filter(Boolean).length === total) {
      // All revealed — fireworks
      setTimeout(() => revealBurst(), 200)
    }
  }

  const revealAll = () => {
    setRevealed(Array(REASONS.length).fill(true))
    setTimeout(() => revealBurst(), 100)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={16} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="gradient-text text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: "'Shantell Sans', cursive" }}>
            Reasons I Love You ✨
          </h1>
          <p className="mt-2 text-white/40 text-sm italic">
            Tap each card to reveal — {revealedCount}/{total} discovered
          </p>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 rounded-full mx-auto max-w-xs" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #e11d48, #a855f7)" }}
              animate={{ width: `${(revealedCount / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer rounded-2xl overflow-hidden"
              style={{ minHeight: 100 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 160, damping: 18 }}
              onClick={() => handleReveal(i)}
              onHoverStart={() => setHovering(i)}
              onHoverEnd={() => setHovering(null)}
              whileHover={{ scale: revealed[i] ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <AnimatePresence mode="wait">
                {!revealed[i] ? (
                  /* ── Scratch card (unrevealed) ── */
                  <motion.div
                    key="locked"
                    className="w-full h-full flex flex-col items-center justify-center p-4"
                    style={{
                      background: hovering === i
                        ? "linear-gradient(135deg, rgba(225,29,72,0.25), rgba(168,85,247,0.2))"
                        : "linear-gradient(135deg, rgba(100,0,40,0.35), rgba(60,0,30,0.4))",
                      border: hovering === i
                        ? "1.5px solid rgba(244,114,182,0.5)"
                        : "1.5px solid rgba(255,255,255,0.06)",
                      minHeight: 100,
                    }}
                    exit={{ opacity: 0, scale: 0.7, rotate: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.div
                      className="text-3xl mb-1 select-none"
                      animate={hovering === i ? { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      🔒
                    </motion.div>
                    <p className="text-white/30 text-xs text-center">Tap to reveal</p>
                    <p className="text-white/20 text-[10px] mt-1">#{i + 1}</p>
                  </motion.div>
                ) : (
                  /* ── Revealed card ── */
                  <motion.div
                    key="revealed"
                    className="w-full h-full flex flex-col items-start justify-between p-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(225,29,72,0.18), rgba(168,85,247,0.15))",
                      border: "1.5px solid rgba(244,114,182,0.3)",
                      boxShadow: "0 0 20px rgba(225,29,72,0.12)",
                      minHeight: 100,
                    }}
                    initial={{ opacity: 0, scale: 0.6, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  >
                    <span className="text-2xl select-none mb-2" style={{ filter: "drop-shadow(0 0 6px rgba(225,29,72,0.5))" }}>
                      {reason.emoji}
                    </span>
                    <p
                      className="text-white/85 text-xs md:text-sm leading-snug"
                      style={{ fontFamily: "'Shantell Sans', cursive" }}
                    >
                      {reason.text}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* All revealed celebration */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              className="text-center mb-6 rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, rgba(225,29,72,0.15), rgba(168,85,247,0.12))", border: "1px solid rgba(244,114,182,0.25)" }}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <motion.p
                className="text-3xl mb-3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎉
              </motion.p>
              <p className="gradient-text text-xl font-bold mb-1" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                You found all 12 reasons, Jana!
              </p>
              <p className="text-white/50 text-sm italic">
                And honestly? There are a hundred more I couldn't fit 💕
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reveal all button (if not all done) */}
        {!allDone && revealedCount < total && (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button
              onClick={revealAll}
              className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)" }}
            >
              Reveal All at Once ✨
            </button>
          </motion.div>
        )}

        {/* Back */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <PremiumButton onClick={onBack} variant="secondary">
            ← Back to Gifts
          </PremiumButton>
        </motion.div>
      </div>
    </motion.div>
  )
}
