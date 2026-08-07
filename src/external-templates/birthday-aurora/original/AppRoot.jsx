"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Loader        from "./components/Loader"
import Countdown     from "./components/Countdown"
import Celebration   from "./components/Celebration"
import AgeReveal     from "./components/AgeReveal"
import HappyBirthday from "./components/HappyBirthday"
import PhotoGallery  from "./components/PhotoGallery"
import GifVibes      from "./components/GifVibes"
import GifReel       from "./components/GifReel"
import WishesWall    from "./components/WishesWall"
import Letter        from "./components/Letter"
import ParticleSystem from "./components/ParticleSystem"
import MusicToggle    from "./components/MusicToggle"

// ── Screen index constants ────────────────────────────────────
const S = {
  INTRO:   0,   // Countdown (5 s demo) → auto-advance to CELEBRATE
  CELEBRATE: 1, // Celebration confetti
  AGE:     2,   // "You're 18!" reveal
  BDAY:    3,   // Happy Birthday cake + balloons
  GALLERY: 4,   // Photo coverflow
  GIBS:    5,   // GifVibes love-grid
  REEL:    6,   // GifReel numbered slideshow
  WISHES:  7,   // WishesWall expandable
  LETTER:  8,   // Grand finale — no progress dots
}

// Dots shown for screens 0-7 (not on Letter)
const TOTAL_DOTS = 8

export default function BirthdayApp() {
  const [screen, setScreen] = useState(S.INTRO)
  const [isLoading, setIsLoading] = useState(true)
  const [birthdayUnlocked, setBirthdayUnlocked] = useState(false)

  // Loader duration matches animation length
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 3800)
    return () => clearTimeout(t)
  }, [])

  const go = (n) => () => setScreen(n)

  // Countdown fires this when its 5 s demo ends
  const handleCountdownComplete = () => {
    setBirthdayUnlocked(true)
    setScreen(S.CELEBRATE)
  }

  // ── Screen list ───────────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case S.INTRO:
        return birthdayUnlocked
          ? <Celebration   key="celebrate" onNext={go(S.AGE)} />
          : <Countdown     key="countdown" onComplete={handleCountdownComplete} />
      case S.CELEBRATE:
        return <Celebration  key="celebrate"  onNext={go(S.AGE)} />
      case S.AGE:
        return <AgeReveal    key="age"         onNext={go(S.BDAY)} />
      case S.BDAY:
        return <HappyBirthday key="happy"      onNext={go(S.GALLERY)} />
      case S.GALLERY:
        return <PhotoGallery  key="gallery"    onNext={go(S.GIBS)} />
      case S.GIBS:
        return <GifVibes      key="gifvibes"   onNext={go(S.REEL)} />
      case S.REEL:
        return <GifReel       key="gifreel"    onNext={go(S.WISHES)} />
      case S.WISHES:
        return <WishesWall    key="wishes"     onNext={go(S.LETTER)} />
      case S.LETTER:
        return <Letter        key="letter" />
      default:
        return <Letter        key="letter" />
    }
  }

  return (
    <div className="min-h-screen aurora-bg overflow-hidden relative">

      {/* ── Aurora ambient orbs ── */}
      <div className="aurora-orb-1 fixed inset-0 z-0 blur-[100px] pointer-events-none" />
      <div className="aurora-orb-2 fixed right-0 top-0 w-2/3 h-2/3 z-0 blur-[120px] pointer-events-none" />
      <div className="aurora-orb-3 fixed left-0 bottom-0 w-1/2 h-2/3 z-0 blur-[100px] pointer-events-none" />

      {/* ── Global effects ── */}
      <ParticleSystem />
      {!isLoading && <MusicToggle />}

      {/* ── Progress dots (hidden on Letter + Loader) ── */}
      {!isLoading && screen < S.LETTER && (
        <motion.div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {Array.from({ length: TOTAL_DOTS }, (_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === screen ? 24 : 7,
                height: 7,
                background:
                  i === screen
                    ? "linear-gradient(135deg,#e11d48,#d946ef)"
                    : i < screen
                    ? "rgba(253,164,175,0.5)"
                    : "rgba(255,255,255,0.15)",
                boxShadow:
                  i === screen ? "0 0 12px rgba(217,70,239,0.7)" : "none",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* ── Screen router ── */}
      <AnimatePresence mode="wait">
        {isLoading
          ? <Loader key="loader" />
          : <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
        }
      </AnimatePresence>

      {/* ── Watermark ── */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="fixed bottom-3 right-3 text-[11px] text-white/20 pointer-events-none z-[60] font-light tracking-wider select-none"
      >
        @pasha_dev_
      </motion.div>
    </div>
  )
}
