"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { revealBurst } from "./lib/fireworks"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function MessageRevealScreen({ onContinue, personName }) {
  const name = personName || "Jana"
  const TILES = [
    { word: name, sub: "Your name is my favourite word 🌹" },
    { word: "Gorgeous", sub: "Every single day, without trying 💫" },
    { word: "Loved", sub: "More than I know how to say 💞" },
    { word: "Rare", sub: "There is truly no one like you 👑" },
    { word: "Forever", sub: "That's how long I'll feel this 🕰️" },
    { word: "Mine?", sub: "That's the question I've been building up to... 🥺" },
  ]
  const [revealed, setRevealed] = useState(Array(TILES.length).fill(false))
  const [selected, setSelected] = useState(null)

  const allRevealed = revealed.every(Boolean)

  const handleReveal = (i) => {
    const next = [...revealed]
    next[i] = true
    setRevealed(next)
    setSelected(i)
    if (next.every(Boolean)) {
      setTimeout(() => revealBurst(), 200)
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PremiumBackground particleCount={22} />

      <div className="relative z-10 w-full max-w-xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            💌
          </motion.div>
          <h1 className="gradient-text text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Shantell Sans', cursive" }}>
            Just For You, Jana
          </h1>
          <p className="mt-2 text-white/40 text-sm uppercase tracking-widest">
            Tap each card to reveal
          </p>
          {/* Progress bar */}
          <div className="mt-4 mx-auto h-1 rounded-full max-w-xs" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #e11d48, #a855f7)" }}
              animate={{ width: `${(revealed.filter(Boolean).length / TILES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Tile grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {TILES.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 180 }}
            >
              <AnimatePresence mode="wait">
                {!revealed[i] ? (
                  <motion.button
                    key="locked"
                    onClick={() => handleReveal(i)}
                    className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1.5px solid rgba(255,255,255,0.07)",
                    }}
                    exit={{ opacity: 0, scale: 0.7, rotate: 10 }}
                    whileHover={{
                      background: "rgba(225,29,72,0.12)",
                      borderColor: "rgba(244,114,182,0.4)",
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <motion.div
                      className="text-3xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      🔒
                    </motion.div>
                    <span className="text-white/25 text-xs">tap me</span>
                    {/* shimmer */}
                    <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.07) 50%,transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 3s infinite" }} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="revealed"
                    className="w-full aspect-square rounded-2xl flex flex-col items-center justify-center p-3 cursor-pointer"
                    style={{
                      background: selected === i
                        ? "linear-gradient(135deg, rgba(225,29,72,0.28), rgba(168,85,247,0.22))"
                        : "linear-gradient(135deg, rgba(225,29,72,0.15), rgba(168,85,247,0.12))",
                      border: `1.5px solid rgba(244,114,182,${selected === i ? "0.5" : "0.25"})`,
                      boxShadow: selected === i ? "0 0 20px rgba(225,29,72,0.2)" : "none",
                    }}
                    initial={{ scale: 0.5, rotate: -180, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    onClick={() => setSelected(i)}
                  >
                    <span className="gradient-text font-bold text-lg md:text-xl text-center" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                      {tile.word}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Sub-message for selected */}
        <AnimatePresence mode="wait">
          {selected !== null && revealed[selected] && (
            <motion.div
              key={selected}
              className="rounded-2xl px-5 py-4 text-center mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(225,29,72,0.12), rgba(168,85,247,0.1))",
                border: "1px solid rgba(244,114,182,0.2)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-white/80 text-sm md:text-base" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                {TILES[selected].sub}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PremiumButton onClick={onContinue}>
                There's more for you →
              </PremiumButton>
            </motion.div>
          )}
        </AnimatePresence>

        {!allRevealed && (
          <p className="text-center text-white/25 text-xs mt-2 italic">
            Reveal all {TILES.length} cards to continue 🌹
          </p>
        )}
      </div>
    </motion.div>
  )
}
