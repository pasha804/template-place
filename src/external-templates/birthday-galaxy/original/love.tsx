import { motion } from "framer-motion";
import { PageWrap, GalaxyLink } from "./PageWrap";


export default function LovePage({ onNext, letterText }: { onNext?: () => void, letterText?: string }) {
  const textContent = letterText || "This is just the beginning — I have a whole galaxy of moments still planned for us. Happy Birthday, meri Moiza 🌹"
  return (
    <PageWrap>
      <div className="relative flex flex-col items-center justify-center py-8 text-center">
        {/* falling hearts */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ y: -40, x: `${Math.random() * 100}%`, opacity: 0.9, rotate: 0 }}
              animate={{ y: "110vh", rotate: 360 }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: Math.random() * 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute text-lg"
            >
              {["💜", "💖", "✨", "⭐"][i % 4]}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 10, delay: 0.1 }}
          className="heart-glow text-[7rem] leading-none sm:text-[9rem] md:text-[12rem]"
        >
          💜
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-cursive text-gold-gradient shimmer mt-6 text-5xl sm:text-6xl md:text-7xl"
        >
          I Love You!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-5 max-w-sm px-4 text-sm leading-relaxed text-foreground/90 sm:max-w-lg sm:text-base"
        >
          {textContent}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-8"
        >
          <GalaxyLink onClick={onNext}>The Final Words 💫</GalaxyLink>
        </motion.div>
      </div>
    </PageWrap>
  );
}
