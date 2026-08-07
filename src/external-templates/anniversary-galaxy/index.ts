import { defineExternalTemplate } from "@/engine/types";
import { AnniversaryGalaxyRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "c1d2e3f4-a5b6-7890-cdef-012345678901",
    slug:         "anniversary-galaxy",
    name:         "Anniversary Galaxy",
    tagline:      "A cinematic 11-chapter galaxy anniversary love story",
    description:
      "An interactive, galaxy-themed anniversary experience with 11 chapters: welcome, journey timeline, polaroid memories, flip-card 'why you're special', typewriter love letter, blow-out candles wish, envelope special message, gift reveal, forever heart, song player, and a cinematic finale. Aurora background with butterflies, stars, shooting stars and floating hearts.",
    category:     "anniversary",
    tags:         ["anniversary", "galaxy", "cinematic", "love-letter", "memories", "interactive", "dark", "aurora"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.09 0.035 300) 0%,oklch(0.7 0.24 350) 55%,oklch(0.87 0.12 88) 100%)",
    accentEmoji:  "🌌",
    features: [
      "Galaxy aurora animated background",
      "Cursor glow trail effect",
      "11 interactive chapters with smooth transitions",
      "Progress bar navigation",
      "Polaroid memory gallery with fairy lights",
      "3D flip-card 'Why You're Special' deck",
      "Typewriter love letter on paper",
      "Mic-activated candle blowing",
      "Envelope reveal animation",
      "Gift box surprise reveal",
      "Animated song player with vinyl record",
      "Heart drawing finale",
    ],
    thumbnailUrl: "/templates/anniversary-galaxy/couple-galaxy.webp",
    author: "@pasha_dev_",
  },
  schema,
  defaults,
  Renderer: AnniversaryGalaxyRenderer,
});
