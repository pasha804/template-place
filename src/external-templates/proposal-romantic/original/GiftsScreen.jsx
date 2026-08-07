"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function GiftsScreen({ onGiftClick, onContinue }) {

  const gifts = [
    { id: 1, name: "Quiz", icon: "🎁", label: "Gift 1" },
    { id: 2, name: "Letter", icon: "💝", label: "Gift 2" },
    { id: 3, name: "Rose", icon: "🌹", label: "Gift 3" },
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <PremiumBackground particleCount={20} />

            {/* ── Foreground Floating Hearts ── */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={`fg-heart-${i}`}
                        className="absolute text-2xl select-none"
                        style={{
                            left: `${20 + (i * 15) % 60}%`,
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
                            duration: 12 + (i % 5) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 1.5,
                        }}
                    >
                        {i % 2 === 0 ? "💖" : "✨"}
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="glass-card relative z-30 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

                <div className="w-full relative z-10 flex flex-col items-center">

        {/* ── Heading ── */}
        <motion.h1
          className="gradient-text text-4xl md:text-6xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Something for You
        </motion.h1>

        <motion.p
          className="text-base md:text-lg mb-10 font-light"
          style={{ color: "rgba(255,255,255,0.6)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Tap each gift to unwrap a surprise 🎁
        </motion.p>

        {/* ── Gift cards ── */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-12 px-2">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              onClick={() => onGiftClick && onGiftClick(gift.id)}
              className="flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl cursor-pointer relative overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.15, duration: 0.6 }}
              whileHover={{
                y: -6,
                scale: 1.06,
                boxShadow: "0 0 30px rgba(236,72,153,0.35), 0 8px 40px rgba(0,0,0,0.4)",
                borderColor: "rgba(244,114,182,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Shimmer overlay */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 4s infinite",
                }}
              />

              {/* Floating sparkle */}
              <motion.div
                className="absolute -top-1 -right-1 text-xs select-none"
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.3, 0.8] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.4 }}
              >
                ✨
              </motion.div>

              {/* Icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                className="text-4xl md:text-5xl mb-3 relative z-10"
              >
                {gift.icon}
              </motion.div>

              {/* Label */}
              <p
                className="font-semibold text-xs md:text-sm relative z-10"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {gift.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Continue button ── */}
        <PremiumButton onClick={onContinue} delay={1.5}>
          Continue 💕
        </PremiumButton>
                </div>
            </motion.div>
    </motion.div>
  )
}
