// @ts-nocheck
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"

const DEFAULT_MILESTONES = [
  {
    title: "The Beginning",
    copy: "A quiet decision no one applauded. You started anyway.",
  },
  {
    title: "The Hard Work",
    copy: "Long nights, early mornings, and a hundred small sacrifices nobody saw.",
  },
  {
    title: "The Breakthrough",
    copy: "The moment it finally clicked — and you realised you were capable all along.",
  },
  {
    title: "Today: Victory",
    copy: "The proof, in your hands. Earned entirely, undeniably, by you.",
  },
]

export function Journey({ onNext, milestones }: { onNext: () => void; milestones?: Array<{ title: string; copy?: string; text?: string }> }) {
  const items = (milestones && milestones.length > 0)
    ? milestones.map(m => ({ title: m.title, copy: m.copy || m.text || "" }))
    : DEFAULT_MILESTONES

  return (
    <SceneShell
      title="The Journey"
      subtitle="Every great achievement is the result of countless small steps."
      footer={<GlowButton onClick={onNext}>Continue</GlowButton>}
    >
      <div className="relative mx-auto max-w-2xl pl-8 text-left sm:pl-16">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute top-2 bottom-2 left-2.5 w-px origin-top sm:left-6"
          style={{ backgroundImage: "var(--ct-gradient-gold)" }}
        />

        {items.map((m, i) => (
          <motion.article
            key={m.title}
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + i * 0.28, duration: 0.6 }}
            className="ct-glass ct-hover-lift relative mb-5 rounded-2xl p-4 sm:mb-6 sm:p-6"
          >
            <span
              className="absolute top-6 -left-[1.65rem] flex h-6 w-6 items-center justify-center rounded-full sm:-left-[2.6rem]"
              style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
            >
              <Star className="h-3.5 w-3.5" style={{ color: "var(--ct-primary-fg)" }} aria-hidden />
            </span>
            <h3 className="ct-font-script text-lg sm:text-2xl" style={{ color: "var(--ct-accent)" }}>{m.title}</h3>
            <p className="ct-font-serif mt-2 text-sm sm:text-lg" style={{ color: "var(--ct-muted-fg)" }}>{m.copy}</p>
          </motion.article>
        ))}
      </div>
    </SceneShell>
  )
}
