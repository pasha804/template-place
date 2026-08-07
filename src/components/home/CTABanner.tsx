import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl p-12 text-center sm:p-16"
          style={{
            background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 30%, #9333ea 55%, #c026d3 80%, #db2777 100%)",
            boxShadow: "0 40px 120px -30px rgba(124,58,237,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Grid pattern overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Floating orbs */}
          <motion.div
            className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #c084fc, transparent)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #f472b6, transparent)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />

          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="mb-5 flex justify-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur border border-white/20">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-4xl font-black text-white sm:text-5xl lg:text-6xl"
            >
              Ready to create something
              <br />
              <span className="text-yellow-300">unforgettable?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              className="mt-5 text-lg text-white/75"
            >
              Join 51,000+ people who've made someone's day with a single link.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/templates"
                className="group flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-purple-900 shadow-xl transition-all hover:scale-[1.04] hover:shadow-2xl"
              >
                Create your page — it's free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/pricing"
                className="flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/20"
              >
                View plans
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.42 }}
              className="mt-5 text-xs text-white/50"
            >
              No credit card required · Ready in 5 minutes · Cancel any time
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
