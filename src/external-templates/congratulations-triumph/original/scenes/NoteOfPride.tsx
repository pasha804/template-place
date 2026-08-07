// @ts-nocheck
import { motion } from "framer-motion"
import { Feather } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { useTypewriter } from "../components/useTypewriter"
import { between, series } from "../components/rand"

const DEFAULT_NOTE = "Watching you achieve this has been nothing short of inspiring. Your hard work has finally paid off — and honestly, it paid off long before today, in the person you became while chasing it. I hope you pause, just for a moment, and let yourself feel proud. You've earned every bit of this."

export function NoteOfPride({ name, onNext, noteText }: { name: string; onNext: () => void; noteText?: string }) {
  const letter = noteText || DEFAULT_NOTE
  const { text, done } = useTypewriter(letter, { speed: 14, delay: 700 })
  const petals = series(4711, 16, r => ({ left: between(r, 0, 100), top: between(r, 0, 100), size: between(r, 8, 18), delay: between(r, 0, 6), duration: between(r, 8, 16) }))
  return (
    <SceneShell title="A Note of Pride" subtitle="Written slowly, and meant completely." footer={<GlowButton onClick={onNext}>Continue</GlowButton>}>
      <div className="relative mx-auto max-w-2xl" style={{ perspective: "1200px" }}>
        {petals.map((p, i) => (
          <span key={i} aria-hidden className="ct-animate-float pointer-events-none absolute rounded-full opacity-50"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size / 2, background: "var(--ct-primary)", animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }} />
        ))}
        <motion.article
          initial={{ opacity: 0, rotateX: -75, y: -40 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="ct-ruled-paper relative rounded-lg p-8 text-left shadow-2xl sm:p-12"
          style={{ transformOrigin: "top center", color: "var(--ct-ink)" }}
        >
          <p className="ct-font-script min-h-56 text-xl leading-[34px] sm:text-2xl sm:leading-[34px]">
            {text}
            {!done && <span className="ct-animate-flame inline-block">|</span>}
          </p>
          <p className="ct-font-script mt-6 text-right text-xl">— With all my pride, for {name}</p>
          <Feather aria-hidden className="ct-animate-laurel absolute -right-2 -bottom-4 h-10 w-10 ct-neon-gold" style={{ color: "var(--ct-primary)" }} />
        </motion.article>
      </div>
    </SceneShell>
  )
}
