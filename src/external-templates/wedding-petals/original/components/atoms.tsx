// @ts-nocheck
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"

export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  )
}

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 8 + ((i * 13) % 14),
        duration: 14 + ((i * 7) % 13),
        delay: (i * 1.7) % 16,
        drift: ((i % 5) - 2) * 60,
        hue: i % 3,
      })),
    [count]
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="animate-petal absolute top-0 block"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.72,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            borderRadius: "80% 10% 80% 10%",
            background:
              p.hue === 0
                ? "oklch(0.83 0.07 20 / 0.75)"
                : p.hue === 1
                  ? "oklch(0.74 0.13 52 / 0.6)"
                  : "oklch(0.9 0.05 350 / 0.5)",
          }}
        />
      ))}
    </div>
  )
}

export function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker?: string
  title: string
  sub?: string
}) {
  return (
    <Reveal className="text-center">
      {kicker && (
        <p className="text-[0.68rem] tracking-[0.55em] uppercase text-copper/80">{kicker}</p>
      )}
      <h2 className="mt-3 text-4xl font-light md:text-6xl">
        <span className="text-copper-gradient animate-shimmer">{title}</span>
      </h2>
      <div className="hairline mx-auto mt-5 h-px w-40" />
      {sub && <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">{sub}</p>}
    </Reveal>
  )
}

export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-copper/70">
      <span className="hairline h-px w-16" />
      <svg width="16" height="16" viewBox="0 0 24 24" className="animate-float-slow">
        <path
          d="M12 21s-8-5.2-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 15.8 12 21 12 21z"
          fill="currentColor"
        />
      </svg>
      <span className="hairline h-px w-16" />
    </div>
  )
}
