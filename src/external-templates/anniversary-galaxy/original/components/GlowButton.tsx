// @ts-nocheck
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function GlowButton({ children, onClick, icon, variant = "solid", className = "" }: {
  children: ReactNode
  onClick?: () => void
  icon?: ReactNode
  variant?: "solid" | "ghost"
  className?: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3 text-sm tracking-[0.14em] uppercase ${className}`}
      style={variant === "solid"
        ? { backgroundImage: "var(--gradient-pink)", color: "var(--primary-foreground)", boxShadow: "var(--shadow-glow)" }
        : { background: "var(--glass-bg,oklch(0.72 0.18 340/0.1))", border: "1px solid oklch(0.8 0.16 340/0.28)", color: "var(--foreground)" }
      }
    >
      <span className="absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full" style={{ background: "linear-gradient(90deg,transparent,oklch(1 0 0/0.35),transparent)" }} />
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  )
}
