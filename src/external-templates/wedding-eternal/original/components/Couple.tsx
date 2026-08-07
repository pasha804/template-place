// @ts-nocheck
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

function Portrait({
  name,
  role,
  image,
  bio,
  facts,
  from,
}: {
  name: string
  role: string
  image: string
  bio: string
  facts: string[]
  from: "left" | "right"
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: from === "left" ? -60 : 60, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="group relative"
    >
      <div className="relative mx-auto max-w-sm">
        <div className="absolute -inset-3 rounded-sm border border-gold/25 transition-all duration-700 group-hover:-inset-5 group-hover:border-gold/50" />
        <div className="relative overflow-hidden rounded-sm">
          <img
            src={image}
            alt={`${name}, ${role}`}
            loading="lazy"
            width={912}
            height={1200}
            className="aspect-3/4 w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-107"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy-abyss/85 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 [background:radial-gradient(70%_50%_at_50%_100%,color-mix(in_oklab,var(--gold)_28%,transparent),transparent)]" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="font-script text-gold-gradient text-5xl">{name}</h3>
        <p className="mt-1 text-[0.6rem] tracking-luxe text-ivory/55 uppercase">{role}</p>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">{bio}</p>
        <ul className="mx-auto mt-6 grid max-w-xs gap-2 text-left">
          {facts.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.7 }}
              className="flex items-center gap-3 text-[0.8rem] text-ivory/65"
            >
              <Heart className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.3} aria-hidden />
              {f}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export function Couple({
  brideName = "Ayesha",
  groomName = "Hamza",
  brideImageUrl = "/templates/wedding-eternal/bride.jpg",
  groomImageUrl = "/templates/wedding-eternal/groom.jpg",
  brideNote = "A dreamer, an architect of small joys, and the kind of soul who makes an ordinary evening feel like an occasion.",
  groomNote = "Steady, ambitious and endlessly warm — the calm in every storm and the laugh in every room.",
}: {
  brideName?: string
  groomName?: string
  brideImageUrl?: string
  groomImageUrl?: string
  brideNote?: string
  groomNote?: string
}) {
  const brideFacts = ["Chases every sunset", "Cannot begin without coffee", "Dreams in itineraries"]
  const groomFacts = ["Lives for matchday", "Loves late-night drives", "Devoted to good food"]

  return (
    <section id="couple" className="section-pad relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(60%_50%_at_50%_50%,color-mix(in_oklab,var(--navy)_60%,transparent),transparent_75%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          eyebrow="Chapter Two"
          script="The Couple"
          title="Two souls, one story"
        />

        <div className="mt-20 grid items-start gap-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <Portrait
            name={brideName}
            role="The Bride"
            image={brideImageUrl}
            bio={brideNote}
            facts={brideFacts}
            from="left"
          />

          <div className="flex items-center justify-center lg:pt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 rounded-full border border-dashed border-gold/25"
              />
              <motion.span
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-16 rounded-full blur-3xl [background:radial-gradient(circle,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)]"
              />
              <span className="font-script text-gold-gradient relative block text-[7rem] leading-none lg:text-[10rem]">
                &amp;
              </span>
            </motion.div>
          </div>

          <Portrait
            name={groomName}
            role="The Groom"
            image={groomImageUrl}
            bio={groomNote}
            facts={groomFacts}
            from="right"
          />
        </div>
      </div>
    </section>
  )
}
