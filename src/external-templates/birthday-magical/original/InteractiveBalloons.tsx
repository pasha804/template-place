import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const COLORS = ["#e11d48", "#d946ef", "#fbbf24", "#fb7185", "#f472b6", "#a78bfa"];

interface Balloon { id: number; left: number; color: string; size: number; duration: number; delay: number; sway: number; }

function makeBalloon(id: number): Balloon {
  return {
    id, left: Math.random() * 92 + 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
    size: Math.random() * 30 + 50,
    duration: Math.random() * 12 + 14,
    delay: Math.random() * 12,
    sway: Math.random() * 40 - 20,
  };
}

export default function InteractiveBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [nextId, setNextId] = useState(20);

  useEffect(() => {
    const count = window.innerWidth < 640 ? 8 : 18;
    setBalloons(Array.from({ length: count }, (_, i) => makeBalloon(i)));
  }, []);

  const pop = useCallback((id: number, x: number, y: number) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(30);
    confetti({ particleCount: 12, spread: 60, startVelocity: 25,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight }, colors: COLORS, scalar: 0.7 });
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBalloons((prev) => [...prev, makeBalloon(nextId)]);
      setNextId((n) => n + 1);
    }, 2500);
  }, [nextId]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden">
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.button
            key={b.id} type="button" aria-label="Pop balloon"
            initial={{ y: "110vh", opacity: 0, scale: 0.8 }}
            animate={{ y: "-25vh", opacity: 1, scale: 1, x: [0, b.sway, -b.sway, 0] }}
            exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.35 } }}
            transition={{
              y: { duration: b.duration, delay: b.delay, ease: "linear" },
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6, delay: b.delay },
              scale: { duration: 0.5, delay: b.delay },
            }}
            onClick={(e) => pop(b.id, e.clientX, e.clientY)}
            style={{ left: `${b.left}%`, width: b.size, height: b.size * 1.2, minWidth: 44, minHeight: 44, touchAction: "manipulation" }}
            className="pointer-events-auto absolute cursor-pointer"
          >
            <div className="relative h-full w-full rounded-[50%] shadow-[inset_-8px_-12px_20px_rgba(0,0,0,0.25),0_10px_30px_rgba(0,0,0,0.3)]"
              style={{ background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), ${b.color} 60%)` }}>
              <div className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2 bg-white/40" />
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
