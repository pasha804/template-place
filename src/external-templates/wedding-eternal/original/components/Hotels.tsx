// @ts-nocheck
import { motion } from "framer-motion"
import { MapPin, Check } from "lucide-react"
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

const HOTELS = [
  {
    name: "The Royal Palm Residence",
    image: "/templates/wedding-eternal/hotel-1.jpg",
    distance: "0.4 km from the venue",
    price: "PKR 32,000 / night",
    amenities: ["Wedding rate", "Airport shuttle", "Spa & pool", "Breakfast"],
    url: "#rsvp",
  },
  {
    name: "Avari Skyline Suites",
    image: "/templates/wedding-eternal/hotel-2.jpg",
    distance: "3.1 km from the venue",
    price: "PKR 24,500 / night",
    amenities: ["City views", "Late checkout", "Gym", "Valet"],
    url: "#rsvp",
  },
  {
    name: "Garden Court Boutique",
    image: "/templates/wedding-eternal/hotel-3.jpg",
    distance: "5.6 km from the venue",
    price: "PKR 18,000 / night",
    amenities: ["Courtyard pool", "Family rooms", "Free parking", "Breakfast"],
    url: "#rsvp",
  },
]

export function Hotels() {
  return (
    <section id="accommodation" className="section-pad relative overflow-hidden bg-navy-deep">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          eyebrow="Chapter Seven"
          script="Where to Stay"
          title="Rest beautifully"
          subtitle="We have reserved guest rates at three favourites, all minutes from the celebration."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.14 } } }}
          className="mt-16 grid gap-7 lg:grid-cols-3"
        >
          {HOTELS.map((h) => (
            <motion.article
              key={h.name}
              variants={revealItem}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="glass-card group overflow-hidden rounded-sm transition-shadow duration-700 hover:shadow-[var(--shadow-gold)]"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  width={900}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy-abyss via-navy-abyss/20 to-transparent" />
                <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 text-[0.65rem] tracking-[0.18em] text-gold uppercase">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.3} aria-hidden />
                  {h.distance}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl text-ivory">{h.name}</h3>
                <p className="mt-1 text-[0.7rem] tracking-[0.2em] text-gold/85 uppercase">{h.price}</p>

                <ul className="mt-5 grid grid-cols-2 gap-2">
                  {h.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-[0.75rem] text-ivory/60">
                      <Check className="h-3 w-3 shrink-0 text-gold" strokeWidth={1.6} aria-hidden />
                      {a}
                    </li>
                  ))}
                </ul>

                <a
                  href={h.url}
                  className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-gold/60 py-3 text-[0.62rem] tracking-[0.22em] text-gold uppercase transition-all duration-500 hover:bg-gold hover:text-navy-abyss"
                >
                  Book Your Stay
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
