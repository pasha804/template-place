import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

export interface SecretCard {
  emoji: string;
  front: string;
  back: string;
}

const DEFAULT_SECRETS: SecretCard[] = [
  {
    emoji: "🤫",
    front: "A Little Secret 🤫",
    back: "You're honestly one of the best things that ever happened to me. ❤️💌",
  },
  {
    emoji: "👀",
    front: "Tap If You Love Me 👀❤️",
    back: "Congratulations… you just unlocked a lifetime supply of my love, care and annoying messages unlimited Lairyain, Unlimited gussa from your side not mine. 😂❤️💌",
  },
  {
    emoji: "🎁",
    front: "Your Final Surprise 🎁",
    back: "No matter how many birthdays come and go, I hope I'm still here making you smile on every single day meri jaan. Happy Birthday, my favourite person, my life partner, my KuchuPuchu😭. ❤️🎂",
  },
];

interface TapToRevealProps {
  onNext: () => void;
  revealTitle?: string;
  revealSubtitle?: string;
  secrets?: SecretCard[];
}

export function TapToReveal({
  onNext,
  revealTitle = "Tap to Open",
  revealSubtitle = "I've hidden some secrets just for you — Tap each card to reveal what's inside 💝",
  secrets = DEFAULT_SECRETS,
}: TapToRevealProps) {
  const activeSecrets = secrets && secrets.length > 0 ? secrets : DEFAULT_SECRETS;
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggleFlip = (index: number) => {
    setFlipped((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <SceneShell
      title={revealTitle}
      subtitle={revealSubtitle}
      footerSlot={
        <>
          <p className="text-xs text-muted-foreground">
            {flipped.size === activeSecrets.length
              ? "You've unlocked all the secrets! 💕"
              : `${activeSecrets.length - flipped.size} ${activeSecrets.length - flipped.size === 1 ? "secret" : "secrets"} remaining to unlock ✨`}
          </p>
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
            Continue
          </GlowButton>
        </>
      }
    >
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {activeSecrets.map((secret, index) => {
            const isFlipped = flipped.has(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="perspective-1000"
              >
                <motion.button
                  onClick={() => toggleFlip(index)}
                  whileHover={{ scale: 1.03, y: -6 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full h-80 cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of card */}
                    <div
                      className="absolute inset-0 glass rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-6 glow-ring"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="relative text-6xl sm:text-7xl"
                      >
                        {secret.emoji}
                        <motion.div
                          className="absolute -inset-8 rounded-full bg-primary/20 blur-xl -z-10"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>

                      <div className="text-center">
                        <p className="text-lg sm:text-xl font-bold text-primary mb-2 tracking-wide">
                          TAP TO OPEN
                        </p>
                        <div className="h-px w-28 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent mb-3" />
                        <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                          {secret.front}
                        </p>
                      </div>

                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-xs text-muted-foreground"
                      >
                        👆 Tap me
                      </motion.div>
                    </div>

                    {/* Back of card */}
                    <div
                      className="absolute inset-0 glass-deep rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="text-4xl">{secret.emoji}</div>

                      <div className="text-center">
                        <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                          {secret.back}
                        </p>
                      </div>

                      <div className="mt-2">
                        <Heart className="h-7 w-7 text-primary animate-glow-pulse" />
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Tap to flip back
                      </div>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
}
