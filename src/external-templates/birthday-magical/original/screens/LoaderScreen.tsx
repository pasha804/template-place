import { useEffect } from "react";
import { motion } from "framer-motion";

export default function LoaderScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => { const t = setTimeout(onComplete, 3500); return () => clearTimeout(t); }, [onComplete]);

  const tiers = [
    { w: "min(200px, 55vw)", h: 44, color: "linear-gradient(180deg,#fda4af,#e11d48)", delay: 0.1 },
    { w: "min(150px, 42vw)", h: 40, color: "linear-gradient(180deg,#f0abfc,#d946ef)", delay: 0.6 },
    { w: "min(100px, 30vw)", h: 36, color: "linear-gradient(180deg,#fde68a,#fbbf24)", delay: 1.1 },
  ];

  return (
    <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-center gap-10 min-h-screen">
      <div className="relative flex flex-col-reverse items-center">
        {tiers.map((t, i) => (
          <motion.div key={i}
            initial={{ y: -60, opacity: 0, scale: 0.7 }} animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: t.delay, type: "spring", stiffness: 200, damping: 15 }}
            style={{ width: t.w, height: t.h, background: t.color }}
            className="relative rounded-t-2xl rounded-b-md shadow-[0_10px_40px_rgba(225,29,72,0.35)]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: t.delay + 0.2, duration: 0.6 }}
              className="absolute inset-0 rounded-t-2xl bg-white/50" />
          </motion.div>
        ))}
        <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 300 }}
          style={{ transformOrigin: "bottom" }}
          className="absolute left-1/2 top-[-60px] h-14 w-2 -translate-x-1/2 rounded-full bg-white">
          <div className="bt7-flame absolute -top-6 left-1/2 h-8 w-6 -translate-x-1/2 rounded-full" />
        </motion.div>
      </div>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bt7-text-shimmer text-2xl font-semibold" style={{ fontFamily: "var(--bt7-font-display)" }}>
        Preparing your birthday magic...
      </motion.p>
    </motion.div>
  );
}
