import { defineExternalTemplate } from "@/engine/types";
import { BirthdayGalaxyRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    slug:         "birthday-galaxy",
    name:         "Birthday Galaxy",
    tagline:      "An 11-screen galaxy journey of memories, love, and wishes",
    description:
      "A multi-screen birthday experience styled as a cosmic galaxy. " +
      "Features a polaroid photo gallery, typewriter note, song showcase, " +
      "interactive card game, wish candle, wishes reveal, gift surprise, " +
      "love letter, and a grand finale — all connected in a beautiful journey.",
    category:     "birthday",
    tags:         ["birthday","galaxy","animated","journey","letter","photos","interactive"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.28 0.14 295) 0%,oklch(0.12 0.08 290) 100%)",
    accentEmoji:  "🌌",
    features: [
      "11-screen galaxy journey",
      "Butterfly cursor trail (desktop)",
      "Polaroid photo memories",
      "Typewriter love note",
      "Song showcase",
      "Interactive tap-to-reveal card game",
      "Birthday wish candle",
      "Wishes reveal",
      "Gift surprise screen",
      "Grand finale",
      "Fully configurable — no code needed",
    ],
    thumbnailUrl:    "/templates/birthday-galaxy/images/1.jpeg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-galaxy/images/1.jpeg",
      "/templates/birthday-galaxy/images/2.jpeg",
      "/templates/birthday-galaxy/gifs/1-screen.gif",
    ],
  },
  schema,
  defaults,
  Renderer: BirthdayGalaxyRenderer,
});
