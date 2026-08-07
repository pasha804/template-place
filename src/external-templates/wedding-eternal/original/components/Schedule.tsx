// @ts-nocheck
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "./SectionTitle"

const SCHEDULE = [
  { time: "2:00 PM", title: "Ceremony Begins", detail: "Guests seated, doors close" },
  { time: "3:30 PM", title: "Cocktail Hour", detail: "Garden terrace & live strings" },
  { time: "5:00 PM", title: "Reception", detail: "Grand entrance of the couple" },
  { time: "6:00 PM", title: "Dinner Service", detail: "Five-course seated dinner" },
  { time: "7:30 PM", title: "Speeches & Toasts", detail: "Words from family & friends" },
  { time: "9:00 PM", title: "Dancing & Party", detail: "Until the last song plays" },
]

export function Schedule() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section-pad relative overflow-hidden bg-navy-abyss">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <SectionTitle
          eyebrow="The Day"
          script="Wedding Day Schedule"
          title="Hour by hour"
        />

        <ol ref={ref} className="relative mt-16 pl-10 sm:pl-16">
          <div className="absolute left-[7px] top-0 h-full w-px bg-gold/12 sm:left-[15px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-[7px] top-0 h-full w-px origin-top bg-gold shadow-[0_0_16px_var(--gold)] sm:left-[15px]"
          />

          {SCHEDULE.map((s, i) => (
            <motion.li
              key={s.time}
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group relative pb-11 last:pb-0"
            >
              <span className="absolute -left-10 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-gold/60 bg-navy-abyss sm:-left-16">
                <span className="h-1.5 w-1.5 rounded-full bg-gold transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_14px_var(--gold)]" />
              </span>

              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-xl text-gold tabular-nums">{s.time}</span>
                <h3 className="font-display text-lg font-light tracking-[0.14em] text-ivory uppercase">
                  {s.title}
                </h3>
              </div>
              <p className="mt-1.5 text-[0.82rem] text-ivory/55">{s.detail}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
