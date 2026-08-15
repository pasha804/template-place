import type { ExternalTemplatePlugin } from "@/engine/types";
import { birthdayCelestialSchema, birthdayCelestialDefaults } from "./schema";
import { BirthdayCelestialRenderer } from "./Renderer";

export const birthdayCelestialPlugin: ExternalTemplatePlugin = {
  manifest: {
    id: "a9b0c1d2-e3f4-5678-9abc-def012345678",
    slug: "birthday-celestial",
    name: "Birthday Celestial",
    category: "birthday",
    description:
      "A 15-chapter cinematic romantic galaxy celebration featuring interactive mic-blow candle cake, love quiz, polaroid memory wall, love letter, and celestial surprises.",
    defaultThumbnail: "/templates/birthday-celestial/images/couple-galaxy.webp",
    previewImages: [
      "/templates/birthday-celestial/images/couple-galaxy.webp",
      "/templates/birthday-celestial/images/1.jpg",
      "/templates/birthday-celestial/images/cake.webp",
      "/templates/birthday-celestial/images/envelope.webp",
    ],
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
    ],
    version: "1.0.0",
    author: "Template Place",
  },
  schema: birthdayCelestialSchema,
  defaults: birthdayCelestialDefaults,
  Renderer: BirthdayCelestialRenderer,
};

export default birthdayCelestialPlugin;
