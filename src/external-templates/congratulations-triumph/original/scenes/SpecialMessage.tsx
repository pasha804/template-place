// @ts-nocheck
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Mail } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const DEFAULT_MSG = "What you built to get here — the discipline, the patience, the belief — you get to keep forever. Everything after this is you, compounding."

export function SpecialMessage({ onNext, message }: { onNext: () => void; message?: string }) {
  const [open, setOpen] = useState(false)
  const text = message || DEFAULT_MSG

  return (
    <SceneShell
      title="Special Message"
      subtitle={open ? "Keep this one." : "There's a letter waiting for you."}
      footer={open ? <GlowButton onClick={onNext}>Continue</GlowButton> : null}
    >
      <div className="relative mx-auto flex min-h-80 max-w-xl flex-col items-center [perspective:1000px]">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the special message"
          animate={open ? { rotateX: -22, y: 40, scale: 0.92 } : { rotateX: 0, y: 0, scale: 1 }}
          whileHover={open ? {} : { scale: 1.04 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="relative z-10 flex h-52 w-full max-w-sm cursor-pointer items-center justify-center rounded-2xl"
          style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
        >
          <span className="ct-glass-deep flex h-[85%] w-[92%] items-center justify-center rounded-xl">
            <Mail className="h-10 w-10" style={{ color: "var(--ct-primary)" }} aria-hidden />
          </span>
        </motion.button>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.85 }}
              animate={{ opacity: 1, y: -150, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="ct-glass absolute top-0 z-20 w-full max-w-md rounded-3xl p-6 sm:p-8"
            >
              <p className="ct-font-script text-2xl leading-relaxed sm:text-3xl" style={{ color: "var(--ct-accent)" }}>
                “This is just the beginning of your legacy.”
              </p>
              <p className="ct-font-serif mt-4 text-base" style={{ color: "var(--ct-muted-fg)" }}>
                {text}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
