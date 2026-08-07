import { useState } from "react";
import { motion } from "framer-motion";
import HapticButton from "../HapticButton";

const DEFAULT_REASONS = [
  {
    emoji: "ðŸŒ™",
    title: "Your Eyes",
    back: "They hold entire galaxies, Jana. One look from you and the whole world goes quiet.",
  },
  {
    emoji: "ðŸ’«",
    title: "Your Laugh",
    back: "It's the most beautiful sound I've ever heard. I'd do anything to keep it echoing forever.",
  },
  {
    emoji: "ðŸŒ¸",
    title: "Your Kindness",
    back: "You love people without conditions. That kind of heart is rare â€” and it's one of the reasons I fell for you.",
  },
  {
    emoji: "ðŸ”¥",
    title: "Your Strength",
    back: "You face every storm with grace I can only dream of. You are braver than you'll ever know.",
  },
  {
    emoji: "âœ¨",
    title: "Your Smile",
    back: "It's illegal, Jana. Genuinely illegal. Every time â€” I forget how to breathe.",
  },
  {
    emoji: "ðŸ‘‘",
    title: "Just You",
    back: "There is no list long enough. You, in your entirety, are my favourite reason to exist.",
  },
];

export default function ReasonsScreen({ onNext, reasons }: { onNext: () => void; reasons?: { emoji: string; title: string; back: string }[] }) {
  const finalReasons = reasons || DEFAULT_REASONS;
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  return (
    <motion.div
      key="reasons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-12 sm:gap-8 sm:px-6 sm:py-16"
    >
      <div className="text-center">
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading">
          Why You're Awesome
        </h2>
        <p className="mt-2 text-sm text-[#fda4af] sm:text-base">
          Each card holds a truth about you ðŸ’« tap to reveal
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-6">
        {finalReasons.map((r, i) => (
          <div key={i} className="bt7-perspective-1000 h-40 sm:h-56">
            <motion.button
              type="button"
              onClick={() => setFlipped((p) => ({ ...p, [i]: !p[i] }))}
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="bt7-preserve-3d relative h-full w-full cursor-pointer text-left"
              style={{ minHeight: 44 }}
            >
              {/* Front */}
              <div className="bt7-glass-card bt7-backface-hidden absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl p-4 shadow-[0_0_30px_rgba(225,29,72,0.25)] sm:rounded-3xl sm:p-6">
                <span className="text-4xl sm:text-6xl">{r.emoji}</span>
                <span
                  style={{ fontFamily: "var(--bt7-font-display)" }}
                  className="text-center text-xl text-white sm:text-3xl"
                >
                  {r.title}
                </span>
                <span className="text-[10px] text-[#fda4af] sm:text-xs">tap to reveal</span>
              </div>
              {/* Back */}
              <div
                className="bt7-glass-card bt7-backface-hidden absolute inset-0 flex items-center justify-center rounded-2xl p-4 text-center shadow-[0_0_30px_rgba(217,70,239,0.5)] sm:rounded-3xl sm:p-6"
                style={{
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(135deg, rgba(225,29,72,0.15), rgba(217,70,239,0.15))",
                }}
              >
                <p className="text-xs leading-snug text-white sm:text-base sm:leading-relaxed">{r.back}</p>
              </div>
            </motion.button>
          </div>
        ))}
      </div>

      <HapticButton onClick={onNext}>Open Your Gift ðŸŽ</HapticButton>
    </motion.div>
  );
}

