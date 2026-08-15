import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

export interface WishTimelineItem {
  id?: number | string;
  emoji?: string;
  title: string;
  text: string;
  position?: "left" | "right";
}

const DEFAULT_WISHES: WishTimelineItem[] = [
  {
    id: 1,
    emoji: "💖",
    title: "WISH #1",
    text: "Aj k din bht khas h ifzay Aj op ki birthday h or ist din mri yadr is duniya my ai thi 🥹🥹",
    position: "left",
  },
  {
    id: 2,
    emoji: "💖",
    title: "WISH #2",
    text: "Mri Dua h ky Allah g is ony wly saal my bht si hushia deakhay",
    position: "right",
  },
  {
    id: 3,
    emoji: "💖",
    title: "WISH #3",
    text: "Aj k Din bht special h mry liay kyu k aj mri yadr ki birthday h to mujy snj tk mi a rhi ky m kya likha bs Dil sy ap ki anywli life ky bry my duay hi nikl rhi",
    position: "left",
  },
  {
    id: 4,
    emoji: "💖",
    title: "WISH #4",
    text: "Allah pak ap ko heamsha mry sath isi tra pyarkrta hua rkhy jsy ap phly ki tra happy or Pyar krti thi same usi tra ho jay bsh",
    position: "right",
  },
  {
    id: 5,
    emoji: "💖",
    title: "WISH #5",
    text: "Or mri 1 wish ga hi h aj k din k ap mujy idi apny pass bulya or mujy wo SB Kuch bna ky khilay apny hath sy Jo m khta thto hun 😔😔",
    position: "left",
  },
];

interface WishesNewProps {
  onNext: () => void;
  wishesTitle?: string;
  wishesSubtitle?: string;
  wishes?: WishTimelineItem[];
  wishesGifUrl?: string;
}

export function WishesNew({
  onNext,
  wishesTitle = "Birthday Wishes",
  wishesSubtitle = "✧ just for you ✧",
  wishes = DEFAULT_WISHES,
  wishesGifUrl = "/templates/birthday-celestial/gifs/hug.gif",
}: WishesNewProps) {
  const activeWishes = wishes && wishes.length > 0 ? wishes : DEFAULT_WISHES;

  return (
    <SceneShell
      title=""
      subtitle=""
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          See the Memories
        </GlowButton>
      }
    >
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-7 w-7 text-primary animate-glow-pulse" fill="currentColor" />
            <Heart className="h-9 w-9 text-primary animate-glow-pulse" fill="currentColor" />
            <Heart className="h-7 w-7 text-primary animate-glow-pulse" fill="currentColor" />
          </div>
          <h2 className="text-4xl sm:text-5xl text-primary text-glow font-bold tracking-tight mb-2">
            {wishesTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground font-medium tracking-wide uppercase">
            {wishesSubtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute left-1/2 top-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary rounded-full hidden md:block"
          />

          {/* Wishes */}
          <div className="space-y-6 md:space-y-10">
            {activeWishes.map((wish, index) => {
              const pos = wish.position || (index % 2 === 0 ? "left" : "right");
              return (
                <motion.div
                  key={wish.id ?? index}
                  initial={{ opacity: 0, x: pos === "left" ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.15,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex items-center ${
                    pos === "left"
                      ? "md:justify-start justify-center"
                      : "md:justify-end justify-center"
                  }`}
                >
                  {/* Center dot for timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                    className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary neon-outline z-10 hidden md:flex items-center justify-center"
                  >
                    <span className="text-base">{wish.emoji || "💖"}</span>
                  </motion.div>

                  {/* Wish card */}
                  <div
                    className={`glass rounded-3xl p-5 sm:p-6 max-w-md w-full md:w-[calc(50%-2.5rem)] ${
                      pos === "left" ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl md:hidden">{wish.emoji || "💖"}</span>
                      <p className="text-primary font-bold tracking-wider text-xs sm:text-sm">
                        {wish.title}
                      </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      {wish.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="relative mx-auto mt-10 mb-6"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto relative">
              <div className="glass rounded-full p-2">
                <img
                  src={wishesGifUrl}
                  alt="Celebration"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <div className="glass rounded-3xl px-6 sm:px-8 py-4 sm:py-5 inline-block">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-gold" fill="currentColor" />
              <p className="text-base sm:text-lg text-primary text-glow font-bold">
                These are my wishes from the bottom of my heart 💕
              </p>
              <Heart className="h-5 w-5 text-gold" fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </div>
    </SceneShell>
  );
}
