// @ts-nocheck
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mic, MicOff } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Confetti } from "../components/Confetti"

const CANDLES = [{ x: "35.5%", y: "16.5%" }, { x: "48.8%", y: "14.5%" }]

export function Wish({
  onNext,
  anniversaryDate,
  title,
  subtitle,
}: {
  onNext: () => void;
  anniversaryDate?: string;
  title?: string;
  subtitle?: string;
}) {
  const [out, setOut] = useState(false)
  const [listening, setListening] = useState(false)
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => () => stopRef.current?.(), [])

  const blow = () => { setOut(true); stopRef.current?.(); setListening(false) }

  const listen = async () => {
    if (listening) { stopRef.current?.(); setListening(false); return }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 1024
      ctx.createMediaStreamSource(stream).connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      let raf = 0
      const tick = () => {
        analyser.getByteFrequencyData(data)
        let sum = 0
        for (let i = 0; i < 40; i++) sum += data[i] ?? 0
        if (sum / 40 > 105) blow()
        else raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      stopRef.current = () => {
        cancelAnimationFrame(raf)
        stream.getTracks().forEach(t => t.stop())
        void ctx.close()
        stopRef.current = null
      }
      setListening(true)
    } catch { setListening(false) }
  }

  return (
    <SceneShell
      title={title || "Make a Wish"}
      subtitle={
        out
          ? <span className="script text-2xl text-glow" style={{ color: "var(--primary)" }}>Your wish is on its way ✧</span>
          : (subtitle || <>Blow out the candles and<br />make your anniversary wish.</>)
      }
      footerSlot={
        <>
          <motion.button
            type="button"
            onClick={listen}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className={`grid h-14 w-14 place-items-center rounded-full glow-ring ${listening ? "animate-glow-pulse" : ""}`}
            style={{ backgroundImage: "var(--gradient-pink)", color: "var(--primary-foreground)" }}
            aria-label={listening ? "Stop listening" : "Blow out the candles with your microphone"}
          >
            {listening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </motion.button>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {listening ? "Listening… blow gently 🎤" : "Tap the mic & blow (or just tap the candles)"}
          </p>
          {out && <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
        </>
      }
    >
      <div className="relative mx-auto w-full max-w-xs">
        <Confetti active={out} />
        <motion.button
          type="button"
          onClick={blow}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative block w-full"
          aria-label="Tap the candles to blow them out"
        >
          <img
            src="/templates/anniversary-galaxy/cake.webp"
            alt="Anniversary cake with candles"
            width={1024}
            height={1024}
            loading="lazy"
            className="w-full"
            style={{ filter: "drop-shadow(0 20px 50px oklch(0.66 0.27 345 / 35%))" }}
          />
          {CANDLES.map((c, i) => (
            <span key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: c.x, top: c.y }}>
              {!out ? (
                <>
                  <span
                    className="animate-flame block h-6 w-4 rounded-full mix-blend-screen"
                    style={{ animationDelay: `${i * 0.13}s`, filter: "blur(1.5px)", background: "radial-gradient(circle at 50% 70%,oklch(0.98 0.14 92),oklch(0.82 0.19 62) 55%,transparent)" }}
                  />
                  <span className="absolute -inset-5 -z-10 animate-glow-pulse rounded-full mix-blend-screen blur-xl" style={{ background: "oklch(0.87 0.12 88 / 40%)" }} />
                </>
              ) : (
                <motion.span
                  initial={{ opacity: 0.7, y: 0, scale: 0.6 }}
                  animate={{ opacity: 0, y: -70, scale: 2.4 }}
                  transition={{ duration: 2.6, ease: "easeOut" }}
                  className="relative block h-4 w-4 rounded-full blur-md"
                  style={{ background: "oklch(0.96 0.015 330 / 35%)" }}
                />
              )}
            </span>
          ))}
        </motion.button>
        <p className="script mt-2 text-3xl text-glow" style={{ color: "var(--primary)" }}>Happy Anniversary</p>
      </div>
    </SceneShell>
  )
}
