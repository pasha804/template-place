import { useMemo, useState, useEffect, useRef } from "react";
const heroCouple = "/templates/birthday-rose/images/hero-couple.jpg";
const p1 = "/templates/birthday-rose/images/p1.jpg";
const p2 = "/templates/birthday-rose/images/p2.jpg";
const p3 = "/templates/birthday-rose/images/p3.jpg";
const p4 = "/templates/birthday-rose/images/p4.jpg";
const p5 = "/templates/birthday-rose/images/p5.jpg";
const p6 = "/templates/birthday-rose/images/p6.jpg";
const album1 = "/templates/birthday-rose/images/album1.jpg";
const album2 = "/templates/birthday-rose/images/album2.jpg";
const album3 = "/templates/birthday-rose/images/album3.jpg";
const pleaseGif = "/templates/birthday-rose/gifs/please.gif";
const kissGif = "/templates/birthday-rose/gifs/ryuji takasu kiss GIF.gif";


type Stage = "lock" | "hero" | "music" | "gallery" | "message" | "quiz" | "quiz-complete" | "finale";

/* ─────────────────────────────────────────
   Floating hearts
───────────────────────────────────────── */
function Hearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 22,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        key: i,
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <span
          key={h.key}
          className="heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Section wrapper
───────────────────────────────────────── */
function SectionShell({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 fade-up">
      {label && <p className="font-script text-2xl text-primary mb-2 tracking-wide">{label}</p>}
      {children}
    </section>
  );
}

/* ─────────────────────────────────────────
   Typewriter hook
───────────────────────────────────────── */
function useTypewriter(fullText: string, speed = 35, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let idx = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        idx++;
        setDisplayed(fullText.slice(0, idx));
        if (idx >= fullText.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [fullText, speed, startDelay]);

  return { displayed, done };
}

/* ─────────────────────────────────────────
   Message section — typewriter effect
───────────────────────────────────────── */
const BIRTHDAY_MSG =
  `Happy birthday My Love 🎂\n\nToday, on your special day, I just want to stop everything and remind you how incredibly loved you are. You are not just a part of my life — you are the most beautiful part of it.\n\nEvery single day with you feels like a gift I never deserved but am so grateful for. Your smile lights up my whole world. Your laugh is my favourite sound. The way you care, the way you love — it makes me fall for you all over again, every single day.\n\nYou are not just special to me... you are my whole world, my peace, my home. I love you more than words could ever say.\n\nHappy Birthday, my Jaaan. 💗`;

