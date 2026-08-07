import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sofia R.",
    role: "Anniversary page",
    avatar: "S",
    gradient: "from-violet-500 to-purple-600",
    rating: 5,
    body: "I created a beautiful anniversary page for my partner in under 10 minutes. He cried. The countdown timer and gallery made it feel like a real digital gift.",
  },
  {
    name: "Marcus T.",
    role: "Birthday page",
    avatar: "M",
    gradient: "from-cyan-400 to-sky-500",
    rating: 5,
    body: "Sent this to my best friend for his 30th. The confetti on load and floating hearts made him text me immediately. 10/10 experience.",
  },
  {
    name: "Priya K.",
    role: "Proposal page",
    avatar: "P",
    gradient: "from-pink-500 to-rose-500",
    rating: 5,
    body: "The Midnight Vow template was exactly what I needed. The typewriter effect building up to the question was perfect. She said yes!",
  },
  {
    name: "James L.",
    role: "Wedding invitation",
    avatar: "J",
    gradient: "from-amber-400 to-orange-500",
    rating: 5,
    body: "We replaced our paper invitations with the Ivory Vows template. Guests were blown away by the countdown and the RSVP button directly on the page.",
  },
  {
    name: "Amelia C.",
    role: "Mother's Day",
    avatar: "A",
    gradient: "from-emerald-400 to-teal-500",
    rating: 5,
    body: "Used Paper Trail for Mother's Day. The written letter section and the photo grid brought my mom to tears. Worth every penny — I'll use this every year.",
  },
  {
    name: "Ryo N.",
    role: "Long-distance surprise",
    avatar: "R",
    gradient: "from-fuchsia-500 to-pink-600",
    rating: 5,
    body: "My girlfriend is in Tokyo. I sent her a custom page with our timeline and music. The PIN protection made it feel like unwrapping a real gift.",
  },
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(244,114,182,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/8 px-4 py-1.5 text-xs font-semibold text-pink-400"
          >
            ❤️ Loved by thousands
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            Real stories,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f472b6, #fb7185)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              real smiles
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Join 51,000+ people who've created something unforgettable
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-6 transition-all duration-300 hover:border-primary/25"
              style={{
                background:
                  "linear-gradient(160deg, rgba(167,139,250,0.05) 0%, rgba(244,114,182,0.03) 100%)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Glow accent top-right */}
              <div
                className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full blur-2xl opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${t.gradient.replace("from-", "").split(" to-")[0].trim()}, transparent)`.replace(
                    /([a-z]+-\d+)/g,
                    (m) => {
                      const c: Record<string, string> = {
                        "violet-500": "#8b5cf6",
                        "cyan-400": "#22d3ee",
                        "pink-500": "#ec4899",
                        "amber-400": "#fbbf24",
                        "emerald-400": "#34d399",
                        "fuchsia-500": "#d946ef",
                      };
                      return c[m] ?? "#a78bfa";
                    }
                  ),
                }}
              />

              {/* Quote icon */}
              <Quote className="mb-4 h-6 w-6 opacity-20 text-primary" />

              <StarRow />

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{
                    background: `linear-gradient(135deg, ${t.gradient.replace("from-", "").split(" to-")[0].trim()}, ${t.gradient.split(" to-")[1].trim()})`.replace(
                      /([a-z]+-\d+)/g,
                      (m) => {
                        const c: Record<string, string> = {
                          "violet-500": "#8b5cf6",
                          "purple-600": "#9333ea",
                          "cyan-400": "#22d3ee",
                          "sky-500": "#0ea5e9",
                          "pink-500": "#ec4899",
                          "rose-500": "#f43f5e",
                          "amber-400": "#fbbf24",
                          "orange-500": "#f97316",
                          "emerald-400": "#34d399",
                          "teal-500": "#14b8a6",
                          "fuchsia-500": "#d946ef",
                          "pink-600": "#db2777",
                        };
                        return c[m] ?? "#a78bfa";
                      }
                    ),
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          {/* Avatars stack */}
          <div className="flex items-center -space-x-2">
            {["S", "M", "P", "J", "A", "R"].map((l, i) => (
              <div
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-bold text-white"
                style={{
                  background: [
                    "linear-gradient(135deg,#8b5cf6,#9333ea)",
                    "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                    "linear-gradient(135deg,#ec4899,#f43f5e)",
                    "linear-gradient(135deg,#fbbf24,#f97316)",
                    "linear-gradient(135deg,#34d399,#14b8a6)",
                    "linear-gradient(135deg,#d946ef,#db2777)",
                  ][i],
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-1 text-sm font-bold">4.9/5</span>
            </div>
            <p className="text-xs text-muted-foreground">from 2,400+ verified reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
