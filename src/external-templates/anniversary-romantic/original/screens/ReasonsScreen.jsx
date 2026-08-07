"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

const DEFAULT_REASONS = [
  {
    emoji: "😊",
    title: "Your Smile",
    front: "It lights up my darkest days.",
    back: "Every time you smile, the whole world just feels right. I would do anything to keep that smile on your face forever.",
    color: "#e11d48",
  },
  {
    emoji: "🌸",
    title: "Your Kindness",
    front: "You care about everyone around you.",
    back: "Your heart is the most beautiful thing about you. You make everyone feel seen, heard, and loved — including me.",
    color: "#d946ef",
  },
  {
    emoji: "💫",
    title: "Your Strength",
    front: "You face every challenge with grace.",
    back: "Watching you rise through every storm with dignity and courage makes me fall deeper in love with you every single day.",
    color: "#fbbf24",
  },
  {
    emoji: "✨",
    title: "Just Being You",
    front: "You are perfect exactly as you are.",
    back: "Not despite your quirks, not in spite of your imperfections — but because of every single thing that makes you, YOU.",
    color: "#e11d48",
  },
]

function useMagneticButton() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25
      el.style.transform = `translate(${dx}px,${dy}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0,0)" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [])
  return ref
}

function ReasonCard({ reason, index, isActive }) {
  const [flipped, setFlipped] = useState(false)

  const flip = () => setFlipped((f) => !f)

  return (
    <motion.div
      className="card-flip-scene"
      style={{ width: 280, height: 340, cursor: "pointer" }}
      onClick={flip}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.3, y: 0, scale: isActive ? 1 : 0.85 }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      whileHover={isActive ? { scale: 1.03 } : {}}
    >
      <div className={`card-flip-inner ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div
          className="card-face glass-card flex flex-col items-center justify-center p-8 gap-4"
          style={{
            boxShadow: `0 0 30px ${reason.color}22, 0 8px 32px rgba(0,0,0,0.5)`,
            border: `1px solid ${reason.color}33`,
          }}
        >
          <span style={{ fontSize: 64 }}>{reason.emoji}</span>
          <h3
            className="font-display text-2xl font-bold text-center"
            style={{ color: reason.color }}
          >
            {reason.title}
          </h3>
          <p
            className="text-center leading-relaxed text-base"
            style={{ color: "rgba(248,250,252,0.75)", fontFamily: "Inter, sans-serif" }}
          >
            {reason.front}
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "rgba(248,250,252,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            Tap to read more ↻
          </p>
        </div>

        {/* Back */}
        <div
          className="card-face card-back glass-card flex flex-col items-center justify-center p-8 gap-4"
          style={{
            background: `linear-gradient(135deg, ${reason.color}18 0%, rgba(10,10,18,0.95) 100%)`,
            border: `1px solid ${reason.color}44`,
            boxShadow: `0 0 40px ${reason.color}33`,
          }}
        >
          <span style={{ fontSize: 40 }}>💌</span>
          <h3
            className="font-display text-xl font-bold text-center"
            style={{ color: reason.color }}
          >
            {reason.title}
          </h3>
          <p
            className="text-center leading-relaxed text-sm"
            style={{ color: "rgba(248,250,252,0.85)", fontFamily: "Inter, sans-serif" }}
          >
            {reason.back}
          </p>
          <p
            className="text-xs mt-2"
            style={{ color: "rgba(248,250,252,0.3)", fontFamily: "Inter, sans-serif" }}
          >
            Tap to flip back ↺
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReasonsScreen({ onNext, reasons: customReasons, title, subtitle }) {
  const REASONS = customReasons && customReasons.length > 0 ? customReasons : DEFAULT_REASONS
  const [activeCard, setActiveCard] = useState(0)
  const [showBtn, setShowBtn] = useState(false)
  const dragStartX = useRef(null)
  const btnRef = useMagneticButton()

  const goNext = () => {
    if (activeCard < REASONS.length - 1) {
      setActiveCard((i) => i + 1)
    } else {
      setShowBtn(true)
    }
  }

  const goPrev = () => {
    if (activeCard > 0) setActiveCard((i) => i - 1)
  }

  const handleTouchStart = (e) => { dragStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return
    const diff = dragStartX.current - e.changedTouches[0].clientX
    if (diff > 40) goNext()
    else if (diff < -40) goPrev()
    dragStartX.current = null
  }

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    onNext()
  }

  return (
    <ScreenContainer>
      <div className="w-full max-w-2xl mx-auto relative z-10 px-4 flex flex-col items-center">
        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold text-center mb-2 leading-tight"
          style={{ color: "#fda4af" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={SPRING}
        >
          {title || "Why I Love You"}
        </motion.h1>

        <motion.p
          className="mb-10 text-sm text-center"
          style={{ color: "rgba(248,250,252,0.4)", fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle || `${activeCard + 1} of ${REASONS.length} — Tap card to reveal • Swipe to navigate`}
        </motion.p>

        {/* Card stack */}
        <div
          className="relative flex items-center justify-center w-full"
          style={{ height: 360 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {REASONS.map((reason, i) => {
            const offset = i - activeCard
            if (Math.abs(offset) > 1) return null

            return (
              <motion.div
                key={i}
                style={{
                  position: "absolute",
                  zIndex: i === activeCard ? 10 : 5,
                  x: offset * 30,
                  rotate: offset * 4,
                  pointerEvents: i === activeCard ? "auto" : "none",
                }}
                animate={{ x: offset * 30, rotate: offset * 4, scale: i === activeCard ? 1 : 0.88, opacity: i === activeCard ? 1 : 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ReasonCard reason={reason} index={i} isActive={i === activeCard} />
              </motion.div>
            )
          })}
        </div>

        {/* Nav arrows */}
        <div className="flex gap-4 mt-6 mb-4">
          <button
            onClick={goPrev}
            disabled={activeCard === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all"
            style={{
              background: activeCard === 0 ? "rgba(255,255,255,0.05)" : "rgba(225,29,72,0.2)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: activeCard === 0 ? "rgba(255,255,255,0.2)" : "#fda4af",
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label="Previous reason"
          >
            ←
          </button>

          <button
            onClick={goNext}
            disabled={activeCard === REASONS.length - 1 && showBtn}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all"
            style={{
              background: "rgba(225,29,72,0.2)",
              border: "1px solid rgba(225,29,72,0.3)",
              color: "#fda4af",
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label="Next reason"
          >
            →
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mb-6">
          {REASONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveCard(i)}
              style={{
                width: i === activeCard ? 20 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === activeCard ? "#e11d48" : "rgba(255,255,255,0.15)",
                border: "none",
                transition: "all 0.3s ease",
                minWidth: 8,
              }}
              aria-label={`Go to reason ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA appears after last card */}
        <AnimatePresence>
          {(showBtn || activeCard === REASONS.length - 1) && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={SPRING}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                ref={btnRef}
                onClick={handleClick}
                className="shimmer-sweep relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg text-white glow-rose"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #e11d48)",
                  minWidth: 260,
                  minHeight: 56,
                  fontFamily: "Inter, sans-serif",
                  transition: "transform 0.2s ease",
                }}
              >
                <span className="relative z-10">See My Promises 💍</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenContainer>
  )
}
