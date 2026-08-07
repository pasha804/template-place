import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 4,
}));

function launchFireworks(mobile: boolean) {
  const colors = ["#fbbf24", "#e11d48", "#d946ef", "#ffffff", "#fb7185", "#a78bfa", "#f0abfc"];
  const duration = mobile ? 3500 : 5 * 1000;
  const end = Date.now() + duration;
  const burst = mobile ? 90 : 200;

  confetti({ particleCount: burst, spread: 140, origin: { y: 0.55 }, colors, startVelocity: 50 });

  const interval = setInterval(() => {
    if (Date.now() > end) { clearInterval(interval); return; }
    const t = 1 - (end - Date.now()) / duration;
    const count = Math.round((mobile ? 5 : 10) + (mobile ? 5 : 10) * (1 - t));

    confetti({ particleCount: count, angle: 55, spread: 60, origin: { x: -0.1, y: 0.8 }, colors, startVelocity: 65, gravity: 0.75, scalar: 1.2 });
    confetti({ particleCount: count, angle: 125, spread: 60, origin: { x: 1.1, y: 0.8 }, colors, startVelocity: 65, gravity: 0.75, scalar: 1.2 });
  }, mobile ? 320 : 200);

  const starBursts = setInterval(() => {
    if (Date.now() > end) { clearInterval(starBursts); return; }
    confetti({
      particleCount: mobile ? 28 : 50,
      spread: 360,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors,
      startVelocity: 30,
      ticks: 100,
      shapes: ["star"],
      scalar: 1.4,
    });
  }, mobile ? 900 : 600);

  return () => { clearInterval(interval); clearInterval(starBursts); };
}

export default function CelebrationScreen() {
  const cleanupRef = useRef<(() => void) | null>(null);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [starCount, setStarCount] = useState(40);

  useEffect(() => {
    setStarCount(window.innerWidth < 640 ? 36 : 80);
    const t = setTimeout(() => {
      cleanupRef.current = launchFireworks(window.innerWidth < 640);
      if (navigator.vibrate) navigator.vibrate([80, 40, 80, 40, 120, 60, 200]);
    }, 1200);

    const msgTimer = setTimeout(() => setShowFinalMessage(true), 4000);

    return () => {
      clearTimeout(t);
      clearTimeout(msgTimer);
      cleanupRef.current?.();
    };
  }, []);

  return (
    <motion.div
      key="finale"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-5 py-10 text-center sm:gap-6 sm:py-12"
    >
      {/* Intense Aurora Background Layer */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          background: "linear-gradient(-45deg, #e11d48, #9d174d, #4c1d95, #d946ef)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Animated starfield â€” fewer stars on phones */}
      {STARS.slice(0, starCount).map((s) => (
        <motion.div
          key={s.id}
          className="pointer-events-none absolute rounded-full bg-white z-0"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 1, 0.1], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
        />
      ))}

      {/* Main Glass Container - "Cooked Hard" Premium look */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
        className="bt7-glass-card relative z-10 flex w-full max-w-lg flex-col items-center gap-5 rounded-[2rem] border border-white/20 p-6 shadow-[0_0_80px_rgba(225,29,72,0.4)] backdrop-blur-xl sm:gap-6 sm:rounded-[2.5rem] sm:p-12"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.8 }}
          className="absolute -top-10 text-5xl drop-shadow-[0_0_30px_rgba(251,191,36,0.8)] sm:-top-16 sm:text-8xl"
        >
          ðŸ‘‘
        </motion.div>

        <motion.div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border-2 border-dashed border-[#fbbf24]/40"
          />
          <motion.div
            className="absolute -inset-2 rounded-full"
            animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ background: "radial-gradient(circle, rgba(251,191,36,0.5) 0%, transparent 70%)" }}
          />
          <motion.img
            src="/templates/birthday-magical/gifs/hug.gif"
            alt="Hug"
            loading="lazy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
            className="relative z-10 h-40 w-40 rounded-full object-cover border-[3px] border-white/40 drop-shadow-[0_0_40px_rgba(251,191,36,0.6)] sm:h-52 sm:w-52"
          />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 1 }}
          style={{ fontFamily: "var(--bt7-font-display)" }}
          className="bt7-text-gradient-warm bt7-hero-title mt-2 leading-tight"
        >
          Happy 18th!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-lg text-[#fda4af] sm:text-xl"
        >
          You are the best thing that ever happened to me. ðŸ’—
        </motion.p>

        <AnimatePresence>
          {showFinalMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              className="overflow-hidden border-t border-white/10 pt-6 text-sm text-white/90 sm:text-base"
            >
              <p className="italic leading-relaxed">
                "Here's to the girl who holds my whole heart. Every version of you is my favourite. I promise to always be by your side."
              </p>
              <p style={{ fontFamily: "var(--bt7-font-display)" }} className="mt-4 text-xl text-[#fbbf24]">
                Forever Yours, Jana Jaan ðŸ’
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating hearts â€” clipped at the screen edges */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="pointer-events-none absolute text-3xl sm:text-5xl"
            style={{ left: `${5 + (i * 100) / 15}%`, bottom: "-15%" }}
            animate={{ y: [0, -300, -800], opacity: [0, 1, 0] }}
            transition={{
              duration: 5 + i * 0.4,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            {(["ðŸ’–", "âœ¨", "ðŸŒ¸", "ðŸ’«", "ðŸ’•", "â­", "ðŸŒŸ", "ðŸ’—", "ðŸŒ™", "ðŸŽ‡", "ðŸ’", "ðŸ‘‘", "ðŸ’", "ðŸŽ€", "ðŸ’–"] as const)[i]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

