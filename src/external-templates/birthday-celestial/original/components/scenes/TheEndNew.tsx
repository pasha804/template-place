import { motion } from "framer-motion";
import { RotateCcw, Heart, Sparkles } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { SceneShell } from "../SceneShell";

interface TheEndNewProps {
  onRestart: () => void;
  birthdayName?: string;
  theEndTitle?: string;
  theEndSubtitle?: string;
  theEndParagraph1?: string;
  theEndParagraph2?: string;
  celebrateGif1?: string;
  celebrateGif2?: string;
}

export function TheEndNew({
  onRestart,
  birthdayName = "Jana",
  theEndTitle = "The End",
  theEndSubtitle = "But not really...",
  theEndParagraph1 = "This is just the beginning of all your adventures, my love.",
  theEndParagraph2 = "Every page of your story is filled with magic, and I'm so grateful to be a part of it. Here's to another year of memories, laughter, love, and all the beautiful moments ahead! 💖",
  celebrateGif1 = "/templates/birthday-celestial/gifs/celebrate.gif",
  celebrateGif2 = "/templates/birthday-celestial/gifs/cute.gif",
}: TheEndNewProps) {
  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <div className="flex flex-col gap-4 items-center">
          <GlowButton onClick={onRestart} icon={<RotateCcw className="h-4 w-4" />}>
            Relive the Journey
          </GlowButton>
          <p className="text-xs text-muted-foreground script">
            Or just keep this open and look at it whenever you want 💕
          </p>
        </div>
      }
    >
      <div className="relative w-full max-w-4xl mx-auto text-center">
        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Celebration gifs */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src={celebrateGif1}
                alt="Celebration"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover glass p-2"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <img
                src={celebrateGif2}
                alt="Cute celebration"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover glass p-2"
              />
            </motion.div>
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="script text-5xl sm:text-7xl md:text-8xl gradient-text mb-4">
              {theEndTitle}
            </h2>
            <div className="h-1 w-52 sm:w-64 mx-auto rounded-full bg-gradient-to-r from-transparent via-primary to-transparent mb-6" />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="glass rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-glow-pulse" />
              <p className="script text-xl sm:text-2xl text-primary text-glow">
                {theEndSubtitle}
              </p>
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-glow-pulse" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              {theEndParagraph1}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {theEndParagraph2}
            </p>
          </motion.div>

          {/* Infinity symbol */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <svg
              viewBox="0 0 240 120"
              className="h-28 w-56 mx-auto neon-outline sm:h-36 sm:w-72"
            >
              <motion.path
                d="M60 60c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34zm60 0c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34z"
                fill="none"
                stroke="oklch(0.72 0.25 348)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", delay: 1.2 }}
              />
            </svg>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-xs sm:text-sm text-muted-foreground mt-2"
            >
              Forever and always
            </motion.p>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3, duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 glass rounded-full px-6 sm:px-8 py-3.5 sm:py-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-glow-pulse" fill="currentColor" />
              <p className="script text-2xl sm:text-3xl text-primary text-glow">
                Happy Birthday, {birthdayName}! ♥♡
              </p>
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-glow-pulse" fill="currentColor" />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="text-muted-foreground mt-4 script text-base sm:text-lg"
            >
              Have the most amazing day, my love! 🎂✨
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
