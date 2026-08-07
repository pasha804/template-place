// @ts-nocheck
import { Ornament } from "./atoms"

export function Footer({ brideName = "Zara", groomName = "Rayan" }: { brideName?: string; groomName?: string }) {
  return (
    <footer className="relative overflow-hidden border-t border-copper/20 py-16 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, oklch(0.3 0.08 335 / 0.6), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-5">
        <p className="font-display text-lg italic text-muted-foreground">
          “Love makes life a beautiful journey.”
        </p>
        <h2
          className="text-copper-gradient animate-shimmer mt-6 text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          {brideName} &amp; {groomName}
        </h2>
        <p className="mt-3 text-[0.62rem] tracking-[0.45em] uppercase text-copper/80">
          #{brideName}Weds{groomName}
        </p>
        <div className="mt-7">
          <Ornament />
        </div>
        <p className="mt-7 text-xs text-muted-foreground">
          Thank you for being part of our story · December 25, 2026 · Lahore
        </p>
      </div>
    </footer>
  )
}
