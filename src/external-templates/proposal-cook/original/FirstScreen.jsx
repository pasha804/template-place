"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const TYPING_TEXT = "Jana, I've been thinking about you..."

// Staggered word reveal for the heading
const HEADING = "There's something I need to tell you"
const HEADING_WORDS = HEADING.split(" ")

export default function FirstScreen({ onNext }) {
  const [typed, setTyped]         = useState("")
  const [typingDone, setTypingDone] = useState(false)
  const [showCard, setShowCard]   = useState(false)

  useEffect(() => {
    const start = setTimeout(() => {
      let i = 0
      const iv = setInterval(() => {
        i++
        setTyped(TYPING_TEXT.slice(0, i))
        if (i >= TYPING_TEXT.length) {
          clearInterval(iv)
          setTypingDone(true)
          setTimeout(() => setShowCard(true), 500)
        }
      }, 48)
      return () => clearInterval(iv)
    }, 700)
    return () => clearTimeout(start)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={14} />

      <div className="relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center">

        {/* ── Typewriter line ── */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-xl md:text-2xl font-light italic"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}
          >
            {typed}
            {!typingDone && (
              <motion.span
                className="inline-block w-[2px] h-5 bg-pink-400 ml-1 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
            )}
          </p>
        </motion.div>

        {/* ── Main card ── */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              className="glass-card w-full flex flex-col items-center px-8 py-12 md:px-14 md:py-14 rounded-[44px] relative overflow-hidden"
              initial={{ opacity: 0, y: 60, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 18 }}
            >
              {/* ── Static corner glows (no JS animation) ── */}
              <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: "rgba(225,29,72,0.14)", filter: "blur(70px)" }} />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full pointer-events-none"
                style={{ background: "rgba(168,85,247,0.12)", filter: "blur(70px)" }} />
              {/* Subtle top-center highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.5), transparent)" }} />

              {/* ── GIF Ring — only 2 Framer animations ── */}
              <motion.div
                className="mb-10 flex items-center justify-center relative"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 14 }}
              >
                {/* Outer glow pulse — CSS only */}
                <div className="ring-pulse absolute rounded-full pointer-events-none"
                  style={{ width: 260, height: 260, border: "1.5px solid rgba(225,29,72,0.35)" }} />
                <div className="ring-pulse-slow absolute rounded-full pointer-events-none"
                  style={{ width: 230, height: 230, border: "1px solid rgba(244,114,182,0.22)", animationDelay: "0.8s" }} />

                {/* Aura blur disc */}
                <div className="absolute rounded-full pointer-events-none"
                  style={{
                    width: 220, height: 220,
                    background: "radial-gradient(circle, rgba(225,29,72,0.22) 0%, transparent 70%)",
                    filter: "blur(28px)",
                    animation: "orbBreathL 5s ease-in-out infinite",
                  }} />

                {/* Gradient border ring */}
                <div style={{
                  width: 196, height: 196, borderRadius: "50%",
                  background: "linear-gradient(135deg, #e11d48, #ec4899, #a855f7, #e11d48)",
                  backgroundSize: "300% 300%",
                  animation: "gradientShift 5s ease infinite, pulseGlow 3s ease-in-out infinite",
                  padding: 5,
                  boxShadow: "0 0 60px rgba(225,29,72,0.4), 0 0 120px rgba(225,29,72,0.15)",
                }}>
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden"
                    style={{ background: "#0d0008" }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src="/templates/proposal-cook/gif/cute.gif"
                      alt="Jana"
                      className="w-full h-full object-cover rounded-full"
                      fetchPriority="high"
                    />
                  </motion.div>
                </div>

                {/* 4 static-position sparks — CSS pulse only */}
                {[
                  { e: "🌹", top: "-14px", left: "50%", ml: "-12px" },
                  { e: "💕", bottom: "-14px", left: "50%", ml: "-12px" },
                  { e: "✨", top: "50%",  left: "-14px", mt: "-12px" },
                  { e: "💫", top: "50%",  right: "-14px", mt: "-12px" },
                ].map(({ e, ...pos }, i) => (
                  <span
                    key={i}
                    className="absolute text-xl select-none pointer-events-none spark-pulse"
                    style={{ ...pos, animationDelay: `${i * 0.4}s` }}
                  >
                    {e}
                  </span>
                ))}
              </motion.div>

              {/* ── Heading — staggered word reveal (one Framer loop) ── */}
              <div className="mb-5 flex flex-wrap justify-center gap-x-[0.4em] gap-y-1 relative z-10">
                {HEADING_WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    className="gradient-text font-bold leading-tight"
                    style={{
                      fontFamily: "'Shantell Sans', cursive",
                      fontSize: "clamp(1.7rem, 4.5vw, 2.8rem)",
                      letterSpacing: "-0.01em",
                    }}
                    initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.55, type: "spring", damping: 14 }}
                  >
                    {word}
                  </motion.span>
                ))}
                {/* Rose after heading */}
                <motion.span
                  className="text-3xl"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + HEADING_WORDS.length * 0.08 + 0.1, type: "spring", stiffness: 300, damping: 14 }}
                >
                  🌹
                </motion.span>
              </div>

              {/* ── Subtitle ── */}
              <motion.p
                className="text-base md:text-lg font-light text-center mb-10 relative z-10 max-w-md"
                style={{ color: "rgba(255,255,255,0.62)", lineHeight: "1.75" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
              >
                I've been holding this in for a while now... today I finally have the courage to say it.
              </motion.p>

              {/* ── Animated divider ── */}
              <motion.div
                className="mb-10 relative z-10 flex flex-col items-center gap-2"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
              >
                <div className="h-px w-32 rounded-full" style={{
                  background: "linear-gradient(90deg, transparent, rgba(225,29,72,0.55), rgba(168,85,247,0.55), transparent)",
                }} />
                <div className="h-px w-20 rounded-full" style={{
                  background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.35), transparent)",
                }} />
              </motion.div>

              {/* ── CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 18, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 14 }}
                className="relative z-10"
              >
                <PremiumButton onClick={onNext}>
                  I'm ready to listen... 💕
                </PremiumButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
