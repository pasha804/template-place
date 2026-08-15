import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

export interface AwardItem {
  emoji: string;
  title: string;
  description: string;
}

const DEFAULT_AWARDS: AwardItem[] = [
  {
    emoji: "😊",
    title: "Best Smile",
    description: "Unanimous winner, every year.",
  },
  {
    emoji: "✨",
    title: "Most Magical",
    description: "Casts spells just by walking in.",
  },
  {
    emoji: "🎧",
    title: "Best Playlist Curator",
    description: "Vibes only. Never skip.",
  },
  {
    emoji: "🤗",
    title: "Comfort Champion",
    description: "Turns any bad day into a good one.",
  },
  {
    emoji: "🎨",
    title: "Most Creative",
    description: "Sees color where the world sees grey.",
  },
  {
    emoji: "💖",
    title: "Biggest Heart",
    description: "Room enough for everyone in it.",
  },
];

interface WhySpecialNewProps {
  onNext: () => void;
  awardsTitle?: string;
  awardsSubtitle?: string;
  awards?: AwardItem[];
}

export function WhySpecialNew({
  onNext,
  awardsTitle = "The Official Awards",
  awardsSubtitle = "All categories. One winner. You. 👑",
  awards = DEFAULT_AWARDS,
}: WhySpecialNewProps) {
  const activeAwards = awards && awards.length > 0 ? awards : DEFAULT_AWARDS;

  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          Take the Stage
        </GlowButton>
      }
    >
      <div className="relative w-full max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold gradient-text mb-4">
            {awardsTitle}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-10">
            {awardsSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {activeAwards.map((award, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass rounded-3xl p-6 shadow-[var(--shadow-glow-soft)] relative overflow-hidden group"
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className="mb-4 text-5xl sm:text-6xl"
                  >
                    {award.emoji}
                  </motion.div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                    {award.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </div>

                {/* Decorative corner sparkle */}
                <motion.div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gold neon-outline"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 glass rounded-3xl px-6 sm:px-8 py-5 sm:py-6 inline-block"
        >
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-glow-pulse" />
            <p className="text-base sm:text-lg text-primary text-glow font-bold">
              You win every category, every time! 🏆✨
            </p>
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-gold animate-glow-pulse" />
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
