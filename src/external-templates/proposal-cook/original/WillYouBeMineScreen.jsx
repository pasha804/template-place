"use client"

import { motion } from "framer-motion"
import { yesBurst } from "./lib/fireworks"
import PremiumBackground from "./PremiumBackground"

export default function WillYouBeMineScreen({ onYes }) {
    const question = "Jana, will you be mine?"
    const words = question.split(" ")

    const handleNo = async () => {
        await console.log({
            title: "Are you sure, Jana? 💔",
            text: "Please reconsider, I mean it with all my heart...",
            imageUrl: "/templates/proposal-cook/gif/sadge.gif",
            imageAlt: "Sad gif",
            imageWidth: 150,
            background: "linear-gradient(135deg, #0d0008, #110008)",
            color: "#FFEDFF",
            timer: 3000,
            showConfirmButton: false,
        })
    }

    const handleYes = () => {
        yesBurst()
        setTimeout(() => { onYes() }, 500)
    }

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
        >
            <PremiumBackground particleCount={25} extraBright={true} />

            {/* Enhanced Foreground Floating Hearts with more variety */}
            <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                {["💘","✨","💕","🌹","💖","💫","💗","💝"].map((emoji, i) => (
                    <motion.div
                        key={`fg-heart-${i}`}
                        className="absolute text-xl select-none"
                        style={{
                            left: `${8 + (i * 12) % 80}%`,
                            bottom: "-8%",
                            opacity: 0.1 + (i % 4) * 0.06,
                            filter: "blur(1px) drop-shadow(0 0 15px rgba(236,72,153,0.5))",
                        }}
                        animate={{
                            y: ["0vh", "-120vh"],
                            rotate: [0, i % 2 === 0 ? 360 : -360],
                            scale: [1, 1.3, 0.7],
                        }}
                        transition={{
                            duration: 12 + (i % 6) * 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: i * 1.2,
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}
            </div>

            {/* Dynamic ambient light with pulsing effect - gold/rose tint for this special moment */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-15"
                style={{
                    background: "radial-gradient(circle at 50% 50%, rgba(251,191,36,0.1) 0%, transparent 65%)",
                    filter: "blur(90px)"
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                }}
            />

            <motion.div 
                className="glass-card relative z-30 w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-10 md:p-16 rounded-[50px]"
                initial={{ y: 60, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 120, damping: 18 }}
            >
                {/* Enhanced inner glow with multiple layers - gold/rose tint */}
                <div className="absolute inset-0 rounded-[50px] pointer-events-none border border-white/25" style={{ boxShadow: "inset 0 0 60px rgba(251,191,36,0.18)" }} />
                <div className="absolute -top-28 -right-28 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(251,191,36,0.18)", filter: "blur(70px)" }} />
                <div className="absolute -bottom-28 -left-28 w-56 h-56 rounded-full pointer-events-none" style={{ background: "rgba(225,29,72,0.15)", filter: "blur(70px)" }} />

                <motion.div
                    className="mb-12 flex items-center justify-center relative z-10"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.3 }}
                >
                    {/* Multiple outer glowing aura layers - 3 layers */}
                    <>
                    {[250, 210, 170].map((size, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                width: size, height: size,
                                background: `radial-gradient(circle, rgba(251,191,36,${0.18 - i * 0.04}) 0%, transparent 70%)`,
                                filter: "blur(20px)",
                            }}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 4 + i * 0.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: i * 0.35 }}
                        />
                    ))}
                    </>

                    <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-br from-yellow-500/30 to-rose-500/30 flex items-center justify-center border-3 border-yellow-400/60 relative z-10 shadow-[0_0_40px_rgba(251,191,36,0.4),_0_0_80px_rgba(236,72,153,0.2)] backdrop-blur-sm">
                        <motion.div 
                            animate={{ rotate: [0, 12, -12, 0] }} 
                            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        >
                            <img src="/templates/proposal-cook/gif/heppi.gif" className="w-24 h-24 object-contain drop-shadow-2xl" alt="cute bear" loading="lazy" />
                        </motion.div>
                    </div>

                    {/* Enhanced orbiting elements around the gif - 3 elements */}
                    {["💘", "✨", "🌹"].map((emoji, i) => {
                        const angle = (i * 120) * (Math.PI / 180)
                        const radius = 75
                        return (
                            <motion.div
                                key={i}
                                className="absolute text-xl select-none pointer-events-none"
                                style={{ 
                                    left: "50%", 
                                    top: "50%",
                                    transform: `translate(${radius * Math.cos(angle) - 14}px, ${radius * Math.sin(angle) - 14}px)` 
                                }}
                                animate={{ 
                                    scale: [1, 1.4, 1], 
                                    opacity: [0.3, 0.9, 0.3],
                                    rotate: [0, 120, 240]
                                }}
                                transition={{ 
                                    duration: 2.5 + i * 0.4, 
                                    repeat: Number.POSITIVE_INFINITY, 
                                    delay: i * 0.3 
                                }}
                            >
                                {emoji}
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Enhanced Question text (Word-by-word reveal) - dramatically larger */}
                <div className="mb-14 flex flex-wrap justify-center gap-x-4 gap-y-3 relative z-10">
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            className="gradient-text text-4xl md:text-5xl font-bold leading-tight"
                            style={{ 
                                fontFamily: "'Shantell Sans', cursive", 
                                letterSpacing: "-0.02em",
                                textShadow: "0 0 30px rgba(251,191,36,0.35)",
                                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.3))",
                            }}
                            initial={{ opacity: 0, y: 30, filter: "blur(15px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.6 + i * 0.12, duration: 0.75, type: "spring", damping: 10 }}
                        >
                            {word}
                        </motion.span>
                    ))}
                    <motion.span
                        className="text-6xl md:text-8xl font-bold leading-tight"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2, type: "spring", damping: 10 }}
                    >
                        🥺
                    </motion.span>
                </div>

                {/* Enhanced Decorative divider - gold gradient */}
                <motion.div
                    className="w-36 h-1 mb-14 rounded-full relative z-10"
                    style={{ 
                        background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.9), transparent)" 
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 0.9 }}
                />

                {/* Subtitle - more emotional */}
                <motion.p
                    className="text-yellow-100/90 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-center relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    Jana, life is a beautiful journey — and I want to share every single second of it with you. Forever starts with this moment. 💕
                </motion.p>

                {/* Maximally Enhanced Answer buttons */}
                <motion.div
                    className="flex flex-wrap gap-8 justify-center items-center relative z-10"
                    initial={{ opacity: 0, y: 55 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.85 }}
                >
                    <motion.button
                        onClick={handleYes}
                        whileHover={{ scale: 1.08, boxShadow: "0 0 45px rgba(251,191,36,0.7), 0 0 80px rgba(236,72,153,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-6 rounded-full font-bold text-2xl transition-all duration-300 border-2 border-yellow-400/70"
                        style={{ 
                            background: "linear-gradient(135deg, rgba(251,191,36,0.95), rgba(236,72,153,0.95))", 
                            color: "white",
                            boxShadow: "0 0 30px rgba(251,191,36,0.6)"
                        }}
                    >
                        YES! 💕
                    </motion.button>

                    <motion.button
                        onClick={handleNo}
                        whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.18)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-14 py-6 rounded-full font-bold text-2xl transition-all duration-300 border-2 border-white/35 backdrop-blur-md"
                        style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)" }}
                    >
                        No 😔
                    </motion.button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}
