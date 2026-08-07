/**
 * Birthday Rose — Renderer
 * Thin wrapper around the original birthday template3 single-file SPA.
 * Viewport isolation: position:fixed + inset:0 + overflow-y:auto
 * The original CSS is injected via a <style> tag so it only affects this template.
 */
import { useEffect } from "react"
import type { TemplateConfig } from "@/engine/types"
import RosePage from "./original/index"

// Scoped CSS — original BT3 styles.css, but scoped inside .bt3-root
// and without the Tailwind @import lines
const ROSE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

.bt3-root {
  --font-script: "Great Vibes", cursive;
  --font-serif: "Playfair Display", serif;
  --font-sans: "Cormorant Garamond", serif;
  --background: oklch(0.13 0.05 20);
  --foreground: oklch(0.96 0.02 30);
  --card: oklch(0.17 0.06 18);
  --primary: oklch(0.82 0.09 35);
  --muted-foreground: oklch(0.75 0.04 30);
  --gold: oklch(0.82 0.11 75);
  --border: oklch(0.35 0.08 25 / 40%);
  --grad-bg: radial-gradient(ellipse at top, oklch(0.22 0.09 20) 0%, oklch(0.09 0.04 20) 70%);
  --shadow-glow: 0 0 40px oklch(0.6 0.15 20 / 0.35);
  background: var(--grad-bg);
  color: var(--foreground);
  font-family: var(--font-sans);
  min-height: 100%;
}
.bt3-root h1, .bt3-root h2, .bt3-root h3 { font-family: var(--font-serif); }
.bt3-root .font-script { font-family: var(--font-script); }
.bt3-root .font-serif  { font-family: var(--font-serif); }
.bt3-root .text-primary { color: var(--primary); }
.bt3-root .text-gold    { color: var(--gold); }
.bt3-root .text-foreground { color: var(--foreground); }
.bt3-root .text-muted-foreground { color: var(--muted-foreground); }
.bt3-root .italic { font-style: italic; }
.bt3-root .text-center { text-align: center; }
.bt3-root .text-sm { font-size: 0.875rem; }
.bt3-root .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.bt3-root .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
.bt3-root .text-5xl { font-size: 3rem; line-height: 1; }
.bt3-root .text-6xl { font-size: 3.75rem; line-height: 1; }
.bt3-root .text-8xl { font-size: 6rem; line-height: 1; }

@keyframes bt3-heart-float {
  0%   { transform: translateY(110vh) scale(0.6) rotate(0deg); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(-15vh) scale(1) rotate(20deg); opacity: 0; }
}
.bt3-root .heart {
  position: absolute;
  color: oklch(0.65 0.2 15);
  animation: bt3-heart-float linear infinite;
  filter: drop-shadow(0 0 8px oklch(0.6 0.2 15 / 0.7));
  pointer-events: none;
}
@keyframes bt3-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.bt3-root .fade-up { animation: bt3-fade-up 0.9s ease-out both; }

