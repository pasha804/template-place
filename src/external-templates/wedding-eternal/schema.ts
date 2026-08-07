import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "hero",
    label: "Hero Section",
    icon: "💍",
    fields: [
      { key: "groomName", label: "Groom's Name", kind: "text", placeholder: "Alexander" },
      { key: "brideName", label: "Bride's Name", kind: "text", placeholder: "Sophia" },
      { key: "weddingDate", label: "Wedding Date", kind: "date" },
      { key: "heroTagline", label: "Hero Tagline", kind: "text", placeholder: "Are Getting Married" },
      { key: "venueLocation", label: "Venue City / Location", kind: "text", placeholder: "Florence, Italy" },
      { key: "heroPhotoUrl", label: "Hero Banner Image", kind: "image" },
    ],
  },
  {
    key: "couple",
    label: "Groom & Bride Bios Section",
    icon: "💑",
    fields: [
      { key: "groomBio", label: "Groom's Bio", kind: "textarea", rows: 4 },
      { key: "groomPhoto", label: "Groom's Photo", kind: "image" },
      { key: "brideBio", label: "Bride's Bio", kind: "textarea", rows: 4 },
      { key: "bridePhoto", label: "Bride's Photo", kind: "image" },
    ],
  },
  {
    key: "story",
    label: "Our Love Story Section",
    icon: "📖",
    fields: [
      { key: "storyTitle", label: "Story Section Title", kind: "text", placeholder: "How We Met" },
      { key: "storyText", label: "Story Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "timeline",
    label: "Relationship Timeline Section",
    icon: "🛤️",
    fields: [
      { key: "timelineTitle", label: "Timeline Title", kind: "text", placeholder: "Our Journey" },
      { key: "timelineEvents", label: "Timeline Events", kind: "list-cards" },
    ],
  },
  {
    key: "eventDetails",
    label: "Event & Venue Details Section",
    icon: "📍",
    fields: [
      { key: "venueName", label: "Venue Name", kind: "text", placeholder: "Villa Rosa San Miniato" },
      { key: "venueAddress", label: "Venue Address", kind: "text", placeholder: "Via di San Miniato 12, Florence, Italy" },
      { key: "mapUrl", label: "Google Maps Embed / Link", kind: "text" },
    ],
  },
  {
    key: "schedule",
    label: "Wedding Schedule Section",
    icon: "⏰",
    fields: [
      { key: "scheduleTitle", label: "Schedule Title", kind: "text", placeholder: "Order of Events" },
      { key: "scheduleEvents", label: "Events Schedule", kind: "list-cards" },
    ],
  },
  {
    key: "bridalParty",
    label: "Bridal Party Section",
    icon: "👑",
    fields: [
      { key: "bridalPartyTitle", label: "Section Title", kind: "text", placeholder: "The Bridal Party" },
      { key: "bridalPartyList", label: "Party Members", kind: "list-cards" },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Section",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Gallery Title", kind: "text", placeholder: "Memories & Engagement Photos" },
      { key: "photos", label: "Gallery Photos", kind: "list-image" },
    ],
  },
  {
    key: "hotels",
    label: "Accommodations & Hotels Section",
    icon: "🏨",
    fields: [
      { key: "hotelsTitle", label: "Section Title", kind: "text", placeholder: "Where To Stay" },
      { key: "hotelsList", label: "Hotels List", kind: "list-cards" },
    ],
  },
  {
    key: "registry",
    label: "Gift Registry Section",
    icon: "🎁",
    fields: [
      { key: "registryTitle", label: "Registry Title", kind: "text", placeholder: "Gift Registry" },
      { key: "registryMessage", label: "Registry Message", kind: "textarea", rows: 3 },
      { key: "registryLinks", label: "Registry Links List", kind: "list-cards" },
    ],
  },
  {
    key: "faq",
    label: "Frequently Asked Questions Section",
    icon: "❓",
    fields: [
      { key: "faqTitle", label: "FAQ Title", kind: "text", placeholder: "Frequently Asked Questions" },
      { key: "faqs", label: "Questions & Answers List", kind: "list-cards" },
    ],
  },
  {
    key: "rsvp",
    label: "RSVP & Guestbook Section",
    icon: "✉️",
    fields: [
      { key: "rsvpTitle", label: "RSVP Section Title", kind: "text", placeholder: "Kindly Respond" },
      { key: "rsvpDeadline", label: "RSVP Deadline Date", kind: "text", placeholder: "August 30, 2026" },
      { key: "whatsappNumber", label: "WhatsApp Contact Number", kind: "text", placeholder: "+1234567890" },
    ],
  },
  {
    key: "footer",
    label: "Footer Section",
    icon: "🌹",
    fields: [
      { key: "footerText", label: "Footer Message", kind: "text", placeholder: "We can't wait to celebrate with you!" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "wedding-eternal" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  groomName: "Alexander",
  brideName: "Sophia",
  weddingDate: "2026-09-18",
  heroTagline: "Are Getting Married",
  venueLocation: "Florence, Italy",
  heroPhotoUrl: "/templates/wedding-eternal/hero-couple.jpg",

  groomBio: "Architect, coffee enthusiast, and lover of classical music.",
  groomPhoto: "/templates/wedding-eternal/groom.jpg",
  brideBio: "Landscape designer, bookworm, and passionate about art.",
  bridePhoto: "/templates/wedding-eternal/bride.jpg",

  storyTitle: "How We Met",
  storyText: "We met on a crisp autumn evening in Paris. From our first conversation over coffee, we knew we had found something truly rare and extraordinary.",

  timelineTitle: "Our Journey",
  timelineEvents: [
    { title: "First Met", text: "Paris, France — October 2021" },
    { title: "First Trip", text: "Amalfi Coast — June 2022" },
    { title: "The Proposal", text: "Florence, Italy — September 2025" },
  ],

  venueName: "Villa Rosa San Miniato",
  venueAddress: "Via di San Miniato 12, Florence, Italy",
  mapUrl: "https://maps.google.com",

  scheduleTitle: "Order of Events",
  scheduleEvents: [
    { title: "Welcome Drinks", text: "4:00 PM — Villa Garden" },
    { title: "Wedding Ceremony", text: "5:00 PM — Main Chapel" },
    { title: "Reception & Dinner", text: "7:00 PM — Grand Ballroom" },
  ],

  bridalPartyTitle: "The Bridal Party",
  bridalPartyList: [
    { title: "Best Man", text: "David Miller" },
    { title: "Maid of Honor", text: "Emma Watson" },
  ],

  galleryTitle: "Memories & Engagement Photos",
  photos: [
    "/templates/wedding-eternal/gallery-1.jpg",
    "/templates/wedding-eternal/gallery-2.jpg",
    "/templates/wedding-eternal/gallery-3.jpg",
    "/templates/wedding-eternal/gallery-4.jpg",
    "/templates/wedding-eternal/gallery-5.jpg",
    "/templates/wedding-eternal/gallery-6.jpg",
  ],

  hotelsTitle: "Where To Stay",
  hotelsList: [
    { title: "Grand Hotel Florence", text: "5-star luxury hotel 10 minutes from venue." },
  ],

  registryTitle: "Gift Registry",
  registryMessage: "Your presence at our wedding is the greatest gift of all. If you wish to honor us with a gift, please view our registry below.",
  registryLinks: [
    { title: "Honeymoon Fund", text: "Help us build memories in Japan" },
  ],

  faqTitle: "Frequently Asked Questions",
  faqs: [
    { title: "What is the dress code?", text: "Black Tie Optional." },
  ],

  rsvpTitle: "Kindly Respond",
  rsvpDeadline: "August 30, 2026",
  whatsappNumber: "+1234567890",

  footerText: "We can't wait to celebrate with you!",

  _page_title: "Alexander & Sophia — Wedding Invitation",
  _page_seoTitle: "Alexander & Sophia — Wedding Invitation",
  _page_seoDesc: "Official wedding website and invitation for Alexander & Sophia.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
