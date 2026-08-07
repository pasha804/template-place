"use client"

import { useEffect, useRef } from "react"

export default function BgMusic({ playing, fadeOut = false, audioUrl }) {
    const audioRef = useRef(null)
    const fadeTimer = useRef(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (playing) {
            audio.volume = 0.35
            audio.loop = true
            audio.play().catch(() => {})
        }
    }, [playing])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return
        if (fadeOut) {
            // Fade out volume over 1.5s then pause
            let vol = audio.volume
            fadeTimer.current = setInterval(() => {
                vol = Math.max(0, vol - 0.04)
                audio.volume = vol
                if (vol <= 0) {
                    clearInterval(fadeTimer.current)
                    audio.pause()
                }
            }, 60)
        }
        return () => clearInterval(fadeTimer.current)
    }, [fadeOut])

    return (
        <audio ref={audioRef} src={audioUrl || "/templates/sorry-sweet/audio/song.mp3"} />
    )
}