.bt3-root .card-panel {
  background: linear-gradient(160deg, oklch(0.16 0.06 18 / 0.9), oklch(0.11 0.04 18 / 0.9));
  border: 1px solid oklch(0.6 0.15 25 / 0.25);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-glow), inset 0 0 60px oklch(0.4 0.1 20 / 0.15);
}
.bt3-root .btn-outline-gold {
  border: 1px solid oklch(0.75 0.12 60 / 0.6);
  color: oklch(0.9 0.08 65);
  padding: 0.75rem 1.75rem;
  letter-spacing: 0.25em;
  font-size: 0.75rem;
  text-transform: uppercase;
  background: transparent;
  transition: all 0.3s;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-block;
}
.bt3-root .btn-outline-gold:hover {
  background: oklch(0.75 0.12 60 / 0.15);
  box-shadow: 0 0 20px oklch(0.7 0.15 55 / 0.4);
}
@keyframes bt3-blink { 0%,100%{opacity:1}50%{opacity:0} }
.bt3-root .typewriter-cursor {
  display: inline-block; width: 2px; margin-left: 2px;
  font-weight: 100;
  animation: bt3-blink 0.8s step-end infinite;
  color: oklch(0.82 0.09 35);
}
@keyframes bt3-img-float {
  0%,100%{ transform: scale(1) translateY(0); }
  50%    { transform: scale(1.03) translateY(-6px); }
}
.bt3-root .hero-img-float { animation: bt3-img-float 6s ease-in-out infinite; }
.bt3-root .gallery-card { transition: transform 0.35s ease, box-shadow 0.35s ease; }
.bt3-root .gallery-card:hover { transform: translateY(-6px) scale(1.03); box-shadow: 0 12px 40px oklch(0.55 0.18 15 / 0.55); }
.bt3-root .gallery-img { transition: transform 0.5s ease; }
.bt3-root .gallery-card:hover .gallery-img { transform: scale(1.08); }
.bt3-root .album-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.bt3-root .album-hover:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 10px 30px oklch(0.55 0.18 15 / 0.4); }
@keyframes bt3-shake {
  0%,100%{transform:translateX(0)}15%{transform:translateX(-8px) rotate(-1deg)}30%{transform:translateX(8px) rotate(1deg)}45%{transform:translateX(-6px)}60%{transform:translateX(6px)}75%{transform:translateX(-4px)}90%{transform:translateX(4px)}
}
.bt3-root .pw-shake, .bt3-root .quiz-shake { animation: bt3-shake 0.6s ease-in-out; }
.bt3-root .certificate-panel {
  background: linear-gradient(160deg, oklch(0.16 0.06 18 / 0.95), oklch(0.11 0.04 18 / 0.95));
  border: 2px solid oklch(0.75 0.15 30 / 0.6);
  border-radius: 0.75rem;
  box-shadow: 0 0 40px oklch(0.6 0.15 20 / 0.45), inset 0 0 60px oklch(0.4 0.1 20 / 0.2);
  position: relative;
}
.bt3-root .certificate-panel::before {
  content:""; position:absolute; inset:6px;
  border:1px solid oklch(0.65 0.12 30 / 0.3); border-radius:0.5rem; pointer-events:none;
}
.bt3-root .min-h-screen { min-height: 100vh; min-height: 100%; }
.bt3-root .relative { position: relative; }
.bt3-root .overflow-x-hidden { overflow-x: hidden; }
.bt3-root .flex { display: flex; }
.bt3-root .flex-col { flex-direction: column; }
.bt3-root .items-center { align-items: center; }
.bt3-root .justify-center { justify-content: center; }
.bt3-root .gap-3 { gap: 0.75rem; }
.bt3-root .gap-5 { gap: 1.25rem; }
.bt3-root .gap-6 { gap: 1.5rem; }
.bt3-root .grid { display: grid; }
.bt3-root .grid-cols-2 { grid-template-columns: repeat(2,minmax(0,1fr)); }
.bt3-root .grid-cols-1 { grid-template-columns: repeat(1,minmax(0,1fr)); }
.bt3-root .w-full { width: 100%; }
.bt3-root .max-w-md { max-width: 28rem; }
.bt3-root .max-w-lg { max-width: 32rem; }
.bt3-root .max-w-xl { max-width: 36rem; }
.bt3-root .max-w-2xl { max-width: 42rem; }
.bt3-root .max-w-3xl { max-width: 48rem; }
.bt3-root .max-w-4xl { max-width: 56rem; }
.bt3-root .max-w-5xl { max-width: 64rem; }
.bt3-root .px-4 { padding-left:1rem; padding-right:1rem; }
.bt3-root .py-3 { padding-top:0.75rem; padding-bottom:0.75rem; }
.bt3-root .py-16 { padding-top:4rem; padding-bottom:4rem; }
.bt3-root .p-2 { padding:0.5rem; }
.bt3-root .p-3 { padding:0.75rem; }
.bt3-root .p-8 { padding:2rem; }
.bt3-root .p-10 { padding:2.5rem; }
.bt3-root .p-12 { padding:3rem; }
.bt3-root .mt-2 { margin-top:0.5rem; }
.bt3-root .mt-4 { margin-top:1rem; }
.bt3-root .mt-6 { margin-top:1.5rem; }
.bt3-root .mt-8 { margin-top:2rem; }
.bt3-root .mt-10 { margin-top:2.5rem; }
.bt3-root .mt-12 { margin-top:3rem; }
.bt3-root .mb-2 { margin-bottom:0.5rem; }
.bt3-root .mb-3 { margin-bottom:0.75rem; }
.bt3-root .mb-4 { margin-bottom:1rem; }
.bt3-root .mb-6 { margin-bottom:1.5rem; }
.bt3-root .mb-8 { margin-bottom:2rem; }
.bt3-root .font-bold { font-weight:700; }
.bt3-root .font-semibold { font-weight:600; }
.bt3-root .leading-tight { line-height:1.25; }
.bt3-root .leading-relaxed { line-height:1.625; }
.bt3-root .tracking-wide { letter-spacing:0.025em; }
.bt3-root .tracking-widest { letter-spacing:0.1em; }
.bt3-root .whitespace-pre-wrap { white-space:pre-wrap; }
.bt3-root .overflow-hidden { overflow:hidden; }
.bt3-root .rounded { border-radius:0.25rem; }
.bt3-root .rounded-md { border-radius:0.375rem; }
.bt3-root .rounded-xl { border-radius:0.75rem; }
.bt3-root .rounded-lg { border-radius:0.5rem; }
.bt3-root .w-full { width:100%; }
.bt3-root .aspect-\\[3\\/4\\] { aspect-ratio:3/4; }
.bt3-root .aspect-square { aspect-ratio:1/1; }
.bt3-root .object-cover { object-fit:cover; }
.bt3-root .object-contain { object-fit:contain; }
.bt3-root .max-h-\\[85vh\\] { max-height:85vh; }
.bt3-root .z-0 { z-index:0; }
.bt3-root .z-10 { z-index:10; }
.bt3-root .z-50 { z-index:50; }
.bt3-root .pointer-events-none { pointer-events:none; }
.bt3-root .fixed { position:fixed; }
.bt3-root .inset-0 { inset:0; }
.bt3-root .bg-black\\/85 { background:rgba(0,0,0,0.85); }
.bt3-root .backdrop-blur-sm { backdrop-filter:blur(4px); }
.bt3-root button { cursor:pointer; font-family:inherit; }
.bt3-root input { font-family:inherit; }
.bt3-root .transition { transition:all 0.15s; }
.bt3-root .animate-pulse { animation:pulse 2s cubic-bezier(0.4,0,0.6,1) infinite; }
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.bt3-root .hover\\:text-primary:hover { color:var(--primary); }
.bt3-root .focus\\:border-primary:focus { border-color:var(--primary); }
.bt3-root .outline-none { outline:none; }
/* Responsive (md ≥768px) variants — MUST come after all base utilities so
   they win the cascade at desktop widths (media queries add no specificity). */
