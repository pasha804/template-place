"use client"

import { motion } from "framer-motion"
import { Gift, Sparkles } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

function fireConfetti() {
  // Massive burst from bottom center
  const burst = (opts) => confetti({
    particleCount: opts.count,
    spread: opts.spread,
    origin: opts.origin,
    colors: ["#e11d48", "#fda4af", "#d946ef", "#fbbf24", "#f9a8d4", "#c084fc"],
    gravity: 0.9,
    scalar: 1.1,
  })

  // Center bottom cannon
  burst({ count: 80, spread: 70, origin: { x: 0.5, y: 0.95 } })
  // Flanking bursts
  setTimeout(() => burst({ count: 40, spread: 55, origin: { x: 0.2, y: 0.85 } }), 150)
  setTimeout(() => burst({ count: 40, spread: 55, origin: { x: 0.8, y: 0.85 } }), 150)
  // Follow-up shower
  setTimeout(() => burst({ count: 60, spread: 90, origin: { x: 0.5, y: 1.0 } }), 500)

  // Continuous side streams
  const duration = 3000
  const end = Date.now() + duration
  const frame = () => {
    confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ["#e11d48", "#d946ef"] })
    confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ["#fbbf24", "#fda4af"] })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  setTimeout(frame, 600)
}

export default function Celebration({ onNext, celebrationHeading, celebrationSubtext, celebrationButtonText }) {
  useEffect(() => {
    const t = setTimeout(fireConfetti, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 15 }}
      key="celebration"
    >
      {/* Gift orb */}
      <motion.div
        className="mb-10 relative"
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #e11d48, #d946ef, #6366f1)",
            boxShadow: "0 0 50px rgba(217,70,239,0.45), 0 0 100px rgba(225,29,72,0.2)",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <Gift className="w-14 h-14 text-white relative z-10" />
        </div>
        {/* Orbiting sparkle */}
        <motion.div
          className="absolute"
          style={{ top: "50%", left: "50%", width: 80, height: 80, marginTop: -40, marginLeft: -40 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
        </motion.div>
      </motion.div>

      <motion.h1
        className="font-heading text-5xl md:text-7xl font-bold animated-gradient-text py-2 mb-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        style={{ filter: "drop-shadow(0 0 30px rgba(225,29,72,0.3))" }}
      >
        {celebrationHeading || "Time to Celebrate!"}
      </motion.h1>

      <motion.p
        className="text-white/50 text-lg mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {celebrationSubtext || "The countdown is over... Let's celebrate! 🎉"}
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 12 }}
      >
        <motion.button
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(30)
            onNext()
          }}
          className="relative overflow-hidden rounded-full text-white text-lg font-semibold px-10 py-5 min-h-[52px] min-w-[200px]"
          style={{
            background: "linear-gradient(135deg, #e11d48, #d946ef, #6366f1)",
            boxShadow: "0 0 30px rgba(217,70,239,0.4), 0 4px 20px rgba(0,0,0,0.3)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Continuous shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <Gift className="w-5 h-5" />
            {celebrationButtonText || "Let's Celebrate!"}
            <Sparkles className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>

      <motion.p
        className="text-white/30 text-sm mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        Click to start the magic ✨
      </motion.p>

      {/* Celebrate GIF */}
      <motion.div
        className="mt-8 rounded-2xl overflow-hidden mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
        style={{
          width: "min(180px, 50vw)",
          height: "min(180px, 50vw)",
          border: "1px solid rgba(217,70,239,0.25)",
          boxShadow: "0 0 30px rgba(217,70,239,0.2)",
        }}
      >
        <img
          src="/templates/birthday-aurora/gifs/celebrate.gif"
          alt="Celebration time!"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  )
}
