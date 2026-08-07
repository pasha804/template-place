import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "birthday-golden-hour",
  slug: "golden-hour-birthday",
  name: "Golden Hour Birthday",
  tagline: "Confetti, countdown and a warm gold glow",
  description:
    "A birthday page that opens with confetti, counts the years, and holds a gallery plus a written note. Built for someone who deserves more than a text message. This is the pin to unlock this 1234",
  category: "birthday",
  tags: ["birthday", "confetti", "countdown", "gallery"],
  priceCents: 300,
  isPremium: true,
  coverGradient: "linear-gradient(135deg,#f5b24a 0%,#ef6f5b 55%,#8d4bd8 100%)",
  accentEmoji: "🎂",
  features: ["Confetti on open", "Age countdown", "Photo gallery", "Personal letter"],
  defaultPin: "1234",
  pinProtected: true,
};
