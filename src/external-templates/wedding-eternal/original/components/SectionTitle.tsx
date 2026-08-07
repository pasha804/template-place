// @ts-nocheck
import { motion } from "framer-motion"

export function SectionTitle({
  eyebrow,
  script,
  title,
  subtitle,
  tone = "dark",
  align = "center",
}: {
  eyebrow?: string
  script?: string
  title?: string
  subtitle?: string
  tone?: "dark" | "light"
  align?: "center" | "left"
}) {
  const muted = tone === "dark" ? "text-ivory/60" : "text-charcoal/70"
  const heading = tone === "dark" ? "text-ivory" : "text-navy-deep"

  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.9em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.42em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className={`text-[0.62rem] uppercase tracking-luxe ${muted}`}
        >
          {eyebrow}
        </motion.p>
      )}
      {script && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-script text-gold-gradient mt-3 text-4xl leading-[1.2] sm:text-6xl"
        >
          {script}
        </motion.p>
      )}
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
          className={`mt-2 text-2xl font-light tracking-[0.18em] uppercase sm:text-[1.7rem] ${heading}`}
        >
          {title}
        </motion.h2>
      )}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
        className={`gold-rule mt-6 h-px w-40 ${align === "center" ? "mx-auto" : ""}`}
      />
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.35 }}
          className={`mx-auto mt-6 max-w-xl text-sm leading-relaxed ${muted} ${
            align === "center" ? "" : "mx-0"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
