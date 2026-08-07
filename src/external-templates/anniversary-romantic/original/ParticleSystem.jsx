"use client"

import { useEffect, useState } from "react"

const SYMBOLS = ["💖", "✨", "💫", "🌸", "💕", "⭐", "🩷", "✦"]

function generateParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: SYMBOLS[i % SYMBOLS.length],
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 14 + 10}px`,
    duration: `${Math.random() * 15 + 12}s`,
    delay: `${Math.random() * 15}s`,
    opacity: (Math.random() * 0.12 + 0.06).toFixed(2),
  }))
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    setParticles(generateParticles(28))
  }, [])

  if (particles.length === 0) return null

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            fontSize: p.size,
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            bottom: "-5vh",
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  )
}
