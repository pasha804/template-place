// @ts-nocheck
"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Heart, Sparkles, X } from "lucide-react"

const darkBg = {
  background: "radial-gradient(ellipse at 50% 0%, #3d0000 0%, #1a0000 45%, #000 100%)",
}

export default function FourthScreen({ onShowOverlay, heading, letterText }) {
  const [sealOpen, setSealOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [showButton, setShowButton] = useState(false)
  const scrollRef = useRef(null)

  const DEFAULT_LETTER = `Happy Birthday, Love ❤️

You are the most beautiful part of my life, and I'm so lucky to have you. Your smile makes my days better, and your presence makes everything feel special.

I hope your birthday is filled with happiness, love, and endless smiles. You deserve every good thing this world has to offer, and so much more.

From the very first moment I met you, you brought something irreplaceable into my life. Your laugh is contagious, your kindness is endless, and just being around you makes every day feel a little more magical.

Always stay happy — because your happiness means a lot to me. ❤️`

  const birthdayLetter = letterText || DEFAULT_LETTER

  useEffect(() => {
    if (!sealOpen) return
    let index = 0
    const timer = setInterval(() => {
      if (index < birthdayLetter.length) {
        setDisplayedText(birthdayLetter.slice(0, index + 1))
        index++
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      } else {
        clearInterval(timer)
        setTimeout(() => setShowButton(true), 600)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [sealOpen])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-10 relative overflow-hidden" style={{ background: "transparent" }}>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(160,0,0,0.3) 0%, transparent 70%)", filter: "blur(45px)" }} />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
            left: `${6 + i * 9}%`, top: `${10 + (i % 5) * 17}%`,
            background: "rgba(200,30,30,0.4)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-6 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-black" style={{ color: "rgba(255,255,255,0.92)" }}>
          {heading || "A Letter, Just For You"}
        </h2>
        <p className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,130,130,0.5)", letterSpacing: "0.18em" }}>
          {sealOpen ? "from my heart to yours" : "Tap the heart to unseal your message..."}
        </p>
      </motion.div>

      {!sealOpen ? (
        /* Sealed envelope / heart button */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center gap-5"
        >
          <motion.button
            onClick={() => setSealOpen(true)}
            whileTap={{ scale: 0.92 }}
            className="relative w-40 h-40 rounded-3xl flex flex-col items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(100,0,0,0.9), rgba(50,0,0,0.95))",
              border: "1px solid rgba(200,0,0,0.4)",
              boxShadow: "0 0 40px rgba(180,0,0,0.35), 0 20px 40px rgba(0,0,0,0.6)",
            }}
            animate={{ boxShadow: ["0 0 30px rgba(180,0,0,0.3)", "0 0 55px rgba(200,0,0,0.55)", "0 0 30px rgba(180,0,0,0.3)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], filter: ["drop-shadow(0 0 8px rgba(220,40,40,0.6))", "drop-shadow(0 0 20px rgba(220,40,40,0.9))", "drop-shadow(0 0 8px rgba(220,40,40,0.6))"] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: "rgba(220,60,60,0.9)" }}
            >
              <Heart size={48} fill="currentColor" />
            </motion.div>
            <p className="text-[10px] tracking-[0.2em] mt-3"
              style={{ color: "rgba(255,150,150,0.6)" }}>OPENING LETTER...</p>
          </motion.button>

          {/* Progress dot line */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="w-1 h-1 rounded-full"
                style={{ background: "rgba(200,0,0,0.5)" }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </div>
        </motion.div>

      ) : (
        /* Letter */
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg relative z-10"
        >
          {/* Corner sparkles */}
          <div className="absolute -top-3 -left-3" style={{ color: "rgba(220,60,60,0.6)" }}><Heart size={18} fill="currentColor" /></div>
          <div className="absolute -top-3 -right-3" style={{ color: "rgba(180,30,30,0.5)" }}><Sparkles size={16} /></div>
          <div className="absolute -bottom-3 -left-3" style={{ color: "rgba(180,30,30,0.5)" }}><Sparkles size={14} /></div>
          <div className="absolute -bottom-3 -right-3" style={{ color: "rgba(220,60,60,0.6)" }}><Heart size={16} fill="currentColor" /></div>

          <div className="rounded-3xl p-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(50,0,0,0.97) 0%, rgba(25,0,0,0.99) 100%)",
              border: "1px solid rgba(180,0,0,0.35)",
              boxShadow: "0 0 50px rgba(150,0,0,0.25), 0 20px 50px rgba(0,0,0,0.7)",
            }}>
            {/* Header inside */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-black tracking-widest" style={{ color: "rgba(255,255,255,0.85)" }}>JUST FOR YOU ✦</p>
                <p className="text-[10px] tracking-widest" style={{ color: "rgba(255,130,130,0.4)" }}>from my heart to yours</p>
              </div>
              <button onClick={() => { setSealOpen(false); setDisplayedText(""); setShowButton(false) }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "rgba(120,0,0,0.6)", border: "1px solid rgba(200,0,0,0.3)" }}>
                <X size={13} style={{ color: "rgba(255,150,150,0.8)" }} />
              </button>
            </div>

            <div ref={scrollRef}
              className="overflow-y-auto relative z-10"
              style={{ maxHeight: "300px", scrollBehavior: "smooth" }}>
              <p className="text-[15px] whitespace-pre-line font-medium leading-relaxed"
                style={{ color: "rgba(255,210,210,0.9)" }}>
                {displayedText}
                {displayedText.length !== birthdayLetter.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-4 ml-0.5 rounded-full"
                    style={{ background: "rgba(220,60,60,0.8)", verticalAlign: "middle" }}
                  />
                )}
              </p>
            </div>

            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-between items-center mt-5 pt-4"
                style={{ borderTop: "1px solid rgba(180,0,0,0.2)" }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onShowOverlay}
                  className="text-sm font-semibold tracking-widest flex items-center gap-1.5 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(160,0,0,0.6)",
                    border: "1px solid rgba(220,60,60,0.4)",
                    color: "rgba(255,180,180,0.9)",
                  }}>
                  <Heart size={13} fill="currentColor" />
                  CELEBRATE
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSealOpen(false); setDisplayedText(""); setShowButton(false) }}
                  className="text-sm font-semibold tracking-widest flex items-center gap-1.5 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(60,0,0,0.6)",
                    border: "1px solid rgba(180,0,0,0.3)",
                    color: "rgba(255,140,140,0.7)",
                  }}>
                  RESTART ↺
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  )
}
