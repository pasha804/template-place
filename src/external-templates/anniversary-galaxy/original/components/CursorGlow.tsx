// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

type Spark = { id: number; x: number; y: number; s: number }

export function CursorGlow() {
  const raw = { x: useMotionValue(-200), y: useMotionValue(-200) }
  const x = useSpring(raw.x, { stiffness: 120, damping: 18, mass: 0.4 })
  const y = useSpring(raw.y, { stiffness: 120, damping: 18, mass: 0.4 })
  const [sparks, setSparks] = useState<Spark[]>([])
  const id = useRef(0)
  const last = useRef(0)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const onMove = (e: PointerEvent) => {
      raw.x.set(e.clientX)
      raw.y.set(e.clientY)
      const now = performance.now()
      if (now - last.current > 70) {
        last.current = now
        const spark = {
          id: id.current++,
          x: e.clientX + (Math.random() - 0.5) * 26,
          y: e.clientY + (Math.random() - 0.5) * 26,
          s: 3 + Math.random() * 5,
        }
        setSparks((p) => [...p.slice(-14), spark])
      }
    }
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [raw.x, raw.y])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      <motion.div
        style={{ x, y }}
        className="absolute -ml-40 -mt-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
      />
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: -18 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          onAnimationComplete={() => setSparks((p) => p.filter((q) => q.id !== s.id))}
          className="absolute rounded-full bg-gold neon-outline"
          style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
        />
      ))}
    </div>
  )
}
