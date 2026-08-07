// @ts-nocheck
import { motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"

function usePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() =>
        setPos({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        })
      )
    }
    window.addEventListener("pointermove", onMove)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])
  return pos
}

function makePetals(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1
    return {
      left: r(1) * 100,
      size: 8 + r(2) * 14,
      delay: r(3) * 18,
      duration: 16 + r(4) * 16,
      drift: (r(5) - 0.5) * 220,
      rotate: r(6) * 360,
      opacity: 0.25 + r(7) * 0.5,
      blush: r(8) > 0.45,
    }
  })
}

export function Ambient() {
  const [mounted, setMounted] = useState(false)
  const pointer = usePointer()
  useEffect(() => setMounted(true), [])

  const petals = useMemo(() => makePetals(22), [])
  const sparks = useMemo(() => makePetals(26), [])

  if (!mounted) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(60%_40%_at_20%_10%,color-mix(in_oklab,var(--gold)_10%,transparent),transparent_70%),radial-gradient(50%_40%_at_85%_75%,color-mix(in_oklab,var(--blush)_10%,transparent),transparent_70%)]" />

      <motion.div
        className="absolute h-[36rem] w-[36rem] rounded-full opacity-[0.18] blur-3xl [background:radial-gradient(circle,color-mix(in_oklab,var(--gold)_70%,transparent),transparent_65%)]"
        animate={{
          x: `calc(50vw + ${pointer.x * 100}vw - 18rem)`,
          y: `calc(50vh + ${pointer.y * 100}vh - 18rem)`,
        }}
        transition={{ type: "spring", stiffness: 24, damping: 18, mass: 1.4 }}
      />

      {sparks.map((s, i) => (
        <motion.span
          key={`s-${i}`}
          className="absolute top-full rounded-full"
          style={{ left: `${s.left}%`, width: s.size / 5, height: s.size / 5, background: "var(--gold)" }}
          animate={{ y: [0, -window.innerHeight - 120], opacity: [0, s.opacity, 0] }}
          transition={{
            duration: s.duration * 1.4,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {petals.map((p, i) => (
        <motion.span
          key={`p-${i}`}
          className="absolute -top-16 block"
          style={{ left: `${p.left}%`, opacity: p.opacity }}
          animate={{
            y: [0, typeof window !== "undefined" ? window.innerHeight + 140 : 900],
            x: [0, p.drift, p.drift * 0.4],
            rotate: [p.rotate, p.rotate + 240],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2c5 3.5 8 7 8 11a8 8 0 1 1-16 0c0-4 3-7.5 8-11Z"
              fill={p.blush ? "var(--blush)" : "var(--gold-soft)"}
              opacity="0.75"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  )
}
