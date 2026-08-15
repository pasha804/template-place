import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import type { ExternalTemplateProps } from "@/engine/types";
import { birthdayCelestialDefaults } from "./schema";

// Sub-components
import { GalaxyBackground } from "./original/components/GalaxyBackground";
import { CursorGlow } from "./original/components/CursorGlow";
import { Countdown } from "./original/components/scenes/Countdown";
import { Welcome } from "./original/components/scenes/Welcome";
import { Age } from "./original/components/scenes/Age";
import { Quiz } from "./original/components/scenes/Quiz";
import { Journey } from "./original/components/scenes/Journey";
import { Wish } from "./original/components/scenes/Wish";
import { Moments } from "./original/components/scenes/Moments";
import { TapToReveal } from "./original/components/scenes/TapToReveal";
import { Memories } from "./original/components/scenes/Memories";
import { WhySpecialNew } from "./original/components/scenes/WhySpecialNew";
import { WishesNew } from "./original/components/scenes/WishesNew";
import { SongNew } from "./original/components/scenes/SongNew";
import { EnvelopeLetter } from "./original/components/scenes/EnvelopeLetter";
import { Gift } from "./original/components/scenes/Gift";
import { ForeverNew } from "./original/components/scenes/ForeverNew";
import { TheEndNew } from "./original/components/scenes/TheEndNew";

const CHAPTERS = [
  "Welcome",
  "Age",
  "Quiz",
  "Journey",
  "Wish",
  "Moments",
  "Secrets",
  "Memories",
  "Awards",
  "Wishes",
  "Song",
  "Letter",
  "Gift",
  "Forever",
  "The End",
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Great+Vibes&family=Jost:wght@300;400;500;600;700&display=swap');

.bt-celestial-root {
  --background: oklch(0.08 0.035 295);
  --foreground: oklch(0.96 0.02 300);
  --card: oklch(0.12 0.04 295 / 0.65);
  --card-foreground: oklch(0.96 0.02 300);
  --popover: oklch(0.12 0.04 295 / 0.85);
  --popover-foreground: oklch(0.96 0.02 300);
  --primary: oklch(0.72 0.25 348);
  --primary-foreground: oklch(0.98 0.01 300);
  --secondary: oklch(0.2 0.06 295);
  --secondary-foreground: oklch(0.96 0.02 300);
  --muted: oklch(0.18 0.04 295);
  --muted-foreground: oklch(0.78 0.06 310);
  --accent: oklch(0.68 0.22 310);
  --accent-foreground: oklch(0.98 0.01 300);
  --border: oklch(0.35 0.1 315 / 0.35);
  --star: oklch(0.96 0.08 85);
  --nebula: oklch(0.35 0.22 300);
  --magenta: oklch(0.55 0.28 340);
  --violet: oklch(0.42 0.24 285);
  --gold: oklch(0.85 0.18 85);
  --paper: oklch(0.96 0.03 85);
  --paper-ink: oklch(0.22 0.05 300);

  --gradient-galaxy: linear-gradient(135deg, oklch(0.12 0.05 290) 0%, oklch(0.06 0.03 285) 50%, oklch(0.08 0.04 330) 100%);
  --gradient-pink: linear-gradient(135deg, oklch(0.78 0.22 345) 0%, oklch(0.62 0.27 335) 50%, oklch(0.52 0.25 305) 100%);
  --gradient-aurora: linear-gradient(90deg, oklch(0.72 0.25 348), oklch(0.68 0.22 310), oklch(0.75 0.18 190), oklch(0.85 0.18 85));
  --shadow-glow: 0 0 35px oklch(0.72 0.25 348 / 0.45), 0 0 80px oklch(0.55 0.28 340 / 0.25);
  --shadow-glow-soft: 0 0 25px oklch(0.72 0.25 348 / 0.3);

  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Jost', sans-serif;
  overflow-x: hidden;
  box-sizing: border-box;
}

.bt-celestial-root *, .bt-celestial-root *::before, .bt-celestial-root *::after {
  box-sizing: border-box;
}

.bt-celestial-root .script {
  font-family: 'Great Vibes', cursive;
}

.bt-celestial-root .font-serif {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.bt-celestial-root .galaxy-bg {
  background: var(--gradient-galaxy);
}

.bt-celestial-root .glass {
  background: oklch(0.14 0.05 295 / 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid oklch(0.65 0.18 330 / 0.25);
}

.bt-celestial-root .glass-deep {
  background: oklch(0.1 0.04 295 / 0.78);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid oklch(0.7 0.22 340 / 0.35);
}

.bt-celestial-root .text-glow {
  text-shadow: 0 0 20px oklch(0.78 0.22 345 / 0.75), 0 0 45px oklch(0.62 0.27 335 / 0.45);
}

.bt-celestial-root .text-glow-soft {
  text-shadow: 0 0 14px oklch(0.78 0.22 345 / 0.55);
}

.bt-celestial-root .neon-outline {
  filter: drop-shadow(0 0 8px oklch(0.72 0.25 348 / 0.75)) drop-shadow(0 0 22px oklch(0.6 0.24 310 / 0.45));
}

.bt-celestial-root .gradient-text {
  background-image: var(--gradient-pink);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.bt-celestial-root .glow-ring {
  box-shadow: 0 0 0 1px oklch(0.75 0.22 345 / 0.5), 0 0 25px oklch(0.72 0.25 348 / 0.4);
}

.bt-celestial-root .bg-paper {
  background-color: var(--paper);
}

.bt-celestial-root .text-paper-ink {
  color: var(--paper-ink);
}

.bt-celestial-root .bg-gold {
  background-color: var(--gold);
}

.bt-celestial-root .text-gold {
  color: var(--gold);
}

.bt-celestial-root .bg-star {
  background-color: var(--star);
}

.bt-celestial-root .bg-nebula {
  background-color: var(--nebula);
}

.bt-celestial-root .bg-magenta {
  background-color: var(--magenta);
}

.bt-celestial-root .bg-violet {
  background-color: var(--violet);
}

.bt-celestial-root .bg-primary {
  background-color: var(--primary);
}

.bt-celestial-root .text-primary {
  color: var(--primary);
}

.bt-celestial-root .bg-secondary {
  background-color: var(--secondary);
}

.bt-celestial-root .text-secondary {
  color: var(--secondary);
}

.bt-celestial-root .text-muted-foreground {
  color: var(--muted-foreground);
}

.bt-celestial-root .border-border {
  border-color: var(--border);
}

.bt-celestial-root .scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.bt-celestial-root .scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.25; transform: scale(0.85); }
  50% { opacity: 1; transform: scale(1.15); }
}

@keyframes nebula-pulse {
  0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.35; }
  50% { transform: scale(1.18) translate(30px, -20px); opacity: 0.6; }
}

@keyframes float-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes flame {
  0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(-1deg); }
  50% { transform: translate(-50%, -50%) scale(1.1, 0.95) rotate(1.5deg); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.12); }
}

