import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import confetti from "canvas-confetti";
import HapticButton from "../HapticButton";
import CakeScene from "../cake/CakeScene";
import { useMicrophoneBlow } from "../useMicrophoneBlow";

function vibrate(p: number | number[]) {
  if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(p);
}

function CandleBar({ flames }: { flames: boolean[] }) {
  const lit = flames.filter(Boolean).length;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full bg-black/40 px-4 py-2 backdrop-blur-lg border border-white/10">
      <div className="flex gap-1.5">
        {flames.map((on, i) => (
          <motion.span key={i}
            animate={{ opacity: on ? 1 : 0.2, scale: on ? 1.15 : 0.8,
              backgroundColor: on ? "#fbbf24" : "rgba(255,255,255,0.15)",
              boxShadow: on ? "0 0 7px 2px rgba(251,191,36,0.75)" : "none" }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
            className="block h-2 w-2 rounded-full" />
        ))}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">{lit} / {flames.length} lit</span>
    </motion.div>
  );
}

type MicSt = "idle" | "active" | "denied" | "unsupported";
function MicPill({ status }: { status: MicSt }) {
  if (status === "idle" || status === "unsupported") return null;
  const denied = status === "denied";
  return (
    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
      className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold backdrop-blur-lg ${denied ? "border-red-500/30 bg-red-500/15 text-red-300" : "border-emerald-400/30 bg-emerald-500/15 text-emerald-300"}`}>
      <span className={`h-2 w-2 rounded-full ${denied ? "bg-red-400" : "bg-emerald-400"}`} />
      {denied ? "Mic denied — tap candles" : "🎤 Listening…"}
    </motion.div>
  );
}

function CakeLoader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[1.25rem]" style={{ background: "#0a0a12" }}>
      <div className="relative flex flex-col-reverse items-center gap-0">
        {[{ w: 88, h: 18, bg: "linear-gradient(180deg,#fda4af,#e11d48)" },
          { w: 66, h: 16, bg: "linear-gradient(180deg,#f0abfc,#d946ef)" },
          { w: 44, h: 14, bg: "linear-gradient(180deg,#fde68a,#fbbf24)" }].map((t, i) => (
          <div key={i} className="rounded-sm" style={{ width: t.w, height: t.h, background: t.bg }} />
        ))}
        <div className="absolute -top-5 flex gap-3">
          {["#fbbf24","#f472b6","#a78bfa"].map((c, i) => (
            <div key={i} className="h-3 w-1.5 rounded-full"
              style={{ background: `radial-gradient(ellipse at 50% 80%, #fff6b0, ${c})`, filter: `drop-shadow(0 0 4px ${c})` }} />
          ))}
        </div>
      </div>
      <p className="bt7-text-shimmer text-sm font-semibold tracking-[0.2em] uppercase">Baking your cake…</p>
    </div>
  );
}

function SceneReady({ children, onReady }: { children: ReactNode; onReady: () => void }) {
  const firedRef = useRef(false);
  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const t = setTimeout(onReady, 200);
    return () => clearTimeout(t);
  }, [onReady]);
  return <>{children}</>;
}

