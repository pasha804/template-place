"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function MessageScreen({ onNext, messageText, birthdayName }) {
    const DEFAULT_MESSAGE =
        `Happy Birthday, ${birthdayName || "Special Person"}! 🎂✨\n\nYou deserve all the happiness, love, and smiles in the world today and always. \n\nYou have this special way of making everything around you brighter. Your smile, your kindness, and the way you make people feel truly cared for is a rare gift. \n\nI hope your day is filled with laughter, surprises, and moments that make your heart happy. \n\nYou're truly one of a kind, and I just want you to know how special you are. \n\nKeep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💖`
    const MESSAGE = messageText || DEFAULT_MESSAGE
    const [displayed, setDisplayed] = useState("")
    const [done, setDone] = useState(false)
    const [showGrandFinale, setShowGrandFinale] = useState(false)
    const [grandPhase, setGrandPhase] = useState(0)
    const indexRef = useRef(0)
    const scrollRef = useRef(null)

    useEffect(() => {
        indexRef.current = 0
        setDisplayed("")

        const interval = setInterval(() => {
            const i = indexRef.current
            if (i < MESSAGE.length) {
                setDisplayed(MESSAGE.slice(0, i + 1))
                indexRef.current = i + 1
            } else {
                clearInterval(interval)
                setDone(true)
            }
        }, TYPING_SPEED)

        return () => clearInterval(interval)
    }, [])

    const autoScroll = useCallback(() => {
        const el = scrollRef.current
        if (el) {
            requestAnimationFrame(() => {
                el.scrollTop = el.scrollHeight
            })
        }
    }, [])

    useEffect(() => {
        autoScroll()
    }, [displayed, autoScroll])

    useEffect(() => {
        if (!done) return

        const t1 = setTimeout(() => setShowGrandFinale(true), GRAND_PAUSE)
        return () => clearTimeout(t1)
    }, [done])

    useEffect(() => {
        if (!showGrandFinale) return

        const w = typeof window !== "undefined" ? window.innerWidth : 400
        const h = typeof window !== "undefined" ? window.innerHeight : 800
        const cx = 0.5
        const cy = 0.5

        const ph1 = setTimeout(() => {
            setGrandPhase(1)
            fireBurst(cx, cy, 80)
            for (let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2
                const r = 0.35
                setTimeout(() => {
                    fireBurst(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 30)
                }, i * 60)
            }
        }, 200)

        const ph2 = setTimeout(() => {
            setGrandPhase(2)
            const heartInterval = setInterval(() => {
                fireHeart(Math.random() * 0.8 + 0.1, Math.random() * 0.8 + 0.1)
            }, 100)
            setTimeout(() => clearInterval(heartInterval), 2000)
        }, 1200)

        const ph3 = setTimeout(() => {
            setGrandPhase(3)
            fireBurst(cx, cy, 120)
            setTimeout(() => fireBurst(cx - 0.2, cy - 0.2, 60), 200)
            setTimeout(() => fireBurst(cx + 0.2, cy + 0.2, 60), 400)
            setTimeout(() => fireBurst(cx, cy - 0.3, 80), 600)
        }, 3000)

        return () => {
            clearTimeout(ph1)
            clearTimeout(ph2)
            clearTimeout(ph3)
        }
    }, [showGrandFinale])

    return (
        <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10 overflow-hidden">
            {showGrandFinale && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, rgba(151,59,136,0.15), transparent 70%)",
                    }}
                />
            )}

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
                    A Special Message
                </h2>
                <p className="text-primary/70 text-sm">
                    {done ? "For you \u2728" : "Reading..."}
                </p>
            </motion.div>

            <div
                ref={scrollRef}
                className="relative h-71.25 w-full rounded-[40px] overflow-y-auto shadow-inner bg-linear-to-b from-white/80 to-pink-200 flex items-start justify-center max-w-71.25 px-6 py-6"
            >
                <p className="text-foreground whitespace-pre-wrap text-sm md:text-base leading-relaxed">
                    {displayed}
                    {!done && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                            className="text-primary ml-0.5 font-light"
                        >
                            |
                        </motion.span>
                    )}
                </p>
            </div>

            <AnimatePresence>
                {done && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-col items-center gap-2"
                    >
                        {showGrandFinale && grandPhase >= 2 && (
                            <motion.p
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="text-lg md:text-xl font-semibold text-primary text-center"
                            >
                                {grandPhase >= 3
                                    ? "\u2728\u2728 Happy Birthday! \u2728\u2728"
                                    : "\u2764\uFE0F You're amazing! \u2764\uFE0F"}
                            </motion.p>
                        )}

                        {onNext && showGrandFinale && grandPhase >= 3 && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6, type: "spring" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="md:text-lg font-medium px-8 py-3 shadow-inner drop-shadow rounded-full hover:scale-103 active:scale-97 transition-all duration-200 flex items-center gap-2 will-change-transform focus:outline-none bg-primary text-white"
                            >
                                Continue \u2192
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
