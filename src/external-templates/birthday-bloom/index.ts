import { defineExternalTemplate } from "@/engine/types";
import { BirthdayBloomRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "e5f6a7b8-c9d0-1234-ef01-567890123456",
    slug:         "birthday-bloom",
    name:         "Birthday Bloom",
    tagline:      "A light, sweet 6-screen birthday surprise with a grand finale",
    description:
      "A warm, light-themed birthday experience with floating hearts background. " +
      "Features a 3-second loading screen, intro with animated GIF, interactive CSS birthday cake " +
      "with candle-lighting interaction and confetti burst, fade-transition photo carousel, " +
      "typewriter birthday message with 3-phase grand finale confetti, and a final hug screen.",
    category:     "birthday",
    tags:         ["birthday","light-theme","cake","typewriter","confetti","photos","hug","interactive"],
    priceCents:   999,
    isPremium:    false,
    coverGradient: "linear-gradient(135deg,#fdf7ff 0%,#fbcfe8 50%,#ede9fe 100%)",
    accentEmoji:  "🌸",
    features: [
      "Floating animated hearts background",
      "3-second loading screen",
      "Intro screen with animated GIF",
      "Interactive CSS birthday cake with candle lighting",
      "Confetti burst on candle light",
      "Fade-transition photo carousel",
      "Typewriter birthday message with blinking cursor",
      "3-phase grand finale confetti",
      "Final hug screen with two GIFs",
    ],
    thumbnailUrl:    "/templates/birthday-bloom/images/1.jpg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-bloom/images/1.jpg",
      "/templates/birthday-bloom/images/2.jpg",
      "/templates/birthday-bloom/gifs/hug.gif",
    ],
  },
  schema,
  defaults,
  Renderer: BirthdayBloomRenderer,
});
