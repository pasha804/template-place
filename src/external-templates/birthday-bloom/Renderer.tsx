/**
 * Birthday Bloom — Renderer
 * Thin wrapper around birthday template5 original components.
 * Viewport isolation: position:fixed + inset:0 + overflow-y:auto
 * CSS from globals.css injected scoped inside .bt5-root
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

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
  75%  { transform: skewX(-10deg); box-shadow: 0 0 10px rgba(255,165,0,0.4),0 0 20px rgba(255,165,0,0.4),0 0 60px rgba(255,165,0,0.4),0 0 80px rgba(255,165,0,0.4); }
  100% { transform: skewX(5deg);   box-shadow: 0 0 10px rgba(255,165,0,0.5),0 0 20px rgba(255,165,0,0.5),0 0 60px rgba(255,165,0,0.5),0 0 80px rgba(255,165,0,0.5); }
}
.bt5-root .cake { position:relative; width:220px; height:170px; top:50%; left:50%; margin-left:-110px; }
.bt5-root .cake > * { position:absolute; }
.bt5-root .plate { width:240px; height:100px; position:absolute; bottom:-30px; left:-10px; border-radius:50%; background-color:#f9f9f9; box-shadow:0 2px 0 #e0e0e0,0 4px 0 #d0d0d0,0 5px 30px rgba(0,0,0,0.25); }
.bt5-root .layer { position:absolute; display:block; width:220px; height:90px; border-radius:50%; background-color:#f7c1cf; box-shadow:0 2px 0 #f4b6c5,0 4px 0 #f1acbb,0 6px 0 #eea1b1,0 8px 0 #eb97a7,0 10px 0 #e88d9d,0 12px 0 #e58393,0 14px 0 #e27989,0 16px 0 #df707f,0 18px 0 #dc6676,0 20px 0 #d95c6d,0 22px 0 #d65264,0 24px 0 #d3485b,0 26px 0 #cf3f53,0 28px 0 #cb3a4f,0 30px 0 #c6354b; }
.bt5-root .layer-top    { top: 0px; }
.bt5-root .layer-middle { top: 33px; }
.bt5-root .layer-bottom { top: 66px; }
.bt5-root .icing { top:1px; left:3px; background-color:#fff3e6; width:215px; height:90px; border-radius:50%; }
.bt5-root .icing:before { content:""; position:absolute; top:4px; right:5px; bottom:6px; left:5px; background-color:#f5ead8; box-shadow:0 0 4px #f7eee0,0 0 4px #f7eee0,0 0 4px #f7eee0; border-radius:50%; z-index:1; }
.bt5-root .drip { display:block; width:46px; height:60px; border-bottom-left-radius:25px; border-bottom-right-radius:25px; background-color:#f0e4d0; }
.bt5-root .drip1 { top:53px; left:5px;   transform:skewY(15deg); height:48px; width:36px; }
.bt5-root .drip2 { top:55px; left:161px; transform:skewY(-25deg); }
.bt5-root .drip3 { top:54px; left:80px;  width:70px; border-bottom-left-radius:40px; border-bottom-right-radius:40px; }
.bt5-root .candle { background-color:#ff8fab; width:16px; height:50px; border-radius:8px / 4px; top:-20px; left:50%; margin-left:-8px; z-index:10; }
.bt5-root .candle:before { content:""; position:absolute; top:0; left:0; width:16px; height:8px; border-radius:50%; background-color:#da6f8a; }
.bt5-root .flame { position:absolute; background-color:orange; width:15px; height:35px; border-radius:10px 10px 10px 10px / 25px 25px 10px 10px; top:-34px; left:50%; margin-left:-7.5px; z-index:10; box-shadow:0 0 10px rgba(255,165,0,0.5),0 0 20px rgba(255,165,0,0.5),0 0 60px rgba(255,165,0,0.5),0 0 80px rgba(255,165,0,0.5); transform-origin:50% 90%; animation:bt5-flicker 1s ease-in-out alternate infinite; }
.bt5-root ::-webkit-scrollbar { display:none; }
.bt5-root .cover { position:absolute; bottom:0; left:0; width:100%; height:100%; border-radius:38px; transition:all 0.7s ease-out; background-size:contain; display:flex; align-items:center; justify-content:center; }
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayBloomRenderer({ config }: Props) {
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

  const photos: string[] = [
    config.photo1 as string,
    config.photo2 as string,
    config.photo3 as string,
    config.photo4 as string,
  ].filter(Boolean) as string[]

  const screens = [
    <LoaderScreen  key="bl-loader"  onDone={() => setScreen(1)} loaderHeading={config.loaderHeading as string} />,
    <IntroScreen   key="bl-intro"   introTitle={config.introTitle as string} introSubtext={config.introSubtext as string} buttonText={config.introButtonText as string} birthdayName={config.birthdayName as string} age={config.age as number} onNext={() => setScreen(2)} />,
    <CakeScreen    key="bl-cake"    cakeBirthdayText={config.cakeBirthdayText as string} candleInstruction={config.candleInstruction as string} onNext={() => setScreen(3)} />,
    <PhotosScreen  key="bl-photos"  photos={photos} title={config.photosTitle as string} onNext={() => setScreen(4)} />,
    <MessageScreen key="bl-message" messageText={config.messageText as string} birthdayName={config.birthdayName as string} onNext={() => setScreen(5)} />,
    <HugScreen     key="bl-hug"     hugTitle={config.hugTitle as string} hugMessage={config.hugMessage as string} />,
  ]

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="bt5-root">
        <HeartsBackground />

        {Boolean(config.audioSrc) && (
          <audio src={config.audioSrc as string} autoPlay loop style={{ display: "none" }} />
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
