// @ts-nocheck
"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Mic, MicOff, Sparkles } from "lucide-react"

// Sprinkle colours
const SPRINKLE_COLORS = ["#ff758c","#ff9a3c","#ffdd4a","#6ee7b7","#7dd3fc","#c4b5fd","#f9a8d4"]

// Candle configs
const CANDLES = [
  { left:"32%", height:44, color:"from-yellow-300 to-amber-400" },
  { left:"50%", height:52, color:"from-pink-300 to-rose-400" },
  { left:"68%", height:44, color:"from-yellow-300 to-amber-400" },
]

// Confetti colors matching the site palette
const CONFETTI_COLORS = ["#ff758c","#ff7eb3","#f43f5e","#fda4af","#ffffff","#ffd1ff"]

export default function CakeScreen({ onFinish, headingUnlit, headingLit, birthdayText }) {
  // "unlit" | "lit" | "blown"
  const [phase, setPhase]       = useState("unlit")
  const [micError, setMicError] = useState(false)
  const [blowPct, setBlowPct]   = useState(0)   // 0-100 visual progress
  const [showWish, setShowWish] = useState(false)

  const analyserRef   = useRef(null)
  const streamRef     = useRef(null)
  const rafRef        = useRef(null)
  const blowStartRef  = useRef(null) // timestamp when sustained blow started
  const confettiFired = useRef(false)

  // ── fire confetti ──
  const fireConfetti = useCallback(async () => {
    if (confettiFired.current) return
    confettiFired.current = true
    const confetti = (await import("canvas-confetti")).default

    // left + right side bursts
    const end = Date.now() + 3000
    const frame = () => {
      confetti({ particleCount:3, angle:60,  spread:55, origin:{ x:0 },   colors:CONFETTI_COLORS })
      confetti({ particleCount:3, angle:120, spread:55, origin:{ x:1 },   colors:CONFETTI_COLORS })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    // center big burst
    confetti({ particleCount:150, spread:90, origin:{ y:0.55 }, colors:CONFETTI_COLORS, scalar:1.2 })
  }, [])

  // ── start mic + analyser ──
  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true, video:false })
      streamRef.current = stream
      const ctx      = new (window.AudioContext || window.webkitAudioContext)()
      const source   = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const data = new Uint8Array(analyser.frequencyBinCount)

      const detect = () => {
        if (!analyserRef.current) return
        analyserRef.current.getByteFrequencyData(data)
        // average of first 20 frequency bins (low-freq blow energy)
        const avg = data.slice(0, 20).reduce((s,v) => s+v, 0) / 20
        const pct = Math.min(100, (avg / 140) * 100)
        setBlowPct(pct)

        if (avg > 140) {
          if (!blowStartRef.current) blowStartRef.current = Date.now()
          else if (Date.now() - blowStartRef.current > 500) {
            blowCandles()
            return
          }
        } else {
          blowStartRef.current = null
        }
        rafRef.current = requestAnimationFrame(detect)
      }
      rafRef.current = requestAnimationFrame(detect)
    } catch {
      setMicError(true)
    }
  }, [])

  // ── stop mic ──
  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    analyserRef.current = null
    streamRef.current   = null
  }, [])

  // ── light candles ──
  const lightCandles = () => {
    setPhase("lit")
    startMic()
  }

  // ── blow candles ──
  const blowCandles = useCallback(() => {
    stopMic()
    setBlowPct(0)
    setPhase("blown")
    fireConfetti()
    setTimeout(() => setShowWish(true), 800)
  }, [stopMic, fireConfetti])

  useEffect(() => () => stopMic(), [stopMic])

  // Random sprinkle positions (stable across renders via useMemo-like pattern)
  const sprinkles = useRef(
    Array.from({ length:28 }, () => ({
      x: Math.random()*100, y: Math.random()*100,
      w: 4+Math.random()*6, h: 2+Math.random()*3,
      rot: Math.random()*360,
      color: SPRINKLE_COLORS[Math.floor(Math.random()*SPRINKLE_COLORS.length)],
    }))
  ).current

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] pointer-events-none"
        style={{ background:"radial-gradient(ellipse, rgba(160,0,0,0.32) 0%, transparent 70%)", filter:"blur(45px)" }} />
      <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        animate={{ opacity:[0.3,0.6,0.3] }} transition={{ duration:3, repeat:Infinity }}
        style={{ background:"radial-gradient(ellipse, rgba(200,0,60,0.2) 0%, transparent 70%)", filter:"blur(40px)" }} />

      {/* Floating particles */}
      {[...Array(12)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:2+(i%3), height:2+(i%3), left:`${5+i*7.8}%`, top:`${8+(i%5)*18}%`, background:`rgba(${i%2===0?"200,30,30":"255,140,140"},0.38)` }}
          animate={{ y:[-14,14,-14], opacity:[0.2,0.65,0.2] }}
          transition={{ duration:3.2+i*0.33, repeat:Infinity, delay:i*0.18 }}
        />
      ))}

      {/* ── Header ── */}
      <motion.div initial={{ opacity:0, y:-30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9 }}
        className="text-center mb-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black" style={{ color:"rgba(255,255,255,0.93)" }}>
          {phase === "blown" ? (headingLit || "Happy Birthday! 🎉") : (headingUnlit || "Make a Wish 🕯️")}
        </h2>
        <p className="text-xs tracking-[0.22em] mt-1"
          style={{ color:"rgba(255,130,130,0.5)" }}>
          {phase === "unlit"  && "tap the cake to light the candles"}
          {phase === "lit"    && (micError ? "tap the cake to blow them out!" : "now blow into your mic… 🎤")}
          {phase === "blown"  && (birthdayText || "your wish has been sent ✨")}
        </p>
      </motion.div>

      {/* ── CAKE ── */}
      <motion.div
        initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
        transition={{ delay:0.25, duration:0.9, type:"spring", bounce:0.35 }}
        className="relative z-10 mb-6 select-none"
        onClick={() => {
          if (phase === "unlit") lightCandles()
          if (phase === "lit" && micError) blowCandles()
        }}
        style={{ cursor: phase === "blown" ? "default" : "pointer" }}
        whileTap={phase !== "blown" ? { scale:0.97 } : {}}
      >
        {/* ── candles ── */}
        <div className="relative" style={{ height:64, marginBottom:-2 }}>
          {CANDLES.map((c, i) => (
            <div key={i} className="absolute bottom-0"
              style={{ left:c.left, transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", zIndex:10 }}>

              {/* Flame */}
              <AnimatePresence>
                {phase === "lit" && (
                  <motion.div
                    key={`flame-${i}`}
                    initial={{ opacity:0, scaleY:0, y:10 }}
                    animate={{ opacity:1, scaleY:1, y:0 }}
                    exit={{ opacity:0, scaleY:0, y:-8, filter:"blur(4px)" }}
                    transition={{ delay:i*0.12, duration:0.45 }}
                    style={{ marginBottom:-4 }}
                  >
                    <motion.div
                      animate={{ scaleX:[1,1.15,0.9,1.1,1], scaleY:[1,1.1,0.92,1.05,1], rotate:[-3,3,-2,2,0] }}
                      transition={{ duration:0.9+i*0.15, repeat:Infinity, ease:"easeInOut" }}
                      className="relative flex items-end justify-center"
                    >
                      {/* outer flame */}
                      <div style={{
                        width:14, height:22,
                        background:"linear-gradient(to top, #fbbf24, #fde68a, #fffbeb)",
                        borderRadius:"50% 50% 30% 30% / 60% 60% 40% 40%",
                        boxShadow:"0 0 14px 5px rgba(253,224,71,0.75), 0 0 30px 8px rgba(251,191,36,0.4)",
                        filter:"blur(0.3px)",
                      }} />
                      {/* inner core */}
                      <div style={{
                        position:"absolute", bottom:3,
                        width:6, height:12,
                        background:"linear-gradient(to top, #fff, #fef9c3)",
                        borderRadius:"50% 50% 30% 30% / 60% 60% 40% 40%",
                      }} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Candle body */}
              <motion.div
                className={`rounded-t-md bg-gradient-to-b ${c.color}`}
                style={{ width:12, height:c.height }}
                animate={phase==="lit" ? { boxShadow:["0 0 6px rgba(251,191,36,0.5)","0 0 14px rgba(251,191,36,0.8)","0 0 6px rgba(251,191,36,0.5)"] } : {}}
                transition={{ duration:1.2, repeat:Infinity }}
              >
                {/* wax drips */}
                {[20,55,80].map((pct,j) => (
                  <div key={j} className="absolute" style={{
                    top:`${pct}%`, left:-1,
                    width:5, height:5,
                    background:"inherit", borderRadius:"0 0 50% 50%",
                    opacity:0.7,
                  }} />
                ))}
              </motion.div>

              {/* wick */}
              <div style={{ width:2, height:6, background:"#78350f", borderRadius:1 }} />
            </div>
          ))}
        </div>

        {/* ── Tier 1 (top) ── */}
        <div className="relative" style={{ width:160, height:52, margin:"0 auto" }}>
          <div className="w-full h-full rounded-xl overflow-hidden relative"
            style={{ background:"linear-gradient(135deg, #f9a8d4 0%, #ec4899 60%, #db2777 100%)", boxShadow:"0 4px 18px rgba(219,39,119,0.4)" }}>
            {sprinkles.slice(0,12).map((s,i) => (
              <div key={i} className="absolute rounded-full" style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.w, height:s.h, background:s.color, transform:`rotate(${s.rot}deg)`, opacity:0.85 }} />
            ))}
            {/* frosting drips */}
            {[10,25,40,58,75,90].map((pct,i) => (
              <div key={i} className="absolute top-0" style={{ left:`${pct}%`, width:12, height:8+(i%3)*4, background:"rgba(255,255,255,0.9)", borderRadius:"0 0 50% 50%", transform:"translateX(-50%)" }} />
            ))}
          </div>
          {/* top frosting stripe */}
          <div className="absolute -top-2 left-2 right-2 h-4 rounded-full"
            style={{ background:"rgba(255,255,255,0.92)", boxShadow:"0 2px 8px rgba(255,255,255,0.4)" }} />
        </div>

        {/* ── Tier 2 (middle) ── */}
        <div className="relative" style={{ width:210, height:60, margin:"0 auto", marginTop:2 }}>
          <div className="w-full h-full rounded-2xl overflow-hidden relative"
            style={{ background:"linear-gradient(135deg, #fda4af 0%, #f43f5e 60%, #e11d48 100%)", boxShadow:"0 6px 22px rgba(244,63,94,0.4)" }}>
            {sprinkles.slice(12,22).map((s,i) => (
              <div key={i} className="absolute rounded-full" style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.w+1, height:s.h, background:s.color, transform:`rotate(${s.rot}deg)`, opacity:0.8 }} />
            ))}
            {[8,22,36,50,64,78,92].map((pct,i) => (
              <div key={i} className="absolute top-0" style={{ left:`${pct}%`, width:14, height:10+(i%4)*3, background:"rgba(255,255,255,0.88)", borderRadius:"0 0 50% 50%", transform:"translateX(-50%)" }} />
            ))}
          </div>
          <div className="absolute -top-2 left-3 right-3 h-4 rounded-full"
            style={{ background:"rgba(255,255,255,0.9)", boxShadow:"0 2px 8px rgba(255,255,255,0.35)" }} />
        </div>

        {/* ── Tier 3 (base) ── */}
        <div className="relative" style={{ width:260, height:68, margin:"0 auto", marginTop:2 }}>
          <div className="w-full h-full rounded-2xl overflow-hidden relative"
            style={{ background:"linear-gradient(135deg, #fecdd3 0%, #fb7185 55%, #f43f5e 100%)", boxShadow:"0 8px 28px rgba(251,113,133,0.45)" }}>
            {sprinkles.slice(22).map((s,i) => (
              <div key={i} className="absolute rounded-full" style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.w+1, height:s.h+1, background:s.color, transform:`rotate(${s.rot}deg)`, opacity:0.78 }} />
            ))}
            {[6,18,30,42,55,67,80,93].map((pct,i) => (
              <div key={i} className="absolute top-0" style={{ left:`${pct}%`, width:15, height:11+(i%5)*3, background:"rgba(255,255,255,0.86)", borderRadius:"0 0 50% 50%", transform:"translateX(-50%)" }} />
            ))}
            {/* Happy Birthday text on cake */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black tracking-widest"
                style={{ color:"rgba(255,255,255,0.85)", textShadow:"0 1px 4px rgba(0,0,0,0.3)" }}>
                ✦ HAPPY BIRTHDAY ✦
              </span>
            </div>
          </div>
          <div className="absolute -top-2 left-3 right-3 h-5 rounded-full"
            style={{ background:"rgba(255,255,255,0.9)", boxShadow:"0 2px 10px rgba(255,255,255,0.4)" }} />
        </div>

        {/* ── Plate ── */}
        <div className="mx-auto" style={{ width:300, height:18, borderRadius:9,
          background:"linear-gradient(to bottom, #6b7280, #4b5563)", marginTop:1,
          boxShadow:"0 4px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)" }} />
      </motion.div>

      {/* ── Mic blow progress bar ── */}
      <AnimatePresence>
        {phase === "lit" && !micError && (
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            className="w-48 relative z-10 mb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <Mic size={13} style={{ color:"rgba(255,130,130,0.7)" }} />
              <span className="text-[11px] tracking-widest" style={{ color:"rgba(255,130,130,0.55)" }}>
                blow harder…
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full overflow-hidden"
              style={{ background:"rgba(255,255,255,0.08)" }}>
              <motion.div className="h-full rounded-full"
                animate={{ width:`${blowPct}%` }}
                transition={{ duration:0.08 }}
                style={{ background:"linear-gradient(to right, rgba(200,30,30,0.7), rgba(255,100,100,0.9))" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mic error fallback ── */}
      <AnimatePresence>
        {phase === "lit" && micError && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="flex items-center gap-2 mb-4 relative z-10">
            <MicOff size={15} style={{ color:"rgba(255,100,100,0.6)" }} />
            <span className="text-xs" style={{ color:"rgba(255,150,150,0.6)" }}>
              Tap the cake to blow them out!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Post-blown wish message ── */}
      <AnimatePresence>
        {phase === "blown" && showWish && (
          <motion.div
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.9 }}
            className="text-center relative z-10 px-4 max-w-sm"
          >
            <motion.p
              className="text-xl font-black mb-2"
              animate={{ textShadow:["0 0 15px rgba(220,40,40,0.5)","0 0 35px rgba(220,40,40,0.8)","0 0 15px rgba(220,40,40,0.5)"] }}
              transition={{ duration:2.5, repeat:Infinity }}
              style={{ color:"rgba(255,255,255,0.92)" }}
            >
              Your wish is on its way ✨
            </motion.p>
            <p className="text-sm mb-7" style={{ color:"rgba(255,160,160,0.6)" }}>
              May all your dreams come true today 💕
            </p>

            <motion.button
              whileTap={{ scale:0.95 }}
              whileHover={{ scale:1.04 }}
              onClick={onFinish}
              className="px-10 py-4 rounded-full text-lg font-semibold"
              style={{
                background:"linear-gradient(135deg, rgba(160,0,0,0.9), rgba(90,0,0,0.95))",
                border:"1px solid rgba(255,100,100,0.3)",
                boxShadow:"0 0 28px rgba(160,0,0,0.4), 0 12px 32px rgba(0,0,0,0.5)",
                color:"rgba(255,210,210,0.95)",
              }}
            >
              <span className="flex items-center gap-2">
                <Heart size={18} fill="currentColor" />
                Continue
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fallen petals / sparkles when blown ── */}
      <AnimatePresence>
        {phase === "blown" && (
          <>
            {[...Array(16)].map((_,i) => (
              <motion.div key={i} className="absolute pointer-events-none"
                style={{
                  left:`${10+i*5.2}%`, top:`${15+(i%4)*20}%`,
                  color:`rgba(${i%3===0?"220,60,60":i%3===1?"255,150,150":"255,210,210"},0.55)`,
                }}
                initial={{ opacity:0, y:-20, rotate:0 }}
                animate={{ opacity:[0,0.8,0], y:80+i*12, rotate:i%2===0?180:-180, scale:[0,1,0.5] }}
                transition={{ duration:2+i*0.25, delay:i*0.1, ease:"easeOut" }}
              >
                {i%2===0 ? <Heart size={10} fill="currentColor" /> : <Sparkles size={9} />}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

    </div>
  )
}
