import { defineExternalTemplate } from "@/engine/types";
import { CongratulationsTriumphRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "d2e3f4a5-b6c7-8901-defa-123456789012",
    slug:         "congratulations-triumph",
    name:         "Congratulations Triumph",
    tagline:      "An 11-chapter cinematic celebration of a hard-earned achievement",
    description:
      "A luxury emerald & gold congratulations experience with 11 chapters: welcome, journey timeline, polaroid memories, flip-card 'Why You Deserve This', typewriter note of pride, champagne pop celebration, envelope special message, treasure chest reward, limitless potential, anthem player, and a grand finale.",
    category:     "congratulations",
    tags:         ["congratulations","achievement","graduation","cinematic","gold","luxury","celebration","triumph"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.12 0.04 160) 0%,oklch(0.55 0.18 155) 40%,oklch(0.75 0.18 90) 100%)",
    accentEmoji:  "🏆",
    features: [
      "Triumph & Elegance emerald/gold design system",
      "11 interactive chapters",
      "Journey timeline with gold milestones",
      "Polaroid memory gallery with fairy lights",
      "3D flip-card 'Why You Deserve This' deck",
      "Typewriter note of pride on ruled paper",
      "Mic-activated champagne pop",
      "Envelope special message reveal",
      "Treasure chest reward reveal with confetti",
      "Limitless potential star animation",
      "Animated vinyl anthem player",
    ],
    thumbnailUrl: "/templates/congratulations-triumph/hero-achievement.jpg",
    author: "@pasha_dev_",
  },
  schema,
  defaults,
  Renderer: CongratulationsTriumphRenderer,
});