function MessageSection({ onNext, message }: { onNext: () => void, message?: string }) {
  const { displayed, done } = useTypewriter(message || BIRTHDAY_MSG, 30, 300);

  // Split into lines preserving \n
  const lines = displayed.split("\n");

  return (
    <SectionShell label="A Message for My Love">
      <div className="card-panel p-8 md:p-10 max-w-2xl w-full min-h-[320px]">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground whitespace-pre-wrap">
          {lines.map((line, i) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
          {/* blinking cursor */}
          {!done && (
            <span className="typewriter-cursor">|</span>
          )}
        </p>
      </div>
      {done && (
        <button
          className="btn-outline-gold mt-10 fade-up"
          onClick={onNext}
        >
          ONE LAST THING 💗
        </button>
      )}
    </SectionShell>
  );
}

/* ─────────────────────────────────────────
   Lightbox
───────────────────────────────────────── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl leading-none hover:text-primary transition"
          aria-label="Close"
        >
          ✕
        </button>
        <img
          src={src}
          alt="Full view"
          className="w-full rounded-xl shadow-[0_0_60px_rgba(255,100,100,0.4)] object-contain max-h-[85vh]"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Quiz
───────────────────────────────────────── */
const QUIZ: { q: string; opts: string[]; correct: string }[] = [
  {
    q: "What is my absolute favorite thing about you?",
    opts: ["Your Smile", "Your Heart", "Everything", "Your Kindness"],
    correct: "Everything",
  },
  {
    q: "How much do I love you?",
    opts: ["Try again, Love!", "100%", "Infinity", "More than words can say"],
    correct: "More than words can say",
  },
];

function QuizSection({ step, onCorrect }: { step: number; onCorrect: () => void }) {
  const item = QUIZ[step];
  const [shake, setShake] = useState(false);
  const [wrongMsg, setWrongMsg] = useState(false);

  // Reset state when step changes
  useEffect(() => {
    setShake(false);
    setWrongMsg(false);
  }, [step]);

  function handleAnswer(opt: string) {
    if (opt === item.correct) {
      setShake(false);
      setWrongMsg(false);
      onCorrect();
    } else {
      setShake(true);
      setWrongMsg(true);
      if ("vibrate" in navigator) navigator.vibrate([150, 80, 150]);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <SectionShell label="The Love Quiz">
      <div className={`card-panel p-8 max-w-lg w-full ${shake ? "quiz-shake" : ""}`}>
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-6">{item.q}</h2>
        {wrongMsg && (
          <p className="text-center text-sm font-semibold mb-4 animate-pulse" style={{ color: "oklch(0.72 0.18 15)" }}>
            ❌ No, try again! 💕
          </p>
        )}
        <div className="flex flex-col gap-3">
          {item.opts.map((o) => (
            <button
              key={o}
              onClick={() => handleAnswer(o)}
              className="w-full border border-primary/30 rounded-md py-3 text-sm hover:bg-primary/10 hover:border-primary transition"
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

/* ─────────────────────────────────────────
   Main page
───────────────────────────────────────── */
export default function Page({ config = {} }: { config?: any }) {
  const [stage, setStage] = useState<Stage>("lock");
  const [password, setPassword] = useState("");
  const [pwShake, setPwShake] = useState(false);
  const [showPleaseGif, setShowPleaseGif] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const PASSWORD = config.password || "0818";
  const unlockHint = config.unlockHint || "Type the secret to unlock Surprise…";
  const heroCouplePhoto = config.heroImgUrl || heroCouple;
  const subtitle = config.heroSubtitle || "For My Jaaan 💗";
  const title = config.heroTitle || "Happy Birthday";
  const tagline = config.birthdayName ? `To ${config.birthdayName}` : (config.heroTagline || "To My Love");
  const msg = config.letterBody || config.birthdayMessage || BIRTHDAY_MSG;

  function tryUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim() === PASSWORD) {
      setStage("hero");
      setShowPleaseGif(false);
    } else {
      setPwShake(true);
      setShowPleaseGif(true);
      if ("vibrate" in navigator) navigator.vibrate([200, 100, 200]);
      setTimeout(() => setPwShake(false), 600);
    }
  }

  function handleQuizCorrect() {
    if (quizStep < QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setStage("quiz-complete");
    }
  }

  const rawPhotos = Array.isArray(config.photos) && config.photos.length > 0 ? config.photos : null;
  const defaultPhotos = [p1, p2, p3, p4, p5, p6];
  const emojis = ["🥰", "🤍", "✨", "💜", "❤️", "🤍"];

  const galleryItems = Array.from({ length: 6 }).map((_, i) => ({
    img: (rawPhotos && rawPhotos[i]) || config[`photo${i + 1}`] || defaultPhotos[i],
    emoji: emojis[i % emojis.length],
  }));

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hearts />

      {/* lightbox overlay */}
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      {/* ── LOCK / PASSWORD ── */}
      {stage === "lock" && (
        <SectionShell label="Only For My Love 💗">
          <h1 className="font-script text-6xl md:text-8xl text-primary text-center leading-none drop-shadow-[0_0_25px_rgba(255,180,180,0.35)]">
            Enter the Password
          </h1>
          <form
            onSubmit={tryUnlock}
            className={`card-panel mt-10 w-full max-w-md p-8 text-center ${pwShake ? "pw-shake" : ""}`}
          >
            <div className="text-4xl mb-3">🔐</div>
            <h2 className="font-serif text-2xl text-foreground">This gift is locked</h2>
            <p className="text-sm text-muted-foreground italic mt-2">{unlockHint}</p>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (showPleaseGif) setShowPleaseGif(false);
              }}
              placeholder="Enter password"
              type="password"
              className="mt-6 w-full bg-transparent border border-primary/40 rounded-md px-4 py-3 text-center outline-none focus:border-primary focus:shadow-[0_0_15px_rgba(255,180,180,0.3)] transition"
            />
            {showPleaseGif && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <img src={pleaseGif} alt="Please try again" className="w-40 rounded-lg mx-auto" />
                <p className="text-sm font-semibold" style={{ color: "oklch(0.72 0.18 15)" }}>
                  Wrong password 💔 Try again!
                </p>
              </div>
            )}
            <button type="submit" className="btn-outline-gold mt-6">
              UNLOCK
            </button>
          </form>
        </SectionShell>
      )}

      {/* ── HERO ── */}
      {stage === "hero" && (
        <SectionShell>
          <div className="card-panel p-2 max-w-2xl w-full overflow-hidden rounded-xl">
            <img
              src={heroCouplePhoto}
              alt="Couple at sunset"
              className="w-full rounded-md hero-img-float"
              width={1280}
              height={720}
            />
          </div>
          <p className="font-script text-xl text-primary mt-8">{subtitle}</p>
          <h1 className="font-script text-6xl md:text-8xl text-primary text-center mt-2 drop-shadow-[0_0_25px_rgba(255,180,180,0.4)]">
            {title}
          </h1>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mt-6">{tagline}</h2>
          <p className="italic text-muted-foreground mt-6 text-sm">A journey through my heart, just for you…</p>
          <button className="btn-outline-gold mt-10" onClick={() => setStage("music")}>
            OPEN MY GIFT
          </button>
        </SectionShell>
      )}

      {/* ── MUSIC ── */}
      {stage === "music" && (
        <SectionShell label="Happy Birthday Girlll">
          <h1 className="font-serif text-4xl md:text-6xl text-gold text-center max-w-3xl leading-tight">
            The Soundtracks That's Remind's me of us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl">
            {[
              { img: album1, title: "Jo Tum Mere Ho" },
              { img: album2, title: "Tum Jo Na Kaha" },
              { img: album3, title: "Iraaday" },
            ].map((t) => (
              <div key={t.title} className="card-panel p-3 album-hover">
                <img
                  src={t.img}
                  alt={t.title}
                  className="w-full aspect-square object-cover rounded-md"
                  loading="lazy"
                />
                <p className="text-center py-3 text-sm tracking-wide">{t.title}</p>
              </div>
            ))}
          </div>
          <button className="btn-outline-gold mt-12" onClick={() => setStage("gallery")}>
            💗 VIEW OUR MEMORIES 💗
          </button>
        </SectionShell>
      )}

      {/* ── GALLERY ── */}
      {stage === "gallery" && (
        <SectionShell label="I Love U Soo Much">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl w-full">
            {galleryItems.map((it, i) => (
              <figure
                key={i}
                className="card-panel p-2 flex flex-col gallery-card cursor-pointer"
                onClick={() => setLightboxSrc(it.img)}
                title="Click to view full"
              >
                <div className="overflow-hidden rounded">
                  <img
                    src={it.img}
                    alt="memory"
                    className="w-full aspect-[3/4] object-cover gallery-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="text-center text-xl py-2">{it.emoji}</figcaption>
              </figure>
            ))}
          </div>
          <button className="btn-outline-gold mt-12" onClick={() => setStage("message")}>
            READ MY NOTE
          </button>
        </SectionShell>
      )}

      {/* ── MESSAGE — typewriter ── */}
      {stage === "message" && (
        <MessageSection
          message={msg}
          onNext={() => {
            setStage("quiz");
            setQuizStep(0);
          }}
        />
      )}

      {/* ── QUIZ ── */}
      {stage === "quiz" && (
        <QuizSection step={quizStep} onCorrect={handleQuizCorrect} />
      )}

      {/* ── QUIZ COMPLETE ── */}
      {stage === "quiz-complete" && (
        <SectionShell label="The Love Quiz">
          <div className="card-panel p-10 max-w-xl w-full text-center">
            <h2 className="font-script text-4xl md:text-5xl text-primary leading-tight">
              You hold the key to my heart! 💗
            </h2>
          </div>
          <button className="btn-outline-gold mt-10" onClick={() => setStage("finale")}>
            UNLOCK SURPRISE
          </button>
        </SectionShell>
      )}

      {/* ── FINALE — kiss gif + certificate ── */}
      {stage === "finale" && (
        <SectionShell>
          <div className="card-panel p-2 max-w-2xl w-full mb-8 overflow-hidden rounded-xl">
            <img
              src={kissGif}
              alt="Love"
              className="w-full rounded-md"
            />
          </div>

          <div className="certificate-panel max-w-2xl w-full p-8 md:p-12 text-center relative">
            <p className="font-script text-3xl md:text-4xl text-primary mb-4">Certificate of My Heart</p>
            <h1 className="font-serif text-4xl md:text-5xl text-gold font-bold leading-tight mb-6">
              The Owner of My World--LOVE
            </h1>
            <p className="text-sm md:text-base text-muted-foreground italic leading-relaxed">
              Presented to You, for stealing my heart and making every second of my existence a beautiful dream.
            </p>
            <p className="font-script text-4xl md:text-5xl text-primary mt-8">
              I Love You! 💗
            </p>
          </div>

          <button
            className="btn-outline-gold mt-10"
            onClick={() => {
              setStage("lock");
              setPassword("");
              setShowPleaseGif(false);
            }}
          >
            REPLAY
          </button>
        </SectionShell>
      )}
    </main>
  );
}
