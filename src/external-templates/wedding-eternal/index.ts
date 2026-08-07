import { defineExternalTemplate } from "@/engine/types";
import { WeddingEternalRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "e3f4a5b6-c7d8-9012-efab-234567890123",
    slug:         "wedding-eternal",
    name:         "Wedding Eternal",
    tagline:      "A luxury navy & gold full-page wedding website",
    description:
      "A cinematic luxury wedding website with deep navy canvas and gold accents. Sections include: hero countdown, our story timeline, couple portraits, photo gallery, event details, and RSVP. Falling petals ambient background, parallax hero, and gold shimmer typography.",
    category:     "wedding",
    tags:         ["wedding","luxury","navy","gold","countdown","gallery","rsvp","story","full-page"],
    priceCents:   2999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,oklch(0.215 0.048 253.8) 0%,oklch(0.346 0.074 256) 50%,oklch(0.767 0.139 91.1) 100%)",
    accentEmoji:  "💍",
    features: [
      "Deep navy & gold luxury design system",
      "Full-page scrolling website",
      "Live countdown to the wedding",
      "Falling petals ambient background",
      "Parallax hero section",
      "Our story timeline with photos",
      "Couple portraits section",
      "Photo gallery grid",
      "Event details & venue info",
      "WhatsApp RSVP integration",
      "Gold shimmer typography",
    ],
    thumbnailUrl: "/templates/wedding-eternal/hero-couple.jpg",
    author: "@pasha_dev_",
  },
  schema,
  defaults,
  Renderer: WeddingEternalRenderer,
});
