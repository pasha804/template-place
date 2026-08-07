// @ts-nocheck
import { motion } from "framer-motion"
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

const PARTY = {
  bridesmaids: [
    { name: "Zara Ahmed", role: "Maid of Honour", fact: "Has known Ayesha since kindergarten." },
    { name: "Hira Malik", role: "Bridesmaid", fact: "Official keeper of the wedding playlist." },
    { name: "Sana Iqbal", role: "Bridesmaid", fact: "Cries at every single toast." },
    { name: "Mariam Khan", role: "Bridesmaid", fact: "Can find any lost earring in seconds." },
  ],
  groomsmen: [
    { name: "Bilal Raza", role: "Best Man", fact: "Roommate, referee and lifelong co-conspirator." },
    { name: "Omar Sheikh", role: "Groomsman", fact: "Will absolutely start the dance floor." },
    { name: "Danish Ali", role: "Groomsman", fact: "Never once arrived on time." },
    { name: "Faris Javed", role: "Groomsman", fact: "The reason they all still play football." },
  ],
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
}

function Members({ people, side }: { people: Array<{ name: string; role: string; fact: string }>; side: string }) {
  return (
    <div>
      <h3 className="font-script text-gold-gradient text-center text-4xl">{side}</h3>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="mt-10 grid grid-cols-2 gap-8 sm:gap-10"
      >
        {people.map((p) => (
          <motion.li key={p.name} variants={revealItem} className="group text-center">
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32"
            >
              <span className="absolute inset-0 rounded-full border border-gold/30 transition-all duration-700 group-hover:scale-110 group-hover:border-gold/70" />
              <span className="absolute inset-2 flex items-center justify-center rounded-full bg-linear-to-br from-navy to-navy-abyss shadow-[inset_0_0_40px_-14px_var(--gold)] transition-shadow duration-700 group-hover:shadow-[inset_0_0_40px_-8px_var(--gold),0_0_40px_-12px_var(--gold)]">
                <span className="font-display text-gold-gradient text-2xl tracking-[0.1em]">
                  {initials(p.name)}
                </span>
              </span>
            </motion.div>
            <p className="font-display mt-5 text-base text-ivory">{p.name}</p>
            <p className="mt-1 text-[0.58rem] tracking-[0.25em] text-gold/85 uppercase">{p.role}</p>
            <p className="mx-auto mt-3 max-w-[16rem] text-[0.75rem] leading-relaxed text-ivory/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-sm:opacity-100">
              {p.fact}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

export function BridalParty() {
  return (
    <section id="party" className="section-pad relative overflow-hidden bg-navy-abyss">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <SectionTitle
          eyebrow="Chapter Eight"
          script="The Wedding Party"
          title="Our favourite people"
          subtitle="The friends and family standing beside us — and behind us, always."
        />

        <div className="mt-20 grid gap-20 lg:grid-cols-2 lg:gap-14">
          <Members people={PARTY.bridesmaids} side="Bridesmaids" />
          <Members people={PARTY.groomsmen} side="Groomsmen" />
        </div>
      </div>
    </section>
  )
}
