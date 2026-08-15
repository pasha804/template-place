/**
 * Birthday Magical — Renderer
 * Wraps birthday template7 (15-chapter cinematic birthday experience).
 * Uses framer-motion, @react-three/fiber + drei + three, canvas-confetti.
 */
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"

import SpotlightCursor     from "./original/SpotlightCursor"
import ParticleSystem      from "./original/ParticleSystem"
import InteractiveBalloons from "./original/InteractiveBalloons"

import LoaderScreen           from "./original/screens/LoaderScreen"
import IntroScreen            from "./original/screens/IntroScreen"
import AgeRevealScreen        from "./original/screens/AgeRevealScreen"
import InteractiveCakeScreen  from "./original/screens/InteractiveCakeScreen"
import PhotoGalleryScreen     from "./original/screens/PhotoGalleryScreen"
import ReasonsScreen          from "./original/screens/ReasonsScreen"
import TimelineScreen         from "./original/screens/TimelineScreen"
import ConstellationScreen    from "./original/screens/ConstellationScreen"
import UnboxingScreen         from "./original/screens/UnboxingScreen"
import ScratchRevealScreen    from "./original/screens/ScratchRevealScreen"
import WishesCarouselScreen   from "./original/screens/WishesCarouselScreen"
import MessageScreen          from "./original/screens/MessageScreen"
import SuperlativesScreen     from "./original/screens/SuperlativesScreen"
import WishBalloonsScreen     from "./original/screens/WishBalloonsScreen"
import CelebrationScreen      from "./original/screens/CelebrationScreen"

const BT7_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Allura&family=Inter:wght@400;500;600;700&display=swap');

.bt7-root {
  --bt7-font-display: "Great Vibes", "Allura", cursive;
  --bt7-font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  background: #0a0a12;
  color: #f8fafc;
  font-family: var(--bt7-font-sans);
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
}

@keyframes bt7-aurora-drift {
  0%, 100% { background-position: 0% 0%, 100% 0%, 50% 100%, 0 0; }
  50% { background-position: 20% 10%, 80% 30%, 40% 90%, 0 0; }
}
.bt7-aurora-bg {
  background:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(225,29,72,0.22), transparent 60%),
    radial-gradient(ellipse 70% 50% at 80% 20%, rgba(217,70,239,0.18), transparent 60%),
    radial-gradient(ellipse 60% 40% at 50% 100%, rgba(251,191,36,0.15), transparent 60%),
    #0a0a12;
  background-size: 200% 200%, 200% 200%, 200% 200%, 100% 100%;
  animation: bt7-aurora-drift 18s ease-in-out infinite;
  min-height: 100%;
  position: relative;
}

.bt7-screen-shell {
  width: 100%;
  max-width: 100vw;
  min-height: 100dvh;
  padding: max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left));
}

.bt7-glass-card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
@media (min-width: 640px) {
  .bt7-glass-card { backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); }
}

