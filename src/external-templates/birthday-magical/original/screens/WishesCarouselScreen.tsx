import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HapticButton from "../HapticButton";

const DEFAULT_WISHES = [
  {
    from: "Your Love ðŸ’–",
    text: "May you wake up every morning knowing you are deeply, completely, unconditionally loved. Because you are.",
  },
  {
    from: "Your Future ðŸŒŸ",
    text: "The most beautiful chapters of your life haven't started yet â€” and I get to be there for every single one of them.",
  },
  {
    from: "The Stars ðŸŒ™",
    text: "You were made from stardust and moonlight, Jana. The universe has been conspiring in your favour since before you were born.",
  },
  {
    from: "My Heart ðŸ’«",
    text: "In every version of every world â€” I'd still find you. I'd still choose you. Over and over, without hesitation.",
  },
  {
    from: "Forever âˆž",
    text: "May every dream you've ever whispered quietly to yourself come true this year, and every year after that.",
  },
];

export default function WishesCarouselScreen({ onNext, wishes }: { onNext: () => void; wishes?: { from: string; text: string }[] }) {
  const finalWishes = wishes || DEFAULT_WISHES;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % finalWishes.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const w = finalWishes[i];

  return (
    <motion.div
      key="wishes"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-12 sm:gap-8 sm:px-6 sm:py-16"
    >
      <div className="text-center">
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading">
          Wishes For My Girl
        </h2>
        <p className="mt-2 text-sm text-[#fda4af]">Swipe or wait â€” each one is from the heart ðŸ’Œ</p>
      </div>

      <div
        className="relative w-full max-w-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.6 }}
            drag="x"
            style={{ touchAction: "pan-y" }}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -40) {
                setI((p) => (p + 1) % finalWishes.length);
                setPaused(true);
              } else if (info.offset.x > 40) {
                setI((p) => (p - 1 + finalWishes.length) % finalWishes.length);
                setPaused(true);
              }
            }}
            className="bt7-glass-card relative rounded-3xl p-6 text-center shadow-[0_0_60px_rgba(225,29,72,0.35)] cursor-grab active:cursor-grabbing sm:p-10"
          >
            {/* Glowing orbs */}
            <div className="pointer-events-none absolute -top-4 -left-4 h-10 w-10 rounded-full bg-gradient-to-br from-[#e11d48] to-[#fbbf24] opacity-60 blur-md" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-10 w-10 rounded-full bg-gradient-to-br from-[#d946ef] to-[#e11d48] opacity-60 blur-md" />

            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl drop-shadow-md sm:-top-7 sm:text-5xl">ðŸ’Œ</span>
            <p className="mt-4 text-lg leading-relaxed text-white sm:text-2xl">"{w.text}"</p>
            <p style={{ fontFamily: "var(--bt7-font-display)" }} className="mt-6 text-xl text-[#fbbf24] sm:text-3xl">
              â€” {w.from}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center gap-1">
          {finalWishes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setI(idx); setPaused(true); }}
              aria-label={`Wish ${idx + 1}`}
              className="flex h-11 min-w-11 items-center justify-center touch-manipulation"
            >
              <span
                className={`block h-2.5 rounded-full transition-all ${
                  idx === i ? "w-8 bg-gradient-to-r from-[#e11d48] to-[#fbbf24]" : "w-2.5 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <HapticButton onClick={onNext}>One Last Surprise ðŸŽŠ</HapticButton>
    </motion.div>
  );
}

