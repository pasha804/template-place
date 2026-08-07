"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function FirstScreen({ onNext }) {
  const title = "I've been thinking about us..."
  const words = title.split(" ")

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <PremiumBackground particleCount={30} />

      {/* ── Foreground Floating Hearts ── */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`fg-heart-${i}`}
            className="absolute text-2xl select-none"
            style={{
              left: `${15 + (i * 11) % 70}%`,
              bottom: "-10%",
              opacity: 0.15 + (i % 3) * 0.1,
              filter: "blur(1px) drop-shadow(0 0 15px rgba(236,72,153,0.5))",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              rotate: [0, i % 2 === 0 ? 360 : -360],
              scale: [1, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + (i % 5) * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: i * 1.5,
            }}
          >
            {i % 2 === 0 ? "💖" : "✨"}
          </motion.div>
        ))}
      </div>

      {/* ── Main Glass Card ── */}
      <motion.div
        className="glass-card relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Subtle inner glow for the card */}
        <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

        {/* ── "Hey you..." line ── */}
        <motion.p
          className="text-xl md:text-2xl mb-8 font-light italic relative z-10"
          style={{ color: "rgba(255,255,255,0.7)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          Hey you...
        </motion.p>

        {/* ── Circular frame with GIF ── */}
        <motion.div
          className="mb-10 flex items-center justify-center relative z-10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring", stiffness: 150, damping: 15 }}
        >
          {/* Outer glowing aura layer 1 */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 260,
              height: 260,
              background: "radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Outer glowing aura layer 2 */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 220,
              height: 220,
              background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.6, 1, 0.6], rotate: [0, 90, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Animated gradient border ring */}
          <div
            className="relative flex items-center justify-center shadow-2xl"
            style={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #f472b6)",
              backgroundSize: "300% 300%",
              animation: "gradientShift 4s ease infinite, pulseGlow 2.5s ease-in-out infinite",
              padding: 5,
            }}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative z-10"
              style={{ background: "#0f0f23", boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)" }}
            >
              <motion.img
                src="/templates/proposal-romantic/gif/cute.gif"
                alt="Cute animation"
                className="w-40 h-40 object-cover rounded-full"
                fetchPriority="high"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Main heading (Word-by-word reveal) ── */}
        <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2 relative z-10">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="gradient-text text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 2.2 + i * 0.15, duration: 0.6, type: "spring", damping: 12 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* ── Subtitle ── */}
        <motion.p
          className="text-xl md:text-2xl mb-12 font-light text-center relative z-10"
          style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        >
          And I have something important to ask you...
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0, duration: 0.8 }}
        >
          <PremiumButton onClick={onNext}>
            I'm Listening... 💕
          </PremiumButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
