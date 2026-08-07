"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Gift, Cake } from "lucide-react"

// ── Single time card ───────────────────────────────────────────
function TimeCard({ label, value, color, delay, isLive }) {
  const prevValue = useRef(value)
  const [tick, setTick] = useState(false)

  useEffect(() => {
    if (prevValue.current !== value) {
      setTick(true)
      const t = setTimeout(() => setTick(false), 350)
      prevValue.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  return (
    <motion.div
      className="text-center"
      initial={{ scale: 0, rotateY: -90, opacity: 0 }}
      animate={{ scale: 1, rotateY: 0, opacity: 1 }}
      transition={{ delay: 0.4 + delay, type: "spring", stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="relative glass-card rounded-2xl p-5 md:p-7 overflow-hidden"
        animate={tick ? { scale: [1, 1.08, 1] } : {}}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={
          isLive
            ? { boxShadow: "0 0 24px rgba(217,70,239,0.3), 0 8px 32px rgba(0,0,0,0.4)" }
            : {}
        }
      >
        {/* Gradient top stripe */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${color}`} />

        {/* Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3.5, repeat: Infinity, delay }}
        />

        {/* Live pulse ring on seconds card */}
        {isLive && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ border: "1px solid rgba(217,70,239,0.4)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        <motion.div
          className="text-3xl md:text-5xl font-bold text-white mb-1 tabular-nums"
          key={value}
          initial={{ scale: 1.3, opacity: 0, y: -8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.22, type: "spring", stiffness: 340, damping: 22 }}
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: "-0.02em",
            ...(isLive && {
              background: "linear-gradient(135deg, #fff 0%, #fda4af 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }),
          }}
        >
          {value.toString().padStart(2, "0")}
        </motion.div>

        <div className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest">
          {label}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Countdown — 5-second cinematic demo ───────────────────────
export default function Countdown({ onComplete }) {
  const [seconds, setSeconds] = useState(5)

  useEffect(() => {
    if (seconds <= 0) {
      onComplete()
      return
    }
    const id = setTimeout(() => setSeconds(s => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds, onComplete])

  const units = [
    { label: "Days",    value: 0,       color: "from-rose-500 to-pink-500",      delay: 0,    isLive: false },
    { label: "Hours",   value: 0,       color: "from-fuchsia-500 to-rose-500",   delay: 0.08, isLive: false },
    { label: "Minutes", value: 0,       color: "from-violet-500 to-fuchsia-500", delay: 0.16, isLive: false },
    { label: "Seconds", value: seconds, color: "from-indigo-500 to-violet-500",  delay: 0.24, isLive: true  },
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.55 }}
      key="countdown"
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="glass w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ boxShadow: "0 0 30px rgba(217,70,239,0.25)" }}
          animate={{ rotate: [0, 6, -6, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cake className="w-10 h-10 text-pink-400" />
        </motion.div>

        <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-3">
          Birthday Countdown
        </h1>
        <p className="text-white/50 text-base md:text-lg">
          The magical moment is almost here... 🎉
        </p>
      </motion.div>

      {/* Time cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-xl w-full">
        {units.map(u => (
          <TimeCard key={u.label} {...u} />
        ))}
      </div>

      {/* "Just moments away" pill */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="glass inline-flex items-center gap-3 px-6 py-3 rounded-full">
          <Gift className="w-5 h-5 text-fuchsia-400" />
          <p className="text-white/60 text-sm">The surprise is just moments away 💖</p>
        </div>
      </motion.div>

      {/* Cute anticipation GIF */}
      <motion.div
        className="mt-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 15 }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            width: "min(120px, 32vw)",
            height: "min(120px, 32vw)",
            border: "1px solid rgba(217,70,239,0.2)",
            boxShadow: "0 0 20px rgba(217,70,239,0.15)",
          }}
        >
          <img
            src="/templates/birthday-aurora/gifs/please.gif"
            alt="Waiting eagerly"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.p
          className="text-white/30 text-xs font-cute"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          waiting so eagerly... 🥺
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
