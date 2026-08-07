// @ts-nocheck
import { motion } from "framer-motion"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

export function Limitless({ onNext }: { onNext: () => void }) {
  return (
    <SceneShell title="Limitless Potential" subtitle="What you just proved to yourself changes everything that comes next." footer={<GlowButton onClick={onNext}>Continue</GlowButton>}>
      <div className="ct-animate-glow relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full ct-neon-gold" aria-hidden>
          <motion.path
            d="M100 12 L124 74 L190 78 L138 118 L156 182 L100 146 L44 182 L62 118 L10 78 L76 74 Z"
            fill="none" stroke="var(--ct-primary)" strokeWidth="2" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </svg>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="ct-font-script relative z-10 max-w-52 text-xl leading-snug sm:max-w-56 sm:text-2xl"
          style={{ color: "var(--ct-accent)" }}
        >
          The sky is not the limit. Your potential is limitless.
        </motion.p>
      </div>
    </SceneShell>
  )
}
