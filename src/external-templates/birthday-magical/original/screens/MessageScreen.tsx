import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const DEFAULT_LETTER = `My dearest Jana,

I don't know how to write this without feeling everything at once â€” but here goes.

The day you came into my life, something shifted. Like the universe had been holding its breath, and the moment I met you, it finally exhaled. I didn't know a person could make ordinary moments feel extraordinary just by being present in them â€” until you.

You are 18 today. Eighteen years of this world being lucky enough to have you in it. And I â€” I am the luckiest of all, because somehow, you chose me.

I love the way you laugh when something catches you off guard. I love how you care deeply about things that matter. I love the way you see beauty where others walk past it. I love that you're brave even when you're scared. I love every version of you â€” the one who's quiet, the one who's loud, the one who overthinks, and the one who surprises even herself.

You deserve every good thing the world has ever made. Every sunset, every song that gives you goosebumps, every warm moment, every dream that lights your eyes up â€” all of it is yours.

I promise to be your safe place, your biggest fan, and your most stubborn believer â€” on every single day that follows this one.

Happy 18th, Jana jaan.

I love you more than words know how to say.

Forever yours,
Your Love 💖`;

export default function MessageScreen({ onComplete, messageText, signature }: { onComplete: () => void; messageText?: string; signature?: string }) {
  const finalLetter = messageText 
    ? (signature ? `${messageText}\n\n${signature}` : messageText) 
    : DEFAULT_LETTER;
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!opened) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(finalLetter.slice(0, i));
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
      if (i >= finalLetter.length) {
        clearInterval(iv);
        if (!completedRef.current) {
          completedRef.current = true;
          setTimeout(onComplete, 2500);
        }
      }
    }, 28);
    return () => clearInterval(iv);
  }, [opened, onComplete]);

  return (
    <motion.div
      key="message"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bt7-screen-shell relative flex flex-col items-center justify-safe-center gap-6 py-12 sm:py-16"
    >
      <h2 style={{ fontFamily: "var(--bt7-font-display)" }} className="bt7-text-gradient-warm bt7-section-heading text-center">
        A Letter For You
      </h2>

      {!opened && (
        <motion.button
          type="button"
          onClick={() => setOpened(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bt7-perspective-1000 relative h-64 w-full max-w-md cursor-pointer"
        >
          <div className="bt7-glass-card relative h-full w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(225,29,72,0.5)]">
            {/* Envelope flap */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#fda4af]/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e11d48] to-[#d946ef] shadow-[0_0_50px_rgba(225,29,72,0.9)]"
              >
                <Heart className="h-10 w-10 text-white" fill="white" />
              </motion.div>
              <p style={{ fontFamily: "var(--bt7-font-display)" }} className="text-2xl text-white">
                Tap to open ðŸ’Œ
              </p>
              <p className="text-sm text-[#fda4af]">A letter sealed with love</p>
            </div>
          </div>
        </motion.button>
      )}

      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bt7-glass-card w-full max-w-2xl rounded-3xl p-6 shadow-[0_0_80px_rgba(217,70,239,0.4)]"
        >
          <div ref={scrollRef} className="max-h-[min(55dvh,28rem)] overflow-y-auto overscroll-contain pr-2 [-webkit-overflow-scrolling:touch]">
            <p
              style={{ fontFamily: "var(--bt7-font-display)" }}
              className="whitespace-pre-wrap text-base leading-relaxed text-white sm:text-2xl"
            >
              {typed}
              <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse bg-[#e11d48] shadow-[0_0_8px_#e11d48]" />
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-[#fbbf24]/80">
            <Heart className="h-4 w-4" fill="currentColor" />
            <span style={{ fontFamily: "var(--bt7-font-display)" }} className="text-lg">
              Sealed with all my love
            </span>
            <Heart className="h-4 w-4" fill="currentColor" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

