/**
 * Anniversary Romantic — Renderer (anniversary template1)
 * 7-screen cinematic "Midnight Romance" anniversary experience
 * Screens: Loader → Intro → Anniversary Counter → Photo Gallery →
 *          Reasons (flip cards) → Promises (wax seal) → Love Letter (envelope)
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

import ParticleSystem    from "./original/ParticleSystem"
import LoaderScreen      from "./original/screens/LoaderScreen"
import IntroScreen       from "./original/screens/IntroScreen"
import AnniversaryScreen from "./original/screens/AnniversaryScreen"
import PhotoGalleryScreen from "./original/screens/PhotoGalleryScreen"
import ReasonsScreen     from "./original/screens/ReasonsScreen"
import PromisesScreen    from "./original/screens/PromisesScreen"
import MessageScreen     from "./original/screens/MessageScreen"

const AR_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playpen+Sans+Deva:wght@100..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

.ar-root {
  --bg-midnight:  #0a0a12;
  --rose-red:     #e11d48;
  --rich-magenta: #d946ef;
  --warm-gold:    #fbbf24;
  --soft-white:   #f8fafc;
  --muted-rose:   #fda4af;
  --glass-bg:     rgba(255,255,255,0.05);
  --glass-border: rgba(255,255,255,0.10);

  background: #0a0a12;
  color: #f8fafc;
  font-family: "Inter", sans-serif;
  user-select: none;
  overflow-x: hidden;
  min-height: 100%;
  position: relative;
}
.ar-root button { cursor: pointer; }
.ar-root h1, .ar-root h2, .ar-root h3, .ar-root .font-display {
  font-family: "Playpen Sans Deva", cursive;
}

/* Aurora blobs */
.ar-root .aurora-container { position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none; }
.ar-root .aurora-blob { position:absolute;border-radius:9999px;filter:blur(80px);mix-blend-mode:screen; }
@keyframes ar-aurora-drift {
  0%   { transform:translate(0,0) scale(1); }
  33%  { transform:translate(40px,-60px) scale(1.1); }
  66%  { transform:translate(-30px,40px) scale(0.95); }
  100% { transform:translate(20px,-20px) scale(1.05); }
}
.ar-root .aurora-blob-1 { width:600px;height:600px;top:-200px;left:-150px;background:radial-gradient(circle,rgba(225,29,72,0.18) 0%,transparent 70%);animation:ar-aurora-drift 20s ease-in-out infinite alternate; }
.ar-root .aurora-blob-2 { width:500px;height:500px;bottom:-100px;right:-100px;background:radial-gradient(circle,rgba(217,70,239,0.15) 0%,transparent 70%);animation:ar-aurora-drift 15s ease-in-out infinite alternate;animation-delay:-7s; }
.ar-root .aurora-blob-3 { width:400px;height:400px;top:40%;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(251,191,36,0.08) 0%,transparent 70%);animation:ar-aurora-drift 25s ease-in-out infinite alternate;animation-delay:-12s; }

/* Glassmorphism */
.ar-root .glass { background:rgba(255,255,255,0.05);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.10);box-shadow:0 8px 32px rgba(0,0,0,0.4); }
.ar-root .glass-card { background:rgba(255,255,255,0.04);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.08);box-shadow:0 8px 32px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06); }

/* Glow effects */
.ar-root .glow-rose     { box-shadow:0 0 40px rgba(225,29,72,0.3),0 0 80px rgba(225,29,72,0.1); }
.ar-root .glow-gold     { box-shadow:0 0 30px rgba(251,191,36,0.3),0 0 60px rgba(251,191,36,0.1); }
.ar-root .glow-magenta  { box-shadow:0 0 40px rgba(217,70,239,0.3),0 0 80px rgba(217,70,239,0.1); }

/* Shimmer text */
@keyframes ar-shimmer { from{background-position:200% center} to{background-position:-200% center} }
.ar-root .shimmer-text {
  background:linear-gradient(90deg,#fda4af 0%,#fbbf24 30%,#f8fafc 50%,#fbbf24 70%,#fda4af 100%);
  background-size:200% auto;background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:ar-shimmer 3s linear infinite;
}

/* Shimmer sweep button */
@keyframes ar-sweep { from{background-position:-200% center} to{background-position:200% center} }
.ar-root .shimmer-sweep::after {
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(251,191,36,0.35) 50%,transparent 100%);
  background-size:200% auto;animation:ar-sweep 2.5s linear infinite;border-radius:inherit;
}

