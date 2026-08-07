// @ts-nocheck
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HEARTS_DATA = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: Math.random() * 98 + 1,
  delay: Math.random() * 10,
  duration: 7 + Math.random() * 9,
  size: 14 + Math.random() * 28,
  emoji: ["\u{1F497}", "\u{1F496}", "\u{1F338}", "\u{1F495}", "\u2728", "\u{1F337}", "\u2764\uFE0F", "\u{1F970}"][i % 8],
}));

function Hearts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      {HEARTS_DATA.map((h) => (
        <span key={h.id} className="heart-particle"
          style={{ left: `${h.left}%`, fontSize: `${h.size}px`,
            animationName: "sa-floatUp", animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`, animationTimingFunction: "ease-in",
            animationIterationCount: "infinite", animationFillMode: "both" }}>
          {h.emoji}
        </span>
      ))}
    </>
  );
}

type Step = "intro" | "hey" | "gussa" | "chances" | "sorry" | "friends" | "yay";
type Mood = "boht" | "thora" | "nahi";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -20 },
  transition: { duration: 0.5 },
};

const PINK = "#e11d48";
const DISPLAY_FONT = "'Dancing Script', cursive";

export default function App({ personName }: { personName?: string }) {
  const name = personName || "Kashaf";
  const [step, setStep]  = useState<Step>("intro");
  const [mood, setMood]  = useState<Mood>("thora");

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center px-4 py-10">
      <Hearts />
      <div className="relative z-10 w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === "intro"   && <Intro   key="intro"   onNext={() => setStep("hey")} personName={name} />}
          {step === "hey"     && <Hey     key="hey"     onNext={() => setStep("gussa")} personName={name} />}
          {step === "gussa"   && <Gussa   key="gussa"   onPick={(m) => { setMood(m); setStep("chances"); }} personName={name} />}
          {step === "chances" && <Chances key="chances" mood={mood} onNext={() => setStep("sorry")} personName={name} />}
          {step === "sorry"   && <Sorry   key="sorry"   mood={mood} onNext={() => setStep("friends")} personName={name} />}
          {step === "friends" && <Friends key="friends" onYes={() => setStep("yay")} personName={name} />}
          {step === "yay"     && <Yay     key="yay"     personName={name} />}
        </AnimatePresence>
      </div>
    </main>
  );
}

/* ── Intro ── */
function Intro({ onNext, personName }: { onNext: () => void, personName: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      className="text-center relative"
    >
      <div className="intro-card p-8 md:p-14 mx-auto max-w-xl">
        <motion.div initial={{ scale: 0, rotate: -180, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }} className="text-8xl mb-3 select-none">
          💌
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="text-xs tracking-[0.35em] uppercase font-bold mb-1" style={{ color: PINK }}>
          ✦ A little note for ✦
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 120 }}
          style={{ fontFamily: DISPLAY_FONT, fontSize: "clamp(4rem, 14vw, 7rem)",
            background: "linear-gradient(135deg, #e11d48 0%, #f472b6 60%, #e11d48 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", filter: "drop-shadow(0 2px 8px rgba(236,72,153,0.25))" }}>
          {personName}
        </motion.h1>

        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 150 }} className="my-6">
          <img src="/templates/sorry-apology/please.gif" alt="please"
            className="mx-auto h-40 w-40 drop-shadow-lg animate-heartbeat" />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
          className="max-w-sm mx-auto font-medium italic leading-relaxed px-4 py-3 rounded-2xl text-sm"
          style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(236,72,153,0.2)", color: "#7c1040" }}>
          "Tumhare baalo se lekar tumhari smile tak — sab yaad aata hai. Ek minute do please?"
        </motion.p>

        <motion.button initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.07, boxShadow: "0 20px 40px -8px rgba(236,72,153,0.45)" }}
          whileTap={{ scale: 0.95 }} onClick={onNext} className="btn-cute mt-7 text-lg px-8 py-3">
          Open the letter 💖
        </motion.button>
      </div>
    </motion.section>
  );
}

/* ── Hey ── */
function Hey({ onNext, personName }: { onNext: () => void; personName: string }) {
  return (
    <motion.section {...fadeUp} className="text-center">
      <img src="/templates/sorry-apology/tears.gif" alt="" className="mx-auto mb-4 h-32" />
      <h2 style={{ fontFamily: DISPLAY_FONT, color: PINK }} className="text-5xl md:text-6xl">
        Hey, {personName}...
      </h2>
      <p className="mt-4 max-w-md mx-auto text-lg" style={{ color: "rgba(100,20,50,0.7)" }}>
        I know aap thora naraz ho, but can you please give me 1 minute? Just 1 minute.
      </p>
      <button onClick={onNext} className="btn-cute mt-8">Theek hai, bolo 🌷</button>
    </motion.section>
  );
}

/* ── Gussa ── */
function Gussa({ onPick }: { onPick: (m: Mood) => void }) {
  return (
    <motion.section {...fadeUp} className="text-center">
      <h2 style={{ fontFamily: DISPLAY_FONT, color: PINK }} className="text-4xl md:text-5xl">
        Imaandari se batao, kitna gussa ho? 😢
      </h2>
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <button className="btn-cute px-6 py-3 text-lg" onClick={() => onPick("boht")}>Boht Zyada! 😠</button>
        <button className="btn-cute px-6 py-3 text-lg" onClick={() => onPick("thora")}>Thora sa 🥲</button>
        <button className="btn-cute px-6 py-3 text-lg" onClick={() => onPick("nahi")}>Nahi bataungi 🙄</button>
      </div>
    </motion.section>
  );
}

/* ── Chances ── */
const chancesCopy: Record<Mood, { text: string; btn: string }> = {
  boht:  { text: "Haww itna zyada? 🥺 Acha theek hai, main double effort karunga. Ek chance to banta hai na?", btn: "Chalo aage suno →" },
  thora: { text: "Chalo shukar hai thora sa hi hai. Iska matlab chances hain ke aap maan jaogi!! 😊❤️", btn: "Acha chalo, aage dekho →" },
  nahi:  { text: "Nahi bataogi? 🙈 Hmm... iska matlab andar andar se maan gayi ho, bas dikha rahi ho gussa 😏", btn: "Acha suno phir →" },
};

function Chances({ mood, onNext }: { mood: Mood; onNext: () => void }) {
  const c = chancesCopy[mood];
  return (
    <motion.section {...fadeUp} className="text-center">
      <p className="font-semibold text-xl md:text-2xl max-w-lg mx-auto bg-white/40 p-6 rounded-2xl shadow-sm border border-white/50"
        style={{ color: PINK }}>
        {c.text}
      </p>
      <img src="/templates/sorry-apology/25.gif" alt="" className="mx-auto my-8 h-36" />
      <button onClick={onNext} className="btn-cute">{c.btn}</button>
    </motion.section>
  );
}

/* ── Sorry ── */
function getSorryCopy(name: string): Record<Mood, { title: string; body: string }> {
  return {
    boht:  { title: `I'm Really Really Sorry, ${name}!`, body: `Mujhe pata hai maine boht bara mistake kiya. Tumhara itna gussa deserve karta hun main. But please, ek aakhri mauka? Main promise karta hun ab kabhi aisa nahi hoga. Tumhari smile ke bina sab suna suna lagta hai. 🥺` },
    thora: { title: `I'm So Sorry, ${name}!`, body: `Life is way too short to stay mad at someone who thinks you're the most amazing person on earth. Tumhari smile, tumhare baalo ki khushboo, tumhari har baat — sab kuch miss kar raha hun. I promise I'll try to be better. Maan jao na please? 🌷` },
    nahi:  { title: `Chup ho? Main bolta hun phir...`, body: `Tum kuch mat bolo, bas suno. Tum meri sabse pyari ho, aur main tumhe kabhi hurt nahi karna chahta tha. Chalo, thora sa muskura do — main jaanta hun andar se tum maan chuki ho. 😚` },
  };
}

function Sorry({ mood, onNext, personName }: { mood: Mood; onNext: () => void; personName: string }) {
  const copy = getSorryCopy(personName);
  const c = copy[mood];
  return (
    <motion.section {...fadeUp} className="text-center">
      <h2 style={{ fontFamily: DISPLAY_FONT, color: PINK }} className="text-4xl md:text-5xl mb-4">
        {c.title}
      </h2>
      <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed bg-white/40 p-6 rounded-2xl border border-white/50" style={{ color: "#7c1040" }}>
        {c.body}
      </p>
      <button onClick={onNext} className="btn-cute mt-8">One last question... 💖</button>
    </motion.section>
  );
}

/* ── Friends (runaway NO button) ── */
function Friends({ onYes }: { onYes: () => void }) {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [tries, setTries]  = useState(0);

  const runAway = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e && e.cancelable) e.preventDefault();
    if (typeof window === "undefined") return;
    const btnW = 130, btnH = 56, margin = 20;
    let x: number, y: number;
    do {
      x = Math.random() * (window.innerWidth  - btnW - margin * 2) + margin;
      y = Math.random() * (window.innerHeight - btnH - margin * 2) + margin;
    } while (noPos && Math.abs(x - noPos.x) < 100 && Math.abs(y - noPos.y) < 100);
    setNoPos({ x, y });
    setTries((t) => t + 1);
  };

  const noMessages = ["NO 🙈","Nahi! 😤","Nope 🏃‍♀️","Pakad lo try karo 😂","Haha nahi! 💨","Aise nahi 😜","Pata hai nahi kahunga 😈","Bohot slow ho 🐢","Never! ...Just kidding 💕"];
  const label = noMessages[Math.min(tries, noMessages.length - 1)];

  return (
    <motion.section {...fadeUp} className="text-center">
      <h2 style={{ fontFamily: DISPLAY_FONT, color: PINK }} className="text-5xl md:text-6xl">
        Are we friends again? ✨
      </h2>
      <p className="mt-3 text-lg" style={{ color: "rgba(100,20,50,0.7)" }}>
        Choose wisely... (ek button boht shararati hai 😏)
      </p>

      {tries > 0 && (
        <motion.div key={tries} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-sm font-semibold h-6" style={{ color: PINK }}>
          {tries === 1 && "Oof! Woh bhag gayi! 😂"}
          {tries === 2 && "Phir se? Haha! 🤭"}
          {tries === 3 && "3 baar try! Kashaf please 🥺"}
          {tries >= 4 && tries < 7 && `${tries} baar! Main nahi thakunga 💪`}
          {tries >= 7 && "Ok ok... YES dabao please 🙏💖"}
        </motion.div>
      )}
      {tries === 0 && <div className="mt-4 h-6" />}

      <div className="mt-8 flex items-center justify-center gap-6">
        <motion.button onClick={onYes}
          whileHover={{ scale: 1.08, boxShadow: "0 18px 36px -6px rgba(236,72,153,0.45)" }}
          whileTap={{ scale: 0.95 }} className="btn-cute text-xl px-10 py-4">
          YES! 💖
        </motion.button>

        {noPos === null && (
          <motion.button onMouseEnter={runAway} onTouchStart={runAway} onClick={runAway}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
            className="btn-cute text-xl px-10 py-4">
            {label}
          </motion.button>
        )}
      </div>

      {noPos !== null && (
        <motion.button onMouseEnter={runAway} onTouchStart={runAway} onClick={runAway}
          animate={{ left: noPos.x, top: noPos.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="btn-cute text-lg px-8 py-3 fixed z-[60] select-none"
          style={{ left: noPos.x, top: noPos.y, position: "fixed" }}>
          {label}
        </motion.button>
      )}
    </motion.section>
  );
}

/* ── Yay ── */
function Yay() {
  return (
    <motion.section {...fadeUp} className="text-center">
      <motion.h2 initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ fontFamily: DISPLAY_FONT, color: PINK }}
        className="text-7xl md:text-8xl drop-shadow-md">
        Yayyy! 😍
      </motion.h2>
      <p className="mt-6 text-xl font-medium max-w-md mx-auto bg-white/40 p-4 rounded-xl border border-white/50 shadow-sm"
        style={{ color: "rgba(30,10,15,0.85)" }}>
        I knew you couldn't stay mad for too long, Kashaf. Best friends forever? 💗
      </p>
      <div className="flex justify-center gap-4 mt-8 text-6xl">
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>💖</motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.15 }}>✨</motion.span>
        <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}>🎈</motion.span>
      </div>
      <img src="/templates/sorry-apology/heppi.gif" alt="" className="mx-auto mt-10 h-48 drop-shadow-lg" />
    </motion.section>
  );
}
