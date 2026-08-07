"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function SpecialYouScreen({ onNext }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={30} extraBright={true} />

      <div className="text-center relative z-10">

        {/* ── GIF Container ── */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-12 flex items-center justify-center relative"
        >
          <div
            style={{
              width: 230,
              height: 230,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #fbbf24, #f472b6)",
              backgroundSize: "300% 300%",
              animation: "gradientShift 5s ease infinite",
              padding: 4,
              boxShadow: "0 0 60px rgba(236,72,153,0.4), 0 0 120px rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden"
              style={{ background: "#0f0f23" }}
            >
              <img
                src="/templates/proposal-romantic/gif/13.gif"
                alt="Special You"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Decorative pulsing elements */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-5 top-0 text-3xl"
          >
            💖
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -left-5 bottom-4 text-2xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute -right-3 bottom-10 text-xl"
          >
            🌟
          </motion.div>
        </motion.div>

        {/* ── Main text ── */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="gradient-text text-4xl md:text-6xl font-bold text-center leading-tight mb-4"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
        >
          You'll always be the love of my life. 💕
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xl md:text-2xl font-light italic mb-12"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Today, tomorrow, and forever...
        </motion.p>

        {/* ── Next button ── */}
        {onNext && (
          <PremiumButton onClick={onNext} delay={1.2}>
            Continue 💕
          </PremiumButton>
        )}
      </div>
    </motion.div>
  )
}
