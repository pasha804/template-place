// @ts-nocheck
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function GlowButton({ children, onClick, variant = "solid", className = "", ariaLabel, type: btnType = "button" }: {
  children: ReactNode; onClick?: () => void; variant?: "solid"|"ghost"; className?: string; ariaLabel?: string; type?: "button"|"submit"
}) {
  return (
    <motion.button
      type={btnType}
      onClick={onClick}
      aria-label={ariaLabel}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 font-sans text-xs font-semibold tracking-[0.22em] uppercase ${className}`}
      style={variant === "solid"
        ? { backgroundImage: "var(--ct-gradient-gold)", boxShadow: "var(--ct-shadow-gold)", color: "var(--ct-primary-fg)" }
        : { background: "oklch(0.22 0.05 158 / 45%)", backdropFilter: "blur(18px)", border: "1px solid var(--ct-border)", color: "var(--ct-foreground)" }
      }
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" style={{ background: "oklch(0.98 0.02 90 / 35%)" }} />
    </motion.button>
  )
}
