import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import HapticButton from "../HapticButton";

export default function ScratchRevealScreen({ onNext }: { onNext: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawingRef = useRef(false);
  const checkedRef = useRef(false);
  const scratchedRef = useRef(false);

  useEffect(() => {
    const paint = () => {
      const canvas = canvasRef.current;
      if (!canvas || revealed || scratchedRef.current) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
      grad.addColorStop(0, "#e11d48");
      grad.addColorStop(0.5, "#d946ef");
      grad.addColorStop(1, "#fbbf24");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.font = `bold ${Math.max(16, Math.min(22, rect.width * 0.055))}px Allura, cursive`;
      ctx.textAlign = "center";
      ctx.fillText("âœ¨ Scratch to Reveal âœ¨", rect.width / 2, rect.height / 2);
    };
    paint();
    const onOrient = () => {
      scratchedRef.current = false;
      paint();
    };
    window.addEventListener("orientationchange", onOrient);
    return () => window.removeEventListener("orientationchange", onOrient);
  }, [revealed]);

  const getPos = (e: PointerEvent | React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: (e as PointerEvent).clientX - rect.left, y: (e as PointerEvent).clientY - rect.top };
  };

  const scratch = (e: React.PointerEvent) => {
    if (!drawingRef.current || revealed) return;
    scratchedRef.current = true;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    checkProgress();
  };

  const checkProgress = () => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    setTimeout(() => { checkedRef.current = false; }, 200);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
    const pct = cleared / (data.length / 40);
    if (pct > 0.6) {
      setRevealed(true);
      if (navigator.vibrate) navigator.vibrate([30, 30, 60]);
    }
  };

  return (
    <motion.div
      key="scratch"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-12 sm:gap-8"
    >
      <div className="text-center">
        <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading text-center">
          A Secret Wish
        </h2>
        <p className="mt-2 text-sm text-[#fda4af]">Only for you â€” scratch to reveal ðŸ’</p>
      </div>

      <div className="bt7-glass-card relative w-full max-w-md overflow-hidden rounded-3xl p-5 shadow-[0_0_60px_rgba(225,29,72,0.3)] sm:p-8">
        <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 text-center sm:min-h-[240px]">
          <span className="text-5xl" style={{ filter: "drop-shadow(0 0 20px rgba(251,191,36,0.8))" }}>ðŸ’</span>
          <p style={{ fontFamily: "var(--bt7-font-display)" }} className="text-xl text-white leading-relaxed sm:text-3xl">
            My secret wish for you is that{" "}
            <span className="bt7-text-gradient-warm font-bold">every single day</span>{" "}
            of your life feels as magical as you make mine feel.
          </p>
          <p className="text-sm text-[#fda4af]">
            You deserve a love so big it surprises you every morning. ðŸ’–
          </p>
        </div>
        <motion.canvas
          ref={canvasRef}
          animate={revealed ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8 }}
          onPointerDown={(e) => { drawingRef.current = true; scratch(e); }}
          onPointerMove={scratch}
          onPointerUp={() => { drawingRef.current = false; }}
          onPointerLeave={() => { drawingRef.current = false; }}
          className="absolute inset-0 h-full w-full touch-none cursor-crosshair rounded-3xl"
        />
      </div>

      {revealed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <HapticButton onClick={onNext}>Read My Letter ðŸ’Œ</HapticButton>
        </motion.div>
      )}
    </motion.div>
  );
}

