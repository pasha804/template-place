"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"

export default function Screen2({ onNext }) {
    const [floatingItems, setFloatingItems] = useState([])
    const [stars, setStars] = useState([])

    useEffect(() => {
        const w = window.innerWidth
        const icons = [Heart, Sparkles]
        const colors = ["text-red-400", "text-pink-300"]

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
            className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden gap-8"
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3, type: "spring", stiffness: 80 }}
                className="relative z-10"
            >
                <motion.div
                    animate={{ boxShadow: ["0 0 20px rgba(239,68,68,0.4)", "0 0 50px rgba(236,72,153,0.6)", "0 0 20px rgba(239,68,68,0.4)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="rounded-full p-1 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500"
                >
                    <div className="rounded-full overflow-hidden w-36 h-36 md:w-44 md:h-44 bg-black/40">
                        <img loading="lazy" src="/templates/sorry-sweet/gifs/2.gif" className="w-full h-full object-cover" alt="blushing" />
                    </div>
                </motion.div>
            </motion.div>

            {/* ── Heading ── */}
            <motion.div className="text-center z-10 space-y-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white leading-tight"
                    style={{ textShadow: "0 0 20px rgba(236,72,153,0.5), 0 0 40px rgba(239,68,68,0.2)" }}
                >
                    Ready to see what&apos;s in my heart? 💕
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1.2 }}
                    className="text-xl md:text-2xl text-pink-100/70 font-light italic"
                >
                    bas thoda sa courage karke... 🥺
                </motion.p>
            </motion.div>

            {/* ── Button ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="z-10 pb-4"
            >
                <motion.button
                    onClick={onNext}
                    animate={{ boxShadow: ["0 0 20px rgba(239,68,68,0.4)", "0 0 40px rgba(236,72,153,0.7)", "0 0 20px rgba(239,68,68,0.4)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white font-semibold py-4 px-14 rounded-full text-xl flex items-center gap-3"
                >
                    Show Me <Heart size={20} className="fill-white mb-0.5" />
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
