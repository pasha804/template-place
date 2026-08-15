import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Gift as GiftIcon } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";
import { Confetti } from "../Confetti";

interface GiftProps {
  onNext: () => void;
  giftTitle?: string;
  giftSubtitle?: string;
  giftRevealedTitle?: string;
  giftRevealedSubtitle?: string;
  giftDescription?: string;
  giftImageUrl?: string;
}

export function Gift({
  onNext,
  giftTitle = "A Little Surprise",
  giftSubtitle = "Tap the gift box to open your surprise.",
  giftRevealedTitle = "Forever, yours",
  giftRevealedSubtitle = "Surprise — it's my heart ♡",
  giftDescription = "No box could ever hold what I wish for you — so take this whole galaxy instead. Happy Birthday!",
  giftImageUrl = "/templates/birthday-celestial/images/gift.webp",
}: GiftProps) {
  const [open, setOpen] = useState(false);

  return (
    <SceneShell
      title={giftTitle}
      subtitle={
        open ? (
          <span className="script text-2xl text-primary text-glow">{giftRevealedSubtitle}</span>
        ) : (
          giftSubtitle
        )
      }
      footerSlot={
        open ? (
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
            Next
          </GlowButton>
        ) : (
          <GlowButton onClick={() => setOpen(true)} icon={<GiftIcon className="h-4 w-4" />}>
            Open Gift
          </GlowButton>
        )
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
          className="relative w-48 sm:w-52 neon-outline cursor-pointer"
          aria-label="Open the surprise gift"
        >
          <motion.img
            src={giftImageUrl}
            alt="Glowing galaxy gift box with a pink ribbon"
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
                className="absolute inset-0 rounded-full bg-primary/40 blur-2xl"
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
              className="glass mt-6 w-full rounded-3xl px-6 py-5 text-center"
            >
              <p className="text-2xl sm:text-3xl text-primary text-glow font-bold">{giftRevealedTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {giftDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}
