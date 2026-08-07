/**
 * Wedding Eternal — Renderer
 * VERBATIM original implementation of weadding template1
 */
// @ts-nocheck
import type { TemplateConfig } from "@/engine/types"
import { defaults } from "./schema"
import { Ambient } from "./original/components/Ambient"
import { Navbar } from "./original/components/Navbar"
import { Hero } from "./original/components/Hero"
import { Timeline } from "./original/components/Timeline"
import { Couple } from "./original/components/Couple"
import { EventDetails } from "./original/components/EventDetails"
import { Schedule } from "./original/components/Schedule"
import { Gallery } from "./original/components/Gallery"
import { RSVP } from "./original/components/RSVP"
import { Registry } from "./original/components/Registry"
import { Hotels } from "./original/components/Hotels"
import { BridalParty } from "./original/components/BridalParty"
import { Faq } from "./original/components/FAQ"
import { Footer } from "./original/components/Footer"

const WE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

.we-root {
  --gold: oklch(0.767 0.139 91.1);
  --gold-soft: oklch(0.931 0.053 92.9);
  --ivory: oklch(0.996 0.02 106.8);
  --cream: oklch(0.982 0.004 91.4);
  --navy: oklch(0.346 0.074 256);
  --navy-deep: oklch(0.27 0.062 254.6);
  --navy-abyss: oklch(0.215 0.048 253.8);
  --blush: oklch(0.858 0.057 18.3);
  --charcoal: oklch(0.381 0.026 237.5);
  --gradient-gold: linear-gradient(100deg, oklch(0.72 0.12 88), oklch(0.93 0.06 95), oklch(0.8 0.14 92), oklch(0.93 0.06 95), oklch(0.72 0.12 88));
  --shadow-gold: 0 0 0 1px oklch(0.767 0.139 91.1 / 35%), 0 25px 60px -25px oklch(0.767 0.139 91.1 / 45%);
  --shadow-luxe: 0 30px 80px -30px oklch(0 0 0 / 70%);

  background-color: var(--navy-abyss);
  color: var(--ivory);
  font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
.we-root h1, .we-root h2, .we-root h3, .we-root h4 { font-family: 'Playfair Display', Georgia, serif; }
.we-root .font-script { font-family: 'Great Vibes', cursive !important; }
.we-root .text-gold-gradient {
  background: var(--gradient-gold);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  animation: we-shimmer 7s linear infinite;
}
.we-root .glass-card {
  background: linear-gradient(150deg, oklch(1 0 0 / 8%), oklch(0.346 0.074 256 / 22%) 45%, oklch(0.215 0.048 253.8 / 40%));
  backdrop-filter: blur(16px);
  border: 1px solid oklch(0.767 0.139 91.1 / 25%);
  box-shadow: var(--shadow-luxe);
}
.we-root .glass-card-light {
  background: linear-gradient(150deg, oklch(1 0 0 / 75%), oklch(0.98 0.01 95 / 55%));
  backdrop-filter: blur(14px);
  border: 1px solid oklch(0.767 0.139 91.1 / 35%);
  box-shadow: 0 25px 60px -35px oklch(0.346 0.074 256 / 45%);
}
.we-root .gold-rule {
  background: linear-gradient(90deg, transparent, oklch(0.767 0.139 91.1 / 70%), transparent);
}
.we-root .section-pad { padding-block: clamp(5rem, 11vw, 9.5rem); }
.we-root .tracking-luxe { letter-spacing: 0.42em; }
@keyframes we-shimmer { to { background-position: 250% 0; } }
`

export function WeddingEternalRenderer({ config }: { config?: TemplateConfig }) {
  const c = { ...defaults, ...config }

  return (
    <div className="we-root">
      <style>{WE_CSS}</style>
      <Ambient />
      <Navbar brideName={c.brideName} groomName={c.groomName} />
      <main className="relative z-10">
        <Hero
          brideName={c.brideName}
          groomName={c.groomName}
          weddingDate={c.weddingDate}
          heroImageUrl={c.heroImageUrl}
          quote={c.quote}
        />
        <Timeline story={c.story} />
        <Couple
          brideName={c.brideName}
          groomName={c.groomName}
          brideImageUrl={c.brideImageUrl}
          groomImageUrl={c.groomImageUrl}
          brideNote={c.brideNote}
          groomNote={c.groomNote}
        />
        <EventDetails
          venue={c.venue}
          venueAddress={c.venueAddress}
          weddingDate={c.weddingDate}
        />
        <Schedule />
        <Gallery galleryImages={c.galleryImages} />
        <RSVP
          rsvpWhatsapp={c.rsvpWhatsapp}
          brideName={c.brideName}
          groomName={c.groomName}
        />
        <Registry />
        <Hotels />
        <BridalParty />
        <Faq />
      </main>
      <Footer
        brideName={c.brideName}
        groomName={c.groomName}
        hashtag={c.hashtag}
      />
    </div>
  )
}

export default WeddingEternalRenderer
