import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "hero",
    label: "Hero Screen",
    icon: "🌹",
    fields: [
      { key: "heroTitle", label: "Hero Title", kind: "text", placeholder: "Happy Birthday" },
      { key: "birthdayName", label: "Birthday Person's Name", kind: "text", placeholder: "My Rose 🌹" },
      { key: "heroSubtitle", label: "Hero Subtitle", kind: "text", placeholder: "A romantic rose edition made with endless love" },
      { key: "heroButtonText", label: "Button Text", kind: "text", placeholder: "Open Surprise 🌹" },
    ],
  },
  {
    key: "cake",
    label: "Cake & Candles Section",
    icon: "🎂",
    fields: [
      { key: "cakeHeading", label: "Cake Title", kind: "text", placeholder: "Make A Wish My Love" },
      { key: "cakeSubheading", label: "Cake Subheading", kind: "text", placeholder: "Tap to blow out the candles" },
    ],
  },
  {
    key: "gallery",
    label: "Rose Photo Gallery",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Gallery Title", kind: "text", placeholder: "Moments In Bloom" },
      { key: "photos", label: "Photos", kind: "list-image" },
    ],
  },
  {
    key: "letter",
    label: "Love Letter Section",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Letter Heading", kind: "text", placeholder: "To My Dearest" },
      { key: "letterBody", label: "Letter Body", kind: "textarea", rows: 10 },
      { key: "signature", label: "Signature", kind: "text", placeholder: "Forever Yours ❤️" },
    ],
  },
  {
    key: "music",
    label: "Music & Voice Note",
    icon: "🎵",
    fields: [
      { key: "songTitle", label: "Song Title", kind: "text", placeholder: "Our Song" },
      { key: "songArtist", label: "Artist", kind: "text", placeholder: "Dedicated with love" },
      { key: "audioSrc", label: "Audio Track URL", kind: "audio" },
    ],
  },
  {
    key: "finale",
    label: "Finale Wish Section",
    icon: "✨",
    fields: [
      { key: "finaleTitle", label: "Finale Title", kind: "text", placeholder: "Happy Birthday My Forever Love" },
      { key: "finaleText", label: "Finale Text", kind: "textarea", rows: 3 },
      { key: "replayButtonText", label: "Replay Button Text", kind: "text", placeholder: "Replay Experience 🌹" },
    ],
  },
  {
    key: "page",
    label: "Page Settings",
    icon: "⚙️",
    fields: [
      { key: "_page_title", label: "Page title", kind: "text" },
      { key: "_page_seoTitle", label: "SEO title", kind: "text" },
      { key: "_page_seoDesc", label: "SEO description", kind: "textarea", rows: 2 },
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-rose" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  heroTitle: "Happy Birthday",
  birthdayName: "My Rose 🌹",
  heroSubtitle: "A romantic rose edition made with endless love",
  heroButtonText: "Open Surprise 🌹",

  cakeHeading: "Make A Wish My Love",
  cakeSubheading: "Tap to blow out the candles",

  galleryTitle: "Moments In Bloom",
  photos: [
    "/templates/birthday-rose/images/p1.jpg",
    "/templates/birthday-rose/images/p2.jpg",
    "/templates/birthday-rose/images/p3.jpg",
    "/templates/birthday-rose/images/p4.jpg",
    "/templates/birthday-rose/images/p5.jpg",
    "/templates/birthday-rose/images/p6.jpg",
  ],

  letterTitle: "To My Dearest",
  letterBody: "Happy Birthday to the most blooming, wonderful person in my life.\n\nYou bring scent, color, and happiness into every single day.\n\nI love you endlessly ❤️",
  signature: "Forever Yours ❤️",

  songTitle: "Our Song",
  songArtist: "Dedicated with love",
  audioSrc: "",

  finaleTitle: "Happy Birthday My Forever Love",
  finaleText: "May your life bloom as beautifully as a rose in full garden.",
  replayButtonText: "Replay Experience 🌹",

  _page_title: "Happy Birthday — Romantic Rose Edition",
  _page_seoTitle: "Happy Birthday — Romantic Rose Edition",
  _page_seoDesc: "A romantic rose birthday surprise.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
