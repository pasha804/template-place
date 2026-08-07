// @ts-nocheck
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "./SectionTitle"

const revealItem = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
  },
}

const DEFAULT_STORY = [
  {
    title: "First Meeting",
    date: "June 12, 2018",
    text: "A quiet conversation at a friend's dinner that neither of them expected to remember — and neither could forget.",
    imageUrl: "/templates/wedding-eternal/story-1.jpg",
  },
  {
    title: "First Date",
    date: "July 20, 2018",
    text: "Lanterns, long walks and a dinner that ended at sunrise. That night the future quietly rearranged itself.",
    imageUrl: "/templates/wedding-eternal/story-2.jpg",
  },
  {
    title: "The Proposal",
    date: "December 24, 2023",
    text: "One ring, one question, and a silence so full of joy that words arrived far too late.",
    imageUrl: "/templates/wedding-eternal/story-3.jpg",
  },
  {
    title: "The Engagement",
    date: "January 15, 2024",
    text: "Two families became one under a sky of city lights, and a promise became a plan.",
    imageUrl: "/templates/wedding-eternal/story-4.jpg",
  },
]

export function Timeline({ story }: { story?: Array<{ title: string; date?: string; text?: string; imageUrl?: string; image?: string }> }) {
  const items = (story && story.length > 0) ? story : DEFAULT_STORY
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="story" className="section-pad relative overflow-hidden bg-navy-abyss">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.4fr)] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <SectionTitle
              align="left"
              eyebrow="Chapter One"
              script="Our Story"
              title="A journey of love"
              subtitle="Friendship first, then everything else — four moments that quietly built a lifetime together."
            />
          </div>

          <div ref={ref} className="relative">
            <div className="absolute left-[13px] top-2 h-full w-px bg-gold/12 md:left-0 md:top-[13px] md:h-px md:w-full" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute left-[13px] top-2 hidden h-full w-px origin-top bg-linear-to-b from-gold via-gold/70 to-transparent shadow-[0_0_18px_var(--gold)] max-md:block"
            />
            <motion.div
              style={{ scaleX: lineScale }}
              className="absolute left-0 top-[13px] hidden h-px w-full origin-left bg-linear-to-r from-gold via-gold/70 to-transparent shadow-[0_0_18px_var(--gold)] md:block"
            />

            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ show: { transition: { staggerChildren: 0.16 } } }}
              className="grid gap-10 pl-12 md:grid-cols-2 md:gap-8 md:pl-0 md:pt-14 xl:grid-cols-4"
            >
              {items.map((s, idx) => (
                <motion.li key={s.title || idx} variants={revealItem} className="group relative">
                  <span className="absolute -left-[46px] top-1 h-[26px] w-[26px] rounded-full border border-gold/60 bg-navy-abyss md:-top-[52px] md:left-0">
                    <span className="absolute inset-[6px] rounded-full bg-gold shadow-[0_0_16px_var(--gold)] transition-transform duration-500 group-hover:scale-125" />
                  </span>

                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="glass-card overflow-hidden rounded-sm transition-shadow duration-700 group-hover:shadow-[var(--shadow-gold)]"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      <img
                        src={s.imageUrl || s.image || `/templates/wedding-eternal/story-${(idx % 4) + 1}.jpg`}
                        alt={s.title}
                        loading="lazy"
                        width={800}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-navy-abyss via-navy-abyss/25 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl text-ivory">{s.title}</h3>
                      {s.date && (
                        <p className="mt-1 text-[0.65rem] tracking-[0.25em] text-gold uppercase">
                          {s.date}
                        </p>
                      )}
                      <p className="mt-3 text-[0.82rem] leading-relaxed text-ivory/65">{s.text}</p>
                    </div>
                  </motion.article>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  )
}
