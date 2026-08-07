"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, RotateCcw } from "lucide-react"
import confetti from "canvas-confetti"

const LETTER_TEXT = `My Dearest Madam Jii,

On this very special day, I want you to know how incredibly grateful I am to have you in my life. Your birthday isn't just a celebration of another year — it's a celebration of all the joy, laughter, and beautiful memories you bring to this world.

You have this amazing ability to light up any room you enter, to make people smile even on their darkest days, and to spread kindness wherever you go. Your heart is pure gold, and your spirit is absolutely infectious.

Every single moment spent with you feels like magic — like time slows down just to let you shine a little longer. You deserve the entire universe, wrapped up in a bow, delivered with love.

Thank you for being the wonderful, amazing, absolutely fantastic person that you are. The world is so much brighter because you're in it.

Happy Birthday, beautiful soul! 🎂✨

With all my love and warmest wishes,`

// ── Grand finale confetti ──────────────────────────────────────
function fireFinaleConfetti() {
  const colors = ["#e11d48", "#fda4af", "#d946ef", "#fbbf24", "#f9a8d4", "#c084fc", "#818cf8"]

  // Center mega burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { x: 0.5, y: 0.55 },
    colors,
    gravity: 0.8,
    scalar: 1.2,
    ticks: 300,
  })

  // Side cannons
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 70, origin: { x: 0.05, y: 0.7 }, colors })
    confetti({ particleCount: 50, angle: 120, spread: 70, origin: { x: 0.95, y: 0.7 }, colors })
  }, 200)

  // Shooting stars
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 120,
      origin: { x: 0.5, y: 0.35 },
      colors,
      gravity: 0.5,
      scalar: 0.8,
      shapes: ["star"],
    })
  }, 500)
}

