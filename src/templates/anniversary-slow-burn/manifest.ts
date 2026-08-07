import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "anniversary-slow-burn",
  slug: "slow-burn-anniversary",
  name: "Slow Burn",
  tagline: "Every day counted, none of them wasted",
  description:
    "An anniversary page built around a live counter of your time together, a masonry wall of photos, and the reasons list you never quite said out loud. This is the pin to unlock this 1234",
  category: "anniversary",
  tags: ["anniversary", "counter", "masonry", "reasons"],
  priceCents: 150,
  isPremium: false,
  coverGradient: "linear-gradient(135deg,#7a2c3d 0%,#c9526b 50%,#e9a06b 100%)",
  accentEmoji: "🕯️",
  features: ["Live day counter", "Masonry gallery", "Reasons grid", "Background music"],
  defaultPin: "1234",
  pinProtected: true,
};
