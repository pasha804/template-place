/**
 * Anniversary Galaxy — Renderer
 * Wraps the original "aniversiry template2" as a verbatim plugin.
 * All scenes use the galaxy design system injected via <style>.
 */
// @ts-nocheck
import { lazy, Suspense, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"

// Components (verbatim copies with fixed relative imports)
import { GalaxyBackground } from "./original/components/GalaxyBackground"
import { CursorGlow }       from "./original/components/CursorGlow"
import { Welcome }          from "./original/scenes/Welcome"

// Lazy scenes
const Journey       = lazy(() => import("./original/scenes/Journey").then(m => ({ default: m.Journey })))
const Memories      = lazy(() => import("./original/scenes/Memories").then(m => ({ default: m.Memories })))
const WhySpecial    = lazy(() => import("./original/scenes/WhySpecial").then(m => ({ default: m.WhySpecial })))
const LoveLetter    = lazy(() => import("./original/scenes/LoveLetter").then(m => ({ default: m.LoveLetter })))
const Wish          = lazy(() => import("./original/scenes/Wish").then(m => ({ default: m.Wish })))
const SpecialMsg    = lazy(() => import("./original/scenes/SpecialMessage").then(m => ({ default: m.SpecialMessage })))
const Gift          = lazy(() => import("./original/scenes/Gift").then(m => ({ default: m.Gift })))
const Forever       = lazy(() => import("./original/scenes/Forever").then(m => ({ default: m.Forever })))
const Song          = lazy(() => import("./original/scenes/Song").then(m => ({ default: m.Song })))
const TheEnd        = lazy(() => import("./original/scenes/TheEnd").then(m => ({ default: m.TheEnd })))

const TOTAL = 11

const AG_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500;600&display=swap');

.ag-root {
  --radius: 1.25rem;
  --background: oklch(0.09 0.035 300);
  --foreground: oklch(0.96 0.015 330);
  --card: oklch(0.16 0.06 305);
  --card-foreground: oklch(0.96 0.015 330);
  --popover: oklch(0.14 0.055 305);
  --popover-foreground: oklch(0.96 0.015 330);
  --primary: oklch(0.7 0.24 350);
  --primary-foreground: oklch(0.99 0.005 330);
  --secondary: oklch(0.24 0.09 300);
  --secondary-foreground: oklch(0.96 0.015 330);
  --muted: oklch(0.2 0.06 300);
  --muted-foreground: oklch(0.76 0.05 330);
  --accent: oklch(0.6 0.24 305);
  --accent-foreground: oklch(0.99 0.005 330);
  --destructive: oklch(0.6 0.24 20);
  --destructive-foreground: oklch(0.99 0.005 330);
  --border: oklch(0.72 0.18 340 / 28%);
  --input: oklch(0.72 0.18 340 / 22%);
  --ring: oklch(0.72 0.2 345);
  --violet: oklch(0.55 0.24 300);
  --magenta: oklch(0.66 0.27 345);
  --gold: oklch(0.87 0.12 88);
  --nebula: oklch(0.45 0.2 315);
  --star: oklch(0.98 0.02 300);
  --paper: oklch(0.9 0.05 85);
  --paper-ink: oklch(0.33 0.09 300);
  --gradient-galaxy: radial-gradient(ellipse 120% 80% at 50% -10%,oklch(0.32 0.16 310 / 0.85),transparent 65%),radial-gradient(ellipse 90% 60% at 10% 100%,oklch(0.3 0.17 345 / 0.6),transparent 60%),radial-gradient(ellipse 80% 60% at 95% 70%,oklch(0.28 0.15 285 / 0.6),transparent 60%),linear-gradient(180deg,oklch(0.07 0.03 300),oklch(0.11 0.05 310));
  --gradient-pink: linear-gradient(135deg,var(--magenta),oklch(0.58 0.25 320));
  --gradient-aurora: linear-gradient(100deg,oklch(0.75 0.22 350),oklch(0.7 0.2 320),oklch(0.8 0.14 85),oklch(0.72 0.22 345));
  --shadow-glow: 0 0 24px oklch(0.7 0.24 350 / 0.55), 0 0 70px oklch(0.66 0.27 345 / 0.3);
  --shadow-glow-soft: 0 0 18px oklch(0.7 0.22 345 / 0.3), 0 18px 60px oklch(0.1 0.05 300 / 0.6);
  --shadow-violet: 0 0 30px oklch(0.55 0.24 300 / 0.5);
  color: var(--foreground);
  font-family: 'Jost', ui-sans-serif, system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  overflow-x: hidden;
}
.ag-root * { border-color: var(--border,oklch(0.72 0.18 340 / 28%)); }
.ag-root .galaxy-bg { background-image: var(--gradient-galaxy); background-attachment: fixed; }
.ag-root .glass {
  background: linear-gradient(150deg,oklch(0.72 0.18 340 / 0.1),oklch(0.5 0.2 300 / 0.06) 55%,oklch(0.72 0.18 340 / 0.09));
  backdrop-filter: blur(18px) saturate(140%);
  border: 1px solid oklch(0.8 0.16 340 / 0.28);
  box-shadow: var(--shadow-glow-soft), inset 0 1px 0 oklch(1 0 0 / 0.08);
}
.ag-root .glass-deep {
  background: linear-gradient(160deg,oklch(0.2 0.09 305 / 0.75),oklch(0.13 0.06 300 / 0.7));
  backdrop-filter: blur(22px);
  border: 1px solid oklch(0.78 0.18 345 / 0.32);
  box-shadow: var(--shadow-glow-soft);
}
.ag-root .text-glow { text-shadow: 0 0 10px oklch(0.75 0.24 348/0.85),0 0 30px oklch(0.68 0.26 345/0.55),0 0 70px oklch(0.6 0.25 330/0.35); }
.ag-root .text-glow-soft { text-shadow: 0 0 14px oklch(0.75 0.2 345 / 0.4); }
.ag-root .text-gold-glow { color:var(--gold); text-shadow:0 0 12px oklch(0.87 0.12 88/0.6); }
.ag-root .script { font-family:'Great Vibes',cursive; line-height:1.15; }
.ag-root .font-serif { font-family:'Cormorant Garamond',serif; }
.ag-root .gradient-text {
  background-image: var(--gradient-aurora);
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: aurora-shift 9s ease-in-out infinite, ag-aurora-shift 9s ease-in-out infinite;
}
.ag-root .glow-ring { box-shadow: var(--shadow-glow); }
.ag-root .neon-outline { filter: drop-shadow(0 0 6px oklch(0.75 0.24 348/0.9)) drop-shadow(0 0 22px oklch(0.66 0.27 345/0.6)) drop-shadow(0 0 55px oklch(0.6 0.25 330/0.4)); }
.ag-root .hover-lift { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),box-shadow 0.4s ease; }
.ag-root .hover-lift:hover { transform: translateY(-6px) scale(1.02); box-shadow: var(--shadow-glow); }
.ag-root .mask-fade-b { mask-image: linear-gradient(180deg,black 70%,transparent); }

