"use client"

import { motion } from "framer-motion"

// ── Perfect SVG heart — no shape issues ───────────────────────
function SVGHeart() {
  return (
    <motion.div
      className="relative z-10"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 22px rgba(225,29,72,0.75))" }}
    >
      {/* Left half assembles from left */}
      <svg
        width="80"
        height="76"
        viewBox="0 0 80 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="hg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fda4af" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <filter id="hglow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left lobe — slides in from left */}
        <motion.path
          d="M40 72 C40 72 2 48 2 22 C2 10 11 2 22 2 C30 2 37 7 40 14"
          fill="url(#hg1)"
          filter="url(#hglow)"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
        />

        {/* Right lobe — slides in from right */}
        <motion.path
          d="M40 72 C40 72 78 48 78 22 C78 10 69 2 58 2 C50 2 43 7 40 14"
          fill="url(#hg1)"
          filter="url(#hglow)"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.35 }}
        />

        {/* Shine highlight */}
        <motion.ellipse
          cx="28"
          cy="18"
          rx="7"
          ry="10"
          fill="rgba(255,255,255,0.35)"
          style={{ filter: "blur(2px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        />
      </svg>
    </motion.div>
  )
}

export default function Loader({ loaderHeading = "Preparing Something Magical...", loaderSubtext = "For someone very special ✨" }) {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6 }}
      key="loader"
    >
      <div className="text-center relative z-10 flex flex-col items-center gap-10">

        {/* Heart + rings assembly */}
        <div className="relative flex items-center justify-center w-44 h-44">

          {/* Outer spinning golden ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 130,
              height: 130,
              border: "2px solid transparent",
              borderTopColor: "#fbbf24",
              borderRightColor: "rgba(251,191,36,0.25)",
              borderBottomColor: "transparent",
              borderLeftColor: "rgba(251,191,36,0.1)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner counter-spinning purple ring */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 108,
              height: 108,
              border: "1px solid rgba(217,70,239,0.3)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* The heart */}
          <SVGHeart />

          {/* Pulse rings */}
          <motion.div
            className="absolute rounded-full border border-pink-500/30"
            style={{ width: 90, height: 90 }}
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute rounded-full border border-fuchsia-400/20"
            style={{ width: 90, height: 90 }}
            animate={{ scale: [1, 2.3], opacity: [0.35, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
          />

          {/* Gold sparkle dots orbiting */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "#fbbf24" : "#fda4af",
                top: "50%",
                left: "50%",
                marginTop: -3,
                marginLeft: -3,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "linear",
              }}
              initial={{
                translateX: Math.cos((deg * Math.PI) / 180) * 58,
                translateY: Math.sin((deg * Math.PI) / 180) * 58,
              }}
            />
          ))}
        </div>

        {/* Heading */}
        <div className="relative overflow-hidden rounded-xl px-2">
          <motion.h1
            className="font-heading text-3xl md:text-5xl font-bold animated-gradient-text py-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 15 }}
          >
            {loaderHeading}
          </motion.h1>
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
            animate={{ x: ["-120%", "120%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1 }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          className="text-white/50 text-base md:text-lg tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0.45, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          {loaderSubtext}
        </motion.p>

        {/* Progress dots */}
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="rounded-full bg-pink-500/60"
              style={{ width: 8, height: 8 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.28 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
