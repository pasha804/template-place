import { defineExternalTemplate } from "@/engine/types";
import { SorryApologyRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    slug:         "sorry-apology",
    name:         "Sorry Apology",
    tagline:      "A soft, interactive apology note with a runaway NO button",
    description:
      "A 7-step interactive apology experience built on a soft pink glassmorphism aesthetic. " +
      "Features mood selection (Very angry / A little / Won't tell), personalized apology text based on mood, " +
      "floating heart particles, a runaway NO button on the friends screen, and a joyful celebration finale.",
    category:     "sorry",
    tags:         ["sorry","apology","interactive","mood","glassmorphism","cute","runaway-button","pink"],
    priceCents:   999,
    isPremium:    false,
    coverGradient: "linear-gradient(135deg,#ffe4ec 0%,#ffc8e4 50%,#ffb3d9 100%)",
    accentEmoji:  "💌",
    features: [
      "7-step interactive flow",
      "Mood-based personalized apology (very angry / a little / silent)",
      "Floating heart particles background",
      "Glassmorphic intro card with typewriter",
      "Runaway NO button that escapes the cursor",
      "Joyful Yay celebration finale",
      "Soft pink premium aesthetic",
    ],
    thumbnailUrl: "/templates/sorry-apology/please.gif",
    author: "@pasha_dev_",
    previewImages: ["/templates/sorry-apology/please.gif", "/templates/sorry-apology/heppi.gif"],
  },
  schema,
  defaults,
  Renderer: SorryApologyRenderer,
});
