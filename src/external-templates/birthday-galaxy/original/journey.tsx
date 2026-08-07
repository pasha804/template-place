import { motion } from "framer-motion";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const journeyImg = "/templates/birthday-galaxy/gifs/3-screen.gif";


const items: Array<{ title?: string; text?: string; label?: string }> = [
  { label: "Day 1", title: "Day 1", text: "The moment I met you, my world got a little more colorful." },
  { label: "First", title: "First", text: "Our first laugh together — I knew this was something special." },
  { label: "Every", title: "Every", text: "Every talk, every voice note, every tiny fight and every make-up." },
  { label: "Today", title: "Today", text: "Celebrating YOU — the reason so many of my days feel like a gift." },
];

export default function JourneyPage({ onNext, milestones, title }: { onNext?: () => void; milestones?: Array<{ title?: string; text?: string; label?: string }>; title?: string }) {
  const itemList = milestones && milestones.length > 0 ? milestones : items
  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* GIF — no border wrapper */}
        <div className="flex w-full justify-center">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={journeyImg}
              alt="Our journey"
              loading="lazy"
              width={512}
              height={512}
              className="h-56 w-full max-w-sm rounded-2xl object-cover sm:h-64 md:h-80 md:max-w-none"
            />
          </div>
        </div>

        {/* Content card */}
        <div className="glass-card w-full rounded-2xl p-6 md:p-8">
          <CursiveTitle>{title || "Our Journey"}</CursiveTitle>
          <div className="mt-5 space-y-3">
            {itemList.map((it, i) => (
              <motion.div
                key={it.title || it.label || i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:gap-4 sm:p-4"
              >
                <span className="font-cursive text-gold-gradient min-w-[56px] text-xl sm:text-2xl">
                  {it.label || it.title}
                </span>
                <p className="text-xs leading-relaxed text-foreground/90 sm:text-sm">{it.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6">
            <GalaxyLink onClick={onNext}>Read My Heart 💌</GalaxyLink>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
