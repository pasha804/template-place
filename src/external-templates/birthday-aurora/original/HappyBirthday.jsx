"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import confetti from "canvas-confetti"

// ── Candle flame ────────────────────────────────────────────────
function Flame({ delay = 0 }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Glow */}
      <motion.div
        className="absolute -top-1 w-5 h-5 rounded-full blur-md"
        style={{ background: "rgba(251,191,36,0.6)" }}
        animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 0.6 + delay * 0.15, repeat: Infinity, ease: "easeInOut", delay }}
      />
      {/* Flame shape */}
      <motion.div
        className="relative z-10"
        animate={{
          scaleY: [1, 1.35, 0.85, 1.2, 1],
          scaleX: [1, 0.75, 1.1, 0.85, 1],
          skewX: [0, 4, -5, 3, 0],
        }}
        transition={{ duration: 0.5 + delay * 0.1, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ transformOrigin: "bottom center" }}
      >
        <div
          style={{
            width: 10,
            height: 16,
            background: "linear-gradient(to top, #f97316, #fbbf24, #fef9c3)",
            borderRadius: "50% 50% 30% 30%",
            boxShadow: "0 0 8px rgba(251,191,36,0.8)",
          }}
        />
      </motion.div>
      {/* Candle stick */}
      <div
        style={{
          width: 7,
          height: 28,
          background: "linear-gradient(to bottom, #fef3c7, #fde68a, #fbbf24)",
          borderRadius: "2px 2px 3px 3px",
          marginTop: 0,
          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  )
}

