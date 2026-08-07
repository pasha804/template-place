// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

/*
  IntroScreen — plays once after the PIN is unlocked, before FirstScreen.

  Sequence (auto-advances, no button needed):
    0.0s  — black screen, red ring expands from centre
    0.4s  — "FOR YOU" letter-by-letter reveal
    1.2s  — sub-line fades in ("something special is waiting…")
    2.0s  — floating hearts rain down
    3.2s  — big name / greeting bursts in
    4.5s  — whole screen fades out → onDone() called
*/

const WORD = "FOR YOU"
const LETTERS = WORD.split("")

export default function IntroScreen({ onDone }) {
  const [phase, setPhase] = useState(0)
  // 0 = ring + letters  |  1 = sub line  |  2 = hearts  |  3 = name  |  4 = exit

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4600),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // when phase 4 starts, wait for exit animation then call onDone
  useEffect(() => {
    if (phase !== 4) return
    const t = setTimeout(onDone, 900)
    return () => clearTimeout(t)
  }, [phase, onDone])

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#000" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >

          {/* ── expanding ring burst on entry ── */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{ border: "1.5px solid rgba(200,0,0,0.55)" }}
              initial={{ width: 60, height: 60, opacity: 0.9 }}
              animate={{ width: [60, 700], height: [60, 700], opacity: [0.85, 0] }}
              transition={{ duration: 1.6, delay: i * 0.16, ease: "easeOut" }}
            />
          ))}

          {/* ── red radial glow ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.3] }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(180,0,0,0.5) 0%, rgba(80,0,0,0.25) 45%, transparent 70%)",
            }}
          />

          {/* ── floating micro-particles ── */}
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={`p${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 2 + (i % 3),
                height: 2 + (i % 3),
                left: `${4 + i * 5.3}%`,
                top: `${6 + (i % 7) * 13}%`,
                background:
                  i % 2 === 0
                    ? "rgba(210,30,30,0.55)"
                    : "rgba(255,140,140,0.3)",
              }}
              animate={{ y: [-18, 18, -18], opacity: [0.15, 0.7, 0.15] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.14,
              }}
            />
          ))}

          {/* ── centre content wrapper ── */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">

            {/* ── "FOR YOU" letter-by-letter ── */}
            <div className="flex gap-[6px] items-end">
              {LETTERS.map((char, i) =>
                char === " " ? (
                  <span key={i} className="w-4 inline-block" />
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, scale: 0.5, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.55,
                      delay: 0.18 + i * 0.09,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "spring",
                      bounce: 0.4,
                    }}
                    style={{
                      fontSize: "clamp(2.8rem, 14vw, 5.5rem)",
                      fontWeight: 900,
                      lineHeight: 1,
                      color: "rgba(255,255,255,0.95)",
                      textShadow:
                        "0 0 40px rgba(200,20,20,0.7), 0 0 80px rgba(160,0,0,0.4)",
                      display: "inline-block",
                    }}
                  >
                    {char}
                  </motion.span>
                )
              )}
            </div>

            {/* ── animated underline ── */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
              style={{
                height: 2,
                width: "clamp(140px, 40vw, 260px)",
                borderRadius: 2,
                background:
                  "linear-gradient(to right, transparent, rgba(200,30,30,0.9), transparent)",
                transformOrigin: "center",
              }}
            />

            {/* ── sub-line ── */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{
                    fontSize: "clamp(0.85rem, 3.5vw, 1.1rem)",
                    color: "rgba(255,160,160,0.65)",
                    fontStyle: "italic",
                    letterSpacing: "0.06em",
                  }}
                >
                  something special is waiting…
                </motion.p>
              )}
            </AnimatePresence>

            {/* ── raining hearts row ── */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative flex gap-3 items-center justify-center mt-1"
                >
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -30, opacity: 0, scale: 0 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: i * 0.08,
                        duration: 0.5,
                        type: "spring",
                        bounce: 0.55,
                      }}
                      style={{
                        color: `rgba(${i % 2 === 0 ? "220,40,40" : "255,130,130"},${0.5 + (i % 3) * 0.15})`,
                      }}
                    >
                      {i % 3 === 2 ? (
                        <Sparkles size={14 + (i % 2) * 4} />
                      ) : (
                        <Heart
                          size={14 + (i % 3) * 5}
                          fill="currentColor"
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── big "Happy Birthday!" name burst ── */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.4, y: 30, filter: "blur(16px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    bounce: 0.3,
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  <motion.p
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(200,30,30,0.5)",
                        "0 0 50px rgba(220,30,30,0.9)",
                        "0 0 20px rgba(200,30,30,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      fontSize: "clamp(1.6rem, 7vw, 2.6rem)",
                      fontWeight: 900,
                      color: "rgba(255,255,255,0.95)",
                      letterSpacing: "0.02em",
                    }}
                  >
                   
                  </motion.p>

                  {/* shimmer bar below */}
                  <motion.div
                    className="relative overflow-hidden rounded-full"
                    style={{
                      height: 3,
                      width: "clamp(180px, 55vw, 320px)",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-y-0 w-1/3 rounded-full"
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(200,40,40,0.9), transparent)",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── corner sparkles ── */}
          {[
            { top: "8%",  left: "8%",  size: 16, delay: 0.3 },
            { top: "9%",  right: "9%", size: 12, delay: 0.6 },
            { bottom: "10%", left: "7%",  size: 13, delay: 0.9 },
            { bottom: "9%",  right: "8%", size: 16, delay: 0.5 },
          ].map((s, i) => (
            <motion.div
              key={`c${i}`}
              className="absolute pointer-events-none"
              style={{ ...s, color: "rgba(220,60,60,0.6)" }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.4, 1.3, 0.4],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                delay: s.delay,
              }}
            >
              ✦
            </motion.div>
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  )
}
