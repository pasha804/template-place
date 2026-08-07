"use client"

import { motion } from "framer-motion"

/**
 * PremiumButton — reusable premium gradient button
 * Props: onClick, children, variant ("primary" | "gold" | "secondary"), className, delay
 */
export default function PremiumButton({
  onClick,
  children,
  variant = "primary",
  className = "",
  delay = 0,
  disabled = false,
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #ec4899, #7c3aed, #ec4899)",
      backgroundSize: "200% 200%",
      boxShadow: "0 0 30px rgba(236,72,153,0.5), 0 4px 20px rgba(0,0,0,0.3)",
    },
    gold: {
      background: "linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)",
      backgroundSize: "200% 200%",
      boxShadow: "0 0 30px rgba(251,191,36,0.5), 0 4px 20px rgba(0,0,0,0.3)",
    },
    secondary: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.15)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
  }

  const hoverShadow = {
    primary: "0 0 55px rgba(236,72,153,0.75), 0 4px 20px rgba(0,0,0,0.4)",
    gold: "0 0 55px rgba(251,191,36,0.75), 0 4px 20px rgba(0,0,0,0.4)",
    secondary: "0 0 20px rgba(255,255,255,0.15), 0 4px 20px rgba(0,0,0,0.3)",
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, boxShadow: styles[variant].boxShadow }}
      whileHover={{ scale: 1.07, boxShadow: hoverShadow[variant] }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 300, damping: 20 }}
      className={`
        relative overflow-hidden
        px-8 py-4
        rounded-full
        text-white font-bold text-lg
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={styles[variant]}
    >
      {/* Shimmer sweep */}
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s infinite",
        }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )
}
