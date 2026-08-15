import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";
import { Heart } from "../Heart";

export interface JourneyMilestone {
  title: string;
  text: string;
}

const DEFAULT_MILESTONES: JourneyMilestone[] = [
  { title: "The Day You Were Born", text: "The world became a better place." },
  { title: "Growing Up", text: "Every year, more amazing than the last." },
  { title: "All the Memories", text: "So many beautiful moments together." },
  { title: "Today", text: "Your special day — celebrate big! 🎉" },
];

interface JourneyProps {
  onNext: () => void;
  journeyTitle?: string;
  journeySubtitle?: string;
  milestones?: JourneyMilestone[];
}

export function Journey({
  onNext,
  journeyTitle = "Our Journey",
  journeySubtitle = "Every chapter of your life is beautiful, and this one is my favorite.",
  milestones = DEFAULT_MILESTONES,
}: JourneyProps) {
  const activeMilestones = milestones && milestones.length > 0 ? milestones : DEFAULT_MILESTONES;

  return (
    <SceneShell
      title={journeyTitle}
      subtitle={journeySubtitle}
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          Next
        </GlowButton>
      }
    >
      <div className="relative mx-auto w-full max-w-md pl-12 text-left">
        {/* drawing line */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100%", opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="absolute left-[1.35rem] top-2 w-[2px] rounded-full bg-gradient-to-b from-primary via-accent to-primary/10 neon-outline"
        />

        <ul className="space-y-8">
          {activeMilestones.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7 + i * 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.span
                className="absolute -left-12 top-0 w-8 text-primary neon-outline"
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Heart className="h-full w-full" />
              </motion.span>
              <h3 className="text-lg tracking-wide text-primary text-glow-soft font-semibold">
                {m.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{m.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SceneShell>
  );
}
