"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Screen1({ onNext, personName }) {
    const name = personName || "Jana"
    const [floatingItems, setFloatingItems] = useState([])
    const [stars, setStars] = useState([])

    useEffect(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        const icons = [Heart, Sparkles]
        const colors = ["text-pink-400", "text-purple-300"]

        setFloatingItems(
            Array.from({ length: 15 }).map((_, i) => ({
                x: Math.random() * w,
                delay: Math.random() * 8,
                duration: Math.random() * 5 + 7,
                Icon: icons[i % icons.length],
                color: colors[i % colors.length],
            }))
        )
        setStars(
            Array.from({ length: 20 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: Math.random() * 3,
                duration: Math.random() * 3 + 2,
            }))
        )
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden gap-6"
        >
            {/* ── Background particles ── */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {floatingItems.map(({ x, delay, duration, Icon, color }, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ x, y: window.innerHeight + 50, opacity: 0 }}
                        animate={{
                            y: -100,
                            x: x + (Math.random() - 0.5) * 120,
                            rotate: [0, 360],
                            opacity: [0, 0.35, 0],
                        }}
                        transition={{ duration, delay, repeat: Infinity, ease: "easeOut" }}
                    >
                        <Icon className={`${color} w-4 h-4 fill-current`} />
                    </motion.div>
                ))}
                {stars.map(({ left, top, delay, duration }, i) => (
                    <motion.div
                        key={`s-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left, top }}
                        animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
                        transition={{ duration, delay, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* ── GIF in glowing circle ── */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 80 }}
                className="relative z-10 flex items-center justify-center"
            >
                {/* Glow ring */}
                <motion.div
                    animate={{ boxShadow: ["0 0 20px rgba(236,72,153,0.4)", "0 0 50px rgba(168,85,247,0.6)", "0 0 20px rgba(236,72,153,0.4)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full p-1 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-400"
                >
                    <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 bg-black/40">
                        <img loading="lazy" src="/templates/sorry-sweet/gifs/1.gif" className="w-full h-full object-cover" alt="waving" />
                    </div>
                </motion.div>
            </motion.div>

            {/* ── "hey... 🤍" small text ── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-pink-200/70 text-lg md:text-xl italic z-10"
            >
                hey... 🤍
            </motion.p>

            {/* ── Main heading ── */}
            <motion.div className="text-center z-10 space-y-3">
                {/* name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, type: "spring", stiffness: 90 }}
                    className="text-5xl md:text-7xl font-bold text-white leading-tight"
                    style={{ textShadow: "0 0 20px rgba(236,72,153,0.5), 0 0 40px rgba(168,85,247,0.3)" }}
                >
                    {name},
                </motion.h1>

                {/* "mera bachawww..." shimmer */}
                <motion.h1
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, delay: 1.5, type: "spring", stiffness: 80 }}
                    className="text-4xl md:text-6xl font-bold leading-tight"
                    style={{
                        background: "linear-gradient(90deg, #f9a8d4, #c084fc, #f9a8d4, #c084fc)",
                        backgroundSize: "300% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        animation: "shimmer 3s linear infinite",
                    }}
                >
                    mera bachawww... ❤️
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.0 }}
                    className="text-xl md:text-2xl text-pink-100/80 font-light italic"
                >
                    I made something just for you ✨
                </motion.p>
            </motion.div>

            {/* ── Button ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
                className="z-10 pb-4"
            >
                <motion.button
                    onClick={onNext}
                    animate={{ boxShadow: ["0 0 20px rgba(236,72,153,0.4)", "0 0 40px rgba(236,72,153,0.7)", "0 0 20px rgba(236,72,153,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold py-4 px-14 rounded-full text-xl flex items-center gap-3"
                >
                    Open it <Heart size={20} className="fill-white mb-0.5" />
                </motion.button>
            </motion.div>

            {/* shimmer keyframe */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% center; }
                    100% { background-position: 300% center; }
                }
            `}</style>
        </motion.div>
    )
}