// ── Envelope flap ─────────────────────────────────────────────
function EnvelopeScene({ onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="envelope-scene flex flex-col items-center cursor-pointer select-none"
      onClick={() => {
        if (navigator.vibrate) navigator.vibrate(30)
        onOpen()
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      initial={{ scale: 0, rotateY: -30, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      exit={{ rotateX: -90, opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
    >
      {/* Envelope wrapper */}
      <div
        className="relative"
        style={{
          width: "min(340px, 88vw)",
          filter: hovered
            ? "drop-shadow(0 0 30px rgba(217,70,239,0.5))"
            : "drop-shadow(0 8px 24px rgba(0,0,0,0.5))",
          transition: "filter 0.4s ease",
        }}
      >
        {/* Envelope body */}
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            paddingBottom: "62%",
            background: "linear-gradient(160deg, #1a0a2e 0%, #2d0a4e 40%, #1a0a3e 100%)",
            borderRadius: "12px 12px 14px 14px",
            border: "1px solid rgba(217,70,239,0.3)",
          }}
        >
          {/* Bottom V fold lines */}
          <div
            className="absolute bottom-0 left-0 w-1/2 h-full pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 49%, rgba(217,70,239,0.08) 50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none"
            style={{
              background: "linear-gradient(225deg, transparent 49%, rgba(217,70,239,0.08) 50%)",
            }}
          />

          {/* Center seal */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={hovered ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: "linear-gradient(135deg, #e11d48, #d946ef)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(217,70,239,0.6)",
              }}
            >
              <Heart className="w-7 h-7 text-white fill-white" />
            </div>
          </motion.div>

          {/* Top-right stamp */}
          <div className="absolute top-3 right-3">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </motion.div>
          </div>
          <div className="absolute top-3 left-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400/60" />
            </motion.div>
          </div>
        </div>

        {/* Top flap */}
        <motion.div
          className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none"
          style={{
            height: "52%",
            transformOrigin: "top center",
            background: "linear-gradient(160deg, #2a0a4e 0%, #3d0a6e 60%, #2a0a4e 100%)",
            borderRadius: "12px 12px 0 0",
            border: "1px solid rgba(217,70,239,0.25)",
            borderBottom: "none",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          }}
          animate={hovered ? { rotateX: -15 } : { rotateX: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Flap inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-900/30 to-transparent" />
        </motion.div>
      </div>

      {/* Click hint */}
      <motion.div
        className="mt-5 glass px-5 py-2 rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <p className="text-white/60 text-sm font-cute flex items-center gap-2">
          <span>✉️</span> Click to open your letter
        </p>
      </motion.div>
    </motion.div>
  )
}

// ── Open letter card ───────────────────────────────────────────
function LetterCard({ onReset, letterText, letterSignature }) {
  const textContent = letterText || LETTER_TEXT
  const signatureText = letterSignature || "Forever Yours 💕"
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [showGif, setShowGif] = useState(false)
  const scrollRef = useRef(null)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  // Auto-scroll as text grows
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [currentText])

  // Typewriter effect
  useEffect(() => {
    const tick = () => {
      if (indexRef.current < textContent.length) {
        indexRef.current++
        setCurrentText(textContent.slice(0, indexRef.current))
        timerRef.current = setTimeout(tick, 35)
      } else {
        setShowCursor(false)
        setIsFinished(true)
        setTimeout(fireFinaleConfetti, 200)
        setTimeout(() => setShowSignature(true), 800)
        setTimeout(() => setShowGif(true), 1400)
      }
    }
    timerRef.current = setTimeout(tick, 300)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ rotateX: -90, opacity: 0, y: 60 }}
      animate={{ rotateX: 0, opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 }}
      style={{ perspective: "800px" }}
    >
      {/* Paper card */}
      <div
        className="relative rounded-3xl p-6 md:p-8 overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 60px rgba(217,70,239,0.15), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          backdropFilter: "blur(24px)",
        }}
      >
        {/* Corner decorations */}
        <div className="absolute top-4 left-4 opacity-40">
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </div>
        <div className="absolute top-4 right-4 opacity-40">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/60" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-30">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400/50" />
        </div>
        <div className="absolute bottom-4 right-4 opacity-30">
          <Sparkles className="w-4 h-4 text-purple-400" />
        </div>

        {/* Paper lines (decorative) */}
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="absolute left-10 right-10 pointer-events-none"
            style={{ top: `${14 + i * 22}%`, height: 1, background: "rgba(255,255,255,0.025)" }}
          />
        ))}

        {/* Header heart */}
        <div className="text-center mb-5">
          <motion.div
            className="inline-block"
            animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto" />
          </motion.div>
        </div>

        {/* Scrollable text */}
        <div
          ref={scrollRef}
          className="max-h-56 md:max-h-72 overflow-y-auto pr-2 mb-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="font-cute text-white/80 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
            {currentText}
            {showCursor && <span className="cursor-blink" />}
          </div>
        </div>

        {/* Signature */}
        <AnimatePresence>
          {showSignature && (
            <motion.div
              className="text-center mt-3 mb-4"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <p className="signature-text text-2xl md:text-3xl">
                {signatureText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Finale GIF — back-hug reveal */}
        <AnimatePresence>
          {showGif && (
            <motion.div
              className="flex flex-col items-center gap-3 mt-3"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  width: "min(200px, 55vw)",
                  height: "min(200px, 55vw)",
                  border: "1px solid rgba(217,70,239,0.3)",
                  boxShadow: "0 0 30px rgba(217,70,239,0.2)",
                }}
              >
                <img
                  src="/templates/birthday-aurora/gifs/back-hug.gif"
                  alt="A hug for you"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white/50 text-xs font-cute text-center">
                this is me, hugging you right now 🫂
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Read Again button */}
        <AnimatePresence>
          {isFinished && (
            <motion.div
              className="flex justify-center mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.button
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(30)
                  onReset()
                }}
                className="glass inline-flex items-center gap-2 text-pink-300 font-medium px-6 py-3 rounded-full min-h-[44px] text-sm"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                style={{ border: "1px solid rgba(236,72,153,0.3)" }}
              >
                <RotateCcw className="w-4 h-4" />
                Read Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ── Main Letter component ──────────────────────────────────────
export default function Letter({ letterText, letterSignature }) {
  const [phase, setPhase] = useState("envelope") // "envelope" | "letter"

  const handleOpen = useCallback(() => {
    setPhase("letter")
  }, [])

  const handleReset = useCallback(() => {
    setPhase("envelope")
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 py-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      key="letter"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-2">
          A Letter For You
        </h1>
        <p className="text-white/50 text-base">
          Just for you, on your most special day 💌
        </p>
      </motion.div>

      {/* Envelope / Letter swap */}
      <div className="w-full max-w-2xl flex justify-center">
        <AnimatePresence mode="wait">
          {phase === "envelope" ? (
            <motion.div key="env" className="flex justify-center w-full">
              <EnvelopeScene onOpen={handleOpen} />
            </motion.div>
          ) : (
            <motion.div key="ltr" className="w-full">
              <LetterCard onReset={handleReset} letterText={letterText} letterSignature={letterSignature} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
