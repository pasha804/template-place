import { defineExternalTemplate } from "@/engine/types";
import { SorrySweetRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "c3d4e5f6-a7b8-9012-cdef-345678902222",
    slug:         "sorry-sweet",
    name:         "Sorry Sweet",
    tagline:      "A cinematic apology with music, voice note, scratch card & confetti",
    description:
      "A 10-screen emotionally devastating romantic apology experience. " +
      "Background music fades through Intro → Teaser → Build-up → 7 phases: " +
      "love cards, eye photo carousel, typewriter letter, flower poem, scratch card secret, " +
      "voice note player, and a confetti forgiveness finale.",
    category:     "sorry",
    tags:         ["sorry","apology","music","voice-note","scratch-card","confetti","cinematic","dark-theme","urdu","romantic"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0a0a0a 0%,#4c1d95 45%,#be185d 100%)",
    accentEmoji:  "🎵",
    features: [
      "10-screen cinematic journey",
      "Background music with smooth fade-out",
      "Floating 'I love you' in 20 languages",
      "3 love cards (auto-advance 2.5s each)",
      "Eye photo carousel with lightbox",
      "Typewriter love letter",
      "Flower poem with animated GIF",
      "HTML5 canvas scratch-card secret",
      "Voice note player",
      "Confetti + heart burst forgiveness finale",
    ],
    thumbnailUrl: "/templates/sorry-sweet/gifs/1.gif",
    author: "@pasha_dev_",
    previewImages: ["/templates/sorry-sweet/gifs/1.gif", "/templates/sorry-sweet/gifs/2.gif", "/templates/sorry-sweet/gifs/3.gif"],
  },
  schema,
  defaults,
  Renderer: SorrySweetRenderer,
});
