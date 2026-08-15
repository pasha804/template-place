/**
 * Birthday Bloom — Renderer
 * Thin wrapper around birthday template5 original components.
 * Viewport isolation: position:fixed + inset:0 + overflow-y:auto
 * CSS from globals.css injected scoped inside .bt5-root
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"

import LoaderScreen     from "./original/LoaderScreen"
import IntroScreen      from "./original/IntroScreen"
import CakeScreen       from "./original/CakeScreen"
import PhotosScreen     from "./original/PhotosScreen"
import MessageScreen    from "./original/MessageScreen"
import HugScreen        from "./original/HugScreen"
import HeartsBackground from "./original/HeartsBackground"

const BLOOM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&family=Comfortaa:wght@300;400;500&display=swap');

.bt5-root {
  --background: #fdf7ff;
  --foreground: #77537e;
  --primary: #973b88;
  --secondary: #9b3c49;
  --accent: #594ba0;
  --color-background: #fdf7ff;
  --color-foreground: #77537e;
  --color-primary: #973b88;
  --color-secondary: #9b3c49;
  --color-accent: #594ba0;
  background: #fdf7ff;
  color: #77537e;
  font-family: "Shantell Sans", "Comfortaa", sans-serif;
  user-select: none;
  min-height: 100%;
  position: relative;
}
.bt5-root button { cursor: pointer; }
.bt5-root .text-primary    { color: #973b88 !important; }
.bt5-root .text-foreground { color: #77537e !important; }
.bt5-root .text-accent     { color: #594ba0 !important; }
.bt5-root .text-secondary  { color: #9b3c49 !important; }
.bt5-root .bg-background { background-color: #fdf7ff !important; }

@keyframes bt5-heartFloat {
  0%   { transform: translateY(0) rotate(0deg) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-110vh) rotate(30deg) scale(0.6); opacity: 0; }
}
.bt5-root .heartFloat {
  animation-name: bt5-heartFloat !important;
}

@keyframes bt5-flicker {
  0%   { transform: skewX(5deg);   box-shadow: 0 0 10px rgba(255,165,0,0.2),0 0 20px rgba(255,165,0,0.2),0 0 60px rgba(255,165,0,0.2),0 0 80px rgba(255,165,0,0.2); }
  25%  { transform: skewX(-5deg);  box-shadow: 0 0 10px rgba(255,165,0,0.5),0 0 20px rgba(255,165,0,0.5),0 0 60px rgba(255,165,0,0.5),0 0 80px rgba(255,165,0,0.5); }
  50%  { transform: skewX(10deg);  box-shadow: 0 0 10px rgba(255,165,0,0.3),0 0 20px rgba(255,165,0,0.3),0 0 60px rgba(255,165,0,0.3),0 0 80px rgba(255,165,0,0.3); }
  75%  { transform: skewX(-10deg); box-shadow: 0 0 10px rgba(255,165,0,0.7),0 0 20px rgba(255,165,0,0.7),0 0 60px rgba(255,165,0,0.7),0 0 80px rgba(255,165,0,0.7); }
  100% { transform: skewX(5deg);   box-shadow: 0 0 10px rgba(255,165,0,0.4),0 0 20px rgba(255,165,0,0.4),0 0 60px rgba(255,165,0,0.4),0 0 80px rgba(255,165,0,0.4); }
}
.bt5-root .flicker {
  animation: bt5-flicker 2s ease-in-out infinite alternate !important;
}

.bt5-root ::-webkit-scrollbar { display:none; }
.bt5-root .cover { position:absolute; bottom:0; left:0; width:100%; height:100%; border-radius:38px; transition:all 0.7s ease-out; background-size:contain; display:flex; align-items:center; justify-content:center; }
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayBloomRenderer({ config = {} }: Props) {
  const [screen, setScreen] = useState(0)

  useEffect(() => {
    const id = "bt5-bloom-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = BLOOM_CSS
      document.head.appendChild(s)
    }
  }, [])

  const defaultPhotoList = [
    defaults.photo1 as string,
    defaults.photo2 as string,
    defaults.photo3 as string,
    defaults.photo4 as string,
  ].filter(Boolean)

  const photos: string[] = Array.isArray(config.photos) && config.photos.length > 0
    ? (config.photos as string[]).filter(Boolean)
    : [
      config.photo1 as string,
      config.photo2 as string,
      config.photo3 as string,
      config.photo4 as string,
    ].filter(Boolean)

  const resolvedPhotos = photos.length > 0 ? photos : defaultPhotoList

  const loaderHeading = (config.loaderHeading as string) || (defaults.loaderHeading as string)
  const introTitle    = (config.introTitle as string) || (defaults.introTitle as string)
  const introSubtext  = (config.introSubtext as string) || (defaults.introSubtext as string)
  const introButtonText = (config.introButtonText as string) || (defaults.introButtonText as string)
  const birthdayName  = (config.birthdayName as string) || (defaults.birthdayName as string)
  const age           = (config.age as number) || (defaults.age as number) || 21

  const cakeBirthdayText  = (config.cakeBirthdayText as string) || (defaults.cakeBirthdayText as string)
  const candleInstruction = (config.candleInstruction as string) || (defaults.candleInstruction as string)
  const photosTitle       = (config.photosTitle as string) || (defaults.photosTitle as string)
  const messageText       = (config.messageText as string) || (defaults.messageText as string)
  const hugTitle          = (config.hugTitle as string) || (defaults.hugTitle as string)
  const hugMessage        = (config.hugMessage as string) || (defaults.hugMessage as string)
  const audioSrc          = (config.audioSrc as string) || (defaults.audioSrc as string)

  const screens = [
    <LoaderScreen  key="bl-loader"  onDone={() => setScreen(1)} loaderHeading={loaderHeading} />,
    <IntroScreen   key="bl-intro"   introTitle={introTitle} introSubtext={introSubtext} buttonText={introButtonText} birthdayName={birthdayName} age={age} onNext={() => setScreen(2)} />,
    <CakeScreen    key="bl-cake"    cakeBirthdayText={cakeBirthdayText} candleInstruction={candleInstruction} onNext={() => setScreen(3)} />,
    <PhotosScreen  key="bl-photos"  photos={resolvedPhotos} title={photosTitle} onNext={() => setScreen(4)} />,
    <MessageScreen key="bl-message" messageText={messageText} birthdayName={birthdayName} onNext={() => setScreen(5)} />,
    <HugScreen     key="bl-hug"     hugTitle={hugTitle} hugMessage={hugMessage} />,
  ]

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="bt5-root">
        <HeartsBackground />

        {Boolean(audioSrc) && (
          <audio src={audioSrc} autoPlay loop style={{ display: "none" }} />
        )}

        <div style={{ position:"relative", zIndex:10, display:"flex", minHeight:"100%", alignItems:"center", justifyContent:"center", padding:"1rem 1.5rem" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity:0, scale:0.98 }}
              animate={{ opacity:1, scale:1, transition:{ duration:1 } }}
              exit={{ opacity:0, transition:{ duration:0.8 } }}
              transition={{ duration:0.8 }}
              style={{ display:"flex", alignItems:"center", justifyContent:"center", width:"100%" }}
            >
              {screens[screen]}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ x:100, opacity:0 }} animate={{ x:0, opacity:1 }}
          transition={{ duration:1, delay:1 }}
          style={{ position:"absolute", bottom:"1rem", right:"1rem", fontSize:"0.875rem", color:"rgba(0,0,0,0.4)", pointerEvents:"none", zIndex:50, fontWeight:300 }}
        >
          @pasha_dev_
        </motion.div>
      </div>
    </div>
  )
}
