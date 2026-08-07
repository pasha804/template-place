// @ts-nocheck
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { Plus } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

const FAQ = [
  {
    q: "When should I RSVP by?",
    a: "Kindly respond no later than November 1, 2026 so we can finalise seating and catering with the venue.",
  },
  {
    q: "Can I bring a plus one?",
    a: "Invitations include the names of everyone invited. If your invitation says 'and guest', we would love to meet them.",
  },
  {
    q: "Are children welcome?",
    a: "We adore your little ones. The ceremony is adults-only, but children are very welcome at the reception.",
  },
  {
    q: "Is there parking at the venue?",
    a: "Yes — complimentary valet parking is available at both the Royal Garden Palace and the Grand Ballroom.",
  },
  {
    q: "What is the dress code exactly?",
    a: "Formal or black-tie optional. Think neutrals, pastels and gold accents. Please avoid pure white.",
  },
  {
    q: "Will the events be indoors or outdoors?",
    a: "The ceremony is in a covered garden pavilion and the reception is fully indoors. December evenings are cool, so bring a wrap.",
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-cream text-charcoal">
      <div className="relative mx-auto max-w-3xl px-6 sm:px-10">
        <SectionTitle
          tone="light"
          eyebrow="Chapter Nine"
          script="Questions & Answers"
          title="Everything you need to know"
        />

        <div className="mt-14 divide-y divide-gold/25 border-y border-gold/25">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-display text-base transition-colors duration-500 sm:text-lg ${
                        isOpen ? "text-navy-deep" : "text-charcoal/85"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-charcoal/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
