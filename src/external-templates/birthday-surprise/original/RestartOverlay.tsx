// @ts-nocheck
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, RotateCw } from "lucide-react"

export default function RestartOverlay({ show, onRestart }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-6 overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% 0%, #3d0000 0%, #1a0000 45%, #000 100%)" }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(160,0,0,0.4) 0%, transparent 70%)", filter: "blur(45px)" }} />

          {/* Floating particles */}
          {[...Array(14)].map((_, i) => (
            <motion.div key={i} className="absolute rounded-full pointer-events-none"
              style={{
                width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
                left: `${5 + i * 6.5}%`, top: `${8 + (i % 6) * 15}%`,
                background: i % 2 === 0 ? "rgba(220,40,40,0.55)" : "rgba(255,160,160,0.3)",
              }}
              animate={{ y: [-18, 18, -18], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3 + i * 0.35, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], type: "spring" }}
            className="text-center relative z-10 max-w-lg"
          >
            {/* Pulsing heart */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                scale: [1, 1.2, 1],
                filter: ["drop-shadow(0 0 25px rgba(200,0,0,0.6))", "drop-shadow(0 0 55px rgba(220,30,30,0.9))", "drop-shadow(0 0 25px rgba(200,0,0,0.6))"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ color: "rgba(220,60,60,0.9)" }}
            >
              <Heart size={72} fill="currentColor" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              className="text-4xl md:text-5xl font-black mb-4 leading-tight"
              style={{ color: "rgba(255,255,255,0.93)" }}
            >
              Happy Birthday,
              <br />
              <span style={{ color: "rgba(220,80,80,0.9)" }}>
                you amazing person!
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.2 }}
              className="text-lg font-medium mb-10 flex flex-col items-center gap-2"
              style={{ color: "rgba(255,160,160,0.65)" }}
            >
              Want to relive the magic once more?
              <Sparkles size={20} style={{ color: "rgba(200,60,60,0.7)" }} />
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1.2, type: "spring" }}
              whileHover={{ scale: 1.08, y: -6 }}
              whileTap={{ scale: 0.92 }}
              onClick={onRestart}
              className="px-12 py-4 rounded-full text-xl font-black overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(160,0,0,0.9), rgba(90,0,0,0.95))",
                border: "1px solid rgba(255,100,100,0.35)",
                boxShadow: "0 0 35px rgba(160,0,0,0.4), 0 15px 40px rgba(0,0,0,0.6)",
                color: "rgba(255,210,210,0.95)",
              }}
            >
              <span className="flex items-center gap-3">
                Celebrate Again
                <RotateCw size={22} />
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Heart size={22} fill="currentColor" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
