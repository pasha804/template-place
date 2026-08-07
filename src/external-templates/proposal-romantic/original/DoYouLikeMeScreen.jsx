"use client"

import { motion } from "framer-motion"
import PremiumBackground from "./PremiumBackground"

export default function DoYouLikeMeScreen({ onYes }) {
    const question = "Do you like me?"
    const words = question.split(" ")

    const handleNo = async () => {
        await console.log({
            title: "Please say yes! 🥺",
            text: "I really like you...",
            imageUrl: "/templates/proposal-romantic/gif/please.gif",
            imageAlt: "Please gif",
            imageWidth: 150,
            background: "linear-gradient(135deg, #1d071b, #3a1638)",
            color: "#FFEDFF",
            timer: 3000,
            showConfirmButton: false,
        })
    }

    const handleYes = () => {
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
            <PremiumBackground particleCount={30} />

            {/* ── Foreground Floating Hearts ── */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={`fg-heart-${i}`}
                        className="absolute text-2xl select-none"
                        style={{
                            left: `${20 + (i * 15) % 60}%`,
                            bottom: "-10%",
                            opacity: 0.15 + (i % 3) * 0.1,
                            filter: "blur(1px) drop-shadow(0 0 15px rgba(236,72,153,0.5))",
                        }}
                        animate={{
                            y: ["0vh", "-120vh"],
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                            scale: [1, 1.2, 0.8],
                        }}
                        transition={{
                            duration: 12 + (i % 5) * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 1.5,
                        }}
                    >
                        {i % 2 === 0 ? "💖" : "✨"}
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
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

                <motion.div
                    className="mb-10 flex items-center justify-center relative z-10"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                >
                    {/* Outer glowing aura layer 1 */}
                    <motion.div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 220, height: 220,
                            background: "radial-gradient(circle, rgba(168,85,247,0.25) 0%, transparent 70%)",
                            filter: "blur(20px)",
                        }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center border-4 border-purple-400/50 shadow-[0_0_40px_rgba(168,85,247,0.4)] backdrop-blur-sm relative z-10">
                        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}>
                            <img src="/templates/proposal-romantic/gif/cute.gif" className="w-24 h-24 object-contain drop-shadow-2xl" alt="cute character" loading="lazy" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Question text (Word-by-word reveal) */}
                <div className="mb-14 flex flex-wrap justify-center gap-x-3 gap-y-2 relative z-10">
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
                </div>

                {/* Answer buttons */}
                <motion.div
                    className="flex flex-wrap gap-6 justify-center items-center relative z-10"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <button
                        onClick={handleYes}
                        className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-pink-400/50"
                        style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.8), rgba(168,85,247,0.8))", color: "white" }}
                    >
                        Yes 💕
                    </button>

                    <button
                        onClick={handleNo}
                        className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-md"
                        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}
                    >
                        No 😔
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
