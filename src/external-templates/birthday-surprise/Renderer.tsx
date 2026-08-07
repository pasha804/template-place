/**
 * Birthday Surprise — Renderer
 *
 * Thin orchestrator that wraps the original birthday template1 components.
 * The original components are verbatim copies in ./original/.
 * This file ONLY:
 *   1. Reads config values
 *   2. Manages the screen flow state (identical to original page.jsx)
 *   3. Passes config values as props to the original components
 *
 * ROOT DIV FIX: Uses minHeight:"100dvh" (not 100%) so the template always
 * occupies the full viewport regardless of how the parent is sized.
 * When rendered in the demo route (directly under <body>) with no wrapper,
 * minHeight:"100%" collapses to 0 — minHeight:"100dvh" does not.
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

export function BirthdaySurpriseRenderer({ config }: Props) {
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

  // ── Config extraction with safe fallbacks ───────────────────────────────
  const pin               = (config.pin               as string) || (defaults.pin as string)
  const vaultAvatarUrl    = (config.vaultAvatarUrl    as string) || (defaults.vaultAvatarUrl as string)
  const welcomeSubText    = (config.welcomeSubText    as string) || (defaults.welcomeSubText as string)
  const welcomeButtonText = (config.welcomeButtonText as string) || (defaults.welcomeButtonText as string)
  const welcomeGifUrl     = (config.welcomeGifUrl     as string) || (defaults.welcomeGifUrl as string)
  const cakeHeadingUnlit  = (config.cakeHeadingUnlit  as string) || (defaults.cakeHeadingUnlit as string)
  const cakeHeadingLit    = (config.cakeHeadingLit    as string) || (defaults.cakeHeadingLit as string)
  const cakeBirthdayText  = (config.cakeBirthdayText  as string) || (defaults.cakeBirthdayText as string)
  const wishCardsHeading  = (config.wishCardsHeading  as string) || (defaults.wishCardsHeading as string)
  const memoriesHeading   = (config.memoriesHeading   as string) || (defaults.memoriesHeading as string)
  const letterHeading     = (config.letterHeading     as string) || (defaults.letterHeading as string)
  const letterText        = (config.letterText        as string) || (defaults.letterText as string)
  const hugGifUrl         = (config.hugGifUrl         as string) || (defaults.hugGifUrl as string)
  const bgGradientFrom    = (config.bgGradientFrom    as string) || (defaults.bgGradientFrom as string)
  const bgGradientTo      = (config.bgGradientTo      as string) || (defaults.bgGradientTo as string)

  const wishCards: string[] = (() => {
    const raw = config.wishCards
    if (Array.isArray(raw) && raw.length > 0) {
      return raw.map(w => typeof w === "string" ? w : String(w))
    }
    return defaults.wishCards as string[]
  })()

  const memoryPhotos: string[] = (() => {
    const raw = config.memoryPhotos
    if (Array.isArray(raw) && raw.length > 0) return raw as string[]
    return defaults.memoryPhotos as string[]
  })()

  // Background — lives on the root div only, screens are transparent (matches original page.jsx).
  // Middle stop is an explicit color (not `${bgGradientFrom}40`) so it stays valid for any
  // color format the user enters (3/6-digit hex, rgb(), named colors).
  const bgGradientMid = (config.bgGradientMid as string) || (defaults.bgGradientMid as string) || "#1a0000"
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
    /*
     * Root wrapper:
     * - minHeight: "100dvh" — CRITICAL: ensures the template fills the full
     *   viewport height even when rendered with no parent wrapper (demo/public
     *   routes render directly into <body>). Using "100%" would collapse to 0.
     * - position: "relative" — VaultScreen uses absolute positioning; needs
     *   a positioned ancestor with a defined size.
     * - Dark red radial gradient background, Kalam font, no user-select.
     */
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        overflowX: "hidden",
        background: bgGradient,
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

      {/* VaultScreen — absolute inset-0, needs the root div to have a real size */}
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
