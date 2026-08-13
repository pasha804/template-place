import { motion } from "framer-motion";
import { LayoutTemplate, Pencil, Share2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const steps = [
  {
    num: "01",
    icon: LayoutTemplate,
    title: "Choose a template",
    desc: "Browse 30+ stunning templates designed for every occasion — birthdays, anniversaries, proposals, weddings and more.",
    gradient: "from-violet-500 to-purple-600",
    glow: "rgba(167,139,250,0.35)",
    border: "rgba(167,139,250,0.2)",
    bg: "rgba(167,139,250,0.08)",
  },
  {
    num: "02",
    icon: Pencil,
    title: "Customize your page",
    desc: "Add your photos, write your message, pick colors and music. Live preview updates as you type.",
    gradient: "from-pink-500 to-rose-500",
    glow: "rgba(244,114,182,0.35)",
    border: "rgba(244,114,182,0.2)",
    bg: "rgba(244,114,182,0.08)",
  },
  {
    num: "03",
    icon: Share2,
    title: "Share the love",
    desc: "Get a unique link and share it on WhatsApp, Instagram or any platform. Watch the reactions roll in.",
    gradient: "from-cyan-400 to-sky-500",
    glow: "rgba(56,189,248,0.35)",
    border: "rgba(56,189,248,0.2)",
    bg: "rgba(56,189,248,0.08)",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-3 sm:py-4 overflow-hidden" id="how-it-works">
      {/* Background accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-4 text-center sm:mb-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/8 px-3 py-1 text-xs font-semibold text-pink-400"
          >
            Simple & Fast
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-black text-white sm:text-4xl"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-2 text-sm text-white/50"
          >
            From zero to a magical link in under 5 minutes
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative grid gap-6 md:grid-cols-3 lg:gap-8">
          {/* Connector */}
          <div
            aria-hidden
            className="absolute top-16 left-[calc(16.6%+2rem)] hidden h-px w-[calc(66%-4rem)] md:block"
            style={{ background: "linear-gradient(90deg, rgba(167,139,250,0.5), rgba(244,114,182,0.5), rgba(56,189,248,0.5))" }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative overflow-hidden rounded-3xl border p-8 transition-all duration-300"
              style={{
                background: `linear-gradient(145deg, ${step.bg} 0%, rgba(15,13,36,0.6) 100%)`,
                borderColor: step.border,
                backdropFilter: "blur(16px)",
              }}
            >
              {/* Ambient glow */}
              <div
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500"
                style={{ background: step.glow, opacity: 0.5 }}
              />

              {/* Number + icon row */}
              <div className="relative mb-6 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${step.gradient.replace("from-", "").split(" to-")[0].trim()}, ${step.gradient.split(" to-")[1].trim()})`.replace(/([a-z]+)-(\d+)/g, (_, name, weight) => {
                      const map: Record<string,string> = { "violet-500":"#8b5cf6","purple-600":"#9333ea","pink-500":"#ec4899","rose-500":"#f43f5e","cyan-400":"#22d3ee","sky-500":"#0ea5e9" };
                      return map[`${name}-${weight}`] ?? "#a78bfa";
                    }),
                    boxShadow: `0 8px 30px -8px ${step.glow}`,
                  }}
                >
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <span
                  className={`text-5xl font-black opacity-20 bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`}
                  style={{ fontFamily: "var(--font-display)", lineHeight: 1 }}
                >
                  {step.num}
                </span>
              </div>

              <h3 className="relative mb-3 text-xl font-bold text-white">{step.title}</h3>
              <p className="relative text-sm leading-relaxed text-white/70">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex justify-center"
        >
          <Link
            to="/templates"
            className="group flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-8 py-3.5 text-sm font-semibold text-primary backdrop-blur transition-all hover:bg-primary/15 hover:scale-[1.02]"
          >
            Start creating for free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
