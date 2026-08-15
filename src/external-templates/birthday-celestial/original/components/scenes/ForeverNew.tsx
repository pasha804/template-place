import { motion } from "framer-motion";
import { ArrowRight, Heart as HeartIcon, Infinity } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

interface ForeverNewProps {
  onNext: () => void;
  foreverHeading?: string;
  card1Title?: string;
  card1Text?: string;
  card2Title?: string;
  card2Text?: string;
  infinityText?: string;
}

export function ForeverNew({
  onNext,
  foreverHeading = "Forever Yours",
  card1Title = "You & Me",
  card1Text = "Through every up and down, every laugh and tear, every moment of joy and challenge - I want to be right there beside you, holding your hand, forever.",
  card2Title = "Always & Forever",
  card2Text = "No matter how many years pass, no matter where life takes us, you will always be my person, my love. This is my promise to you.",
  infinityText = "Forever & Always",
}: ForeverNewProps) {
  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          The Final Chapter
        </GlowButton>
      }
    >
      <div className="relative mx-auto w-full max-w-4xl text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold gradient-text mb-4">
            {foreverHeading}
          </h2>
          <div className="h-1 w-52 sm:w-64 mx-auto rounded-full bg-gradient-to-r from-transparent via-primary to-transparent mb-6" />
        </motion.div>

        {/* Main heart */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative my-8 sm:my-10"
        >
          <svg viewBox="0 0 200 180" className="h-48 w-48 sm:h-60 sm:w-60 mx-auto neon-outline">
            <motion.path
              d="M100 165C100 165 20 118 20 66C20 38 42 20 66 20C82 20 93 29 100 40C107 29 118 20 134 20C158 20 180 38 180 66C180 118 100 165 100 165Z"
              fill="none"
              stroke="oklch(0.72 0.25 348)"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>
          <div className="absolute inset-0 -z-10 rounded-full bg-primary/25 blur-3xl" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center px-12 text-center text-2xl sm:text-3xl font-bold text-primary"
          >
            I Love You
          </motion.p>
        </motion.div>

        {/* Message cards */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="glass rounded-3xl p-6"
          >
            <div className="text-4xl sm:text-5xl mb-3">💑</div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
              {card1Title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {card1Text}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="glass rounded-3xl p-6"
          >
            <div className="text-4xl sm:text-5xl mb-3">🌟</div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
              {card2Title}
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {card2Text}
            </p>
          </motion.div>
        </div>

        {/* Infinity symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-8 sm:mt-10"
        >
          <div className="glass rounded-3xl px-6 sm:px-8 py-4 sm:py-5 inline-block">
            <div className="flex items-center gap-4">
              <Infinity className="h-8 w-8 text-gold animate-glow-pulse" />
              <p className="text-xl sm:text-2xl font-bold text-primary">
                {infinityText}
              </p>
              <Infinity className="h-8 w-8 text-gold animate-glow-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
