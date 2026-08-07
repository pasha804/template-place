// @ts-nocheck
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

export function TheEnd({ name, onRestart }: { name: string; onRestart: () => void }) {
  return (
    <SceneShell title="Onward & Upward" subtitle="This chapter is closed, but the best stories are yet to be written."
      footer={<GlowButton onClick={onRestart}><RotateCcw className="h-4 w-4" aria-hidden />Celebrate Again</GlowButton>}
    >
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <svg viewBox="0 0 200 100" className="ct-animate-glow h-40 w-72 ct-neon-gold" aria-hidden>
          <motion.path d="M60 50c0-16 -13-26 -26-26S8 34 8 50s13 26 26 26 26-10 40-26 26-26 40-26 26 10 26 26-13 26-26 26-26-10-40-26"
            fill="none" stroke="var(--ct-primary)" strokeWidth="3" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, ease: "easeInOut" }} />
        </svg>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 1 }}
          className="ct-gradient-text ct-font-script mt-6 text-3xl sm:text-4xl">
          Congratulations again, {name} ♡
        </motion.p>
      </div>
    </SceneShell>
  )
}
