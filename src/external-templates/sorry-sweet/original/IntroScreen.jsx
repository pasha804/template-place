"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"

const STARS = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 37.3 + 11) % 100}%`,
    top:  `${(i * 53.7 + 7)  % 100}%`,
    size: i % 3 === 0 ? 2.5 : i % 3 === 1 ? 1.5 : 1,
    delay: (i * 0.31) % 5,
    dur: 2.5 + (i % 4) * 0.8,
}))

const ORBS = [
    { x: "15%", y: "20%", r: 180, c: "rgba(168,85,247,0.18)", dur: 7,  delay: 0   },
    { x: "80%", y: "65%", r: 200, c: "rgba(236,72,153,0.16)", dur: 9,  delay: 0.5 },
    { x: "50%", y: "50%", r: 300, c: "rgba(139,92,246,0.10)", dur: 12, delay: 1   },
    { x: "8%",  y: "75%", r: 140, c: "rgba(236,72,153,0.12)", dur: 8,  delay: 0.3 },
    { x: "88%", y: "18%", r: 160, c: "rgba(168,85,247,0.14)", dur: 10, delay: 0.7 },
]

const PETALS = [
    { e: "🌸", l: "8%",  dur: 14, delay: 0   },
    { e: "💕", l: "18%", dur: 18, delay: 2.5 },
    { e: "✨", l: "30%", dur: 12, delay: 1   },
    { e: "🌹", l: "42%", dur: 16, delay: 4   },
    { e: "💫", l: "55%", dur: 11, delay: 0.5 },
    { e: "🌸", l: "68%", dur: 17, delay: 3   },
    { e: "💕", l: "78%", dur: 13, delay: 1.8 },
    { e: "✨", l: "88%", dur: 15, delay: 5   },
    { e: "🌹", l: "95%", dur: 12, delay: 2   },
    { e: "💫", l: "4%",  dur: 19, delay: 6   },
]

export default function IntroScreen({ onEnter }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    const startY = mounted ? window.innerHeight + 60 : 900
    const endY   = mounted ? -(window.innerHeight + 80) : -900

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
            {/* ── Background layer (always visible) ── */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

                {/* Colour orbs */}
                {ORBS.map((o, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: o.x, top: o.y,
                            width: o.r * 2, height: o.r * 2,
                            transform: "translate(-50%, -50%)",
                            background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)`,
                        }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
                        transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                ))}

                {/* Stars */}
                {STARS.map((s) => (
                    <motion.div
                        key={s.id}
                        className="absolute rounded-full bg-white"
                        style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.85, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: s.dur, delay: s.delay, repeat: Infinity }}
                    />
                ))}

                {/* Petals */}
                {mounted && PETALS.map((p, i) => (
                    <motion.span
                        key={i}
                        className="absolute text-xl select-none"
                        style={{ left: p.l }}
                        initial={{ y: startY, opacity: 0 }}
                        animate={{ y: endY, opacity: [0, 0.65, 0.65, 0] }}
                        transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
                    >
                        {p.e}
                    </motion.span>
                ))}

                {/* Light streaks */}
                {[12, 38, 62, 84].map((top, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-px left-0 right-0"
                        style={{
                            top: `${top}%`,
                            background: `linear-gradient(90deg, transparent, rgba(236,72,153,${0.07 + i * 0.015}), rgba(168,85,247,${0.06 + i * 0.015}), transparent)`,
                        }}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1.6, delay: 0.4 + i * 0.15 }}
                    />
                ))}
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center gap-6 w-full max-w-md">

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 }}
                    className="text-xs uppercase text-pink-300/60 tracking-[0.22em] font-light"
                >
                    sirf tumhare liye ✦
                </motion.p>

                {/* Heading with glow */}
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8, type: "spring", stiffness: 60, damping: 14 }}
                    className="space-y-2"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Glow bloom behind title */}
                        <div
                            className="absolute rounded-full blur-3xl"
                            style={{
                                width: 260, height: 120,
                                background: "radial-gradient(ellipse, rgba(236,72,153,0.4) 0%, transparent 70%)",
                            }}
                        />
                        <motion.h1
                            className="relative font-bold"
                            style={{
                                fontSize: "clamp(3.5rem, 15vw, 6rem)",
                                background: "linear-gradient(90deg, #fde68a, #f9a8d4, #c084fc, #f9a8d4, #fde68a)",
                                backgroundSize: "300% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                lineHeight: 1.1,
                                animation: "introShimmer 4s linear infinite",
                            }}
                        >
                            Jana
                        </motion.h1>
                    </div>

                    {/* Bouncing hearts */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                        className="flex items-center justify-center gap-3"
                    >
                        {["💖", "💝", "💖"].map((h, i) => (
                            <motion.span
                                key={i}
                                className="text-2xl"
                                animate={{ scale: [1, 1.3, 1], y: [0, -5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                            >
                                {h}
                            </motion.span>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.4 }}
                    className="space-y-2"
                >
                    <p
                        className="text-2xl md:text-3xl font-light italic"
                        style={{
                            color: "rgba(255,255,255,0.85)",
                            textShadow: "0 0 30px rgba(236,72,153,0.55), 0 0 60px rgba(168,85,247,0.25)",
                        }}
                    >
                        Mujhe maaf kar do...
                    </p>
                    <p className="text-sm md:text-base text-pink-200/55 italic font-light px-2">
                        Ek dil se bana hua surprise hai tumhare liye 🌸
                    </p>

                    {/* Decorative divider */}
                    <motion.div
                        className="flex items-center justify-center gap-2 pt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.7 }}
                    >
                        <div className="h-px w-14" style={{ background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.5))" }} />
                        {["✦", "✦", "✦"].map((d, i) => (
                            <motion.span
                                key={i}
                                className="text-xs"
                                style={{ color: i === 1 ? "rgba(168,85,247,0.7)" : "rgba(236,72,153,0.7)" }}
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
                            >{d}</motion.span>
                        ))}
                        <div className="h-px w-14" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.5), transparent)" }} />
                    </motion.div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.9, delay: 2.2, type: "spring", stiffness: 65, damping: 14 }}
                    className="flex flex-col items-center gap-2 mt-1"
                >
                    <motion.button
                        onClick={onEnter}
                        whileHover={{ scale: 1.07, y: -2 }}
                        whileTap={{ scale: 0.93 }}
                        animate={{
                            boxShadow: [
                                "0 0 22px rgba(236,72,153,0.45), 0 8px 30px rgba(168,85,247,0.25)",
                                "0 0 52px rgba(236,72,153,0.75), 0 8px 50px rgba(168,85,247,0.5)",
                                "0 0 22px rgba(236,72,153,0.45), 0 8px 30px rgba(168,85,247,0.25)",
                            ],
                        }}
                        transition={{ duration: 2.8, repeat: Infinity }}
                        className="relative overflow-hidden flex items-center gap-3 text-white font-bold text-xl py-5 px-14 rounded-full"
                        style={{ background: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #ec4899 100%)" }}
                    >
                        {/* Shimmer sweep */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                        />
                        <motion.span
                            animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity }}
                        >
                            <Heart size={22} className="fill-white" />
                        </motion.span>
                        Kholo mujhe... 💕
                    </motion.button>

                    <p className="text-white/25 text-xs italic">music bhi chalegi ✨</p>
                </motion.div>
            </div>

            <style>{`
                @keyframes introShimmer {
                    0%   { background-position: 0% center;   }
                    100% { background-position: 300% center; }
                }
            `}</style>
        </motion.div>
    )
}
