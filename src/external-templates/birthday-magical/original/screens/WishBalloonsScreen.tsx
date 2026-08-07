import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import HapticButton from "../HapticButton";

const DEFAULT_WISHES = [
  "May you always know how deeply, completely loved you are. ðŸ’–",
  "May every morning you wake up feel like a fresh gift just for you.",
  "May your laugh never lose its magic â€” it's the best sound in the world.",
  "May you always find your way back to joy, no matter what storms come.",
  "May you be surrounded by people who see your worth â€” and never let you forget it.",
  "May life be as kind to you as you are to everyone around you.",
  "May every dream you whisper quietly come true, one by one.",
  "May you love yourself the way I love you â€” endlessly and without reason.",
  "May 18 be the start of your most radiant, powerful, beautiful chapter yet.",
  "May the universe always send you back to me. ðŸŒ™âœ¨",
];

const COLORS = ["#e11d48", "#d946ef", "#fbbf24", "#fb7185", "#f472b6", "#a78bfa", "#f97316"];

interface WishBalloon {
  id: number;
  wish: string;
  color: string;
  left: number;
  top: number;
  size: number;
  delay: number;
  sway: number;
  popped: boolean;
}

export default function WishBalloonsScreen({ onNext, wishes }: { onNext: () => void; wishes?: string[] }) {
  const finalWishes = wishes || DEFAULT_WISHES;
  const balloons = useMemo<WishBalloon[]>(() => {
    return finalWishes.map((wish, i) => ({
      id: i,
      wish,
      color: COLORS[i % COLORS.length]!,
      left: 6 + ((i * 9) % 84) + (Math.random() * 6 - 3),
      top: 6 + Math.floor(i / 5) * 30 + (Math.random() * 6),
      size: 72 + Math.round(Math.random() * 20),
      delay: i * 0.08,
      sway: (Math.random() * 24 - 12),
      popped: false,
    }));
  }, []);

  const [popped, setPopped] = useState<Set<number>>(new Set());
  const [revealed, setRevealed] = useState<{ id: number; wish: string; color: string } | null>(null);

  const remaining = balloons.length - popped.size;
  const done = remaining === 0;

  useEffect(() => {
    if (done) {
      const colors = ["#e11d48", "#d946ef", "#fbbf24", "#f472b6", "#fde68a"];
      const end = Date.now() + 2500;
      (function frame() {
        confetti({ particleCount: 7, angle: 60, spread: 70, origin: { x: 0 }, colors });
        confetti({ particleCount: 7, angle: 120, spread: 70, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }
  }, [done]);

  const pop = (b: WishBalloon, x: number, y: number) => {
    if (popped.has(b.id)) return;
    if (navigator.vibrate) navigator.vibrate(35);
    confetti({
      particleCount: 25,
      spread: 70,
      startVelocity: 30,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: [b.color, "#fbbf24", "#ffffff"],
      scalar: 0.8,
    });
    setPopped((prev) => {
      const next = new Set(prev);
      next.add(b.id);
      return next;
    });
    setRevealed({ id: b.id, wish: b.wish, color: b.color });
  };

  return (
    <motion.div
      key="wish-balloons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center py-8 sm:py-10"
    >
      <div className="relative z-20 flex flex-col items-center gap-2 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-[#fbbf24]/80">â€” For Jana â€”</span>
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading">
          Pop a Wish
        </h2>
        <p className="max-w-md text-sm text-[#fda4af] sm:text-base">
          {done
            ? "Every wish is yours now â€” carry them with you forever. ðŸ’«"
            : `Each balloon holds a wish from my heart â€” ${remaining} left to open ðŸ’–`}
        </p>
        {/* progress bar */}
        <div className="mt-2 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #e11d48, #d946ef, #fbbf24)",
              boxShadow: "0 0 10px #fbbf24",
            }}
            animate={{ width: `${(popped.size / balloons.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          />
        </div>
      </div>

      {/* Balloon field */}
      <div className="relative mt-6 h-[min(62dvh,480px)] w-full max-w-3xl sm:mt-8 sm:h-[560px] md:h-[600px]">
        {balloons.map((b) => {
          const isPopped = popped.has(b.id);
          if (isPopped) return null;
          const size = Math.min(b.size + 8, 96);
          return (
            <motion.button
              key={b.id}
              type="button"
              aria-label={`Pop wish balloon ${b.id + 1}`}
              initial={{ y: 40, opacity: 0, scale: 0.6 }}
              animate={{
                y: [0, -10, 0, 10, 0],
                opacity: 1,
                scale: 1,
                x: [0, b.sway, -b.sway, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: b.delay },
                scale: { duration: 0.5, delay: b.delay, type: "spring", stiffness: 160, damping: 14 },
                y: { duration: 5 + (b.id % 3), repeat: Infinity, ease: "easeInOut", delay: b.delay },
                x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: b.delay },
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.88 }}
              onClick={(e) => pop(b, e.clientX, e.clientY)}
              style={{
                left: `${b.left}%`,
                top: `${b.top}%`,
                width: size,
                height: size * 1.2,
                minWidth: 52,
                minHeight: 62,
              }}
              className="absolute -translate-x-1/2 cursor-pointer touch-manipulation"
            >
              <div
                className="relative h-full w-full rounded-[50%] shadow-[inset_-10px_-14px_24px_rgba(0,0,0,0.28),0_14px_36px_rgba(0,0,0,0.35)]"
                style={{
                  background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.7), ${b.color} 62%)`,
                }}
              >
                <span className="absolute inset-x-2 top-1/2 -translate-y-1/2 text-center text-[10px] font-semibold uppercase tracking-widest text-white/90 drop-shadow">
                  Wish
                </span>
                <div className="absolute left-1/2 top-full h-14 w-px -translate-x-1/2 bg-white/50" />
                <div
                  className="absolute left-1/2 top-[calc(100%+56px)] h-3 w-3 -translate-x-1/2 rotate-45"
                  style={{ background: b.color, opacity: 0.7 }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Wish reveal modal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            key={revealed.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-md"
            onClick={() => setRevealed(null)}
          >
            <motion.div
              initial={{ scale: 0.6, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="bt7-glass-card relative max-w-sm w-full rounded-3xl px-8 py-10 text-center"
              style={{ boxShadow: `0 0 80px ${revealed.color}66, 0 0 160px ${revealed.color}33` }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-4xl" style={{ filter: `drop-shadow(0 0 16px ${revealed.color})` }}>ðŸŽˆ</span>
              <div
                className="mx-auto my-4 h-0.5 w-20 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${revealed.color}, transparent)` }}
              />
              <p
                style={{ fontFamily: "var(--bt7-font-display)" }}
                className="text-xl leading-snug text-white sm:text-2xl"
              >
                "{revealed.wish}"
              </p>
              <button
                onClick={() => setRevealed(null)}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-[#fda4af] transition-colors hover:text-white"
              >
                tap to close âœ¨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 sm:bottom-10"
          style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <HapticButton onClick={onNext}>End the Night âœ¨</HapticButton>
        </motion.div>
      )}
    </motion.div>
  );
}

