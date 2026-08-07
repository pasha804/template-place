import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const categories = [
  { label: "Birthday",     emoji: "🎂", count: 35, color: "#f472b6", href: "/templates?cat=birthday" },
  { label: "Anniversary",  emoji: "❤️", count: 25, color: "#ef4444", href: "/templates?cat=anniversary" },
  { label: "Proposal",     emoji: "💍", count: 20, color: "#a78bfa", href: "/templates?cat=proposal" },
  { label: "Love",         emoji: "💖", count: 30, color: "#ec4899", href: "/templates?cat=valentine" },
  { label: "Friendship",   emoji: "👫", count: 18, color: "#fbbf24", href: "/templates?cat=friendship" },
  { label: "Wedding",      emoji: "💒", count: 22, color: "#34d399", href: "/templates?cat=wedding" },
  { label: "Special Days", emoji: "🎁", count: 40, color: "#f97316", href: "/templates?cat=special" },
  { label: "View All",     emoji: "⊞",  count: 100, color: "#818cf8", href: "/templates", isAll: true },
];

export function CategoriesSection() {
  return (
    <section className="relative py-20" id="categories">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-400"
          >
            Browse Templates
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-4xl font-black text-white sm:text-5xl"
          >
            Popular Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="mt-3 text-white/50"
          >
            Find the perfect template for every special occasion
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={cat.href}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] p-5 text-center transition-all duration-300 hover:scale-[1.05]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = cat.color + "40";
                  el.style.background  = cat.color + "10";
                  el.style.boxShadow   = `0 8px 30px -8px ${cat.color}44`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.background  = "";
                  el.style.boxShadow   = "";
                }}
              >
                {/* Icon box */}
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${cat.color}18`,
                    border: `1px solid ${cat.color}28`,
                    boxShadow: `0 0 20px ${cat.color}20`,
                  }}
                >
                  {cat.isAll ? (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="7" height="7" rx="1" fill={cat.color} opacity="0.8" />
                      <rect x="14" y="3" width="7" height="7" rx="1" fill={cat.color} opacity="0.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1" fill={cat.color} opacity="0.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1" fill={cat.color} opacity="0.8" />
                    </svg>
                  ) : (
                    <span>{cat.emoji}</span>
                  )}
                </div>

                {/* Label */}
                <div>
                  <p className="text-sm font-bold text-white">{cat.label}</p>
                  <p className="mt-0.5 text-[11px] text-white/35">
                    {cat.isAll ? "100+" : cat.count} Templates
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
