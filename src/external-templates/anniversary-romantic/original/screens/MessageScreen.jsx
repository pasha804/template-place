"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

const DEFAULT_LETTER = `My Dearest Cutiepiee,

Every day with you feels like a beautiful dream that I never want to wake up from. You've brought so much joy, laughter, and warmth into my life that I can't imagine a world without you in it.

From the moment we first met, I knew there was something special about you. Your smile lights up my darkest days, your laugh is my favourite sound in the world, and your love has made me a better person.

Thank you for being my partner, my best friend, and my greatest love. Thank you for all the little moments that make up our big love story — the morning coffees, the late-night conversations, the silly jokes, and the quiet moments where we just exist together in perfect harmony.

I promise to love you through all of life's adventures, to support your dreams, to laugh with you, cry with you, and grow old with you. You are my today, my tomorrow, and my always.

Happy Anniversary, my beautiful soul. Here's to many more years of love, laughter, and endless happiness together.`

const CHAR_DELAY = 12 // ms per character

function fireConfetti() {
  const colors = ["#e11d48", "#d946ef", "#fbbf24", "#fda4af", "#f8fafc"]
  const count = 180
  const defaults = { origin: { x: 0.5, y: 0.5 }, colors }

  confetti({ ...defaults, particleCount: count / 3, spread: 80, startVelocity: 55, scalar: 1.1 })
  confetti({ ...defaults, particleCount: count / 3, spread: 120, startVelocity: 40, scalar: 0.8, shapes: ["circle"] })
  confetti({ ...defaults, particleCount: count / 3, spread: 60, startVelocity: 30 })
}

function fireHugConfetti() {
  const colors = ["#fbbf24", "#fcd34d", "#fde68a", "#e11d48", "#fda4af"]
  confetti({
    particleCount: 200,
    spread: 180,
    origin: { x: 0.5, y: 0.5 },
    colors,
    startVelocity: 60,
    scalar: 1.3,
    shapes: ["circle"],
  })
  confetti({
    particleCount: 100,
    spread: 360,
    origin: { x: 0.5, y: 0.5 },
    colors,
    startVelocity: 35,
    scalar: 0.8,
  })
}

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

