import { defineExternalTemplate } from "@/engine/types";
import { WeddingPetalsRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "f4a5b6c7-d8e9-0123-fabc-345678901234",
    slug:         "wedding-petals",
    name:         "Wedding Petals",
    tagline:      "A copper & blush full-page wedding website with falling petals",
    description:
      "A romantic copper & blush wedding website. Falling petals ambient background, copper-shimmer typography, countdown timer, our story timeline, couple portraits, gallery grid, and WhatsApp RSVP. Clean, editorial and deeply personal.",
    category:     "wedding",
    tags:         ["wedding","copper","blush","petals","countdown","gallery","rsvp","story","romantic"],
    priceCents:   2999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.16 0.045 330) 0%,oklch(0.3 0.07 335) 50%,oklch(0.74 0.13 52) 100%)",
    accentEmoji:  "🌸",
    features: [
      "Copper & blush romantic design system",
      "Full-page scrolling website",
      "Falling petals animated background",
      "Live countdown to the wedding",
      "Parallax hero with couple photo",
      "Our story timeline",
      "Couple portraits with hover effects",
      "Photo gallery grid",
      "Event details section",
      "WhatsApp RSVP integration",
      "Scroll-reveal animations on all sections",
    ],
    thumbnailUrl: "/templates/wedding-petals/hero-couple.jpg",
    author: "@pasha_dev_",
  },
  schema,
  defaults,
  Renderer: WeddingPetalsRenderer,
});
