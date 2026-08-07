// @ts-nocheck
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Music, Pause, Play, Rewind, FastForward } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { between, series } from "../components/rand"

function format(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function Anthem({ onNext, songTitle, songArtist }: { onNext: () => void; songTitle?: string; songArtist?: string }) {
  const title = songTitle || "Unstoppable"
  const artist = songArtist || "Sia"
  const DURATION = 217
  const [playing, setPlaying] = useState(true)
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setElapsed((prev) => (prev + 1 >= DURATION ? 0 : prev + 1))
    }, 1000)
    return () => clearInterval(id)
  }, [playing])

  const notes = series(3141, 12, (r) => ({
    left: between(r, 2, 96),
    top: between(r, 2, 88),
    size: between(r, 14, 26),
    delay: between(r, 0, 5),
  }))

  const progress = (elapsed / DURATION) * 100

  return (
    <SceneShell
      title="Your Anthem"
      subtitle="Every victory deserves a soundtrack."
      footer={<GlowButton onClick={onNext}>Continue</GlowButton>}
    >
      <div className="relative mx-auto max-w-3xl">
        {notes.map((n, i) => (
          <Music
            key={i}
            aria-hidden
            className="ct-animate-float pointer-events-none absolute"
            style={{
              left: `${n.left}%`,
              top: `${n.top}%`,
              width: n.size,
              height: n.size,
              color: "var(--ct-primary)",
              opacity: 0.5,
              animationDelay: `${n.delay}s`,
            }}
          />
        ))}

        <div className="ct-glass relative flex flex-col items-center gap-8 rounded-3xl p-6 sm:flex-row sm:p-10">
          <motion.div
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={playing ? { duration: 6, repeat: Infinity, ease: "linear" } : { duration: 0.4 }}
            className="relative h-44 w-44 shrink-0 rounded-full"
            style={{
              background:
                "repeating-radial-gradient(circle, oklch(0.16 0.04 160) 0px, oklch(0.16 0.04 160) 5px, oklch(0.22 0.05 158) 6px, oklch(0.22 0.05 158) 7px)",
              boxShadow: "var(--ct-shadow-emerald)",
            }}
          >
            <span
              className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
            />
            <span
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--ct-background)" }}
            />
          </motion.div>

          <div className="w-full text-center sm:text-left">
            <h3 className="ct-font-script text-2xl" style={{ color: "var(--ct-accent)" }}>{title}</h3>
            <p className="ct-font-serif text-lg" style={{ color: "var(--ct-muted-fg)" }}>{artist}</p>

            <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--ct-muted)" }}>
              <div
                className="h-full rounded-full transition-[width] duration-1000 ease-linear"
                style={{ width: `${progress}%`, backgroundImage: "var(--ct-gradient-gold)" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs" style={{ fontFamily: "var(--ct-font-sans)", color: "var(--ct-muted-fg)" }}>
              <span>{format(elapsed)}</span>
              <span>{format(DURATION)}</span>
            </div>

            <div className="mt-6 flex items-center justify-center sm:justify-start gap-4">
              <button
                type="button"
                aria-label="Rewind ten seconds"
                onClick={() => setElapsed((p) => Math.max(0, p - 10))}
                className="ct-glass-deep flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
                style={{ color: "var(--ct-primary)" }}
              >
                <Rewind className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                aria-label={playing ? "Pause the anthem" : "Play the anthem"}
                onClick={() => setPlaying((p) => !p)}
                className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
                style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)", color: "var(--ct-primary-fg)" }}
              >
                {playing ? <Pause className="h-5 w-5" aria-hidden /> : <Play className="h-5 w-5" aria-hidden />}
              </button>
              <button
                type="button"
                aria-label="Skip forward ten seconds"
                onClick={() => setElapsed((p) => Math.min(DURATION, p + 10))}
                className="ct-glass-deep flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
                style={{ color: "var(--ct-primary)" }}
              >
                <FastForward className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SceneShell>
  )
}
