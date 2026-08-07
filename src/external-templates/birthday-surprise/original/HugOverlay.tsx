// @ts-nocheck
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"

export default function HugOverlay({ show, onClose, gifUrl }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
          style={{ background: "rgba(0,0,0,0.93)", backdropFilter: "blur(12px)" }}
        >
          {/* Ambient red glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(160,0,0,0.3) 0%, transparent 65%)" }} />

          {/* Floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute pointer-events-none"
              style={{
                left: `${10 + i * 10}%`,
                top: `${15 + (i % 3) * 28}%`,
                color: `rgba(200,30,30,${0.3 + (i % 3) * 0.15})`,
              }}
              animate={{ y: [-15, 15, -15], rotate: [0, 360], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              {i % 2 === 0 ? <Heart size={12} fill="currentColor" /> : <Sparkles size={10} />}
            </motion.div>
          ))}

          <motion.div
            initial={{ scale: 0, y: 150 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -100 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], type: "spring" }}
            className="relative max-w-sm w-full rounded-3xl p-7 text-center overflow-hidden"
            style={{
              background: "linear-gradient(160deg, rgba(50,0,0,0.97) 0%, rgba(20,0,0,0.99) 100%)",
              border: "1px solid rgba(200,0,0,0.3)",
              boxShadow: "0 0 60px rgba(160,0,0,0.3), 0 30px 60px rgba(0,0,0,0.7)",
            }}
          >
            {/* Top strip */}
            <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(140,0,0,0.12), transparent)" }} />

            <motion.div
              className="flex justify-center mb-5 relative z-10"
              animate={{ filter: ["drop-shadow(0 0 15px rgba(200,0,0,0.6))", "drop-shadow(0 0 30px rgba(220,30,30,0.9))", "drop-shadow(0 0 15px rgba(200,0,0,0.6))"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img src={gifUrl || "/templates/birthday-surprise/gifs/hug.gif"} className="w-36 md:w-44" alt="birthday hug" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              className="text-2xl font-black mb-3 relative z-10"
              style={{ color: "rgba(255,255,255,0.92)" }}
            >
              Birthday Hugs! 🎂
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="text-base font-medium mb-7 relative z-10 leading-relaxed"
              style={{ color: "rgba(255,180,180,0.75)" }}
            >
              Sending you the biggest birthday hug…
              because you deserve all the love in the world!
              <br />
              <Heart size={16} fill="currentColor" className="inline mt-1" style={{ color: "rgba(220,60,60,0.8)" }} />
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.9, type: "spring" }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="relative px-10 py-3.5 text-base font-semibold rounded-full overflow-hidden z-10"
              style={{
                background: "linear-gradient(135deg, rgba(160,0,0,0.9), rgba(90,0,0,0.95))",
                border: "1px solid rgba(255,100,100,0.3)",
                boxShadow: "0 0 25px rgba(160,0,0,0.35)",
                color: "rgba(255,210,210,0.95)",
              }}
            >
              <span className="flex items-center gap-2">
                I feel it!
                <Heart size={16} fill="currentColor" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
