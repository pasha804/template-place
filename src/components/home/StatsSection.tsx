import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Layers, Globe, Shield } from "lucide-react";

const stats = [
  { icon: Users,  value: 5000,  suffix: "+",  label: "Happy Customers",   color: "#a78bfa" },
  { icon: Layers, value: 50,    suffix: "+",  label: "Premium Templates", color: "#f472b6" },
  { icon: Globe,  value: 5000,  suffix: "+",  label: "Websites Created",  color: "#38bdf8" },
  { icon: Shield, value: 99.9,  suffix: "%",  label: "Uptime Guaranteed", color: "#34d399", isDecimal: true },
];

function AnimatedNumber({ target, suffix, isDecimal }: { target: number; suffix: string; isDecimal?: boolean }) {
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 18 });

  useEffect(() => { if (inView) mv.set(target); }, [inView, target, mv]);
  useEffect(() => {
    return spring.on("change", (v) => {
      if (!ref.current) return;
      ref.current.textContent = isDecimal
        ? v.toFixed(1) + suffix
        : Math.round(v).toLocaleString() + suffix;
    });
  }, [spring, suffix, isDecimal]);

  return <span ref={ref}>0{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="relative py-2 sm:py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="overflow-hidden rounded-2xl border border-white/[0.07]"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)" }}
        >
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 px-8 py-7"
              >
                {/* Icon bubble */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}
                >
                  <s.icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p 
                    className="text-2xl font-black sm:text-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}, ${s.color}dd)`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    <AnimatedNumber target={s.value} suffix={s.suffix} isDecimal={s.isDecimal} />
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/60">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
