// @ts-nocheck
import { Reveal, SectionTitle } from "./atoms"

function Person({
  img,
  name,
  role,
  bio,
  facts,
  align,
}: {
  img: string
  name: string
  role: string
  bio: string
  facts: string[]
  align: "left" | "right"
}) {
  return (
    <article className={`text-center ${align === "right" ? "md:text-right" : "md:text-left"}`}>
      <div className="group relative mx-auto w-fit">
        <div className="absolute -inset-2 rounded-full border border-copper/25 transition-transform duration-700 group-hover:scale-105" />
        <img
          src={img}
          alt={`${name}, ${role}`}
          loading="lazy"
          width={912}
          height={1200}
          className="relative h-52 w-52 rounded-full object-cover object-top shadow-[var(--shadow-glow)] transition-transform duration-700 group-hover:-translate-y-1 md:h-60 md:w-60"
        />
      </div>
      <h3
        className="mt-6 text-copper-gradient text-5xl"
        style={{ fontFamily: "var(--font-script)" }}
      >
        {name}
      </h3>
      <p className="mt-1 text-[0.62rem] tracking-[0.4em] uppercase text-muted-foreground">
        {role}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{bio}</p>
      <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
        {facts.map((f) => (
          <li
            key={f}
            className={`flex items-center gap-2 ${
              align === "right" ? "justify-center md:justify-end" : "justify-center md:justify-start"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-copper" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function Couple({
  brideName = "Zara",
  groomName = "Rayan",
  brideImageUrl = "/templates/wedding-petals/bride.jpg",
  groomImageUrl = "/templates/wedding-petals/groom.jpg",
  brideBio = "A dreamer with a notebook always in her bag, happiest when the room is full of people she loves.",
  groomBio = "Steady, warm and quietly funny — the one who remembers everyone's order without asking.",
}: {
  brideName?: string
  groomName?: string
  brideImageUrl?: string
  groomImageUrl?: string
  brideBio?: string
  groomBio?: string
}) {
  const brideFacts = ["Chases every sunset", "Runs on strong coffee", "Collecting stamps in her passport"]
  const groomFacts = ["Football before breakfast", "Midnight drives, windows down", "Will debate any playlist"]

  return (
    <section id="couple" className="relative overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, oklch(0.3 0.07 335 / 0.7), transparent 70%)",
        }}
      />
      <div className="relative">
        <SectionTitle kicker="Chapter Two" title="The Two of Us" />

        <div className="mx-auto mt-16 grid max-w-5xl items-center gap-10 px-5 md:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <Person
              img={brideImageUrl}
              name={brideName}
              role="The Bride"
              bio={brideBio}
              facts={brideFacts}
              align="right"
            />
          </Reveal>

          <Reveal delay={120} className="order-first md:order-none">
            <div
              className="animate-shimmer text-copper-gradient text-center text-8xl leading-none md:text-9xl"
              style={{ fontFamily: "var(--font-script)" }}
            >
              &amp;
            </div>
          </Reveal>

          <Reveal delay={200}>
            <Person
              img={groomImageUrl}
              name={groomName}
              role="The Groom"
              bio={groomBio}
              facts={groomFacts}
              align="left"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
