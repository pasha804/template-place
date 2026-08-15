import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mic, MicOff } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";
import { Confetti } from "../Confetti";

const CANDLES = [
  { x: "35.5%", y: "16.5%" },
  { x: "48.8%", y: "14.5%" },
];

interface WishProps {
  onNext: () => void;
  cakeHeadingUnlit?: string;
  cakeHeadingLit?: string;
  cakeMessage?: string;
  cakeImageUrl?: string;
}

export function Wish({
  onNext,
  cakeHeadingUnlit = "Make a Wish",
  cakeHeadingLit = "Your wish is on its way ✧",
  cakeMessage = "Happy Birthday",
  cakeImageUrl = "/templates/birthday-celestial/images/cake.webp",
}: WishProps) {
  const [out, setOut] = useState(false);
  const [listening, setListening] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const blow = () => {
    setOut(true);
    setShowFireworks(true);
    stopRef.current?.();
    setListening(false);

    setTimeout(() => {
      setShowFireworks(false);
    }, 3000);
  };

  const listen = async () => {
    if (listening) {
      stopRef.current?.();
      setListening(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      let raf = 0;
      const tick = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < 40; i++) sum += data[i] ?? 0;
        if (sum / 40 > 105) blow();
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      stopRef.current = () => {
        cancelAnimationFrame(raf);
        stream.getTracks().forEach((t) => t.stop());
        void ctx.close();
        stopRef.current = null;
      };
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  return (
    <SceneShell
      title={cakeHeadingUnlit}
      subtitle={
        out ? (
          <span className="text-xl sm:text-2xl text-primary text-glow font-bold">{cakeHeadingLit}</span>
        ) : (
          <>
            Blow out the candles and
            <br />
            make your birthday wish.
          </>
        )
      }
      footerSlot={
        <>
          <motion.button
            type="button"
            onClick={listen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`grid h-14 w-14 place-items-center rounded-full bg-[image:var(--gradient-pink)] text-primary-foreground glow-ring ${listening ? "animate-glow-pulse" : ""}`}
            aria-label={listening ? "Stop listening" : "Blow out the candles with your microphone"}
          >
            {listening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </motion.button>
          <p className="text-xs text-muted-foreground">
            {listening ? "Listening… blow gently 🎤" : "Tap the mic & blow (or just tap the candles)"}
          </p>
          {out && (
            <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
              Next
            </GlowButton>
          )}
        </>
      }
    >
      <div className="relative mx-auto w-full max-w-xs">
        <Confetti active={showFireworks} />
        <motion.button
          type="button"
          onClick={blow}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative block w-full"
          aria-label="Tap the candles to blow them out"
        >
          <img
            src={cakeImageUrl}
            alt="Purple and pink birthday cake with roses and two candles"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full drop-shadow-[0_20px_50px_oklch(0.66_0.27_345/0.35)]"
          />

          {CANDLES.map((c, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: c.x, top: c.y }}
            >
              {!out ? (
                <>
                  <span
                    className="animate-flame block h-6 w-4 rounded-full bg-[radial-gradient(circle_at_50%_70%,oklch(0.98_0.14_92),oklch(0.82_0.19_62)_55%,transparent)] mix-blend-screen"
                    style={{ animationDelay: `${i * 0.13}s`, filter: "blur(1.5px)" }}
                  />
                  <span className="absolute -inset-5 -z-10 animate-glow-pulse rounded-full bg-gold/40 mix-blend-screen blur-xl" />
                </>
              ) : (
                <>
                  <span className="absolute left-1/2 top-1/2 h-7 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background blur-[3px]" />
                  <motion.span
                    initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -70, scale: 2.4 }}
                    transition={{ duration: 2.6, ease: "easeOut" }}
                    className="relative block h-4 w-4 rounded-full bg-foreground/35 blur-md"
                  />
                </>
              )}
            </span>
          ))}
        </motion.button>

        <p className="mt-2 text-3xl text-primary text-glow font-bold">{cakeMessage}</p>
      </div>
    </SceneShell>
  );
}
