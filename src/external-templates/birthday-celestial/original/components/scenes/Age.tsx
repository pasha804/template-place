import { motion } from "framer-motion";
import { Confetti } from "../Confetti";
import { ArrowRight, Sparkles } from "lucide-react";
import { GlowButton } from "../GlowButton";
import { SceneShell } from "../SceneShell";
import { useState, useEffect } from "react";

interface AgeProps {
  onNext: () => void;
  age?: number;
  birthdayName?: string;
  ageNickname?: string;
  ageSpecialMessage?: string;
  ageNotes?: string[];
  ageGifUrl?: string;
}

export function Age({
  onNext,
  age = 25,
  birthdayName = "Jana",
  ageNickname = "Jana",
  ageSpecialMessage = "Happy Birthday to the most special person in my life! Wishing you endless happiness, love, and many many happy returns of the day! 💖",
  ageNotes = [
    "May Allah bless you with endless joy, happiness, and keep us together always 🌹",
    "May Allah protect your beautiful smile and keep you in His divine care always ✨",
    "Always by your side, forever and always 💝",
  ],
  ageGifUrl = "/templates/birthday-celestial/gifs/heppi.gif",
}: AgeProps) {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          Continue the Journey
        </GlowButton>
      }
    >
      <Confetti active={showFireworks} />
      <div className="relative mx-auto w-full max-w-2xl text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <span className="inline-block text-6xl">🎉</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl sm:text-3xl text-muted-foreground mb-4 font-medium"
        >
          Today, {birthdayName}, you turn...
        </motion.h2>

        <div className="flex items-center justify-center gap-6 my-10">
          {String(age)
            .split("")
            .map((digit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 0.6 + i * 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="glass rounded-3xl p-6 sm:p-8 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center glow-ring"
              >
                <span className="text-6xl sm:text-8xl text-primary text-glow font-extrabold">{digit}</span>
              </motion.div>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-3xl sm:text-4xl text-primary text-glow font-bold tracking-wider mb-8"
        >
          YEARS OLD
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="glass rounded-3xl px-8 py-6 max-w-lg mx-auto mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="h-5 w-5 text-gold animate-glow-pulse" />
            <p className="text-xl sm:text-2xl text-primary text-glow font-semibold">
              Welcome to {age}, {ageNickname} 🎂
            </p>
            <Sparkles className="h-5 w-5 text-gold animate-glow-pulse" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {ageSpecialMessage}
          </p>
        </motion.div>

        {ageNotes.map((note, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + idx * 0.3, duration: 0.8 }}
            className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-3 mt-3 max-w-lg mx-auto text-left"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {note}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.8 }}
          className="mt-8"
        >
          <img
            src={ageGifUrl}
            alt="Happy celebration"
            className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-2xl object-cover glass p-2"
          />
        </motion.div>
      </div>
    </SceneShell>
  );
}
