import { motion } from "framer-motion";
import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const pandaBearImg = "/templates/birthday-galaxy/gifs/8-screen.gif";


const wishes = [
  { icon: "⭐", title: "Endless Joy", text: "May laughter follow you into every room." },
  { icon: "❤️", title: "Warm Love", text: "May you always feel as loved as you make me feel." },
  { icon: "🌸", title: "Sweet Peace", text: "May your heart stay soft and your mind calm." },
  { icon: "🚀", title: "Big Dreams", text: "May every dream you chase choose you back." },
];

export default function WishesPage({ onNext, title, wishesList }: { onNext?: () => void; title?: string; wishesList?: Array<{ icon?: string; title?: string; text?: string }> }) {
  const wishItems = wishesList && wishesList.length > 0 ? wishesList.map(w => ({ icon: w.icon || "⭐", title: w.title || "", text: w.text || "" })) : wishes
  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* Content card */}
        <div className="glass-card w-full rounded-2xl p-6 md:p-8">
          <CursiveTitle>{title || "Wishes For You"}</CursiveTitle>
          <p className="mt-3 text-sm text-muted-foreground">
            Little stars I'm sending your way today 💫
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
            {wishItems.map((w, i) => (
              <motion.div
                key={w.title || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl p-3 text-center sm:p-4"
              >
                <div className="text-xl sm:text-2xl">{w.icon}</div>
                <div className="font-cursive text-gold-gradient mt-1 text-lg sm:text-xl">
                  {w.title}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{w.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-7 flex justify-center">
            <GalaxyLink onClick={onNext}>Open Surprise 🎁</GalaxyLink>
          </div>
        </div>

        {/* GIF — no border, white bg */}
        <div className="flex w-full justify-center">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
            <img
              src={pandaBearImg}
              alt="Panda and bear couple"
              loading="lazy"
              width={512}
              height={512}
              className="h-56 w-56 rounded-2xl object-contain sm:h-64 sm:w-64"
            />
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
