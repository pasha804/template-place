import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "hero",
    label: "Hero Section",
    icon: "💍",
    fields: [
      { key: "groomName", label: "Groom's Name", kind: "text", placeholder: "Aariyan" },
      { key: "brideName", label: "Bride's Name", kind: "text", placeholder: "Ananya" },
      { key: "weddingDate", label: "Wedding Date", kind: "date" },
      { key: "heroTagline", label: "Hero Tagline", kind: "text", placeholder: "Save The Date" },
      { key: "venueLocation", label: "Venue Location / City", kind: "text", placeholder: "Udaipur, Rajasthan" },
    ],
  },
  {
    key: "couple",
    label: "The Couple Section",
    icon: "💑",
    fields: [
      { key: "groomBio", label: "Groom's Note / Intro", kind: "textarea", rows: 3 },
      { key: "groomPhoto", label: "Groom's Photo", kind: "image" },
      { key: "brideBio", label: "Bride's Note / Intro", kind: "textarea", rows: 3 },
      { key: "bridePhoto", label: "Bride's Photo", kind: "image" },
    ],
  },
  {
    key: "story",
    label: "Our Love Story Section",
    icon: "📖",
    fields: [
      { key: "storyTitle", label: "Story Section Title", kind: "text", placeholder: "Our Journey To Forever" },
      { key: "storyEvents", label: "Love Story Cards", kind: "list-cards" },
    ],
  },
  {
    key: "events",
    label: "Wedding Functions & Events",
    icon: "🗓️",
    fields: [
      { key: "eventsTitle", label: "Section Title", kind: "text", placeholder: "Wedding Celebrations" },
      { key: "eventsList", label: "Events List", kind: "list-cards", help: "Function name, Date/Time, Venue" },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Section",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Gallery Title", kind: "text", placeholder: "Pre-Wedding Gallery" },
      { key: "photos", label: "Photos List", kind: "list-image" },
    ],
  },
  {
    key: "rsvp",
    label: "RSVP Section",
    icon: "✉️",
    fields: [
      { key: "rsvpTitle", label: "RSVP Title", kind: "text", placeholder: "Will You Join Us?" },
      { key: "rsvpSubtext", label: "RSVP Subtext", kind: "text", placeholder: "Please confirm your presence by September 1st" },
      { key: "whatsappContact", label: "WhatsApp Contact", kind: "text", placeholder: "+92 300 1234567" },
    ],
  },
  {
    key: "footer",
    label: "Footer Section",
    icon: "🌸",
    fields: [
      { key: "footerMessage", label: "Footer Message", kind: "text", placeholder: "With blessings from both families ❤️" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "wedding-petals" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  groomName: "Aariyan",
  brideName: "Ananya",
  weddingDate: "2026-11-24",
  heroTagline: "Save The Date",
  venueLocation: "Udaipur, Rajasthan",

  groomBio: "Ready to embark on the greatest adventure of my life with my best friend.",
  groomPhoto: "/templates/wedding-petals/groom.jpg",
  brideBio: "Counting down the days until I say 'I do' to the love of my life.",
  bridePhoto: "/templates/wedding-petals/bride.jpg",

  storyTitle: "Our Journey To Forever",
  storyEvents: [
    { title: "First Met", text: "A chance encounter that changed everything." },
    { title: "The Proposal", text: "Under the starlit sky of Udaipur." },
  ],

  eventsTitle: "Wedding Celebrations",
  eventsList: [
    { title: "Mehndi & Sangeet", text: "Nov 23, 2026 • 6:00 PM • Royal Palace Lawns" },
    { title: "Wedding Ceremony", text: "Nov 24, 2026 • 5:00 PM • Lake Palace Courtyard" },
  ],

  galleryTitle: "Pre-Wedding Gallery",
  photos: [
    "/templates/wedding-petals/g1.jpg",
    "/templates/wedding-petals/g2.jpg",
    "/templates/wedding-petals/g3.jpg",
    "/templates/wedding-petals/g4.jpg",
    "/templates/wedding-petals/g5.jpg",
    "/templates/wedding-petals/g6.jpg",
  ],

  rsvpTitle: "Will You Join Us?",
  rsvpSubtext: "Please confirm your presence by September 1st",
  whatsappContact: "+92 300 1234567",

  footerMessage: "With blessings from both families ❤️",

  _page_title: "Aariyan & Ananya — Wedding Invitation",
  _page_seoTitle: "Aariyan & Ananya — Wedding Invitation",
  _page_seoDesc: "Petals floral wedding invitation and website.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
