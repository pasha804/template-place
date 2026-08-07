import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HapticButton from "../HapticButton";

interface Props { onNext: () => void; personName: string; gifUrl: string; }

export default function IntroScreen({ onNext, personName, gifUrl }: Props) {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowBtn(true), 1500); return () => clearTimeout(t); }, []);

  return (
    <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bt7-screen-shell relative flex w-full flex-col items-center justify-center px-4 py-10 text-center sm:py-12 min-h-screen">
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }} className="relative mb-8">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#fbbf24] shadow-[0_0_50px_rgba(251,191,36,0.6)] sm:h-52 sm:w-52">
          <img src={gifUrl} alt="Celebration" className="h-full w-full object-cover" />
        </div>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ fontFamily: "var(--bt7-font-display)" }}
        className="bt7-text-gradient-warm bt7-hero-title w-full max-w-2xl px-2 text-center font-bold sm:max-w-4xl">
        Happy Birthday, {personName}!
      </motion.h1>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="mb-8 mt-4 text-base text-[#fda4af] sm:text-lg">
        Pop the balloons to start the party! 🎈
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showBtn ? 0 : 1.5, type: "spring", stiffness: 220, damping: 18 }}>
        <HapticButton onClick={onNext}>{showBtn ? "Start the Celebration 🎉" : "Loading Party..."}</HapticButton>
      </motion.div>
    </motion.div>
  );
}
