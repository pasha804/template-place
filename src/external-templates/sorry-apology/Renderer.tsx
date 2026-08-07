/**
 * Sorry Apology — Renderer (sorry template3)
 * Self-contained: Intro/Hey/Gussa/Chances/Sorry/Friends(runaway)/Yay
 * Soft pink glassmorphism, Dancing Script + Quicksand fonts
 */
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { TemplateConfig } from "@/engine/types"

// Import the self-contained App component
import SorryApp from "./original/App"

// Scoped CSS
const SORRY_APOLOGY_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Quicksand:wght@400;500;600;700&display=swap');

.sa-root {
  font-family: "Quicksand", sans-serif;
  min-height: 100%;
  position: relative;
  background: linear-gradient(160deg, #ffe4ec 0%, #ffd6e8 30%, #ffc8e4 60%, #ffb3d9 100%);
  color: #1a1a1a;
}
.sa-root .font-display { font-family: "Dancing Script", cursive !important; }
.sa-root .intro-card {
  background: rgba(255,255,255,0.65);
  border: 1px solid rgba(236,72,153,0.18);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(236,72,153,0.15), 0 4px 20px rgba(0,0,0,0.08);
}
.sa-root .btn-cute {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 1rem;
  background: linear-gradient(135deg, #f472b6, #e11d48);
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(236,72,153,0.4);
  transition: transform 0.2s, box-shadow 0.2s;
}
.sa-root .btn-cute:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(236,72,153,0.55);
}
.sa-root .text-muted-foreground { color: rgba(100,20,50,0.6); }
.sa-root .text-foreground { color: #1a1a1a; }
@keyframes sa-floatUp {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 0.5; }
  100% { transform: translateY(-105vh) rotate(360deg); opacity: 0; }
}
.sa-root .heart-particle {
  position: fixed;
  animation-name: sa-floatUp;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  pointer-events: none;
  z-index: 0;
  user-select: none;
}
@keyframes sa-heartbeat {
  0%,100% { transform: scale(1); }
  15%  { transform: scale(1.18); }
  30%  { transform: scale(1); }
  45%  { transform: scale(1.12); }
  60%  { transform: scale(1); }
}
.sa-root .animate-heartbeat { animation: sa-heartbeat 1.8s ease-in-out infinite; }
`

interface Props { config: TemplateConfig; mode?: string }

export function SorryApologyRenderer({ config }: Props) {
  const personName = (config.partnerName as string) || (config.personName as string) || "Kashaf"

  // Inject CSS once
  useEffect(() => {
    const id = "sa-apology-styles"
    if (!document.getElementById(id)) {
      const s = document.createElement("style")
      s.id = id
      s.textContent = SORRY_APOLOGY_CSS
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <div className="sa-root">
        <SorryApp personName={personName} />
        {/* Watermark */}
        <motion.div
          initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ position: "fixed", bottom: "1rem", right: "1rem", fontSize: "0.8125rem", color: "rgba(0,0,0,0.3)", pointerEvents: "none", zIndex: 50, fontWeight: 300 }}>
          @pasha_dev_
        </motion.div>
      </div>
    </div>
  )
}
