// @ts-nocheck
import { motion } from "framer-motion"
import { CalendarDays, Clock, MapPin, Navigation, Gem, GlassWater, Shirt } from "lucide-react"
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

const ICONS = { rings: Gem, glass: GlassWater, hanger: Shirt } as const
const SWATCHES = ["#36454F", "#F4C2C2", "#FFE4E1", "#F4E8C1", "#9CAF88", "#FFFFF0"]

export function EventDetails({
  venue = "Royal Garden Palace",
  venueAddress = "Canal Road, Lahore, Pakistan",
  weddingDate = "2026-12-25T14:00:00+05:00",
}: {
  venue?: string
  venueAddress?: string
  weddingDate?: string
}) {
  const dateFormatted = new Date(weddingDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }) || "December 25, 2026"

  const events = [
    {
      title: "Ceremony",
      icon: "rings",
      date: dateFormatted,
      time: "2:00 PM",
      venue: venue,
      address: venueAddress,
      map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue + " " + venueAddress)}`,
      note: "Arrive by 1:30 PM — the doors close as the vows begin.",
    },
    {
      title: "Reception",
      icon: "glass",
      date: dateFormatted,
      time: "5:00 PM",
      venue: "The Grand Ballroom",
      address: venueAddress,
      map: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueAddress)}`,
      note: "Dinner, dancing and a night that refuses to end.",
    },
    {
      title: "Dress Code",
      icon: "hanger",
      date: "Formal / Black Tie Optional",
      time: "Neutrals, pastels & gold",
      venue: "Elegant Attire",
      address: "Ivory, champagne, blush, sage and midnight navy",
      map: "",
      note: "Please avoid pure white — the bride called dibs.",
    },
  ]

  return (
    <section id="events" className="section-pad relative overflow-hidden bg-cream text-charcoal">
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_50%_at_50%_0%,color-mix(in_oklab,#F4E8C1_55%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          tone="light"
          eyebrow="Chapter Three"
          script="Event Details"
          title="Where it all happens"
          subtitle="Two venues, one unforgettable day. Directions, timings and everything you need to arrive effortlessly."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-70px" }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="mt-16 grid gap-7 md:grid-cols-3"
        >
          {events.map((e) => {
            const Icon = ICONS[e.icon as keyof typeof ICONS]
            return (
              <motion.article
                key={e.title}
                variants={revealItem}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="glass-card-light group relative flex flex-col rounded-sm p-8"
              >
                <span className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-700 group-hover:border-gold group-hover:shadow-[0_0_30px_-6px_var(--gold)]">
                  <Icon className="h-5 w-5" strokeWidth={1.2} aria-hidden />
                </span>

                <h3 className="font-display mt-6 text-center text-2xl text-navy-deep">{e.title}</h3>
                <div className="gold-rule mx-auto mt-4 h-px w-16" />

                <dl className="mt-6 space-y-3 text-[0.83rem] text-charcoal/85">
                  <div className="flex items-start justify-center gap-2.5">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                    <dd>{e.date}</dd>
                  </div>
                  <div className="flex items-start justify-center gap-2.5">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                    <dd>{e.time}</dd>
                  </div>
                  <div className="flex items-start justify-center gap-2.5 text-center">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.2} />
                    <dd>
                      <span className="block font-medium text-navy-deep">{e.venue}</span>
                      <span className="text-charcoal/65">{e.address}</span>
                    </dd>
                  </div>
                </dl>

                {e.icon === "hanger" && (
                  <div className="mt-6 flex justify-center gap-2.5">
                    {SWATCHES.map((c) => (
                      <motion.span
                        key={c}
                        whileHover={{ scale: 1.25 }}
                        className="h-6 w-6 rounded-full border border-charcoal/15 shadow-sm"
                        style={{ backgroundColor: c }}
                        aria-hidden
                      />
                    ))}
                  </div>
                )}

                <p className="mt-6 text-center text-[0.75rem] leading-relaxed text-charcoal/60 italic">
                  {e.note}
                </p>

                {e.map ? (
                  <a
                    href={e.map}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center justify-center gap-2 self-center rounded-full border border-gold px-6 py-3 text-[0.62rem] tracking-[0.22em] text-navy-deep uppercase transition-all duration-500 hover:bg-gold hover:shadow-[0_0_35px_-10px_var(--gold)]"
                  >
                    <Navigation className="h-3.5 w-3.5" strokeWidth={1.4} aria-hidden />
                    Get Directions
                  </a>
                ) : (
                  <span className="mt-7 self-center text-[0.62rem] tracking-[0.22em] text-charcoal/45 uppercase">
                    Dress beautifully
                  </span>
                )}
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
