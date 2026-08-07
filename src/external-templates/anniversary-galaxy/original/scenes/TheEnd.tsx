// @ts-nocheck
import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

export function TheEnd({ onRestart, title, message, replayButtonText, partnerName }: { onRestart: () => void; title?: string; message?: string; replayButtonText?: string; partnerName?: string }) {
  return (
    <SceneShell
      title={title || "The End"}
      subtitle={<>But not really…<br />This is just the beginning of our forever.</>}
      footerSlot={<GlowButton onClick={onRestart} icon={<RotateCcw className="h-4 w-4" />}>{replayButtonText || "Back to Start"}</GlowButton>}
    >
      <div className="relative flex flex-col items-center">
        <motion.svg
          viewBox="0 0 240 120"
          className="h-32 w-64 neon-outline sm:h-40 sm:w-80"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.path
            d="M60 60c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34zm60 0c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34z"
            fill="none"
            stroke="oklch(0.72 0.25 348)"
            strokeWidth="5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </motion.svg>
        <div className="absolute inset-0 -z-10 blur-3xl" style={{ background: "oklch(0.7 0.24 350 / 20%)" }} />
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          className="script mt-6 text-3xl leading-snug text-glow sm:text-4xl text-center"
          style={{ color: "var(--primary)" }}
        >
          {message ? message : `Happy Anniversary,\n${partnerName ? partnerName : "My Love"} ♡`}
        </motion.p>
      </div>
    </SceneShell>
  )
}
