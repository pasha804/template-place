import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
const giftClosed = "/templates/birthday-magical/images/realistic-gift.png";
const giftOpen = "/templates/birthday-magical/images/realistic-gift-open.png";

export default function UnboxingScreen({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(0);
  const [opened, setOpened] = useState(false);
  const [charging, setCharging] = useState(false);
  const holdingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const decayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-12, 12]), { stiffness: 150, damping: 15 });

  const shakeIntensity = progress > 60 ? (progress - 60) / 40 : 0;

  const start = () => {
    if (opened) return;
    holdingRef.current = true;
    setCharging(true);
    if (decayRef.current) { clearInterval(decayRef.current); decayRef.current = null; }
    startRef.current = performance.now() - progress * 22;
    const tick = () => {
      if (!holdingRef.current) return;
      const elapsed = performance.now() - startRef.current;
      const p = Math.min(100, elapsed / 22);
      setProgress(p);
      if (p >= 100) { open(); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    if (navigator.vibrate) navigator.vibrate(15);
  };

  const stop = () => {
    holdingRef.current = false;
    setCharging(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!opened) {
      if (decayRef.current) clearInterval(decayRef.current);
      decayRef.current = setInterval(() => {
        setProgress((p) => {
          if (p <= 0 || holdingRef.current) {
            if (decayRef.current) { clearInterval(decayRef.current); decayRef.current = null; }
            return Math.max(0, p);
          }
          return Math.max(0, p - 3.5);
        });
      }, 30);
    }
  };

  const open = () => {
    setOpened(true);
    setCharging(false);
    if (navigator.vibrate) navigator.vibrate([80, 40, 120, 40, 200]);
    const mobile = window.innerWidth < 640;
    const fire = (ratio: number, opts: confetti.Options) => {
      confetti({
        origin: { y: 0.5 },
        particleCount: Math.floor((mobile ? 160 : 320) * ratio),
        colors: ["#e11d48", "#d946ef", "#fbbf24", "#f472b6", "#ffffff"],
        ...opts,
      });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
    setTimeout(onNext, 2400);
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (decayRef.current) clearInterval(decayRef.current);
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const resetTilt = () => { mx.set(0); my.set(0); };

  const R = 148;
  const circumference = 2 * Math.PI * R;
  const sparkles = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  return (
    <motion.div
      key="unbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-8 sm:gap-8 sm:py-10"
    >
      {/* Cinematic radial glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(640px, 140vw)",
          height: "min(640px, 140vw)",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.42) 0%, rgba(217,70,239,0.18) 40%, transparent 72%)",
          opacity: 0.35 + (progress / 100) * 0.65,
          filter: `blur(${12 + progress / 4}px)`,
        }}
        animate={opened ? { scale: [1, 2.8, 0], opacity: [1, 0.85, 0] } : {}}
        transition={{ duration: 1.4 }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <span className="text-xs uppercase tracking-[0.4em] text-[#fbbf24]/80">â€” Chapter VII â€”</span>
        <motion.h2
          style={{ fontFamily: "var(--bt7-font-display)" }}
          className="bt7-text-gradient-warm bt7-section-heading"
          animate={charging ? { scale: [1, 1.02, 1] } : {}}
          transition={{ duration: 0.4, repeat: charging ? Infinity : 0 }}
        >
          A Gift, Wrapped With Love
        </motion.h2>
        <motion.p
          className="max-w-md text-sm font-medium tracking-wide text-[#fda4af] sm:text-base"
          animate={{ opacity: charging ? [0.6, 1, 0.6] : 1 }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          {opened ? "âœ¨ Unwrappingâ€¦" : charging ? "Keep holding, almost thereâ€¦" : "Press & hold the ribbon to unwrap"}
        </motion.p>
      </div>

      <div
        ref={containerRef}
        onPointerMove={handleMove}
        onPointerLeave={resetTilt}
        className="relative"
        style={{ perspective: 1200 }}
      >
        {/* Progress ring */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(300px,88vw)] w-[min(300px,88vw)] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px]"
          viewBox="0 0 360 360"
        >
          <defs>
            <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#e11d48" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <filter id="ringGlow">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="180" cy="180" r={R} stroke="rgba(255,255,255,0.06)" strokeWidth="4" fill="none" />
          {Array.from({ length: 48 }).map((_, i) => {
            const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
            const on = (i / 48) * 100 <= progress;
            const x1 = 180 + Math.cos(a) * (R + 10);
            const y1 = 180 + Math.sin(a) * (R + 10);
            const x2 = 180 + Math.cos(a) * (R + 18);
            const y2 = 180 + Math.sin(a) * (R + 18);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={on ? "#fbbf24" : "rgba(255,255,255,0.12)"}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ transition: "stroke 0.15s" }}
              />
            );
          })}
          <circle
            cx="180" cy="180" r={R}
            stroke="url(#ringGrad)"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            transform="rotate(-90 180 180)"
            filter="url(#ringGlow)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>

        {/* Orbiting sparkles */}
        {sparkles.map((i) => {
          const angle = (i / sparkles.length) * Math.PI * 2;
          const radius = 172;
          const cx = Math.cos(angle) * radius;
          const cy = Math.sin(angle) * radius;
          const active = (i / sparkles.length) * 100 <= progress;
          return (
            <motion.div
              key={i}
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ x: cx, y: cy }}
              animate={charging
                ? { scale: [0.6, 1.4, 0.6], opacity: active ? [0.6, 1, 0.6] : 0.15 }
                : { scale: 1, opacity: active ? 0.8 : 0.15 }
              }
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.04 }}
            >
              <div
                className="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: active ? "#fde68a" : "rgba(255,255,255,0.4)",
                  boxShadow: active ? "0 0 12px #fbbf24, 0 0 20px #d946ef" : "none",
                }}
              />
            </motion.div>
          );
        })}

        <motion.button
          type="button"
          aria-label="Press and hold to unwrap gift"
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
          animate={
            opened
              ? { scale: [1, 1.1, 1], y: [0, -10, 0] }
              : charging
              ? {
                  x: [0, -shakeIntensity * 5, shakeIntensity * 5, -shakeIntensity * 4, 0],
                  y: [0, shakeIntensity * 4, -shakeIntensity * 4, 0],
                  scale: 1 + progress * 0.0015,
                }
              : { scale: 1 }
          }
          transition={
            opened
              ? { duration: 0.8 }
              : charging
              ? { duration: 0.11, repeat: Infinity }
              : { type: "spring", stiffness: 200, damping: 15 }
          }
          className="relative h-52 w-52 cursor-pointer touch-none select-none sm:h-72 sm:w-72"
        >
          <div
            aria-hidden
            className="absolute -bottom-8 left-1/2 h-8 w-52 -translate-x-1/2 rounded-full bg-black/60 blur-2xl"
            style={{ opacity: 0.5 - progress / 400 }}
          />

          {/* Closed gift */}
          <motion.img
            src={giftClosed}
            alt="Luxurious burgundy velvet gift box with gold satin ribbon"
            width={1024}
            height={1024}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            animate={opened ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_25px_50px_rgba(225,29,72,0.55)] select-none"
            style={{ WebkitTouchCallout: "none", pointerEvents: "none" }}
          />

          {/* Opened gift */}
          <motion.img
            src={giftOpen}
            alt="Opened gift box with golden light bursting out"
            width={1024}
            height={1024}
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={opened ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_25px_60px_rgba(251,191,36,0.7)] select-none"
            style={{ WebkitTouchCallout: "none", pointerEvents: "none" }}
          />
        </motion.button>
      </div>

      {/* Progress readout */}
      <div className="relative z-10 flex items-center gap-4">
        <div
          className="tabular-nums text-sm font-semibold tracking-widest"
          style={{
            color: progress >= 100 ? "#fbbf24" : "#fda4af",
            textShadow: charging ? "0 0 20px currentColor" : "none",
          }}
        >
          {Math.round(progress).toString().padStart(3, "0")}%
        </div>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #e11d48, #d946ef, #fbbf24)",
              boxShadow: "0 0 12px #fbbf24",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

