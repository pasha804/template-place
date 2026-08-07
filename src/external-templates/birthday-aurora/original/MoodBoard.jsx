"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, X, Heart } from "lucide-react"
import confetti from "canvas-confetti"

// ── Every single GIF with a heartfelt tag ──────────────────────
const TILES = [
  { src: "/templates/birthday-aurora/gifs/hug.gif",       tag: "your warmth 🤍",        span: "col-span-2 row-span-2", accent: "#e11d48" },
  { src: "/templates/birthday-aurora/gifs/2.gif",         tag: "too cute 🥺",            span: "col-span-1 row-span-1", accent: "#fda4af" },
  { src: "/templates/birthday-aurora/gifs/cute.gif",      tag: "just you 🌸",            span: "col-span-1 row-span-2", accent: "#d946ef" },
  { src: "/templates/birthday-aurora/gifs/3.gif",         tag: "effortless ✨",          span: "col-span-1 row-span-1", accent: "#fbbf24" },
  { src: "/templates/birthday-aurora/gifs/heppi.gif",     tag: "your joy 🎊",            span: "col-span-1 row-span-1", accent: "#fbbf24" },
  { src: "/templates/birthday-aurora/gifs/6.gif",         tag: "that smile 😊",          span: "col-span-1 row-span-1", accent: "#fda4af" },
  { src: "/templates/birthday-aurora/gifs/back-hug.gif",  tag: "always 🫂",              span: "col-span-2 row-span-2", accent: "#d946ef" },
  { src: "/templates/birthday-aurora/gifs/8.gif",         tag: "pure energy 💛",         span: "col-span-1 row-span-1", accent: "#fbbf24" },
  { src: "/templates/birthday-aurora/gifs/please.gif",    tag: "so sweet 🙏",            span: "col-span-1 row-span-1", accent: "#a78bfa" },
  { src: "/templates/birthday-aurora/gifs/9.gif",         tag: "magic eyes 🌟",          span: "col-span-1 row-span-1", accent: "#818cf8" },
  { src: "/templates/birthday-aurora/gifs/tears.gif",     tag: "even tears 💧",          span: "col-span-1 row-span-1", accent: "#60a5fa" },
  { src: "/templates/birthday-aurora/gifs/11.gif",        tag: "sending love 💕",        span: "col-span-1 row-span-1", accent: "#e11d48" },
  { src: "/templates/birthday-aurora/gifs/celebrate.gif", tag: "celebrate you 🎉",       span: "col-span-2 row-span-1", accent: "#34d399" },
  { src: "/templates/birthday-aurora/gifs/12.gif",        tag: "that laugh 😂",          span: "col-span-1 row-span-1", accent: "#fbbf24" },
  { src: "/templates/birthday-aurora/gifs/18.gif",        tag: "thinking of you 🌸",     span: "col-span-1 row-span-1", accent: "#f9a8d4" },
  { src: "/templates/birthday-aurora/gifs/19.gif",        tag: "sunshine ☀️",            span: "col-span-1 row-span-1", accent: "#fbbf24" },
  { src: "/templates/birthday-aurora/gifs/22.gif",        tag: "everything 🫶",          span: "col-span-1 row-span-1", accent: "#e11d48" },
  { src: "/templates/birthday-aurora/gifs/29.gif",        tag: "the best 👑",            span: "col-span-2 row-span-2", accent: "#fbbf24" },
]

// ── Lightbox ───────────────────────────────────────────────────
function Lightbox({ tile, onClose }) {
  return (
    <AnimatePresence>
      {tile && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" />
          <motion.button
            className="absolute top-4 right-4 z-10 glass w-11 h-11 rounded-full flex items-center justify-center"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ scale: 0.6, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                maxWidth: "min(400px, 85vw)",
                maxHeight: "70vh",
                border: `2px solid ${tile.accent}60`,
                boxShadow: `0 0 60px ${tile.accent}40, 0 20px 60px rgba(0,0,0,0.7)`,
              }}
            >
              <img
                src={tile.src}
                alt={tile.tag}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
            <motion.p
              className="font-cute text-white/70 text-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {tile.tag}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Mosaic tile ────────────────────────────────────────────────
function MosaicTile({ tile, index, onTap }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl cursor-pointer ${tile.span}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(15)
        onTap(tile)
      }}
      whileTap={{ scale: 0.95 }}
      style={{
        border: `1px solid ${tile.accent}30`,
        boxShadow: hovered
          ? `0 0 25px ${tile.accent}50, 0 8px 24px rgba(0,0,0,0.5)`
          : `0 4px 16px rgba(0,0,0,0.4)`,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* GIF */}
      <img
        src={tile.src}
        alt={tile.tag}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ display: "block", minHeight: "80px" }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-end p-2"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(to top, ${tile.accent}cc 0%, transparent 60%)`,
        }}
      >
        <span className="text-white text-xs font-cute font-bold leading-tight drop-shadow-lg">
          {tile.tag}
        </span>
      </motion.div>

      {/* Always-visible subtle bottom tag */}
      <div
        className="absolute bottom-0 inset-x-0 p-1.5"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          opacity: hovered ? 0 : 0.8,
          transition: "opacity 0.2s ease",
        }}
      >
        <span className="text-white/60 text-[10px] font-cute">{tile.tag}</span>
      </div>
    </motion.div>
  )
}

// ── Main MoodBoard ─────────────────────────────────────────────
export default function MoodBoard({ onNext }) {
  const [activeTile, setActiveTile] = useState(null)

  useEffect(() => {
    // Soft confetti drift on entry
    const t = setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { x: 0.5, y: 0.1 },
        colors: ["#e11d48", "#fda4af", "#d946ef", "#fbbf24"],
        gravity: 0.4,
        scalar: 0.7,
        ticks: 200,
      })
    }, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Lightbox tile={activeTile} onClose={() => setActiveTile(null)} />

      <motion.div
        className="min-h-screen flex flex-col items-center justify-start p-4 pt-6 pb-24 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.5 }}
        key="moodboard"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8 w-full"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="text-5xl mb-3"
            animate={{ rotate: [0, 10, -10, 5, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            🎨
          </motion.div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-2">
            A Wall of You
          </h1>
          <p className="text-white/50 text-sm md:text-base max-w-xs mx-auto">
            Every little thing that reminds me of you — tap any to zoom in 💖
          </p>
        </motion.div>

        {/* Mosaic grid */}
        <div
          className="w-full max-w-3xl mx-auto mb-8"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "clamp(70px, 16vw, 120px)",
            gap: "8px",
          }}
        >
          {TILES.map((tile, i) => (
            <MosaicTile
              key={tile.src}
              tile={tile}
              index={i}
              onTap={setActiveTile}
            />
          ))}
        </div>

        {/* Tap hint */}
        <motion.p
          className="text-white/25 text-xs mb-6"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          tap any gif to view it ✨
        </motion.p>

        {/* Closing note */}
        <motion.div
          className="glass px-6 py-4 rounded-2xl text-center max-w-sm mx-auto mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
          style={{ boxShadow: "0 0 30px rgba(217,70,239,0.1)" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent pointer-events-none"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/60 mx-auto mb-2 opacity-70" />
          <p className="text-white/50 text-sm font-cute italic">
            "Every single frame here — that's how much I think about you."
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
              The Grand Finale
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  )
}
