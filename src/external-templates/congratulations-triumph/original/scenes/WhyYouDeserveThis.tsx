// @ts-nocheck
import { useState } from "react"
import { motion } from "framer-motion"
import { Crown, Lightbulb, Shield, Target } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const DEFAULT_CARDS = [
  { title: "Your Resilience", icon: "Shield", front: "You kept going when stopping would have been easier.", back: "Every setback became a lesson instead of an ending. That stubborn refusal to quit is the rarest quality there is." },
  { title: "Your Dedication", icon: "Target", front: "You gave this everything, long before anyone noticed.", back: "Discipline in the dark is what makes success look effortless in the light. You did the unglamorous work, and it built something permanent.", featured: true },
  { title: "Your Vision", icon: "Lightbulb", front: "You saw this moment before it existed.", back: "You imagined a version of your life that hadn't happened yet — and then walked toward it until it became real. That's vision." },
]

const ICON_MAP = { Shield, Target, Lightbulb, Crown }

export function WhyYouDeserveThis({ onNext, cards }: { onNext: () => void; cards?: typeof DEFAULT_CARDS }) {
  const [flipped, setFlipped] = useState<number | null>(null)
  const items = (cards && cards.length > 0) ? cards : DEFAULT_CARDS
  return (
    <SceneShell title="Why You Deserve This" subtitle="Tap a card to read the whole truth." footer={<GlowButton onClick={onNext}>Continue</GlowButton>}>
      <div className="grid grid-cols-1 items-center gap-7 md:grid-cols-3">
        {items.map((card, i) => {
          const Icon = ICON_MAP[card.icon as keyof typeof ICON_MAP] ?? Shield
          const isFlipped = flipped === i
          return (
            <motion.div key={card.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }} className={card.featured ? "md:-my-6" : ""} style={{ perspective: "1000px" }}>
              <button
                type="button"
                onClick={() => setFlipped(isFlipped ? null : i)}
                aria-label={`Flip the card about ${card.title}`}
                className="relative w-full cursor-pointer text-left"
                style={{ height: card.featured ? "320px" : "288px", transformStyle: "preserve-3d", transition: "transform 0.7s", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                <div className="ct-glass ct-hover-lift absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl p-7 text-center" style={{ backfaceVisibility: "hidden" }}>
                  {card.featured && <Crown className="ct-animate-glow h-7 w-7" style={{ color: "var(--ct-primary)" }} aria-hidden />}
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}>
                    <Icon className="h-6 w-6" style={{ color: "var(--ct-primary-fg)" }} aria-hidden />
                  </span>
                  <h3 className="ct-font-script text-2xl" style={{ color: "var(--ct-accent)" }}>{card.title}</h3>
                  <p className="ct-font-serif text-base" style={{ color: "var(--ct-muted-fg)" }}>{card.front}</p>
                  <span className="ct-font-sans text-[0.6rem] tracking-[0.25em] uppercase" style={{ color: "var(--ct-primary)" }}>Tap to flip</span>
                </div>
                <div className="ct-glass-deep absolute inset-0 flex items-center justify-center rounded-3xl p-7 text-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <p className="ct-font-serif text-lg leading-relaxed" style={{ color: "var(--ct-foreground)" }}>{card.back}</p>
                </div>
              </button>
            </motion.div>
          )
        })}
      </div>
    </SceneShell>
  )
}
