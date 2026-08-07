// @ts-nocheck
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Pause, Play, SkipBack, SkipForward, Music2 } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { series } from "../components/rand"

const DURATION = 263
const notes = series(503, 8, r => ({
  x: r() * 100, y: r() * 100,
  size: 14 + r() * 14,
  dur: 6 + r() * 6,
  delay: r() * 5,
}))

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`

export function Song({
  onNext,
  songTitle,
  songArtist,
  couplePhoto,
  songSectionTitle,
  songSectionSubtitle,
}: {
  onNext: () => void
  songTitle?: string
  songArtist?: string
  couplePhoto?: string
  songSectionTitle?: string
  songSectionSubtitle?: string
}) {
  const [playing, setPlaying] = useState(true)
  const [time, setTime] = useState(35)
  const title = songTitle || "Perfect"
  const artist = songArtist || "Ed Sheeran"
  const photo = couplePhoto || "/templates/anniversary-galaxy/couple-galaxy.webp"

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setTime(t => (t + 1) % DURATION), 1000)
    return () => clearInterval(id)
  }, [playing])

  return (
    <SceneShell
      title={songSectionTitle || "Our Song"}
      subtitle={songSectionSubtitle || <>Every moment with you<br />is our favorite melody.</>}
      footerSlot={<GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
    >
      <div className="relative mx-auto w-full max-w-sm">
        {notes.map((n, i) => (
          <motion.span
            key={i}
            className="absolute neon-outline"
            style={{ left: `${n.x}%`, top: `${n.y}%`, color: "oklch(0.7 0.24 350 / 50%)" }}
            animate={{ y: [0, -30, 0], rotate: [-14, 14, -14], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: n.dur, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <Music2 style={{ width: n.size, height: n.size }} />
          </motion.span>
        ))}

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-52 w-52 sm:h-60 sm:w-60"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ animationPlayState: playing ? "running" : "paused" }}
            className="h-full w-full rounded-full"
            style={{
              background: "repeating-radial-gradient(circle,oklch(0.16 0.03 300) 0 3px,oklch(0.1 0.02 300) 3px 6px)",
              boxShadow: "var(--shadow-glow-soft)",
            }}
          >
            <div className="absolute overflow-hidden rounded-full" style={{ inset: "26%", border: "2px solid oklch(0.7 0.24 350 / 50%)" }}>
              <img src={photo} alt="Our song" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "50% 72%" }} />
            </div>
            <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full neon-outline" style={{ background: "var(--primary)" }} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: "oklch(0.7 0.24 350 / 20%)" }} />
        </motion.div>

        <div className="glass mt-6 rounded-3xl px-5 py-4">
          <p className="font-serif text-lg" style={{ color: "var(--foreground)" }}>{title}</p>
          <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "var(--muted-foreground)" }}>{artist}</p>
          <div className="mt-3 flex items-center gap-3 text-[11px]" style={{ color: "var(--muted-foreground)" }}>
            <span>{fmt(time)}</span>
            <div className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-full" style={{ background: "var(--secondary)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundImage: "var(--gradient-pink)" }}
                animate={{ width: `${(time / DURATION) * 100}%` }}
                transition={{ ease: "linear", duration: 0.9 }}
              />
            </div>
            <span>{fmt(DURATION)}</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <button type="button" onClick={() => setTime(t => Math.max(0, t - 15))} className="transition-colors" style={{ color: "var(--muted-foreground)" }} aria-label="Rewind">
              <SkipBack className="h-5 w-5" />
            </button>
            <motion.button
              type="button"
              onClick={() => setPlaying(p => !p)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="grid h-12 w-12 place-items-center rounded-full glow-ring"
              style={{ backgroundImage: "var(--gradient-pink)", color: "var(--primary-foreground)" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </motion.button>
            <button type="button" onClick={() => setTime(t => Math.min(DURATION, t + 15))} className="transition-colors" style={{ color: "var(--muted-foreground)" }} aria-label="Forward">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </SceneShell>
  )
}