.bt-celestial-root .animate-twinkle {
  animation: twinkle 3s ease-in-out infinite;
}

.bt-celestial-root .animate-nebula {
  animation: nebula-pulse 16s ease-in-out infinite alternate;
}

.bt-celestial-root .animate-float-soft {
  animation: float-soft 5s ease-in-out infinite;
}

.bt-celestial-root .animate-flame {
  animation: flame 0.35s ease-in-out infinite alternate;
}

.bt-celestial-root .animate-glow-pulse {
  animation: glow-pulse 2.2s ease-in-out infinite;
}
`;

export function BirthdayCelestialRenderer({ config }: ExternalTemplateProps) {
  const merged = useMemo(
    () => ({ ...birthdayCelestialDefaults, ...(config || {}) }),
    [config]
  );

  const [inCountdown, setInCountdown] = useState(true);
  const [page, setPage] = useState(0);

  const next = () => setPage((p) => Math.min(CHAPTERS.length - 1, p + 1));
  const prev = () => setPage((p) => Math.max(0, p - 1));

  // If in editor or preview, allow jumping directly if needed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, inCountdown]);

  return (
    <div className="bt-celestial-root">
      <style>{STYLES}</style>
      <GalaxyBackground />
      <CursorGlow />

      <main className="relative flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        {inCountdown ? (
          <Countdown
            onComplete={() => setInCountdown(false)}
            title={`Happy Birthday, ${merged.recipientName}!`}
          />
        ) : (
          <>
            {/* Top progress & header bar */}
            <header className="relative z-20 flex w-full max-w-5xl items-center justify-between px-5 pt-4">
              <div className="flex items-center gap-3">
                {page > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={prev}
                    aria-label="Previous scene"
                    className="glass grid h-9 w-9 place-items-center rounded-full text-foreground hover:border-primary/60 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </motion.button>
                )}
                <span className="script text-2xl text-primary text-glow font-medium">
                  {merged.recipientName}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
                  {CHAPTERS[page]} • {page + 1}/{CHAPTERS.length}
                </span>
                <div className="relative h-1.5 w-24 sm:w-32 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-[image:var(--gradient-pink)]"
                    initial={false}
                    animate={{ width: `${((page + 1) / CHAPTERS.length) * 100}%` }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            </header>

            {/* Scene Body */}
            <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={page}
                  initial={{ opacity: 0, y: 14, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.985 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full flex-1 flex-col items-center justify-center"
                >
                  {page === 0 && (
                    <Welcome
                      onNext={next}
                      birthdayName={merged.recipientName}
                      heroDate={merged.heroDate}
                      heroTagline={merged.heroTagline}
                      heroDescription={merged.heroDescription}
                      heroImage={merged.heroImage}
                    />
                  )}
                  {page === 1 && (
                    <Age
                      onNext={next}
                      age={merged.age}
                      birthdayName={merged.recipientName}
                      ageNickname={merged.ageNickname}
                      ageSpecialMessage={merged.ageSpecialMessage}
                    />
                  )}
                  {page === 2 && (
                    <Quiz
                      onNext={next}
                      quizTitle={merged.quizTitle}
                      quizSubtitle={merged.quizSubtitle}
                    />
                  )}
                  {page === 3 && (
                    <Journey
                      onNext={next}
                    />
                  )}
                  {page === 4 && (
                    <Wish
                      onNext={next}
                      cakeHeadingUnlit={merged.cakeHeadingUnlit}
                      cakeHeadingLit={merged.cakeHeadingLit}
                      cakeMessage={merged.cakeMessage}
                    />
                  )}
                  {page === 5 && (
                    <Moments
                      onNext={next}
                    />
                  )}
                  {page === 6 && (
                    <TapToReveal
                      onNext={next}
                    />
                  )}
                  {page === 7 && (
                    <Memories
                      onNext={next}
                    />
                  )}
                  {page === 8 && (
                    <WhySpecialNew
                      onNext={next}
                    />
                  )}
                  {page === 9 && (
                    <WishesNew
                      onNext={next}
                    />
                  )}
                  {page === 10 && (
                    <SongNew
                      onNext={next}
                      songTitle={merged.songTitle}
                      songSubtitle={merged.songSubtitle}
                      songDescription={merged.songDescription}
                    />
                  )}
                  {page === 11 && (
                    <EnvelopeLetter
                      onNext={next}
                      letterTitle={merged.letterTitle}
                      letterBody={merged.letterBody}
                    />
                  )}
                  {page === 12 && (
                    <Gift
                      onNext={next}
                      giftTitle={merged.giftTitle}
                      giftRevealedTitle={merged.giftRevealedTitle}
                      giftDescription={merged.giftDescription}
                    />
                  )}
                  {page === 13 && (
                    <ForeverNew
                      onNext={next}
                    />
                  )}
                  {page === 14 && (
                    <TheEndNew
                      onRestart={() => setPage(0)}
                      birthdayName={merged.recipientName}
                      theEndTitle={merged.theEndTitle}
                      theEndSubtitle={merged.theEndSubtitle}
                      theEndParagraph1={merged.theEndParagraph1}
                      theEndParagraph2={merged.theEndParagraph2}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom chapter dots navigation */}
            <nav
              aria-label="Scene pagination"
              className="relative z-20 mb-4 flex items-center gap-1.5 rounded-full p-2 glass max-w-[90vw] overflow-x-auto scrollbar-hide"
            >
              {CHAPTERS.map((title, i) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Go to ${title}`}
                  aria-current={i === page ? "step" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-6 bg-primary glow-ring"
                      : "w-2 bg-muted-foreground/35 hover:bg-foreground/50"
                  }`}
                />
              ))}
            </nav>
          </>
        )}
      </main>
    </div>
  );
}

export default BirthdayCelestialRenderer;
