"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function MessageRevealScreen({ onContinue, personName }) {
  const name = personName || "My Love"
  const WORDS = [
    name,
    "Beautiful",
    "Forever",
    "Mine",
    "Soulmate",
  ]
  const [revealed, setRevealed] = useState(Array(WORDS.length).fill(false))
  const [confetti, setConfetti] = useState(false)

  const handleReveal = (index) => {
    const next = [...revealed]
    next[index] = true
    setRevealed(next)
    if (next.every(Boolean)) {
      setTimeout(() => setConfetti(true), 300)
    }
  }

  const allRevealed = revealed.every(Boolean)

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <PremiumBackground particleCount={20} />

      {/* Confetti burst */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-base select-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                animation: `confettiFall ${2 + Math.random() * 2}s ease-in ${Math.random() * 1.5}s forwards`,
                opacity: 1,
              }}
            >
              {["🎉", "💕", "✨", "🌸", "💖"][i % 5]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-md text-center">

        {/* ── Header heart ── */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-6 flex items-center justify-center"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(236,72,153,0.2), rgba(124,58,237,0.2))",
              border: "1px solid rgba(244,114,182,0.3)",
              boxShadow: "0 0 30px rgba(236,72,153,0.3)",
            }}
          >
            {/* Gradient heart SVG */}
            <svg width="52" height="52" viewBox="0 0 24 24" className="animate-pulse">
              <defs>
                <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                fill="url(#heartGrad)"
              />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl text-white mb-2 font-light"
          style={{ fontFamily: "'Shantell Sans', cursive" }}
        >
          Just for you
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-10 text-sm tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Tap each heart to reveal
        </motion.p>

        {/* ── Reveal cards ── */}
        <div className="space-y-4">
          {WORDS.map((word, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {!revealed[index] ? (
                  <motion.button
                    key="hidden"
                    onClick={() => handleReveal(index)}
                    className="w-full p-4 rounded-xl transition-all duration-300 flex items-center justify-center group"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    whileHover={{
                      scale: 1.02,
                      background: "rgba(236,72,153,0.1)",
                      borderColor: "rgba(244,114,182,0.4)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                      <defs>
                        <linearGradient id={`hg${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f472b6" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
                        fill={`url(#hg${index})`}
                      />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.div
                    key="revealed"
                    initial={{ opacity: 0, scale: 0.7, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-full p-4 rounded-xl flex items-center justify-center text-center"
                    style={{
                      background: "rgba(236,72,153,0.08)",
                      border: "1px solid rgba(244,114,182,0.25)",
                      boxShadow: "0 0 20px rgba(236,72,153,0.15)",
                    }}
                  >
                    <span
                      className="gradient-text font-semibold text-lg md:text-xl"
                      style={{ fontFamily: "'Shantell Sans', cursive" }}
                    >
                      {word}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* ── See more button ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allRevealed ? 1 : 0.5, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <PremiumButton onClick={onContinue}>
            See more →
          </PremiumButton>
        </motion.div>
      </div>
    </motion.div>
  )
}
