"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"

// Age is now passed as a prop

// ── Facts about turning this age ──────────────────────────────
const getAgeFacts = (age, ageFactText) => [
  { emoji: "👑", text: ageFactText || `You are officially turning ${age}` },
  { emoji: "🌟", text: `${age} years of making the world brighter` },
  { emoji: "🦋", text: "From a little girl to an absolute queen" },
  { emoji: "🎓", text: "The whole world is now yours to conquer" },
  { emoji: "💫", text: "Every year made you more magical than the last" },
]

// ── Digit flip component ───────────────────────────────────────
function FlipDigit({ digit, delay }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{
        width: "clamp(72px, 18vw, 120px)",
        height: "clamp(90px, 22vw, 148px)",
        background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
        border: "1px solid rgba(217,70,239,0.3)",
        borderRadius: 20,
        boxShadow: "0 0 40px rgba(217,70,239,0.2), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        backdropFilter: "blur(24px)",
        overflow: "hidden",
      }}
      initial={{ rotateX: -90, opacity: 0, y: 40 }}
      animate={{ rotateX: 0, opacity: 1, y: 0 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 180,
        damping: 14,
      }}
    >
      {/* Top gradient stripe */}
      <div
        className="absolute top-0 inset-x-0 h-0.5"
        style={{ background: "linear-gradient(90deg, #e11d48, #d946ef)" }}
      />
      {/* Center divider line (flip-clock style) */}
      <div
        className="absolute inset-x-0"
        style={{ top: "50%", height: 1, background: "rgba(0,0,0,0.4)" }}
      />
      {/* Top half darker */}
      <div
        className="absolute top-0 inset-x-0"
        style={{ height: "50%", background: "rgba(0,0,0,0.15)" }}
      />
      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/6 to-transparent pointer-events-none"
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: delay + 0.5 }}
      />
      <span
        className="relative z-10 font-bold tabular-nums"
        style={{
          fontSize: "clamp(44px, 11vw, 80px)",
          lineHeight: 1,
          fontFamily: "Inter, sans-serif",
          letterSpacing: "-0.03em",
          background: "linear-gradient(180deg, #ffffff 0%, rgba(253,164,175,0.9) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {digit}
      </span>
    </motion.div>
  )
}

// ── Fact chip ─────────────────────────────────────────────────
function FactChip({ fact, index }) {
  return (
    <motion.div
      className="flex items-center gap-3 glass px-4 py-3 rounded-2xl"
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 1.8 + index * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      style={{
        border: "1px solid rgba(217,70,239,0.2)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      <span className="text-xl flex-shrink-0">{fact.emoji}</span>
      <span className="text-white/75 text-sm font-cute leading-tight">{fact.text}</span>
    </motion.div>
  )
}

// ── Confetti burst ─────────────────────────────────────────────
function fireAgeConfetti() {
  const colors = ["#e11d48", "#fda4af", "#d946ef", "#fbbf24", "#f9a8d4", "#c084fc"]

  // Big center burst
  confetti({ particleCount: 100, spread: 80, origin: { x: 0.5, y: 0.45 }, colors, gravity: 0.7, scalar: 1.1 })

  // Side cannons
  setTimeout(() => {
    confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.6 }, colors })
    confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.6 }, colors })
  }, 200)

  // Number shaped shower
  setTimeout(() => {
    confetti({ particleCount: 60, spread: 120, origin: { x: 0.5, y: 0.3 }, colors, gravity: 0.5, scalar: 0.9, shapes: ["star"] })
  }, 500)
}

// ── Main AgeReveal ─────────────────────────────────────────────
export default function AgeReveal({ onNext, age = 18, birthdayName, ageFactText }) {
  const [showFacts, setShowFacts] = useState(false)
  const facts = getAgeFacts(age, ageFactText)

  useEffect(() => {
    // Confetti when the digits land
    const t1 = setTimeout(fireAgeConfetti, 500)
    // Show facts after digits settle
    const t2 = setTimeout(() => setShowFacts(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 py-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      key="agereveal"
    >
      {/* Big ambient glow behind number */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse at center, rgba(217,70,239,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.18, 1], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🎂
        </motion.div>
        <p className="text-white/50 text-base md:text-lg tracking-wide">
          Today, {birthdayName || "Madam Jii"}, you turn...
        </p>
      </motion.div>

      {/* Giant age digits — flip clock style */}
      <div className="flex items-center gap-4 mb-4" style={{ perspective: "600px" }}>
        {String(age).split("").map((d, i) => (
          <FlipDigit key={i} digit={d} delay={0.3 + i * 0.18} />
        ))}
      </div>

      {/* "Years Old" label */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
      >
        <span
          className="font-heading font-bold tracking-widest uppercase"
          style={{
            fontSize: "clamp(18px, 5vw, 32px)",
            background: "linear-gradient(135deg, #fda4af, #e11d48, #d946ef, #fbbf24)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 3s ease infinite",
            letterSpacing: "0.25em",
          }}
        >
          Years Old
        </span>
      </motion.div>

      {/* Milestone headline */}
      <motion.div
        className="relative glass rounded-3xl px-6 md:px-10 py-5 text-center max-w-md mx-auto mb-8 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, type: "spring", stiffness: 200, damping: 15 }}
        style={{ boxShadow: "0 0 40px rgba(217,70,239,0.15)" }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/4 to-transparent pointer-events-none"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <Sparkles className="w-6 h-6 text-yellow-300 mx-auto mb-2 opacity-70" />
        <p className="font-heading text-white font-bold text-xl md:text-2xl mb-1">
          Welcome to {age}, queen 👑
        </p>
        <p className="text-white/55 text-sm font-cute leading-relaxed">
          Old enough to rule the world,<br />
          still young enough to make it magical.
        </p>
      </motion.div>

      {/* Fact chips */}
      <AnimatePresence>
        {showFacts && (
          <div className="w-full max-w-sm mx-auto flex flex-col gap-2 mb-10">
            {facts.map((fact, i) => (
              <FactChip key={i} fact={fact} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Next button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.button
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(30)
            onNext()
          }}
          className="relative overflow-hidden rounded-full text-white text-lg font-semibold px-10 py-4 min-h-[52px]"
          style={{
            background: "linear-gradient(135deg, #e11d48, #d946ef, #6366f1)",
            boxShadow: "0 0 30px rgba(217,70,239,0.4), 0 4px 20px rgba(0,0,0,0.3)",
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
            Let's Celebrate You
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
