"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { celebrationFireworks } from "./lib/fireworks"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const PROMISES = [
  { icon: "🛡️", text: "I will always protect you" },
  { icon: "😂", text: "I will make you laugh every day" },
  { icon: "🌹", text: "I will never stop choosing you" },
  { icon: "🤝", text: "I will always be your safe place" },
]

export default function CelebrationScreen({ onNext }) {

  useEffect(() => {
    celebrationFireworks()
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={35} extraBright={true} />

      <motion.div
        className="glass-card relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center p-8 md:p-12 rounded-[40px] overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.88 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 90, damping: 20 }}
      >
        {/* Corner glows */}
        <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.14)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.12)", filter: "blur(60px)" }} />

        {/* GIF */}
        <motion.div
          className="mb-6 relative flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Burst rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 6, height: 60,
                background: "linear-gradient(to top, rgba(225,29,72,0.5), transparent)",
                transform: `rotate(${i * 45}deg)`,
                transformOrigin: "50% 100%",
                bottom: "50%",
                left: "calc(50% - 3px)",
              }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1.1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}

          <div style={{
            width: 180, height: 180, borderRadius: "50%",
            background: "linear-gradient(135deg, #e11d48, #ec4899, #a855f7, #e11d48)",
            backgroundSize: "300% 300%",
            animation: "gradientShift 3s ease infinite",
            padding: 4,
            boxShadow: "0 0 60px rgba(225,29,72,0.5), 0 0 120px rgba(225,29,72,0.2)",
          }}>
            <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#0d0008" }}>
              <img src="/templates/proposal-cook/gif/celebrate.gif" alt="Celebrating" className="w-full h-full object-cover rounded-full" loading="lazy" />
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="gradient-text text-4xl md:text-6xl font-bold text-center leading-tight mb-3"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Jana Said YES! 🎉
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl font-light italic text-center mb-8"
          style={{ color: "rgba(255,255,255,0.7)" }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          You just made me the happiest person in the world 🥺
        </motion.p>

        {/* Promises grid */}
        <motion.div
          className="w-full grid grid-cols-2 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          {PROMISES.map((p, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(244,114,182,0.2)" }}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1, type: "spring", stiffness: 150 }}
            >
              <span className="text-2xl">{p.icon}</span>
              <p className="text-white/75 text-xs md:text-sm font-medium leading-snug" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                {p.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-sm text-center mb-8 italic"
          style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          This is only the beginning of our forever, Jana 💕
        </motion.p>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.8, type: "spring", stiffness: 180 }}>
          <PremiumButton onClick={onNext}>
            Continue Our Journey 💕
          </PremiumButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
