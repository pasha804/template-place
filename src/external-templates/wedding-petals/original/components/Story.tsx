// @ts-nocheck
import { Reveal, SectionTitle } from "./atoms"

const DEFAULT_STORY = [
  {
    imageUrl: "/templates/wedding-petals/g1.jpg",
    title: "First Meeting",
    date: "June 12, 2018",
    text: "A short conversation on a long evening that quietly changed everything.",
  },
  {
    imageUrl: "/templates/wedding-petals/g5.jpg",
    title: "First Dance",
    date: "July 20, 2019",
    text: "Fairy lights, a borrowed song, and the certainty that this was it.",
  },
  {
    imageUrl: "/templates/wedding-petals/g3.jpg",
    title: "The Proposal",
    date: "Dec 24, 2023",
    text: "One question, one yes, and a promise made under winter stars.",
  },
  {
    imageUrl: "/templates/wedding-petals/g6.jpg",
    title: "The Engagement",
    date: "Jan 15, 2024",
    text: "Two families became one, and the countdown truly began.",
  },
]

export function Story({ story }: { story?: Array<{ title: string; date?: string; text?: string; imageUrl?: string; img?: string }> }) {
  const items = (story && story.length > 0) ? story : DEFAULT_STORY

  return (
    <section id="story" className="relative py-24 md:py-32">
      <SectionTitle
        kicker="Chapter One"
        title="Our Story"
        sub="A journey of friendship, patience and one very long love letter."
      />

      <div className="relative mx-auto mt-16 max-w-5xl px-5">
        <div className="hairline absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block" />
        <ol className="space-y-12 md:space-y-0">
          {items.map((m, i) => (
            <li key={m.title || i}>
              <Reveal delay={i * 90}>
                <div
                  className={`items-center gap-8 md:grid md:grid-cols-2 ${
                    i % 2 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  <div className="[direction:ltr]">
                    <div className="group relative overflow-hidden rounded-sm border border-copper/25">
                      <img
                        src={m.imageUrl || m.img || `/templates/wedding-petals/g${(i % 6) + 1}.jpg`}
                        alt={m.title}
                        loading="lazy"
                        width={800}
                        height={800}
                        className="h-56 w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110 md:h-64"
                      />
                      <div className="absolute inset-0 bg-plum-deep/25 transition-opacity duration-500 group-hover:opacity-0" />
                    </div>
                  </div>
                  <div className="mt-5 [direction:ltr] md:mt-0 md:px-8 md:py-10">
                    {m.date && (
                      <p className="text-[0.62rem] tracking-[0.4em] uppercase text-copper">
                        {m.date}
                      </p>
                    )}
                    <h3 className="mt-2 font-display text-3xl text-blush">{m.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {m.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
