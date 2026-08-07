"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function GiftPage() {
  const [giftOpened, setGiftOpened] = useState(false)
  const [showSurprise, setShowSurprise] = useState(false)

  const openGift = () => {
    setGiftOpened(true)
    setTimeout(() => {
      setShowSurprise(true)
    }, 1200)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Floating cute elements */}
      <motion.div
        className="absolute top-40 md:top-20 left-8 text-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 20, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        🎁
      </motion.div>

      <motion.div
        className="absolute md:top-32 right-10 text-xl"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      >
        ✨
      </motion.div>

      <motion.h2
        layout
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 1 }}
        className="text-3xl text-pink-300 mb-16"
      >
        I have something special for you... 💝
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {!giftOpened ? (
            <motion.div
              key="gift-box"
              exit={{
                scale: 0,
                opacity: 0,
                y: -50,
              }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="cursor-pointer group relative"
              onClick={openGift}
            >
              {/* Cute glow around gift */}
              <div className="absolute inset-0 w-56 h-56 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl scale-110 group-hover:scale-120 transition-transform duration-300"></div>

              <motion.img
                src="/templates/sorry-teddy/gifs/gift.gif"
                alt="Gift box"
                className="w-56 h-56 mx-auto relative z-10 drop-shadow-2xl"
                animate={{
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.p
                animate={{
                  y: [0, -3, 0],
                  textShadow: [
                    "0 0 10px rgba(236, 72, 153, 0.5)",
                    "0 0 20px rgba(236, 72, 153, 0.8)",
                    "0 0 10px rgba(236, 72, 153, 0.5)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="text-pink-200 mt-6 text-xl relative z-10"
              >
                Click to open!🎁✨
              </motion.p>

              {/* Floating sparkles around gift */}
              <motion.div
                className="absolute -top-2 -right-2 text-lg"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                ⭐
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="opened-gift"
              initial={{ scale: 0, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-12"
            >
              <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full"
              >
                {/* Beautiful aura around flower teddy */}
                <div className="absolute w-64 h-64 mx-auto inset-0 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full blur-2xl scale-110"></div>

                <img
                  src="/templates/sorry-teddy/gifs/teddy-giving-flower.gif"
                  alt="Teddy giving flower"
                  className="w-52 mx-auto relative z-10 drop-shadow-2xl"
                />

                {/* Floating elements around teddy */}
                <motion.div
                  className="absolute -top-3 -right-3 text-xl"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  🌸
                </motion.div>

                <motion.div
                  className="absolute -bottom-2 -left-2 text-lg"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 1,
                  }}
                >
                  💕
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {showSurprise && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="space-y-8 max-w-lg"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="text-2xl text-pink-300 leading-relaxed"
                    >
                      This flower will never wilt...🌹
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-lg text-purple-200 leading-relaxed"
                    >
                      Just like my love for you. I promise to cherish you every single day, and never take your
                      beautiful heart for granted again.💖
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="text-xl text-pink-200"
                    >
                      You mean everything to me💕✨
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced floating animation with more variety */}
      {giftOpened && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
                y: (typeof window !== "undefined" ? window.innerHeight : 600) + 50,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: -150,
                opacity: [0, 0.8, 0.8, 0],
                scale: [0, 1.5, 1, 0.5],
                rotate: 360,
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
              }}
              transition={{
                duration: 5,
                delay: Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute text-2xl z-40"
              style={{
                filter: "drop-shadow(0 0 10px rgba(236, 72, 153, 0.6))",
              }}
            >
              {["💖", "🌸", "💕", "🌺", "💝", "🌹", "✨"][Math.floor(Math.random() * 7)]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
