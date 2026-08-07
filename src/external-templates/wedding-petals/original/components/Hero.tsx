// @ts-nocheck
import { useEffect, useState } from "react"

function useCountdown(targetDate: string) {
  const [now, setNow] = useState<number | null>(null)
  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const target = new Date(targetDate).getTime()
  const diff = now === null ? 0 : Math.max(0, target - now)
  return {
    ready: now !== null,
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

function Unit({ value, label, ready }: { value: number; label: string; ready: boolean }) {
  return (
    <div className="surface-card min-w-[76px] rounded-sm px-4 py-3 text-center md:min-w-[104px] md:px-6 md:py-4">
      <div className="font-display text-2xl leading-none text-copper-light tabular-nums md:text-4xl">
        {ready ? String(value).padStart(2, "0") : "--"}
      </div>
      <div className="mt-2 text-[0.6rem] tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

export function Hero({
  brideName = "Zara",
  groomName = "Rayan",
  weddingDate = "2026-12-25T14:00:00+05:00",
  heroImageUrl = "/templates/wedding-petals/hero-couple.jpg",
  tagline = "Two hearts, one endless evening.",
}: {
  brideName?: string
  groomName?: string
  weddingDate?: string
  heroImageUrl?: string
  tagline?: string
}) {
  const c = useCountdown(weddingDate)

  const dateFormatted = new Date(weddingDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, " · ") || "25 · 12 · 2026"

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <img
        src={heroImageUrl}
        alt={`${brideName} and ${groomName} together`}
        width={1600}
        height={1104}
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-veil)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 40%, oklch(0.16 0.045 330 / 0.15), oklch(0.12 0.04 330 / 0.85))",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 py-28 text-center">
        <p className="animate-[fade-in_1s_ease-out_both] text-[0.65rem] tracking-[0.6em] uppercase text-blush/80">
          Together with their families
        </p>
        <h1 className="mt-6 animate-[fade-in_1.2s_ease-out_.15s_both] text-5xl leading-[1.05] font-light sm:text-7xl md:text-8xl">
          <span className="text-copper-gradient animate-shimmer" style={{ fontFamily: "var(--font-script)" }}>
            {brideName} &amp; {groomName}
          </span>
        </h1>
        <p className="mt-4 animate-[fade-in_1.2s_ease-out_.3s_both] font-display text-xl italic text-blush/90 md:text-2xl">
          are getting married
        </p>

        <div className="mt-8 flex animate-[fade-in_1.2s_ease-out_.45s_both] items-center gap-4 text-copper">
          <span className="hairline h-px w-12" />
          <span className="font-display text-lg tracking-[0.2em] md:text-2xl">
            {dateFormatted}
          </span>
          <span className="hairline h-px w-12" />
        </div>

        <div className="mt-10 flex animate-[fade-in_1.2s_ease-out_.6s_both] flex-wrap justify-center gap-3">
          <Unit value={c.days} label="Days" ready={c.ready} />
          <Unit value={c.hours} label="Hours" ready={c.ready} />
          <Unit value={c.minutes} label="Minutes" ready={c.ready} />
          <Unit value={c.seconds} label="Seconds" ready={c.ready} />
        </div>

        <p className="mt-10 animate-[fade-in_1.2s_ease-out_.75s_both] font-display text-lg italic text-muted-foreground">
          “{tagline}”
        </p>

        <a
          href="#rsvp"
          className="animate-pulse-ring mt-9 rounded-full border border-copper/60 px-8 py-3 text-[0.7rem] tracking-[0.35em] uppercase text-copper-light transition-colors hover:bg-copper hover:text-primary-foreground"
        >
          RSVP
        </a>
      </div>

      <a
        href="#story"
        aria-label="Scroll to our story"
        className="animate-float-slow absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-copper/80"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="11" strokeWidth="0.6" />
          <path d="M8 11l4 4 4-4" strokeWidth="1.2" />
        </svg>
      </a>
    </section>
  )
}
