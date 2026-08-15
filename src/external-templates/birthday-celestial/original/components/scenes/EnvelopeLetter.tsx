import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useTypewriter } from "../../hooks/use-typewriter";
import { GlowButton } from "../GlowButton";

const DEFAULT_LETTER = `Happy Birthday, Jana, my love.

Today is all about you — and you deserve every bit of happiness in this world.

Thank you for being my world, my Jana, and for making every moment so beautiful. Your smile lights up my darkest days, your kindness touches my soul, and everything about you is my absolute favorite.

You are my forever person, the one I want to make memories with for the rest of my life. Every laugh, every moment, every memory - they're all treasures I hold close to my heart.

I wish I could give you the entire universe, but for now, let me give you this little galaxy filled with all my love.

Happy Birthday, with all my heart and soul.

Forever yours,
Your love ♡`;

interface EnvelopeLetterProps {
  onNext: () => void;
  letterTitle?: string;
  letterSubtitle?: string;
  letterBody?: string;
  envelopeImageUrl?: string;
}

export function EnvelopeLetter({
  onNext,
  letterTitle = "A Special Message",
  letterSubtitle = "Click the envelope to read my letter for you 💌",
  letterBody = DEFAULT_LETTER,
  envelopeImageUrl = "/templates/birthday-celestial/images/envelope.webp",
}: EnvelopeLetterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { out } = useTypewriter(letterBody, 14, 450);

  if (!isOpen) {
    return (
      <div className="relative flex w-full flex-1 flex-col items-center justify-center px-5 py-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-3 text-glow">
            {letterTitle}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {letterSubtitle}
          </p>
        </motion.div>

        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative group"
        >
          {/* Floating hearts around envelope */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl pointer-events-none"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-110px)`,
              }}
              animate={{
                y: [0, -16, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              💕
            </motion.div>
          ))}

          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-80 sm:w-96 max-w-full"
          >
            <img
              src={envelopeImageUrl}
              alt="Love Letter Envelope"
              className="w-full h-auto drop-shadow-[0_20px_60px_rgba(255,105,180,0.4)]"
            />

            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-3xl bg-primary/30 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm text-muted-foreground mt-6"
          >
            ✨ Click to open ✨
          </motion.p>
        </motion.button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
      >
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 glass rounded-full p-3 hover:bg-primary/20 transition-colors"
          aria-label="Close letter"
        >
          <X className="h-6 w-6 text-foreground" />
        </motion.button>

        <div className="relative w-full max-w-2xl max-h-[80vh]">
          <motion.div
            initial={{ scale: 0.8, rotateY: -90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-md bg-[linear-gradient(160deg,oklch(0.92_0.045_88),oklch(0.84_0.06_78))] px-6 sm:px-8 py-8 text-left shadow-[0_0_50px_oklch(0.87_0.12_88/0.28),var(--shadow-glow-soft)] max-h-[70vh]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent,transparent_25px,oklch(0.4_0.06_300/0.07)_26px)]" />
              <div className="relative max-h-[65vh] overflow-y-auto pr-2 scrollbar-hide">
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-paper-ink font-medium">
                  {out}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="ml-0.5 inline-block h-4 w-[2px] bg-paper-ink align-middle"
                  />
                </p>
              </div>
            </motion.div>

            <div className="mt-6 text-center">
              <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
                Continue
              </GlowButton>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
