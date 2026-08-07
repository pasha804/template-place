import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How long does it take to create a page?",
    a: "Most pages are ready in under 5 minutes. Choose a template, fill in your names, upload a photo, and you're done. The platform handles the design, animations, and hosting automatically.",
  },
  {
    q: "Do I need to create an account?",
    a: "You need a free account to save and publish your page. Registration takes under 30 seconds with just an email and password.",
  },
  {
    q: "Can I add a password or PIN to my page?",
    a: "Yes. Every page supports optional password protection and a 4–6 digit PIN lock. Only people with the correct code can view the page — perfect for intimate surprises.",
  },
  {
    q: "What happens after the page expires?",
    a: "Expired pages are deactivated but never deleted. You can renew them at any time from your dashboard to restore full access and sharing.",
  },
  {
    q: "Can I add my own music and photos?",
    a: "Absolutely. Premium templates support your own audio file and up to 10 images. The visual editor has a built-in uploader with crop and resize tools.",
  },
  {
    q: "Is the link permanent?",
    a: "Permanent page plans give you a link that never expires. Monthly plans renew the page each billing cycle. Free pages last 7 days.",
  },
  {
    q: "Can I see who visited my page?",
    a: "Yes. Your dashboard shows real-time visitor counts, countries, devices, and referrer sources for every published page.",
  },
  {
    q: "Do you support multiple languages?",
    a: "The editor and templates fully support any language. Simply type in your language and the template renders it beautifully. Platform UI is English-first with more locales coming.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* bg accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            Got questions?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            Frequently asked{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              questions
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 text-muted-foreground"
          >
            Everything you need to know before you start creating
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className={cn(
                  "overflow-hidden rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-primary/30 shadow-[0_0_30px_-10px_rgba(167,139,250,0.3)]"
                    : "border-[var(--glass-border)] hover:border-primary/20"
                )}
                style={{
                  background: isOpen
                    ? "linear-gradient(160deg, rgba(167,139,250,0.08) 0%, rgba(244,114,182,0.04) 100%)"
                    : "var(--gradient-card)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className={cn("text-sm font-semibold leading-snug transition-colors", isOpen ? "text-primary" : "text-foreground")}>
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "border-primary/40 bg-primary/15 text-primary rotate-0"
                        : "border-[var(--glass-border)] text-muted-foreground"
                    )}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-primary/10 px-6 pb-5 pt-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 rounded-3xl border border-[var(--glass-border)] p-8 text-center"
          style={{ background: "var(--gradient-card)", backdropFilter: "blur(16px)" }}
        >
          <p className="text-lg font-bold">Still have questions?</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Our team replies within 24 hours — always human, never a bot.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/15 hover:scale-[1.02]"
          >
            Contact support →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
