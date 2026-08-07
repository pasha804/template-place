// @ts-nocheck
import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Crown, Heart as HeartIcon, Smile, Sparkles } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const defaultCards = [
  { icon: HeartIcon, title: "Your Heart", front: "So pure, so kind.", back: "You love without conditions and it changed me." },
  { icon: Smile, title: "Your Smile", front: "It lights up my whole world.", back: "One smile from you and every bad day disappears.", featured: true },
  { icon: Sparkles, title: "You", front: "Simply amazing.", back: "There is no one, anywhere, quite like you." },
]

export function WhySpecial({ onNext, title, subtitle, cards }: { onNext: () => void; title?: string; subtitle?: string; cards?: any[] }) {
  const [flipped, setFlipped] = useState<number | null>(null)
  const cardList = cards && cards.length > 0 ? cards : defaultCards
  const icons = [HeartIcon, Smile, Sparkles]

  return (
    <SceneShell
      title={title || "Why You're Special"}
      subtitle={subtitle || <>Things that make you the most<br />special person in my life.</>}
      footerSlot={
        <>
          <p className="text-xs tracking-wide" style={{ color: "var(--muted-foreground)" }}>Tap a card to see why you're special ✧</p>
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>
        </>
      }
    >
      <div className="flex w-full max-w-2xl items-center justify-center gap-3 sm:gap-5">
        {cardList.map((c, i) => {
          const Icon = c.icon || icons[i % icons.length]
          const open = flipped === i
          const featured = c.featured || i === 1
          return (
            <motion.button
              key={c.title || i}
              type="button"
              onClick={() => setFlipped(open ? null : i)}
              initial={{ opacity: 0, y: 36, rotateY: -30 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.2 + i * 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`relative ${featured ? "h-52 w-36 sm:h-64 sm:w-48" : "h-40 w-24 sm:h-52 sm:w-36"} shrink-0`}
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotateY: open ? 180 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "relative", height: "100%", width: "100%", transformStyle: "preserve-3d" }}
              >
                <div
                  className={`glass absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-3 ${featured ? "glow-ring" : ""}`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {featured && <Crown className="h-4 w-4" style={{ color: "var(--gold)" }} />}
                  <span className="animate-glow-pulse" style={{ color: "var(--primary)" }}>
                    <Icon className={featured ? "h-9 w-9" : "h-6 w-6"} />
                  </span>
                  <p className={`script text-glow-soft ${featured ? "text-2xl" : "text-lg"}`} style={{ color: "var(--primary)" }}>{c.title}</p>
                  <p className="text-[11px] leading-snug" style={{ color: "var(--muted-foreground)" }}>{c.front}</p>
                </div>
                <div
                  className="glass-deep absolute inset-0 flex items-center justify-center rounded-3xl p-4"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <p className="font-serif text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{c.back}</p>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>
    </SceneShell>
  )
}
