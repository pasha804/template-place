import { defineExternalTemplate } from "@/engine/types";
import { ProposalRomanticRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "f6a7b8c9-d0e1-2345-fabc-678901234567",
    slug:         "proposal-romantic",
    name:         "Proposal Romantic",
    tagline:      "A cinematic 15-screen interactive proposal experience",
    description:
      "A fully interactive, 15-screen cinematic marriage proposal website. " +
      "Features: animated loader, intro with background music, question screens, " +
      "runaway 'No' button on 'Will You Be Mine', celebration with confetti, " +
      "3 interactive gift boxes (rose bouquet, reasons why, love quiz), " +
      "coverflow photo gallery, 'Hey Beautiful' reveal, cuteness loading screen, " +
      "typewriter message reveal, handwritten love note, 'Special You' screen, and grand finale.",
    category:     "proposal",
    tags:         ["proposal","marriage","interactive","cinematic","will-you-be-mine","gifts","quiz","letter","gallery","confetti","music"],
    priceCents:   2999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0f0f23 0%,#7c3aed 45%,#ec4899 100%)",
    accentEmoji:  "💍",
    features: [
      "15-screen cinematic journey",
      "Background music (auto-starts on first tap)",
      "Animated loader with CSS birthday cake",
      "Interactive question screens",
      "Runaway NO button (impossible to click)",
      "Confetti celebration on YES",
      "3 interactive gift boxes: rose bouquet, reasons why, love quiz",
      "Coverflow photo gallery",
      "Cuteness scanner loading screen",
      "Typewriter message reveal",
      "Handwritten love note screen",
      "Grand finale with animated heart",
    ],
    thumbnailUrl:  "/templates/proposal-romantic/gif/1.gif",
    author:        "@pasha_dev_",
    previewImages: [
      "/templates/proposal-romantic/gif/1.gif",
      "/templates/proposal-romantic/gif/2.gif",
      "/templates/proposal-romantic/gif/3.gif",
    ],
  },
  schema,
  defaults,
  Renderer: ProposalRomanticRenderer,
});
