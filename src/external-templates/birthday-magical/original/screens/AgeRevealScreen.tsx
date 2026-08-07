import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import HapticButton from "../HapticButton";

interface Props { onNext: () => void; age: number; celebrateGifUrl: string; }

export default function AgeRevealScreen({ onNext, age, celebrateGifUrl }: Props) {
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => spring.set(age), 400);
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => { clearTimeout(t); unsub(); };
  }, [spring, rounded, age]);

  return (
    <motion.div key="age" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-center gap-6 px-4 text-center sm:gap-8 min-h-screen">
      <motion.img src={celebrateGifUrl} alt="Celebrate" loading="lazy"
        animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="h-24 w-24 rounded-3xl object-contain drop-shadow-[0_0_30px_rgba(251,191,36,0.5)] sm:h-32 sm:w-32" />
      <p style={{ fontFamily: "var(--bt7-font-display)" }} className="text-2xl text-[#fda4af] sm:text-4xl">
        You are turning...
      </p>
      <motion.div initial={{ scale: 0.8 }} animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
        className="bt7-text-gradient-warm font-black leading-none drop-shadow-[0_0_60px_rgba(225,29,72,0.6)]"
        style={{ fontFamily: "var(--bt7-font-display)", fontSize: "clamp(5.5rem, 28vw, 14rem)" }}>
        {display}
      </motion.div>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
        style={{ fontFamily: "var(--bt7-font-display)" }} className="text-2xl text-white sm:text-5xl">
        Years of Awesome!
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <HapticButton onClick={onNext}>Let's Make a Wish 🕯️</HapticButton>
      </motion.div>
    </motion.div>
  );
}
