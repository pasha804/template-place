"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, Sparkles, Star } from "lucide-react"
import { useState, useEffect, useRef } from "react"

// ─── Shared background: floating hearts + twinkling stars ───
function Background() {
    const [floatingItems, setFloatingItems] = useState([])
    const [stars, setStars] = useState([])

    useEffect(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        const icons = [Heart, Sparkles, Star]
        const colors = ["text-pink-400", "text-purple-300", "text-pink-300"]

        setFloatingItems(
            Array.from({ length: 10 }).map((_, i) => ({
                x: Math.random() * w,
                delay: Math.random() * 10,
                duration: Math.random() * 6 + 8,
                Icon: icons[i % icons.length],
                color: colors[i % colors.length],
                startY: h + 50,
            }))
        )
        setStars(
            Array.from({ length: 25 }).map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: Math.random() * 3,
                duration: Math.random() * 4 + 3,
            }))
        )
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Radial center glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.08)_0%,transparent_70%)]" />

            {floatingItems.map(({ x, delay, duration, Icon, color, startY }, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{ x, y: startY, opacity: 0 }}
                    animate={{
                        y: -100,
                        x: x + (Math.random() - 0.5) * 150,
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
                    key={`st-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ left, top }}
                    animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0] }}
                    transition={{ duration, delay, repeat: Infinity }}
                />
            ))}
        </div>
    )
}

// ─── Phase 1: 3 Love Cards ───
const cards = [
    {
        icon: "✨",
        title: "Teri Smile",
        text: "Teri smile mein wo jaadu hai jo mera din bana deti hai",
        glow: "rgba(236,72,153,0.5)",
        border: "border-pink-400/30",
        shadow: "0 0 30px rgba(236,72,153,0.25)",
    },
    {
        icon: "👀",
        title: "Teri Aankhein",
        text: "Teri aankhon mein wo sukoon hai jo duniya mein kahin nahi",
        glow: "rgba(168,85,247,0.5)",
        border: "border-purple-400/30",
        shadow: "0 0 30px rgba(168,85,247,0.25)",
    },
    {
        icon: "💫",
        title: "Tere Baal",
        text: "Tere baalon ki loriyaan mujhe apna bana leti hain",
        glow: "rgba(236,72,153,0.5)",
        border: "border-pink-300/30",
        shadow: "0 0 30px rgba(236,72,153,0.25)",
    },
]

function Phase1({ onDone }) {
    const [current, setCurrent] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (current >= cards.length) {
            // small pause then move on
            const t = setTimeout(onDone, 600)
            return () => clearTimeout(t)
        }

        const t = setTimeout(() => {
            setVisible(false)
            setTimeout(() => {
                setCurrent((p) => p + 1)
                setVisible(true)
            }, 500)
        }, 2500)
        return () => clearTimeout(t)
    }, [current, onDone])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen z-10 relative px-6 gap-6">
            <AnimatePresence mode="wait">
                {visible && current < cards.length && (
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 60, scale: 0.7 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -60, scale: 0.7 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`max-w-md w-full backdrop-blur-xl bg-white/5 border ${cards[current].border} rounded-xl p-8 text-center`}
                        style={{ boxShadow: cards[current].shadow }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="text-6xl mb-4"
                            style={{ filter: `drop-shadow(0 0 12px ${cards[current].glow})` }}
                        >
                            {cards[current].icon}
                        </motion.div>
                        <h2
                            className="text-3xl md:text-4xl font-bold text-white mb-3"
                            style={{ textShadow: `0 0 20px ${cards[current].glow}` }}
                        >
                            {cards[current].title}
                        </h2>
                        <p className="text-lg md:text-xl text-pink-100/80 font-light italic leading-relaxed">
                            {cards[current].text}
                        </p>

                        {/* Orbiting sparkles for card 2 */}
                        {current === 1 && (
                            <>
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-purple-300 text-xs pointer-events-none"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                                        style={{
                                            top: "50%",
                                            left: "50%",
                                            translateX: "-50%",
                                            translateY: "-50%",
                                            transformOrigin: `${50 + 45 * Math.cos((i * 2 * Math.PI) / 3)}px ${50 + 45 * Math.sin((i * 2 * Math.PI) / 3)}px`,
                                        }}
                                    >
                                        ✦
                                    </motion.div>
                                ))}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-2 z-10">
                {cards.map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        animate={{
                            backgroundColor: i <= current ? "#f9a8d4" : "rgba(255,255,255,0.2)",
                            scale: i === current ? 1.4 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
        </div>
    )
}

// ─── Phase 2: Landscape Swipe Carousel + Fullscreen Lightbox ───
const eyePhotos = [
    { src: "/templates/sorry-sweet/images/1-eye.jpeg", alt: "Meri aankhein 1", label: "Pehli nazar... 👀" },
    { src: "/templates/sorry-sweet/images/2-eye.jpeg", alt: "Meri aankhein 2", label: "Sirf tumhe dekhti hain 🤍" },
    { src: "/templates/sorry-sweet/images/3-eye.jpeg", alt: "Meri aankhein 3", label: "Hamesha tumhari... ❤️" },
]

// Landscape card: wider than tall
const CARD_W = 300
const CARD_H = 190
const CARD_GAP = 18
const CARD_STEP = CARD_W + CARD_GAP

function Phase2({ onDone }) {
    const [active, setActive] = useState(0)
    const [lightbox, setLightbox] = useState(null) // index or null
    const [mounted, setMounted] = useState(false)
    const dragStartX = useRef(0)
    const dragMoved = useRef(false)
    const autoRef = useRef(null)

    useEffect(() => {
        setMounted(true)
        autoRef.current = setInterval(() => {
            setActive((prev) => {
                const next = prev + 1
                if (next >= eyePhotos.length) {
                    clearInterval(autoRef.current)
                    setTimeout(onDone, 900)
                    return prev
                }
                return next
            })
        }, 3800)
        return () => clearInterval(autoRef.current)
    }, [onDone])

    function goTo(idx) {
        clearInterval(autoRef.current)
        setActive(Math.max(0, Math.min(eyePhotos.length - 1, idx)))
    }

    function onPointerDown(e) {
        dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX
        dragMoved.current = false
    }

    function onPointerUp(e, idx) {
        const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX
        const diff = dragStartX.current - endX
        if (Math.abs(diff) > 40) {
            // it was a swipe
            goTo(active + (diff > 0 ? 1 : -1))
        } else {
            // it was a tap
            if (idx === active) {
                setLightbox(idx) // open fullscreen
            } else {
                goTo(idx)
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative gap-5"
        >
            {/* ── Heading ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-center px-6"
            >
                <h2
                    className="text-2xl md:text-4xl font-bold text-white"
                    style={{ textShadow: "0 0 20px rgba(236,72,153,0.6)" }}
                >
                    Aur yeh meri aankhein hain... 👀❤️
                </h2>
                <p className="text-base md:text-lg text-pink-100/60 italic font-light mt-1">
                    jo sirf tumhe dekhti hain, hamesha
                </p>
            </motion.div>

            {/* ── Swipe hint ── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-pink-300/50 text-xs italic tracking-widest"
            >
                ← swipe • tap to open →
            </motion.p>

            {/* ── Landscape card track ── */}
            <div
                className="relative overflow-hidden"
                style={{ width: "100vw", height: CARD_H + 24 }}
                onMouseDown={onPointerDown}
                onTouchStart={onPointerDown}
            >
                <motion.div
                    className="absolute flex items-center"
                    style={{ height: CARD_H + 24, left: "50%", top: 0 }}
                    animate={{ x: -active * CARD_STEP }}
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                >
                    {eyePhotos.map((photo, idx) => {
                        const isActive = idx === active
                        return (
                            <motion.div
                                key={idx}
                                onMouseUp={(e) => onPointerUp(e, idx)}
                                onTouchEnd={(e) => onPointerUp(e, idx)}
                                animate={{
                                    scale: isActive ? 1 : 0.9,
                                    opacity: isActive ? 1 : 0.45,
                                    y: isActive ? 0 : 10,
                                }}
                                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                                className="relative flex-shrink-0 cursor-pointer select-none"
                                style={{
                                    width: CARD_W,
                                    height: CARD_H,
                                    marginRight: CARD_GAP,
                                    marginLeft: idx === 0 ? -(CARD_W / 2) : 0,
                                    borderRadius: 12,
                                    overflow: "hidden",
                                    border: isActive
                                        ? "2px solid rgba(236,72,153,0.9)"
                                        : "2px solid rgba(255,255,255,0.07)",
                                    boxShadow: isActive
                                        ? "0 0 0 1px rgba(236,72,153,0.25), 0 0 36px rgba(236,72,153,0.35), 0 12px 40px rgba(0,0,0,0.7)"
                                        : "0 6px 20px rgba(0,0,0,0.5)",
                                    background: "#0a0a0a",
                                    willChange: "transform",
                                }}
                            >
                                {mounted && (
                                    <img src={photo.src} alt={photo.alt} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} loading="lazy" />
                                )}

                                {/* Bottom gradient */}
                                <div
                                    className="absolute inset-0"
                                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)" }}
                                />

                                {/* Label on active */}
                                {isActive && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="absolute bottom-3 left-0 right-0 text-center text-white text-sm font-semibold italic"
                                        style={{ textShadow: "0 0 10px rgba(236,72,153,0.8)" }}
                                    >
                                        {photo.label}
                                    </motion.p>
                                )}

                                {/* Tap to expand hint on active */}
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="absolute top-3 right-3"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.25, 1] }}
                                            transition={{ duration: 1.4, repeat: Infinity }}
                                            className="w-7 h-7 rounded-full flex items-center justify-center"
                                            style={{
                                                background: "rgba(236,72,153,0.85)",
                                                boxShadow: "0 0 12px rgba(236,72,153,0.7)",
                                            }}
                                        >
                                            <Heart size={14} className="fill-white text-white" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>

            {/* ── Dot indicators ── */}
            <div className="flex gap-2.5 items-center z-10">
                {eyePhotos.map((_, i) => (
                    <motion.div
                        key={i}
                        onClick={() => goTo(i)}
                        animate={{
                            width: i === active ? 28 : 8,
                            backgroundColor: i === active ? "#ec4899" : "rgba(255,255,255,0.25)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-2 rounded-full cursor-pointer"
                    />
                ))}
            </div>

            {/* ── Continue button ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.7 }}
            >
                <motion.button
                    onClick={onDone}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                        boxShadow: [
                            "0 0 18px rgba(236,72,153,0.35)",
                            "0 0 38px rgba(236,72,153,0.65)",
                            "0 0 18px rgba(236,72,153,0.35)",
                        ],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-10 rounded-full text-base flex items-center gap-2"
                >
                    <Heart size={16} className="fill-white" />
                    Aur bhi hai tumhare liye... ✨
                </motion.button>
            </motion.div>

            {/* ── Fullscreen Lightbox ── */}
            <AnimatePresence>
                {lightbox !== null && (
                    <motion.div
                        key="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
                        onClick={() => setLightbox(null)}
                    >
                        {/* Image */}
                        <motion.div
                            initial={{ scale: 0.75, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.75, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 220, damping: 24 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative"
                            style={{
                                width: "min(92vw, 560px)",
                                height: "min(58vw, 350px)",
                                borderRadius: 16,
                                overflow: "hidden",
                                border: "2px solid rgba(236,72,153,0.7)",
                                boxShadow: "0 0 60px rgba(236,72,153,0.4), 0 30px 80px rgba(0,0,0,0.8)",
                            }}
                        >
                            {mounted && (
                                <img src={eyePhotos[lightbox].src} alt={eyePhotos[lightbox].alt} className="absolute inset-0 w-full h-full object-cover" />
                            )}
                            {/* Bottom label */}
                            <div
                                className="absolute bottom-0 left-0 right-0 p-4 text-center"
                                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
                            >
                                <p
                                    className="text-white text-lg font-semibold italic"
                                    style={{ textShadow: "0 0 12px rgba(236,72,153,0.8)" }}
                                >
                                    {eyePhotos[lightbox].label}
                                </p>
                            </div>
                        </motion.div>

                        {/* Prev / Next nav */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-8 mt-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLightbox((p) => Math.max(0, p - 1))}
                                disabled={lightbox === 0}
                                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-all"
                                style={{
                                    background: lightbox === 0 ? "rgba(255,255,255,0.06)" : "rgba(236,72,153,0.7)",
                                    boxShadow: lightbox === 0 ? "none" : "0 0 16px rgba(236,72,153,0.5)",
                                    opacity: lightbox === 0 ? 0.3 : 1,
                                }}
                            >
                                ‹
                            </button>

                            {/* dots inside lightbox */}
                            <div className="flex gap-2">
                                {eyePhotos.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        onClick={() => setLightbox(i)}
                                        animate={{
                                            width: i === lightbox ? 24 : 8,
                                            backgroundColor: i === lightbox ? "#ec4899" : "rgba(255,255,255,0.3)",
                                        }}
                                        className="h-2 rounded-full cursor-pointer"
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => setLightbox((p) => Math.min(eyePhotos.length - 1, p + 1))}
                                disabled={lightbox === eyePhotos.length - 1}
                                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xl transition-all"
                                style={{
                                    background: lightbox === eyePhotos.length - 1 ? "rgba(255,255,255,0.06)" : "rgba(236,72,153,0.7)",
                                    boxShadow: lightbox === eyePhotos.length - 1 ? "none" : "0 0 16px rgba(236,72,153,0.5)",
                                    opacity: lightbox === eyePhotos.length - 1 ? 0.3 : 1,
                                }}
                            >
                                ›
                            </button>
                        </motion.div>

                        <p className="text-white/25 text-xs italic mt-4">tap outside to close</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ─── Phase 3: Typewriter Promise ───
function Phase3({ onDone, personName }) {
    const PROMISE_TEXT =
        `Mera har waada, meri har saans, meri har dua...\n\nsirf tumhare liye hai, ${personName || 'Khadija'}.\n\nTum meri zindagi ka sabse haseen hissa ho. ❤️`

    const [displayed, setDisplayed] = useState("")
    const [cursorVisible, setCursorVisible] = useState(true)
    const [done, setDone] = useState(false)
    const idx = useRef(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (idx.current < PROMISE_TEXT.length) {
                setDisplayed(PROMISE_TEXT.slice(0, idx.current + 1))
                idx.current++
            } else {
                clearInterval(interval)
                setDone(true)
                setTimeout(onDone, 1800)
            }
        }, 50)
        return () => clearInterval(interval)
    }, [onDone])

    useEffect(() => {
        const blink = setInterval(() => setCursorVisible((v) => !v), 500)
        return () => clearInterval(blink)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-8"
        >
            <div className="max-w-xl w-full text-center backdrop-blur-xl bg-white/5 border border-pink-400/20 rounded-3xl p-8 md:p-10"
                style={{ boxShadow: "0 0 40px rgba(236,72,153,0.15)" }}>
                <div className="text-3xl mb-6">💌</div>
                <p
                    className="text-xl md:text-2xl text-pink-100 font-light italic leading-relaxed text-left whitespace-pre-line"
                    style={{ textShadow: "0 0 10px rgba(236,72,153,0.3)" }}
                >
                    {displayed}
                    <span
                        className="inline-block w-0.5 h-6 bg-pink-300 ml-0.5 align-middle"
                        style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
                    />
                </p>
            </div>
        </motion.div>
    )
}

// ─── Shared continue button ───
function ContinueBtn({ onClick, label = "Aage chalein... 💕" }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex justify-center pt-2 pb-6">
            <motion.button onClick={onClick} whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0 0 16px rgba(236,72,153,0.3)", "0 0 38px rgba(236,72,153,0.65)", "0 0 16px rgba(236,72,153,0.3)"] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-10 rounded-full text-base flex items-center gap-2">
                <Heart size={16} className="fill-white" /> {label}
            </motion.button>
        </motion.div>
    )
}

// ─── Voice Note Player (full page) ───
function VoiceNote({ onNext, voiceNoteUrl }) {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [noFile, setNoFile] = useState(false)
    const [loading, setLoading] = useState(false)
    const loadedRef = useRef(false)

    // Pre-check: try fetching the file head to see if it exists and has content
    useEffect(() => {
        fetch(voiceNoteUrl || "/templates/sorry-sweet/audio/voice-note.mp3", { method: "HEAD" })
            .then((res) => {
                const size = parseInt(res.headers.get("content-length") || "0", 10)
                // If file is missing or tiny (placeholder <1KB) show not-available state
                if (!res.ok || size < 1000) setNoFile(true)
            })
            .catch(() => {}) // network error — don't show error, let user try
    }, [])

    function toggle() {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            audio.currentTime = 0
            setIsPlaying(false)
            return
        }

        setLoading(true)

        const startPlay = () => {
            loadedRef.current = true
            setLoading(false)
            // Safari: play() must be called synchronously inside user gesture
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                    setLoading(false)
                    // NotSupportedError = bad file, NotAllowedError = policy (shouldn't happen with tap)
                    if (err.name === "NotSupportedError") setNoFile(true)
                })
        }

        if (loadedRef.current) {
            // Already loaded once, just play
            setLoading(false)
            audio.play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                    if (err.name === "NotSupportedError") setNoFile(true)
                })
        } else {
            // Load and play — listen for canplay (fires sooner than canplaythrough on Safari)
            const onCanPlay = () => {
                audio.removeEventListener("canplay", onCanPlay)
                audio.removeEventListener("error", onError)
                startPlay()
            }
            const onError = () => {
                audio.removeEventListener("canplay", onCanPlay)
                audio.removeEventListener("error", onError)
                setLoading(false)
                setNoFile(true)
            }
            audio.addEventListener("canplay", onCanPlay)
            audio.addEventListener("error", onError)
            audio.load()
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-6 gap-6">

            {/* Safari-compatible: src in JSX, preload metadata (not none) so Safari can read duration */}
            <audio
                ref={audioRef}
                src={voiceNoteUrl || "/templates/sorry-sweet/audio/voice-note.mp3"}
                preload="metadata"
                playsInline
                onEnded={() => { setIsPlaying(false) }}
                onError={() => { setLoading(false) }}
            />

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center space-y-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(236,72,153,0.6)" }}>
                    Sun meri awaaz... 🎤
                </h2>
                <p className="text-pink-100/60 italic text-base font-light">Ek cheez aur sunni hai tumhe 💕</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
                className="w-full max-w-xs backdrop-blur-xl bg-white/5 border border-pink-400/20 rounded-3xl p-8 flex flex-col items-center gap-5"
                style={{ boxShadow: "0 0 40px rgba(236,72,153,0.2)" }}>

                <motion.div
                    animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.7, repeat: isPlaying ? Infinity : 0 }}
                    className="text-5xl"
                    style={{ filter: "drop-shadow(0 0 14px rgba(236,72,153,0.7))" }}
                >
                    🔊
                </motion.div>

                {noFile ? (
                    <p className="text-pink-300/60 text-sm italic text-center">
                        Voice note abhi upload hogi... 💕<br />
                        <span className="text-white/30 text-xs">Add in template config</span>
                    </p>
                ) : (
                    <>
                        <p className="text-pink-200/80 italic text-sm text-center">
                            {loading ? "Load ho rahi hai... ⏳" : isPlaying ? "Sun rahi ho? 🥺" : "Play karo meri awaaz... 💕"}
                        </p>
                        <motion.button
                            onClick={toggle}
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.1 } : {}}
                            whileTap={!loading ? { scale: 0.92 } : {}}
                            animate={{
                                boxShadow: isPlaying
                                    ? ["0 0 20px rgba(236,72,153,0.7)", "0 0 55px rgba(236,72,153,1)", "0 0 20px rgba(236,72,153,0.7)"]
                                    : ["0 0 15px rgba(236,72,153,0.3)", "0 0 35px rgba(236,72,153,0.6)", "0 0 15px rgba(236,72,153,0.3)"],
                            }}
                            transition={{ duration: isPlaying ? 0.8 : 2, repeat: Infinity }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl"
                            style={{ opacity: loading ? 0.6 : 1 }}
                        >
                            {loading ? "⏳" : isPlaying ? "⏸" : "▶"}
                        </motion.button>
                    </>
                )}
            </motion.div>

            <ContinueBtn onClick={onNext} label="Aage... ✨" />
        </motion.div>
    )
}

// ─── Scratch Card (full page) ───
function ScratchCard({ onNext }) {
    const canvasRef = useRef(null)
    const [revealed, setRevealed] = useState(false)
    const [scratching, setScratching] = useState(false)
    const [canvasReady, setCanvasReady] = useState(false)
    const isDown = useRef(false)
    const totalPixels = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const W = canvas.width; const H = canvas.height
        totalPixels.current = W * H
        const grad = ctx.createLinearGradient(0, 0, W, H)
        grad.addColorStop(0, "#ec4899"); grad.addColorStop(1, "#a855f7")
        ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H)
        ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center"
        ctx.fillText("Scratch me ✨", W / 2, H / 2 - 10)
        ctx.font = "14px sans-serif"; ctx.fillStyle = "rgba(255,255,255,0.7)"
        ctx.fillText("yahan chhupa hua hai secret", W / 2, H / 2 + 18)
        setCanvasReady(true)
    }, [])

    function getPos(e, canvas) {
        const rect = canvas.getBoundingClientRect()
        const scaleX = canvas.width / rect.width; const scaleY = canvas.height / rect.height
        if (e.touches) return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY }
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY }
    }

    function scratch(e) {
        if (!isDown.current || revealed) return
        e.preventDefault()
        const canvas = canvasRef.current; const ctx = canvas.getContext("2d")
        const { x, y } = getPos(e, canvas)
        ctx.globalCompositeOperation = "destination-out"; ctx.beginPath(); ctx.arc(x, y, 24, 0, Math.PI * 2); ctx.fill()
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let transparent = 0
        for (let i = 3; i < imageData.data.length; i += 4) { if (imageData.data[i] === 0) transparent++ }
        if (transparent / totalPixels.current > 0.6) setRevealed(true)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-6 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center space-y-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ textShadow: "0 0 20px rgba(236,72,153,0.6)" }}>
                    Ek secret aur hai... 🤫
                </h2>
                <p className="text-pink-100/60 italic text-base font-light">Ungali se scratch karo 👆</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="flex flex-col items-center gap-4">
                <div className="relative" style={{ width: 300, height: 150, borderRadius: 16, overflow: "hidden", border: "2px solid rgba(236,72,153,0.4)", boxShadow: "0 0 30px rgba(236,72,153,0.25)" }}>
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-950/80 to-purple-950/80 px-5">
                        <p className="text-center text-white text-base font-semibold italic leading-snug" style={{ textShadow: "0 0 16px rgba(236,72,153,0.9)" }}>
                            Bas. Main tumhe kabhi khona nahi chahta... 💕
                        </p>
                    </div>
                    <motion.canvas ref={canvasRef} width={300} height={150}
                        animate={{ opacity: revealed ? 0 : 1 }} transition={{ duration: 0.6 }}
                        className="absolute inset-0 touch-none" style={{ cursor: "crosshair", borderRadius: 14 }}
                        onMouseDown={() => { isDown.current = true; setScratching(true) }}
                        onMouseUp={() => { isDown.current = false; setScratching(false) }}
                        onMouseLeave={() => { isDown.current = false }}
                        onMouseMove={scratch}
                        onTouchStart={(e) => { e.preventDefault(); isDown.current = true }}
                        onTouchEnd={() => { isDown.current = false }}
                        onTouchMove={scratch} />
                    {revealed && (
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            {[...Array(6)].map((_, k) => (
                                <motion.span key={k} className="absolute text-xl"
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                                    animate={{ x: (Math.random() - 0.5) * 160, y: -80 - Math.random() * 40, opacity: 0, scale: 1.8 }}
                                    transition={{ duration: 0.9, delay: k * 0.07 }}>❤️</motion.span>
                            ))}
                        </div>
                    )}
                </div>
                {!revealed && canvasReady && <p className="text-white/30 text-xs italic">{scratching ? "Haan aise hi... 🤍" : "Ungali rakho aur chhilao 👆"}</p>}
                {revealed && <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-pink-300 text-base italic font-semibold" style={{ textShadow: "0 0 12px rgba(236,72,153,0.6)" }}>Mil gaya secret! 💖</motion.p>}
            </motion.div>
            <ContinueBtn onClick={onNext} label="Aur suno... 🎤" />
        </motion.div>
    )
}

// ─── Forgive Me (full page) ───
function ForgiveBtn({ onNext, personName }) {
    const [forgiven, setForgiven] = useState(false)
    const [hearts, setHearts] = useState([])
    const [showFlash, setShowFlash] = useState(false)
    const confettiRef = useRef(null)

    useEffect(() => {
        import("canvas-confetti").then((mod) => { confettiRef.current = mod.default }).catch(() => {})
    }, [])

    function handleClick() {
        if (forgiven) return
        setForgiven(true); setShowFlash(true)
        setTimeout(() => setShowFlash(false), 600)
        setHearts(Array.from({ length: 12 }).map((_, i) => ({ id: i, angle: (i / 12) * 360, dist: 120 + Math.random() * 80 })))
        const confetti = confettiRef.current
        if (confetti) {
            const colors = ["#ff758c", "#ff7eb3", "#c084fc", "#ffd1ff", "#ffffff", "#f9a8d4"]
            const end = Date.now() + 3000
            confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 }, colors })
            const frame = () => {
                confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors })
                confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors })
                if (Date.now() < end) requestAnimationFrame(frame)
            }
            frame()
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-6 gap-8">
            <AnimatePresence>
                {showFlash && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.12 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-white pointer-events-none z-40" />
                )}
            </AnimatePresence>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center space-y-2">
                <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ textShadow: "0 0 24px rgba(236,72,153,0.7)" }}>Last cheez... 💕</h2>
                <p className="text-pink-100/60 italic text-base font-light">Bas ek baar tap karo 🥺</p>
            </motion.div>

            <div className="relative flex flex-col items-center gap-4">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {hearts.map((h) => (
                        <motion.span key={h.id} className="absolute text-2xl"
                            initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                            animate={{ x: h.dist * Math.cos((h.angle * Math.PI) / 180), y: h.dist * Math.sin((h.angle * Math.PI) / 180), opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.85, ease: "easeOut" }}>❤️</motion.span>
                    ))}
                </div>
                <motion.button onClick={handleClick} disabled={forgiven}
                    whileHover={!forgiven ? { scale: 1.08 } : {}} whileTap={!forgiven ? { scale: 0.95 } : {}}
                    animate={{ boxShadow: forgiven ? ["0 0 20px rgba(34,197,94,0.4)", "0 0 45px rgba(34,197,94,0.7)", "0 0 20px rgba(34,197,94,0.4)"] : ["0 0 20px rgba(236,72,153,0.4)", "0 0 50px rgba(236,72,153,0.75)", "0 0 20px rgba(236,72,153,0.4)"] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    className="relative overflow-hidden py-4 px-8 rounded-full text-white font-bold text-xl flex items-center gap-3 transition-all duration-500"
                    style={{ background: forgiven ? "linear-gradient(135deg, #22c55e, #059669)" : "linear-gradient(135deg, #ec4899, #a855f7)", minWidth: 270, justifyContent: "center" }}>
                    <AnimatePresence mode="wait">
                        {forgiven ? (
                            <motion.span key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex items-center gap-2">
                                ❤️ Thank you meri jaan ❤️
                            </motion.span>
                        ) : (
                            <motion.span key="ask" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3 }} className="flex items-center gap-2">
                                <Heart size={20} className="fill-white" /> Kya tum mujhe maaf karogi? 💕
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
                {forgiven && (
                    <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-green-300/80 text-sm italic">
                        Tum best ho meri jaan 🌸
                    </motion.p>
                )}
            </div>
        </motion.div>
    )
}

// ─── Phase 4: Flower poem only ───
function Phase4({ onNext }) {
    const [showBody, setShowBody] = useState(false)
    const [showClosing, setShowClosing] = useState(false)
    const [petals, setPetals] = useState([])

    useEffect(() => {
        const t1 = setTimeout(() => setShowBody(true), 1400)
        const t2 = setTimeout(() => setShowClosing(true), 2600)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [])

    useEffect(() => {
        setPetals(Array.from({ length: 12 }).map((_, i) => ({
            emoji: ["🌸", "✨", "💕", "🌷", "⭐"][i % 5],
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 5,
            size: Math.random() * 14 + 12,
            travelY: -(window.innerHeight + 80),
        })))
    }, [])

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
            className="flex flex-col items-center justify-center min-h-screen z-10 relative px-6 py-10 gap-5 overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {petals.map((p, i) => (
                    <motion.div key={i} className="absolute" style={{ left: p.left, bottom: -40, fontSize: p.size }}
                        initial={{ y: 0, opacity: 0 }} animate={{ y: p.travelY, opacity: [0, 0.8, 0] }}
                        transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}>{p.emoji}</motion.div>
                ))}
            </div>

            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 70 }}
                className="text-3xl md:text-5xl font-bold text-center leading-tight px-2"
                style={{ background: "linear-gradient(90deg, #f9a8d4, #e879f9, #f9a8d4)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite", filter: "drop-shadow(0 0 18px rgba(236,72,153,0.55))" }}>
                Mera bachawww, hamesha mera rehna... 💕
            </motion.h1>

            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.4, type: "spring", stiffness: 55 }} className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)", transform: "scale(1.3)" }} />
                <img src="/templates/sorry-sweet/gifs/3.gif" className="w-44 md:w-56 relative z-10" alt="flower bear" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.7 }}
                className="text-2xl md:text-3xl font-semibold text-center italic text-pink-200" style={{ textShadow: "0 0 16px rgba(236,72,153,0.5)" }}>
                Yeh pyaar kabhi katam nahi ho ga... 🌹
            </motion.p>

            <AnimatePresence>
                {showBody && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="max-w-sm w-full text-center px-2">
                        <p className="text-lg md:text-xl text-white/80 font-light italic leading-relaxed" style={{ textShadow: "0 0 8px rgba(236,72,153,0.2)" }}>
                            • Bilkul aise hi, meri mohabbat bhi hamesha tumhare liye rahegi, aur main tumhara dil kabhi nahi dukhaunga. 💖
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showClosing && (
                    <motion.p initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, type: "spring" }}
                        className="text-xl md:text-2xl font-bold text-center"
                        style={{ background: "linear-gradient(90deg, #f9a8d4, #c084fc, #f9a8d4)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 3s linear infinite", filter: "drop-shadow(0 0 12px rgba(236,72,153,0.4))" }}>
                        Tum meri zindagi ka sabse haseen hissa ho, {personName || 'Khadija'}. 💕✨
                    </motion.p>
                )}
            </AnimatePresence>

            {showClosing && <ContinueBtn onClick={onNext} label="Aage chalein... 💕" />}

            <style>{`@keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }`}</style>
        </motion.div>
    )
}

// ─── Main LyricsScreen ───
export default function LyricsScreen({ onRestart, onVoiceNotePage, personName, voiceNoteUrl }) {
    const [phase, setPhase] = useState(1)
    const next = (n) => {
        if (n === 6 && onVoiceNotePage) onVoiceNotePage()
        setPhase(n)
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="relative min-h-screen overflow-hidden">
            <Background />
            <AnimatePresence mode="wait">
                {phase === 1 && (
                    <motion.div key="p1" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
                        <Phase1 onDone={() => next(2)} />
                    </motion.div>
                )}
                {phase === 2 && (
                    <motion.div key="p2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <Phase2 onDone={() => next(3)} />
                    </motion.div>
                )}
                {phase === 3 && (
                    <motion.div key="p3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        <Phase3 onDone={() => next(4)} personName={personName} />
                    </motion.div>
                )}
                {phase === 4 && (
                    <motion.div key="p4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                        <Phase4 onNext={() => next(5)} />
                    </motion.div>
                )}
                {phase === 5 && (
                    <motion.div key="p5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                        <ScratchCard onNext={() => next(6)} />
                    </motion.div>
                )}
                {phase === 6 && (
                    <motion.div key="p6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                        <VoiceNote onNext={() => next(7)} voiceNoteUrl={voiceNoteUrl} />
                    </motion.div>
                )}
                {phase === 7 && (
                    <motion.div key="p7" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                        <ForgiveBtn onNext={onRestart} personName={personName} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
