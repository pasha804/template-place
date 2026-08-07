/**
 * Birthday Aurora — Renderer
 * Thin wrapper around birthday template4 original components.
 * Viewport isolation: position:fixed + inset:0 + overflow-y:auto
 * CSS from globals.css injected scoped inside .bt4-root
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

// Original components — verbatim JSX copies
import Loader        from "./original/Loader"
import Countdown     from "./original/Countdown"
import Celebration   from "./original/Celebration"
import AgeReveal     from "./original/AgeReveal"
import HappyBirthday from "./original/HappyBirthday"
import PhotoGallery  from "./original/PhotoGallery"
import GifVibes      from "./original/GifVibes"
import GifReel       from "./original/GifReel"
import WishesWall    from "./original/WishesWall"
import Letter        from "./original/Letter"
import ParticleSystem from "./original/ParticleSystem"
import MusicToggle   from "./original/MusicToggle"

const S = { INTRO:0, CELEBRATE:1, AGE:2, BDAY:3, GALLERY:4, GIBS:5, REEL:6, WISHES:7, LETTER:8 }
const TOTAL_DOTS = 8

const AURORA_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Inter:wght@300;400;500;600;700&display=swap');

.bt4-root {
  background: #0a0a0f;
  color: #f8f8ff;
  font-family: "Inter", "Shantell Sans", sans-serif;
  user-select: none;
  overflow-x: hidden;
  min-height: 100%;
}
.bt4-root button { cursor: pointer; }
.bt4-root .font-cute    { font-family: "Shantell Sans", cursive; }
.bt4-root .font-heading { font-family: "Shantell Sans", cursive; }

.bt4-root .aurora-bg {
  background: linear-gradient(135deg,#0a0a0f 0%,#0d0820 20%,#130a1e 40%,#0a0a0f 60%,#0d0820 80%,#0a0a0f 100%);
}
.bt4-root .aurora-orb-1 {
  background: radial-gradient(ellipse at center, rgba(217,70,239,0.18) 0%, transparent 70%);
  animation: bt4-orb1 12s ease-in-out infinite;
}
.bt4-root .aurora-orb-2 {
  background: radial-gradient(ellipse at center, rgba(225,29,72,0.15) 0%, transparent 70%);
  animation: bt4-orb2 15s ease-in-out infinite;
}
.bt4-root .aurora-orb-3 {
  background: radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%);
  animation: bt4-orb3 18s ease-in-out infinite;
}
@keyframes bt4-orb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(8%,5%) scale(1.1)} 66%{transform:translate(-5%,8%) scale(0.95)} }
@keyframes bt4-orb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-10%,-6%) scale(1.15)} }
@keyframes bt4-orb3 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(6%,-8%) scale(1.08)} 80%{transform:translate(-4%,4%) scale(0.92)} }

.bt4-root .glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.bt4-root .glass-card {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
}
.bt4-root .glow-pink { box-shadow: 0 0 40px rgba(236,72,153,0.4); }
.bt4-root .glow-gold { box-shadow: 0 0 30px rgba(251,191,36,0.5); }
.bt4-root .text-glow-pink { filter: drop-shadow(0 0 20px rgba(236,72,153,0.5)); }

@keyframes bt4-shimmer-sweep { 0%{transform:translateX(-150%)} 100%{transform:translateX(150%)} }
.bt4-root .shimmer-sweep::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.25) 50%,transparent 100%);
  animation:bt4-shimmer-sweep 2.4s ease-in-out infinite;
  pointer-events:none;
}
@keyframes bt4-gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
.bt4-root .animated-gradient-text {
  background: linear-gradient(135deg,#fda4af,#e11d48,#d946ef,#fbbf24,#fda4af);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bt4-gradient-shift 4s ease infinite;
}
@keyframes bt4-blink-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
.bt4-root .cursor-blink {
  display:inline-block; width:2px; height:1.1em;
  background:#d946ef; margin-left:2px; vertical-align:text-bottom;
  border-radius:1px; box-shadow:0 0 8px rgba(217,70,239,0.8);
  animation:bt4-blink-cursor 0.75s ease infinite;
}
.bt4-root ::-webkit-scrollbar { width:4px; }
.bt4-root ::-webkit-scrollbar-track { background:transparent; }
.bt4-root ::-webkit-scrollbar-thumb { background:linear-gradient(to bottom,#fda4af,#d946ef); border-radius:10px; }

.bt4-root .progress-dots-container {
  position: sticky;
  bottom: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 50;
  pointer-events: none;
}
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayAuroraRenderer({ config }: Props) {
  const [screen, setScreen] = useState(S.INTRO)
  const [isLoading, setIsLoading] = useState(true)
  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false)

  useEffect(() => {
    const id = "bt4-aurora-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = AURORA_CSS
      document.head.appendChild(s)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 3800)
    return () => clearTimeout(t)
  }, [])

  const go = (n: number) => () => setScreen(n)
  const handleCountdownComplete = () => { setBirthdayUnlocked(true); setScreen(S.CELEBRATE) }

  const photos = Array.isArray(config.photos)
    ? (config.photos as string[]).map(p => p.split("|")[0].trim()).filter(Boolean)
    : [
      config.photo1 as string,
      config.photo2 as string,
      config.photo3 as string,
      config.photo4 as string,
    ].filter(Boolean)

  const renderScreen = () => {
    switch (screen) {
      case S.INTRO:
        return birthdayUnlocked
          ? <Celebration   key="celebrate" onNext={go(S.AGE)} celebrationHeading={config.celebrationHeading as string} celebrationSubtext={config.celebrationSubtext as string} celebrationButtonText={config.celebrationButtonText as string} />
          : <Countdown     key="countdown" onComplete={handleCountdownComplete} />
      case S.CELEBRATE: return <Celebration  key="celebrate"  onNext={go(S.AGE)} celebrationHeading={config.celebrationHeading as string} celebrationSubtext={config.celebrationSubtext as string} celebrationButtonText={config.celebrationButtonText as string} />
      case S.AGE:       return <AgeReveal    key="age"         onNext={go(S.BDAY)} age={Number(config.age) || 18} birthdayName={config.birthdayName as string} ageFactText={config.ageFactText as string} />
      case S.BDAY:      return <HappyBirthday key="happy"      onNext={go(S.GALLERY)} birthdayName={config.birthdayName as string} birthdayTagline={config.birthdayTagline as string} bdayHeading={config.bdayHeading as string} bdaySubheading={config.bdaySubheading as string} />
      case S.GALLERY:   return <PhotoGallery  key="gallery"    onNext={go(S.GIBS)} photos={photos} />
      case S.GIBS:      return <GifVibes      key="gifvibes"   onNext={go(S.REEL)} title={config.gifVibesTitle as string} subtitle="Can't be there in person..." cards={config.gifVibesCards as any[]} />
      case S.REEL:      return <GifReel       key="gifreel"    onNext={go(S.WISHES)} />
      case S.WISHES:    return <WishesWall    key="wishes"     onNext={go(S.LETTER)} title={config.wishesTitle as string} wishes={config.wishesList as any[]} />
      case S.LETTER:    return <Letter        key="letter"     letterText={config.letterText as string} letterSignature={config.letterSignature as string} />
      default:          return <Letter        key="letter"     letterText={config.letterText as string} letterSignature={config.letterSignature as string} />
    }
  }

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="bt4-root aurora-bg relative">
        <div className="aurora-orb-1" style={{ position:"absolute", inset:0, zIndex:0, filter:"blur(100px)", pointerEvents:"none" }} />
        <div className="aurora-orb-2" style={{ position:"absolute", right:0, top:0, width:"66.666%", height:"66.666%", zIndex:0, filter:"blur(120px)", pointerEvents:"none" }} />
        <div className="aurora-orb-3" style={{ position:"absolute", left:0, bottom:0, width:"50%", height:"66.666%", zIndex:0, filter:"blur(100px)", pointerEvents:"none" }} />

        <ParticleSystem />

        {!isLoading && <MusicToggle audioSrc={config.audioSrc as string} />}

        {!isLoading && screen < S.LETTER && (
          <motion.div
            className="progress-dots-container"
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.6, duration:0.4 }}
          >
            {Array.from({ length: TOTAL_DOTS }, (_, i) => (
              <div key={i} style={{
                width: i===screen ? 24 : 7, height: 7,
                borderRadius: 9999,
                background: i===screen ? "linear-gradient(135deg,#e11d48,#d946ef)" : i<screen ? "rgba(253,164,175,0.5)" : "rgba(255,255,255,0.15)",
                boxShadow: i===screen ? "0 0 12px rgba(217,70,239,0.7)" : "none",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              }} />
            ))}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {isLoading
            ? <Loader key="loader" loaderHeading={config.loaderHeading as string} loaderSubtext={config.loaderSubtext as string} />
            : <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
          }
        </AnimatePresence>

        <motion.div
          initial={{ x:60, opacity:0 }} animate={{ x:0, opacity:1 }}
          transition={{ duration:1, delay:1.5 }}
          style={{ position:"absolute", bottom:"0.75rem", right:"0.75rem", fontSize:"11px", color:"rgba(255,255,255,0.2)", pointerEvents:"none", zIndex:60, fontWeight:300, letterSpacing:"0.05em", userSelect:"none" }}
        >
          @pasha_dev_
        </motion.div>
      </div>
    </div>
  )
}
