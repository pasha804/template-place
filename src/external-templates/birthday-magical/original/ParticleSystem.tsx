import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function buildParticles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i / count) * 100 + (Math.abs(Math.sin(i * 37.3)) - 0.5) * 12,
    size: Math.abs(Math.sin(i * 13.7)) * 2.5 + 0.8,
    duration: Math.abs(Math.sin(i * 7.1)) * 18 + 14,
    delay: Math.abs(Math.sin(i * 3.9)) * 18,
    opacity: Math.abs(Math.sin(i * 19.1)) * 0.35 + 0.12,
  }));
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState<ReturnType<typeof buildParticles> | null>(null);

  useEffect(() => {
    const w = window.innerWidth;
    const count = w < 400 ? 14 : w < 640 ? 22 : 48;
    setParticles(buildParticles(count));
  }, []);

  if (!particles) {
    return <div className="pointer-events-none fixed inset-0 z-[2]" />;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "108vh", opacity: 0 }}
          animate={{ y: "-8vh", opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: `${p.left}%`, width: p.size, height: p.size, willChange: "transform, opacity" }}
          className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.7)]"
        />
      ))}
    </div>
  );
}
