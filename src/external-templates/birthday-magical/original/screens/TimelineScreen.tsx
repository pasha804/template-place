import { motion } from "framer-motion";
import HapticButton from "../HapticButton";

const DEFAULT_MILESTONES = [
  {
    year: "Year 1",
    emoji: "ðŸ‘¶",
    title: "You Arrived",
    text: "The world became a more beautiful place the day you were born. Every sunrise since has been a little warmer.",
  },
  {
    year: "Year 5",
    emoji: "ðŸŽ¨",
    title: "Little Dreamer",
    text: "Crayons, curiosity, and a heart full of wonder. You were already painting the world in colours no one else could see.",
  },
  {
    year: "Year 13",
    emoji: "ðŸŒ¸",
    title: "Blossoming",
    text: "The girl who made every corridor brighter just by walking through it. Even then, you were impossible not to notice.",
  },
  {
    year: "Year 17",
    emoji: "ðŸ’«",
    title: "My World Changed",
    text: "You came into my life and rearranged everything. The best kind of chaos â€” the kind that makes you want to stay.",
  },
  {
    year: "Year 18",
    emoji: "ðŸŒŸ",
    title: "Unstoppable",
    text: "You step into adulthood with grace, fire, and a smile that could stop traffic. The world has no idea what's coming.",
  },
  {
    year: "Today",
    emoji: "ðŸ‘‘",
    title: "My Queen",
    text: "Every version of you led to this moment â€” and every version was perfect. I'm the luckiest person alive to witness it.",
  },
];

function ZigzagConnector({ fromRight }: { fromRight: boolean }) {
  const w = 60;
  const h = 56;
  return (
    <div className="sm:hidden relative mx-auto" style={{ width: w, height: h }}>
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} fill="none" overflow="visible">
        <defs>
          <linearGradient id="zigGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
          <filter id="zigGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={
            fromRight
              ? `M ${w} 0 L ${w * 0.3} ${h * 0.4} L ${w * 0.7} ${h * 0.6} L 0 ${h}`
              : `M 0 0 L ${w * 0.7} ${h * 0.4} L ${w * 0.3} ${h * 0.6} L ${w} ${h}`
          }
          stroke="url(#zigGrad)"
          strokeWidth="2.5"
          strokeDasharray="6 4"
          filter="url(#zigGlow)"
        />
        <circle cx={fromRight ? w : 0} cy={0} r={5} fill="#d946ef" filter="url(#zigGlow)" opacity={0.9} />
        <circle cx={fromRight ? 0 : w} cy={h} r={5} fill="#fbbf24" filter="url(#zigGlow)" opacity={0.9} />
      </svg>
    </div>
  );
}

export default function TimelineScreen({ onNext, milestones }: { onNext: () => void; milestones?: { year: string; emoji: string; title: string; text: string }[] }) {
  const finalMilestones = milestones || DEFAULT_MILESTONES;
  return (
    // overflow-y-auto + w-full allow this screen to scroll naturally within
    // the page flow. The parent <main> must NOT be overflow-hidden for this
    // screen â€” we only need overflow-x-hidden, which is set on html/body.
    <motion.div
      key="timeline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative w-full flex flex-col items-center gap-6 pb-16 pt-10 sm:gap-8 sm:px-6 sm:pb-20 sm:pt-16"
    >
      <h2
        style={{ fontFamily: "var(--bt7-font-display)" }}
        className="bt7-text-gradient-warm bt7-section-heading text-center"
      >
        Your Journey So Far
      </h2>
      <p className="text-center text-sm text-[#fda4af] sm:text-base">
        Every chapter, a masterpiece âœ¨
      </p>

      <div className="relative mx-auto w-full max-w-3xl">
        {/* â”€â”€ Centre spine â€” desktop only â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="hidden sm:block absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#e11d48] via-[#d946ef] to-[#fbbf24]" />

        {/* â”€â”€ MOBILE layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="flex flex-col sm:hidden gap-0 py-4 px-3">
          {finalMilestones.map((m, i) => {
            const isRight = i % 2 === 1;
            return (
              <div key={i} className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, x: isRight ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  // root: null means use the scroll container (the page itself)
                  viewport={{ once: true, amount: 0.15, root: undefined }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.05 }}
                  className={`w-[85%] ${isRight ? "ml-auto" : "mr-auto"}`}
                >
                  <div className="bt7-glass-card rounded-2xl p-4 shadow-[0_0_24px_rgba(217,70,239,0.2)]">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none">{m.emoji}</span>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-[#fbbf24]">{m.year}</p>
                        <h3
                          style={{ fontFamily: "var(--bt7-font-display)" }}
                          className="truncate text-xl text-white"
                        >
                          {m.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#fda4af]">{m.text}</p>
                  </div>
                </motion.div>

                {i < finalMilestones.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.45, delay: i * 0.05 + 0.12 }}
                    style={{ transformOrigin: "top" }}
                  >
                    <ZigzagConnector fromRight={isRight} />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* â”€â”€ DESKTOP layout â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="hidden sm:flex flex-col gap-8 py-4">
          {finalMilestones.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: right ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.05 }}
                className={`relative w-full ${right ? "pl-[52%]" : "pr-[52%]"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#e11d48] shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
                <div
                  className={`glass-card rounded-2xl p-6 shadow-[0_0_30px_rgba(217,70,239,0.2)] ${
                    !right ? "flex flex-col items-end text-right" : "text-left"
                  }`}
                >
                  <div className={`flex items-center gap-3 ${!right ? "flex-row-reverse" : "flex-row"}`}>
                    <span className="text-4xl leading-none">{m.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-[#fbbf24]">{m.year}</p>
                      <h3
                        style={{ fontFamily: "var(--bt7-font-display)" }}
                        className="truncate text-3xl text-white"
                      >
                        {m.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-2 text-base text-[#fda4af]">{m.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <HapticButton onClick={onNext}>Continue the Journey ðŸ’«</HapticButton>
    </motion.div>
  );
}

