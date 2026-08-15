import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  onClick?: () => void;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
}

export function GlowButton({
  onClick,
  children,
  icon,
  variant = "primary",
  className = "",
  disabled = false,
}: GlowButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none ${
        isPrimary
          ? "bg-[image:var(--gradient-pink)] text-primary-foreground shadow-[var(--shadow-glow)]"
          : "glass text-foreground hover:border-primary/60"
      } ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
    </motion.button>
  );
}
