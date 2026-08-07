// @ts-nocheck
import { motion } from "framer-motion"
import { Link } from "@tanstack/react-router"
import {
  Music, Image, Lock, Timer, Globe, Smartphone,
  Palette, BarChart2, Sparkles, Heart, Crown, ArrowRight,
  Eye, Zap, Box, Layers, Film, Wand2
} from "lucide-react"

const features = [
  {
    icon: Music,
    title: "Background Music",
    desc: "Upload your custom track or choose ambient vinyl audio that plays seamlessly on open.",
    gradient: "from-violet-500 to-purple-600",
    bg: "rgba(139,92,246,0.10)",
    border: "rgba(139,92,246,0.20)",
  },
  {
    icon: Image,
    title: "Photo Gallery",
    desc: "Interactive masonry grids with full-screen lightbox modal and pinch-zoom.",
    gradient: "from-pink-500 to-rose-500",
    bg: "rgba(236,72,153,0.10)",
    border: "rgba(236,72,153,0.20)",
  },
  {
    icon: Lock,
    title: "PIN & Vault Protection",
    desc: "Lock secret messages with custom PIN codes or interactive 3D keypads.",
    gradient: "from-emerald-400 to-teal-500",
    bg: "rgba(52,211,153,0.10)",
    border: "rgba(52,211,153,0.20)",
  },
  {
    icon: Timer,
    title: "Live Countdown",
    desc: "Real-time date counters for upcoming weddings, birthdays, and anniversaries.",
    gradient: "from-amber-400 to-orange-500",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.20)",
  },
  {
    icon: Globe,
    title: "Custom Shareable URLs",
    desc: "Personalized clean links like /p/zara-rayan-wedding or /p/birthday-queen.",
    gradient: "from-cyan-400 to-sky-500",
    bg: "rgba(34,211,238,0.10)",
    border: "rgba(34,211,238,0.20)",
  },
  {
    icon: Smartphone,
    title: "Mobile First & Responsive",
    desc: "Flawless rendering on mobile, tablet, and desktop with zero horizontal overflow.",
    gradient: "from-fuchsia-500 to-pink-600",
    bg: "rgba(217,70,239,0.10)",
    border: "rgba(217,70,239,0.20)",
  },
  {
    icon: Palette,
    title: "Full Customization",
    desc: "Live sync editor for text, names, dates, colors, stories, and image galleries.",
    gradient: "from-violet-500 to-indigo-600",
    bg: "rgba(99,102,241,0.10)",
    border: "rgba(99,102,241,0.20)",
  },
  {
    icon: BarChart2,
    title: "Real-time Visitor Analytics",
    desc: "Track view counts, device types, and geographic location statistics.",
    gradient: "from-green-400 to-emerald-500",
    bg: "rgba(74,222,128,0.10)",
    border: "rgba(74,222,128,0.20)",
  },
  {
    icon: Sparkles,
    title: "Awwwards-Grade Effects",
    desc: "Confetti cannons, floating rose petals, glowing cursors, and 3D spring tilt cards.",
    gradient: "from-rose-400 to-pink-500",
    bg: "rgba(251,113,133,0.10)",
    border: "rgba(251,113,133,0.20)",
  },
]

const showcaseCards = [
  {
    category: "Wedding",
    title: "Wedding Eternal & Petals",
    subtitle: "Luxury & Glassmorphism Experience",
    tags: ["Luxury", "Glassmorphism", "Cinematic", "Modern", "Premium"],
    badge: "Most Popular",
    badgeColor: "from-amber-400 to-pink-500",
    gradient: "from-amber-500/20 via-pink-500/10 to-purple-900/30",
    borderColor: "rgba(251, 191, 36, 0.35)",
    icon: Crown,
    highlights: [
      "Royal navy & gold-gradient typography",
      "Falling rose petals & ambient cursor glow",
      "Chapter-by-chapter story timeline & countdown",
      "Interactive WhatsApp RSVP & guest registry",
    ],
    slug: "wedding-eternal",
  },
  {
    category: "Birthday",
    title: "Birthday Surprise & Aurora",
    subtitle: "3D & Interactive Party Showcase",
    tags: ["3D", "Interactive", "Animated", "Modern", "Glassmorphism"],
    badge: "Awwwards Quality",
    badgeColor: "from-pink-500 to-violet-600",
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-indigo-900/30",
    borderColor: "rgba(217, 70, 239, 0.35)",
    icon: Sparkles,
    highlights: [
      "Interactive 3D vault keypad lock",
      "Confetti burst animations & gift reveals",
      "Custom music player with lyrics display",
      "Dynamic birthday memory timeline",
    ],
    slug: "birthday-surprise",
  },
  {
    category: "Anniversary",
    title: "Anniversary Galaxy & Romantic",
    subtitle: "Minimal & Cinematic Starfield",
    tags: ["Minimal", "Cinematic", "Interactive", "Luxury", "Premium"],
    badge: "Staff Pick",
    badgeColor: "from-cyan-400 to-blue-600",
    gradient: "from-cyan-500/20 via-blue-500/10 to-slate-900/30",
    borderColor: "rgba(34, 211, 238, 0.35)",
    icon: Heart,
    highlights: [
      "Dynamic 3D canvas particle starfield",
      "Interactive glowing love letter modal",
      "Interactive memory timeline with audio",
      "Romantic quote & milestone counter",
    ],
    slug: "anniversary-galaxy",
  },
  {
    category: "Congratulations",
    title: "Congratulations Triumph",
    subtitle: "Cinematic 3D & Audio Celebration",
    tags: ["Cinematic", "3D", "Animated", "Interactive", "Awwwards-quality"],
    badge: "New Release",
    badgeColor: "from-emerald-400 to-teal-600",
    gradient: "from-emerald-500/20 via-teal-500/10 to-zinc-900/30",
    borderColor: "rgba(52, 211, 153, 0.35)",
    icon: Film,
    highlights: [
      "Interactive 3D envelope spring reveal",
      "Rotating vinyl record player with controls",
      "Particle orbit background with responsive scaling",
      "Achievement timeline & celebration reward card",
    ],
    slug: "congratulations-triumph",
  },
]

