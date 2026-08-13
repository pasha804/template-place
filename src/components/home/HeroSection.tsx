import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play, Star } from "lucide-react";

/* ─── Phone configs ─── */
const PHONES = [
  {
    id: "anniversary",
    title: "Happy Anniversary",
    sub: "Together Forever 🥂",
    topEmoji: "💑",
    bg: "linear-gradient(155deg,#1c0b35 0%,#3b0f70 45%,#6b21a8 100%)",
    accent: "#c084fc",
    glowColor: "rgba(192,132,252,0.7)",
    rotate: -12,
    x: -115,
    y: 30,
    scale: 0.82,
    zIndex: 10,
    delay: 0.15,
    hasCountdown: true,
    ctaText: "View Page",
  },
  {
    id: "birthday",
    title: "Happy Birthday",
    sub: "Sarah ❤️",
    topEmoji: "🎂",
    bg: "linear-gradient(155deg,#1a0520 0%,#4a0860 45%,#86198f 100%)",
    accent: "#f472b6",
    glowColor: "rgba(244,114,182,0.8)",
    rotate: -3,
    x: -10,
    y: -20,
    scale: 1,
    zIndex: 30,
    delay: 0,
    hasCountdown: false,
    ctaText: "View Page",
    featured: true,
  },
  {
    id: "proposal",
    title: "Will You Marry Me?",
    sub: "A Special Day 💍",
    topEmoji: "💍",
    bg: "linear-gradient(155deg,#0d1635 0%,#1d3a7a 45%,#1e40af 100%)",
    accent: "#818cf8",
    glowColor: "rgba(129,140,248,0.6)",
    rotate: 9,
    x: 105,
    y: 20,
    scale: 0.86,
    zIndex: 20,
    delay: 0.1,
    hasCountdown: false,
    ctaText: "Yes, I Will! 💍",
  },
];

/* Floating emoji sparkles */
const SPARKLES = [
  { emoji: "😍", top: "12%", left: "6%",  size: 28, delay: 0 },
  { emoji: "💝", top: "14%", right: "7%", size: 26, delay: 0.7 },
  { emoji: "🥰", top: "60%", left: "4%",  size: 30, delay: 1.4 },
  { emoji: "💌", top: "68%", right: "5%", size: 24, delay: 2.1 },
  { emoji: "✨", top: "38%", left: "2%",  size: 18, delay: 0.4 },
  { emoji: "🌟", top: "45%", right: "3%", size: 18, delay: 1.1 },
];

