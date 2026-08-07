/**
 * Proposal Romantic — Renderer (purposal template1)
 * 15+ screen cinematic marriage proposal with dark star background
 * Screens: Loader → First → Questions → WillYouBeMine → Celebration → Gifts → PhotoGallery → etc.
 */
// @ts-nocheck
import { useState, useEffect, useRef } from "react"
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

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@300;400;500;600;700&display=swap');

.pr-root {
  background: #0f0f23;
  color: #ffffff;
  font-family: "Shantell Sans", cursive;
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  user-select: none;
}
.pr-root button { cursor: pointer; }

/* Animated gradient text */
@keyframes pr-gradientShift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.pr-root .gradient-text {
  background: linear-gradient(135deg, #f472b6, #ec4899, #a855f7, #f472b6);
  background-size: 300% 300%;
  animation: pr-gradientShift 6s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glass card */
.pr-root .glass-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
}

/* Premium button */
@keyframes pr-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pr-btnGlow {
  0%,100% { box-shadow: 0 0 30px rgba(236,72,153,0.5), 0 4px 20px rgba(0,0,0,0.3); }
  50%      { box-shadow: 0 0 55px rgba(236,72,153,0.8), 0 4px 20px rgba(0,0,0,0.3); }
}
.pr-root .premium-btn {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #ec4899, #7c3aed, #ec4899);
  background-size: 200% 200%;
  animation: pr-gradientShift 4s ease infinite, pr-btnGlow 2s ease-in-out infinite;
  border-radius: 9999px; color: white; font-weight: 700;
}
.pr-root .premium-btn::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  background-size: 200% 100%; animation: pr-shimmer 3s infinite;
}

/* Other utility classes */
@keyframes pr-pulseGlow {
  0%,100% { box-shadow: 0 0 20px rgba(236,72,153,0.4), 0 0 40px rgba(236,72,153,0.2); }
  50%      { box-shadow: 0 0 40px rgba(236,72,153,0.7), 0 0 80px rgba(236,72,153,0.35); }
}
.pr-root .pulse-glow { animation: pr-pulseGlow 2.5s ease-in-out infinite; }

@keyframes pr-heartbeat {
  0%,100% { transform: scale(1); }
  15% { transform: scale(1.18); }
  30% { transform: scale(1); }
  45% { transform: scale(1.12); }
  60% { transform: scale(1); }
}
.pr-root .heartbeat { animation: pr-heartbeat 1.8s ease-in-out infinite; }

@keyframes pr-floatAnim {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-12px); }
}
.pr-root .float-anim { animation: pr-floatAnim 3s ease-in-out infinite; }

.pr-root .typewriter-cursor {
  display: inline-block; width: 2px; height: 1.2em; background: #ec4899;
  margin-left: 2px; animation: pr-blink 1s step-end infinite; vertical-align: text-bottom;
}
@keyframes pr-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

@keyframes pr-confettiFall {
  0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
}

/* Swiper photo gallery */
.pr-root .photo-swiper .swiper-slide { background-position: center; width: 300px; height: 400px; }
`

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className="absolute text-lg select-none"
          style={{ left: `${Math.random() * 100}%`, top: "-20px",
            animation: `pr-confettiFall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s forwards` }}>
          {["🎉","💕","✨","🌸","💖","⭐","🎊","🌟"][i % 8]}
        </div>
      ))}
    </div>
  )
}

function FinalScreen({ onRestart, personName }: { onRestart: () => void, personName?: string }) {
  const [showConfetti, setShowConfetti] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShowConfetti(true), 2500); return () => clearTimeout(t) }, [])

  return (
    <motion.div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <PremiumBackground particleCount={40} extraBright={true} />
      <ConfettiBurst active={showConfetti} />
      <div className="text-center relative z-10 max-w-2xl mx-auto">
        <motion.h1 className="gradient-text font-bold leading-tight mb-4"
          style={{ fontFamily: "'Shantell Sans', cursive", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          I Love You{personName ? `, ${personName}` : ""} ❤️
        </motion.h1>
        <motion.p className="text-2xl md:text-3xl font-light mb-4" style={{ color: "rgba(255,255,255,0.85)" }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          Forever & Always
        </motion.p>
        <motion.button onClick={onRestart}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
          className="px-8 py-4 rounded-full font-bold text-lg mt-8"
          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}>
          Relive This Moment 🔄
        </motion.button>
      </div>
    </motion.div>
  )
}

interface Props { config: TemplateConfig; mode?: string }

export function ProposalRomanticRenderer({ config }: Props) {
  const [currentScreen, setCurrentScreen] = useState("loader")
  const [isLoading, setIsLoading] = useState(true)
  const [musicStarted, setMusicStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const personName = (config.personName as string) || "My Love"
  const galleryPhotos = config.galleryPhotos as string[] || undefined
  const letterText = config.letterText as string || undefined

  useEffect(() => {
    const id = "pr-romantic-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style"); s.id = id; s.textContent = CSS
      document.head.appendChild(s)
    }
  }, [])

  useEffect(() => {
    const t = setTimeout(() => { setIsLoading(false); setCurrentScreen("first") }, 3000)
    return () => clearTimeout(t)
  }, [])

  const startMusic = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.play().catch(() => {})
      setMusicStarted(true)
    }
  }

  const nextScreen = (screen: string) => { startMusic(); setCurrentScreen(screen) }

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="pr-root">
        <div className="min-h-screen relative overflow-hidden" style={{ background: "#0f0f23" }}>
          <audio ref={audioRef} src="/templates/proposal-romantic/audio/bg.mp3" loop preload="none" />

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
