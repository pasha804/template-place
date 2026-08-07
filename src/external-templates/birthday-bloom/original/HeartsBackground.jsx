"use client"

import { useEffect, useState } from "react"

const COLORS = ["#973b88", "#9b3c49", "#594ba0", "#ff8fab", "#f7c1cf"]

function seededRandom(seed) {
  let s = seed | 0
  return () => {
    s = (s * 1664525 + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

function randomBetween(rng, a, b) {
  return rng() * (b - a) + a
}

function createHeart(rng) {
  return {
    id: rng(),
    x: rng() * 100,
    size: randomBetween(rng, 10, 24),
    opacity: randomBetween(rng, 0.15, 0.45),
    duration: randomBetween(rng, 8, 18),
    delay: randomBetween(rng, 0, 12),
    color: COLORS[Math.floor(rng() * COLORS.length)],
  }
}

export default function HeartsBackground() {
  const [hearts] = useState(() => {
    const rng = seededRandom(42)
    return Array.from({ length: 28 }, () => createHeart(rng))
  })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.x}%`,
            bottom: "-5%",
            fontSize: h.size,
            opacity: 0,
            animation: `heartFloat ${h.duration}s linear ${h.delay}s infinite`,
            color: h.color,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width={h.size}
            height={h.size}
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  )
}
