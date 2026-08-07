"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function CelebrationScreen({ onNext }) {

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={40} extraBright={true} />

            {/* ── Foreground Floating Hearts ── */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={`fg-heart-${i}`}
                        className="absolute text-3xl select-none"
                        style={{
                            left: `${10 + (i * 12) % 80}%`,
                            bottom: "-10%",
                            opacity: 0.2 + (i % 3) * 0.1,
                            filter: "blur(1px) drop-shadow(0 0 20px rgba(236,72,153,0.6))",
                        }}
                        animate={{
                            y: ["0vh", "-120vh"],
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                            scale: [1, 1.3, 0.9],
                        }}
                        transition={{
                            duration: 10 + (i % 5) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 1.2,
                        }}
                    >
                        {i % 2 === 0 ? "🎉" : "✨"}
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="glass-card relative z-30 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

                <div className="w-full relative z-10 flex flex-col items-center text-center">

        {/* ── Celebration GIF ── */}
        <motion.div
          className="mb-8 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #f472b6)",
              backgroundSize: "300% 300%",
              animation: "gradientShift 4s ease infinite",
              padding: 4,
              boxShadow: "0 0 60px rgba(236,72,153,0.6)",
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: "#0f0f23" }}
            >
              <img
                src="/templates/proposal-romantic/gif/celebrate.gif"
                alt="Celebrating"
                className="w-40 h-40 object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Pulsing heart icon overlay */}
          <motion.div
            className="absolute"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ bottom: -10, right: "calc(50% - 80px)" }}
          >
            <Heart
              className="w-10 h-10 fill-current"
              style={{ color: "#ec4899", filter: "drop-shadow(0 0 12px rgba(236,72,153,0.8))" }}
            />
          </motion.div>
        </motion.div>

        {/* ── Title ── */}
        <motion.h1
          className="gradient-text text-4xl md:text-6xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          You Made Me The Happiest! 🎉
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          className="text-xl md:text-2xl mb-4 font-light italic"
          style={{ color: "rgba(255,255,255,0.85)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          I promise to always make you smile...
        </motion.p>

        <motion.p
          className="text-base md:text-lg mb-10"
          style={{ color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          This is just the beginning of our forever 💕
        </motion.p>

        {/* ── Button ── */}
        <PremiumButton onClick={onNext} delay={1.8}>
          Continue Our Journey 💕
        </PremiumButton>
                </div>
            </motion.div>
    </motion.div>
  )
}
