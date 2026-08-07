"use client"

import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import PremiumBackground from "./PremiumBackground"

export default function WillYouBeMineScreen({ onYes }) {
    const question = "Will you be mine?"
    const words = question.split(" ")

    const handleNo = async () => {
        await console.log({
            title: "Are you sure? 💔",
            text: "Please reconsider...",
            imageUrl: "/templates/proposal-romantic/gif/sadge.gif",
            imageAlt: "Sad gif",
            imageWidth: 150,
            background: "linear-gradient(135deg, #fce7f3, #fecdd3)",
            color: "#881337",
            timer: 3000,
            showConfirmButton: false,
        })
    }

    const handleYes = () => {
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff6b9d', '#c44569', '#f8b500', '#ffa801']
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff6b9d', '#c44569', '#f8b500', '#ffa801']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()

        setTimeout(() => {
            onYes()
        }, 500)
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <PremiumBackground particleCount={40} extraBright={true} />

            {/* ── Foreground Floating Hearts ── */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={`fg-heart-${i}`}
                        className="absolute text-3xl select-none"
                        style={{
                            left: `${15 + (i * 12) % 70}%`,
                            bottom: "-10%",
                            opacity: 0.2 + (i % 3) * 0.1,
                            filter: "blur(1px) drop-shadow(0 0 20px rgba(236,72,153,0.6))",
                        }}
                        animate={{
                            y: ["0vh", "-120vh"],
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                            scale: [1, 1.3, 0.9],
                        }}
                        transition={{
                            duration: 10 + (i % 5) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 1.2,
                        }}
                    >
                        {i % 2 === 0 ? "💘" : "✨"}
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="glass-card relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 50px rgba(236,72,153,0.15)" }} />

                <motion.div
                    className="mb-10 flex items-center justify-center relative z-10"
                    initial={{ scale: 0, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                >
                    {/* Outer glowing aura layer 1 */}
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 240, height: 240,
                            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
                            filter: "blur(20px)",
                        }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-purple-500/20 to-rose-500/20 flex items-center justify-center border-2 border-pink-400/30 relative z-10 shadow-[0_0_50px_rgba(236,72,153,0.4)] backdrop-blur-sm">
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
                            <img src="/templates/proposal-romantic/gif/heppi.gif" className="w-28 h-28 object-contain drop-shadow-2xl mx-auto" alt="cute bear" loading="lazy" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Question text (Word-by-word reveal) */}
                <div className="mb-6 flex flex-wrap justify-center gap-x-3 gap-y-2 relative z-10">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            className="gradient-text text-5xl md:text-7xl font-bold leading-tight"
                            style={{ fontFamily: "'Shantell Sans', cursive", letterSpacing: "-0.02em" }}
                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.6 + i * 0.15, duration: 0.6, type: "spring", damping: 12 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                    <motion.span
                        className="text-5xl md:text-7xl font-bold leading-tight"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring", damping: 10 }}
                    >
                        🥺
                    </motion.span>
                </div>

                {/* Subtitle */}
                <motion.p
                    className="text-pink-100/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Life is an incredible journey, and I want to spend every single second of it with you.
                </motion.p>

                {/* Answer buttons */}
                <motion.div
                    className="flex flex-wrap gap-6 justify-center items-center relative z-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0, duration: 0.8 }}
                >
                    <button
                        onClick={handleYes}
                        className="px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-110 shadow-[0_0_30px_rgba(236,72,153,0.6)] border-2 border-pink-300/50"
                        style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9))", color: "white" }}
                    >
                        YES! 💕
                    </button>

                    <button
                        onClick={handleNo}
                        className="px-12 py-5 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-md"
                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
                    >
                        No...
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
