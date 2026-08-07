import { defineExternalTemplate } from "@/engine/types";
import { ProposalCookRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    slug:         "proposal-cook",
    name:         "Proposal Cook",
    tagline:      "Deep plum cinematic proposal with enhanced effects & fireworks",
    description:
      "The enhanced edition of Proposal Romantic with a near-black deep plum aesthetic. " +
      "Same powerful 15-screen journey: loader, intro, question screens, " +
      "runaway NO button, celebration, 3 gift boxes, photo gallery, " +
      "cuteness scanner, typewriter reveal, love note, special you screen, " +
      "and a grand finale with spectacular fireworks.",
    category:     "proposal",
    tags:         ["proposal","marriage","interactive","cinematic","deep-plum","enhanced","fireworks","gifts","quiz","letter","gallery"],
    priceCents:   2999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0d0008 0%,#6d28d9 45%,#be185d 100%)",
    accentEmoji:  "🌹",
    features: [
      "Deep plum near-black aesthetic",
      "Enhanced glassmorphism with magenta borders",
      "15-screen cinematic journey",
      "Runaway NO button (impossible to click)",
      "3 interactive gift boxes",
      "Coverflow photo gallery",
      "Cuteness scanner loader",
      "Typewriter love letter",
      "Spectacular fireworks finale",
      "Vows reveal on final screen",
    ],
    thumbnailUrl:  "/templates/proposal-cook/gif/1.gif",
    author:        "@pasha_dev_",
    previewImages: [
      "/templates/proposal-cook/gif/1.gif",
      "/templates/proposal-cook/gif/2.gif",
      "/templates/proposal-cook/gif/3.gif",
    ],
  },
  schema,
  defaults,
  Renderer: ProposalCookRenderer,
});
