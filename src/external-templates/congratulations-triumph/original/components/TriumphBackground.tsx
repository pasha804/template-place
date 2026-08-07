// @ts-nocheck
import { between, series } from "./rand"

/**
 * Ambient emerald/gold sky. Every particle position comes from a seeded LCG so
 * the server and client render identical markup.
 */
export function TriumphBackground() {
  const stars = series(1201, 130, (r) => ({
    left: between(r, 0, 100),
    top: between(r, 0, 100),
    size: between(r, 1, 2.6),
    delay: between(r, 0, 3.5),
    gold: r() > 0.45,
  }))

  const sparkles = series(3307, 14, (r) => ({
    left: between(r, 4, 96),
    top: between(r, 5, 92),
    size: between(r, 14, 30),
    delay: between(r, 0, 4),
  }))

  const shooting = series(5501, 4, (r) => ({
    left: between(r, 5, 70),
    top: between(r, 4, 45),
    delay: between(r, 0, 14),
    duration: between(r, 3.5, 6),
    length: between(r, 120, 240),
  }))

  const dust = series(7717, 30, (r) => ({
    left: between(r, 0, 100),
    size: between(r, 2, 5),
    delay: between(r, 0, 12),
    duration: between(r, 12, 24),
    drift: between(r, -60, 60),
  }))

  const laurels = series(9109, 5, (r) => ({
    left: between(r, 6, 90),
    top: between(r, 12, 80),
    size: between(r, 26, 46),
    delay: between(r, 0, 6),
  }))

  const risingStars = series(11311, 7, (r) => ({
    left: between(r, 5, 95),
    size: between(r, 10, 20),
    delay: between(r, 0, 10),
    duration: between(r, 10, 18),
  }))

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden ct-triumph-bg">
      {/* Nebula clouds */}
      <div
        className="absolute -top-24 -left-24 h-[46rem] w-[46rem] rounded-full opacity-45 blur-3xl ct-animate-float"
        style={{ background: "radial-gradient(circle, var(--ct-emerald-glow) 0%, transparent 68%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full opacity-30 blur-3xl ct-animate-float"
        style={{
          background: "radial-gradient(circle, var(--ct-gold-deep) 0%, transparent 70%)",
          animationDelay: "2.4s",
        }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[42rem] w-[42rem] rounded-full opacity-35 blur-3xl ct-animate-float"
        style={{
          background: "radial-gradient(circle, var(--ct-emerald-glow) 0%, transparent 66%)",
          animationDelay: "4.1s",
        }}
      />

      {/* Stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full ct-animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.gold ? "var(--ct-primary)" : "var(--ct-starlight, oklch(0.98 0.02 90))",
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      {/* 4-point sparkle glyphs */}
      {sparkles.map((s, i) => (
        <svg
          key={`sparkle-${i}`}
          viewBox="0 0 24 24"
          className="absolute ct-animate-twinkle ct-neon-gold"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }}
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill="var(--ct-primary)" />
        </svg>
      ))}

      {/* Shooting stars */}
      {shooting.map((s, i) => (
        <span
          key={`shoot-${i}`}
          className="absolute h-px origin-left"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.length,
            background: "linear-gradient(90deg, transparent, var(--ct-primary), transparent)",
            animation: `ct-shoot ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Gold dust motes */}
      {dust.map((d, i) => (
        <span
          key={`dust-${i}`}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            background: "var(--ct-primary)",
            opacity: 0.55,
            animation: `ct-rise ${d.duration}s linear ${d.delay}s infinite`,
            ["--ct-drift" as string]: `${d.drift}px`,
          }}
        />
      ))}

      {/* Floating laurel sprigs */}
      {laurels.map((l, i) => (
        <svg
          key={`laurel-${i}`}
          viewBox="0 0 48 48"
          className="absolute ct-animate-laurel opacity-40"
          style={{ left: `${l.left}%`, top: `${l.top}%`, width: l.size, height: l.size, animationDelay: `${l.delay}s` }}
        >
          <path
            d="M24 44C14 38 8 28 9 14c8 2 14 8 15 16 1-8 7-14 15-16 1 14-5 24-15 30Z"
            fill="none"
            stroke="var(--ct-primary)"
            strokeWidth="1.5"
          />
        </svg>
      ))}

      {/* Rising gold stars */}
      {risingStars.map((s, i) => (
        <svg
          key={`rising-${i}`}
          viewBox="0 0 24 24"
          className="absolute bottom-0"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `ct-rise ${s.duration}s linear ${s.delay}s infinite`,
            ["--ct-drift" as string]: "24px",
          }}
        >
          <path
            d="M12 1.6l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.4 5.7 21l1.5-7.1L1.8 9l7.2-.8z"
            fill="var(--ct-accent)"
            opacity="0.8"
          />
        </svg>
      ))}

      <style>{`
        @keyframes ct-rise {
          0% { transform: translate3d(0, 0, 0); opacity: 0; }
          12% { opacity: 0.85; }
          100% { transform: translate3d(var(--ct-drift, 0px), -110vh, 0); opacity: 0; }
        }
        @keyframes ct-shoot {
          0% { transform: translate3d(0,0,0) rotate(18deg); opacity: 0; }
          8% { opacity: 1; }
          40% { transform: translate3d(60vw, 32vh, 0) rotate(18deg); opacity: 0; }
          100% { transform: translate3d(60vw, 32vh, 0) rotate(18deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
