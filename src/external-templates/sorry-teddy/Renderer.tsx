// @ts-nocheck
/**
 * Sorry Teddy — Renderer (sorry template4)
 * 6-page apology: Opening/Diary/Apology/Letter/Hug/Gift
 * Starry dark background, teddy bear GIFs
 */
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

import StarryBackground from "./original/StarryBackground"
import OpeningPage      from "./original/OpeningPage"
import DiaryPage        from "./original/DiaryPage"
import ApologyPage      from "./original/ApologyPage"
import LetterPage       from "./original/LetterPage"
import HugPage          from "./original/HugPage"
import GiftPage         from "./original/GiftPage"
import MusicPlayer      from "./original/MusicPlayer"

const CSS = `
.st-root {
  min-height: 100%;
  position: relative;
  background: #111827;
  color: #f9fafb;
  font-family: ui-sans-serif, system-ui, sans-serif;
}
.st-root button { cursor: pointer; }
`

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  in:      { opacity: 1, y: 0,  scale: 1 },
  out:     { opacity: 0, y: -30, scale: 1.05 },
}
const pageTransition = { type: "tween" as const, ease: [0.25,0.46,0.45,0.94], duration: 0.6 }

interface Props { config: TemplateConfig; mode?: string }

export function SorryTeddyRenderer({ config }: Props) {
  const [currentPage, setCurrentPage] = useState("opening")
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  const personName = (config.personName as string) || "Jana"

  useEffect(() => {
    const id = "st-teddy-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style"); s.id = id; s.textContent = CSS
      document.head.appendChild(s)
    }
  }, [])

  const pages: Record<string, React.ComponentType<any>> = {
    opening: OpeningPage, diary: DiaryPage, apology: ApologyPage,
    letter: LetterPage, hug: HugPage, gift: GiftPage,
  }
  const CurrentComponent = pages[currentPage]

  const sharedProps = { setCurrentPage, setMusicPlaying, setShowMusicPlayer, musicPlaying, personName }

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <div className="st-root">
        <div className="min-h-screen bg-gray-900 relative overflow-hidden">
          <StarryBackground />
          {showMusicPlayer && <MusicPlayer musicPlaying={musicPlaying} setMusicPlaying={setMusicPlaying} />}
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial="initial" animate="in" exit="out"
              variants={pageVariants} transition={pageTransition} className="relative z-10">
              <CurrentComponent {...sharedProps} />
            </motion.div>
          </AnimatePresence>
          <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ position: "fixed", bottom: "1rem", right: "1rem", fontSize: "0.8125rem", color: "rgba(255,255,255,0.3)", pointerEvents: "none", zIndex: 50 }}>
            @pasha_dev_
          </motion.div>
        </div>
      </div>
    </div>
  )
}
