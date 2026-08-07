// @ts-nocheck
"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function FirstScreen({ onNext, subText, buttonText, gifUrl }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* ── big ambient glow behind the circle ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 320, height: 320,
          borderRadius: "50%",
          top: "50%", left: "50%",
          transform: "translate(-50%, -68%)",
          background: "radial-gradient(ellipse, rgba(180,0,0,0.55) 0%, rgba(120,0,0,0.3) 40%, transparent 70%)",
          filter: "blur(28px)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* ── floating micro-particles ── */}
      {[...Array(14)].map((_, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + (i % 3), height: 2 + (i % 3),
            left: `${5 + i * 6.5}%`, top: `${8 + (i % 6) * 14}%`,
            background: i % 2 === 0 ? "rgba(210,30,30,0.5)" : "rgba(255,140,140,0.3)",
          }}
          animate={{ y: [-16, 16, -16], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 3.2 + i * 0.3, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}

      {/* ── BIG circle avatar ── matches screenshot exactly ── */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], type: "spring", bounce: 0.3 }}
        className="relative mb-10 z-10"
      >
        {/* outer red ring glow */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 40px rgba(180,0,0,0.6), 0 0 80px rgba(160,0,0,0.3)",
              "0 0 70px rgba(200,10,10,0.85), 0 0 130px rgba(160,0,0,0.45)",
              "0 0 40px rgba(180,0,0,0.6), 0 0 80px rgba(160,0,0,0.3)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ borderRadius: "50%" }}
        />

        {/* the circle itself — large, dark, with bright red border glow */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            width: 220, height: 220,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 30%, #2a0000 0%, #0d0000 70%, #000 100%)",
            border: "2.5px solid rgba(180,0,0,0.65)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* GIF fills the circle */}
          <img
            src={gifUrl || "/templates/birthday-surprise/gifs/heppi.gif"}
            alt="birthday"
            className="w-full h-full object-cover"
            style={{ borderRadius: "50%" }}
          />

          {/* subtle inner bottom shadow so it looks deep */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
        </div>

        {/* sparkle stars around the circle — visible in reference */}
        {[
          { top: "8%",  left: "72%", size: 14, delay: 0 },
          { top: "18%", left: "15%", size: 10, delay: 0.4 },
          { top: "72%", left: "78%", size: 8,  delay: 0.8 },
        ].map((s, i) => (
          <motion.div key={i}
            className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left, color: "#fbbf24", fontSize: s.size }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 20, 0] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: s.delay }}
          >
            ✦
          </motion.div>
        ))}
      </motion.div>

      {/* ── Text block ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9 }}
        className="mb-10 space-y-2 relative z-10"
      >
        {/* Main heading — large, white, bold */}
        <h1
          className="font-black leading-tight"
          style={{
            fontSize: "clamp(2rem, 8vw, 2.8rem)",
            color: "rgba(255,255,255,0.95)",
            textShadow: "0 0 30px rgba(200,20,20,0.5)",
          }}
        >
          Happy Birthday! 🎂
        </h1>

        {/* Sub text — italic, muted red-white */}
        <motion.p
          className="font-semibold"
          style={{
            fontSize: "clamp(1rem, 4.5vw, 1.3rem)",
            color: "rgba(255,175,175,0.72)",
            fontStyle: "italic",
          }}
          animate={{ opacity: [0.65, 0.95, 0.65] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          {subText || "I have something special for you 🎁"}
        </motion.p>
      </motion.div>

      {/* ── Button — pill shape, dark red, exactly like reference ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.8, type: "spring", bounce: 0.45 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative z-10 overflow-hidden"
        style={{
          padding: "14px 42px",
          borderRadius: 999,
          background: "linear-gradient(135deg, #b50000 0%, #7a0000 100%)",
          border: "1px solid rgba(255,100,100,0.3)",
          boxShadow: "0 0 32px rgba(180,0,0,0.55), 0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
          fontSize: "1.05rem",
          fontWeight: 700,
          fontStyle: "italic",
          color: "rgba(255,220,220,0.95)",
          letterSpacing: "0.02em",
          cursor: "pointer",
        }}
      >
        {/* inner shimmer pulse */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-full"
          animate={{ opacity: [0, 0.18, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,140,140,0.5), transparent 65%)" }}
        />

        <span className="relative z-10 flex items-center gap-2">
          {buttonText || "Open your surprise"}
          <Heart size={17} fill="currentColor" />
        </span>
      </motion.button>

    </div>
  )
}
