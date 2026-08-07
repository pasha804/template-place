// @ts-nocheck
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Delete, Unlock, X } from "lucide-react"

export default function VaultScreen({ onUnlock, pin: correctPin = "1234", avatarUrl }) {
  const [pin, setPin]             = useState("")
  const [shake, setShake]         = useState(false)
  const [unlocking, setUnlocking] = useState(false)
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [lightbox, setLightbox]   = useState(false)

  // "⌫" is the backspace key identifier
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"]

  const handleKey = (key) => {
    if (unlocking) return
    if (key === "⌫") { setPin(p => p.slice(0,-1)); return }
    if (pin.length >= 4) return
    const next = pin + key
    setPin(next)
    if (next.length === 4) setTimeout(() => check(next), 280)
  }

  const check = (val) => {
    if (val === correctPin) {
      setUnlocking(true)
      setTimeout(() => onUnlock(), 2200)
    } else {
      setShake(true)
      setWrongAttempts(n => n + 1)
      setTimeout(() => { setShake(false); setPin("") }, 650)
    }
  }

  const resolvedAvatar = avatarUrl || "/templates/birthday-surprise/images/1.jpg"

  if (unlocking) return <UnlockAnim />

  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% -10%, #4a0000 0%, #1c0000 50%, #000 100%)" }}
    >
      {/* ambient top glow */}
      <div className="absolute top-0 inset-x-0 h-56 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(200,0,0,0.45) 0%, transparent 70%)", filter: "blur(30px)" }} />

      {/* floating micro-particles */}
      {[...Array(18)].map((_,i) => (
        <motion.span key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 2+(i%3), height: 2+(i%3),
            left:`${4+i*5.3}%`, top:`${6+(i%7)*13}%`,
            background: i%2===0 ? "rgba(210,30,30,0.5)" : "rgba(255,140,140,0.3)",
          }}
          animate={{ y:[-16,16,-16], opacity:[0.2,0.75,0.2] }}
          transition={{ duration:3+i*0.32, repeat:Infinity, delay:i*0.15 }}
        />
      ))}

      {/* card */}
      <motion.div
        initial={{ y:50, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.85, ease:[0.25,0.46,0.45,0.94] }}
        className="relative w-[310px] rounded-[28px] overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(170deg, #2a0000 0%, #120000 100%)",
          border: "1px solid rgba(180,0,0,0.3)",
          boxShadow: "0 0 60px rgba(160,0,0,0.22), 0 32px 64px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* top inner glow strip */}
        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(150,0,0,0.14), transparent)" }} />

        {/* TOP: photo + labels */}
        <div className="flex flex-col items-center pt-8 pb-5 px-6 relative z-10">

          {/* photo avatar — tap to enlarge */}
          <motion.button
            onClick={() => setLightbox(true)}
            className="relative w-[72px] h-[72px] rounded-full overflow-hidden mb-3 flex-shrink-0"
            style={{ border: "2px solid rgba(190,0,0,0.6)" }}
            animate={{
              boxShadow: [
                "0 0 14px rgba(190,0,0,0.5), 0 0 28px rgba(190,0,0,0.18)",
                "0 0 28px rgba(210,20,20,0.85), 0 0 56px rgba(190,0,0,0.3)",
                "0 0 14px rgba(190,0,0,0.5), 0 0 28px rgba(190,0,0,0.18)",
              ],
            }}
            transition={{ duration:2.4, repeat:Infinity }}
            whileTap={{ scale:0.94 }}
          >
            <img src={resolvedAvatar} alt="her" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 active:bg-black/20 transition-colors" />
          </motion.button>

          {/* tap hint */}
          <p className="text-[9px] tracking-[0.25em] mb-3"
            style={{ color:"rgba(255,110,110,0.38)" }}>
            Here – Click on picture to know passing !
          </p>

          {/* LOCKED */}
          <p className="text-[13px] font-black tracking-[0.45em] mb-1"
            style={{ color:"rgba(255,255,255,0.82)", letterSpacing:"0.4em" }}>
            LOCKED
          </p>
        </div>

        {/* PIN bar */}
        <div className="mx-5 mb-5 relative z-10">
          <motion.div
            animate={shake ? { x:[-7,7,-7,7,-3,3,0] } : {}}
            transition={{ duration:0.45 }}
            className="flex items-center justify-center gap-5 rounded-xl py-3 px-6"
            style={{
              background: "rgba(0,0,0,0.55)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[0,1,2,3].map(i => (
              <motion.div key={i}
                animate={{
                  backgroundColor: pin.length > i
                    ? shake ? "#ff3333" : "#cc1111"
                    : "rgba(255,255,255,0.22)",
                  boxShadow: pin.length > i
                    ? shake ? "0 0 10px #ff3333" : "0 0 8px rgba(200,0,0,0.7)"
                    : "none",
                  scale: pin.length > i ? [1,1.3,1] : 1,
                }}
                transition={{ duration:0.2 }}
                className="w-2.5 h-2.5 rounded-full"
              />
            ))}
          </motion.div>

          {/* wrong attempt message */}
          <AnimatePresence>
            {wrongAttempts > 0 && pin === "" && (
              <motion.p key={wrongAttempts}
                initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className="text-center text-[10px] mt-1.5"
                style={{ color:"rgba(255,70,70,0.7)" }}
              >
                {wrongAttempts===1 ? "Hmm, try again..." : wrongAttempts===2 ? "Not quite... 🤔" : "You know this 💕"}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* NUMPAD — full width */}
        <div className="relative z-10"
          style={{ borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <div className="grid grid-cols-3">
            {keys.map((key,idx) => (
              <motion.button key={idx}
                onClick={() => key !== "" && handleKey(key)}
                disabled={key===""}
                whileTap={key!=="" ? { backgroundColor:"rgba(180,0,0,0.3)", scale:0.92 } : {}}
                className="flex items-center justify-center select-none"
                style={{
                  height: "58px",
                  fontSize: "19px",
                  fontFamily: "inherit",
                  fontWeight: 600,
                  color: key==="" ? "transparent" : "rgba(255,230,230,0.88)",
                  background: "transparent",
                  cursor: key==="" ? "default" : "pointer",
                  borderBottom: idx < 9 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  borderRight: (idx+1)%3 !== 0 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  position:"relative", overflow:"hidden",
                }}
              >
                {key==="⌫"
                  ? <Delete size={18} style={{ color:"rgba(255,120,120,0.7)" }} />
                  : key}
                {/* tap ripple */}
                {key !== "" && (
                  <motion.span className="absolute inset-0 pointer-events-none rounded"
                    style={{ background:"transparent" }}
                    whileTap={{ background:["rgba(200,0,0,0.18)","rgba(200,0,0,0)"] }}
                    transition={{ duration:0.35 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* small red indicator dot top-right */}
        <motion.div
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full"
          style={{ background:"rgba(200,30,30,0.8)" }}
          animate={{ opacity:[0.5,1,0.5] }}
          transition={{ duration:2, repeat:Infinity }}
        />
      </motion.div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.25 }}
            className="absolute inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background:"rgba(0,0,0,0.93)" }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale:0.6, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.6, opacity:0 }}
              transition={{ duration:0.3, ease:[0.25,0.46,0.45,0.94] }}
              className="relative max-w-[320px] w-full"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightbox(false)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background:"rgba(150,0,0,0.95)", border:"1px solid rgba(255,80,80,0.35)" }}>
                <X size={14} style={{ color:"rgba(255,180,180,0.9)" }} />
              </button>
              <img src={resolvedAvatar} alt="her"
                className="w-full rounded-2xl object-cover"
                style={{ boxShadow:"0 0 55px rgba(190,0,0,0.4), 0 25px 55px rgba(0,0,0,0.8)", border:"1px solid rgba(180,0,0,0.35)" }}
              />
              <p className="text-center mt-2.5 text-[11px] tracking-widest"
                style={{ color:"rgba(255,140,140,0.5)" }}>✦ she has the PIN ✦</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* Unlock burst animation */
function UnlockAnim() {
  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background:"radial-gradient(ellipse at 50% 0%, #4a0000 0%, #1c0000 50%, #000 100%)" }}>

      {[0,1,2,3].map(i => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ borderStyle:"solid", borderColor:"rgba(220,40,40,0.6)" }}
          initial={{ width:70, height:70, borderWidth:"2px", opacity:0.9 }}
          animate={{ width:[70,900], height:[70,900], borderWidth:["2px","0px"], opacity:[0.9,0] }}
          transition={{ duration:1.5, delay:i*0.18, ease:"easeOut" }}
        />
      ))}

      <motion.div
        initial={{ scale:0, opacity:0 }}
        animate={{ scale:[0,1.25,0.92,1.06,1], opacity:[0,1,1,1,0.95] }}
        transition={{ duration:1.3 }}
        className="flex flex-col items-center gap-3 z-10"
      >
        <motion.div
          animate={{
            filter:["drop-shadow(0 0 18px rgba(255,80,80,0.8))","drop-shadow(0 0 55px rgba(255,80,80,1))","drop-shadow(0 0 18px rgba(255,80,80,0.8))"],
            rotate:[0,-14,14,0]
          }}
          transition={{ duration:0.85, repeat:1 }}
          style={{ color:"rgba(255,110,110,0.95)" }}
        >
          <Unlock size={68} strokeWidth={1.5} />
        </motion.div>
        <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
          className="text-xl font-black tracking-widest" style={{ color:"rgba(255,130,130,0.95)" }}>
          UNLOCKED ✨
        </motion.p>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1 }}
          className="text-xs tracking-widest" style={{ color:"rgba(255,170,170,0.55)" }}>
          Welcome in, birthday girl 💕
        </motion.p>
      </motion.div>

      {[...Array(20)].map((_,i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width:3+(i%4), height:3+(i%4),
            background: i%3===0?"rgba(255,70,70,0.9)":i%3===1?"rgba(255,170,170,0.8)":"rgba(255,255,255,0.75)",
            left:"50%", top:"50%",
          }}
          initial={{ x:0, y:0, opacity:1 }}
          animate={{
            x: Math.cos((i/20)*Math.PI*2)*(120+i*8),
            y: Math.sin((i/20)*Math.PI*2)*(120+i*8),
            opacity:0, scale:[1,1.5,0],
          }}
          transition={{ duration:1.25, delay:0.08, ease:"easeOut" }}
        />
      ))}

      <motion.div className="absolute inset-0 pointer-events-none"
        initial={{ opacity:0 }} animate={{ opacity:[0,0.28,0] }} transition={{ duration:0.45, delay:0.08 }}
        style={{ background:"radial-gradient(ellipse, rgba(200,0,0,0.32), transparent 70%)" }}
      />
    </div>
  )
}
