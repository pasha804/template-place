"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicToggle({ audioSrc = "/templates/birthday-aurora/music.mp3" }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const fadeRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(audioSrc)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio

    audio.addEventListener("canplaythrough", () => setReady(true), { once: true })
    // Try loading silently — may fail if file absent, that's fine
    audio.load()

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [audioSrc])

  const fadeTo = (target, duration = 1000) => {
    if (!audioRef.current) return
    if (fadeRef.current) clearInterval(fadeRef.current)
    const steps = 40
    const interval = duration / steps
    const start = audioRef.current.volume
    const delta = (target - start) / steps
    let step = 0

    fadeRef.current = setInterval(() => {
      step++
      const next = Math.min(Math.max(audioRef.current.volume + delta, 0), 1)
      audioRef.current.volume = next
      if (step >= steps) {
        clearInterval(fadeRef.current)
        if (target === 0) audioRef.current.pause()
      }
    }, interval)
  }

  const toggle = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    if (!audioRef.current) return

    if (isPlaying) {
      fadeTo(0, 800)
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        fadeTo(0.4, 1000)
        setIsPlaying(true)
      }).catch(() => {
        // autoplay blocked or file missing — just toggle UI
        setIsPlaying(false)
      })
    }
  }

  return (
    <motion.button
      onClick={toggle}
      className="music-toggle fixed top-4 right-4 z-[100] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 min-w-[44px] min-h-[44px]"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isPlaying ? "Mute music" : "Play music"}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className="w-5 h-5 text-pink-400" />
          </motion.div>
        ) : (
          <motion.div
            key="muted"
            initial={{ scale: 0, rotate: 90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX className="w-5 h-5 text-white/50" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sound wave rings when playing */}
      {isPlaying && (
        <>
          <motion.span
            className="absolute inset-0 rounded-full border border-pink-500/40"
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-pink-400/30"
            animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
          />
        </>
      )}
    </motion.button>
  )
}
