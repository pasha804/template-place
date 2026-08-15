import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

export interface MomentItem {
  src: string;
  caption: string;
}

const DEFAULT_MOMENTS: MomentItem[] = [
  { src: "/templates/birthday-celestial/images/1.jpg", caption: "Every moment with you is magical ✨" },
  { src: "/templates/birthday-celestial/images/2.jpg", caption: "You make my heart smile 💕" },
  { src: "/templates/birthday-celestial/images/3.jpg", caption: "Together, we create beautiful memories 🌟" },
  { src: "/templates/birthday-celestial/images/4.jpg", caption: "My favorite place is next to you 💝" },
  { src: "/templates/birthday-celestial/images/5.jpg", caption: "You light up my world 🌈" },
  { src: "/templates/birthday-celestial/images/6.jpg", caption: "Forever grateful for you 🎀" },
];

interface MomentsProps {
  onNext: () => void;
  momentsTitle?: string;
  momentsSubtitle?: string;
  moments?: MomentItem[];
}

export function Moments({
  onNext,
  momentsTitle = "Moments With You",
  momentsSubtitle = "Every picture tells our story — Swipe through our beautiful journey 💕",
  moments = DEFAULT_MOMENTS,
}: MomentsProps) {
  const activeMoments = moments && moments.length > 0 ? moments : DEFAULT_MOMENTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeMoments.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeMoments.length) % activeMoments.length);
  };

  return (
    <SceneShell
      title={momentsTitle}
      subtitle={momentsSubtitle}
      footerSlot={
        <>
          <p className="text-xs text-muted-foreground">
            Tap any photo to view it bigger ✨
          </p>
          <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
            Next
          </GlowButton>
        </>
      }
    >
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Carousel container */}
        <div className="relative h-[480px] sm:h-[500px] flex items-center justify-center">
          {/* Cards */}
          <AnimatePresence initial={false} mode="popLayout">
            {activeMoments.map((moment, index) => {
              const offset = (index - currentIndex + activeMoments.length) % activeMoments.length;
              const isCenter = offset === 0;
              const isVisible = offset === 0 || offset === 1 || offset === activeMoments.length - 1;

              if (!isVisible) return null;

              let position = 0;
              let scale = 0.7;
              let zIndex = 0;
              let opacity = 0.4;

              if (offset === 0) {
                position = 0;
                scale = 1;
                zIndex = 10;
                opacity = 1;
              } else if (offset === 1) {
                position = 180;
                scale = 0.8;
                zIndex = 5;
                opacity = 0.5;
              } else if (offset === activeMoments.length - 1) {
                position = -180;
                scale = 0.8;
                zIndex = 5;
                opacity = 0.5;
              }

              return (
                <motion.div
                  key={index}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{
                    x: position,
                    scale,
                    opacity,
                    zIndex,
                  }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => isCenter && setSelectedImage(index)}
                  className={`absolute ${isCenter ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="glass rounded-3xl p-4 w-72 sm:w-80 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-soft)] transition-shadow">
                    <div className="relative overflow-hidden rounded-2xl aspect-[3/4]">
                      <img
                        src={moment.src}
                        alt={`Moment ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                        style={{ contentVisibility: "auto" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      {isCenter && (
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <p className="text-sm text-foreground font-medium">Tap to view</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-muted-foreground">{moment.caption}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 z-20 glass rounded-full p-3 sm:p-4 hover:bg-primary/20 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-2 sm:right-4 z-20 glass rounded-full p-3 sm:p-4 hover:bg-primary/20 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
          </motion.button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {activeMoments.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {/* Fullscreen image modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            >
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 glass rounded-full p-3 hover:bg-primary/20 transition-colors z-10"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-foreground" />
              </motion.button>

              <motion.div
                initial={{ scale: 0.8, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="glass rounded-3xl p-4 shadow-[var(--shadow-glow-soft)]">
                  <img
                    src={activeMoments[selectedImage].src}
                    alt={`Moment ${selectedImage + 1}`}
                    className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-base sm:text-lg text-primary font-medium">
                      {activeMoments[selectedImage].caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}
