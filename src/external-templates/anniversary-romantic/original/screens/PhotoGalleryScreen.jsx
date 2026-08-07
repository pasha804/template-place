"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ScreenContainer from "../ScreenContainer"

const SPRING = { type: "spring", stiffness: 200, damping: 15 }

const DEFAULT_PHOTOS = [
  { src: "/templates/anniversary-romantic/images/1.jpg", caption: "Our first spark ✨" },
  { src: "/templates/anniversary-romantic/images/2.jpg", caption: "That beautiful smile 🌸" },
  { src: "/templates/anniversary-romantic/images/3.jpg", caption: "My favourite memory 💕" },
  { src: "/templates/anniversary-romantic/images/4.jpg", caption: "Always and forever 💖" },
]

function useMagneticButton() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25
      el.style.transform = `translate(${dx}px,${dy}px)`
    }
    const onLeave = () => { el.style.transform = "translate(0,0)" }
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave) }
  }, [])
  return ref
}

export default function PhotoGalleryScreen({ onNext, photos: photoPaths, title, subtitle }) {
  const photos = photoPaths && photoPaths.length > 0
    ? photoPaths.map((src, i) => ({ src, caption: DEFAULT_PHOTOS[i]?.caption || "" }))
    : DEFAULT_PHOTOS
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const btnRef = useMagneticButton()

  const prev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length)
  const next = () => setActiveIndex((i) => (i + 1) % photos.length)

  const handleDragStart = (e) => {
    dragStart.current = e.touches ? e.touches[0].clientX : e.clientX
    setDragging(false)
  }

  const handleDragEnd = (e) => {
    if (dragStart.current === null) return
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diff = dragStart.current - endX
    if (Math.abs(diff) > 40) {
      setDragging(true)
      diff > 0 ? next() : prev()
    }
    dragStart.current = null
  }

  const handleClick = (i) => {
    if (dragging) return
    if (i === activeIndex) {
      setLightbox(true)
    } else {
      setActiveIndex(i)
    }
  }

  const handleBtnClick = () => {
    if (navigator.vibrate) navigator.vibrate(30)
    onNext()
  }

  return (
    <ScreenContainer>
      <div className="w-full max-w-3xl mx-auto relative z-10 px-4 flex flex-col items-center">

        <motion.h1
          className="font-display text-4xl md:text-5xl font-bold text-center mb-2 leading-tight"
          style={{ color: "#fda4af" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.1 }}
        >
          {title || "Our Beautiful Moments"}
        </motion.h1>

        <motion.p
          className="mb-8 text-sm"
          style={{ color: "rgba(248,250,252,0.4)", fontFamily: "Inter, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {subtitle || "Swipe or tap to explore ➡️"}
        </motion.p>

        {/* 3D Coverflow */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: 340, perspective: 1000 }}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {photos.map((photo, i) => {
            const offset = i - activeIndex
            const isActive = offset === 0
            const absOffset = Math.abs(offset)

            if (absOffset > 1) return null

            const rotateY = offset * 42
            const translateX = offset * 52
            const scale = isActive ? 1 : 0.72
            const zIndex = isActive ? 10 : 5 - absOffset
            const opacity = isActive ? 1 : 0.5

            return (
              <motion.div
                key={photo.src}
                onClick={() => handleClick(i)}
                animate={{ rotateY, x: `${translateX}%`, scale, opacity, zIndex }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  width: 240,
                  height: 300,
                  cursor: isActive ? "zoom-in" : "pointer",
                  borderRadius: 20,
                  border: isActive ? "2px solid rgba(225,29,72,0.55)" : "2px solid rgba(255,255,255,0.06)",
                  boxShadow: isActive
                    ? "0 0 40px rgba(225,29,72,0.3), 0 20px 60px rgba(0,0,0,0.6)"
                    : "0 10px 30px rgba(0,0,0,0.4)",
                  overflow: "hidden",
                }}
              >
                <img src={photo.src} alt={photo.caption} className="absolute inset-0 w-full h-full object-cover" />
                {/* Overlay caption */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 px-4 py-3"
                    style={{
                      background: "linear-gradient(to top, rgba(10,10,18,0.9) 0%, transparent 100%)",
                    }}
                  >
                    <p
                      className="text-sm text-center font-medium"
                      style={{ color: "#fda4af", fontFamily: "Inter, sans-serif" }}
                    >
                      {photo.caption}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-6 mb-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? 20 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === activeIndex ? "#e11d48" : "rgba(255,255,255,0.2)",
                border: "none",
                transition: "all 0.3s ease",
                minWidth: 8,
              }}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.8 }}
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            ref={btnRef}
            onClick={handleBtnClick}
            className="shimmer-sweep relative overflow-hidden px-10 py-4 rounded-full font-semibold text-lg text-white glow-rose"
            style={{
              background: "linear-gradient(135deg, #e11d48, #d946ef)",
              minWidth: 260,
              minHeight: 56,
              fontFamily: "Inter, sans-serif",
              transition: "transform 0.2s ease",
            }}
          >
            <span className="relative z-10">Why I Love You 💝</span>
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={SPRING}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", maxWidth: 480, width: "100%", borderRadius: 20, overflow: "hidden" }}
            >
              <img
                src={photos[activeIndex].src}
                alt={photos[activeIndex].caption}
                width={480}
                height={600}
                className="object-cover w-full rounded-2xl"
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-4 text-center"
                style={{ background: "linear-gradient(to top, rgba(10,10,18,0.95) 0%, transparent 100%)" }}
              >
                <p className="font-medium" style={{ color: "#fda4af", fontFamily: "Inter, sans-serif" }}>
                  {photos[activeIndex].caption}
                </p>
              </div>
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ background: "rgba(225,29,72,0.7)", minWidth: 40, minHeight: 40 }}
                aria-label="Close lightbox"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenContainer>
  )
}
