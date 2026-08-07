"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Heart } from "lucide-react"

// ── GIF data — fallback ─────────────────────
const DEFAULT_GIF_CARDS = [
  {
    id: 1,
    src: "/templates/birthday-aurora/gifs/back-hug.gif",
    title: "A Hug From Behind",
    caption: "This is me, every single day, wishing I could just give you this hug. 🫂",
    color: "from-rose-500/20 to-pink-600/20",
    border: "rgba(244,63,94,0.35)",
    glow: "rgba(244,63,94,0.25)",
    emoji: "🫂",
  },
  {
    id: 2,
    src: "/templates/birthday-aurora/gifs/hug.gif",
    title: "The Warmest Hug",
    caption: "You deserve all the warmth in the world. Sending you this one with everything I have. 💗",
    color: "from-fuchsia-500/20 to-purple-600/20",
    border: "rgba(217,70,239,0.35)",
    glow: "rgba(217,70,239,0.25)",
    emoji: "💗",
  },
  {
    id: 3,
    src: "/templates/birthday-aurora/gifs/cute.gif",
    title: "That's You, Always",
    caption: "This is literally you — just being your adorable self without even trying. 🌸",
    color: "from-pink-400/20 to-rose-500/20",
    border: "rgba(251,113,133,0.35)",
    glow: "rgba(251,113,133,0.25)",
    emoji: "🌸",
  },
  {
    id: 4,
    src: "/templates/birthday-aurora/gifs/please.gif",
    title: "My Wish For You",
    caption: "Please, please, please just know how much you are loved today. 🙏✨",
    color: "from-violet-500/20 to-indigo-600/20",
    border: "rgba(167,139,250,0.35)",
    glow: "rgba(167,139,250,0.25)",
    emoji: "🙏",
  },
  {
    id: 5,
    src: "/templates/birthday-aurora/gifs/heppi.gif",
    title: "Happy Happy Happy!",
    caption: "This is my whole energy today — ALL the happiness, just for you! 🎊",
    color: "from-yellow-400/20 to-orange-500/20",
    border: "rgba(251,191,36,0.35)",
    glow: "rgba(251,191,36,0.25)",
    emoji: "🎊",
  },
  {
    id: 6,
    src: "/templates/birthday-aurora/gifs/celebrate.gif",
    title: "Let's Celebrate YOU",
    caption: "The universe is literally throwing a party for your existence right now. 🎉",
    color: "from-emerald-500/20 to-teal-600/20",
    border: "rgba(52,211,153,0.35)",
    glow: "rgba(52,211,153,0.25)",
    emoji: "🎉",
  },
]

function GifCard({ card, index }) {
  const [liked, setLiked] = useState(false)
  const BASE_COUNTS = [24, 37, 18, 42, 29, 33]
  const [likeCount, setLikeCount] = useState(BASE_COUNTS[index % BASE_COUNTS.length])

  const handleLike = useCallback(() => {
    if (liked) return
    if (navigator.vibrate) navigator.vibrate(20)
    setLiked(true)
    setLikeCount(c => c + 1)
  }, [liked])

  return (
    <motion.div
      className="relative rounded-3xl overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.1 + index * 0.12,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        border: `1px solid ${card.border || "rgba(217,70,239,0.35)"}`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${card.glow || "rgba(217,70,239,0.25)"}`,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Card Header */}
      <div className="p-4 pb-2 flex items-center gap-3">
        <span className="text-2xl">{card.emoji || "💖"}</span>
        <h3 className="font-heading text-lg font-bold text-white/90">
          {card.title}
        </h3>
      </div>

      {/* GIF Container */}
      <div className="relative w-full aspect-video bg-black/40 overflow-hidden my-1">
        <img
          src={card.src || DEFAULT_GIF_CARDS[index % DEFAULT_GIF_CARDS.length].src}
          alt={card.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Caption & Footer */}
      <div className="p-4 pt-2 flex flex-col flex-1 justify-between gap-3">
        <p className="text-white/70 text-sm leading-relaxed font-cute">
          {card.caption}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <motion.button
            onClick={handleLike}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              background: liked ? "rgba(225,29,72,0.2)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${liked ? "rgba(225,29,72,0.4)" : "rgba(255,255,255,0.1)"}`,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={liked ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className="w-4 h-4"
                style={{
                  color: liked ? "#e11d48" : "rgba(255,255,255,0.4)",
                  fill: liked ? "#e11d48" : "none",
                }}
              />
            </motion.div>
            <span style={{ color: liked ? "#fda4af" : "rgba(255,255,255,0.4)" }}>
              {likeCount}
            </span>
          </motion.button>

          <motion.span
            className="text-white/20 text-xs"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          >
            just for you ✨
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default function GifVibes({ onNext, title, subtitle, cards }) {
  const cardList = cards && cards.length > 0 ? cards : DEFAULT_GIF_CARDS

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 pb-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      key="gifvibes"
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
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🫂
        </motion.div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-2">
          {title || "Sending You Love"}
        </h1>
        <p className="text-white/50 text-base max-w-sm mx-auto">
          {subtitle || "Can't be there in person, so here's everything I'd say if I could 💌"}
        </p>
      </motion.div>

      {/* Grid of GIF cards */}
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cardList.map((card, i) => (
          <GifCard key={card.id || i} card={card} index={i} />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        className="glass px-6 py-4 rounded-2xl text-center max-w-md mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
        style={{ boxShadow: "0 0 30px rgba(217,70,239,0.1)" }}
      >
        <p className="text-white/50 text-sm font-cute leading-relaxed">
          Every single one of these is real 💕 <br />
          This is all the love I have — and it's all yours.
        </p>
      </motion.div>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200, damping: 15 }}
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
            There's More
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
