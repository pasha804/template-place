// @ts-nocheck
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Loader2, Send } from "lucide-react"
import { SectionTitle } from "./SectionTitle"

const fieldCls =
  "w-full rounded-sm border border-gold/25 bg-navy-abyss/40 px-4 py-3 text-sm text-ivory placeholder:text-ivory/35 outline-none transition-all duration-500 focus:border-gold focus:bg-navy-abyss/70 focus:shadow-[0_0_30px_-14px_var(--gold)]"
const labelCls = "mb-2 block text-[0.6rem] tracking-[0.25em] text-gold/85 uppercase"

export function RSVP({ rsvpWhatsapp, brideName = "Ayesha", groomName = "Hamza" }: { rsvpWhatsapp?: string; brideName?: string; groomName?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [attendance, setAttendance] = useState("yes")
  const [guests, setGuests] = useState("1")
  const [dietary, setDietary] = useState("None")
  const [song, setSong] = useState("")
  const [message, setMessage] = useState("")
  const [err, setErr] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setErr("Please tell us your full name"); return }
    setErr("")
    setStatus("sending")

    setTimeout(() => {
      if (rsvpWhatsapp) {
        const text = encodeURIComponent(
          `*RSVP for ${brideName} & ${groomName}'s Wedding*\n` +
          `*Name:* ${name}\n` +
          `*Attending:* ${attendance}\n` +
          `*Guests:* ${guests}\n` +
          `*Dietary:* ${dietary}\n` +
          (song ? `*Song:* ${song}\n` : "") +
          (message ? `*Message:* ${message}` : "")
        )
        const cleanNum = rsvpWhatsapp.replace(/[^0-9+]/g, "")
        window.open(`https://wa.me/${cleanNum}?text=${text}`, "_blank")
      }
      setStatus("done")
      setTimeout(() => setStatus("idle"), 6000)
    }, 1000)
  }

  return (
    <section id="rsvp" className="section-pad relative overflow-hidden bg-navy-abyss">
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(55%_45%_at_50%_20%,color-mix(in_oklab,var(--navy)_70%,transparent),transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-6 sm:px-10">
        <SectionTitle
          eyebrow="Chapter Five"
          script="RSVP"
          title="Will you join us?"
          subtitle="Kindly respond before November 1, 2026."
        />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="glass-card mt-14 rounded-sm p-7 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-14 text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-gold shadow-[0_0_45px_-10px_var(--gold)]"
                >
                  <Check className="h-6 w-6" strokeWidth={1.3} />
                </motion.span>
                <h3 className="font-script text-gold-gradient mt-6 text-4xl">Thank you</h3>
                <p className="mt-3 text-sm text-ivory/65">
                  Your response is with us. We cannot wait to celebrate together.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2"
              >
                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="name">
                    Full Name *
                  </label>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={fieldCls} placeholder="Your full name" />
                  {err && <p className="mt-2 text-xs text-blush">{err}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="email">
                    Email
                  </label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={fieldCls} placeholder="you@email.com" />
                </div>

                <fieldset className="sm:col-span-2">
                  <legend className={labelCls}>Will you attend? *</legend>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { v: "yes", l: "Joyfully accepts" },
                      { v: "no", l: "Regretfully declines" },
                      { v: "maybe", l: "Still deciding" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className={`group cursor-pointer rounded-full border border-gold/25 px-5 py-2.5 text-[0.7rem] tracking-[0.15em] uppercase transition-all duration-500 hover:border-gold/60 ${
                          attendance === o.v ? "border-gold bg-gold/12 text-gold" : "text-ivory/70"
                        }`}
                      >
                        <input type="radio" value={o.v} checked={attendance === o.v} onChange={() => setAttendance(o.v)} className="sr-only" />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label className={labelCls} htmlFor="guests">
                    Number of Guests
                  </label>
                  <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={fieldCls}>
                    {["1", "2", "3", "4", "5"].map((n) => (
                      <option key={n} value={n} className="bg-navy-deep">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls} htmlFor="dietary">
                    Dietary Restrictions
                  </label>
                  <select id="dietary" value={dietary} onChange={(e) => setDietary(e.target.value)} className={fieldCls}>
                    {["None", "Vegetarian", "Vegan", "Gluten-free", "Nut allergy", "Other"].map((n) => (
                      <option key={n} value={n} className="bg-navy-deep">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="song">
                    Song Request
                  </label>
                  <input id="song" value={song} onChange={(e) => setSong(e.target.value)} className={fieldCls} placeholder="What will get you dancing?" />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls} htmlFor="message">
                    A Message for the Couple
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${fieldCls} resize-none`}
                    placeholder={`Share a wish with ${brideName} & ${groomName}…`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative mt-2 inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-gold px-8 py-4 text-[0.65rem] tracking-[0.25em] text-gold uppercase transition-colors duration-500 hover:text-navy-abyss disabled:opacity-70 sm:col-span-2"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0" />
                  <span className="relative flex items-center gap-3">
                    {status === "sending" ? (
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    ) : (
                      <Send className="h-4 w-4" strokeWidth={1.4} />
                    )}
                    {status === "sending" ? "Sending" : "Send RSVP"}
                  </span>
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
