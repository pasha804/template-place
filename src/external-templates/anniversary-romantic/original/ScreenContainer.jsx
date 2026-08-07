"use client"

import { motion } from "framer-motion"

export default function ScreenContainer({ children, className = "" }) {
  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center p-4 relative z-10 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
