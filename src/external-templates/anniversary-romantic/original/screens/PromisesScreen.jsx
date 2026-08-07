"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

const DEFAULT_PROMISES = [
  {
    seal: "🕯️",
    text: "I promise to always listen, even when it's hard.",
    sub: "Through every storm, my ears and heart are yours.",
    delay: 0.2,
    bobOffset: 0,
  },
  {
    seal: "😄",
    text: "I promise to make you laugh every single day.",
    sub: "Life is better when it's full of your laughter.",
    delay: 0.45,
    bobOffset: 0.8,
  },
  {
    seal: "🤝",
    text: "I promise to always be your safe place.",
    sub: "No matter what the world throws at you, I've got you.",
    delay: 0.7,
    bobOffset: 1.6,
  },
  {
    seal: "💍",
    text: "I promise to choose you, over and over again.",
    sub: "Every single day, in every single moment.",
    delay: 0.95,
    bobOffset: 2.4,
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

export default function PromisesScreen({ onNext, promises: customPromises, title, subtitle }) {
  const PROMISES = customPromises && customPromises.length > 0 ? customPromises : DEFAULT_PROMISES
  const btnRef = useMagneticButton()

  const handleClick = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    onNext()
  }

  return (
    <ScreenContainer>
      <div className="w-full max-w-2xl mx-auto relative z-10 px-4 flex flex-col items-center">

        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold text-center mb-2 leading-tight"
          style={{ color: "#fbbf24" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          {title || "My Vows To You"}
        </motion.h1>

        <motion.p
          className="mb-10 text-sm text-center"
          style={{ color: "rgba(248,250,252,0.4)", fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle || "Written from the deepest part of my heart 💛"}
        </motion.p>

        {/* Floating promise cards */}
        <div className="flex flex-col gap-5 w-full">
          {PROMISES.map((promise, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ ...SPRING, delay: promise.delay }}
              style={{
                border: "1px solid rgba(251,191,36,0.18)",
                boxShadow: "0 0 30px rgba(251,191,36,0.08), 0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Subtle inner glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.3), transparent)",
                }}
              />

              {/* Wax seal / icon */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: promise.bobOffset,
                }}
                className="flex-shrink-0 w-12 h-12 rounded-full wax-seal flex items-center justify-center text-xl"
                style={{ minWidth: 48, minHeight: 48 }}
                aria-hidden="true"
              >
                {promise.seal}
              </motion.div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <p
                  className="font-semibold text-base leading-snug"
                  style={{ color: "#f8fafc", fontFamily: "Playpen Sans Deva, cursive" }}
                >
                  {promise.text}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(253,164,175,0.7)", fontFamily: "Inter, sans-serif" }}
                >
                  {promise.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 1.6 }}
          className="mt-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            ref={btnRef}
            onClick={handleClick}
            className="shimmer-sweep relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg text-white glow-gold"
            style={{
              background: "linear-gradient(135deg, #fbbf24, #e11d48)",
              minWidth: 260,
              minHeight: 56,
              fontFamily: "Inter, sans-serif",
              transition: "transform 0.2s ease",
            }}
          >
            <span className="relative z-10">Read My Heart 💌</span>
          </button>
        </motion.div>
      </div>
    </ScreenContainer>
  )
}
