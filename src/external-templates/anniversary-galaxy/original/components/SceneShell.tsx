// @ts-nocheck
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function SceneShell({ title, subtitle, children, footerSlot, className = "" }: {
  title: string
  subtitle?: ReactNode
  children: ReactNode
  footerSlot?: ReactNode
  className?: string
}) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center px-5 py-8 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="script gradient-text leading-tight"
        style={{ fontSize: "clamp(2.5rem,8vw,4.5rem)" }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 h-px w-32"
        style={{ backgroundImage: "var(--gradient-aurora)" }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          className="mt-4 max-w-xl text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--muted-foreground)" }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`mt-8 flex w-full flex-1 flex-col items-center justify-center ${className}`}
      >
        {children}
      </motion.div>
      {footerSlot && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-7 flex flex-col items-center gap-3"
        >
          {footerSlot}
        </motion.div>
      )}
    </div>
  )
}
