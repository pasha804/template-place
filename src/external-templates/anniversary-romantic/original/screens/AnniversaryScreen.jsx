"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

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

function getDaysDiff(dateStr) {
  const special = new Date(dateStr || "2024-09-11T00:00:00Z")
  const now = new Date()
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const specialUtc = Date.UTC(special.getUTCFullYear(), special.getUTCMonth(), special.getUTCDate())
  return Math.max(0, Math.floor((todayUtc - specialUtc) / 86400000))
}

export default function AnniversaryScreen({ onNext, anniversaryDate, partnerName, anniversaryTitle, anniversarySubtitle }) {
  const [displayedDays, setDisplayedDays] = useState(0)
  const targetDays = getDaysDiff(anniversaryDate)
  const btnRef = useMagneticButton()

  useEffect(() => {
    if (targetDays === 0) return
    let start = null
    const duration = 1800

    const step = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayedDays(Math.floor(eased * targetDays))
      if (progress < 1) requestAnimationFrame(step)
      else setDisplayedDays(targetDays)
    }

    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [targetDays])

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    onNext()
  }

  return (
    <ScreenContainer>
      <div className="text-center max-w-3xl mx-auto relative z-10 px-4">
        {/* Bobbing GIF */}
        <motion.div
          className="mb-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.2 }}
        >
          <div
            className="bob w-36 h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden glass"
            style={{ boxShadow: "0 0 40px rgba(225,29,72,0.3), 0 0 80px rgba(225,29,72,0.1)" }}
          >
            <img
              src="/templates/anniversary-romantic/gifs/anniversary.gif"
              alt="Anniversary"
              loading="lazy"
              className="w-28 md:w-32 object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.4 }}
        >
          <span style={{ color: "#fda4af" }}>{anniversaryTitle || "Happy Anniversary"} </span>
          <span style={{ color: "#fbbf24" }}>{partnerName || "Cutiepiee"}</span>
          <span style={{ color: "#fda4af" }}> 💖</span>
        </motion.h1>

        {/* Counter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p
            className="text-xl md:text-2xl mb-4"
            style={{ color: "rgba(248,250,252,0.65)", fontFamily: "Inter, sans-serif" }}
          >
            We've been together for
          </p>

          <motion.div
            className="relative inline-flex items-end gap-3 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...SPRING, delay: 0.9 }}
          >
            <motion.span
              className="font-display font-bold leading-none"
              style={{
                fontSize: "clamp(5rem, 20vw, 9rem)",
                background: "linear-gradient(135deg, #e11d48 0%, #fbbf24 60%, #fda4af 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(225,29,72,0.5))",
              }}
              animate={{ filter: ["drop-shadow(0 0 20px rgba(225,29,72,0.4))", "drop-shadow(0 0 40px rgba(251,191,36,0.6))", "drop-shadow(0 0 20px rgba(225,29,72,0.4))"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              {displayedDays}
            </motion.span>
          </motion.div>

          <p
            className="text-xl md:text-2xl"
            style={{ color: "rgba(248,250,252,0.65)", fontFamily: "Inter, sans-serif" }}
          >
            {anniversarySubtitle || "days and counting... 🌹"}
          </p>
        </motion.div>

        {/* Bouncy CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 1.5 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <button
            ref={btnRef}
            onClick={handleClick}
            className="shimmer-sweep relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg text-white glow-rose"
            style={{
              background: "linear-gradient(135deg, #d946ef, #e11d48)",
              minWidth: 260,
              minHeight: 56,
              fontFamily: "Inter, sans-serif",
              transition: "transform 0.2s ease",
            }}
          >
            <span className="relative z-10">Continue Our Story 💫</span>
          </button>
        </motion.div>
      </div>
    </ScreenContainer>
  )
}
