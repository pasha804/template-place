"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const lines = [
  "You are my today,",
  "my tomorrow,",
  "and my forever. 💕",
]

export default function Gift3Screen({ onBack }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={14} />

            <motion.div 
                className="glass-card relative z-30 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

                <div className="w-full relative z-10 flex flex-col items-center text-center">

        {/* ── Poetic lines ── */}
        <div className="mb-14">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="font-bold leading-snug"
              style={{
                fontFamily: "'Shantell Sans', cursive",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.35, duration: 0.8 }}
            >
              <motion.span
                className="gradient-text"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.5 }}
                style={{ display: "inline-block" }}
              >
                {line}
              </motion.span>
            </motion.p>
          ))}
        </div>

        {/* ── Floating hearts ── */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg select-none"
              style={{
                left: `${10 + (i * 7.5) % 80}%`,
                top: `${15 + (i * 13) % 70}%`,
                opacity: 0.12 + (i % 3) * 0.07,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            >
              {i % 2 === 0 ? "❤️" : "💕"}
            </motion.div>
          ))}
        </div>

        {/* ── Back button ── */}
        <PremiumButton onClick={onBack} variant="secondary" delay={0.5}>
          ← Back
        </PremiumButton>
                </div>
            </motion.div>
    </motion.div>
  )
}
