import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Pause, Play, SkipBack, SkipForward, Music2 } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

const DURATION = 263; // 4:23

const fmt = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

interface SongNewProps {
  onNext: () => void;
  songTitle?: string;
  songSubtitle?: string;
  songDescription?: string;
  songCoverUrl?: string;
  audioSrc?: string;
}

export function SongNew({
  onNext,
  songTitle = "Our Song",
  songSubtitle = "Walks like every moment with you",
  songDescription = "This song reminds me of every beautiful moment we've shared together. Every beat, every note, every word... it's all about us. 💕",
  songCoverUrl = "/templates/birthday-celestial/images/couple-galaxy.webp",
}: SongNewProps) {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(35);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setTime((t) => (t + 1) % DURATION), 1000);
    return () => clearInterval(id);
  }, [playing]);

  // Generate audio bars
  const bars = Array.from({ length: 18 }, (_, i) => ({
    height: 20 + Math.sin(i * 0.7) * 15,
    delay: i * 0.05,
  }));

  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <div className="flex flex-col items-center gap-4">
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
            Special Message
          </GlowButton>
        </div>
      }
    >
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left side - Album Art */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass shadow-[var(--shadow-glow)]">
              <div className="absolute inset-0">
                <img
                  src={songCoverUrl}
                  alt={songTitle}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Floating music notes */}
              {playing && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-primary/40"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: "50%",
                      }}
                      animate={{
                        y: [-20, -50],
                        opacity: [0, 1, 0],
                        rotate: [0, 15, 0],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    >
                      <Music2 className="h-6 w-6" />
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-3xl" />
          </motion.div>

          {/* Right side - Player Controls */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Song info */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                <div className="glass rounded-full p-3">
                  <Music2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                    NOW PLAYING
                  </p>
                  <h3 className="script text-3xl text-primary text-glow">{songTitle}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {songSubtitle}
              </p>
            </div>

            {/* Visualizer bars */}
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="flex items-end justify-center gap-1.5 h-20 sm:h-24 mb-6">
                {bars.map((bar, i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-full bg-primary"
                    animate={
                      playing
                        ? {
                            height: [`${bar.height}%`, `${bar.height + 30}%`, `${bar.height}%`],
                          }
                        : { height: "20%" }
                    }
                    transition={{
                      duration: 0.8,
                      delay: bar.delay,
                      repeat: playing ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-6">
                <span>{fmt(time)}</span>
                <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    animate={{ width: `${(time / DURATION) * 100}%` }}
                    transition={{ ease: "linear", duration: 0.9 }}
                  />
                </div>
                <span>{fmt(DURATION)}</span>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-center gap-6">
                <motion.button
                  type="button"
                  onClick={() => setTime((t) => Math.max(0, t - 15))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Rewind"
                >
                  <SkipBack className="h-6 w-6" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground glow-ring"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? (
                    <Pause className="h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
                  ) : (
                    <Play className="h-6 w-6 sm:h-7 sm:w-7 ml-1" fill="currentColor" />
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setTime((t) => Math.min(DURATION, t + 15))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Forward"
                >
                  <SkipForward className="h-6 w-6" />
                </motion.button>
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {songDescription}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SceneShell>
  );
}
