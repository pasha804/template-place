import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { SceneShell } from "../SceneShell";
import { GlowButton } from "../GlowButton";

export interface MemoryPhotoItem {
  src: string;
  alt: string;
  tilt?: number;
}

const DEFAULT_MEMORIES: MemoryPhotoItem[] = [
  { src: "/templates/birthday-celestial/images/memory-1.jpg", alt: "Holding hands at sunset by the sea", tilt: -5 },
  { src: "/templates/birthday-celestial/images/memory-2.jpg", alt: "A bouquet of pink roses", tilt: 4 },
  { src: "/templates/birthday-celestial/images/memory-3.jpg", alt: "Laughing together under neon city lights", tilt: -3 },
  { src: "/templates/birthday-celestial/images/memory-4.jpg", alt: "Hands wrapped in warm fairy lights", tilt: 5 },
  { src: "/templates/birthday-celestial/images/memory-5.jpg", alt: "Dancing beneath a starry sky", tilt: -4 },
  { src: "/templates/birthday-celestial/images/memory-6.jpg", alt: "A candlelit picnic at dusk", tilt: 3 },
];

function Lights() {
  return (
    <div className="pointer-events-none absolute -top-4 left-0 right-0">
      <svg viewBox="0 0 400 40" className="h-10 w-full" preserveAspectRatio="none">
        <path d="M0 6 Q100 34 200 12 T400 8" fill="none" stroke="oklch(0.8 0.1 88 / 0.5)" strokeWidth="1" />
      </svg>
      {[8, 22, 36, 50, 64, 78, 92].map((x, i) => (
        <motion.span
          key={x}
          className="absolute h-2.5 w-2.5 rounded-full bg-gold neon-outline"
          style={{ left: `${x}%`, top: 14 + (i % 3) * 6 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2 + (i % 4) * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

interface MemoriesProps {
  onNext: () => void;
  memoriesTitle?: string;
  memoriesSubtitle?: string;
  photos?: MemoryPhotoItem[];
}

export function Memories({
  onNext,
  memoriesTitle = "Memories",
  memoriesSubtitle = "Some of my favorite memories of you — Each one is a treasure. Tap to see bigger.",
  photos = DEFAULT_MEMORIES,
}: MemoriesProps) {
  const activePhotos = photos && photos.length > 0 ? photos : DEFAULT_MEMORIES;
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <SceneShell
      title={memoriesTitle}
      subtitle={memoriesSubtitle}
      footerSlot={
        <GlowButton onClick={onNext} icon={<ArrowRight className="h-4 w-4" />}>
          Next
        </GlowButton>
      }
    >
      <div className="relative mx-auto w-full max-w-lg pt-6">
        <Lights />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {activePhotos.map((p, i) => {
            const tilt = p.tilt ?? (i % 2 === 0 ? -4 : 4);
            return (
              <motion.figure
                key={p.src + i}
                initial={{ opacity: 0, y: -40, rotate: tilt * 2 }}
                animate={{ opacity: 1, y: 0, rotate: tilt }}
                transition={{ delay: 0.2 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                onClick={() => setSelectedImage(i)}
                className="relative origin-top rounded-sm bg-paper p-1.5 pb-5 shadow-[var(--shadow-glow-soft)] cursor-pointer"
                style={{ transformOrigin: "top center" }}
              >
                <motion.span
                  className="absolute -top-3 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-sm bg-gold/80"
                  aria-hidden="true"
                />
                <motion.div
                  animate={{ rotate: [tilt - 1.5, tilt + 1.5, tilt - 1.5] }}
                  transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <img
                    src={p.src}
                    alt={p.alt || `Memory ${i + 1}`}
                    width={512}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="h-28 sm:h-36 w-full object-cover rounded-xs"
                    style={{ contentVisibility: "auto" }}
                  />
                </motion.div>
              </motion.figure>
            );
          })}
        </div>
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
              initial={{ scale: 0.8, rotate: (activePhotos[selectedImage]?.tilt ?? 0) * 3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, rotate: -(activePhotos[selectedImage]?.tilt ?? 0) * 3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-paper p-4 rounded-2xl shadow-[var(--shadow-glow)] text-center">
                <img
                  src={activePhotos[selectedImage]?.src}
                  alt={activePhotos[selectedImage]?.alt}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-lg mx-auto"
                />
                {activePhotos[selectedImage]?.alt && (
                  <p className="mt-4 text-sm text-paper-ink font-medium">
                    {activePhotos[selectedImage]?.alt}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SceneShell>
  );
}