/* Gradient text utilities */
.ar-root .gradient-rose-gold { background:linear-gradient(135deg,#e11d48 0%,#fbbf24 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent; }
.ar-root .gradient-rose-magenta { background:linear-gradient(135deg,#e11d48 0%,#d946ef 100%);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent; }

/* Wax seal */
.ar-root .wax-seal { background:radial-gradient(circle at 35% 35%,#fcd34d,#b45309 50%,#78350f 100%);box-shadow:0 4px 20px rgba(251,191,36,0.5),inset 0 -2px 4px rgba(0,0,0,0.3); }

/* Animations */
@keyframes ar-ring-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.ar-root .ring-rotate { animation:ar-ring-spin 8s linear infinite; }
@keyframes ar-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.ar-root .bob { animation:ar-bob 3s ease-in-out infinite; }

/* Card flip */
.ar-root .card-flip-scene { perspective:1200px; }
.ar-root .card-flip-inner { position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 0.7s cubic-bezier(0.4,0,0.2,1); }
.ar-root .card-flip-inner.flipped { transform:rotateY(180deg); }
.ar-root .card-face { position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:1.25rem; }
.ar-root .card-back { transform:rotateY(180deg); }

/* Typewriter cursor */
@keyframes ar-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.ar-root .typewriter-cursor { display:inline-block;width:2px;height:1.1em;background:#e11d48;margin-left:2px;vertical-align:text-bottom;border-radius:2px;box-shadow:0 0 8px rgba(225,29,72,0.8);animation:ar-blink 0.9s ease-in-out infinite; }

/* Particle */
.ar-root .particle { position:fixed;pointer-events:none;z-index:1; }
@keyframes ar-particle-float { 0%{transform:translateY(100vh) rotate(0deg);opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{transform:translateY(-10vh) rotate(360deg);opacity:0} }
.ar-root .particle { animation-name:ar-particle-float!important; }

/* Scrollbar */
.ar-root ::-webkit-scrollbar { width:6px; }
.ar-root ::-webkit-scrollbar-track { background:rgba(0,0,0,0.2);border-radius:4px; }
.ar-root ::-webkit-scrollbar-thumb { background:rgba(225,29,72,0.5);border-radius:4px; }
`

interface Props { config: TemplateConfig; mode?: string }

export function AnniversaryRomanticRenderer({ config }: Props) {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const goTo = (screen: string) => setCurrentScreen(screen)

  const loaderHeading    = (config.loaderHeading    as string) || undefined
  const partnerName      = (config.partnerName      as string) || "Meri Jaan"
  const introHeading     = (config.introHeading     as string) || undefined
  const introGifUrl      = (config.introGifUrl      as string) || undefined
  const introSubtext     = (config.introSubtext     as string) || undefined
  const introButtonText  = (config.introButtonText  as string) || undefined
  const anniversaryDate  = (config.anniversaryDate  as string) || "2024-09-11"
  const anniversaryTitle = (config.anniversaryTitle as string) || "Together Since"
  const anniversarySubtitle = (config.anniversarySubtitle as string) || "Every second with you is a blessing"
  const galleryTitle     = (config.galleryTitle     as string) || undefined
  const gallerySubtitle  = (config.gallerySubtitle  as string) || undefined
  const reasonsTitle     = (config.reasonsTitle     as string) || undefined
  const reasonsSubtitle  = (config.reasonsSubtitle  as string) || undefined
  const promisesTitle    = (config.promisesTitle    as string) || undefined
  const promisesSubtitle = (config.promisesSubtitle as string) || undefined
  const letterTitle      = (config.letterTitle      as string) || undefined
  const letterText       = (config.letterText       as string) || undefined
  const signature        = (config.signature        as string) || undefined

  const galleryPhotos = Array.isArray(config.galleryPhotos) && (config.galleryPhotos as string[]).length > 0
    ? config.galleryPhotos as string[]
    : [
        "/templates/anniversary-romantic/images/1.jpg",
        "/templates/anniversary-romantic/images/2.jpg",
        "/templates/anniversary-romantic/images/3.jpg",
        "/templates/anniversary-romantic/images/4.jpg",
      ]

  useEffect(() => {
    const id = "ar-romantic-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = AR_CSS
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div style={{ position: "relative", minHeight: "100dvh" }}>
      <div className="ar-root">
        <div className="relative overflow-hidden" style={{ background: "#0a0a12", minHeight: "100dvh" }}>
          {/* Aurora background */}
          <div className="aurora-container">
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
          </div>

          {/* Particles */}
          <ParticleSystem />

          {/* Screens */}
          <AnimatePresence mode="wait">
            {currentScreen === "loader"      && <LoaderScreen      key="loader"      onComplete={() => goTo("intro")} loaderHeading={loaderHeading} />}
            {currentScreen === "intro"       && <IntroScreen       key="intro"       onNext={() => goTo("anniversary")} partnerName={partnerName} introHeading={introHeading} introGifUrl={introGifUrl} introSubtext={introSubtext} introButtonText={introButtonText} />}
            {currentScreen === "anniversary" && <AnniversaryScreen key="anniversary" onNext={() => goTo("gallery")} anniversaryDate={anniversaryDate} partnerName={partnerName} anniversaryTitle={anniversaryTitle} anniversarySubtitle={anniversarySubtitle} />}
            {currentScreen === "gallery"     && <PhotoGalleryScreen key="gallery"    onNext={() => goTo("reasons")} photos={galleryPhotos} title={galleryTitle} subtitle={gallerySubtitle} />}
            {currentScreen === "reasons"     && <ReasonsScreen     key="reasons"     onNext={() => goTo("promises")} reasons={config.reasons as any} title={reasonsTitle} subtitle={reasonsSubtitle} />}
            {currentScreen === "promises"    && <PromisesScreen    key="promises"    onNext={() => goTo("message")} promises={config.promises as any} title={promisesTitle} subtitle={promisesSubtitle} />}
            {currentScreen === "message"     && <MessageScreen     key="message"    letterText={letterText} title={letterTitle} signature={signature} onNext={() => goTo("intro")} />}
          </AnimatePresence>

          {/* Watermark */}
          <motion.div
            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed bottom-4 right-4 text-[12px] text-white/30 pointer-events-none z-50 font-light">
            @pasha_dev_
          </motion.div>
        </div>
      </div>
    </div>
  )
}
