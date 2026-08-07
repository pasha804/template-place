import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";


const reasons = [
  { emoji: "🎉", text: "You make every day feel like a celebration" },
  { emoji: "😍", text: "Your laugh is my favorite melody" },
  { emoji: "💜", text: "The way you love me unconditionally" },
  { emoji: "⭐", text: "You shine brighter than every star" },
  { emoji: "🦋", text: "You are the best in every single way" },
  { emoji: "🌙", text: "Your creative and artistic soul" },
  { emoji: "💪", text: "Your strength and resilience inspire me" },
  { emoji: "🌹", text: "Your beauty inside and out" },
  { emoji: "💕", text: "I LOVE YOU SOO MUCH" },
];

const particles = ["✨", "⭐", "💛", "🎊", "💜", "🌸"];

function SpecialCard({
  reason,
  index,
}: {
  reason: { emoji: string; text: string };
  index: number;
}) {
  const [revealed, setRevealed] = useState(false);
  const [bursting, setBursting] = useState(false);
  const controls = useAnimation();

  const handleTap = async () => {
    if (revealed) return;

    setBursting(true);

    // Pop sequence: grow big → overshoot → settle
    await controls.start({
      scale: 1.45,
      transition: { duration: 0.18, ease: [0.34, 1.8, 0.64, 1] },
    });
    await controls.start({
      scale: 0.92,
      transition: { duration: 0.12, ease: "easeIn" },
    });
    await controls.start({
      scale: 1.08,
      transition: { duration: 0.1, ease: "easeOut" },
    });
    await controls.start({
      scale: 1,
      transition: { duration: 0.15, ease: "easeInOut" },
    });

    setRevealed(true);
    setBursting(false);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      animate={controls}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      whileHover={!revealed ? { scale: 1.06, y: -3 } : {}}
      whileTap={!revealed ? { scale: 0.94 } : {}}
      onClick={handleTap}
      className="relative min-h-[110px] w-full rounded-2xl overflow-hidden cursor-pointer focus:outline-none sm:min-h-[130px]"
      style={{
        background: revealed
          ? "linear-gradient(135deg, #fde68a 0%, #f9a84d 45%, #f97316 100%)"
          : "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
        boxShadow: revealed
          ? "0 10px 36px rgba(249,115,22,0.55), 0 2px 10px rgba(249,115,22,0.25)"
          : "0 8px 32px rgba(109,40,217,0.55), 0 2px 8px rgba(109,40,217,0.25)",
        transition: "background 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Burst particles */}
      {bursting &&
        particles.map((p, pi) => (
          <motion.span
            key={pi}
            initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 1.8,
              x: Math.cos((pi / particles.length) * Math.PI * 2) * 55,
              y: Math.sin((pi / particles.length) * Math.PI * 2) * 55,
            }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base"
          >
            {p}
          </motion.span>
        ))}

      {/* Hidden state */}
      {!revealed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-4xl text-red-400 drop-shadow-lg sm:text-5xl"
          >
            ❓
          </motion.span>
        </div>
      )}

      {/* Revealed state */}
      {revealed && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotate: -6 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 9, stiffness: 280 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.3, 1] }}
            transition={{ duration: 0.4, times: [0, 0.6, 1] }}
            className="text-xl drop-shadow sm:text-2xl"
          >
            {reason.emoji}
          </motion.span>
          <p
            className="font-bold leading-snug text-[#1c0a00]"
            style={{ fontSize: reason.text.length > 20 ? "0.75rem" : "0.88rem" }}
          >
            {reason.text}
          </p>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function SpecialPage({ onNext, title, cards }: { onNext?: () => void; title?: string; cards?: Array<{ emoji?: string; title?: string; text?: string }> }) {
  const cardList = cards && cards.length > 0 ? cards.map(c => ({ emoji: c.emoji || "✨", text: c.text || c.title || "" })) : reasons
  return (
    <PageWrap>
      {/* Header */}
      <div className="glass-card mx-auto max-w-2xl rounded-2xl p-4 text-center sm:p-5">
        <CursiveTitle>{title || "Why You're Special 🎂"}</CursiveTitle>
        <p className="mt-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
          Tap each card to reveal a little reason from my heart ✨
        </p>
      </div>

      {/* Cards grid */}
      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        {cardList.map((r, i) => (
          <SpecialCard key={i} reason={r} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center sm:mt-10">
        <GalaxyLink onClick={onNext}>Make a Wish 🕯️</GalaxyLink>
      </div>
    </PageWrap>
  );
}
