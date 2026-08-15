import { defineExternalTemplate } from "@/engine/types";
import { BirthdayCelestialRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export const birthdayCelestialPlugin = defineExternalTemplate({
  manifest: {
    id: "a9b0c1d2-e3f4-5678-9abc-def012345678",
    slug: "birthday-celestial",
    name: "Birthday Celestial",
    tagline: "A 15-chapter cinematic romantic galaxy celebration",
    description:
      "A 15-chapter cinematic romantic galaxy celebration featuring interactive mic-blow candle cake, love quiz, polaroid memory wall, love letter, and celestial surprises.",
    category: "birthday",
    tags: [
      "birthday",
      "celestial",
      "galaxy",
      "cinematic",
      "interactive",
      "romantic",
      "love",
      "cake",
      "candles",
      "quiz",
      "timeline",
      "memories",
      "music",
      "letter",
      "gift",
      "premium",
    ],
    priceCents: 2999,
    isPremium: true,
    coverGradient: "linear-gradient(135deg, oklch(0.12 0.05 290) 0%, oklch(0.06 0.03 285) 50%, oklch(0.08 0.04 330) 100%)",
    accentEmoji: "✨",
    features: [
      "15-chapter cinematic galaxy experience",
      "Interactive mic-blow candle cake",
      "Interactive romantic love quiz",
      "Swipeable moments carousel",
      "Tap-to-reveal secret cards",
      "Polaroid photo memory gallery",
      "Official superlative awards",
      "Wishes timeline with pulsing hearts",
      "Audio music player with visualizer",
      "Typewriter love letter in interactive envelope",
      "Interactive gift box unboxing",
      "Path-drawn SVG heart & infinity finale",
    ],
    thumbnailUrl: "/templates/birthday-celestial/images/couple-galaxy.webp",
    author: "Template Place",
    previewImages: [
      "/templates/birthday-celestial/images/couple-galaxy.webp",
      "/templates/birthday-celestial/images/1.jpg",
      "/templates/birthday-celestial/images/cake.webp",
      "/templates/birthday-celestial/images/envelope.webp",
      "/templates/birthday-celestial/images/gift.webp",
      "/templates/birthday-celestial/gifs/celebrate.gif",
    ],
    defaultPin: "1234",
    pinProtected: false,
  },
  schema,
  defaults,
  Renderer: BirthdayCelestialRenderer,
});

export default birthdayCelestialPlugin;