// ── Cake ────────────────────────────────────────────────────────
function AnimatedCake() {
  return (
    <motion.div
      className="relative z-10"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center select-none">
        {/* Candles row */}
        <div className="flex gap-3 mb-0.5 z-20 relative">
          {[0, 1, 2].map(i => <Flame key={i} delay={i * 0.2} />)}
        </div>

        {/* Top tier */}
        <div
          className="relative rounded-xl overflow-hidden shadow-lg"
          style={{
            width: 88, height: 42,
            background: "linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 100%)",
          }}
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-white/30 rounded-t-xl" />
          {/* Frosting drips */}
          {[15, 35, 55, 72].map((l, i) => (
            <div key={i} className="absolute top-0 w-2 h-4 rounded-b-full bg-white/40" style={{ left: `${l}%` }} />
          ))}
          {/* Dots */}
          {[25, 50, 72].map((l, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full bg-pink-300" style={{ left: `${l}%`, top: "55%" }} />
          ))}
        </div>

        {/* Middle tier */}
        <div
          className="relative -mt-1 rounded-xl overflow-hidden shadow-lg"
          style={{
            width: 120, height: 48,
            background: "linear-gradient(180deg, #fbcfe8 0%, #ec4899 100%)",
          }}
        >
          <div className="absolute top-0 inset-x-0 h-2 bg-white/25 rounded-t-xl" />
          {[10, 27, 45, 62, 78].map((l, i) => (
            <div key={i} className="absolute top-0 w-2.5 h-5 rounded-b-full bg-white/35" style={{ left: `${l}%` }} />
          ))}
          {[16, 36, 56, 76].map((l, i) => (
            <div key={i} className="absolute w-2 h-2 rounded-full bg-white/70" style={{ left: `${l}%`, top: "55%" }} />
          ))}
        </div>

        {/* Bottom tier */}
        <div
          className="relative -mt-1 rounded-xl overflow-hidden shadow-xl"
          style={{
            width: 152, height: 56,
            background: "linear-gradient(180deg, #fef08a 0%, #eab308 100%)",
          }}
        >
          <div className="absolute top-0 inset-x-0 h-3 bg-white/25 rounded-t-xl" />
          {[8, 22, 36, 50, 64, 78].map((l, i) => (
            <div key={i} className="absolute top-0 w-3 h-6 rounded-b-full bg-white/30" style={{ left: `${l}%` }} />
          ))}
          {[14, 28, 44, 60, 76].map((l, i) => (
            <div key={i} className="absolute w-2.5 h-2.5 rounded-full bg-red-400" style={{ left: `${l}%`, top: "56%" }} />
          ))}
        </div>

        {/* Plate */}
        <div
          style={{
            width: 170, height: 12,
            background: "linear-gradient(180deg, #e2e8f0, #cbd5e1)",
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        />
      </div>
    </motion.div>
  )
}

// ── Balloon ──────────────────────────────────────────────────────
const BALLOON_COLORS = [
  { from: "#ef4444", to: "#dc2626", shadow: "rgba(239,68,68,0.5)" },
  { from: "#3b82f6", to: "#2563eb", shadow: "rgba(59,130,246,0.5)" },
  { from: "#22c55e", to: "#16a34a", shadow: "rgba(34,197,94,0.5)" },
  { from: "#eab308", to: "#ca8a04", shadow: "rgba(234,179,8,0.5)" },
  { from: "#a855f7", to: "#7c3aed", shadow: "rgba(168,85,247,0.5)" },
  { from: "#ec4899", to: "#db2777", shadow: "rgba(236,72,153,0.5)" },
]

function Balloon({ color, delay, x, isMobile, mouseX, mouseY }) {
  const [popped, setPopped] = useState(false)
  const [popParticles, setPopParticles] = useState([])

  const handleTap = useCallback(() => {
    if (popped) return
    if (navigator.vibrate) navigator.vibrate(20)
    // Mini confetti pop
    const particles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      angle: (360 / 8) * i,
      color: color.from,
    }))
    setPopParticles(particles)
    setPopped(true)
  }, [popped, color])

  // Parallax offset (desktop only)
  const parallaxX = !isMobile ? (mouseX - 0.5) * -12 : 0
  const parallaxY = !isMobile ? (mouseY - 0.5) * -8 : 0

  if (popped) {
    return (
      <div
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, bottom: "2%", zIndex: 5 }}
      >
        <AnimatePresence>
          {popParticles.map(p => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: p.color, top: 0, left: 0 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos((p.angle * Math.PI) / 180) * 40,
                y: Math.sin((p.angle * Math.PI) / 180) * 40,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${x}%`, bottom: "2%", zIndex: 5 }}
      animate={{
        y: [0, -18, 0],
        x: [0, 6, -6, 0],
        rotate: [0, 3, -3, 0],
        translateX: parallaxX,
        translateY: parallaxY,
      }}
      transition={{
        y: { duration: 3.5 + Math.random() * 1.5, repeat: Infinity, delay, ease: "easeInOut" },
        x: { duration: 4 + Math.random() * 2, repeat: Infinity, delay: delay + 0.5, ease: "easeInOut" },
        rotate: { duration: 4, repeat: Infinity, delay, ease: "easeInOut" },
        translateX: { duration: 0.3 },
        translateY: { duration: 0.3 },
      }}
      onClick={handleTap}
      whileTap={isMobile ? { scale: 1.5, opacity: 0 } : {}}
    >
      <div className="relative w-[60px] h-[70px]">
        {/* Balloon body */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `linear-gradient(145deg, ${color.from}, ${color.to})`,
            borderRadius: "75% 75% 70% 70% / 80% 80% 65% 65%",
            boxShadow: `0 0 16px ${color.shadow}, inset -8px -8px 15px rgba(0,0,0,0.15)`,
          }}
        >
          {/* Highlight */}
          <div className="absolute top-2 left-2 w-3 h-5 bg-white/50 rounded-full blur-[1px]" />
          <div className="absolute top-2 left-5 w-1.5 h-2 bg-white/30 rounded-full blur-[0.5px]" />
        </div>
        {/* Knot */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2"
          style={{
            width: 8,
            height: 8,
            background: color.to,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
        {/* String */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 balloon-string"
          style={{ height: 28 }}
        />
      </div>
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────────
export default function HappyBirthday({ onNext, birthdayName, birthdayTagline, bdayHeading, bdaySubheading }) {
  const heading = bdayHeading || "Happy Birthday"
  const name = birthdayName || "Madam Jii"
  const tagline = bdaySubheading || birthdayTagline || "🎉 It's your most special day! 🎉"
  const [balloonCount, setBalloonCount] = useState(8)
  const [isMobile, setIsMobile] = useState(false)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })
  const [showGif, setShowGif] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setBalloonCount(mobile ? 6 : 18)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  // Entry confetti burst
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: ["#e11d48", "#fda4af", "#d946ef", "#fbbf24", "#c084fc"],
        gravity: 0.6,
        scalar: 1.0,
      })
      confetti({ particleCount: 30, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ["#e11d48", "#d946ef"] })
      confetti({ particleCount: 30, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ["#fbbf24", "#fda4af"] })
    }, 600)
    // Show cute GIF after text settles
    const g = setTimeout(() => setShowGif(true), 2000)
    return () => { clearTimeout(t); clearTimeout(g) }
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }, [isMobile])

  const balloons = Array.from({ length: balloonCount }, (_, i) => ({
    id: i,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    delay: i * 0.18,
    x: (100 / balloonCount) * i + (100 / balloonCount / 2),
  }))

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      onMouseMove={handleMouseMove}
      key="happybday"
    >
      {/* Balloons */}
      {balloons.map(b => (
        <Balloon
          key={b.id}
          color={b.color}
          delay={b.delay}
          x={b.x}
          isMobile={isMobile}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      ))}

      {/* Content */}
      <motion.div
        className="text-center relative z-10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="mb-8 flex justify-center">
          <AnimatedCake />
        </div>

        <motion.h1
          className="font-heading text-5xl md:text-7xl font-bold animated-gradient-text py-2 mb-3"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        >
          {heading}
        </motion.h1>

        <motion.h2
          className="font-heading text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 15 }}
          style={{
            background: "linear-gradient(135deg, #fda4af, #e11d48, #d946ef)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(225,29,72,0.4))",
          }}
        >
          {name}
        </motion.h2>

        <motion.div
          className="text-lg md:text-xl text-white/50 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          {tagline}
        </motion.div>
      </motion.div>

      {/* Button */}
      <motion.div
        className="relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, type: "spring", stiffness: 200, damping: 15 }}
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
            See Our Moments
            <ArrowRight className="w-5 h-5" />
          </span>
        </motion.button>
      </motion.div>

      {/* Cute GIF surprise */}
      <AnimatePresence>
        {showGif && (
          <motion.div
            className="relative z-20 mt-6 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                width: "min(140px, 38vw)",
                height: "min(140px, 38vw)",
                border: "1px solid rgba(217,70,239,0.25)",
                boxShadow: "0 0 20px rgba(217,70,239,0.2)",
              }}
            >
              <img
                src="/templates/birthday-aurora/gifs/heppi.gif"
                alt="Happy birthday!"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.p
              className="text-white/40 text-xs font-cute"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              this is us, celebrating you 🎉
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
