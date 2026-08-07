// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowRight, Feather } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { useTypewriter } from "../components/useTypewriter"
import { series } from "../components/rand"

const DEFAULT_LETTER = `Happy Anniversary, my love.

You're not just a part of my life, you are my life.

Thank you for coming into my world and making it so beautiful. Your smile, your kindness, your soul — everything about you is my favorite.

I wish I could give you the world, but for now, let me give you this little galaxy.

I love you more than words can ever say.

Forever yours ♡`

const petals = series(311, 10, r => ({
  x: r() * 100,
  y: r() * 100,
  size: 16 + r() * 22,
  dur: 7 + r() * 6,
  delay: r() * 4,
}))

export function LoveLetter({
  onNext,
  letterText,
  title,
  subtitle,
}: {
  onNext: () => void;
  letterText?: string;
  title?: string;
  subtitle?: string;
}) {
  const text = letterText || DEFAULT_LETTER
  const { out } = useTypewriter(text, 14, 450)

  return (
    <SceneShell
      title={title || "A Little Letter"}
      subtitle={subtitle || undefined}
      footerSlot={<GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
    >
      <div className="relative mx-auto w-full max-w-md">
        {petals.map((p, i) => (
          <motion.span
            key={i}
            className="absolute -z-0 neon-outline"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size, color: "oklch(0.7 0.24 350 / 60%)" }}
            animate={{ y: [0, -14, 0], rotate: [-12, 12, -12], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            ❀
          </motion.span>
        ))}
        <motion.article
          initial={{ opacity: 0, rotateX: 24, y: 40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-0.7, 0.7, -0.7] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-md px-6 py-7 text-left"
            style={{
              background: "linear-gradient(160deg,oklch(0.92 0.045 88),oklch(0.84 0.06 78))",
              boxShadow: "0 0 50px oklch(0.87 0.12 88 / 28%), var(--shadow-glow-soft)",
            }}
          >
            <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(180deg,transparent,transparent 25px,oklch(0.4 0.06 300/0.07) 26px)" }} />
            <p className="script relative min-h-[15rem] whitespace-pre-line leading-[1.7]" style={{ fontSize: "1.05rem", color: "oklch(0.33 0.09 300)" }}>
              {out}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="ml-0.5 inline-block h-4 w-[2px] align-middle rounded-full"
                style={{ background: "oklch(0.33 0.09 300)" }}
              />
            </p>
          </motion.div>
          <motion.div
            animate={{ rotate: [-8, 4, -8], y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -right-3 neon-outline"
            style={{ color: "var(--gold)" }}
          >
            <Feather className="h-10 w-10" />
          </motion.div>
        </motion.article>
      </div>
    </SceneShell>
  )
}
