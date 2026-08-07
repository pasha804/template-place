"use client"

import { motion } from "framer-motion"

export default function HugScreen({ hugMessage, hugTitle }) {
  const message = hugMessage || "Sending you the warmest hugs! \u2764\uFE0F"
  return (
    <div className="flex flex-col items-center gap-8 min-w-48 w-full max-w-lg my-10">
      {hugTitle && (
        <h2 className="text-2xl md:text-3xl font-semibold text-primary text-center">
          {hugTitle}
        </h2>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden drop-shadow-xl bg-[#fff8fc] flex items-center justify-center"
        >
          <img
            src="/templates/birthday-bloom/gifs/hug.gif"
            alt="hug"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden drop-shadow-xl bg-[#fff8fc] flex items-center justify-center"
        >
          <img
            src="/templates/birthday-bloom/gifs/back-hug.gif"
            alt="back hug"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-lg md:text-xl text-center text-primary font-medium px-4"
      >
        {message}
      </motion.p>
    </div>
  )
}
