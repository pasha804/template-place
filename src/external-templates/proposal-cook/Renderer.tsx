/**
 * Proposal Cook — Renderer (purposal template2)
 * Same 15-screen architecture as Proposal Romantic but with:
 * - Near-black deep plum aesthetic (#0d0008)
 * - Enhanced glassmorphism with magenta borders
 * - Final fireworks via finalFireworks()
 * - No background music (removed in this version)
 */
// @ts-nocheck
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

import CuteLoader           from "./original/CuteLoader"
import FirstScreen          from "./original/FirstScreen"
import QuestionScreen       from "./original/QuestionScreen"
import DoYouLikeMeScreen    from "./original/DoYouLikeMeScreen"
import WillYouBeMineScreen  from "./original/WillYouBeMineScreen"
import CelebrationScreen    from "./original/CelebrationScreen"
import GiftsScreen          from "./original/GiftsScreen"
import Gift2Screen          from "./original/Gift2Screen"
import Gift3Screen          from "./original/Gift3Screen"
import QuizScreen           from "./original/QuizScreen"
import HeyBeautifulScreen   from "./original/HeyBeautifulScreen"
import CutenessLoaderScreen from "./original/CutenessLoaderScreen"
import MessageRevealScreen  from "./original/MessageRevealScreen"
import LittleNoteScreen     from "./original/LittleNoteScreen"
import SpecialYouScreen     from "./original/SpecialYouScreen"
import PhotoGalleryScreen   from "./original/PhotoGalleryScreen"
import PremiumBackground    from "./original/PremiumBackground"
import { finalFireworks }   from "./original/lib/fireworks"

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@300;400;500;600;700&display=swap');

.pc-root {
  background: #0d0008;
  color: #ffffff;
  font-family: "Shantell Sans", cursive;
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  user-select: none;
}
.pc-root button { cursor: pointer; }

