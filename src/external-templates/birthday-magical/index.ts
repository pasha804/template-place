import { defineExternalTemplate } from "@/engine/types";
import { BirthdayMagicalRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "a9b0c1d2-e3f4-5678-9abc-def012345678",
    slug:         "birthday-magical",
    name:         "Birthday Magical",
    tagline:      "A 15-chapter cinematic birthday experience unlike anything else",
    description:
      "A fully interactive, 15-chapter cinematic birthday gift. Features an aurora night-sky background, " +
      "interactive balloon popping, spotlight cursor, CSS cake loader, odometer age reveal, " +
      "3D WebGL chocolate ganache cake (click or mic-blow to extinguish 5 candles), " +
      "coverflow photo gallery with lightbox, 3D flip reason cards, scrollable milestone timeline, " +
      "Three.js star-heart constellation, press-and-hold gift unboxing with confetti, " +
      "HTML5 canvas scratch-reveal secret wish, fast-paced wishes carousel, " +
      "typewriter love letter with envelope, superlatives yearbook awards, " +
      "10 poppable wish balloons, and an explosive fireworks finale.",
    category:     "birthday",
    tags:         ["birthday","cinematic","interactive","3d","webgl","cake","mic","constellation","scratch","unboxing","letter","balloons","confetti","aurora","premium"],
    priceCents:   2999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0a0a12 0%,#e11d48 45%,#d946ef 75%,#fbbf24 100%)",
    accentEmoji:  "✨",
    features: [
      "15 interactive chapters",
      "Aurora animated night-sky background",
      "Interactive balloon popping (with confetti + haptics)",
      "Spotlight cursor that follows mouse",
      "CSS birthday cake loader",
      "Odometer age reveal with spring animation",
      "3D WebGL chocolate cake — click or blow mic to extinguish 5 candles",
      "Coverflow photo gallery with lightbox + keyboard nav",
      "3D flip 'reasons why' cards",
      "Scrollable milestone timeline (alternating left/right)",
      "Three.js star-heart constellation that draws itself",
      "Press-and-hold gift unboxing with parallax tilt + confetti",
      "HTML5 canvas scratch-card reveal",
      "Fast-paced wishes carousel (drag/swipe)",
      "Cinematic typewriter love letter",
      "Superlatives yearbook awards",
      "10 poppable wish balloons",
      "Explosive fireworks finale",
    ],
    thumbnailUrl:    "/templates/birthday-magical/images/1.jpeg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-magical/images/1.jpeg",
      "/templates/birthday-magical/images/2.jpeg",
      "/templates/birthday-magical/images/3.jpeg",
      "/templates/birthday-magical/images/4.jpeg",
      "/templates/birthday-magical/images/5.jpeg",
      "/templates/birthday-magical/gifs/heppi.gif",
    ],
  },
  schema,
  defaults,
  Renderer: BirthdayMagicalRenderer,
});