// ─── ENVELOPE SCENE ───────────────────────────────────────────────────────────
function EnvelopeScene({ onOpen, title }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.h1
        className="font-display text-4xl md:text-5xl font-bold text-center leading-tight"
        style={{ color: "#fda4af" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.2 }}
      >
        {title || "A Special Message For You"}
      </motion.h1>

      <motion.p
        className="text-sm text-center"
        style={{ color: "rgba(248,250,252,0.45)", fontFamily: "Inter, sans-serif" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Something from the heart is waiting inside...
      </motion.p>

      {/* 3D Envelope */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...SPRING, delay: 0.7 }}
        onClick={onOpen}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="cursor-pointer relative"
        style={{ width: 300, height: 200 }}
        role="button"
        tabIndex={0}
        aria-label="Open letter"
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
      >
        {/* Envelope body */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center glass-card"
          style={{
            border: "1px solid rgba(225,29,72,0.35)",
            boxShadow: hovered
              ? "0 0 60px rgba(225,29,72,0.4), 0 20px 60px rgba(0,0,0,0.6)"
              : "0 0 30px rgba(225,29,72,0.2), 0 10px 40px rgba(0,0,0,0.5)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Envelope lines */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              borderTop: "1px solid rgba(225,29,72,0.2)",
              background: "linear-gradient(to bottom, rgba(225,29,72,0.04), transparent)",
              borderRadius: "0 0 1rem 1rem",
            }}
          />

          {/* Diagonal flap lines */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", borderRight: "1px solid rgba(225,29,72,0.2)", borderBottom: "1px solid rgba(225,29,72,0.2)", borderRadius: "1rem 0 0 0" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", borderLeft: "1px solid rgba(225,29,72,0.2)", borderBottom: "1px solid rgba(225,29,72,0.2)", borderRadius: "0 1rem 0 0" }} />

          {/* Envelope flap (top) */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              height: "50%",
              transformOrigin: "top center",
              background: "linear-gradient(135deg, rgba(225,29,72,0.12), rgba(217,70,239,0.08))",
              borderRadius: "1rem 1rem 0 0",
              borderBottom: "1px solid rgba(225,29,72,0.2)",
            }}
            animate={{ rotateX: hovered ? -30 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Wax seal */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="wax-seal w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ boxShadow: "0 4px 20px rgba(251,191,36,0.5)" }}
            >
              ❤️
            </div>
            <p
              style={{
                color: "rgba(253,164,175,0.7)",
                fontSize: 13,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {hovered ? "Open my heart..." : "Tap to open my heart"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── LETTER SCENE ─────────────────────────────────────────────────────────────
function LetterScene({ letterText, signature: customSig, title, onReplay }) {
  const LETTER = letterText || DEFAULT_LETTER
  const sigText = customSig || "Forever Yours ❤️"
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const [showSignature, setShowSignature] = useState(false)
  const [hugGlow, setHugGlow] = useState(false)
  const scrollRef = useRef(null)
  const idxRef = useRef(0)
  const timerRef = useRef(null)
  const hugBtnRef = useMagneticButton()

  const finishTypingInstantly = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    idxRef.current = LETTER.length
    setDisplayed(LETTER)
    setDone(true)
    setShowSignature(true)
    fireConfetti()
  }, [LETTER])

  const typeNext = useCallback(() => {
    if (idxRef.current >= LETTER.length) {
      setDone(true)
      setTimeout(() => {
        fireConfetti()
        setTimeout(() => setShowSignature(true), 300)
      }, 200)
      return
    }
    idxRef.current += 1
    setDisplayed(LETTER.slice(0, idxRef.current))
    timerRef.current = setTimeout(typeNext, CHAR_DELAY)
  }, [LETTER])

  useEffect(() => {
    // Small delay before typing starts
    const start = setTimeout(typeNext, 200)
    return () => {
      clearTimeout(start)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [typeNext])

  // Auto-scroll to bottom as text types
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [displayed])

  const handleHug = () => {
    if (navigator.vibrate) navigator.vibrate([40, 20, 60, 20, 100])
    setHugGlow(true)
    fireHugConfetti()
    setTimeout(() => setHugGlow(false), 1800)
  }

  return (
    <div className="flex flex-col items-center w-full gap-6 relative">

      {/* Warm hug glow overlay */}
      <AnimatePresence>
        {hugGlow && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40 rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.35) 0%, rgba(225,29,72,0.2) 50%, transparent 80%)",
            }}
          />
        )}
      </AnimatePresence>

      <motion.h1
        className="font-display text-3xl md:text-4xl font-bold text-center leading-tight"
        style={{ color: "#fda4af" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING}
      >
        {title || "A Special Message For You 💌"}
      </motion.h1>

      {/* Letter card container */}
      <motion.div
        className="glass-card rounded-3xl p-6 md:p-8 w-full relative overflow-hidden cursor-pointer"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...SPRING, delay: 0.2 }}
        onClick={!done ? finishTypingInstantly : undefined}
        style={{
          boxShadow: "0 0 50px rgba(225,29,72,0.2), 0 20px 60px rgba(0,0,0,0.6)",
          border: "1px solid rgba(225,29,72,0.3)",
        }}
      >
        {/* Subtle top gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #e11d48, #fbbf24, #d946ef)",
          }}
        />

        {!done && (
          <div className="absolute top-2 right-4 text-[11px] text-pink-300/60 font-medium tracking-wide">
            (Tap to reveal instantly ✨)
          </div>
        )}

        {/* Scrollable text area */}
        <div
          ref={scrollRef}
          className="max-h-[380px] overflow-y-auto pr-2"
          style={{ scrollBehavior: "smooth" }}
        >
          <p
            className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-light"
            style={{
              color: "rgba(248,250,252,0.9)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {displayed}
            {!done && <span className="typewriter-cursor" />}
          </p>
        </div>
      </motion.div>

      {/* Signature & Action Buttons — appears when letter finishes */}
      <AnimatePresence>
        {showSignature && (
          <motion.div
            className="flex flex-col items-center gap-6 mt-2"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={SPRING}
          >
            {/* Glowing Signature */}
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.2 }}
            >
              <motion.p
                className="font-display text-2xl md:text-3xl font-bold text-center"
                style={{
                  background: "linear-gradient(135deg, #e11d48, #fbbf24)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(251,191,36,0.4))",
                }}
                animate={{
                  filter: [
                    "drop-shadow(0 0 15px rgba(225,29,72,0.4))",
                    "drop-shadow(0 0 30px rgba(251,191,36,0.6))",
                    "drop-shadow(0 0 15px rgba(225,29,72,0.4))",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {sigText}
              </motion.p>

              {/* Action Buttons: Virtual Hug + Replay */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: 0.4 }}
              >
                <button
                  ref={hugBtnRef}
                  onClick={handleHug}
                  className="shimmer-sweep relative overflow-hidden px-8 py-3.5 rounded-full font-semibold text-base text-white glow-gold"
                  style={{
                    background: "linear-gradient(135deg, #fbbf24, #e11d48)",
                    minWidth: 220,
                    minHeight: 52,
                    fontFamily: "Inter, sans-serif",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <span className="relative z-10">Send a Virtual Hug 🫂</span>
                </button>

                {onReplay && (
                  <button
                    onClick={onReplay}
                    className="px-6 py-3.5 rounded-full font-semibold text-sm text-pink-200 border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 transition-all"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Replay Surprise 🌹
                  </button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MessageScreen({ letterText, signature, title, onNext }) {
  const [stage, setStage] = useState("envelope") // "envelope" | "opening" | "letter"

  const handleOpen = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    setStage("opening")
    setTimeout(() => setStage("letter"), 800)
  }

  const handleReplay = () => {
    if (onNext) {
      onNext()
    } else {
      setStage("envelope")
    }
  }

  return (
    <ScreenContainer>
      <div className="w-full max-w-xl mx-auto relative z-10 px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {stage === "envelope" && (
            <motion.div
              key="envelope"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <EnvelopeScene onOpen={handleOpen} title={title} />
            </motion.div>
          )}

          {stage === "opening" && (
            <motion.div
              key="opening"
              className="w-full flex flex-col items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ fontSize: 80 }}
              >
                💌
              </motion.div>
              <p
                className="shimmer-text text-xl font-semibold font-display"
              >
                Opening...
              </p>
            </motion.div>
          )}

          {stage === "letter" && (
            <motion.div
              key="letter"
              className="w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <LetterScene
                letterText={letterText}
                signature={signature}
                title={title}
                onReplay={handleReplay}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScreenContainer>
  )
}
