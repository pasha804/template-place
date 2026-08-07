import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageWrap, GalaxyLink } from "./PageWrap";
const hugImg = "/templates/birthday-galaxy/gifs/1-screen.gif";


export default function HeroPage({ onNext, recipientName }: { onNext?: () => void, recipientName?: string }) {
  const FULL_TEXT = recipientName ? `Happy Birthday ${recipientName}` : "Happy Birthday";
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 130);
    return () => clearInterval(id);
  }, []);

  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* Text card */}
        <div className="glass-card w-full rounded-2xl p-7 md:p-10">
          <h1
            className={`font-cursive text-gold-gradient shimmer text-5xl min-h-[1.2em] md:text-7xl ${
              done ? "" : "caret"
            }`}
          >
            {typed || "\u00A0"}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg"
          >
            Today the stars align just for you ✨ Welcome to a little galaxy of memories, love, and
            wishes I made especially for the most amazing person in my universe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-7"
          >
            <GalaxyLink onClick={onNext}>Enter the Galaxy 🚀</GalaxyLink>
          </motion.div>
        </div>

        {/* GIF — no wrapper border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex w-full justify-center"
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={hugImg}
              alt="A warm hug"
              width={512}
              height={512}
              fetchPriority="high"
              decoding="async"
              className="h-56 w-full max-w-sm rounded-2xl object-cover sm:h-64 md:h-72 md:max-w-none"
            />
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
