import { motion } from "framer-motion";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const portrait = "/templates/birthday-galaxy/gifs/11-screen.gif";


export default function FinalPage({ onNext }: { onNext?: () => void }) {
  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* GIF — no border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex w-full justify-center"
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={portrait}
              alt="A little sketch of you"
              loading="lazy"
              width={512}
              height={512}
              className="h-56 w-full max-w-sm rounded-2xl object-cover sm:h-64 md:h-72 md:max-w-none"
            />
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card w-full rounded-2xl p-7 md:p-8"
        >
          <CursiveTitle>Happy Birthday</CursiveTitle>
          <p className="mt-3 text-2xl">🎂💖</p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Today is your day to shine and be celebrated. You deserve every ounce of love and
            happiness in the world. Thank you for being the most amazing part of my life — you make
            everything softer, brighter, and worth it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/90 sm:text-base">
            Happy Birthday to my one and only. I love you to the moon, past the stars, and back
            again 🌙✨
          </p>
          <div className="mt-7">
            <GalaxyLink onClick={onNext}>Start Again ❤️</GalaxyLink>
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
