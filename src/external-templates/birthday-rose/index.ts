import { defineExternalTemplate } from "@/engine/types";
import { BirthdayRoseRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "c3d4e5f6-a7b8-9012-cdef-345678901234",
    slug:         "birthday-rose",
    name:         "Birthday Rose",
    tagline:      "A romantic password-locked birthday experience with a grand finale",
    description:
      "A password-locked birthday SPA with 7 stages: PIN lock, hero photo, music albums, " +
      "photo gallery with lightbox, typewriter love letter, love quiz, and certificate finale.",
    category:     "birthday",
    tags:         ["birthday","romantic","password","letter","gallery","quiz","certificate"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.22 0.09 20) 0%,oklch(0.09 0.04 20) 100%)",
    accentEmoji:  "🌹",
    features: [
      "Password-locked entry",
      "Hero couple photo with float animation",
      "Music album showcase",
      "Photo gallery with lightbox",
      "Typewriter love letter",
      "Love quiz with shake animation",
      "Certificate of My Heart finale",
    ],
    thumbnailUrl:    "/templates/birthday-rose/images/hero-couple.jpg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-rose/images/hero-couple.jpg",
      "/templates/birthday-rose/images/p1.jpg",
      "/templates/birthday-rose/images/p2.jpg",
    ],
    defaultPin:   "0818",
    pinProtected: true,
  },
  schema,
  defaults,
  Renderer: BirthdayRoseRenderer,
});
