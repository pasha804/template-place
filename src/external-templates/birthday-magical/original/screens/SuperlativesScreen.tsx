import { motion } from "framer-motion";
import HapticButton from "../HapticButton";

const DEFAULT_AWARDS = [
  { icon: "ðŸ†", title: "Best Smile on Earth", sub: "Scientifically proven. Unanimous vote. No contest." },
  { icon: "ðŸŒ™", title: "Most Magical", sub: "Makes the ordinary feel like a dream. Always." },
  { icon: "ðŸ’–", title: "Biggest Heart", sub: "Loves deeply, fully, and without hesitation." },
  { icon: "ðŸ‘‘", title: "Reigning Queen", sub: "Of every room she walks into. Forever." },
  { icon: "âœ¨", title: "Most Stunning", sub: "Effortlessly. It's unfair how beautiful she is." },
  { icon: "ðŸŒ¸", title: "Best Girlfriend", sub: "One of a kind. The absolute best. My favourite human." },
];

export default function SuperlativesScreen({ onNext, awards }: { onNext: () => void; awards?: { icon: string; title: string; sub: string }[] }) {
  const finalAwards = awards || DEFAULT_AWARDS;
  return (
    <motion.div
      key="superlatives"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center gap-6 py-12 sm:gap-8 sm:px-6 sm:py-16"
    >
      <div className="text-center">
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading">
          The Official Awards
        </h2>
        <p className="mt-2 text-center text-sm text-[#fda4af] sm:text-base">
          All categories. One winner. You, Jana. ðŸ‘‘
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {finalAwards.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 160, damping: 18, delay: i * 0.06 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="bt7-glass-card group relative overflow-hidden rounded-2xl p-4 text-center shadow-[0_0_30px_rgba(217,70,239,0.25)] sm:rounded-3xl sm:p-6"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(251,191,36,0.25), transparent 60%)" }}
            />
            <motion.div
              animate={{ rotate: [0, -8, 8, -4, 4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              className="text-5xl drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] sm:text-7xl"
            >
              {a.icon}
            </motion.div>
            <h3 style={{ fontFamily: "var(--bt7-font-display)" }} className="mt-2 text-lg text-white sm:mt-3 sm:text-3xl">
              {a.title}
            </h3>
            <p className="mt-1 text-xs text-[#fda4af] sm:text-sm">{a.sub}</p>
          </motion.div>
        ))}
      </div>

      <HapticButton onClick={onNext}>Take the Stage ðŸŽ¤</HapticButton>
    </motion.div>
  );
}

