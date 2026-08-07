"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import PremiumBackground from "./PremiumBackground"
import PremiumButton from "./PremiumButton"

const DEFAULT_PHOTOS = [
  { src: "/templates/proposal-romantic/images/photo1.jpg", caption: "My love, looking gorgeous as always 🌟" },
  { src: "/templates/proposal-romantic/images/photo2.jpg", caption: "My favorite memory with you 🎉" },
  { src: "/templates/proposal-romantic/images/photo3.jpg", caption: "That smile that got me 😍" },
  { src: "/templates/proposal-romantic/images/photo4.jpg", caption: "You are my everything 💕" },
]

export default function PhotoGalleryScreen({ onContinue, galleryPhotos }) {
  const photos = galleryPhotos && galleryPhotos.length > 0 
    ? galleryPhotos.map((src, i) => ({ src, caption: DEFAULT_PHOTOS[i]?.caption || "" }))
    : DEFAULT_PHOTOS
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState(null)
  const [photosExist, setPhotosExist] = useState(true)
  const touchStartX = useRef(null)

  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setActiveIndex((i) => (i + 1) % photos.length)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const handleImgError = () => setPhotosExist(false)

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <PremiumBackground particleCount={22} />

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
                        {i % 2 === 0 ? "📸" : "✨"}
                    </motion.div>
                ))}
            </div>

            <motion.div 
                className="glass-card relative z-30 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-8 md:p-14 rounded-[40px]"
                initial={{ y: 50, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Subtle inner glow for the card */}
                <div className="absolute inset-0 rounded-[40px] pointer-events-none border border-white/20" style={{ boxShadow: "inset 0 0 40px rgba(236,72,153,0.1)" }} />

                <div className="w-full relative z-10 flex flex-col items-center text-center">

        {/* ── Title ── */}
        <motion.h1
          className="gradient-text text-4xl md:text-5xl font-bold mb-10"
          style={{ fontFamily: "'Shantell Sans', cursive" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Memories Together 📸
        </motion.h1>

        {/* ── No photos fallback ── */}
        {!photosExist ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-10 text-center"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              padding: "40px 30px",
              backdropFilter: "blur(20px)",
            }}
          >
            <p className="text-5xl mb-4">📸</p>
            <p className="text-lg font-semibold mb-2" style={{ color: "rgba(255,255,255,0.85)" }}>
              Add your photos here!
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Place <code className="bg-white/10 px-1 rounded">photo1.jpg</code> to <code className="bg-white/10 px-1 rounded">photo4.jpg</code>
              {" "}inside <code className="bg-white/10 px-1 rounded">/public/images/</code>
            </p>
          </motion.div>
        ) : (
          <>
            {/* ── Carousel ── */}
            <div
              className="relative flex items-center justify-center mb-6 select-none"
              style={{ height: 440 }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {photos.map((photo, i) => {
                const offset = (i - activeIndex + photos.length) % photos.length
                const isCenter = offset === 0
                const isLeft = offset === photos.length - 1
                const isRight = offset === 1
                const isHidden = !isCenter && !isLeft && !isRight

                if (isHidden) return null

                const translateX = isCenter ? 0 : isLeft ? -220 : 220
                const scale = isCenter ? 1 : 0.75
                const rotate = isCenter ? 0 : isLeft ? -6 : 6
                const opacity = isCenter ? 1 : 0.45
                const zIndex = isCenter ? 10 : 1

                return (
                  <motion.div
                    key={i}
                    onClick={() => isCenter ? setLightbox(photo) : setActiveIndex(i)}
                    animate={{ x: translateX, scale, rotate, opacity }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer overflow-hidden"
                    style={{
                      width: 260,
                      height: 360,
                      borderRadius: 20,
                      zIndex,
                      boxShadow: isCenter
                        ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(236,72,153,0.2)"
                        : "0 10px 30px rgba(0,0,0,0.4)",
                      border: isCenter
                        ? "1px solid rgba(244,114,182,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      onError={handleImgError}
                    />
                    {isCenter && (
                      <div
                        className="absolute bottom-0 left-0 right-0 p-4 text-center"
                        style={{
                          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          color: "rgba(255,255,255,0.9)",
                          fontFamily: "'Shantell Sans', cursive",
                          fontSize: 16,
                        }}
                      >
                        {photo.caption}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* ── Dots ── */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 20 : 8,
                    height: 8,
                    background: i === activeIndex
                      ? "linear-gradient(90deg, #ec4899, #a855f7)"
                      : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            {/* ── Arrow buttons ── */}
            <div className="flex items-center justify-center gap-6 mb-10">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                →
              </button>
            </div>
          </>
        )}

        {/* ── Continue button ── */}
        <PremiumButton onClick={onContinue} delay={0.8}>
          Continue 💕
        </PremiumButton>
                </div>
            </motion.div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full"
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full rounded-2xl shadow-2xl"
              />
              <p
                className="text-center mt-4 text-lg"
                style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Shantell Sans', cursive" }}
              >
                {lightbox.caption}
              </p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ background: "rgba(236,72,153,0.8)" }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
