// @ts-nocheck
import { useEffect, useState } from "react"

const LINKS = [
  ["Home", "#home"],
  ["Story", "#story"],
  ["Couple", "#couple"],
  ["Events", "#events"],
  ["Gallery", "#gallery"],
  ["RSVP", "#rsvp"],
]

export function Nav({ brideName = "Zara", groomName = "Rayan" }: { brideName?: string; groomName?: string }) {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        solid
          ? "border-b border-copper/20 bg-plum-deep/85 py-3 backdrop-blur-md"
          : "border-b border-transparent py-6"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5">
        <a href="#home" className="min-w-0 truncate text-copper-light" style={{ fontFamily: "var(--font-script)", fontSize: "1.5rem" }}>
          {brideName} &amp; {groomName}
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="story-link text-[0.68rem] tracking-[0.28em] uppercase text-foreground/75 transition-colors hover:text-copper-light"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="shrink-0 rounded-full border border-copper/40 p-2 text-copper md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.5" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="animate-[fade-in_.3s_ease-out] mx-5 mt-4 space-y-1 rounded-sm border border-copper/25 bg-plum-deep/95 p-4 md:hidden">
          {LINKS.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-center text-[0.7rem] tracking-[0.3em] uppercase text-foreground/80"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