.bt7-text-gradient-warm {
  background: linear-gradient(135deg, #e11d48 0%, #d946ef 45%, #fbbf24 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bt7-section-heading {
  font-family: var(--bt7-font-display) !important;
  font-size: clamp(2.75rem, 6vw + 1.5rem, 5.5rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: 0 !important;
  padding-top: 0.08em;
  padding-bottom: 0.08em;
}

.bt7-hero-title {
  font-family: var(--bt7-font-display) !important;
  font-size: clamp(3.25rem, 12vw + 0.75rem, 7.25rem);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: 0 !important;
  padding-top: 0.08em;
  padding-bottom: 0.08em;
  filter: drop-shadow(0 0 28px rgba(251,191,36,0.45)) drop-shadow(0 0 56px rgba(225,29,72,0.22));
}

@keyframes bt7-shimmer-sweep {
  0% { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}
.bt7-shimmer-sweep::after {
  content: "";
  position: absolute;
  top: 0; left: 0; height: 100%; width: 40%;
  background: linear-gradient(90deg, transparent, rgba(251,191,36,0.45), transparent);
  animation: bt7-shimmer-sweep 2.6s infinite;
  pointer-events: none;
}

@keyframes bt7-text-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.bt7-text-shimmer {
  background: linear-gradient(90deg, #fda4af 0%, #fbbf24 50%, #fda4af 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: bt7-text-shimmer 3s linear infinite;
}

@keyframes bt7-flicker {
  0%, 100% { transform: scaleY(1) scaleX(1) rotate(-1deg); opacity: 1; }
  50% { transform: scaleY(1.15) scaleX(0.9) rotate(1deg); opacity: 0.9; }
}
.bt7-flame {
  background: radial-gradient(ellipse at 50% 80%, #fff2b3 0%, #fbbf24 40%, #e11d48 80%, transparent 100%);
  animation: bt7-flicker 0.35s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(251,191,36,0.8));
}

.bt7-perspective-1000 { perspective: 1000px; }
.bt7-preserve-3d { transform-style: preserve-3d; }
.bt7-backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }

.bt7-root ::-webkit-scrollbar { width: 8px; height: 8px; }
.bt7-root ::-webkit-scrollbar-track { background: rgba(255,255,255,0.03); }
.bt7-root ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#e11d48,#d946ef); border-radius: 999px; }
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayMagicalRenderer({ config = {} }: Props) {
  const [screen, setScreen] = useState(0)
  const next = () => setScreen((s) => s + 1)

  const personName = (config.birthdayName as string) || (defaults.birthdayName as string) || "Princess 👑"
  const age = (config.age as number) || (defaults.age as number) || 21
  
  const defaultPhotos = [
    "/templates/birthday-magical/images/1.jpeg",
    "/templates/birthday-magical/images/2.jpeg",
    "/templates/birthday-magical/images/3.jpeg",
    "/templates/birthday-magical/images/4.jpeg",
    "/templates/birthday-magical/images/5.jpeg",
  ]

  const photos = Array.isArray(config.photos) && config.photos.length > 0
    ? (config.photos as string[]).filter(Boolean)
    : defaultPhotos

  const galleryPhotos = photos.map(src => ({ src, caption: "" }))
  const gifUrl          = (config.gifUrl          as string) || (defaults.gifUrl as string) || "/templates/birthday-magical/gifs/heppi.gif"
  const celebrateGifUrl = (config.celebrateGifUrl as string) || (defaults.celebrateGifUrl as string) || "/templates/birthday-magical/gifs/celebrate.gif"
  const audioSrc        = (config.audioSrc        as string) || (defaults.audioSrc as string)

  const reasons = Array.isArray(config.reasonsList) && config.reasonsList.length > 0
    ? (config.reasonsList as any[]).map(r => ({ emoji: "💖", title: r.title || "Reason", back: r.text || "" }))
    : undefined

  const milestones = Array.isArray(config.timelineEvents) && config.timelineEvents.length > 0
    ? (config.timelineEvents as any[]).map(m => ({ year: "Year", emoji: "✨", title: m.title || "Milestone", text: m.text || "" }))
    : undefined

  const wishes = Array.isArray(config.wishesCarousel) && config.wishesCarousel.length > 0
    ? (config.wishesCarousel as any[]).map(w => ({ from: w.title || "Someone", text: w.text || "" }))
    : undefined

  const awards = Array.isArray(config.superlativesList) && config.superlativesList.length > 0
    ? (config.superlativesList as any[]).map(a => ({ icon: "🏆", title: a.title || "Award", sub: a.text || "" }))
    : undefined

  const balloonWishes = Array.isArray(config.balloonWishes) && config.balloonWishes.length > 0
    ? (config.balloonWishes as any[]).map(b => b.text || b.title || "")
    : undefined

  useEffect(() => {
    const id = "bt7-magical-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = BT7_CSS
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="bt7-root">
        {Boolean(audioSrc) && (
          <audio src={audioSrc} autoPlay loop style={{ display: "none" }} />
        )}
        <main className="bt7-aurora-bg relative w-full" style={{ minHeight: "100dvh", overflowX: "hidden" }}>
          <SpotlightCursor />
          <ParticleSystem />
          {screen >= 1 && screen <= 12 && <InteractiveBalloons />}

          <div className="relative z-10 w-full">
            <AnimatePresence mode="wait">
              {screen === 0  && <LoaderScreen          key="s0"  onComplete={next} />}
              {screen === 1  && <IntroScreen           key="s1"  onNext={next} personName={personName} gifUrl={gifUrl} />}
              {screen === 2  && <AgeRevealScreen       key="s2"  onNext={next} age={age} celebrateGifUrl={celebrateGifUrl} />}
              {screen === 3  && <InteractiveCakeScreen key="s3"  onNext={next} />}
              {screen === 4  && <PhotoGalleryScreen    key="s4"  onNext={next} photos={galleryPhotos} />}
              {screen === 5  && <ReasonsScreen         key="s5"  onNext={next} reasons={reasons} />}
              {screen === 6  && <TimelineScreen        key="s6"  onNext={next} milestones={milestones} />}
              {screen === 7  && <ConstellationScreen   key="s7"  onNext={next} />}
              {screen === 8  && <UnboxingScreen        key="s8"  onNext={next} />}
              {screen === 9  && <ScratchRevealScreen   key="s9"  onNext={next} />}
              {screen === 10 && <WishesCarouselScreen  key="s10" onNext={next} wishes={wishes} />}
              {screen === 11 && <MessageScreen         key="s11" onComplete={next} messageText={config.letterText as string} signature={config.signature as string} />}
              {screen === 12 && <SuperlativesScreen    key="s12" onNext={next} awards={awards} />}
              {screen === 13 && <WishBalloonsScreen    key="s13" onNext={next} wishes={balloonWishes} />}
              {screen === 14 && <CelebrationScreen     key="s14" />}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
