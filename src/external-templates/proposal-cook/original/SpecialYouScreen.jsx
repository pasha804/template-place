"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const SLIDES = [
  {
    gif: "/templates/proposal-cook/gif/13.gif",
    title: "Jana, you are one of a kind.",
    sub: "In a world full of people, you stand out in a way that no one else ever could. 🌹",
  },
  {
    gif: "/templates/proposal-cook/gif/heppi.gif",
    title: "You make every moment worth it.",
    sub: "The way you smile, the way you laugh — I'd do anything to see it forever. 💕",
  },
  {
    gif: "/templates/proposal-cook/gif/cute.gif",
    title: "You'll always be the love of my life.",
    sub: "Today, tomorrow, and every single day after forever... 🥺",
  },
]

export default function SpecialYouScreen({ onNext }) {
  const [slide, setSlide] = useState(0)
  const isLast = slide === SLIDES.length - 1

  const current = SLIDES[slide]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={30} extraBright={true} />

      <motion.div
        className="glass-card relative z-30 w-full max-w-xl mx-auto flex flex-col items-center p-8 md:p-12 rounded-[40px] overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      >
        {/* Glows */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.14)", filter: "blur(55px)" }} />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.12)", filter: "blur(55px)" }} />

        {/* Slide dots */}
        <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
          {SLIDES.map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full cursor-pointer"
              animate={{ width: i === slide ? 24 : 8, background: i === slide ? "#e11d48" : "rgba(255,255,255,0.2)" }}
              style={{ height: 8 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className="flex flex-col items-center text-center relative z-10 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.45, type: "spring", stiffness: 160, damping: 22 }}
          >
            {/* GIF */}
            <motion.div
              className="mb-7 flex items-center justify-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            >
              {/* Pulse rings */}
              {[230, 200].map((s, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full pointer-events-none"
                  style={{ width: s, height: s, border: `1.5px solid rgba(225,29,72,${0.25 - i * 0.1})` }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2.5 + i, repeat: Infinity, delay: i * 0.6 }}
                />
              ))}

              <div style={{
                width: 175, height: 175, borderRadius: "50%",
                background: "linear-gradient(135deg, #e11d48, #ec4899, #a855f7, #fbbf24, #e11d48)",
                backgroundSize: "300% 300%",
                animation: "gradientShift 4s ease infinite",
                padding: 4,
                boxShadow: "0 0 50px rgba(225,29,72,0.4), 0 0 100px rgba(225,29,72,0.15)",
              }}>
                <div className="w-full h-full rounded-full overflow-hidden" style={{ background: "#0d0008" }}>
                  <img src={current.gif} alt="Special" className="w-full h-full object-cover rounded-full" loading="lazy" />
                </div>
              </div>

              {/* Orbiting sparks */}
              {["💖", "🌹", "✨", "💫"].map((e, i) => {
                const angle = (i / 4) * 2 * Math.PI
                const r = 106
                return (
                  <motion.div
                    key={i}
                    className="absolute text-base select-none pointer-events-none"
                    style={{ left: `calc(50% + ${r * Math.cos(angle) - 10}px)`, top: `calc(50% + ${r * Math.sin(angle) - 10}px)` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                  >
                    {e}
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Text */}
            <h2 className="gradient-text text-3xl md:text-4xl font-bold leading-tight mb-3"
              style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}>
              {current.title}
            </h2>
            <p className="text-white/65 text-base md:text-lg leading-relaxed mb-8">
              {current.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 relative z-10">
          {!isLast ? (
            <>
              <button
                onClick={() => setSlide((s) => Math.max(0, s - 1))}
                disabled={slide === 0}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 disabled:opacity-20"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                ←
              </button>
              <PremiumButton onClick={() => setSlide((s) => s + 1)}>
                Next 💕
              </PremiumButton>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <PremiumButton onClick={onNext}>
                To the final moment... 💕
              </PremiumButton>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
