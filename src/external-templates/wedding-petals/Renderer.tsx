/**
 * Wedding Petals — Renderer
 * VERBATIM original implementation of weeding template2
 */
// @ts-nocheck
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"
import { Petals } from "./original/components/atoms"
import { Nav } from "./original/components/Nav"
import { Hero } from "./original/components/Hero"
import { Story } from "./original/components/Story"
import { Couple } from "./original/components/Couple"
import { Events } from "./original/components/Events"
import { Gallery } from "./original/components/Gallery"
import { Rsvp } from "./original/components/Rsvp"
import { Footer } from "./original/components/Footer"

const WP_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Parisienne&family=Jost:wght@300;400;500;600&display=swap');

.wp-root {
  --radius: 0.25rem;
  --background: oklch(0.16 0.045 330);
  --foreground: oklch(0.95 0.015 40);
  --card: oklch(0.21 0.05 332);
  --card-foreground: oklch(0.95 0.015 40);
  --popover: oklch(0.21 0.05 332);
  --popover-foreground: oklch(0.95 0.015 40);
  --primary: oklch(0.74 0.13 52);
  --primary-foreground: oklch(0.18 0.05 330);
  --secondary: oklch(0.27 0.06 335);
  --secondary-foreground: oklch(0.95 0.015 40);
  --muted: oklch(0.25 0.05 333);
  --muted-foreground: oklch(0.76 0.035 25);
  --accent: oklch(0.83 0.07 20);
  --accent-foreground: oklch(0.18 0.05 330);
  --border: oklch(0.42 0.07 340 / 45%);
  --input: oklch(0.3 0.05 333);
  --copper: oklch(0.74 0.13 52);
  --copper-light: oklch(0.87 0.09 68);
  --blush: oklch(0.83 0.07 20);
  --plum-deep: oklch(0.12 0.04 330);
  --gradient-copper: linear-gradient(100deg, oklch(0.68 0.11 40), oklch(0.9 0.1 75), oklch(0.72 0.13 45));
  --gradient-veil: linear-gradient(180deg, oklch(0.12 0.04 330 / 0) 0%, oklch(0.12 0.04 330 / 0.55) 45%, oklch(0.16 0.045 330) 100%);
  --shadow-soft: 0 24px 60px -30px oklch(0.05 0.03 330 / 0.9);
  --shadow-glow: 0 0 40px -8px oklch(0.74 0.13 52 / 0.45);
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-script: "Parisienne", cursive;
  --font-body: "Jost", system-ui, sans-serif;

  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-body);
  min-height: 100vh;
  position: relative;
}
.wp-root h1, .wp-root h2, .wp-root h3 { font-family: var(--font-display); }
.wp-root .text-copper-gradient {
  background: var(--gradient-copper);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.wp-root .surface-card {
  background: linear-gradient(160deg, oklch(0.24 0.055 334 / 0.9), oklch(0.18 0.045 330 / 0.9));
  border: 1px solid oklch(0.74 0.13 52 / 0.28);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(6px);
}
.wp-root .hairline {
  background: linear-gradient(90deg, transparent, oklch(0.74 0.13 52 / 0.7), transparent);
}
.wp-root .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.wp-root .reveal[data-visible="true"] {
  opacity: 1;
  transform: none;
}
@keyframes petal-fall {
  0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 0; }
  10% { opacity: 0.75; }
  100% { transform: translate3d(var(--drift, 40px), 110vh, 0) rotate(540deg); opacity: 0; }
}
.wp-root .animate-petal { animation: petal-fall linear infinite; }
@keyframes shimmer { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
.wp-root .animate-shimmer { background-size: 200% auto; animation: shimmer 6s ease-in-out infinite; }
@keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.wp-root .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
@keyframes pulse-ring { 0% { box-shadow: 0 0 0 0 oklch(0.74 0.13 52 / 0.5); } 70% { box-shadow: 0 0 0 18px oklch(0.74 0.13 52 / 0); } 100% { box-shadow: 0 0 0 0 oklch(0.74 0.13 52 / 0); } }
.wp-root .animate-pulse-ring { animation: pulse-ring 2.4s ease-out infinite; }
`

export function WeddingPetalsRenderer({ config }: { config?: TemplateConfig }) {
  const c = { ...defaults, ...config }

  return (
    <div className="wp-root">
      <style>{WP_CSS}</style>
      <Petals />
      <Nav brideName={c.brideName} groomName={c.groomName} />
      <main className="relative z-10">
        <Hero
          brideName={c.brideName}
          groomName={c.groomName}
          weddingDate={c.weddingDate}
          heroImageUrl={c.heroImageUrl}
          tagline={c.tagline}
        />
        <Story story={c.story} />
        <Couple
          brideName={c.brideName}
          groomName={c.groomName}
          brideImageUrl={c.brideImageUrl}
          groomImageUrl={c.groomImageUrl}
          brideBio={c.brideBio}
          groomBio={c.groomBio}
        />
        <Events
          venue={c.venue}
          venueAddress={c.venueAddress}
          weddingDate={c.weddingDate}
        />
        <Gallery galleryImages={c.galleryImages} />
        <Rsvp
          rsvpWhatsapp={c.rsvpWhatsapp}
          brideName={c.brideName}
          groomName={c.groomName}
        />
      </main>
      <Footer brideName={c.brideName} groomName={c.groomName} />
    </div>
  )
}

export default WeddingPetalsRenderer
