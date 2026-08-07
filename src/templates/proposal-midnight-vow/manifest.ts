import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "proposal-midnight-vow",
  slug: "midnight-vow-proposal",
  name: "Midnight Vow",
  tagline: "A slow reveal that ends in one question",
  description:
    "A proposal page paced like a short film: a quiet opening, a typed confession, the story so far, and then the question — with a button that sends the answer straight to you. This is the pin to unlock this 1234",
  category: "proposal",
  tags: ["proposal", "typewriter", "timeline", "romantic"],
  priceCents: 300,
  isPremium: true,
  coverGradient: "linear-gradient(135deg,#1b1f3b 0%,#5b3f8f 50%,#d96a9a 100%)",
  accentEmoji: "💍",
  features: ["Typed confession", "Story timeline", "Floating hearts", "Answer button"],
  defaultPin: "1234",
  pinProtected: true,
};
