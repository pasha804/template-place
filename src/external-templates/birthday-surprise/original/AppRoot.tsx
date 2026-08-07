// @ts-nocheck
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import VaultScreen    from "@/components/VaultScreen"
import IntroScreen    from "@/components/IntroScreen"
import FirstScreen    from "@/components/FirstScreen"
import CakeScreen     from "@/components/CakeScreen"
import SecondScreen   from "@/components/SecondScreen"
import ThirdScreen    from "@/components/ThirdScreen"
import FourthScreen   from "@/components/FourthScreen"
import HugOverlay     from "@/components/HugOverlay"
import RestartOverlay from "@/components/RestartOverlay"

// Screen index map:
//  -1 = VaultScreen  (locked PIN entry)
//   — = IntroScreen  (cinematic reveal — controlled by showIntro flag)
//   0 = FirstScreen  (welcome)
//   1 = CakeScreen   (blow candles)
//   2 = SecondScreen (wish cards)
//   3 = ThirdScreen  (memories)
//   4 = FourthScreen (letter)
// then HugOverlay → RestartOverlay

export default function Home() {
  const [currentScreen,      setCurrentScreen]      = useState(-1)
  const [showIntro,          setShowIntro]           = useState(false)
  const [showHugOverlay,     setShowHugOverlay]      = useState(false)
  const [showRestartOverlay, setShowRestartOverlay]  = useState(false)

  const screens = [
    <FirstScreen  key="first"  onNext={() => setCurrentScreen(1)} />,
    <CakeScreen   key="cake"   onFinish={() => setCurrentScreen(2)} />,
    <SecondScreen key="second" onNext={() => setCurrentScreen(3)} />,
    <ThirdScreen  key="third"  onNext={() => setCurrentScreen(4)} />,
    <FourthScreen key="fourth" onShowOverlay={() => setShowHugOverlay(true)} />,
  ]

  // PIN unlocked → play intro → then go to FirstScreen
  const handleUnlock = () => {
    setCurrentScreen(-1)
    setShowIntro(true)
  }

  const handleIntroDone = () => {
    setShowIntro(false)
    setCurrentScreen(0)
  }

  const handleRestart = () => {
    setCurrentScreen(-1)
    setShowIntro(false)
    setShowHugOverlay(false)
    setShowRestartOverlay(false)
  }

  const handleHugClose = () => {
    setShowHugOverlay(false)
    setShowRestartOverlay(true)
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #3d0000 0%, #1a0000 40%, #000 100%)" }}
    >
      {/* Global top ambient glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse, rgba(160,0,0,0.28) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Vault ── */}
      <AnimatePresence>
        {currentScreen === -1 && !showIntro && (
          <VaultScreen onUnlock={handleUnlock} />
        )}
      </AnimatePresence>

      {/* ── Intro cinematic ── */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen key="intro" onDone={handleIntroDone} />
        )}
      </AnimatePresence>

      {/* ── Main screens ── */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {currentScreen >= 0 && (
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
              exit={{   opacity: 0, scale: 1.05,  filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="min-h-screen will-change-transform"
            >
              {screens[currentScreen]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <HugOverlay     show={showHugOverlay}     onClose={handleHugClose} />
      <RestartOverlay show={showRestartOverlay} onRestart={handleRestart} />

      {/* Watermark */}
      {currentScreen >= 0 && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0,   opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="fixed bottom-4 right-4 text-[12px] pointer-events-none z-40 font-light"
          style={{ color: "rgba(255,100,100,0.35)" }}
        >
          @pasha_dev_
        </motion.div>
      )}
    </div>
  )
}
