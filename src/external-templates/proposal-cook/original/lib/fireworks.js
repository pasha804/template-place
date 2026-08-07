import confetti from "canvas-confetti"

const ROSE_COLORS  = ["#e11d48", "#f472b6", "#fda4af", "#fff", "#fbbf24"]
const HEART_COLORS = ["#e11d48", "#ec4899", "#f472b6", "#a855f7", "#fff"]
const RICH_COLORS  = ["#e11d48", "#f472b6", "#a855f7", "#fbbf24", "#34d399", "#60a5fa", "#fff"]

// Single burst at a point
function burst(opts = {}) {
  confetti({
    particleCount: opts.count ?? 80,
    spread: opts.spread ?? 100,
    origin: opts.origin ?? { x: 0.5, y: 0.5 },
    colors: opts.colors ?? ROSE_COLORS,
    startVelocity: opts.velocity ?? 45,
    gravity: opts.gravity ?? 1,
    ticks: opts.ticks ?? 200,
    shapes: opts.shapes ?? ["circle", "square"],
    scalar: opts.scalar ?? 1,
  })
}

// Rocket that shoots up then explodes at the top
function rocket(x, delay = 0, colors = ROSE_COLORS) {
  setTimeout(() => {
    confetti({
      particleCount: 4,
      angle: 90,
      spread: 5,
      origin: { x, y: 1 },
      colors,
      startVelocity: 90,
      gravity: 1.2,
      ticks: 80,
      shapes: ["circle"],
      scalar: 0.6,
    })
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 90,
        spread: 360,
        origin: { x, y: 0.25 },
        colors,
        startVelocity: 30,
        gravity: 0.6,
        ticks: 250,
        shapes: ["circle", "square"],
        scalar: 1.1,
      })
    }, 600)
  }, delay)
}

// Hearts only burst
function heartBurst(origin = { x: 0.5, y: 0.5 }, delay = 0) {
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 120,
      origin,
      colors: HEART_COLORS,
      shapes: ["circle"],
      scalar: 1.2,
      startVelocity: 35,
      gravity: 0.7,
      ticks: 280,
    })
  }, delay)
}

// ─── Presets ────────────────────────────────────────────

/**
 * Celebration fireworks — used on CelebrationScreen (Jana said YES)
 * Big sustained fireworks show
 */
export function celebrationFireworks() {
  // Immediate side cannons
  burst({ origin: { x: 0.1, y: 0.6 }, count: 60, spread: 70, colors: ROSE_COLORS })
  burst({ origin: { x: 0.9, y: 0.6 }, count: 60, spread: 70, colors: HEART_COLORS })

  // Rockets from different positions
  rocket(0.2, 200, ROSE_COLORS)
  rocket(0.5, 500, RICH_COLORS)
  rocket(0.8, 300, HEART_COLORS)
  rocket(0.35, 900, ROSE_COLORS)
  rocket(0.65, 1100, RICH_COLORS)

  // Heart rain after rockets
  heartBurst({ x: 0.3, y: 0.3 }, 1400)
  heartBurst({ x: 0.7, y: 0.3 }, 1700)
  heartBurst({ x: 0.5, y: 0.2 }, 2000)

  // Final grand finale
  setTimeout(() => {
    for (let i = 0; i < 5; i++) {
      burst({ origin: { x: 0.1 + i * 0.2, y: 0.5 }, count: 50, spread: 80, colors: RICH_COLORS, delay: i * 120 })
    }
  }, 2400)
}

/**
 * Final screen fireworks — extra grand, repeating
 */
export function finalFireworks() {
  // Wave 1
  rocket(0.2, 600,  ROSE_COLORS)
  rocket(0.8, 800,  HEART_COLORS)
  rocket(0.5, 1000, RICH_COLORS)

  // Wave 2
  rocket(0.35, 1600, HEART_COLORS)
  rocket(0.65, 1800, ROSE_COLORS)
  rocket(0.15, 2000, RICH_COLORS)
  rocket(0.85, 2200, ROSE_COLORS)

  // Side cannons throughout
  burst({ origin: { x: 0, y: 0.7 }, count: 50, spread: 60, velocity: 55, colors: ROSE_COLORS, delay: 800 })
  burst({ origin: { x: 1, y: 0.7 }, count: 50, spread: 60, velocity: 55, colors: HEART_COLORS, delay: 1000 })

  // Heart shower
  for (let i = 0; i < 6; i++) {
    heartBurst({ x: Math.random(), y: 0.2 + Math.random() * 0.3 }, 2200 + i * 180)
  }

  // Grand finale burst
  setTimeout(() => {
    for (let i = 0; i < 6; i++) {
      burst({ origin: { x: i / 5, y: 0.4 }, count: 70, spread: 90, colors: RICH_COLORS })
    }
  }, 3000)
}

/**
 * Quick "Yes" burst — WillYouBeMine
 */
export function yesBurst() {
  burst({ origin: { x: 0.1, y: 0.6 }, count: 60, spread: 65, colors: ROSE_COLORS })
  burst({ origin: { x: 0.9, y: 0.6 }, count: 60, spread: 65, colors: HEART_COLORS })
  rocket(0.5, 200, RICH_COLORS)
  heartBurst({ x: 0.5, y: 0.3 }, 900)
}

/**
 * Small reveal burst — Gift3, MessageReveal
 */
export function revealBurst() {
  burst({ origin: { x: 0.5, y: 0.5 }, count: 100, spread: 120, colors: RICH_COLORS, velocity: 38, gravity: 0.7 })
  heartBurst({ x: 0.5, y: 0.5 }, 200)
}
