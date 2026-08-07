import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "friendship-paper-trail",
  slug: "paper-trail-friendship",
  name: "Paper Trail",
  tagline: "For the friend who has seen every version of you",
  description:
    "A warm, print-inspired page for friendship, gratitude or an apology: a written note, a grid of shared moments and a timeline of the years. This is the pin to unlock this 1234",
  category: "friendship",
  tags: ["friendship", "gratitude", "timeline", "minimal"],
  priceCents: 0,
  isPremium: false,
  coverGradient: "linear-gradient(135deg,#f6efe4 0%,#d7c4a3 50%,#6b8f71 100%)",
  accentEmoji: "🧡",
  features: ["Written note", "Moments grid", "Years timeline", "Free to publish"],
  defaultPin: "1234",
  pinProtected: true,
};
