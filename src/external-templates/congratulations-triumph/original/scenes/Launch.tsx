// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Mic, MicOff } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Confetti } from "../components/Confetti"

export function Launch({ onNext }: { onNext: () => void }) {
  const [celebrated, setCelebrated] = useState(false)
  const [listening, setListening] = useState(false)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)

  const stopMic = useCallback(() => {
    if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
    streamRef.current?.getTracks().forEach(t => t.stop()); streamRef.current = null
    setListening(false)
  }, [])

  useEffect(() => stopMic, [stopMic])

  const celebrate = useCallback(() => { setCelebrated(true); stopMic() }, [stopMic])

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const ctx = new AudioContext()
      const analyser = ctx.createAnalyser(); analyser.fftSize = 256
      ctx.createMediaStreamSource(stream).connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      setListening(true)
      const tick = () => {
        analyser.getByteFrequencyData(data)
        let sum = 0; for (let i = 0; i < 40; i++) sum += data[i] ?? 0
        if (sum / 40 > 105) { celebrate(); return }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    } catch { stopMic() }
  }, [celebrate, stopMic])

  return (
    <SceneShell
      title="Launch the Celebration"
      subtitle={celebrated ? "The world is celebrating you! ✧" : "Tap the bottle — or blow into your microphone — to pop the champagne."}
      footer={celebrated
        ? <GlowButton onClick={onNext}>Continue</GlowButton>
        : <>
            <GlowButton variant="ghost" onClick={listening ? stopMic : startMic} ariaLabel={listening ? "Stop" : "Use mic"}>
              {listening ? <MicOff className="h-4 w-4" aria-hidden /> : <Mic className="h-4 w-4" aria-hidden />}
              {listening ? "Listening…" : "Use Microphone"}
            </GlowButton>
            <GlowButton onClick={celebrate}>Pop It</GlowButton>
          </>
      }
    >
      {celebrated && <Confetti seed={9931} />}
      <motion.button
        type="button"
        onClick={celebrate}
        aria-label="Pop the champagne"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        animate={celebrated ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="ct-animate-float relative mx-auto block w-full max-w-md cursor-pointer rounded-[2rem] p-2"
        style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
      >
        <img src="/templates/congratulations-triumph/champagne-podium.jpg" alt="Champagne bottle bursting with golden sparks" width={1024} height={1024} loading="lazy" decoding="async" className="w-full rounded-[1.7rem] object-cover" />
      </motion.button>
    </SceneShell>
  )
}
