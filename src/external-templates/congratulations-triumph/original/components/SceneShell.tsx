// @ts-nocheck
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export function SceneShell({ title, subtitle, children, footer, className = "" }: {
  title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode; className?: string
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto w-full max-w-6xl px-5 py-10 text-center sm:px-8 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.7 }}
        className="ct-gradient-text ct-font-script text-3xl font-semibold leading-tight sm:text-5xl"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mx-auto mt-4 h-px w-40 origin-center"
        style={{ backgroundImage: "var(--ct-gradient-gold)" }}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="ct-font-serif mx-auto mt-5 max-w-2xl text-lg sm:text-xl"
          style={{ color: "var(--ct-muted-fg)" }}
        >
          {subtitle}
        </motion.p>
      )}
      <div className="mt-10">{children}</div>
      {footer && <div className="mt-12 flex flex-wrap items-center justify-center gap-4">{footer}</div>}
    </motion.section>
  )
}
