// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { GlowButton } from "../components/GlowButton"
import { Butterfly } from "../components/Butterfly"
import { Heart } from "../components/Heart"

const ease = [0.22, 1, 0.36, 1] as const

export function Welcome({
  onNext,
  couplePhoto,
  partnerName,
  welcomeBadge,
  welcomeDescription,
  welcomeButtonText,
}: {
  onNext: () => void;
  couplePhoto?: string;
  partnerName?: string;
  welcomeBadge?: string;
  welcomeDescription?: string;
  welcomeButtonText?: string;
}) {
  const src = couplePhoto || "/templates/anniversary-galaxy/couple-galaxy.webp"
  const badge = welcomeBadge || "A little galaxy just for you"
  const desc = welcomeDescription || "You mean the universe to me. Eleven little chapters of us — our journey, our memories, and every reason I'd choose you again."
  const btnText = welcomeButtonText || "Start Our Journey"

  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute top-[2%] h-[46vh] w-[130%] max-w-5xl rounded-[50%] border-t-2 border-primary/60 blur-[1px] neon-outline"
        style={{ borderColor: "oklch(0.7 0.24 350 / 60%)" }}
      />
      <motion.div
        className="absolute left-[8%] top-[16%] w-10 neon-outline"
        style={{ color: "oklch(0.7 0.24 350 / 70%)" }}
        animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <Butterfly className="h-full w-full" />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[26%] w-8 neon-outline"
        style={{ color: "oklch(0.6 0.24 305 / 70%)" }}
        animate={{ x: [0, -30, 0], y: [0, 26, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Butterfly className="h-full w-full" />
      </motion.div>

      <div className="relative grid w-full max-w-6xl items-center gap-10 text-center md:grid-cols-2 md:gap-14 md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--muted-foreground)" }}
          >
            <Heart className="h-3 w-3 neon-outline" style={{ color: "var(--primary)" }} />
            {badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease }}
            className="script relative mt-5 text-glow"
            style={{ fontSize: "clamp(3rem,8vw,5rem)", lineHeight: 0.95 }}
          >
            Happy<br />
            <span className="gradient-text">Anniversary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="script mt-3 text-glow"
            style={{ fontSize: "clamp(1.5rem,4vw,2rem)", color: "var(--primary)" }}
          >
            {partnerName ? `My ${partnerName} ♡` : "My Love ♡"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.05, duration: 1, ease }}
            className="mt-5 h-px w-40 origin-center md:origin-left"
            style={{ backgroundImage: "var(--gradient-aurora)" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-5 max-w-sm text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--muted-foreground)" }}
          >
            {desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="mt-8"
          >
            <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
              {btnText}
            </GlowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.4, ease }}
          className="relative mx-auto w-full max-w-md"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[3rem]"
            style={{ border: "1px solid oklch(0.7 0.24 350 / 25%)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full neon-outline" style={{ background: "var(--gold)" }} />
            <span className="absolute -bottom-1 left-1/4 h-1.5 w-1.5 rounded-full neon-outline" style={{ background: "var(--primary)" }} />
          </motion.div>
          <div className="animate-float-soft relative overflow-hidden rounded-[2.25rem]" style={{ border: "1px solid var(--border)", boxShadow: "var(--shadow-glow)" }}>
            <img
              loading="eager"
              decoding="async"
              src={src}
              alt="Couple together"
              width={1024}
              height={1024}
              className="h-80 w-full object-cover object-[50%_62%] sm:h-96 md:h-[30rem]"
            />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.09 0.035 300 / 90%), transparent)" }} />
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem]" style={{ boxShadow: "inset 0 0 0 1px oklch(0.7 0.24 350 / 30%)" }} />
            <p className="script absolute bottom-4 left-0 right-0 text-center text-2xl text-glow">
              us, under every star
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
