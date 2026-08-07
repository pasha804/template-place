// @ts-nocheck
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { GlowButton } from "../components/GlowButton"
import { between, series } from "../components/rand"

export function Welcome({ name, onNext, heroImage }: { name: string; onNext: () => void; heroImage?: string }) {
  const src = heroImage || "/templates/congratulations-triumph/hero-achievement.jpg"
  const orbits = series(2024, 8, (r) => ({
    angle: between(r, 0, 360),
    radius: between(r, 30, 48),
    size: between(r, 4, 8),
    duration: between(r, 14, 26),
  }))

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-6 sm:gap-12 sm:px-8 sm:py-10 lg:grid-cols-2 overflow-hidden"
    >
      <div className="text-center lg:text-left">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="ct-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[0.65rem] tracking-[0.28em] uppercase"
          style={{ fontFamily: "var(--ct-font-sans)", color: "var(--ct-primary)" }}
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          A New Chapter Begins
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="ct-gradient-text ct-font-script mt-4 text-[clamp(1.75rem,5vw,3.4rem)] leading-[1.12] font-bold break-words sm:mt-6"
        >
          Congratulations, {name}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="ct-font-serif mx-auto mt-4 max-w-lg text-base sm:mt-6 sm:text-2xl lg:mx-0"
          style={{ color: "var(--ct-muted-fg)" }}
        >
          You did it. Not by luck, not by chance — by showing up, again and again, until the world had no choice but to applaud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-6 flex justify-center sm:mt-9 lg:justify-start"
        >
          <GlowButton onClick={onNext}>Start the Celebration</GlowButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-xs sm:max-w-md overflow-hidden sm:overflow-visible"
      >
        <div className="ct-animate-float relative">
          <div
            className="relative overflow-hidden rounded-[2rem] p-2"
            style={{ backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)" }}
          >
            <img
              src={src}
              alt="A golden graduation cap and trophy resting on emerald velvet"
              width={1024}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full rounded-[1.7rem] object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-2 rounded-[1.7rem] ring-1 ring-accent/50" />
        </div>

        {orbits.map((o, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute top-1/2 left-1/2 rounded-full"
            style={{ width: o.size, height: o.size, background: "var(--ct-primary)", boxShadow: "var(--ct-shadow-gold)" }}
            animate={{
              x: [
                Math.cos((o.angle * Math.PI) / 180) * o.radius * 3,
                Math.cos(((o.angle + 180) * Math.PI) / 180) * o.radius * 3,
                Math.cos((o.angle * Math.PI) / 180) * o.radius * 3,
              ],
              y: [
                Math.sin((o.angle * Math.PI) / 180) * o.radius * 2.5,
                Math.sin(((o.angle + 180) * Math.PI) / 180) * o.radius * 2.5,
                Math.sin((o.angle * Math.PI) / 180) * o.radius * 2.5,
              ],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{ duration: o.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </motion.div>
    </motion.section>
  )
}
