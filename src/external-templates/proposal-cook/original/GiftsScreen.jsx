"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

export default function GiftsScreen({ onGiftClick, onContinue }) {

  const gifts = [
    {
      id: 1,
      icon: "💌",
      label: "Love Quiz",
      desc: "Answer some cute questions~",
      color: "from-pink-500/30 to-rose-600/30",
      border: "rgba(244,114,182,0.4)",
      glow: "rgba(244,114,182,0.3)",
      ribbon: "#f472b6",
      tag: "Interactive 💕",
    },
    {
      id: 2,
      icon: "🌹",
      label: "Rose Bouquet",
      desc: "A bloom just for you",
      color: "from-rose-600/30 to-red-700/30",
      border: "rgba(225,29,72,0.4)",
      glow: "rgba(225,29,72,0.3)",
      ribbon: "#e11d48",
      tag: "Romantic 🌹",
    },
    {
      id: 3,
      icon: "✨",
      label: "Scratch & Reveal",
      desc: "Why I love you — revealed",
      color: "from-purple-600/30 to-pink-600/30",
      border: "rgba(168,85,247,0.4)",
      glow: "rgba(168,85,247,0.3)",
      ribbon: "#a855f7",
      tag: "Special 💖",
    },
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <PremiumBackground particleCount={20} />

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {["🌹","💖","✨","🌹","💕","🌸"].map((e, i) => (
          <motion.div
            key={i}
            className="absolute select-none"
            style={{ left: `${10 + i * 16}%`, bottom: "-10%", fontSize: "1.4rem", opacity: 0.18 }}
            animate={{ y: ["0vh", "-120vh"], rotate: [0, i % 2 === 0 ? 360 : -360] }}
            transition={{ duration: 14 + i * 2, repeat: Infinity, ease: "linear", delay: i * 1.8 }}
          >
            {e}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="glass-card relative z-30 w-full max-w-3xl mx-auto flex flex-col items-center p-8 md:p-12 rounded-[40px]"
        initial={{ y: 60, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 90, damping: 20 }}
      >
        <div className="absolute inset-0 rounded-[40px] pointer-events-none" style={{ boxShadow: "inset 0 0 50px rgba(180,0,90,0.08)" }} />

        {/* Heading */}
        <motion.div className="text-center mb-2 relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <p className="text-4xl mb-2">🎁</p>
          <h1 className="gradient-text text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Shantell Sans', cursive" }}>
            Jana's Surprise Gifts
          </h1>
          <p className="mt-3 text-sm md:text-base font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
            Three little gifts, all wrapped with love — tap to open 💝
          </p>
        </motion.div>

        {/* Gift Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 mb-10">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              onClick={() => onGiftClick && onGiftClick(gift.id)}
              className={`relative flex flex-col items-center cursor-pointer rounded-3xl overflow-hidden bg-gradient-to-br ${gift.color}`}
              style={{
                border: `1.5px solid ${gift.border}`,
                boxShadow: `0 0 0 rgba(0,0,0,0), 0 10px 40px rgba(0,0,0,0.4)`,
                minHeight: 220,
              }}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.18, duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
              whileHover={{
                y: -8,
                scale: 1.04,
                boxShadow: `0 0 35px ${gift.glow}, 0 12px 50px rgba(0,0,0,0.5)`,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Ribbon top stripe */}
              <div className="w-full h-2" style={{ background: gift.ribbon, opacity: 0.9 }} />

              {/* Ribbon vertical */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 pointer-events-none" style={{ background: gift.ribbon, opacity: 0.25 }} />

              {/* Ribbon bow */}
              <motion.div
                className="absolute top-1 text-2xl select-none"
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
                style={{ filter: `drop-shadow(0 0 8px ${gift.ribbon})` }}
              >
                🎀
              </motion.div>

              {/* Tag */}
              <div
                className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.35)", color: "rgba(255,255,255,0.7)", border: `1px solid ${gift.border}` }}
              >
                {gift.tag}
              </div>

              {/* Main icon */}
              <motion.div
                className="mt-10 mb-3 text-5xl select-none relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                style={{ filter: `drop-shadow(0 0 12px ${gift.ribbon})` }}
              >
                {gift.icon}
              </motion.div>

              {/* Label */}
              <p className="text-white font-bold text-base mb-1 relative z-10 px-4 text-center" style={{ fontFamily: "'Shantell Sans', cursive" }}>
                {gift.label}
              </p>
              <p className="text-white/50 text-xs mb-5 relative z-10 px-4 text-center">{gift.desc}</p>

              {/* Shimmer */}
              <span className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)", backgroundSize: "200% 100%", animation: "shimmer 3s infinite" }} />
            </motion.div>
          ))}
        </div>

        {/* Continue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          <PremiumButton onClick={onContinue}>
            Skip to the main moment 💕
          </PremiumButton>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
