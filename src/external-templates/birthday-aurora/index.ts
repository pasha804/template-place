import { defineExternalTemplate } from "@/engine/types";
import { BirthdayAuroraRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "d4e5f6a7-b8c9-0123-def0-456789012345",
    slug:         "birthday-aurora",
    name:         "Birthday Aurora",
    tagline:      "A cinematic 9-screen aurora birthday journey",
    description:
      "A multi-screen interactive birthday experience wrapped in a beautiful aurora atmosphere. " +
      "Features a cinematic loader, countdown, confetti celebration, age reveal with flip-clock digits, " +
      "animated birthday cake with poppable balloons, coverflow photo gallery, GIF vibes grid, " +
      "numbered GIF reel, expandable wishes wall, and a grand finale typewriter letter in a 3D envelope.",
    category:     "birthday",
    tags:         ["birthday","aurora","animated","confetti","gallery","letter","wishes","interactive"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0a0a0f 0%,#0d0820 30%,#130a1e 60%,#1a0a2e 100%)",
    accentEmoji:  "✨",
    features: [
      "Cinematic aurora loader",
      "5-second birthday countdown",
      "Flip-clock age reveal with confetti",
      "Animated 3-tier birthday cake + poppable balloons",
      "Coverflow photo gallery with lightbox",
      "GIF vibes love-grid",
      "11-slide GIF reel",
      "Expandable wishes wall",
      "Typewriter letter in 3D envelope",
      "Aurora orb background + particle system",
      "Background music toggle",
    ],
    thumbnailUrl:    "/templates/birthday-aurora/images/1.jpg",
    author:          "@pasha_dev_",
    previewImages: [
      "/templates/birthday-aurora/images/1.jpg",
      "/templates/birthday-aurora/images/2.jpg",
      "/templates/birthday-aurora/gifs/celebrate.gif",
    ],
  },
  schema,
  defaults,
  Renderer: BirthdayAuroraRenderer,
});
