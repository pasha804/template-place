import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "package1",
    tier: "Package 1",
    price: "Rs. 1,000",
    period: "",
    tagline: "Perfect for a one-time surprise",
    icon: Zap,
    iconColor: "#a78bfa",
    gradient: "from-violet-500/15 to-purple-600/8",
    border: "rgba(167,139,250,0.2)",
    glow: "rgba(167,139,250,0.25)",
    features: [
      "1 personalized page",
      "Full customization via editor",
      "WhatsApp sharing link",
      "Standard support",
    ],
    cta: "Get Started",
    ctaHref: "/auth/signup",
    highlight: false,
  },
  {
    id: "package2",
    tier: "Package 2",
    price: "Rs. 2,000",
    period: "",
    tagline: "Everything included, priority delivery",
    icon: Crown,
    iconColor: "#f59e0b",
    gradient: "from-amber-500/20 to-orange-500/10",
    border: "rgba(251,191,36,0.3)",
    glow: "rgba(251,191,36,0.35)",
    badge: "Most Popular",
    features: [
      "1 personalized page",
      "Full customization via editor",
      "Custom URL slug",
      "Priority support",
      "VIP delivery",
    ],
    cta: "Get Package 2",
    ctaHref: "/auth/signup",
    highlight: true,
  },
];

export function PricingSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative py-28 overflow-hidden" id="pricing">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary"
          >
            Simple Pricing
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold sm:text-5xl"
          >
            Two packages. That's it.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            All prices in PKR. Pay once, your page goes live after admin approval.
          </motion.p>
        </div>

        {/* Cards — centered 2-col max */}
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHovered(plan.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500",
                plan.highlight && "sm:scale-[1.04] shadow-[0_0_80px_-20px_rgba(251,191,36,0.4)]",
              )}
              style={{
                backgroundImage: plan.highlight
                  ? "linear-gradient(160deg, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.06) 100%)"
                  : "linear-gradient(160deg, rgba(139,92,246,0.10) 0%, rgba(147,51,234,0.05) 100%)",
                borderColor:
                  hovered === plan.id || plan.highlight ? plan.border : "var(--glass-border)",
                boxShadow:
                  plan.highlight
                    ? `0 0 0 1px ${plan.border}, 0 20px 80px -20px ${plan.glow}`
                    : hovered === plan.id
                    ? `0 0 0 1px ${plan.border}, 0 12px 50px -16px ${plan.glow}`
                    : "none",
              }}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-0 left-0 right-0 flex justify-center">
                  <span className="rounded-b-xl bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={cn("flex flex-col flex-1", plan.badge && "pt-5")}>
                {/* Icon + tier */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: plan.iconColor + "20",
                      border: `1px solid ${plan.iconColor}30`,
                    }}
                  >
                    <plan.icon className="h-5 w-5" style={{ color: plan.iconColor }} />
                  </div>
                  <p className="text-lg font-bold">{plan.tier}</p>
                </div>

                {/* Price */}
                <div className="mb-2 flex items-baseline gap-1.5">
                  <span
                    className="text-5xl font-black"
                    style={{
                      background: plan.highlight
                        ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                        : `linear-gradient(135deg, ${plan.iconColor}, ${plan.iconColor}cc)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">PKR</span>
                </div>
                <p className="mb-6 text-sm text-muted-foreground">{plan.tagline}</p>

                {/* Divider */}
                <div className="mb-5 h-px w-full" style={{ background: plan.border }} />

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm">
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: plan.iconColor + "20" }}
                      >
                        <Check className="h-3 w-3" style={{ color: plan.iconColor }} />
                      </div>
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  to={plan.ctaHref}
                  className="block w-full rounded-2xl py-4 text-center text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={
                    plan.highlight
                      ? {
                          background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                          color: "#000",
                          boxShadow: "0 8px 30px -8px rgba(251,191,36,0.5)",
                        }
                      : {
                          background: plan.iconColor + "15",
                          color: plan.iconColor,
                          border: `1px solid ${plan.iconColor}30`,
                        }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-xs text-muted-foreground"
        >
          All pages include SSL security, mobile-responsive design, and 99.9% uptime.
          Payment via EasyPaisa · Bank Transfer · PayPal.
        </motion.p>
      </div>
    </section>
  );
}
