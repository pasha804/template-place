import { motion } from "framer-motion";
import { PageWrap } from "./PageWrap";


export default function SurprisePage({ onNext }: { onNext?: () => void }) {
    return (
    <PageWrap>
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="gift-bounce text-[7rem] sm:text-[9rem] md:text-[12rem]"
          aria-label="Open the surprise"
          style={{
            filter:
              "drop-shadow(0 0 40px rgba(255,200,120,0.7)) drop-shadow(0 0 80px rgba(240,184,74,0.5))",
          }}
        >
          🎁
        </motion.button>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-cursive text-gold-gradient shimmer mt-6 text-4xl sm:text-5xl md:text-6xl"
        >
          Tap to Open!
        </motion.h2>
      </div>
    </PageWrap>
  );
}