@media(min-width:768px){
.bt3-root .md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}
.bt3-root .md\\:p-10{padding:2.5rem}
.bt3-root .md\\:p-12{padding:3rem}
.bt3-root .md\\:text-base{font-size:1rem;line-height:1.5rem}
.bt3-root .md\\:text-xl{font-size:1.25rem;line-height:1.75rem}
.bt3-root .md\\:text-2xl{font-size:1.5rem;line-height:2rem}
.bt3-root .md\\:text-3xl{font-size:1.875rem;line-height:2.25rem}
.bt3-root .md\\:text-4xl{font-size:2.25rem;line-height:2.5rem}
.bt3-root .md\\:text-5xl{font-size:3rem;line-height:1}
.bt3-root .md\\:text-6xl{font-size:3.75rem;line-height:1}
.bt3-root .md\\:text-8xl{font-size:6rem;line-height:1}
}
`

interface Props { config: TemplateConfig; mode?: string }

export function BirthdayRoseRenderer({ config }: Props) {
  // Inject scoped CSS once
  useEffect(() => {
    const id = "bt3-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = ROSE_CSS
      document.head.appendChild(s)
    }
    return () => {
      // Don't remove on unmount — avoids flash on re-mount
    }
  }, [])

  return (
    <div style={{
      position: "relative",
      minHeight: "100%",
      overflowX: "hidden",
    }}>
      <div className="bt3-root">
        <RosePage config={config} />
      </div>
    </div>
  )
}
