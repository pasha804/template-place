// @ts-nocheck
import { Reveal, SectionTitle, Ornament } from "./atoms"

const SCHEDULE = [
  ["2:00 PM", "Ceremony begins"],
  ["3:30 PM", "Cocktail hour & photos"],
  ["5:00 PM", "Reception opens"],
  ["6:00 PM", "Dinner is served"],
  ["7:30 PM", "Speeches & toasts"],
  ["9:00 PM", "Dancing until late"],
]

export function Events({
  venue = "Pearl Continental Lahore",
  venueAddress = "Mall Road, Lahore, Pakistan",
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
      title: "Mehndi",
      date: "December 23, 2026",
      time: "7:00 PM",
      venue: "Bagh-e-Noor Courtyard",
      city: "Lahore, Pakistan",
    },
    {
      title: "Ceremony",
      date: dateFormatted,
      time: "2:00 PM",
      venue: venue,
      city: venueAddress,
    },
    {
      title: "Reception",
      date: dateFormatted,
      time: "7:00 PM",
      venue: "The Grand Ballroom",
      city: venueAddress,
    },
  ]

  return (
    <section id="events" className="py-24 md:py-32">
      <SectionTitle kicker="Chapter Three" title="The Celebration" />

      <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.15fr_1fr]">
        <div className="grid gap-5 sm:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <article className="surface-card group h-full rounded-sm p-6 text-center transition-transform duration-500 hover:-translate-y-1.5">
                <h3 className="font-display text-2xl text-copper-light">{e.title}</h3>
                <div className="hairline mx-auto my-4 h-px w-14" />
                <p className="text-sm text-foreground/85">{e.date}</p>
                <p className="mt-1 font-display text-xl text-blush">{e.time}</p>
                <p className="mt-4 text-sm text-muted-foreground">{e.venue}</p>
                <p className="text-xs text-muted-foreground">{e.city}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${e.venue} ${e.city}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block border-b border-copper/50 pb-1 text-[0.62rem] tracking-[0.3em] uppercase text-copper transition-colors hover:text-copper-light"
                >
                  Directions
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="surface-card h-full rounded-sm p-8">
            <h3 className="text-center font-display text-3xl text-copper-light">
              Wedding Day
            </h3>
            <div className="mt-5">
              <Ornament />
            </div>
            <ol className="mt-7 space-y-5">
              {SCHEDULE.map(([time, what]) => (
                <li key={time} className="group flex items-center gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-copper/40 text-[0.6rem] text-copper transition-colors group-hover:bg-copper group-hover:text-primary-foreground">
                    ✦
                  </span>
                  <span className="w-20 shrink-0 font-display text-lg text-blush">{time}</span>
                  <span className="min-w-0 text-sm text-muted-foreground">{what}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-center text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Dress code · Formal, in soft plum &amp; copper tones
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
