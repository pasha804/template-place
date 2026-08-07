"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// ── Numbered GIFs — used as "moods / moments" reel ─────────────
const REEL = [
  { src: "/templates/birthday-aurora/gifs/2.gif",  mood: "When you're just too cute", emoji: "🥺" },
  { src: "/templates/birthday-aurora/gifs/3.gif",  mood: "You, being effortlessly amazing", emoji: "✨" },
  { src: "/templates/birthday-aurora/gifs/6.gif",  mood: "When you smile at nothing", emoji: "😊" },
  { src: "/templates/birthday-aurora/gifs/8.gif",  mood: "Pure happiness energy", emoji: "💛" },
  { src: "/templates/birthday-aurora/gifs/9.gif",  mood: "Magic in your eyes", emoji: "🌟" },
  { src: "/templates/birthday-aurora/gifs/11.gif", mood: "Sending all my love", emoji: "💕" },
  { src: "/templates/birthday-aurora/gifs/12.gif", mood: "When you laugh out loud", emoji: "😂" },
  { src: "/templates/birthday-aurora/gifs/18.gif", mood: "Thinking of you always", emoji: "🌸" },
  { src: "/templates/birthday-aurora/gifs/19.gif", mood: "You brighten every room", emoji: "☀️" },
  { src: "/templates/birthday-aurora/gifs/22.gif", mood: "You are just everything", emoji: "🫶" },
  { src: "/templates/birthday-aurora/gifs/29.gif", mood: "The best person I know", emoji: "👑" },
]

export default function GifReel({ onNext }) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    if (!autoplay) return
    timerRef.current = setTimeout(() => {
      setDirection(1)
      setActive(a => (a + 1) % REEL.length)
    }, 3200)
    return () => clearTimeout(timerRef.current)
  }, [active, autoplay])

  const go = (dir) => {
    if (navigator.vibrate) navigator.vibrate(15)
    setAutoplay(false)
    setDirection(dir)
    setActive(a => (a + dir + REEL.length) % REEL.length)
  }

  const current = REEL[active]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 pb-10 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      key="gifreel"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🎬
        </motion.div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-2">
          You, In Every Mood
        </h1>
        <p className="text-white/50 text-sm md:text-base">
          A little reel of feelings — all inspired by you 💫
        </p>
      </motion.div>

      {/* Main reel viewer */}
      <div className="relative w-full max-w-sm mx-auto mb-6">

        {/* GIF card */}
        <div className="relative" style={{ perspective: "800px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80, rotateY: direction * 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -80, rotateY: direction * -15 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 40px rgba(217,70,239,0.15), 0 20px 60px rgba(0,0,0,0.5)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* GIF */}
              <div style={{ aspectRatio: "1/1" }} className="relative overflow-hidden">
                <img
                  src={current.src}
                  alt={current.mood}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  background: "linear-gradient(to bottom, transparent 55%, rgba(10,10,15,0.9) 100%)"
                }} />
                {/* Emoji badge */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                >
                  {current.emoji}
                </motion.div>
                {/* Counter */}
                <div className="absolute top-4 left-4 glass px-2 py-1 rounded-full">
                  <span className="text-white/60 text-xs tabular-nums">
                    {String(active + 1).padStart(2, "0")} / {String(REEL.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 text-center">
                <motion.p
                  key={`mood-${active}`}
                  className="font-heading text-white text-xl font-bold mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                >
                  {current.mood}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 glass w-10 h-10 rounded-full flex items-center justify-center z-10 min-w-[40px] min-h-[40px]"
          aria-label="Previous"
          style={{ boxShadow: "0 0 15px rgba(0,0,0,0.4)" }}
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 glass w-10 h-10 rounded-full flex items-center justify-center z-10 min-w-[40px] min-h-[40px]"
          aria-label="Next"
          style={{ boxShadow: "0 0 15px rgba(0,0,0,0.4)" }}
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-1.5 mb-8 flex-wrap justify-center max-w-xs">
        {REEL.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => { setAutoplay(false); setDirection(i > active ? 1 : -1); setActive(i) }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active
                ? "linear-gradient(135deg,#e11d48,#d946ef)"
                : i < active
                ? "rgba(253,164,175,0.4)"
                : "rgba(255,255,255,0.15)",
              boxShadow: i === active ? "0 0 8px rgba(217,70,239,0.5)" : "none",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Autoplay hint */}
      {autoplay && (
        <motion.p
          className="text-white/25 text-xs mb-6 -mt-4"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          auto-playing • tap arrows to browse
        </motion.p>
      )}

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
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
            Keep Going
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