@keyframes pc-gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.pc-root .gradient-text {
  background: linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #f472b6);
  background-size: 300% 300%;
  animation: pc-gradientShift 6s ease infinite;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.pc-root .glass-card {
  background: rgba(18,0,10,0.70);
  border: 1px solid rgba(180,0,90,0.20);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
  box-shadow: 0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
}
@keyframes pc-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pc-btnGlow {
  0%,100% { box-shadow: 0 0 30px rgba(236,72,153,0.5), 0 4px 20px rgba(0,0,0,0.3); }
  50%      { box-shadow: 0 0 55px rgba(236,72,153,0.8), 0 4px 20px rgba(0,0,0,0.3); }
}
.pc-root .premium-btn {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #ec4899, #7c3aed, #ec4899);
  background-size: 200% 200%;
  animation: pc-gradientShift 4s ease infinite, pc-btnGlow 2s ease-in-out infinite;
  border-radius: 9999px; color: white; font-weight: 700;
}
.pc-root .premium-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  background-size: 200% 100%; animation: pc-shimmer 3s infinite;
}
@keyframes pc-pulseGlow {
  0%,100% { box-shadow: 0 0 20px rgba(236,72,153,0.4), 0 0 40px rgba(236,72,153,0.2); }
  50%      { box-shadow: 0 0 40px rgba(236,72,153,0.7), 0 0 80px rgba(236,72,153,0.35); }
}
.pc-root .pulse-glow { animation: pc-pulseGlow 2.5s ease-in-out infinite; }
@keyframes pc-heartbeat { 0%,100%{transform:scale(1)} 15%{transform:scale(1.18)} 30%{transform:scale(1)} 45%{transform:scale(1.12)} 60%{transform:scale(1)} }
.pc-root .heartbeat { animation: pc-heartbeat 1.8s ease-in-out infinite; }
@keyframes pc-floatAnim { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
.pc-root .float-anim { animation: pc-floatAnim 3s ease-in-out infinite; }
@keyframes pc-blink { 0%,100%{opacity:1} 50%{opacity:0} }
.pc-root .typewriter-cursor {
  display:inline-block; width:2px; height:1.2em; background:#ec4899;
  margin-left:2px; animation:pc-blink 1s step-end infinite; vertical-align:text-bottom;
}
@keyframes pc-confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
.pc-root .photo-swiper .swiper-slide { background-position:center; width:300px; height:400px; }
/* Performance CSS from purposal template2 */
.pc-root .ring-pulse      { animation: pc-ringPulse 3s ease-in-out infinite; }
.pc-root .ring-pulse-slow { animation: pc-ringPulse 4.5s ease-in-out infinite; }
@keyframes pc-ringPulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.10);opacity:0.9} }
.pc-root .spark-pulse { animation: pc-sparkPulse 2.2s ease-in-out infinite; }
@keyframes pc-sparkPulse { 0%,100%{transform:scale(1);opacity:0.45} 50%{transform:scale(1.35);opacity:0.95} }
.pc-root .dot-pulse { animation: pc-dotPulse 1.3s ease-in-out infinite; }
@keyframes pc-dotPulse { 0%,100%{transform:scale(1);opacity:0.35} 50%{transform:scale(1.6);opacity:1} }
.pc-root .particle-float { animation-name: pc-floatUp; animation-timing-function: linear; animation-iteration-count: infinite; }
@keyframes pc-floatUp { 0%{transform:translateY(0) rotate(0deg);opacity:0} 8%{opacity:1} 92%{opacity:0.5} 100%{transform:translateY(-105vh) rotate(360deg);opacity:0} }
.pc-root .bg-orb-left  { animation: pc-orbBreathL 14s ease-in-out infinite; }
.pc-root .bg-orb-right { animation: pc-orbBreathR 17s ease-in-out infinite 3s; }
@keyframes pc-orbBreathL { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.18);opacity:1} }
@keyframes pc-orbBreathR { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.15);opacity:1} }
`

const VOWS = [
  { icon: "🌹", text: "To love you every single day" },
  { icon: "🛡️", text: "To always protect & cherish you" },
  { icon: "😂", text: "To be your reason to smile" },
  { icon: "🤍", text: "To be your safe place, always" },
]

function FinalScreen({ onRestart, personName }: { onRestart: () => void; personName: string }) {
  useEffect(() => { finalFireworks() }, [])
  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <PremiumBackground particleCount={40} extraBright={true} />
      <motion.div className="glass-card relative z-30 w-full max-w-xl mx-auto flex flex-col items-center p-8 md:p-12 rounded-[40px] overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.88 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.2 }}>
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.16)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.14)", filter: "blur(60px)" }} />
        <motion.h1 className="gradient-text font-bold leading-tight text-center mb-2"
          style={{ fontFamily: "'Shantell Sans', cursive", fontSize: "clamp(2.2rem, 7vw, 4rem)" }}
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          I Love You, {personName} ❤️
        </motion.h1>
        <motion.p className="text-lg font-light text-center mb-2" style={{ color: "rgba(255,255,255,0.8)" }}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          Forever & Always, My Love
        </motion.p>
        <motion.p className="text-sm italic text-center mb-8" style={{ color: "rgba(255,255,255,0.4)" }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          Thank you for saying yes and making this the best day 💕
        </motion.p>
        <motion.div className="w-full grid grid-cols-2 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          {VOWS.map((v, i) => (
            <motion.div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(244,114,182,0.2)" }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.1 }}>
              <span className="text-xl">{v.icon}</span>
              <p className="text-white/70 text-xs font-medium" style={{ fontFamily: "'Shantell Sans', cursive" }}>{v.text}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.button onClick={onRestart} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="px-8 py-4 rounded-full font-bold text-base"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" }}>
          Relive This Moment 🔄
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

interface Props { config: TemplateConfig; mode?: string }

export function ProposalCookRenderer({ config }: Props) {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const personName = (config.personName as string) || "Jana"
  const galleryPhotos = config.galleryPhotos as string[] || undefined
  const letterText = config.letterText as string || undefined

  useEffect(() => {
    const id = "pc-cook-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style"); s.id = id; s.textContent = CSS
      document.head.appendChild(s)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => { setIsLoading(false); setCurrentScreen("first") }, 3000)
    return () => clearTimeout(t)
  }, [])

  const nextScreen = (screen: string) => setCurrentScreen(screen)

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="pc-root">
        <div className="min-h-screen relative overflow-hidden" style={{ background: "#0d0008" }}>
          <AnimatePresence mode="wait">
            {isLoading && <CuteLoader key="loader" onComplete={() => setCurrentScreen("first")} />}
            {currentScreen === "first" && <FirstScreen key="first" onNext={() => nextScreen("question1")} />}
            {currentScreen === "question1" && <QuestionScreen key="q1" question={`${personName}, do you like surprises?`} onYes={() => nextScreen("question2")} isFirst={true} />}
            {currentScreen === "question2" && <DoYouLikeMeScreen key="q2" onYes={() => nextScreen("willYouBeMine")} />}
            {currentScreen === "willYouBeMine" && <WillYouBeMineScreen key="wubm" onYes={() => { setTimeout(() => nextScreen("celebration"), 800) }} />}
            {currentScreen === "celebration" && <CelebrationScreen key="cel" onNext={() => nextScreen("gifts")} />}
            {currentScreen === "gifts" && <GiftsScreen key="gifts"
              onGiftClick={(id: number) => { if (id===1) nextScreen("quiz"); else if (id===2) nextScreen("gift2"); else if (id===3) nextScreen("gift3") }}
              onContinue={() => nextScreen("photoGallery")} />}
            {currentScreen === "gift2" && <Gift2Screen key="g2" onBack={() => nextScreen("gifts")} />}
            {currentScreen === "gift3" && <Gift3Screen key="g3" onBack={() => nextScreen("gifts")} />}
            {currentScreen === "quiz" && <QuizScreen key="quiz" onBack={() => nextScreen("gifts")} />}
            {currentScreen === "photoGallery" && <PhotoGalleryScreen key="pg" onContinue={() => nextScreen("heyBeautiful")} galleryPhotos={galleryPhotos} />}
            {currentScreen === "heyBeautiful" && <HeyBeautifulScreen key="hb" onOpenHeart={() => nextScreen("cutenessLoader")} />}
            {currentScreen === "cutenessLoader" && <CutenessLoaderScreen key="cl" onComplete={() => nextScreen("messageReveal")} />}
            {currentScreen === "messageReveal" && <MessageRevealScreen key="mr" onContinue={() => nextScreen("littleNote")} personName={personName} />}
            {currentScreen === "littleNote" && <LittleNoteScreen key="ln" onNext={() => nextScreen("specialYou")} letterText={letterText} />}
            {currentScreen === "specialYou" && <SpecialYouScreen key="sy" onNext={() => nextScreen("final")} />}
            {currentScreen === "final" && <FinalScreen key="final" onRestart={() => setCurrentScreen("first")} personName={personName} />}
          </AnimatePresence>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 1 }}
            className="fixed bottom-4 right-4 text-[13px] pointer-events-none z-50 font-light" style={{ color: "rgba(255,255,255,0.3)" }}>
            @pasha_dev_
          </motion.div>
        </div>
      </div>
    </div>
  )
}