/* Color utilities fallback */
.ag-root .bg-nebula\/30 { background-color: oklch(0.45 0.2 315 / 0.3) !important; }
.ag-root .bg-magenta\/25 { background-color: oklch(0.66 0.27 345 / 0.25) !important; }
.ag-root .bg-violet\/25 { background-color: oklch(0.55 0.24 300 / 0.25) !important; }
.ag-root .bg-star { background-color: oklch(0.98 0.02 300) !important; }
.ag-root .bg-gold { background-color: oklch(0.87 0.12 88) !important; }
.ag-root .text-primary\/70 { color: oklch(0.7 0.24 350 / 0.7) !important; }
.ag-root .bg-primary\/40 { background-color: oklch(0.7 0.24 350 / 0.4) !important; }
.ag-root .text-primary\/60 { color: oklch(0.7 0.24 350 / 0.6) !important; }
.ag-root .text-primary\/50 { color: oklch(0.7 0.24 350 / 0.5) !important; }
.ag-root .bg-primary\/10 { background-color: oklch(0.7 0.24 350 / 0.1) !important; }

@keyframes aurora-shift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
@keyframes ag-aurora-shift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
@keyframes twinkle { 0%,100% { opacity:.15;transform:scale(0.7); } 50% { opacity:1;transform:scale(1.15); } }
@keyframes ag-twinkle { 0%,100% { opacity:.15;transform:scale(0.7); } 50% { opacity:1;transform:scale(1.15); } }
@keyframes float-soft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
@keyframes ag-float-soft { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-14px); } }
@keyframes glow-pulse { 0%,100% { filter:brightness(1) drop-shadow(0 0 10px oklch(0.7 0.24 350/0.5)); } 50% { filter:brightness(1.25) drop-shadow(0 0 30px oklch(0.7 0.24 350/0.9)); } }
@keyframes ag-glow-pulse { 0%,100% { filter:brightness(1) drop-shadow(0 0 10px oklch(0.7 0.24 350/0.5)); } 50% { filter:brightness(1.25) drop-shadow(0 0 30px oklch(0.7 0.24 350/0.9)); } }
@keyframes heartbeat { 0%,100% { transform:scale(1); } 12% { transform:scale(1.09); } 24% { transform:scale(1); } 36% { transform:scale(1.06); } 48% { transform:scale(1); } }
@keyframes ag-heartbeat { 0%,100% { transform:scale(1); } 12% { transform:scale(1.09); } 24% { transform:scale(1); } 36% { transform:scale(1.06); } 48% { transform:scale(1); } }
@keyframes shooting { 0% { transform:translate3d(0,0,0) rotate(28deg);opacity:0; } 8% { opacity:1; } 70% { opacity:1; } 100% { transform:translate3d(60vw,42vh,0) rotate(28deg);opacity:0; } }
@keyframes ag-shooting { 0% { transform:translate3d(0,0,0) rotate(28deg);opacity:0; } 8% { opacity:1; } 70% { opacity:1; } 100% { transform:translate3d(60vw,42vh,0) rotate(28deg);opacity:0; } }
@keyframes flame-flicker { 0%,100% { transform:scale(1) translateY(0) skewX(0deg);opacity:.95; } 25% { transform:scale(1.08) translateY(-2px) skewX(4deg);opacity:1; } 50% { transform:scale(0.94) translateY(1px) skewX(-3deg);opacity:.85; } 75% { transform:scale(1.05) translateY(-1px) skewX(2deg);opacity:1; } }
@keyframes ag-flame-flicker { 0%,100% { transform:scale(1) translateY(0) skewX(0deg);opacity:.95; } 25% { transform:scale(1.08) translateY(-2px) skewX(4deg);opacity:1; } 50% { transform:scale(0.94) translateY(1px) skewX(-3deg);opacity:.85; } 75% { transform:scale(1.05) translateY(-1px) skewX(2deg);opacity:1; } }
@keyframes spin-slow { to { transform:rotate(360deg); } }
@keyframes ag-spin-slow { to { transform:rotate(360deg); } }
@keyframes nebula-drift { 0%,100% { transform:translate3d(0,0,0) scale(1);opacity:.5; } 50% { transform:translate3d(3%,-4%,0) scale(1.12);opacity:.8; } }
@keyframes ag-nebula-drift { 0%,100% { transform:translate3d(0,0,0) scale(1);opacity:.5; } 50% { transform:translate3d(3%,-4%,0) scale(1.12);opacity:.8; } }
.ag-root .animate-twinkle { animation:twinkle 3.5s ease-in-out infinite; }
.ag-root .animate-float-soft { animation:float-soft 6s ease-in-out infinite; }
.ag-root .animate-glow-pulse { animation:glow-pulse 3s ease-in-out infinite; }
.ag-root .animate-heartbeat { animation:heartbeat 2.2s ease-in-out infinite; }
.ag-root .animate-flame { animation:flame-flicker 0.45s ease-in-out infinite; }
.ag-root .animate-spin-slow { animation:spin-slow 4s linear infinite; }
.ag-root .animate-nebula { animation:nebula-drift 22s ease-in-out infinite; }
`

interface Props { config: TemplateConfig; mode?: string }

export function AnniversaryGalaxyRenderer({ config }: Props) {
  const [page, setPage] = useState(0)
  const next = () => setPage(p => Math.min(TOTAL - 1, p + 1))
  const back = () => setPage(p => Math.max(0, p - 1))

  // Extract config with defaults
  const welcomeBadge    = (config.welcomeBadge    as string) || (defaults.welcomeBadge    as string)
  const welcomeDescription = (config.welcomeDescription as string) || (defaults.welcomeDescription as string)
  const welcomeButtonText  = (config.welcomeButtonText as string) || (defaults.welcomeButtonText as string)
  const partnerName     = (config.partnerName     as string) || (defaults.partnerName     as string)
  const journeyTitle    = (config.journeyTitle    as string) || (defaults.journeyTitle    as string)
  const journeySubtitle = (config.journeySubtitle as string) || (defaults.journeySubtitle as string)
  const memoriesTitle   = (config.memoriesTitle   as string) || (defaults.memoriesTitle   as string)
  const memoriesSubtitle = (config.memoriesSubtitle as string) || (defaults.memoriesSubtitle as string)
  const anniversaryDate = (config.anniversaryDate as string) || (defaults.anniversaryDate as string)
  const wishTitle       = (config.wishTitle       as string) || (defaults.wishTitle       as string)
  const wishSubtitle    = (config.wishSubtitle    as string) || (defaults.wishSubtitle    as string)
  const letterTitle     = (config.letterTitle     as string) || (defaults.letterTitle     as string)
  const letterSubtitle  = (config.letterSubtitle  as string) || (defaults.letterSubtitle  as string)
  const letterText      = (config.letterText      as string) || (defaults.letterText      as string)
  const specialTitle    = (config.specialTitle    as string) || (defaults.specialTitle    as string)
  const specialMessage  = (config.specialMessage  as string) || (defaults.specialMessage  as string)
  const giftTitle       = (config.giftTitle       as string) || (defaults.giftTitle       as string)
  const giftMessage     = (config.giftMessage     as string) || (defaults.giftMessage     as string)
  const songSectionTitle = (config.songSectionTitle as string) || (defaults.songSectionTitle as string)
  const songTitle       = (config.songTitle       as string) || (defaults.songTitle       as string)
  const songArtist      = (config.songArtist      as string) || (defaults.songArtist      as string)
  const couplePhotoUrl  = (config.couplePhotoUrl  as string) || "/templates/anniversary-galaxy/couple-galaxy.webp"
  const whySpecialTitle = (config.whySpecialTitle as string) || (defaults.whySpecialTitle as string)
  const whySpecialSubtitle = (config.whySpecialSubtitle as string) || (defaults.whySpecialSubtitle as string)
  const foreverTitle    = (config.foreverTitle    as string) || (defaults.foreverTitle    as string)
  const foreverText     = (config.foreverText     as string) || (defaults.foreverText     as string)
  const theEndTitle     = (config.theEndTitle     as string) || (defaults.theEndTitle     as string)
  const theEndMessage   = (config.theEndMessage   as string) || (defaults.theEndMessage   as string)
  const replayButtonText= (config.replayButtonText as string) || (defaults.replayButtonText as string)

  const memoryPhotos: string[] = (() => {
    const raw = config.memoryPhotos
    if (Array.isArray(raw) && raw.length > 0) return raw as string[]
    return defaults.memoryPhotos as string[]
  })()

  const milestones: Array<{title: string; text: string}> = (() => {
    const raw = config.milestones
    if (Array.isArray(raw) && raw.length > 0) return raw as Array<{title: string; text: string}>
    return defaults.milestones as Array<{title: string; text: string}>
  })()

  const whyCards: any[] = (() => {
    const raw = config.whyCards
    if (Array.isArray(raw) && raw.length > 0) return raw as any[]
    return defaults.whyCards as any[]
  })()

  useEffect(() => {
    const id = "ag-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = AG_CSS
      document.head.appendChild(s)
    }
  }, [])

  const scenes = [
    <Welcome key="welcome" onNext={next} couplePhoto={couplePhotoUrl} partnerName={partnerName} welcomeBadge={welcomeBadge} welcomeDescription={welcomeDescription} welcomeButtonText={welcomeButtonText} />,
    <Journey key="journey" onNext={next} milestones={milestones} title={journeyTitle} subtitle={journeySubtitle} />,
    <Memories key="memories" onNext={next} photos={memoryPhotos} title={memoriesTitle} subtitle={memoriesSubtitle} />,
    <WhySpecial key="why" onNext={next} title={whySpecialTitle} subtitle={whySpecialSubtitle} cards={whyCards} />,
    <LoveLetter key="letter" onNext={next} letterText={letterText} title={letterTitle} subtitle={letterSubtitle} />,
    <Wish key="wish" onNext={next} anniversaryDate={anniversaryDate} title={wishTitle} subtitle={wishSubtitle} />,
    <SpecialMsg key="message" onNext={next} message={specialMessage} title={specialTitle} />,
    <Gift key="gift" onNext={next} giftMessage={giftMessage} title={giftTitle} />,
    <Forever key="forever" onNext={next} partnerName={partnerName} title={foreverTitle} text={foreverText} />,
    <Song key="song" onNext={next} songTitle={songTitle} songArtist={songArtist} couplePhoto={couplePhotoUrl} songSectionTitle={songSectionTitle} />,
    <TheEnd key="end" onRestart={() => setPage(0)} partnerName={partnerName} title={theEndTitle} message={theEndMessage} replayButtonText={replayButtonText} />,
  ]

  return (
    <div className="ag-root" style={{ minHeight: "100dvh", position: "relative", background: "oklch(0.09 0.035 300)" }}>
      <GalaxyBackground />
      <CursorGlow />

      <main className="relative z-10 flex min-h-screen flex-col overflow-hidden">
        <h1 className="sr-only">Happy Anniversary — an interactive galaxy love story</h1>

        <header className="relative z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 pt-5">
          <button
            type="button"
            onClick={back}
            disabled={page === 0}
            className="glass grid h-9 w-9 place-items-center rounded-full transition-opacity disabled:opacity-25"
            aria-label="Previous page"
            style={{ cursor: page === 0 ? "not-allowed" : "pointer" }}
          >
            <ChevronLeft className="h-4 w-4" style={{ color: "var(--foreground)" }} />
          </button>

          <div className="mx-auto h-[3px] w-full max-w-xs overflow-hidden rounded-full" style={{ background: "oklch(0.24 0.09 300 / 60%)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundImage: "var(--gradient-pink)" }}
              animate={{ width: `${((page + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <span className="glass rounded-full px-3 py-1" style={{ fontSize: "11px", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}>
            {page + 1} / {TOTAL}
          </span>
        </header>

        <div className="relative flex flex-1 flex-col">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={page}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.03, filter: "blur(12px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-1 flex-col"
            >
              <Suspense fallback={
                <div className="flex flex-1 items-center justify-center">
                  <span className="h-8 w-8 animate-spin-slow rounded-full" style={{ border: "2px solid oklch(0.7 0.24 350 / 30%)", borderTopColor: "oklch(0.7 0.24 350)" }} />
                </div>
              }>
                {scenes[page]}
              </Suspense>
            </motion.section>
          </AnimatePresence>
        </div>

        <nav className="relative z-20 flex justify-center gap-2 pb-4" aria-label="Chapters">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to chapter ${i + 1}`}
              style={{
                height: "6px",
                borderRadius: "9999px",
                transition: "all 500ms",
                width: i === page ? "24px" : "6px",
                background: i === page ? "var(--primary)" : "oklch(0.76 0.05 330 / 40%)",
                ...(i === page ? { boxShadow: "var(--shadow-glow)" } : {}),
              }}
            />
          ))}
        </nav>
      </main>

      <div className="fixed bottom-4 right-4 text-xs pointer-events-none z-40 font-light" style={{ color: "rgba(255,100,100,0.35)" }}>
        @pasha_dev_
      </div>
    </div>
  )
}