function resolveGradientColors(gradient: string): [string, string] {
  const colorMap: Record<string, string> = {
    "violet-500": "#8b5cf6", "purple-600": "#9333ea",
    "pink-500": "#ec4899", "rose-500": "#f43f5e",
    "emerald-400": "#34d399", "teal-500": "#14b8a6",
    "amber-400": "#fbbf24", "orange-500": "#f97316",
    "cyan-400": "#22d3ee", "sky-500": "#0ea5e9",
    "fuchsia-500": "#d946ef", "pink-600": "#db2777",
    "indigo-600": "#4f46e5", "green-400": "#4ade80",
    "emerald-500": "#10b981", "rose-400": "#fb7185",
  }
  const [from, to] = gradient.replace("from-", "").split(" to-")
  return [colorMap[from.trim()] ?? "#a78bfa", colorMap[to.trim()] ?? "#f472b6"]
}

export function FeaturesShowcase() {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 10% 50%, rgba(124,58,237,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 90% 50%, rgba(244,114,182,0.11) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary tracking-wide uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" /> Premium Platform Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold sm:text-6xl tracking-tight"
          >
            Crafted for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #f472b6, #38bdf8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Extraordinary
            </span>{" "}
            Moments
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            Every template is built with Awwwards-level fidelity, interactive animations, and flawless mobile responsiveness.
          </motion.p>
        </div>

        {/* ── PREMIUM TEMPLATE SHOWCASE CARDS ── */}
        <div className="mb-24">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" /> Premium Template Showcase
              </h3>
              <p className="text-sm text-white/50">Explore signature themes designed for every celebration</p>
            </div>
            <Link
              to="/templates"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              View All 16 Templates <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {showcaseCards.map((card, idx) => {
              const IconComp = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border p-7 transition-all duration-500"
                  style={{
                    background: `linear-gradient(145deg, rgba(20, 18, 42, 0.85), rgba(12, 10, 28, 0.95))`,
                    borderColor: card.borderColor,
                    boxShadow: "0 20px 50px -20px rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {/* Subtle background glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-100`}
                    aria-hidden
                  />

                  {/* Header & Badge */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur shadow-lg">
                        <IconComp className="h-6 w-6 text-pink-400" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-violet-400">
                          {card.category}
                        </span>
                        <h4 className="text-xl font-extrabold text-white">{card.title}</h4>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${card.badgeColor} px-3 py-1 text-[10px] font-bold text-white shadow-md`}
                    >
                      <Sparkles className="h-3 w-3" />
                      {card.badge}
                    </span>
                  </div>

                  <p className="relative z-10 mt-3 text-xs font-medium text-white/60">
                    {card.subtitle}
                  </p>

                  {/* Highlights list */}
                  <ul className="relative z-10 mt-5 space-y-2">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-white/75">
                        <Zap className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="relative z-10 mt-6 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/70 backdrop-blur"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action */}
                  <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-[11px] text-white/40">Ready to customize</span>
                    <Link
                      to="/templates"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 group-hover:text-pink-300 transition-colors"
                    >
                      Explore Theme <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ── CORE PLATFORM FEATURES GRID ── */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-white">Platform Features &amp; Controls</h3>
          <p className="text-sm text-white/40 mt-1">Built to give you total creative freedom with zero coding</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const [c1, c2] = resolveGradientColors(f.gradient)
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -5, transition: { duration: 0.22 } }}
                className="group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300"
                style={{
                  background: f.bg,
                  borderColor: "var(--glass-border)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = f.border
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px -12px ${c1}55`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = ""
                  ;(e.currentTarget as HTMLElement).style.boxShadow = ""
                }}
              >
                {/* Icon */}
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${c1}, ${c2})`,
                    boxShadow: `0 6px 20px -6px ${c1}66`,
                  }}
                >
                  <f.icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>

                {/* Subtle corner glow */}
                <div
                  className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: `radial-gradient(circle, ${c1}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
