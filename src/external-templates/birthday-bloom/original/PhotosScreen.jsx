"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Mail } from "lucide-react"
import Button from "./Button"

const DEFAULT_PHOTOS = [
  "/templates/birthday-bloom/images/1.jpg",
  "/templates/birthday-bloom/images/2.jpg",
  "/templates/birthday-bloom/images/3.jpg",
  "/templates/birthday-bloom/images/4.jpg",
]

export default function PhotosScreen({ onNext, photos: propPhotos, title: photosTitle }) {
  const photos = (propPhotos && propPhotos.length > 0) ? propPhotos : DEFAULT_PHOTOS

  return (
    <div className="bg-[#fff8fc] p-7 rounded-[60px] drop-shadow-2xl min-w-48 w-full max-w-110 relative flex flex-col items-center gap-4 my-10">
      <div
        className="text-center">
        <h2
          className="text-2xl md:text-3xl font-semibold text-accent"
        >
          {photosTitle || "Some Sweet Moments"}
        </h2>
        <p className="text-sm text-accent/70 mt-1">(Swipe for more)</p>
      </div>

      <div className="relative p-6 bg-linear-to-b from-white/80 to-violet-200 w-full rounded-[40px] flex items-end justify-center shadow-inner">

        <div>
          <Swiper
            effect="fade"
            modules={[EffectFade, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-53.75 h-70 md:w-59.25 md:h-77.5"
          >
            {photos.map((src, i) => (
              <SwiperSlide key={i}>
                <motion.div
                  className="h-full w-full rounded-3xl"
                >

                  <div className="relative h-full w-full rounded-2xl overflow-hidden ">

                    {/* Image */}
                    <img
                      loading="lazy"
                      src={src}
                      alt={`Memory ${i + 1}`}
                      className="h-full w-full rounded-2xl object-contain"
                    />
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div
        className="mt-4 flex justify-center"
      >
        <Button onClick={onNext} className="bg-[#ddd6ff] text-accent">
          <Mail size={18} /> Open My Message
        </Button>
      </div>
    </div >
  )
}