/* ─── Single phone component ─── */
function Phone({ phone }: { phone: typeof PHONES[0] }) {
  const W = 185;
  const H = 370;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: phone.scale * 0.85 }}
      animate={{ opacity: 1, y: 0, scale: phone.scale }}
      transition={{ duration: 1, delay: phone.delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute"
      style={{
        width: W,
        height: H,
        left: "50%",
        top: "50%",
        marginLeft: -W / 2,
        marginTop: -H / 2,
        x: phone.x,
        y: phone.y,
        rotate: phone.rotate,
        zIndex: phone.zIndex,
      }}
    >
      {/* Continuous floating */}
      <motion.div
        animate={{ y: [0, phone.featured ? -14 : -9, 0] }}
        transition={{
          duration: phone.featured ? 3.5 : 4.5 + phone.id.length * 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: phone.delay * 2,
        }}
        style={{ width: W, height: H, perspective: 800 }}
      >
        {/* ── Glow halo behind phone ── */}
        <div
          className="absolute -inset-6 rounded-[48px] blur-2xl"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${phone.glowColor} 0%, transparent 70%)`,
            opacity: phone.featured ? 0.9 : 0.55,
          }}
        />

        {/* ── Phone outer frame ── */}
        <div
          className="relative overflow-hidden"
          style={{
            width: W,
            height: H,
            borderRadius: 36,
            background: "linear-gradient(170deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
            border: `2px solid ${phone.accent}45`,
            boxShadow: [
              `0 0 0 1px rgba(255,255,255,0.06)`,
              `0 30px 80px -20px ${phone.glowColor}`,
              `inset 0 1px 0 rgba(255,255,255,0.15)`,
              `inset 0 -1px 0 rgba(0,0,0,0.3)`,
              phone.featured ? `0 0 60px -10px ${phone.glowColor}` : "",
            ].filter(Boolean).join(", "),
          }}
        >
          {/* Screen */}
          <div
            className="absolute inset-[3px] overflow-hidden"
            style={{ borderRadius: 34, background: phone.bg }}
          >
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1">
              <span className="text-[9px] font-bold text-white/50">9:41</span>
              <div className="flex items-center gap-1">
                {[3,2,3].map((h, i) => (
                  <div key={i} className="w-1 rounded-full bg-white/50" style={{ height: h + 6 }} />
                ))}
                <div className="ml-1 h-2 w-3.5 rounded-sm border border-white/40">
                  <div className="h-full w-2/3 rounded-sm bg-white/60" />
                </div>
              </div>
            </div>

            {/* Notch */}
            <div className="flex justify-center pb-2">
              <div className="h-5 w-20 rounded-b-2xl bg-black/60 flex items-center justify-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-black/80 border border-white/10" />
              </div>
            </div>

            {/* Hero emoji */}
            <div className="flex justify-center pt-1">
              <motion.div
                animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -3, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: phone.delay }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                style={{
                  background: `${phone.accent}20`,
                  border: `1px solid ${phone.accent}35`,
                  boxShadow: `0 0 20px ${phone.accent}40`,
                }}
              >
                {phone.topEmoji}
              </motion.div>
            </div>

            {/* Title + sub */}
            <div className="mt-2.5 px-4 text-center">
              <p className="text-[12px] font-black leading-tight text-white">{phone.title}</p>
              <p className="mt-0.5 text-[10px] font-medium" style={{ color: phone.accent }}>
                {phone.sub}
              </p>
            </div>

            {/* Photo / content area */}
            <div className="mx-4 mt-3 overflow-hidden rounded-2xl"
              style={{
                height: 80,
                background: `linear-gradient(135deg, ${phone.accent}18, ${phone.accent}08)`,
                border: `1px solid ${phone.accent}20`,
              }}
            >
              <div className="flex h-full items-center justify-center gap-2">
                {[0.6, 1, 0.7].map((op, i) => (
                  <div key={i} className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                    style={{ background: `${phone.accent}15`, opacity: op }}>
                    {phone.topEmoji}
                  </div>
                ))}
              </div>
            </div>

            {/* Countdown row (anniversary only) */}
            {phone.hasCountdown && (
              <div className="mx-4 mt-2.5 flex gap-1.5">
                {[["12","DAYS"],["08","HRS"],["45","MIN"],["30","SEC"]].map(([n, l]) => (
                  <div key={l} className="flex flex-1 flex-col items-center rounded-xl py-1.5"
                    style={{ background: `${phone.accent}18`, border: `1px solid ${phone.accent}22` }}>
                    <span className="text-[11px] font-black text-white">{n}</span>
                    <span className="text-[7px] text-white/40">{l}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery strip (non-countdown) */}
            {!phone.hasCountdown && (
              <div className="mx-4 mt-2.5 flex gap-1.5">
                {[1,2,3].map(i => (
                  <div key={i} className="h-10 flex-1 overflow-hidden rounded-xl"
                    style={{ background: `${phone.accent}14`, border: `1px solid ${phone.accent}18` }}>
                    <div className="flex h-full items-center justify-center text-sm opacity-40">
                      {phone.topEmoji}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA button */}
            <div className="mx-4 mt-3">
              <div
                className="rounded-2xl py-2 text-center text-[10px] font-black text-white"
                style={{
                  background: `linear-gradient(90deg, ${phone.accent}, #7c3aed)`,
                  boxShadow: `0 4px 16px ${phone.accent}55`,
                }}
              >
                {phone.ctaText}
              </div>
            </div>

            {/* Bottom home bar */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
              <div className="h-1 w-20 rounded-full bg-white/20" />
            </div>
          </div>
        </div>

        {/* Reflection / shine streak */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[36px]"
          style={{
            background: "linear-gradient(125deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── Hero Section ─── */
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Mouse-tracked 3D tilt for the phone cluster */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), { stiffness: 80, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="relative overflow-hidden pt-14 pb-2 sm:pt-16 sm:pb-3">
      {/* ── Background layers ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Main deep purple center-right glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 90% at 78% 50%, rgba(109,40,217,0.35) 0%, transparent 65%)" }} />
        {/* Pink secondary glow */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 35% 35% at 60% 65%, rgba(236,72,153,0.18) 0%, transparent 60%)" }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center lg:flex-row lg:items-center lg:gap-12">

          {/* ── LEFT ── */}
          <div className="relative z-10 flex-1 py-1 lg:py-2 lg:max-w-[50%]">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-[12px] font-bold text-pink-400">
              <span>✨</span> Create. Personalize. Share.
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl font-black leading-[1.06] text-white sm:text-6xl lg:text-[62px]">
              Create Beautiful
              <br />
              <span style={{
                background: "linear-gradient(90deg,#ec4899 0%,#f97316 45%,#eab308 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}>
                Moments With Our
              </span>
              <br />
              Premium Templates
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-5 max-w-md text-base leading-relaxed text-white/50">
              Build stunning personal websites for your loved ones in minutes.
              Choose a template, customize it your way and share your love.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/templates"
                className="group flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.04]"
                style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", boxShadow: "0 0 32px rgba(236,72,153,0.45)" }}>
                Explore Templates <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button type="button"
                className="flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:bg-white/10 hover:text-white">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                  <Play className="h-3 w-3 fill-white text-white" />
                </div>
                How It Works
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["#ec4899","#8b5cf6","#3b82f6","#10b981"].map((c, i) => (
                  <div key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a0914] text-xs font-black text-white"
                    style={{ background: `linear-gradient(135deg,${c},${c}aa)` }}>
                    {["A","B","C","D"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                  <Star className="h-3.5 w-3.5 text-yellow-400/40 fill-yellow-400/40" />
                  <span className="ml-1 text-xs font-bold text-white/80">4.9/5</span>
                </div>
                <p className="text-[11px] text-white/35">from 8,500+ users</p>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Premium phone cluster ── */}
          <div
            ref={containerRef}
            className="relative hidden flex-1 select-none lg:flex lg:items-center lg:justify-center"
            style={{ height: 460, minWidth: 460 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* ── Outer atmospheric ring glow ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: 480,
                height: 480,
                background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(236,72,153,0.14) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* ── Pulsing ring ── */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20"
              style={{ width: 420, height: 420 }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/15"
              style={{ width: 340, height: 340 }}
              animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* ── Floating emoji sparkles ── */}
            {SPARKLES.map((s) => (
              <motion.div
                key={s.emoji}
                className="absolute z-40 flex items-center justify-center rounded-2xl"
                style={{
                  top: s.top,
                  left: "left" in s ? s.left : undefined,
                  right: "right" in s ? (s as { right: string }).right : undefined,
                  width: s.size + 16,
                  height: s.size + 16,
                  fontSize: s.size,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  rotate: [0, 8, -4, 0],
                }}
                transition={{
                  opacity: { delay: 0.6 + s.delay, duration: 0.4 },
                  scale: { delay: 0.6 + s.delay, duration: 0.4, type: "spring", stiffness: 200 },
                  y: { delay: s.delay, duration: 4 + s.delay, repeat: Infinity, ease: "easeInOut" },
                  rotate: { delay: s.delay, duration: 5 + s.delay, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {s.emoji}
              </motion.div>
            ))}

            {/* ── 3D-tilt phone cluster ── */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative" style={{ width: 185, height: 370 }}>
                {PHONES.map((phone) => (
                  <Phone key={phone.id} phone={phone} />
                ))}
              </div>
            </motion.div>

            {/* ── Floating badge: "50K+ pages created" ── */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[8%] right-[2%] z-50 flex items-center gap-2.5 rounded-2xl border border-white/10 px-3.5 py-2.5 backdrop-blur-xl"
              style={{
                background: "rgba(20,15,40,0.85)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm">🚀</div>
              <div>
                <p className="text-xs font-black text-white">50K+ Pages</p>
                <p className="text-[10px] text-white/40">created this month</p>
              </div>
            </motion.div>

            {/* ── Floating badge: "❤️ Just shared" ── */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[14%] left-[1%] z-50 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 backdrop-blur-xl"
              style={{
                background: "rgba(20,15,40,0.85)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-lg">❤️</span>
              <div>
                <p className="text-[11px] font-bold text-white">Just shared!</p>
                <p className="text-[10px] text-white/40">Birthday page · 2s ago</p>
              </div>
            </motion.div>

            {/* ── Floating badge: "✅ Paid" ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 200 }}
              className="absolute bottom-[30%] right-[3%] z-50 flex items-center gap-2 rounded-xl border border-emerald-500/25 px-3 py-1.5 backdrop-blur-xl"
              style={{
                background: "rgba(16,185,129,0.12)",
                boxShadow: "0 4px 20px rgba(16,185,129,0.2)",
              }}
            >
              <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <p className="text-[11px] font-bold text-emerald-400">Premium Unlocked</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