function CakeCanvasWithFallback({ flames, onCandleClick }: { flames: boolean[]; onCandleClick: (i:number)=>void }) {
  const [ready, setReady] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => { setMobile(window.innerWidth < 640); }, []);

  return (
    <div className="relative h-full w-full" style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
      <AnimatePresence>
        {!ready && (
          <motion.div key="cake-loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 z-10">
            <CakeLoader />
          </motion.div>
        )}
      </AnimatePresence>
      <Canvas shadows={!mobile} camera={{ position: [0, 1.5, 4.1], fov: 36 }}
        gl={{ antialias: !mobile, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3, powerPreference: "high-performance" }}
        dpr={mobile ? [1, 1.25] : [1, 1.5]} style={{ width: "100%", height: "100%", touchAction: "none" }}>
        <Suspense fallback={null}>
          <SceneReady onReady={() => setReady(true)}>
            <CakeScene flames={flames} onCandleClick={onCandleClick} />
          </SceneReady>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function InteractiveCakeScreen({ onNext }: { onNext: () => void }) {
  const [flames, setFlames] = useState([true,true,true,true,true]);
  const firedRef = useRef(false);
  const allBlown = flames.every((f) => !f);
  const litCount = flames.filter(Boolean).length;

  const blowCandle = useCallback((index: number) => {
    setFlames((prev) => { if (!prev[index]) return prev; const next = [...prev]; next[index] = false; vibrate(18); return next; });
  }, []);

  const blowNext = useCallback(() => {
    setFlames((prev) => { const idx = prev.findIndex(Boolean); if (idx === -1) return prev; const next = [...prev]; next[idx] = false; vibrate(18); return next; });
  }, []);

  const { status: micStatus, start: startMic, stop: stopMic } = useMicrophoneBlow({ onBlow: blowNext, threshold: 60, cooldownFrames: 38, lowBins: 20 });

  useEffect(() => { if (allBlown && micStatus === "active") stopMic(); }, [allBlown, micStatus, stopMic]);

  useEffect(() => {
    if (allBlown && !firedRef.current) {
      firedRef.current = true;
      vibrate([60,30,60]);
      confetti({ particleCount: window.innerWidth < 640 ? 70 : 120, spread: 110, startVelocity: 42, origin: { y: 0.5 },
        colors: ["#fbbf24","#e11d48","#d946ef","#f472b6","#fde68a"] });
      setTimeout(() => {
        const n = window.innerWidth < 640 ? 40 : 80;
        confetti({ particleCount: n, spread: 80, angle: 60, startVelocity: 36, origin: { x: 0.05, y: 0.55 }, colors: ["#fbbf24","#e11d48"] });
        confetti({ particleCount: n, spread: 80, angle: 120, startVelocity: 36, origin: { x: 0.95, y: 0.55 }, colors: ["#d946ef","#f472b6"] });
      }, 350);
    }
  }, [allBlown]);

  const subtitle = allBlown ? "Your wish is in the air ✨ Let's keep going."
    : micStatus === "active" ? `Blow softly… ${litCount} candle${litCount !== 1 ? "s" : ""} left 🎤`
    : micStatus === "denied" ? "Tap a candle to blow it out."
    : "Tap a candle or use your breath to blow them out.";

  return (
    <motion.div key="cake-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-center gap-4 py-6 sm:gap-5 sm:py-8 min-h-screen">
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-[10px] font-medium uppercase text-[#fbbf24]/70 sm:text-[11px] tracking-widest">✦ Chapter III ✦</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.2 }}
          className="bt7-text-gradient-warm text-5xl font-bold leading-none" style={{ fontFamily: "var(--bt7-font-display)" }}>
          Make a Wish
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.p key={subtitle} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} className="max-w-sm text-center text-sm text-[#fda4af]/80 sm:text-base">{subtitle}</motion.p>
        </AnimatePresence>
      </div>

      <div className="relative h-[min(52dvh,520px)] w-full max-w-[640px] select-none sm:h-[58dvh] sm:max-h-[600px]">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(420px,90vw)] w-[min(420px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[560px] sm:w-[560px]"
          style={{ background: "radial-gradient(circle,rgba(225,29,72,0.22) 0%,rgba(217,70,239,0.15) 38%,transparent 68%)", filter: "blur(40px)" }} />
        <CakeCanvasWithFallback flames={flames} onCandleClick={blowCandle} />
        <CandleBar flames={flames} />
        <AnimatePresence><MicPill key={micStatus} status={micStatus as MicSt} /></AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-3 pt-1">
        <AnimatePresence mode="popLayout">
          {!allBlown && micStatus === "idle" && (
            <motion.div key="mic" initial={{ opacity: 0, y: 14, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.88 }}>
              <HapticButton onClick={startMic}>🎤 Blow with your breath</HapticButton>
            </motion.div>
          )}
          {!allBlown && micStatus === "active" && (
            <motion.div key="listening" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/12 px-5 py-2.5 text-sm font-semibold text-emerald-300 backdrop-blur-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              {litCount} candle{litCount !== 1 ? "s" : ""} left — blow!
            </motion.div>
          )}
          {allBlown && (
            <motion.div key="next" initial={{ opacity: 0, y: 14, scale: 0.88 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}>
              <HapticButton onClick={onNext}>See Your Memories 📸</HapticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
