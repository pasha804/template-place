/**
 * Birthday Surprise — Renderer
 *
 * Thin orchestrator that wraps the original birthday template1 components.
 * The original components are verbatim copies in ./original/.
 * This file ONLY:
 *   1. Reads config values with comprehensive dual-key fallbacks
 *   2. Manages the screen flow state (identical to original page.jsx)
 *   3. Passes config values as props to the original components
 *
 * ROOT DIV FIX: Uses minHeight:"100dvh" (not 100%) so the template always
 * occupies the full viewport regardless of how the parent is sized.
 */
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"

import VaultScreen    from "./original/VaultScreen"
import IntroScreen    from "./original/IntroScreen"
import CakeScreen     from "./original/CakeScreen"
import FirstScreen    from "./original/FirstScreen"
import SecondScreen   from "./original/SecondScreen"
import ThirdScreen    from "./original/ThirdScreen"
import FourthScreen   from "./original/FourthScreen"
import HugOverlay     from "./original/HugOverlay"
import RestartOverlay from "./original/RestartOverlay"

interface Props { config: TemplateConfig; mode?: string }

export function BirthdaySurpriseRenderer({ config = {} }: Props) {
  // ── Screen flow state — identical to original page.jsx ──────────────────
  const [currentScreen,      setCurrentScreen]      = useState(-1)
  const [showIntro,          setShowIntro]           = useState(false)
  const [showHugOverlay,     setShowHugOverlay]      = useState(false)
  const [showRestartOverlay, setShowRestartOverlay]  = useState(false)

  // ── Handlers — identical to original page.jsx ───────────────────────────
  const handleUnlock = () => {
    setCurrentScreen(-1)
    setShowIntro(true)
  }

  const handleIntroDone = () => {
    setShowIntro(false)
    setCurrentScreen(0)
  }

  const handleHugClose = () => {
    setShowHugOverlay(false)
    setShowRestartOverlay(true)
  }

  const handleRestart = () => {
    setCurrentScreen(-1)
    setShowIntro(false)
    setShowHugOverlay(false)
    setShowRestartOverlay(false)
  }

  // ── Config extraction with safe dual-alias fallbacks ────────────────────
  const pin               = (config.pin as string) || (config.vaultPin as string) || (defaults.pin as string) || "1234"
  const vaultAvatarUrl    = (config.vaultAvatarUrl as string) || (defaults.vaultAvatarUrl as string) || "/templates/birthday-surprise/images/1.jpg"
  const welcomeSubText    = (config.welcomeSubText as string) || (config.firstSubtext as string) || (defaults.welcomeSubText as string) || "For someone who makes my life so special."
  const welcomeButtonText = (config.welcomeButtonText as string) || (config.firstButtonText as string) || (defaults.welcomeButtonText as string) || "Start Surprise 🎁"
  const welcomeGifUrl     = (config.welcomeGifUrl as string) || (defaults.welcomeGifUrl as string) || "/templates/birthday-surprise/gifs/heppi.gif"
  const cakeHeadingUnlit  = (config.cakeHeadingUnlit as string) || (defaults.cakeHeadingUnlit as string) || "Make a Wish 🕯️"
  const cakeHeadingLit    = (config.cakeHeadingLit as string) || (defaults.cakeHeadingLit as string) || "Happy Birthday! 🎉"
  const cakeBirthdayText  = (config.cakeBirthdayText as string) || (defaults.cakeBirthdayText as string) || "Happy Birthday!"
  const wishCardsHeading  = (config.wishCardsHeading as string) || (config.thirdTitle as string) || (config.secondTitle as string) || (defaults.wishCardsHeading as string) || "Special Wishes For You"
  const memoriesHeading   = (config.memoriesHeading as string) || (config.secondTitle as string) || (defaults.memoriesHeading as string) || "Moments We Cherish"
  const letterHeading     = (config.letterHeading as string) || (config.fourthTitle as string) || (defaults.letterHeading as string) || "A Message From The Heart"
  const letterText        = (config.letterText as string) || (defaults.letterText as string) || "Happy Birthday!\n\nI hope your special day is overflowing with laughter, sweet treats, and everything you love most.\n\nKeep shining bright! ❤️"
  const hugGifUrl         = (config.hugGifUrl as string) || (defaults.hugGifUrl as string) || "/templates/birthday-surprise/gifs/hug.gif"

  const bgGradientFrom    = (config.bgGradientFrom as string) || (defaults.bgGradientFrom as string) || "#3d0000"
  const bgGradientMid     = (config.bgGradientMid as string) || (defaults.bgGradientMid as string) || "#1a0000"
  const bgGradientTo      = (config.bgGradientTo as string) || (defaults.bgGradientTo as string) || "#000000"

  const wishCards: string[] = (() => {
    const raw = config.wishCards || config.reasonsCards
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map((w: any) => {
        if (typeof w === "string") return w
        if (w && typeof w === "object") return w.text ? `${w.title ? w.title + ': ' : ''}${w.text}` : (w.title || String(w))
        return String(w)
      })
    }
    return defaults.wishCards as string[]
  })()

  const memoryPhotos: string[] = (() => {
    const raw = config.memoryPhotos || config.photos
    if (Array.isArray(raw) && raw.length > 0) return (raw as string[]).filter(Boolean)
    return defaults.memoryPhotos as string[]
  })()

  // Background — lives on the root div, screens are transparent.
  // Explicit colors ensure it remains 100% valid under all browser conditions.
  const bgGradient = `radial-gradient(ellipse at 50% 0%, ${bgGradientFrom} 0%, ${bgGradientMid} 40%, ${bgGradientTo} 100%)`

  // ── Screens array — identical to original page.jsx (screens are transparent, root div holds the bg) ──
  const screens = [
    <FirstScreen  key="first"  onNext={() => setCurrentScreen(1)}
      subText={welcomeSubText} buttonText={welcomeButtonText} gifUrl={welcomeGifUrl} />,
    <CakeScreen   key="cake"   onFinish={() => setCurrentScreen(2)}
      headingUnlit={cakeHeadingUnlit} headingLit={cakeHeadingLit} birthdayText={cakeBirthdayText} />,
    <SecondScreen key="second" onNext={() => setCurrentScreen(3)}
      heading={wishCardsHeading} wishes={wishCards} />,
    <ThirdScreen  key="third"  onNext={() => setCurrentScreen(4)}
      heading={memoriesHeading} photos={memoryPhotos} />,
    <FourthScreen key="fourth" onShowOverlay={() => setShowHugOverlay(true)}
      heading={letterHeading} letterText={letterText} />,
  ]

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflowX: "hidden",
        backgroundColor: bgGradientTo,
        backgroundImage: bgGradient,
        fontFamily: '"Kalam", cursive',
        color: "#f5f5f5",
        userSelect: "none",
      }}
    >
      {/* Global top ambient glow — identical to original page.jsx */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "320px",
          pointerEvents: "none",
          zIndex: 0,
          background: "radial-gradient(ellipse, rgba(160,0,0,0.28) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* VaultScreen — absolute inset-0 */}
      <AnimatePresence>
        {currentScreen === -1 && !showIntro && (
          <VaultScreen key="vault" onUnlock={handleUnlock} pin={pin} avatarUrl={vaultAvatarUrl} />
        )}
      </AnimatePresence>

      {/* IntroScreen — cinematic reveal after PIN unlock */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* Main screens */}
      <AnimatePresence mode="wait">
        {currentScreen >= 0 && (
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
            exit={{   opacity: 0, scale: 1.05,  filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative", zIndex: 10, willChange: "transform" }}
          >
            {screens[currentScreen]}
          </motion.div>
        )}
      </AnimatePresence>

      <HugOverlay     show={showHugOverlay}     onClose={handleHugClose} gifUrl={hugGifUrl} />
      <RestartOverlay show={showRestartOverlay} onRestart={handleRestart} />

      {/* Watermark */}
      {currentScreen >= 0 && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 40,
            fontWeight: 300,
            color: "rgba(255,100,100,0.35)",
          }}
        >
          @pasha_dev_
        </motion.div>
      )}
    </div>
  )
}
