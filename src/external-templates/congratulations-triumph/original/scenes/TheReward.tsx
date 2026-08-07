// @ts-nocheck
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Confetti } from "../components/Confetti"

const DEFAULT_REWARD_MSG = "The greatest reward is knowing you never gave up. Keep shining."

export function TheReward({ onNext, rewardMessage }: { onNext: () => void; rewardMessage?: string }) {
  const [opened, setOpened] = useState(false)
  const text = rewardMessage || DEFAULT_REWARD_MSG
  return (
    <SceneShell title="The Reward" subtitle={opened ? "Take it — it was always yours." : "Something has been waiting for you."} footer={opened ? <GlowButton onClick={onNext}>Continue</GlowButton> : null}>
      {opened && <Confetti seed={2718} />}
      <div className="relative mx-auto flex min-h-[26rem] max-w-xl flex-col items-center justify-start">
        <AnimatePresence>
          {opened && (
            <motion.span key="shockwave" initial={{ scale: 0, opacity: 0.9 }} animate={{ scale: 6, opacity: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}
              className="pointer-events-none absolute top-32 h-40 w-40 rounded-full border-2"
              style={{ borderColor: "var(--ct-primary)", boxShadow: "var(--ct-shadow-gold)" }} />
          )}
        </AnimatePresence>
        <motion.button
          type="button" onClick={() => setOpened(true)} aria-label="Open the reward"
          animate={opened ? { scale: 0.72, rotate: -8, opacity: 0.55 } : { rotate: [-2.5, 2.5, -2.5], y: [0, -10, 0] }}
          transition={opened ? { duration: 0.7 } : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={opened ? {} : { scale: 1.04 }}
          className="relative w-full max-w-sm cursor-pointer rounded-[2rem] p-2"
          style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
        >
          <img src="/templates/congratulations-triumph/treasure-chest.jpg" alt="Golden treasure chest glowing from within" width={1024} height={1024} loading="lazy" decoding="async" className="w-full rounded-[1.7rem] object-cover" />
        </motion.button>
        <AnimatePresence>
          {opened && (
            <motion.div initial={{ opacity: 0, y: 60, scale: 0.9 }} animate={{ opacity: 1, y: -120, scale: 1 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="ct-glass absolute top-40 z-20 w-full max-w-md rounded-3xl p-8">
              <p className="ct-font-script text-2xl leading-relaxed sm:text-3xl" style={{ color: "var(--ct-accent)" }}>"{text}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
