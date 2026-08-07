import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "valentine-neon-pulse",
  slug: "neon-pulse-valentine",
  name: "Neon Pulse",
  tagline: "Loud, bright and completely unsubtle",
  description:
    "A Valentine's page with a starfield, a neon headline, a reasons grid and a GIF slot — for people whose love language is being obvious about it. This is the pin to unlock this 1234",
  category: "valentine",
  tags: ["valentine", "neon", "particles", "gif"],
  priceCents: 150,
  isPremium: false,
  coverGradient: "linear-gradient(135deg,#12002e 0%,#7b1fa2 45%,#ff2e88 100%)",
  accentEmoji: "💗",
  features: ["Starfield background", "Neon headline", "Reasons grid", "GIF slot"],
  defaultPin: "1234",
  pinProtected: true,
};
