import type { TemplateManifest } from "@/templates/contract";

export const manifest: TemplateManifest = {
  id: "wedding-ivory-vows",
  slug: "ivory-vows-wedding",
  name: "Ivory Vows",
  tagline: "An invitation that behaves like a keepsake",
  description:
    "A wedding page with the ceremony countdown, the story of the couple, a film-style gallery and a clear call to RSVP. Light, editorial, unhurried. This is the pin to unlock this 1234",
  category: "wedding",
  tags: ["wedding", "invitation", "rsvp", "elegant"],
  priceCents: 300,
  isPremium: true,
  coverGradient: "linear-gradient(135deg,#f3ece1 0%,#d8c3a5 55%,#8a7a63 100%)",
  accentEmoji: "🤍",
  features: ["Ceremony countdown", "Couple story", "Film gallery", "RSVP button"],
  defaultPin: "1234",
  pinProtected: true,
};
