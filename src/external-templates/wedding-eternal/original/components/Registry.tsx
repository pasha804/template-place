// @ts-nocheck
import { motion } from "framer-motion"
import { ArrowUpRight, Gift, Plane, ShoppingBag, Wallet } from "lucide-react"
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

const REGISTRY = [
  {
    name: "Amazon Registry",
    desc: "Everyday pieces for a home that is only just beginning.",
    action: "View Registry",
    url: "https://www.amazon.com/wedding",
  },
  {
    name: "Target Registry",
    desc: "Thoughtful essentials, hand-picked by the two of us.",
    action: "View Registry",
    url: "https://www.target.com/gift-registry",
  },
  {
    name: "Honeymoon Fund",
    desc: "Send us somewhere with salt air and a very slow sunrise.",
    action: "Contribute",
    url: "#rsvp",
  },
  {
    name: "Cash Gift",
    desc: "For the quiet, unglamorous, wonderful business of starting out.",
    action: "Send a Gift",
    url: "#rsvp",
  },
]

const ICONS = [ShoppingBag, Gift, Plane, Wallet]

export function Registry() {
  return (
    <section id="registry" className="section-pad relative overflow-hidden bg-cream text-charcoal">
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          tone="light"
          eyebrow="Chapter Six"
          script="Gift Registry"
          title="Your presence is the gift"
          subtitle="Truly — nothing else is expected. But if you would like to mark the day with something, here are a few gentle suggestions."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {REGISTRY.map((r, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.a
                key={r.name}
                href={r.url}
                target={r.url.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                variants={revealItem}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="glass-card-light group relative flex flex-col rounded-sm p-7 transition-shadow duration-700 hover:shadow-[0_0_50px_-18px_var(--gold)]"
              >
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.1} aria-hidden />
                <h3 className="font-display mt-5 text-xl text-navy-deep">{r.name}</h3>
                <p className="mt-3 flex-1 text-[0.82rem] leading-relaxed text-charcoal/70">{r.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.62rem] tracking-[0.22em] text-navy-deep uppercase">
                  {r.action}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-gold transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
