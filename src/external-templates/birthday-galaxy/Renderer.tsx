/**
 * Birthday Galaxy — Renderer
 * Thin wrapper around birthday template2 original screens.
 * Viewport isolation: position:fixed + inset:0 + overflow-y:auto
 * CSS from BT2's styles.css injected scoped inside .bt2-root
 */
import { useState, useEffect } from "react"
import type { TemplateConfig } from "@/engine/types"
import { ButterflyTrail } from "./original/ButterflyTrail"
import HeroPage     from "./original/index"
import MemoriesPage from "./original/memories"
import JourneyPage  from "./original/journey"
import NotePage     from "./original/note"
import SongPage     from "./original/song"
import SpecialPage  from "./original/special"
import WishPage     from "./original/wish"
import WishesPage   from "./original/wishes"
import SurprisePage from "./original/surprise"
import LovePage     from "./original/love"
import FinalPage    from "./original/final"

const GALAXY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Caveat:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap');

.bt2-root {
  --font-cursive: "Great Vibes", cursive;
  --font-hand: "Caveat", cursive;
  --font-body: "Poppins", sans-serif;
  --background: oklch(0.18 0.09 295);
  --foreground: oklch(0.97 0.02 300);
  --card: oklch(0.28 0.11 295 / 0.35);
  --primary: oklch(0.72 0.18 295);
  --muted: oklch(0.35 0.08 295 / 0.5);
  --muted-foreground: oklch(0.82 0.04 295);
  --gold: oklch(0.85 0.14 85);
  --border: oklch(0.85 0.15 295 / 0.15);
  --color-background: oklch(0.18 0.09 295);
  --color-foreground: oklch(0.97 0.02 300);
  --color-muted-foreground: oklch(0.82 0.04 295);
  --color-muted: oklch(0.35 0.08 295 / 0.5);
  --color-primary: oklch(0.72 0.18 295);
  --color-border: oklch(0.85 0.15 295 / 0.15);
  background: radial-gradient(ellipse at top, oklch(0.28 0.14 295) 0%, oklch(0.12 0.08 290) 70%);
  color: oklch(0.97 0.02 300);
  font-family: "Poppins", sans-serif;
  min-height: 100%;
}
.bt2-root * { border-color: oklch(0.85 0.15 295 / 0.15); box-sizing: border-box; }
.bt2-root button { cursor: pointer; font-family: inherit; }
.bt2-root .text-muted-foreground { color: oklch(0.82 0.04 295) !important; }
.bt2-root .text-foreground { color: oklch(0.97 0.02 300) !important; }
.bt2-root .text-primary { color: oklch(0.72 0.18 295) !important; }

.bt2-root .font-cursive { font-family: "Great Vibes", cursive; }
.bt2-root .font-hand    { font-family: "Caveat", cursive; }

.bt2-root .text-gold-gradient {
  background: linear-gradient(135deg, #ffd88a 0%, #f0b84a 40%, #ffd88a 60%, #e8a530 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.bt2-root .glass-card {
  background: linear-gradient(135deg, rgba(120,80,200,0.18), rgba(80,40,160,0.12));
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(200,170,255,0.18);
  box-shadow: 0 8px 40px rgba(80,30,150,0.4), inset 0 1px 0 rgba(255,255,255,0.08);
}

.bt2-root .gx-btn, .bt2-root .btn-galaxy {
  background: linear-gradient(135deg, #a78bfa 0%, #8b6cf5 100%);
  color: white;
  padding: 0.75rem 1.75rem;
  border-radius: 999px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  box-shadow: 0 4px 20px rgba(139,108,245,0.5), inset 0 1px 0 rgba(255,255,255,0.3);
  border: 1px solid rgba(255,255,255,0.2);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}
.bt2-root .gx-btn:hover, .bt2-root .btn-galaxy:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 30px rgba(139,108,245,0.7);
}

.bt2-root .polaroid {
  background: #fdfaf3;
  padding: 10px 10px 44px 10px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3);
  border-radius: 3px;
}

@keyframes bt2-twinkle { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
@keyframes bt2-float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(10deg)} }
@keyframes bt2-shimmer-text { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3)} }
@keyframes bt2-heart-glow {
  0%,100%{filter:drop-shadow(0 0 30px rgba(180,120,255,0.9)) drop-shadow(0 0 60px rgba(139,108,245,0.6));transform:scale(1)}
  50%{filter:drop-shadow(0 0 50px rgba(200,150,255,1)) drop-shadow(0 0 90px rgba(139,108,245,0.8));transform:scale(1.05)}
}
@keyframes bt2-gift-bounce { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
@keyframes bt2-blink-caret { 0%,100%{opacity:1} 50%{opacity:0} }

.bt2-root .star       { animation: bt2-twinkle 3s ease-in-out infinite; }
.bt2-root .floaty     { animation: bt2-float-slow 6s ease-in-out infinite; }
.bt2-root .shimmer    { animation: bt2-shimmer-text 3s ease-in-out infinite; }
.bt2-root .heart-glow { animation: bt2-heart-glow 2s ease-in-out infinite; }
.bt2-root .gift-bounce{ animation: bt2-gift-bounce 2.2s ease-in-out infinite; }
.bt2-root .caret::after { content:"|"; margin-left:4px; animation:bt2-blink-caret 0.9s step-end infinite; color:#ffd88a; }

.bt2-root .gif-frame { overflow:hidden; border-radius:1rem; box-shadow:0 12px 40px rgba(0,0,0,0.45); }
.bt2-root .gif-frame img { display:block; border:none; outline:none; }
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayGalaxyRenderer({ config }: Props) {
  const [screen, setScreen] = useState(0)

  useEffect(() => {
    const id = "bt2-galaxy-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = GALAXY_CSS
      document.head.appendChild(s)
    }
  }, [])

  const next = (n: number) => () => setScreen(n)

  const photos = Array.isArray(config.memoryPhotos) && (config.memoryPhotos as string[]).length > 0
    ? config.memoryPhotos as string[]
    : [
        config.photo1 as string,
        config.photo2 as string,
        config.photo3 as string,
        config.photo4 as string,
      ].filter(Boolean) as string[]

  const screens: Record<number, React.ReactNode> = {
    0:  <HeroPage     onNext={next(1)}  recipientName={(config.birthdayName as string) || "My Star"} />,
    1:  <MemoriesPage onNext={next(2)}  photos={photos} />,
    2:  <JourneyPage  onNext={next(3)}  milestones={config.milestones as any[]} title={config.journeyTitle as string} />,
    3:  <NotePage     onNext={next(4)}  noteText={config.noteText as string} />,
    4:  <SongPage     onNext={next(5)}  />,
    5:  <SpecialPage  onNext={next(6)}  title={config.specialTitle as string} cards={config.specialCards as any[]} />,
    6:  <WishPage     onNext={next(7)}  />,
    7:  <WishesPage   onNext={next(8)}  title={config.wishesTitle as string} wishesList={config.wishesList as any[]} />,
    8:  <SurprisePage onNext={next(9)}  />,
    9:  <LovePage     onNext={next(10)} letterText={config.loveLetterText as string} />,
    10: <FinalPage    onNext={next(0)}  />,
  }

  return (
    <div style={{ position: "relative", minHeight: "100%", overflowX: "hidden" }}>
      <div className="bt2-root">
        <ButterflyTrail />
        {screens[screen] ?? screens[0]}
      </div>
    </div>
  )
}
