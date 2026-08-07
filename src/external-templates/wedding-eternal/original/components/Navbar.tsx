// @ts-nocheck
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Our Story", id: "story" },
  { label: "The Couple", id: "couple" },
  { label: "Events", id: "events" },
  { label: "Gallery", id: "gallery" },
  { label: "RSVP", id: "rsvp" },
  { label: "Registry", id: "registry" },
  { label: "Stay", id: "accommodation" },
  { label: "Party", id: "party" },
  { label: "Q&A", id: "faq" },
]

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Navbar({ brideName = "Ayesha", groomName = "Hamza" }: { brideName?: string; groomName?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60))

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav
        aria-label="Main"
        className={`relative border-b transition-all duration-700 ${
          scrolled
            ? "border-gold/25 bg-navy-abyss/75 py-3 backdrop-blur-xl"
            : "border-transparent bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
          <button
            onClick={() => scrollToId("home")}
            className="font-script text-gold-gradient shrink-0 text-2xl sm:text-3xl xl:text-2xl 2xl:text-3xl"
            aria-label={`${brideName} and ${groomName} — back to top`}
          >
            {brideName} &amp; {groomName}
          </button>

          <ul className="hidden items-center gap-4 xl:flex 2xl:gap-6">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToId(l.id)}
                  className="group relative text-[0.7rem] tracking-[0.22em] text-ivory/75 uppercase transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("rsvp")}
              className="hidden rounded-full border border-gold/60 px-5 py-2.5 text-[0.65rem] tracking-[0.2em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-navy-abyss hover:shadow-[0_0_35px_-8px_var(--gold)] sm:block"
            >
              Join Our Celebration
            </button>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative h-10 w-10 xl:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -5 }}
                className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-gold"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-gold"
              />
              <motion.span
                animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 5 }}
                className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-gold"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden border-b border-gold/20 bg-navy-abyss/95 backdrop-blur-xl xl:hidden"
          >
            <ul className="mx-auto grid max-w-[1400px] gap-1 px-5 py-6 sm:px-8">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => {
                      setOpen(false)
                      setTimeout(() => scrollToId(l.id), 120)
                    }}
                    className="w-full border-b border-gold/10 py-3 text-left text-xs tracking-[0.25em] text-ivory/80 uppercase hover:text-gold"
                  >
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-4">
                <button
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => scrollToId("rsvp"), 120)
                  }}
                  className="w-full rounded-full border border-gold/60 py-3 text-[0.65rem] tracking-[0.2em] text-gold uppercase"
                >
                  Join Our Celebration
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
