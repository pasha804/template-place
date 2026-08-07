"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function HeyBeautifulScreen({ onOpenHeart }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={22} />

      <div className="text-center relative z-10">

        {/* ── Circular GIF frame ── */}
        <motion.div
          className="mb-8 flex items-center justify-center relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Gradient border ring */}
          <div
            style={{
              width: 210,
              height: 210,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #f472b6)",
              backgroundSize: "300% 300%",
              animation: "gradientShift 4s ease infinite",
              padding: 4,
              boxShadow: "0 0 40px rgba(236,72,153,0.5)",
            }}
          >
            <div
              className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
              style={{ background: "#0f0f23" }}
            >
              <img
                src="/templates/proposal-romantic/gif/cute.gif"
                alt="Cute Bear"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Floating heart */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-3 -right-2 text-3xl"
          >
            💖
          </motion.div>
        </motion.div>

        {/* ── Title ── */}
        <motion.h1
          className="gradient-text text-5xl md:text-7xl font-bold mb-4"
          style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          My Love 💕
        </motion.h1>

        {/* ── Subtitle ── */}
        <motion.p
          className="text-xl md:text-2xl mb-12 font-light"
          style={{ color: "rgba(255,255,255,0.85)" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Do you even realize how perfect you are for me?
        </motion.p>

        {/* ── Action button ── */}
        <PremiumButton onClick={onOpenHeart} delay={0.8}>
          See What's In My Heart 💖
        </PremiumButton>
      </div>
    </motion.div>
  )
}
