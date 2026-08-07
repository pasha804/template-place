// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { SceneShell } from "../components/SceneShell"
import { GlowButton } from "../components/GlowButton"
import { Heart } from "../components/Heart"

const DEFAULT_MILESTONES = [
  { title: "First Hello", text: "The moment we met." },
  { title: "First Talk", text: "The beginning of everything." },
  { title: "First Date", text: "The day we became something special." },
  { title: "Today", text: "Our beautiful journey continues…" },
]

export function Journey({
  onNext,
  milestones,
  title,
  subtitle,
}: {
  onNext: () => void;
  milestones?: Array<{ title: string; text: string }>;
  title?: string;
  subtitle?: string;
}) {
  const items = (milestones && milestones.length > 0) ? milestones : DEFAULT_MILESTONES
  return (
    <SceneShell
      title={title || "Our Journey"}
      subtitle={subtitle || <>Every love story is beautiful,<br />but ours is my favorite.</>}
      footerSlot={<GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>Next</GlowButton>}
    >
      <div className="relative mx-auto w-full max-w-md pl-12 text-left">
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "100%", opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="absolute left-[1.35rem] top-2 w-[2px] rounded-full neon-outline"
          style={{ backgroundImage: "linear-gradient(to bottom, var(--primary), var(--accent), oklch(0.7 0.24 350 / 10%))" }}
        />
        <ul className="space-y-8">
          {items.map((m, i) => (
            <motion.li
              key={m.title}
              initial={{ opacity: 0, x: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.7 + i * 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.span
                className="absolute -left-12 top-0 w-8 neon-outline"
                style={{ color: "var(--primary)" }}
                animate={{ scale: [1, 1.14, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
              >
                <Heart className="h-full w-full" />
              </motion.span>
              <h3 className="font-serif text-lg tracking-wide text-glow-soft" style={{ color: "var(--primary)" }}>{m.title}</h3>
              <p className="mt-0.5 text-sm" style={{ color: "var(--muted-foreground)" }}>{m.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </SceneShell>
  )
}
