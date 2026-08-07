"use client"

import { useEffect, useRef } from "react"

const SYMBOLS = ["♥", "✦", "✧", "❋", "✿", "❀", "✸", "✹"]

function createParticle(canvas) {
  const x = Math.random() * canvas.width
  const size = 8 + Math.random() * 10
  const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  const speed = 0.3 + Math.random() * 0.6
  const drift = (Math.random() - 0.5) * 0.4
  const opacity = 0.06 + Math.random() * 0.10
  const hue = Math.random() > 0.5 ? "rgba(253,164,175," : "rgba(217,70,239,"
  return {
    x,
    y: canvas.height + size,
    size,
    symbol,
    speed,
    drift,
    opacity,
    color: hue + opacity + ")",
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 1.2,
  }
}

export default function ParticleSystem() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Seed 30 particles at random heights
    for (let i = 0; i < 30; i++) {
      const p = createParticle(canvas)
      p.y = Math.random() * canvas.height
      p.opacity = 0.05 + Math.random() * 0.10
      particles.push(p)
    }

    let spawnTimer = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      spawnTimer++
      if (spawnTimer > 80 && particles.length < 35) {
        particles.push(createParticle(canvas))
        spawnTimer = 0
      }

      particles = particles.filter(p => p.y > -p.size * 2)

      particles.forEach(p => {
        p.y -= p.speed
        p.x += p.drift
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.font = `${p.size}px serif`
        ctx.fillStyle = p.color
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(p.symbol, 0, 0)
        ctx.restore()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}
