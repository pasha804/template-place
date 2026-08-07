import { defineExternalTemplate } from "@/engine/types";
import { BirthdaySurpriseRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    slug:         "birthday-surprise",
    name:         "Birthday Surprise",
    tagline:      "A cinematic, animated birthday gift your person will never forget",
    description:
      "A multi-screen interactive birthday experience: PIN-locked vault, cinematic intro, " +
      "interactive CSS birthday cake with mic-blow detection, wish card carousel, " +
      "coverflow photo gallery, typewriter love letter, hug GIF overlay, and confetti. " +
      "Every element is fully customizable from the editor — no code needed.",
    category:     "birthday",
    tags:         ["birthday","interactive","animated","pin-lock","letter","gallery","confetti"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#3d0000 0%,#8b0000 45%,#c0392b 75%,#e74c3c 100%)",
    accentEmoji:  "🎂",
    features: [
      "PIN-locked vault screen",
      "Cinematic intro with letter-drop animation",
      "Interactive CSS birthday cake + mic blow",
      "Confetti burst effect",
      "Swipeable wish card carousel",
      "Coverflow photo memories gallery",
      "Typewriter love letter",
      "Birthday Hugs GIF overlay",
      "Fully configurable — no code needed",
    ],
    thumbnailUrl:    "/templates/birthday-surprise/images/1.jpg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-surprise/images/1.jpg",
      "/templates/birthday-surprise/images/2.jpg",
      "/templates/birthday-surprise/images/3.jpg",
      "/templates/birthday-surprise/images/4.jpg",
      "/templates/birthday-surprise/gifs/heppi.gif",
      "/templates/birthday-surprise/gifs/celebrate.gif",
    ],
    defaultPin:   "1234",
    pinProtected: true,
  },
  schema,
  defaults,
  Renderer: BirthdaySurpriseRenderer,
});
