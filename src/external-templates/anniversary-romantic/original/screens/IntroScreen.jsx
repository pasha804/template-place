"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

function useMagneticButton() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.25
      const dy = (e.clientY - cy) * 0.25
      el.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0,0)" }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return ref
}

export default function IntroScreen({
  onNext,
  partnerName,
  introHeading,
  introGifUrl,
  introSubtext,
  introButtonText,
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const btnRef = useMagneticButton()
  const headingText = introHeading || (partnerName ? `Happy Anniversary, ${partnerName}!` : "It's Our Special Day")
  const gifSrc = introGifUrl || "/templates/anniversary-romantic/gifs/intro.gif"
  const subtext = introSubtext || "I made something special for you..."
  const btnText = introButtonText || "Start Our Journey ✨"

  useEffect(() => {
    const onMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    onNext()
  }

  return (
    <ScreenContainer>
      <div className="text-center max-w-2xl mx-auto relative z-10 px-4">

        {/* Letter-by-letter heading */}
        <motion.h1
          className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight"
          style={{ color: "#fda4af" }}
        >
          {headingText.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...SPRING, delay: 0.05 * i }}
              style={{ display: char === " " ? "inline" : "inline-block" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* GIF inside glowing rotating ring */}
        <motion.div
          className="mb-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 0.8 }}
          style={{
            x: mousePos.x * 0.4,
            y: mousePos.y * 0.4,
          }}
        >
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Rotating golden/pink ring */}
            <div
              className="ring-rotate absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #e11d48, #fbbf24, #d946ef, #fbbf24, #e11d48)",
                padding: "3px",
                borderRadius: "9999px",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "#0a0a12" }}
              />
            </div>

            {/* Inner glow ring */}
            <div
              className="absolute inset-2 rounded-full"
              style={{ boxShadow: "0 0 30px rgba(251,191,36,0.4), 0 0 60px rgba(225,29,72,0.2)" }}
            />

            {/* GIF */}
            <img
              src={gifSrc}
              alt="Cute romantic illustration"
              loading="lazy"
              className="relative z-10 w-28 h-28 object-cover rounded-full"
            />
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-xl md:text-2xl mb-12"
          style={{ color: "rgba(248,250,252,0.65)", fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {subtext}
        </motion.p>

        {/* Magnetic shimmer button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <button
            ref={btnRef}
            onClick={handleClick}
            className="shimmer-sweep relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg text-white transition-all duration-300 glow-rose"
            style={{
              background: "linear-gradient(135deg, #e11d48, #d946ef)",
              minWidth: 220,
              minHeight: 56,
              fontFamily: "Inter, sans-serif",
              transition: "transform 0.2s ease",
            }}
          >
            <span className="relative z-10">{btnText}</span>
          </button>
        </motion.div>
      </div>
    </ScreenContainer>
  )
}
