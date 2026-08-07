"use client"

import { useState, useEffect } from "react"

/**
 * PremiumBackground — shared across all screens
 * Renders: deep navy base, 4 breathing orbs, 28 floating particles
 */
export default function PremiumBackground({ particleCount = 28, extraBright = false }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const symbols = ["❤️", "✨", "⭐", "💫", "🌸", "💕", "✦", "◆"]
    setParticles(
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        symbol: symbols[i % symbols.length],
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        duration: 15 + Math.random() * 14,
        delay: Math.random() * 12,
        rotate: Math.random() * 360,
        opacity: 0.08 + Math.random() * 0.22,
      }))
    )
  }, [particleCount])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ── Base background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #31103f 50%, #701a75 100%)",
        }}
      />

      {/* ── Radial colour depth layers ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(30,27,75,0.7) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 70%, rgba(131,24,67,0.5) 0%, transparent 65%)",
        }}
      />

      {/* ── Breathing glow orbs ── */}
      {/* Pink orb */}
      <div
        className="glow-orb absolute"
        style={{
          width: 340,
          height: 340,
          top: "10%",
          left: "5%",
          background: "rgba(236,72,153,0.12)",
          animationDuration: "10s",
          animationDelay: "0s",
        }}
      />
      {/* Purple orb */}
      <div
        className="glow-orb absolute"
        style={{
          width: 420,
          height: 420,
          bottom: "5%",
          right: "5%",
          background: "rgba(124,58,237,0.10)",
          animationDuration: "13s",
          animationDelay: "2s",
        }}
      />
      {/* Blue orb */}
      <div
        className="glow-orb absolute"
        style={{
          width: 260,
          height: 260,
          top: "55%",
          left: "60%",
          background: "rgba(59,130,246,0.08)",
          animationDuration: "11s",
          animationDelay: "4s",
        }}
      />
      {/* Gold orb (subtle) */}
      <div
        className="glow-orb absolute"
        style={{
          width: 200,
          height: 200,
          top: "30%",
          right: "15%",
          background: extraBright
            ? "rgba(251,191,36,0.15)"
            : "rgba(251,191,36,0.07)",
          animationDuration: "9s",
          animationDelay: "6s",
        }}
      />

      {/* ── Floating particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.left}%`,
            bottom: "-40px",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  )
}
