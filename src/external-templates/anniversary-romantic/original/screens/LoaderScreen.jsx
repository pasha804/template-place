"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

export default function LoaderScreen({ onComplete, loaderHeading }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <ScreenContainer>
      <div className="flex flex-col items-center gap-8 text-center relative z-10">

        {/* 3D heart merge animation */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Left half */}
          <motion.div
            initial={{ x: -60, opacity: 0, rotateY: -90 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            transition={{ ...SPRING, delay: 0.3 }}
            style={{ fontSize: 72, position: "absolute", filter: "drop-shadow(0 0 20px #e11d48)" }}
          >
            🩷
          </motion.div>

          {/* Right half — merges in from other side */}
          <motion.div
            initial={{ x: 60, opacity: 0, rotateY: 90 }}
            animate={{ x: 0, opacity: 0, rotateY: 0 }}
            transition={{ ...SPRING, delay: 0.3 }}
            style={{ fontSize: 72, position: "absolute" }}
          />

          {/* Golden flash on merge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2.5, 0], opacity: [0, 0.9, 0] }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "9999px",
              background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, transparent 70%)",
            }}
          />

          {/* Final pulsing heart */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ ...SPRING, delay: 1.0 }}
            style={{ fontSize: 80, position: "absolute", filter: "drop-shadow(0 0 24px #e11d48)" }}
          >
            <motion.span
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              💖
            </motion.span>
          </motion.div>
        </div>

        {/* Shimmer text */}
        <motion.h1
          className="shimmer-text text-2xl md:text-3xl font-bold font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {loaderHeading || "Preparing something magical..."}
        </motion.h1>

        {/* Glowing dots progress indicator */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: "#e11d48" }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>
    </ScreenContainer>
  )
}
