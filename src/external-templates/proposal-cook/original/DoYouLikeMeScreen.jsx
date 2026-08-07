"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import { useState, useEffect } from "react"

export default function DoYouLikeMeScreen({ onYes }) {
  const question = "Do you like me, Jana?"
  const words = question.split(" ")
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleNo = async () => {
    await console.log({
      title: "Please say yes, Jana! 🥺",
      text: "I really like you so much...",
      imageUrl: "/templates/proposal-cook/gif/please.gif",
      imageAlt: "Please gif",
      imageWidth: 150,
      background: "linear-gradient(135deg, #0d0008, #110008)",
      color: "#FFEDFF",
      timer: 3000,
      showConfirmButton: false,
    })
  }

  const handleYes = () => {
    setTimeout(() => {
      onYes()
    }, 500)
  }

  const handleMouseMove = (e) => {
    setMousePos({
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
    >
      {/* Layer 1: Base Premium Background */}
      <PremiumBackground particleCount={25} extraBright={true} />

      {/* Layer 2: Enhanced Background Particle System - Multiple Layers */}
      {/* Deep floating particles */}
      <div className="absolute inset-0 pointer-events-none z-5 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`deep-${i}`}
            className="absolute select-none"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-5%",
              fontSize: `${6 + Math.random() * 10}px`,
              opacity: 0.08 + Math.random() * 0.12,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, (Math.random() - 0.5) * 40, 0],
              rotate: [0, Math.random() * 720 - 360],
              scale: [1, 1.5, 0.7],
              opacity: [0.08, 0.25, 0.08],
            }}
            transition={{
              duration: 18 + Math.random() * 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 8,
            }}
          >
            {["💖", "✨", "💕", "🌹", "💫", "💗", "💝", "🌸", "💎", "💓"][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>

      {/* Mid-ground floating particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`mid-${i}`}
            className="absolute select-none"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-5%",
              fontSize: `${10 + Math.random() * 8}px`,
              opacity: 0.12 + Math.random() * 0.15,
              filter: "blur(0.5px) drop-shadow(0 0 15px rgba(168,85,247,0.5))",
            }}
            animate={{
              y: ["0vh", "-120vh"],
              x: [0, (Math.random() - 0.5) * 60, 0],
              rotate: [0, Math.random() * 720 - 360],
              scale: [1, 1.8, 0.6],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 14 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 6,
            }}
          >
            {["💖", "✨", "💕", "🌹", "💫", "💗", "💝", "🌸", "💎", "💓"][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
      </div>

      {/* Foreground large floating elements */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {[
          { e: "💖", size: "2rem", delay: 0, dur: 16 },
          { e: "✨", size: "1.6rem", delay: 2, dur: 14 },
          { e: "💕", size: "1.8rem", delay: 4, dur: 12 },
          { e: "🌹", size: "1.5rem", delay: 6, dur: 15 },
          { e: "💫", size: "1.7rem", delay: 8, dur: 13 },
          { e: "💗", size: "1.4rem", delay: 10, dur: 11 },
        ].map(({ e, size, delay, dur }, i) => (
          <motion.div
            key={`fg-${i}`}
            className="absolute select-none"
            style={{
              left: `${8 + i * 9}%`,
              bottom: "-8%",
              fontSize: size,
              opacity: 0.18 + (i % 4) * 0.06,
              filter: "blur(0.5px) drop-shadow(0 0 25px rgba(168,85,247,0.7))",
            }}
            animate={{
              y: ["0vh", "-130vh"],
              x: [0, (i % 2 === 0 ? 50 : -50), 0],
              rotate: [0, i % 2 === 0 ? 540 : -540],
              scale: [1, 1.6, 0.7],
              opacity: [0.15, 0.5, 0.15],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            {e}
          </motion.div>
        ))}
      </div>

      {/* Dynamic ambient light that follows mouse - purple theme */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-15"
        style={{
          background: `radial-gradient(ellipse 60% 80% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(168,85,247,0.15) 0%, transparent 70%)`,
          filter: "blur(100px)",
          transition: "all 0.5s ease-out",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary ambient orb - gold/rose theme */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-14"
        style={{
          background: `radial-gradient(ellipse 50% 70% at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, rgba(251,191,36,0.12) 0%, transparent 70%)`,
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div 
        className="glass-card relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-10 md:p-16 rounded-[50px]"
        initial={{ y: 60, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Enhanced inner glow with multiple layers - animated */}
        <motion.div
          className="absolute inset-0 rounded-[50px] pointer-events-none border border-white/25"
          style={{ boxShadow: "inset 0 0 60px rgba(168,85,247,0.18)" }}
          animate={{
            boxShadow: [
              "inset 0 0 60px rgba(168,85,247,0.18)",
              "inset 0 0 90px rgba(168,85,247,0.28)",
              "inset 0 0 60px rgba(168,85,247,0.18)"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-28 -right-28 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "rgba(168,85,247,0.18)", filter: "blur(70px)" }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.7, 1, 0.7],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-28 -left-28 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "rgba(225,29,72,0.15)", filter: "blur(70px)" }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.7, 1, 0.7],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full pointer-events-none"
          style={{ background: "rgba(251,191,36,0.12)", filter: "blur(50px)" }}
          animate={{ 
            scale: [1, 1.4, 1], 
            opacity: [0.4, 0.8, 0.4],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-28 h-28 rounded-full pointer-events-none"
          style={{ background: "rgba(52,211,153,0.1)", filter: "blur(40px)" }}
          animate={{ 
            scale: [1, 1.35, 1], 
            opacity: [0.3, 0.7, 0.3],
            x: [0, -15, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <motion.div
          className="mb-12 flex items-center justify-center relative z-10"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.3 }}
        >
          {/* Multiple outer glowing aura layers - 5 layers */}
          <>
          {[280, 250, 220, 190, 160].map((size, i) => (
            <motion.div
              key={`aura-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: size, height: size,
                background: `radial-gradient(circle, rgba(168,85,247,${0.2 - i * 0.035}) 0%, transparent 70%)`,
                filter: "blur(30px)",
              }}
              animate={{ 
                scale: [1, 1.25, 1], 
                opacity: [0.4, 0.9, 0.4] 
              }}
              transition={{ 
                duration: 4.5 + i * 0.4, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: i * 0.3 
              }}
            />
          ))}
          </>

          <div className="w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-purple-500/35 to-pink-500/35 flex items-center justify-center border-4 border-purple-400/70 relative z-10 shadow-[0_0_60px_rgba(168,85,247,0.6),_0_0_120px_rgba(236,72,153,0.35)] backdrop-blur-sm">
            <motion.div 
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.05, 1] }} 
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/templates/proposal-cook/gif/cute.gif" className="w-32 h-32 object-contain drop-shadow-2xl" alt="cute character" loading="lazy" />
            </motion.div>
          </div>

          {/* Enhanced orbiting elements around the gif - 6 elements */}
          {[
            { e: "💕", a: 0, size: "text-2xl", delay: 0 },
            { e: "✨", a: 60, size: "text-xl", delay: 0.3 },
            { e: "🌹", a: 120, size: "text-2xl", delay: 0.6 },
            { e: "💫", a: 180, size: "text-xl", delay: 0.9 },
            { e: "💎", a: 240, size: "text-xl", delay: 1.2 },
            { e: "💝", a: 300, size: "text-xl", delay: 1.5 },
          ].map(({ e, a, size, delay }, i) => {
            const angle = (a * Math.PI) / 180
            const radius = 100
            return (
              <motion.div
                key={`orbit-${i}`}
                className={`absolute select-none pointer-events-none ${size}`}
                style={{ 
                  left: "50%", 
                  top: "50%",
                  transform: `translate(${radius * Math.cos(angle) - 18}px, ${radius * Math.sin(angle) - 18}px)` 
                }}
                animate={{ 
                  scale: [1, 1.6, 1], 
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 240, 120, 0],
                  x: [0, 20 * Math.cos(angle), -20 * Math.cos(angle), 0],
                  y: [0, 20 * Math.sin(angle), -20 * Math.sin(angle), 0],
                }}
                transition={{ 
                  duration: 2.8 + i * 0.4, 
                  repeat: Infinity, 
                  delay: delay + i * 0.15 
                }}
              >
                {e}
              </motion.div>
            )
          })}

          {/* Sparkle particles around gif */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute pointer-events-none text-xs"
              style={{ 
                left: "50%", 
                top: "50%",
                transform: `translate(-50%, -50%)`,
                transformOrigin: `${100 + Math.random() * 40}px center`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 0], 
                opacity: [0, 0.8, 0],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: 2 + Math.random() * 1.5, 
                repeat: Infinity, 
                delay: Math.random() * 3,
                ease: "easeOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Question text (Word-by-word reveal) - dramatically larger */}
        <div className="mb-14 flex flex-wrap justify-center gap-x-4 gap-y-3 relative z-10">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="gradient-text text-4xl md:text-5xl font-bold leading-tight"
              style={{ 
                fontFamily: "'Shantell Sans', cursive", 
                letterSpacing: "-0.02em",
                textShadow: "0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(251,191,36,0.2)",
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))",
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.75, type: "spring", damping: 10 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Decorative divider - animated gradient - gold */}
        <motion.div
          className="w-36 h-1 mb-14 rounded-full relative z-10"
          style={{ 
            background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.9), rgba(236,72,153,0.8), transparent)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease infinite",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.9, type: "spring", damping: 15 }}
        />

        {/* Secondary divider - purple */}
        <motion.div
          className="w-28 h-0.5 mb-14 rounded-full relative z-10"
          style={{ 
            background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)" 
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring", damping: 15 }}
        />

        {/* Maximally Enhanced Answer buttons */}
        <motion.div
          className="flex flex-wrap gap-8 justify-center items-center relative z-10"
          initial={{ opacity: 0, y: 55 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.85 }}
        >
          <motion.button
            onClick={handleYes}
            whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(168,85,247,0.7), 0 0 90px rgba(251,191,36,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-7 rounded-full font-bold text-2xl transition-all duration-300 border-2 border-purple-400/70"
            style={{ 
              background: "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(236,72,153,0.95), rgba(168,85,247,0.95))", 
              backgroundSize: "200% 200%",
              animation: "gradientShift 4s ease infinite",
              color: "white",
              boxShadow: "0 0 35px rgba(168,85,247,0.7), 0 4px 25px rgba(0,0,0,0.3)",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            Yes 💕
          </motion.button>

          <motion.button
            onClick={handleNo}
            whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.2)", boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-7 rounded-full font-bold text-2xl transition-all duration-300 border-2 border-white/40 backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.95)", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
          >
            No 😔
          </motion.button>
        </motion.div>

        {/* Floating hearts around buttons */}
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-5 pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <motion.span
              key={`btn-heart-${i}`}
              className="text-xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.5 + i * 0.3,
                repeat: Infinity,
                delay: 1.8 + i * 0.2,
                ease: "easeInOut",
              }}
            >
              {["💕", "✨", "💖", "💫"][i % 4]}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}