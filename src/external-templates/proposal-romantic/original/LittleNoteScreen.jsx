"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const DEFAULT_NOTE_TEXT = `My Dearest,

I know I don't say this enough — but you mean absolutely everything to me.

You're the first thought that comes to my mind when I wake up,
and the last smile I feel before I fall asleep.

Your laugh is my favorite sound in this entire world.
Your smile is my favorite sight.
And your happiness is my biggest priority in life.

Thank you for just being you.
Thank you for letting me see the real you.
Thank you for making me feel something so real, so pure.

I promise to always be there for you.
To protect you, support your dreams,
to make you laugh even on your hardest days,
and to love you with everything I have.

I love you today, tomorrow, and every day after forever.

Yours always ❤️`

export default function LittleNoteScreen({ onNext, letterText }) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const indexRef = useRef(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const startDelay = setTimeout(() => setIsTyping(true), 800)
    return () => clearTimeout(startDelay)
  }, [isOpen])

  useEffect(() => {
    if (!isTyping) return
    const textToType = letterText || DEFAULT_NOTE_TEXT
    timerRef.current = setInterval(() => {
      if (indexRef.current < textToType.length) {
        setDisplayedText(textToType.slice(0, indexRef.current + 1))
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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10 overflow-hidden">
      <PremiumBackground particleCount={20} />

      <div className="relative z-10 w-full max-w-lg mx-auto">

        {/* ── Heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gradient-text text-3xl md:text-5xl font-bold text-center mb-10"
          style={{ fontFamily: "'Shantell Sans', cursive" }}
        >
          A Little Note For You
        </motion.h1>

        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">

            {/* ── Closed envelope ── */}
            {!isOpen && (
              <motion.button
                key="envelope"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="relative w-72 cursor-pointer"
                style={{ outline: "none", background: "none", border: "none" }}
              >
                {/* Envelope body */}
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(124,58,237,0.25))",
                    border: "1px solid rgba(244,114,182,0.4)",
                    boxShadow: "0 0 30px rgba(236,72,153,0.2), 0 10px 40px rgba(0,0,0,0.4)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Flap */}
                  <div
                    className="w-full h-20 relative flex items-start justify-center overflow-hidden"
                    style={{
                      background: "linear-gradient(180deg, rgba(236,72,153,0.35), rgba(236,72,153,0.15))",
                    }}
                  >
                    {/* V-fold triangle */}
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "144px solid transparent",
                        borderRight: "144px solid transparent",
                        borderTop: "70px solid rgba(124,58,237,0.4)",
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="p-8 flex flex-col items-center gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Heart className="w-16 h-16 fill-current" style={{ color: "#ec4899", filter: "drop-shadow(0 0 12px rgba(236,72,153,0.6))" }} />
                    </motion.div>
                    <p
                      className="font-semibold text-lg"
                      style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Shantell Sans', cursive" }}
                    >
                      Tap to open 💌
                    </p>
                  </div>
                </div>
              </motion.button>
            )}

            {/* ── Open letter ── */}
            {isOpen && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="w-full"
              >
                <div
                  className="relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 24,
                    padding: "36px 32px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  }}
                >
                  {/* Glow corners */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(236,72,153,0.08)", filter: "blur(40px)" }} />
                  <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.08)", filter: "blur(40px)" }} />

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
                    {!isDone && isTyping && <span className="typewriter-cursor" />}
                  </div>

                  {isDone && (
                    <motion.div
                      className="text-center text-2xl mt-6"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ display: "inline-block" }}
                      >
                        ❤️
                      </motion.span>
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8 flex justify-center"
                >
                  <PremiumButton onClick={onNext}>
                    One more thing →
                  </PremiumButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
