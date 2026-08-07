// @ts-nocheck
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Gift as GiftIcon } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Confetti } from "../components/Confetti"

const DEFAULT_GIFT_MSG = "No box could ever hold what I feel for you — so take this whole galaxy instead."

export function Gift({
  onNext,
  giftMessage,
  title,
  subtitle,
}: {
  onNext: () => void;
  giftMessage?: string;
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState(false)
  const text = giftMessage || DEFAULT_GIFT_MSG

  return (
    <SceneShell
      title={title || "A Little Surprise"}
      subtitle={
        open
          ? <span className="script text-2xl text-glow" style={{ color: "var(--primary)" }}>Surprise — it's my heart ♡</span>
          : (subtitle || <>Tap the gift box to<br />open your surprise.</>)
      }
      footerSlot={
        open
          ? <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>
          : <GlowButton onClick={() => setOpen(true)} icon={<GiftIcon className="h-4 w-4" />}>Open Gift</GlowButton>
      }
    >
      <div className="relative mx-auto flex w-full max-w-sm flex-col items-center">
        <Confetti active={open} />
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          animate={{ y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-52 neon-outline"
          aria-label="Open the surprise gift"
        >
          <motion.img
            src="/templates/anniversary-galaxy/gift.webp"
            alt="Galaxy gift box"
            width={1024}
            height={1024}
            loading="lazy"
            animate={open ? { scale: 0.9, rotate: -4 } : {}}
            transition={{ duration: 0.6 }}
            className="w-full"
          />
          <AnimatePresence>
            {open && (
              <motion.span
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: "oklch(0.7 0.24 350 / 40%)" }}
              />
            )}
          </AnimatePresence>
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-6 w-full rounded-3xl px-6 py-5"
            >
              <p className="script text-3xl text-glow" style={{ color: "var(--primary)" }}>Forever, yours</p>
              <p className="mt-2 font-serif text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  )
}
