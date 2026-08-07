// @ts-nocheck
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { ChevronDown, CalendarDays } from "lucide-react"

const EASE = [0.19, 1, 0.22, 1] as const

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const diff = now === null ? 0 : Math.max(0, new Date(target).getTime() - now)
  return {
    ready: now !== null,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function CountCard({ value, label, index }: { value: number; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: 1.5 + index * 0.12, ease: EASE }}
      className="glass-card relative min-w-[4.6rem] rounded-sm px-4 py-4 text-center sm:min-w-[6.5rem] sm:px-7 sm:py-5"
    >
      <span className="absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />
      <span className="block font-display text-2xl text-ivory tabular-nums sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 block text-[0.55rem] tracking-[0.3em] text-gold/80 uppercase">
        {label}
      </span>
    </motion.div>
  )
}

export function Hero({
  brideName = "Ayesha",
  groomName = "Hamza",
  weddingDate = "2026-12-25T14:00:00+05:00",
  heroImageUrl = "/templates/wedding-eternal/hero-couple.jpg",
  quote = "Two hearts. One beautiful journey.",
}: {
  brideName?: string
  groomName?: string
  weddingDate?: string
  heroImageUrl?: string
  quote?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const t = useCountdown(weddingDate)

  const dateFormatted = new Date(weddingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }) || "December 25, 2026"

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <motion.img
          src={heroImageUrl}
          alt={`${brideName} and ${groomName} together`}
          width={1920}
          height={1280}
          fetchPriority="high"
          className="h-full w-full object-cover object-[60%_center]"
          initial={{ scale: 1.16, filter: "blur(18px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.4, ease: EASE }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-abyss via-navy-abyss/70 to-navy-abyss/25" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-abyss via-transparent to-navy-abyss/70" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-28 sm:px-10"
      >
        <div className="ml-auto max-w-2xl text-center lg:text-right">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "1em" }}
            animate={{ opacity: 1, letterSpacing: "0.42em" }}
            transition={{ duration: 1.6, delay: 0.5, ease: EASE }}
            className="text-[0.6rem] tracking-luxe text-gold/80 uppercase"
          >
            Eternal Love Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.7, ease: EASE }}
            className="font-script text-gold-gradient mt-5 text-[3.4rem] leading-[0.95] sm:text-8xl lg:text-[7.5rem]"
          >
            {brideName} <span className="text-4xl sm:text-6xl">&amp;</span> {groomName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.1, ease: EASE }}
            className="font-display mt-3 text-lg font-light tracking-[0.2em] text-ivory/85 italic sm:text-2xl"
          >
            are getting married
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="mt-7 flex items-center justify-center gap-3 lg:justify-end"
          >
            <CalendarDays className="h-4 w-4 text-gold" strokeWidth={1.2} aria-hidden />
            <span className="font-display text-lg tracking-[0.2em] text-gold sm:text-2xl">
              {dateFormatted}
            </span>
          </motion.div>

          <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-end">
            <CountCard value={t.days} label="Days" index={0} />
            <CountCard value={t.hours} label="Hours" index={1} />
            <CountCard value={t.minutes} label="Minutes" index={2} />
            <CountCard value={t.seconds} label="Seconds" index={3} />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 2 }}
            className="font-display mt-8 text-sm text-ivory/60 italic sm:text-base"
          >
            &ldquo;{quote}&rdquo;
          </motion.p>
        </div>
      </motion.div>

      <motion.button
        onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Scroll to our story"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold/50 text-gold backdrop-blur-sm transition-colors hover:bg-gold/15"
      >
        <ChevronDown className="h-4 w-4" strokeWidth={1.4} />
      </motion.button>
    </section>
  )
}
