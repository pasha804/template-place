// @ts-nocheck
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const DEFAULT_MESSAGE = "Thank you for every laugh, every quiet night, and every ordinary day you make feel like magic. I'd choose you again, in every galaxy."

export function SpecialMessage({
  onNext,
  message,
  title,
  subtitle,
}: {
  onNext: () => void;
  message?: string;
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false)
  const text = message || DEFAULT_MESSAGE

  return (
    <SceneShell
      title={title || "Special Message"}
      subtitle={subtitle || <>A message from the heart,<br />just for you.</>}
      footerSlot={
        open
          ? <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>
          : <GlowButton onClick={() => setOpen(true)} icon={<ArrowRight className="h-4 w-4" />}>Open Message</GlowButton>
      }
    >
      <div className="relative mx-auto flex w-full max-w-sm flex-col items-center" style={{ perspective: "1200px" }}>
        <motion.button
          type="button"
          onClick={() => setOpen(o => !o)}
          animate={{ y: open ? 10 : [0, -12, 0], rotateX: open ? 18 : 0, scale: open ? 0.86 : 1 }}
          transition={{ duration: open ? 0.9 : 6, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
          className="relative w-56 neon-outline"
          aria-label="Open the love message"
        >
          <img
            src="/templates/anniversary-galaxy/envelope.webp"
            alt="Glowing envelope"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full"
          />
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -40, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass-deep -mt-6 w-full rounded-3xl px-6 py-6"
            >
              <p className="script text-2xl leading-snug text-glow" style={{ color: "var(--primary)" }}>
                Of all the things I have,<br />you are my favorite.
              </p>
              <p className="mt-3 font-serif text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
