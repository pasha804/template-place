"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const LETTER_TEXT = `Dear My Love,

From the moment I met you, I knew my life was about to change forever.

You're not just someone special to me — you're my best friend, my confidant, my partner in every adventure, and my favorite person in the entire world.

Every day with you feels like a blessing, and I promise to cherish every single moment we have together.

Your smile lights up my darkest days,
your laugh is my favorite melody,
and your happiness is my greatest priority.

I love you more than words could ever express.

Forever yours 💕`

export default function Gift2Screen({ onBack }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    // Start typewriter after card appears
    const startDelay = setTimeout(() => {
      setIsTyping(true)
    }, 900)
    return () => clearTimeout(startDelay)
  }, [])

  useEffect(() => {
    if (!isTyping) return
    timerRef.current = setInterval(() => {
      if (indexRef.current < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(timerRef.current)
        setIsTyping(false)
        setIsDone(true)
      }
    }, 30)
    return () => clearInterval(timerRef.current)
  }, [isTyping])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={18} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">

        {/* ── Heading ── */}
        <motion.h1
          className="gradient-text text-3xl md:text-5xl font-bold text-center mb-8"
          style={{ fontFamily: "'Shantell Sans', cursive" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A Letter For You 💝
        </motion.h1>

        {/* ── Elegant letter card ── */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: "40px 36px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Subtle corner glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "rgba(236,72,153,0.08)", filter: "blur(40px)" }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: "rgba(124,58,237,0.08)", filter: "blur(40px)" }}
          />

          {/* Letter content */}
          <div
            className="relative z-10 text-left leading-relaxed whitespace-pre-wrap text-base md:text-lg"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "'Shantell Sans', cursive",
              lineHeight: 1.8,
              minHeight: 200,
            }}
          >
            {displayedText}
            {/* Blinking cursor while typing */}
            {!isDone && isTyping && (
              <span className="typewriter-cursor" />
            )}
          </div>

          {/* 💕 emoji after done */}
          {isDone && (
            <motion.div
              className="text-center text-2xl mt-6"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              💕
            </motion.div>
          )}
        </motion.div>

        {/* ── Back button ── */}
        <motion.div
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <PremiumButton onClick={onBack} variant="secondary">
            ← Back
          </PremiumButton>
        </motion.div>
      </div>
    </motion.div>
  )
}
