// @ts-nocheck
/**
 * Sorry Sweet — Renderer (sorry template1)
 * 10-screen cinematic apology: Intro+Screen1+Screen2+7 LyricsScreen phases
 * Background music, voice note, scratch card, confetti forgiveness
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

import IntroScreen   from "./original/IntroScreen"
import Screen1       from "./original/Screen1"
import Screen2       from "./original/Screen2"
import LyricsScreen  from "./original/LyricsScreen"
import FloatingLove  from "./original/FloatingLove"
import BgMusic       from "./original/BgMusic"

const SORRY_SWEET_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
.ss-root {
  font-family: "Kalam", cursive;
  min-height: 100%;
  position: relative;
  background: #0a0a0a;
  color: #f0f0f0;
  overflow-x: hidden;
}
.ss-root button { cursor: pointer; touch-action: manipulation; }
.ss-root ::-webkit-scrollbar { display: none; }
.ss-root * { scrollbar-width: none; }
`

interface Props { config: TemplateConfig; mode?: string }

export function SorrySweetRenderer({ config }: Props) {
  const personName = (config.personName as string) || "Khadija"
  const bgMusicUrl = (config.bgMusicUrl as string) || "/templates/sorry-sweet/audio/song.mp3"
  const voiceNoteUrl = (config.voiceNoteUrl as string) || "/templates/sorry-sweet/audio/voice-note.mp3"

  const [currentScreen, setCurrentScreen] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicFadeOut, setMusicFadeOut] = useState(false)

  useEffect(() => {
    const id = "ss-sweet-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = SORRY_SWEET_CSS
      document.head.appendChild(s)
    }
  }, [])

  function handleIntroEnter() { setMusicPlaying(true); setCurrentScreen(1) }
  function handleVoiceNotePage() { setMusicFadeOut(true) }

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <div className="ss-root">
        <div className="min-h-screen bg-black bg-gradient-to-tr from-purple-950/80 via-black to-pink-950/70">
          <BgMusic playing={musicPlaying} fadeOut={musicFadeOut} audioUrl={bgMusicUrl} />
          <FloatingLove />

          <AnimatePresence mode="wait">
            {currentScreen === 0 && <IntroScreen key="intro" onEnter={handleIntroEnter} personName={personName} />}
            {currentScreen === 1 && <Screen1 key="screen1" onNext={() => setCurrentScreen(2)} personName={personName} />}
            {currentScreen === 2 && <Screen2 key="screen2" onNext={() => setCurrentScreen(3)} />}
            {currentScreen === 3 && (
              <LyricsScreen key="screen3"
                personName={personName}
                voiceNoteUrl={voiceNoteUrl}
                onRestart={() => { setMusicFadeOut(false); setMusicPlaying(false); setCurrentScreen(0) }}
                onVoiceNotePage={handleVoiceNotePage} />
            )}
          </AnimatePresence>

          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50">
            @pasha_dev_
          </motion.div>
        </div>
      </div>
    </div>
  )
}
