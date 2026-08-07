import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    setLoading(false);
    toast.success("You're on the list!");
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 p-10 text-center"
          style={{
            background:
              "linear-gradient(145deg, rgba(124,58,237,0.15) 0%, rgba(244,114,182,0.08) 60%, rgba(56,189,248,0.06) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 80px -20px rgba(167,139,250,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Background orbs */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full blur-3xl opacity-25"
            style={{ background: "radial-gradient(circle, #f472b6, transparent)" }}
          />

          <div className="relative">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 border border-primary/25">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Stay in the{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #f472b6)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                loop
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              New templates, features, and inspiration for your next dedication — delivered to your inbox. Zero spam.
            </p>

            {done ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                <span className="font-semibold text-emerald-400">You're subscribed!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-5 py-3.5 text-sm outline-none backdrop-blur transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-4 text-xs text-muted-foreground/60">
              No spam, ever. Unsubscribe with one click at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
