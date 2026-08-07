import { motion } from "framer-motion";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const p1 = "/templates/birthday-galaxy/images/1.jpeg";
const p2 = "/templates/birthday-galaxy/images/2.jpeg";
const p3 = "/templates/birthday-galaxy/images/3.jpeg";
const p4 = "/templates/birthday-galaxy/images/4.jpeg";
const p5 = "/templates/birthday-galaxy/images/5.jpeg";
const p6 = "/templates/birthday-galaxy/images/6.jpeg";


export default function MemoriesPage({ onNext, photos: propPhotos }: { onNext?: () => void, photos?: string[] }) {
  const photos = [
    { src: propPhotos?.[0] || p1, rot: -6 },
    { src: propPhotos?.[1] || p2, rot: 4 },
    { src: propPhotos?.[2] || p3, rot: -3 },
    { src: propPhotos?.[3] || p4, rot: 5 },
    { src: propPhotos?.[4] || p5, rot: -4 },
    { src: propPhotos?.[5] || p6, rot: 3 },
  ];
  return (
    <PageWrap>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10">
        {/* Photo grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {photos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: p.rot }}
              transition={{
                delay: i * 0.12,
                duration: 0.6,
                type: "spring",
                damping: 14,
              }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}
              className="polaroid"
            >
              <img
                src={p.src}
                alt={`Memory ${i + 1}`}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                className="h-36 w-full rounded-sm object-cover sm:h-44 md:h-52"
              />
            </motion.div>
          ))}
        </div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="glass-card rounded-2xl p-7 md:p-8"
        >
          <CursiveTitle>Starry Memories</CursiveTitle>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every photo is a little constellation — a moment where the sky felt brighter because you
            were in it. Thank you for every laugh, every hug, every ordinary day made magical.
          </p>
          <div className="mt-7">
            <GalaxyLink onClick={onNext}>Our Journey 💫</GalaxyLink>
          </div>
        </motion.div>
      </div>
    </PageWrap>
  );
}
