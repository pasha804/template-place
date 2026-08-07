"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, ArrowRight, X, ZoomIn } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"

const PHOTOS = [
  { id: 1, src: "/templates/birthday-aurora/images/1.jpg", caption: "That beautiful smile ✨" },
  { id: 2, src: "/templates/birthday-aurora/images/2.jpg", caption: "A moment to treasure forever 💕" },
  { id: 3, src: "/templates/birthday-aurora/images/3.jpg", caption: "Pure magic in a frame 🌸" },
  { id: 4, src: "/templates/birthday-aurora/images/4.jpg", caption: "Every moment with you is golden 💛" },
]

function Lightbox({ photo, onClose }) {
  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          {/* Close button */}
          <motion.button
            className="absolute top-5 right-5 z-10 glass w-11 h-11 rounded-full flex items-center justify-center min-w-[44px] min-h-[44px]"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>

          {/* Image */}
          <motion.div
            className="relative z-10 max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            onClick={e => e.stopPropagation()}
            style={{ boxShadow: "0 0 60px rgba(217,70,239,0.3), 0 20px 60px rgba(0,0,0,0.6)" }}
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="block max-w-[88vw] max-h-[80vh] w-auto h-auto object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
              <p className="text-white/80 text-sm font-cute">{photo.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function PhotoGallery({ onNext, photos: propPhotos }) {
  const photos = propPhotos && propPhotos.length > 0 ? propPhotos.map((src, i) => ({ id: i+1, src, caption: PHOTOS[i%PHOTOS.length].caption })) : PHOTOS;
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  const openLightbox = useCallback((photo) => {
    if (navigator.vibrate) navigator.vibrate(20)
    setLightboxPhoto(photo)
  }, [])

  return (
    <>
      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />

      <motion.div
        className="min-h-screen flex flex-col items-center justify-center p-4 pb-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7 }}
        key="gallery"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="glass w-18 h-18 rounded-2xl flex items-center justify-center mx-auto mb-5 p-4"
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "0 0 25px rgba(225,29,72,0.2)" }}
          >
            <Camera className="w-9 h-9 text-pink-400" />
          </motion.div>

          <h1 className="font-heading text-4xl md:text-6xl font-bold animated-gradient-text py-2 mb-3">
            Moments with You
          </h1>
          <p className="text-white/50 text-base">Beautiful memories with Madam Jii 📸</p>
        </motion.div>

        {/* Coverflow Swiper */}
        <motion.div
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
        >
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 40,
              stretch: 0,
              depth: 120,
              modifier: 1.2,
              slideShadows: true,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSlideChange={s => setActiveIndex(s.activeIndex)}
            className="pb-10"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            {photos.map((photo, index) => (
              <SwiperSlide
                key={photo.id}
                style={{ width: "clamp(240px, 65vw, 360px)" }}
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    className="photo-slide relative overflow-hidden rounded-2xl cursor-zoom-in"
                    style={{
                      aspectRatio: "4/5",
                      width: "100%",
                      border: index === activeIndex
                        ? "2px solid rgba(236,72,153,0.5)"
                        : "2px solid transparent",
                      boxShadow: index === activeIndex
                        ? "0 0 30px rgba(217,70,239,0.25), 0 8px 32px rgba(0,0,0,0.4)"
                        : "0 8px 24px rgba(0,0,0,0.35)",
                      transform: index === activeIndex ? "scale(1.02)" : "scale(1)",
                      transition: "all 0.4s ease",
                    }}
                    onClick={() => index === activeIndex && openLightbox(photo)}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {/* Zoom hint on active */}
                    {index === activeIndex && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <ZoomIn className="w-8 h-8 text-white/0 group-hover:text-white/80 transition-colors" />
                      </motion.div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
                  </motion.div>

                  {/* Caption */}
                  <motion.p
                    className="text-center text-sm text-white/60 font-cute px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === activeIndex ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {photo.caption}
                  </motion.p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Tap hint */}
        <motion.p
          className="text-white/30 text-xs mb-6 -mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Tap the active photo to view full screen
        </motion.p>

        {/* Next button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.button
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(30)
              onNext()
            }}
            className="relative overflow-hidden rounded-full text-white text-lg font-semibold px-10 py-4 min-h-[52px]"
            style={{
              background: "linear-gradient(135deg, #e11d48, #d946ef, #6366f1)",
              boxShadow: "0 0 28px rgba(217,70,239,0.3), 0 4px 16px rgba(0,0,0,0.3)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative z-10 flex items-center gap-2">
              More Surprises
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  )
}
