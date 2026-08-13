import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll(dir: "left" | "right") {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  }

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If at the end, scroll back to start
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Otherwise scroll to next card (300px)
          container.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden py-3 sm:py-4" id="reviews">
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
        {/* Header with scroll navigation */}
        <div className="mb-3 flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-2 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/8 px-3.5 py-1 text-xs font-semibold text-pink-400"
            >
              ❤️ Loved by thousands
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-3xl font-bold sm:text-4xl text-white"
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
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur transition-all hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur transition-all hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative shrink-0 w-[260px] sm:w-[290px] snap-start overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-5 transition-all duration-300 hover:border-pink-500/30"
              style={{
                background:
                  "linear-gradient(160deg, rgba(167,139,250,0.06) 0%, rgba(244,114,182,0.03) 100%)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* Glow accent top-right */}
              <div
                className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full blur-xl opacity-30"
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

              <div className="flex items-center justify-between mb-2">
                <Quote className="h-4 w-4 opacity-30 text-pink-400" />
                <StarRow />
              </div>

              <p className="text-xs leading-relaxed text-white/70 line-clamp-4 min-h-[4rem]">
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.06] pt-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white"
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
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">{t.name}</p>
                  <p className="truncate text-[10px] text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <div className="flex items-center -space-x-2">
            {["S", "M", "P", "J", "A", "R"].map((l, i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-background text-[10px] font-bold text-white"
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
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-1 text-xs font-bold text-white">4.9/5</span>
            <span className="text-xs text-white/40">· from 2,400+ verified reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

