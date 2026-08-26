"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer({ musicPlaying, setMusicPlaying, audioSrc = "/templates/sorry-teddy/audio/bg.mp3" }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      if (audioSrc && audioRef.current.src !== audioSrc) {
        audioRef.current.src = audioSrc
      }
      if (musicPlaying) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
    }
  }, [musicPlaying, audioSrc])

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-4 right-4 z-50"
    >
      <motion.button
        onClick={toggleMusic}
        className="bg-pink-500/20 backdrop-blur-sm border border-pink-300/30 rounded-full p-3 text-pink-200 hover:bg-pink-500/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>

      <audio ref={audioRef} src={audioSrc || "/templates/sorry-teddy/audio/bg.mp3"} loop preload="auto" />
    </motion.div>
  )
}
