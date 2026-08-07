import { motion } from "framer-motion";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";


const LINE_H = 40; // px — height of each ruled line

const paperStyle: React.CSSProperties = {
  background: `
    repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent ${LINE_H - 1}px,
      rgba(100,70,40,0.20) ${LINE_H - 1}px,
      rgba(100,70,40,0.20) ${LINE_H}px
    ),
    linear-gradient(160deg, #fefce8 0%, #fdf3c8 40%, #f9e9aa 100%)
  `,
  backgroundSize: `100% ${LINE_H}px, 100% 100%`,
  lineHeight: `${LINE_H}px`,
  color: "#1e0f00",
  fontFamily: "'Caveat', cursive",
  fontSize: "1.15rem",
  padding: `${LINE_H}px 28px ${LINE_H * 1.5}px 68px`,
  borderRadius: "4px",
  boxShadow: "0 24px 64px rgba(0,0,0,0.50), inset 0 0 30px rgba(180,140,60,0.10)",
  position: "relative" as const,
  width: "100%",
  transform: "rotate(-0.8deg)",
};

export default function NotePage({ onNext, noteText }: { onNext?: () => void, noteText?: string }) {
  const textContent = noteText || "Happy Birthday meri Moiza ❤️🎂 Aaj ka din meri life ka sabse special din hai, kyunki aaj ap paida hui thi… woh insaan jo meri zindagi ko itna khoobsurat bana deti hai. Ap sirf meri partner nahi ho. Ap meri khushi ho 😍💗, mera sukoon ho, aur meri har dua ka sabse haseen jawab ho 🌷\n\nMain bas yeh chahta hoon ke Allah Apko hamesha khush rakhy 🥹✨, har gham se door rakhy. Thank you for being in my life, for loving me 💖, aur mujhe itna special feel karane ke liye ❤️\n\nI LOVE YOU SOO MUCH 🐼\n\nFrom, Asher"
  const paragraphs = textContent.split("\n\n")

  return (
    <PageWrap>
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start">
        {/* ── Letter ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, type: "spring", damping: 16 }}
          className="w-full md:flex-[1.55]"
        >
          <div style={paperStyle}>
            {/* Red margin line */}
            <div
              style={{
                position: "absolute",
                left: "52px",
                top: 0,
                bottom: 0,
                width: "1.5px",
                background: "rgba(210,55,55,0.40)",
              }}
            />

            {/* Hole punches */}
            {[15, 48, 81].map((pct) => (
              <div
                key={pct}
                style={{
                  position: "absolute",
                  left: "18px",
                  top: `${pct}%`,
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  background: "rgba(200,160,80,0.22)",
                  border: "1px solid rgba(160,120,60,0.25)",
                }}
              />
            ))}

            <p style={{ marginBottom: 0 }}>My Dearest Love,</p>

            {paragraphs.map((p, i) => (
              <p key={i} style={{ marginTop: i === 0 ? `${LINE_H}px` : `${LINE_H}px` }}>
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ── Side card ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card w-full self-center rounded-2xl p-7 md:flex-[0.7] md:p-8"
        >
          <CursiveTitle>A Love Note</CursiveTitle>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A few words straight from the bottom of my heart — read them slowly, they're all for
            you.
          </p>
          <div className="mt-8">
            <GalaxyLink onClick={onNext}>A Song For You 🎵</GalaxyLink>
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
