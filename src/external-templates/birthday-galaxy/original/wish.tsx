import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const pandaCakeImg = "/templates/birthday-galaxy/gifs/7-screen.gif";


export default function WishPage({ onNext }: { onNext?: () => void }) {
  const [blown, setBlown] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const blow = () => {
    setBlown(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3200);
  };

  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* GIF — no border, white bg to show panda clearly */}
        <div className="flex w-full justify-center">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img
              src={pandaCakeImg}
              alt="Cute panda with cake"
              loading="lazy"
              width={512}
              height={512}
              className="h-56 w-56 rounded-2xl object-contain sm:h-64 sm:w-64"
            />
          </div>
        </div>

        {/* Interactive card */}
        <div className="glass-card w-full rounded-2xl p-7 text-center md:p-8">
          <CursiveTitle>Make a Wish</CursiveTitle>

          <motion.button
            onClick={blow}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="relative mx-auto my-7 block text-7xl sm:text-8xl"
            aria-label="Blow the candles"
          >
            <AnimatePresence mode="wait">
              {blown ? (
                <motion.span
                  key="slice"
                  initial={{ scale: 0.4, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="inline-block"
                >
                  🍰
                </motion.span>
              ) : (
                <motion.span key="cake" className="relative inline-block">
                  <span>🎂</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -3, 0] }}
                    transition={{ y: { repeat: Infinity, duration: 0.6 } }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl"
                  >
                    🕯️
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence mode="wait">
            {!blown ? (
              <motion.p
                key="pre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground"
              >
                Tap the cake to blow the candles 🕯️
              </motion.p>
            ) : (
              <motion.div
                key="post"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  May every wish you make today come true 🌟 — and may this year bring you more joy
                  than your heart can hold.
                </p>
                <GalaxyLink onClick={onNext}>See Your Wishes ✨</GalaxyLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {confetti && (
          <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ y: -50, x: `${Math.random() * 100}%`, opacity: 1, rotate: 0 }}
                animate={{ y: "110vh", rotate: 720 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5 + Math.random() * 1.5, ease: "easeIn" }}
                className="absolute text-xl"
              >
                {["🎉", "🎊", "⭐", "💖", "✨"][i % 5]}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>
    </PageWrap>
  );
}
