"use client"

import { useState, useEffect } from "react"

/**
 * PremiumBackground — performance-optimised
 * Pure CSS static layers for the base + just CSS-animated particles
 * No JS-driven animations = zero layout thrash, zero Framer overhead
 */
export default function PremiumBackground({ particleCount = 12, extraBright = false }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const symbols = ["🌹", "🍒", "🌹", "🍒", "🌹", "🍒"]
    // Generate once, never re-generate
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        symbol: symbols[i % symbols.length],
        left: 5 + (i * (90 / particleCount)),   // evenly spaced, no randomness
        size: 11 + (i % 3) * 3,                  // 11, 14, 17 — repeating
        duration: 22 + (i % 4) * 4,              // 22–34s — slow, no jank
        delay: -(i * (20 / particleCount)),       // negative delay = already in progress
        opacity: 0.25 + (i % 3) * 0.1,           // 0.25, 0.35, 0.45
      }))
    )
  }, [particleCount])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

      {/* Base near-black */}
      <div className="absolute inset-0" style={{ background: "#0d0008" }} />

      {/* Center warm depth — static, no animation */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(60,0,35,0.5) 0%, transparent 100%)",
      }} />

      {/* Left edge magenta vignette — static */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 40% 100% at 0% 55%, rgba(130,0,75,0.20) 0%, transparent 70%)",
      }} />

      {/* Right edge vignette — static */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 40% 100% at 100% 55%, rgba(110,0,65,0.16) 0%, transparent 70%)",
      }} />

      {/* Bottom plum tint — static */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 35% at 50% 100%, rgba(70,0,45,0.28) 0%, transparent 80%)",
      }} />

      {/* Two slow breathing orbs — pure CSS, GPU-composited */}
      <div className="bg-orb-left absolute" style={{
        width: 380, height: 380,
        top: "15%", left: "-8%",
        borderRadius: "50%",
        background: extraBright ? "rgba(170,0,85,0.11)" : "rgba(140,0,70,0.07)",
        filter: "blur(80px)",
      }} />
      <div className="bg-orb-right absolute" style={{
        width: 340, height: 340,
        bottom: "8%", right: "-6%",
        borderRadius: "50%",
        background: extraBright ? "rgba(150,0,80,0.10)" : "rgba(120,0,60,0.06)",
        filter: "blur(80px)",
      }} />

      {/* Floating roses — pure CSS animation, will-change: transform only */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle-float absolute select-none"
          style={{
            left: `${p.left}%`,
            bottom: "-30px",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: "transform",
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  )
}
