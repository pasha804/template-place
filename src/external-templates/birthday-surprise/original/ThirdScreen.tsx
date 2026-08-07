// @ts-nocheck
"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow } from "swiper/modules"
import { Heart, Sparkles, X } from "lucide-react"
import "swiper/css"
import "swiper/css/effect-coverflow"

const darkBg = {
  background: "radial-gradient(ellipse at 50% 0%, #3d0000 0%, #1a0000 45%, #000 100%)",
}

const DEFAULT_PHOTOS = [
  { src: "/templates/birthday-surprise/images/1.jpg", alt: "Memory 1" },
  { src: "/templates/birthday-surprise/images/2.jpg", alt: "Memory 2" },
  { src: "/templates/birthday-surprise/images/3.jpg", alt: "Memory 3" },
  { src: "/templates/birthday-surprise/images/4.jpg", alt: "Memory 4" },
]

export default function ThirdScreen({ onNext, heading, photos: photoPaths }) {
  const photos = photoPaths && photoPaths.length > 0
    ? photoPaths.map((src, i) => ({ src, alt: `Memory ${i + 1}` }))
    : DEFAULT_PHOTOS
  const [lightbox,   setLightbox]   = useState(null)
  const [activeIdx,  setActiveIdx]  = useState(0)
  const swiperRef = useRef(null)

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8 relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(160,0,0,0.3) 0%, transparent 70%)", filter: "blur(45px)" }} />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + (i % 2), height: 2 + (i % 2),
            left: `${6 + i * 9}%`, top: `${10 + (i % 5) * 18}%`,
            background: "rgba(200,30,30,0.38)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="text-center mb-6 px-6 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-black" style={{ color: "rgba(255,255,255,0.92)" }}>
          {heading || "Special Memories"}
        </h2>
        <p className="text-[11px] tracking-[0.22em] mt-1" style={{ color: "rgba(255,130,130,0.45)" }}>
          swipe for more ✦
        </p>
      </motion.div>

      {/* ── Coverflow Swiper — matches the reference 3-card fan ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}
        className="w-full relative z-10"
        style={{ maxWidth: 480 }}
      >
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={2.2}
          initialSlide={0}
          coverflowEffect={{
            rotate:       28,
            stretch:      0,
            depth:        130,
            modifier:     1.4,
            slideShadows: true,
          }}
          modules={[EffectCoverflow]}
          onSwiper={swiper => { swiperRef.current = swiper }}
          onSlideChange={swiper => setActiveIdx(swiper.realIndex)}
          className="dark-memories-swiper"
          style={{ paddingTop: 10, paddingBottom: 10 }}
        >
          {photos.map((photo, idx) => (
            <SwiperSlide key={idx}>
              {({ isActive }) => (
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: 260,
                    borderRadius: 20,
                    border: `1px solid rgba(200,0,0,${isActive ? "0.6" : "0.22"})`,
                    boxShadow: isActive
                      ? "0 0 35px rgba(170,0,0,0.55), 0 20px 45px rgba(0,0,0,0.75)"
                      : "0 0 12px rgba(130,0,0,0.18), 0 10px 26px rgba(0,0,0,0.6)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (isActive) setLightbox(idx)
                    else swiperRef.current?.slideTo(idx)
                  }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />

                  {/* gradient overlay */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.65) 100%)" }} />

                  {/* corner heart */}
                  <div className="absolute top-2.5 right-2.5"
                    style={{ color: `rgba(220,60,60,${isActive ? 0.85 : 0.45})` }}>
                    <Heart size={isActive ? 13 : 10} fill="currentColor" />
                  </div>

                  {/* "tap to view" badge on active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2"
                      >
                        <span className="text-[9px] tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap"
                          style={{
                            background: "rgba(160,0,0,0.72)",
                            color: "rgba(255,200,200,0.92)",
                            border: "1px solid rgba(255,100,100,0.28)",
                          }}>
                          ✦ tap to view ✦
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* dim non-active */}
                  {!isActive && (
                    <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.32)" }} />
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-4 mb-6 relative z-10">
        {photos.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => swiperRef.current?.slideTo(i)}
            animate={{
              width:      i === activeIdx ? 22 : 6,
              background: i === activeIdx ? "rgba(200,40,40,0.9)" : "rgba(255,255,255,0.18)",
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>

      {/* Next button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative px-10 py-4 text-lg font-semibold rounded-full overflow-hidden z-10"
        style={{
          background: "linear-gradient(135deg, rgba(160,0,0,0.9) 0%, rgba(90,0,0,0.95) 100%)",
          border: "1px solid rgba(255,100,100,0.28)",
          boxShadow: "0 0 25px rgba(160,0,0,0.35), 0 10px 30px rgba(0,0,0,0.5)",
          color: "rgba(255,210,210,0.95)",
        }}
      >
        <span className="flex items-center gap-2">
          <Sparkles size={17} />
          Write... message
        </span>
      </motion.button>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.93)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.65, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(150,0,0,0.95)", border: "1px solid rgba(255,80,80,0.35)" }}>
                <X size={14} style={{ color: "rgba(255,180,180,0.9)" }} />
              </button>

              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                className="w-full rounded-2xl object-cover"
                style={{
                  boxShadow: "0 0 55px rgba(190,0,0,0.4), 0 25px 55px rgba(0,0,0,0.8)",
                  border: "1px solid rgba(170,0,0,0.35)",
                }}
              />

              {/* prev / next inside lightbox */}
              <div className="flex justify-between mt-3 px-1">
                <button
                  onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}
                  className="text-sm px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(110,0,0,0.75)", color: "rgba(255,170,170,0.85)", border: "1px solid rgba(180,0,0,0.3)" }}>
                  ← prev
                </button>
                <span className="text-xs self-center" style={{ color: "rgba(255,120,120,0.38)" }}>
                  {lightbox + 1} / {photos.length}
                </span>
                <button
                  onClick={() => setLightbox((lightbox + 1) % photos.length)}
                  className="text-sm px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(110,0,0,0.75)", color: "rgba(255,170,170,0.85)", border: "1px solid rgba(180,0,0,0.3)" }}>
                  next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
