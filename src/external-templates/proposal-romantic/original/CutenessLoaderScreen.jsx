"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { AlertTriangle } from "lucide-react"

export default function CutenessLoaderScreen({ onComplete }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const duration = 3000 // 3 seconds total
        const intervalTime = 30
        const steps = duration / intervalTime
        const increment = 120 / steps // Target 120%

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment
                if (next >= 120) {
                    clearInterval(timer)
                    return 120
                }
                return next
            })
        }, intervalTime)

        const completeTimer = setTimeout(() => {
            onComplete()
        }, duration + 500) // Small buffer after finishing

        return () => {
            clearInterval(timer)
            clearTimeout(completeTimer)
        }
    }, [onComplete])

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center px-4 relative z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-none" />

            <div className="glass-card relative z-30 w-full max-w-md mx-auto flex flex-col items-center text-center p-8 md:p-12 rounded-[40px] shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 30px rgba(236,72,153,0.15)" }} />

                {/* Title */}
                <h2 className="text-pink-200/90 text-xl md:text-2xl font-medium mb-6">
                    Measuring your cuteness...
                </h2>

                {/* Percentage */}
                <div className="text-6xl md:text-7xl font-bold text-pink-400 mb-8" style={{ fontFamily: "monospace" }}>
                    {Math.round(progress)}%
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-6 bg-pink-900/30 rounded-full mb-8 overflow-hidden relative">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-400 to-rose-500 shadow-[0_0_15px_rgba(244,114,182,0.6)]"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                {/* Warning Message */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: progress > 100 ? 1 : 0, y: progress > 100 ? 0 : 10 }}
                    className="flex items-center justify-center gap-2 text-yellow-400 font-semibold tracking-wide"
                >
                    <AlertTriangle className="w-5 h-5" />
                    TOO CUTE TO HANDLE
                </motion.div>

            </div>
        </motion.div>
    )
}
