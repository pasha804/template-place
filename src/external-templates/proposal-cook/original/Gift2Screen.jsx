"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const ROSES = ["🌹","🌹","🌹","🌹","🌹","🌹","🌹","🌹","🌹","🌹","🌹","🌹"]

const MESSAGES = [
  "For your smile that lights up every room 🌟",
  "For the way you carry yourself with grace 💃",
  "For being 18 and already so wise & beautiful 👑",
  "For your laugh — my absolute favorite sound 🎵",
  "For making me feel things I've never felt before 💫",
  "For existing in this world and crossing my path 🌍",
  "For the warmth you carry without even knowing 🔥",
  "For your eyes that say a thousand things silently 👁️",
  "For being both strong and soft at the same time 💪🤍",
  "For every moment I get to be near you 🥺",
  "For being you — exactly as you are, perfectly 💕",
  "This last rose is for every reason I haven't said yet... 🌹",
]

export default function Gift2Screen({ onBack }) {
  const [bloomed, setBloomed] = useState(0)
  const [started, setStarted] = useState(false)
  const [showMsg, setShowMsg] = useState(null)   // index of message to show
  const [allDone, setAllDone] = useState(false)

  // Auto-bloom roses one by one after starting
  useEffect(() => {
    if (!started) return
    if (bloomed >= ROSES.length) {
      setTimeout(() => setAllDone(true), 600)
      return
    }
    const t = setTimeout(() => setBloomed((b) => b + 1), 350)
    return () => clearTimeout(t)
  }, [started, bloomed])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={14} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="gradient-text text-3xl md:text-5xl font-bold" style={{ fontFamily: "'Shantell Sans', cursive" }}>
            A Bouquet For Jana 🌹
          </h1>
          <p className="mt-2 text-white/40 text-sm italic">
            12 roses — each one has a secret meaning
          </p>
        </motion.div>

        {/* Rose grid */}
        <motion.div
          className="glass-card rounded-[32px] p-6 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
        >
          {/* Corner glow */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.12)", filter: "blur(40px)" }} />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.1)", filter: "blur(40px)" }} />

          {!started ? (
            /* ── Pre-start ── */
            <motion.div
              className="flex flex-col items-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                💐
              </motion.div>
              <p className="text-white/80 text-lg mb-2 font-semibold" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                I picked each rose for you, Jana.
              </p>
              <p className="text-white/40 text-sm mb-8 text-center max-w-xs">
                Tap each rose after they bloom to read what it means 🌹
              </p>
              <PremiumButton onClick={() => setStarted(true)}>
                Bloom the Bouquet 🌹
              </PremiumButton>
            </motion.div>
          ) : (
            /* ── Bloomed grid ── */
            <div>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-4 mb-8">
                {ROSES.map((rose, i) => (
                  <AnimatePresence key={i}>
                    {i < bloomed && (
                      <motion.button
                        key={`rose-${i}`}
                        onClick={() => setShowMsg(i)}
                        className="relative flex items-center justify-center rounded-2xl aspect-square cursor-pointer"
                        style={{
                          background: showMsg === i
                            ? "linear-gradient(135deg, rgba(225,29,72,0.45), rgba(168,85,247,0.35))"
                            : "rgba(255,255,255,0.05)",
                          border: showMsg === i
                            ? "1.5px solid rgba(244,114,182,0.6)"
                            : "1.5px solid rgba(255,255,255,0.08)",
                          boxShadow: showMsg === i ? "0 0 18px rgba(225,29,72,0.3)" : "none",
                        }}
                        initial={{ scale: 0, rotate: -180, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0 }}
                        whileHover={{ scale: 1.12, rotate: [0, 5, -5, 0] }}
                        whileTap={{ scale: 0.92 }}
                      >
                        <span className="text-3xl md:text-4xl select-none" style={{ filter: "drop-shadow(0 0 8px rgba(225,29,72,0.6))" }}>
                          {rose}
                        </span>
                        {/* Number badge */}
                        <span
                          className="absolute -top-1 -right-1 text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                          style={{ background: "rgba(225,29,72,0.7)", color: "white" }}
                        >
                          {i + 1}
                        </span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                ))}

                {/* Loading placeholder roses */}
                {bloomed < ROSES.length && Array.from({ length: ROSES.length - bloomed }).map((_, i) => (
                  <div
                    key={`ph-${i}`}
                    className="rounded-2xl aspect-square"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1.5px solid rgba(255,255,255,0.04)" }}
                  />
                ))}
              </div>

              {/* Message panel */}
              <AnimatePresence mode="wait">
                {showMsg !== null && (
                  <motion.div
                    key={showMsg}
                    className="rounded-2xl px-5 py-4 text-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(225,29,72,0.15), rgba(168,85,247,0.12))",
                      border: "1px solid rgba(244,114,182,0.25)",
                    }}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-xs text-white/40 mb-1 uppercase tracking-widest">Rose {showMsg + 1}</p>
                    <p className="text-white/90 font-semibold text-sm md:text-base" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                      {MESSAGES[showMsg]}
                    </p>
                  </motion.div>
                )}
                {showMsg === null && bloomed === ROSES.length && (
                  <motion.p
                    key="tap-hint"
                    className="text-center text-white/35 text-sm italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Tap any rose to read its meaning 🌹
                  </motion.p>
                )}
              </AnimatePresence>

              {/* All done message */}
              {allDone && (
                <motion.div
                  className="mt-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white/70 text-base mb-1" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                    All 12 roses — all for you, Jana. 🌹
                  </p>
                  <p className="text-white/40 text-sm italic mb-6">
                    Every single one picked with love 💕
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Back */}
        <motion.div
          className="mt-7 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <PremiumButton onClick={onBack} variant="secondary">
            ← Back to Gifts
          </PremiumButton>
        </motion.div>
      </div>
    </motion.div>
  )
}
