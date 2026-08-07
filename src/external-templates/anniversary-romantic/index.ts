import { defineExternalTemplate } from "@/engine/types";
import { AnniversaryRomanticRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "b5c6d7e8-f9a0-1234-bcde-f01234567890",
    slug:         "anniversary-romantic",
    name:         "Anniversary Romantic",
    tagline:      "A cinematic 7-screen Midnight Romance anniversary experience",
    description:
      "A deeply emotional, luxury-grade interactive anniversary surprise. " +
      "7 screens: animated loader, romantic intro, live time-together counter, " +
      "3D coverflow photo gallery with lightbox, 3D flip-card 'Why I Love You' deck, " +
      "floating glass promise cards with wax seals, " +
      "and a 3D glassmorphic envelope that opens to reveal a typewriter love letter with confetti finale. " +
      "Aurora background, particle system, glassmorphism, spring-physics animations throughout.",
    category:     "anniversary",
    tags:         ["anniversary","romantic","cinematic","flip-cards","gallery","letter","promises","aurora","confetti","dark"],
    priceCents:   1999,
    isPremium:    true,
    coverGradient: "linear-gradient(135deg,#0a0a12 0%,#e11d48 45%,#fbbf24 100%)",
    accentEmoji:  "💑",
    features: [
      "Midnight Romance dark aurora aesthetic",
      "Floating particle system background",
      "Animated logo loader screen",
      "Romantic intro with avatar GIF",
      "Live time-together counter (years, months, days, hours, minutes)",
      "3D coverflow photo gallery with lightbox",
      "3D flip-card 'Why I Love You' deck (6 cards)",
      "Floating glass promise cards with wax seals",
      "3D envelope that opens → typewriter love letter",
      "Confetti explosion on letter completion",
      "Virtual Hug finale button",
    ],
    thumbnailUrl: "/templates/anniversary-romantic/images/1.jpg",
    author: "@pasha_dev_",
    previewImages: [
      "/templates/anniversary-romantic/images/1.jpg",
      "/templates/anniversary-romantic/images/2.jpg",
      "/templates/anniversary-romantic/images/3.jpg",
      "/templates/anniversary-romantic/images/4.jpg",
      "/templates/anniversary-romantic/gifs/anniversary.gif",
    ],
  },
  schema,
  defaults,
  Renderer: AnniversaryRomanticRenderer,
});
