import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { Butterfly } from "../Butterfly";
import { Heart } from "../Heart";

const ease = [0.22, 1, 0.36, 1] as const;

interface WelcomeProps {
  onNext: () => void;
  birthdayName?: string;
  heroDate?: string;
  heroTagline?: string;
  heroDescription?: string;
  heroImage?: string;
  startButtonText?: string;
}

export function Welcome({
  onNext,
  birthdayName = "Jana",
  heroDate = "12th August, 2026 - Wednesday 3:00 AM",
  heroTagline = "for my special one",
  heroDescription = "You mean the universe to me. A special journey through our memories, love, and every reason you make every day magical, my Jana.",
  heroImage = "/templates/birthday-celestial/images/couple-galaxy.webp",
  startButtonText = "Start the Celebration",
}: WelcomeProps) {
  return (
    <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-6">
      {/* glowing arc */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.6, ease }}
        className="pointer-events-none absolute top-[2%] h-[46vh] w-[130%] max-w-5xl rounded-[50%] border-t-2 border-primary/60 blur-[1px] neon-outline"
      />

      <motion.div
        className="absolute left-[8%] top-[16%] w-10 text-primary/70 neon-outline"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <Butterfly className="h-full w-full" />
      </motion.div>
      <motion.div
        className="absolute right-[10%] top-[26%] w-8 text-accent/70 neon-outline"
        animate={{ x: [0, -30, 0], y: [0, 26, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <Butterfly className="h-full w-full" />
      </motion.div>

      <div className="relative grid w-full max-w-6xl items-center gap-10 text-center md:grid-cols-2 md:gap-14 md:text-left">
        {/* ---------- copy ---------- */}
        <div className="flex flex-col items-center md:items-start">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] tracking-[0.32em] uppercase text-muted-foreground"
          >
            <Heart className="h-3 w-3 text-primary neon-outline" />
            {heroDate}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 34, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease }}
            className="relative mt-5 text-5xl leading-[1.05] text-glow sm:text-7xl md:text-8xl font-bold pb-1"
          >
            Happy
            <br />
            <span className="gradient-text">Birthday</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-3 text-3xl text-primary text-glow sm:text-4xl font-medium"
          >
            {birthdayName} ♡
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.05, duration: 1, ease }}
            className="mt-5 h-px w-40 origin-center bg-[image:var(--gradient-aurora)] md:origin-left"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.9 }}
            className="mt-8"
          >
            <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
              {startButtonText}
            </GlowButton>
          </motion.div>
        </div>

        {/* ---------- portrait ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.4, ease }}
          className="relative mx-auto w-full max-w-md"
        >
          {/* orbiting halo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[3rem] border border-primary/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold neon-outline" />
            <span className="absolute -bottom-1 left-1/4 h-1.5 w-1.5 rounded-full bg-primary neon-outline" />
          </motion.div>

          <div className="animate-float-soft relative overflow-hidden rounded-[2.25rem] border border-border shadow-[var(--shadow-glow)]">
            <img
              loading="eager"
              decoding="async"
              fetchPriority="high"
              src={heroImage}
              alt="Birthday silhouette illustration in glowing galaxy"
              width={1024}
              height={1024}
              className="h-80 w-full object-cover object-[50%_62%] sm:h-96 md:h-[30rem]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] ring-1 ring-inset ring-primary/30" />
            <p className="absolute bottom-4 left-0 right-0 text-center text-2xl text-glow">
              {heroTagline}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
