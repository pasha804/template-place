// @ts-nocheck
import { useState, type FormEvent } from "react"
import { Reveal, SectionTitle } from "./atoms"

const field =
  "w-full rounded-sm border border-copper/25 bg-input/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-copper focus:bg-input/70"

export function Rsvp({ rsvpWhatsapp, brideName = "Zara", groomName = "Rayan" }: { rsvpWhatsapp?: string; brideName?: string; groomName?: string }) {
  const [sent, setSent] = useState(false)
  const [attending, setAttending] = useState("yes")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (rsvpWhatsapp) {
      const text = encodeURIComponent(
        `*RSVP for ${brideName} & ${groomName}'s Wedding*\n` +
        `*Name:* ${name}\n` +
        `*Attending:* ${attending}\n` +
        `*Email:* ${email}`
      )
      const cleanNum = rsvpWhatsapp.replace(/[^0-9+]/g, "")
      window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank")
    }
    setSent(true)
  }

  return (
    <section id="rsvp" className="py-24 md:py-32">
      <SectionTitle
        kicker="Chapter Five"
        title="Will You Join Us?"
        sub="Kindly reply before November 1, 2026."
      />

      <div className="mx-auto mt-14 grid max-w-5xl gap-8 px-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="surface-card rounded-sm p-7 md:p-9">
            {sent ? (
              <div className="animate-[scale-in_.4s_ease-out] py-14 text-center">
                <div className="animate-float-slow mx-auto text-5xl text-copper">✦</div>
                <h3 className="mt-5 font-display text-3xl text-copper-light">Thank you</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Your reply is noted. We cannot wait to celebrate with you.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-7 border-b border-copper/50 pb-1 text-[0.62rem] tracking-[0.3em] uppercase text-copper"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={field} />
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className={field} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {["yes", "no", "maybe"].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setAttending(opt)}
                      className={`rounded-full border px-5 py-2 text-[0.62rem] tracking-[0.3em] uppercase transition-all duration-300 ${
                        attending === opt
                          ? "border-copper bg-copper text-primary-foreground"
                          : "border-copper/30 text-muted-foreground hover:border-copper/70"
                      }`}
                    >
                      {opt === "yes" ? "Joyfully yes" : opt === "no" ? "Regretfully no" : "Maybe"}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <select className={field} defaultValue="1" aria-label="Number of guests">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="bg-card">
                        {n} guest{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <input placeholder="Dietary notes" className={field} />
                </div>

                <input placeholder="Song request" className={field} />
                <textarea rows={3} placeholder={`A message for ${brideName} & ${groomName}`} className={field} />

                <button
                  type="submit"
                  className="animate-shimmer w-full rounded-sm py-3.5 text-[0.68rem] tracking-[0.4em] uppercase text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--gradient-copper)" }}
                >
                  Send RSVP
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="space-y-4">
          {[
            ["Gift Registry", "Your presence is the greatest gift — but a wish list waits here."],
            ["Stay With Us", "Reserved rates at three hotels a short drive from the venue."],
            ["The Wedding Party", "Meet the friends standing beside us on the day."],
            ["Questions", "Timings, parking, kids, dress code — answered."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 90}>
              <a
                href="#rsvp"
                className="surface-card group flex items-center gap-4 rounded-sm p-5 transition-transform duration-400 hover:translate-x-1.5"
              >
                <span className="min-w-0">
                  <span className="block font-display text-xl text-copper-light">{t}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{d}</span>
                </span>
                <span className="ml-auto shrink-0 text-copper transition-transform duration-400 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
