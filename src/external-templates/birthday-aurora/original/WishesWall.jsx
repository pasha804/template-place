"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

// ── Wishes data — with matching GIFs ───────────────────────────
const WISHES = [
  {
    id: 1,
    icon: "🌟",
    title: "I Wish You Joy",
    text: "May every single morning feel like the first day of something beautiful. May you wake up smiling for no reason, and go to sleep with your heart full.",
    gif: "/templates/birthday-aurora/gifs/heppi.gif",
    gifAlt: "Happy dancing",
    color: "from-yellow-500/15 to-amber-600/15",
    accent: "#fbbf24",
    glow: "rgba(251,191,36,0.2)",
  },
  {
    id: 2,
    icon: "💪",
    title: "I Wish You Strength",
    text: "Whenever life gets heavy — and it will, sometimes — I wish you the strength to carry on. You are so much stronger than you know, Madam Jii.",
    gif: "/templates/birthday-aurora/gifs/tears.gif",
    gifAlt: "Emotional moment",
    color: "from-violet-500/15 to-purple-600/15",
    accent: "#d946ef",
    glow: "rgba(217,70,239,0.2)",
  },
  {
    id: 3,
    icon: "🎉",
    title: "I Wish You Celebration",
    text: "Not just today — but every day of the coming year. You deserve to feel celebrated, seen, and appreciated. Always.",
    gif: "/templates/birthday-aurora/gifs/celebrate.gif",
    gifAlt: "Celebrating",
    color: "from-rose-500/15 to-pink-600/15",
    accent: "#e11d48",
    glow: "rgba(225,29,72,0.2)",
  },
  {
    id: 4,
    icon: "🌸",
    title: "I Wish You Peace",
    text: "May all the noise, the worries, the overthinking — just melt away. You deserve a heart that feels light, calm, and at peace with everything.",
    gif: "/templates/birthday-aurora/gifs/cute.gif",
    gifAlt: "Cute peaceful moment",
    color: "from-pink-400/15 to-rose-500/15",
    accent: "#fda4af",
    glow: "rgba(253,164,175,0.2)",
  },
  {
    id: 5,
    icon: "💫",
    title: "I Wish You Magic",
    text: "The kind of magic that makes ordinary moments feel extraordinary. The kind that lives in a song that hits just right, in a perfect cup of something warm, in a smile from a stranger.",
    gif: "/templates/birthday-aurora/gifs/9.gif",
    gifAlt: "Magical moment",
    color: "from-indigo-500/15 to-violet-600/15",
    accent: "#818cf8",
    glow: "rgba(129,140,248,0.2)",
  },
  {
    id: 6,
    icon: "💕",
    title: "I Wish You Love",
    text: "More love than you can hold. The kind that wraps around you like a warm hug and never lets go. Starting with this — right here, right now.",
    gif: "/templates/birthday-aurora/gifs/back-hug.gif",
    gifAlt: "Loving hug",
    color: "from-rose-600/15 to-fuchsia-600/15",
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.2)",
  },
]

// ── Individual wish card (expandable) ──────────────────────────
function WishCard({ wish, index }) {
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    if (navigator.vibrate) navigator.vibrate(20)
    setExpanded(e => !e)
  }

  return (
    <motion.div
      className="rounded-3xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.08 * index,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${wish.accent}40`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 ${expanded ? "30px" : "15px"} ${wish.glow}`,
        backdropFilter: "blur(20px)",
        transition: "box-shadow 0.4s ease",
      }}
      onClick={toggle}
      layout
    >
      {/* Header row */}
      <div className="flex items-center gap-4 p-4 md:p-5">
        {/* Icon bubble */}
        <motion.div
          className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, ${wish.accent}30, ${wish.accent}15)`,
            border: `1px solid ${wish.accent}40`,
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {wish.icon}
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-white font-bold text-xl leading-tight truncate">
            {wish.title}
          </h3>
          <p className="text-white/40 text-xs mt-0.5">
            {expanded ? "Tap to close" : "Tap to open ✨"}
          </p>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <Star
            className="w-5 h-5"
            style={{ color: wish.accent, fill: expanded ? wish.accent : "none" }}
          />
        </motion.div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 md:px-5 flex flex-col md:flex-row gap-4 items-start">
              {/* GIF */}
              <motion.div
                className="rounded-2xl overflow-hidden flex-shrink-0 mx-auto md:mx-0"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                style={{
                  width: "min(160px, 45vw)",
                  height: "min(160px, 45vw)",
                  border: `1px solid ${wish.accent}30`,
                  boxShadow: `0 0 20px ${wish.glow}`,
                }}
              >
                <img
                  src={wish.gif}
                  alt={wish.gifAlt}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Text */}
              <motion.p
                className="font-cute text-white/70 text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                {wish.text}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Firework burst on load ──────────────────────────────────────
function fireWishConfetti() {
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { x: 0.5, y: 0.4 },
    colors: ["#e11d48", "#fda4af", "#d946ef", "#fbbf24", "#818cf8"],
    gravity: 0.6,
    scalar: 0.9,
  })
}

// ── Main WishesWall component ───────────────────────────────────
export default function WishesWall({ onNext, title, wishes: customWishes }) {
  const wishList = customWishes && customWishes.length > 0 ? customWishes : WISHES
  useEffect(() => {
    const t = setTimeout(fireWishConfetti, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 pb-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      key="wishes"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8 w-full"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🌠
        </motion.div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-2">
          My Wishes For You
        </h1>
        <p className="text-white/50 text-sm md:text-base max-w-xs mx-auto">
          Tap each one to open it — they're all just for you 💫
        </p>
      </motion.div>

      {/* Wishes grid */}
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-3 mb-8">
        {wishList.map((wish, i) => (
          <WishCard key={wish.id || i} wish={wish} index={i} />
        ))}
      </div>

      {/* Closing quote */}
      <motion.div
        className="relative glass rounded-3xl px-6 py-5 max-w-md mx-auto text-center mb-8 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
        style={{ boxShadow: "0 0 40px rgba(217,70,239,0.12)" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <Sparkles className="w-6 h-6 text-yellow-300 mx-auto mb-2 opacity-60" />
        <p className="font-cute text-white/60 text-sm leading-relaxed italic">
          "You are not just loved on your birthday —<br />
          you are loved every single day, in ways<br />
          that words can barely hold."
        </p>
        <p className="text-white/30 text-xs mt-2">— forever yours 💕</p>
      </motion.div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.button
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(30)
            onNext()
          }}
          className="relative overflow-hidden rounded-full text-white text-lg font-semibold px-10 py-4 min-h-[52px]"
          style={{
            background: "linear-gradient(135deg, #e11d48, #d946ef, #6366f1)",
            boxShadow: "0 0 30px rgba(217,70,239,0.35), 0 4px 20px rgba(0,0,0,0.3)",
          }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            One Last Thing
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
