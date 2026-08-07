import { PageWrap, CursiveTitle, GalaxyLink } from "./PageWrap";
const songImg = "/templates/birthday-galaxy/gifs/5-screen.gif";


export default function SongPage({ onNext }: { onNext?: () => void }) {
  return (
    <PageWrap>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:items-center md:gap-10">
        {/* GIF — no border wrapper */}
        <div className="flex w-full justify-center">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={songImg}
              alt="A soft moment"
              loading="lazy"
              width={512}
              height={512}
              className="h-56 w-full max-w-sm rounded-2xl object-cover sm:h-64 md:h-72 md:max-w-none"
            />
          </div>
        </div>

        {/* Content card */}
        <div className="glass-card w-full rounded-2xl p-7 md:p-8">
          <CursiveTitle>A Song For You</CursiveTitle>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            If I could bottle the way you make me feel, it would sound like your favorite song on
            repeat — soft, warm, and impossible to forget.
          </p>
          <p className="mt-4 text-sm italic text-foreground/80 sm:text-base">
            "You are my sunshine, my starlight, my whole galaxy in one smile." 🌙
          </p>
          <div className="mt-8">
            <GalaxyLink onClick={onNext}>Play A Game 🎮</GalaxyLink>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
