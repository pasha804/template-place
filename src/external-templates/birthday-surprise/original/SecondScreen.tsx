// @ts-nocheck
"use client"

import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Pagination } from "swiper/modules"
import { Heart, Star, Smile, Sun, Gift, ArrowRight, Cake } from "lucide-react"
import "swiper/css"
import "swiper/css/effect-cards"
import "swiper/css/pagination"

const darkBg = {
  background: "radial-gradient(ellipse at 50% 0%, #3d0000 0%, #1a0000 45%, #000 100%)",
}

export default function SecondScreen({ onNext, heading, wishes }) {
  const birthdayCards = (wishes && wishes.length > 0 ? wishes : [
    { text: "Wishing you a day as bright and beautiful as your smile — Happy Birthday!", icon: Sun },
    { text: "May this birthday bring you all the love, laughter, and joy you deserve!",  icon: Heart },
    { text: "Another year older, another year more amazing. You just keep getting better!", icon: Star },
    { text: "You make everyone around you happier just by existing. Today we celebrate YOU!", icon: Smile },
    { text: "Today is YOUR day — make a wish, eat the cake, and let yourself be celebrated!", icon: Cake },
  ]).map((item, i) => {
    const icons = [Sun, Heart, Star, Smile, Cake, Gift]
    const bgs = [
      "linear-gradient(135deg, rgba(140,0,0,0.9) 0%, rgba(80,0,0,0.95) 100%)",
      "linear-gradient(135deg, rgba(120,0,40,0.9) 0%, rgba(70,0,20,0.95) 100%)",
      "linear-gradient(135deg, rgba(100,0,60,0.9) 0%, rgba(60,0,40,0.95) 100%)",
      "linear-gradient(135deg, rgba(160,20,0,0.9) 0%, rgba(90,10,0,0.95) 100%)",
      "linear-gradient(135deg, rgba(130,0,20,0.9) 0%, rgba(70,0,10,0.95) 100%)",
    ]
    const borders = ["rgba(220,60,60,0.4)","rgba(200,50,80,0.4)","rgba(180,40,100,0.4)","rgba(230,80,40,0.4)","rgba(210,40,60,0.4)"]
    return { text: typeof item === 'string' ? item : item.text, icon: typeof item === 'string' ? icons[i % icons.length] : (item.icon || icons[i % icons.length]), bg: bgs[i % bgs.length], border: borders[i % borders.length] }
  })


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden" style={{ background: "transparent" }}>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(160,0,0,0.3) 0%, transparent 70%)", filter: "blur(45px)" }} />

      {/* Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`,
            left: `${8 + i * 8.5}%`, top: `${12 + (i % 4) * 20}%`,
            background: "rgba(200,30,30,0.4)",
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-10 relative z-10"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-3"
          style={{ color: "rgba(220,60,60,0.85)" }}
        >
          <Gift size={40} />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
          {heading || "Birthday wishes"}
        </h2>
        <p className="text-sm tracking-widest mt-1" style={{ color: "rgba(255,130,130,0.5)", letterSpacing: "0.2em" }}>
          ✦ just for you ✦
        </p>
      </motion.div>

      {/* Cards swiper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="w-full max-w-xs mb-10 relative z-10"
      >
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards, Pagination]}
          pagination={{ dynamicBullets: true }}
          className="w-full h-72 dark-cards-swiper"
          cardsEffect={{ perSlideOffset: 7, perSlideRotate: 2, rotate: true, slideShadows: true }}
        >
          {birthdayCards.map((card, idx) => {
            const Icon = card.icon
            return (
              <SwiperSlide key={idx} className="rounded-3xl overflow-hidden">
                <div className="w-full h-full rounded-3xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden"
                  style={{ background: card.bg, border: `1px solid ${card.border}`, boxShadow: `0 0 30px rgba(180,0,0,0.3)` }}>
                  {/* Top shimmer */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />

                  <motion.div
                    className="mb-5 p-3 rounded-full"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,180,180,0.9)" }}
                    animate={{ y: [-4, 4, -4], scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon size={28} strokeWidth={2} />
                  </motion.div>

                  <p className="text-base font-medium leading-relaxed relative z-10"
                    style={{ color: "rgba(255,220,220,0.9)" }}>
                    {card.text}
                  </p>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </motion.div>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="relative px-10 py-4 text-lg font-semibold rounded-full overflow-hidden z-10"
        style={{
          background: "linear-gradient(135deg, rgba(160,0,0,0.9) 0%, rgba(90,0,0,0.95) 100%)",
          border: "1px solid rgba(255,100,100,0.3)",
          boxShadow: "0 0 25px rgba(160,0,0,0.35), 0 10px 30px rgba(0,0,0,0.5)",
          color: "rgba(255,210,210,0.95)",
        }}
      >
        <span className="flex items-center gap-2">
          There&apos;s more!
          <ArrowRight size={18} />
        </span>
      </motion.button>
    </div>
  )
}
