/**
 * Congratulations Triumph — Renderer
 * Wraps the original "congratulationstemplate1" verbatim.
 */
// @ts-nocheck
import { lazy, Suspense, useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"
import { TriumphBackground } from "./original/components/TriumphBackground"
import { Welcome } from "./original/scenes/Welcome"

const Journey           = lazy(() => import("./original/scenes/Journey").then(m => ({ default: m.Journey })))
const Memories          = lazy(() => import("./original/scenes/Memories").then(m => ({ default: m.Memories })))
const WhyYouDeserveThis = lazy(() => import("./original/scenes/WhyYouDeserveThis").then(m => ({ default: m.WhyYouDeserveThis })))
const NoteOfPride       = lazy(() => import("./original/scenes/NoteOfPride").then(m => ({ default: m.NoteOfPride })))
const Launch            = lazy(() => import("./original/scenes/Launch").then(m => ({ default: m.Launch })))
const SpecialMessage    = lazy(() => import("./original/scenes/SpecialMessage").then(m => ({ default: m.SpecialMessage })))
const TheReward         = lazy(() => import("./original/scenes/TheReward").then(m => ({ default: m.TheReward })))
const Limitless         = lazy(() => import("./original/scenes/Limitless").then(m => ({ default: m.Limitless })))
const Anthem            = lazy(() => import("./original/scenes/Anthem").then(m => ({ default: m.Anthem })))
const TheEnd            = lazy(() => import("./original/scenes/TheEnd").then(m => ({ default: m.TheEnd })))

const TOTAL = 11

const CT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@300;400;500;600&display=swap');

.ct-root {
  --ct-background: oklch(0.12 0.04 160);
  --ct-foreground: oklch(0.95 0.02 90);
  --ct-card: oklch(0.18 0.05 160);
  --ct-primary: oklch(0.75 0.18 90);
  --ct-primary-fg: oklch(0.16 0.05 160);
  --ct-secondary: oklch(0.65 0.15 155);
  --ct-muted: oklch(0.25 0.05 160);
  --ct-muted-fg: oklch(0.75 0.04 90);
  --ct-accent: oklch(0.85 0.12 90);
  --ct-border: oklch(0.75 0.18 90 / 22%);
  --ct-gold-deep: oklch(0.65 0.15 85);
  --ct-emerald-glow: oklch(0.55 0.18 155);
  --ct-parchment: oklch(0.92 0.04 90);
  --ct-ink: oklch(0.25 0.05 90);
  --ct-shadow-gold: 0 0 24px oklch(0.75 0.18 90 / 45%),0 0 70px oklch(0.75 0.18 90 / 22%);
  --ct-shadow-emerald: 0 0 40px oklch(0.55 0.18 155 / 22%),0 24px 60px oklch(0.08 0.03 160 / 65%);
  --ct-gradient-gold: linear-gradient(135deg,oklch(0.88 0.13 92) 0%,oklch(0.78 0.17 90) 45%,oklch(0.63 0.15 84) 100%);
  --ct-gradient-triumph: radial-gradient(60% 45% at 15% 12%,oklch(0.35 0.11 158/55%) 0%,transparent 65%),radial-gradient(55% 40% at 85% 18%,oklch(0.55 0.13 92/22%) 0%,transparent 70%),radial-gradient(70% 55% at 50% 100%,oklch(0.3 0.17 160/60%) 0%,transparent 70%),linear-gradient(165deg,oklch(0.13 0.045 162),oklch(0.1 0.035 158) 55%,oklch(0.15 0.05 150));
  --ct-font-script: "Playfair Display", Georgia, serif;
  --ct-font-serif: "Cormorant Garamond", Georgia, serif;
  --ct-font-sans: "Jost", ui-sans-serif, system-ui, sans-serif;
  color: var(--ct-foreground);
  font-family: var(--ct-font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100dvh;
  position: relative;
}
.ct-root * { border-color: var(--ct-border); }
.ct-triumph-bg { background-image: var(--ct-gradient-triumph); background-attachment: fixed; }
.ct-glass { background:oklch(0.22 0.05 158/45%); backdrop-filter:blur(18px); border:1px solid oklch(0.75 0.18 90/22%); box-shadow:var(--ct-shadow-emerald); }
.ct-glass-deep { background:oklch(0.14 0.04 160/78%); backdrop-filter:blur(18px); border:1px solid oklch(0.75 0.18 90/18%); box-shadow:var(--ct-shadow-emerald); }
.ct-gradient-text { background-image:linear-gradient(100deg,oklch(0.92 0.09 95) 0%,oklch(0.78 0.17 90) 30%,oklch(0.98 0.02 90) 50%,oklch(0.78 0.17 90) 70%,oklch(0.65 0.15 85) 100%); background-size:250% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:ct-gold-shift 9s ease infinite; }
.ct-font-script { font-family:var(--ct-font-script); }
.ct-font-serif { font-family:var(--ct-font-serif); }
.ct-font-sans { font-family:var(--ct-font-sans); }
.ct-hover-lift { transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),box-shadow 0.35s ease; }
.ct-hover-lift:hover { transform:translateY(-6px) scale(1.02); box-shadow:var(--ct-shadow-gold); }
.ct-neon-gold { filter:drop-shadow(0 0 3px oklch(0.88 0.13 92/90%)) drop-shadow(0 0 10px oklch(0.75 0.18 90/70%)) drop-shadow(0 0 28px oklch(0.65 0.15 85/55%)); }
.ct-ruled-paper { background-image:repeating-linear-gradient(oklch(0.92 0.04 90) 0px,oklch(0.92 0.04 90) 33px,oklch(0.6 0.08 150/22%) 34px); background-position:0 14px; }
@keyframes ct-gold-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes gold-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes ct-twinkle { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:1;transform:scale(1.25)} }
@keyframes twinkle { 0%,100%{opacity:.2;transform:scale(.8)} 50%{opacity:1;transform:scale(1.25)} }
@keyframes ct-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes float-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes ct-glow { 0%,100%{filter:brightness(1) drop-shadow(0 0 8px oklch(0.75 0.18 90/45%))} 50%{filter:brightness(1.25) drop-shadow(0 0 26px oklch(0.85 0.15 92/75%))} }
@keyframes glow-pulse { 0%,100%{filter:brightness(1) drop-shadow(0 0 8px oklch(0.75 0.18 90/45%))} 50%{filter:brightness(1.25) drop-shadow(0 0 26px oklch(0.85 0.15 92/75%))} }
@keyframes ct-laurel { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-22px) rotate(8deg)} }
@keyframes laurel-float { 0%,100%{transform:translateY(0) rotate(-6deg)} 50%{transform:translateY(-22px) rotate(8deg)} }
@keyframes ct-flame { 0%,100%{transform:scale(1) skewX(0)} 50%{transform:scale(1.08,.95) skewX(3deg)} }
@keyframes flame-flicker { 0%,100%{transform:scale(1) skewX(0)} 50%{transform:scale(1.08,.95) skewX(3deg)} }
@keyframes ct-shoot { 0%{transform:translate3d(0,0,0) rotate(18deg);opacity:0} 8%{opacity:1} 40%{transform:translate3d(60vw,32vh,0) rotate(18deg);opacity:0} 100%{transform:translate3d(60vw,32vh,0) rotate(18deg);opacity:0} }
@keyframes shoot { 0%{transform:translate3d(0,0,0) rotate(18deg);opacity:0} 8%{opacity:1} 40%{transform:translate3d(60vw,32vh,0) rotate(18deg);opacity:0} 100%{transform:translate3d(60vw,32vh,0) rotate(18deg);opacity:0} }
@keyframes ct-rise { 0%{transform:translate3d(0,0,0);opacity:0} 12%{opacity:.85} 100%{transform:translate3d(var(--ct-drift,0px),-110vh,0);opacity:0} }
@keyframes rise { 0%{transform:translate3d(0,0,0);opacity:0} 12%{opacity:.85} 100%{transform:translate3d(var(--ct-drift,0px),-110vh,0);opacity:0} }
.ct-animate-twinkle{animation:ct-twinkle 3.5s ease-in-out infinite}
.ct-animate-float{animation:ct-float 6s ease-in-out infinite}
.ct-animate-glow{animation:ct-glow 3s ease-in-out infinite}
.ct-animate-laurel{animation:ct-laurel 9s ease-in-out infinite}
.ct-animate-flame{animation:ct-flame 0.45s ease-in-out infinite}
`

interface Props { config: TemplateConfig; mode?: string }

export function CongratulationsTriumphRenderer({ config }: Props) {
  const [page, setPage] = useState(0)
  const next    = useCallback(() => setPage(p => Math.min(TOTAL - 1, p + 1)), [])
  const back    = useCallback(() => setPage(p => Math.max(0, p - 1)), [])
  const restart = useCallback(() => setPage(0), [])

  const name         = (config.recipientName   as string) || (defaults.recipientName   as string)
  const heroImage    = (config.heroImageUrl    as string) || "/templates/congratulations-triumph/hero-achievement.jpg"
  const noteText     = (config.noteText        as string) || (defaults.noteText        as string)
  const specialMsg   = (config.specialMessage  as string) || (defaults.specialMessage  as string)
  const rewardMsg    = (config.rewardMessage   as string) || (defaults.rewardMessage   as string)
  const songTitle    = (config.songTitle       as string) || (defaults.songTitle       as string)
  const songArtist   = (config.songArtist      as string) || (defaults.songArtist      as string)

  const milestones = (() => {
    const r = config.milestones
    if (Array.isArray(r) && r.length > 0) return r as Array<{title:string;copy:string}>
    return defaults.milestones as Array<{title:string;copy:string}>
  })()

  const memoryPhotos = (() => {
    const r = config.memoryPhotos
    if (Array.isArray(r) && r.length > 0) return r as Array<{src:string;caption:string}>
    return defaults.memoryPhotos as Array<{src:string;caption:string}>
  })()

  const CHAPTERS = ["Welcome","The Journey","Memories","Why You Deserve This","A Note of Pride","Launch","Special Message","The Reward","Limitless Potential","Your Anthem","Onward & Upward"]

  useEffect(() => {
    const id = "ct-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style"); s.id = id; s.textContent = CT_CSS
      document.head.appendChild(s)
    }
  }, [])

  const scenes = [
    <Welcome key="welcome" name={name} onNext={next} heroImage={heroImage} title={config.welcomeTitle as string} subtitle={config.welcomeSubtitle as string} buttonText={config.welcomeButtonText as string} />,
    <Journey key="journey" onNext={next} title={config.journeyTitle as string} subtitle={config.journeySubtitle as string} milestones={milestones} />,
    <Memories key="memories" onNext={next} title={config.memoriesTitle as string} photos={memoryPhotos} />,
    <WhyYouDeserveThis key="deserve" onNext={next} title={config.deserveTitle as string} cards={config.deserveCards as any[]} />,
    <NoteOfPride key="note" name={name} onNext={next} title={config.noteTitle as string} noteText={noteText} />,
    <Launch key="launch" onNext={next} title={config.launchTitle as string} text={config.launchText as string} />,
    <SpecialMessage key="message" onNext={next} title={config.specialTitle as string} message={specialMsg} />,
    <TheReward key="reward" onNext={next} title={config.rewardTitle as string} rewardMessage={rewardMsg} />,
    <Limitless key="limitless" onNext={next} title={config.limitlessTitle as string} text={config.limitlessText as string} />,
    <Anthem key="anthem" onNext={next} songTitle={songTitle} songArtist={songArtist} audioSrc={config.audioSrc as string} />,
    <TheEnd key="end" name={name} onRestart={restart} title={config.theEndTitle as string} message={config.theEndMessage as string} buttonText={config.replayButtonText as string} />,
  ]

  return (
    <div className="ct-root" style={{ background: "oklch(0.12 0.04 160)" }}>
      <TriumphBackground />

      <h1 className="sr-only">Congratulations {name} — an eleven chapter celebration</h1>

      <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-4 sm:px-8">
        <button type="button" onClick={back} disabled={page === 0} aria-label="Previous chapter"
          className="ct-glass flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-30"
          style={{ color: "var(--ct-primary)" }}>
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>
        <div className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: "var(--ct-muted)" }} role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={page + 1}>
          <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${((page + 1) / TOTAL) * 100}%`, backgroundImage: "var(--ct-gradient-gold)" }} />
        </div>
        <span className="shrink-0 text-[0.65rem] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--ct-font-sans)", color: "var(--ct-muted-fg)" }}>
          {String(page + 1).padStart(2, "0")} / {TOTAL}
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center">
        <h2 className="sr-only">{CHAPTERS[page]}</h2>
        <Suspense fallback={<div className="ct-animate-glow py-24 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--ct-font-sans)", color: "var(--ct-primary)" }}>Loading chapter…</div>}>
          <AnimatePresence mode="wait">{scenes[page]}</AnimatePresence>
        </Suspense>
      </main>

      <footer className="relative z-20 flex items-center justify-center gap-2.5 px-5 py-7">
        {CHAPTERS.map((chapter, i) => (
          <button key={chapter} type="button" onClick={() => setPage(i)} aria-label={`Go to chapter ${i + 1}: ${chapter}`} aria-current={i === page}
            className="h-2.5 cursor-pointer rounded-full transition-all duration-500"
            style={i === page ? { width: "28px", backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" } : { width: "10px", background: "var(--ct-muted)" }} />
        ))}
      </footer>
    </div>
  )
}
