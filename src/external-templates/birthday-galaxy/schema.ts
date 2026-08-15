import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "welcome",
    label: "Welcome Screen",
    icon: "🌌",
    fields: [
      { key: "birthdayName", label: "Birthday Person's Name", kind: "text", placeholder: "My Star" },
      { key: "welcomeTitle", label: "Welcome Heading", kind: "text", placeholder: "Happy Birthday" },
      { key: "welcomeSubtitle", label: "Welcome Subtitle", kind: "text", placeholder: "A Birthday Galaxy Just For You" },
      { key: "welcomeButtonText", label: "Button Text", kind: "text", placeholder: "Explore Galaxy ✨" },
    ],
  },
  {
    key: "journey",
    label: "Our Journey Screen",
    icon: "🛤️",
    fields: [
      { key: "journeyTitle", label: "Section Title", kind: "text", placeholder: "Our Constellation Journey" },
      { key: "journeySubtitle", label: "Section Subtitle", kind: "text", placeholder: "Every moment with you shines bright" },
      { key: "milestones", label: "Milestones List", kind: "list-cards", help: "Milestone title and description" },
    ],
  },
  {
    key: "memories",
    label: "Memories Screen",
    icon: "📸",
    fields: [
      { key: "memoriesTitle", label: "Section Title", kind: "text", placeholder: "Starlight Memories" },
      { key: "memoryPhotos", label: "Gallery Photos", kind: "list-image" },
    ],
  },
  {
    key: "special",
    label: "Why You're Special Screen",
    icon: "💖",
    fields: [
      { key: "specialTitle", label: "Section Title", kind: "text", placeholder: "Why You're My Favourite" },
      { key: "specialCards", label: "Flip Cards", kind: "list-cards" },
    ],
  },
  {
    key: "wishes",
    label: "Cosmic Wishes Screen",
    icon: "🌟",
    fields: [
      { key: "wishesTitle", label: "Section Title", kind: "text", placeholder: "Birthday Wishes For You" },
      { key: "wishesList", label: "Wishes List", kind: "list-cards" },
    ],
  },
  {
    key: "note",
    label: "Love Note Screen",
    icon: "💌",
    fields: [
      { key: "noteTitle", label: "Section Title", kind: "text", placeholder: "A Secret Note" },
      { key: "noteText", label: "Note Body", kind: "textarea", rows: 6 },
    ],
  },
  {
    key: "wish",
    label: "Make a Wish Screen",
    icon: "🕯️",
    fields: [
      { key: "wishTitle", label: "Section Title", kind: "text", placeholder: "Blow The Candle & Make A Wish" },
      { key: "wishMessage", label: "Wish Reveal Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "surprise",
    label: "Surprise Screen",
    icon: "🎁",
    fields: [
      { key: "surpriseTitle", label: "Section Title", kind: "text", placeholder: "Your Birthday Gift" },
      { key: "surpriseMessage", label: "Gift Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "love",
    label: "Love Letter Screen",
    icon: "❤️",
    fields: [
      { key: "loveLetterText", label: "Letter Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "song",
    label: "Birthday Song Screen",
    icon: "🎵",
    fields: [
      { key: "songTitle", label: "Song Title", kind: "text", placeholder: "Happy Birthday" },
      { key: "songArtist", label: "Artist / Dedicated by", kind: "text", placeholder: "With Love" },
      { key: "audioSrc", label: "Audio URL", kind: "audio" },
    ],
  },
  {
    key: "final",
    label: "Final Screen",
    icon: "✨",
    fields: [
      { key: "finalTitle", label: "Final Heading", kind: "text", placeholder: "Happy Birthday!" },
      { key: "finalMessage", label: "Closing Message", kind: "textarea", rows: 3 },
      { key: "replayButtonText", label: "Replay Button Text", kind: "text", placeholder: "Replay Galaxy ✨" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-galaxy" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  birthdayName: "My Star",
  welcomeTitle: "Happy Birthday",
  welcomeSubtitle: "A Birthday Galaxy Just For You",
  welcomeButtonText: "Explore Galaxy ✨",

  journeyTitle: "Our Constellation Journey",
  journeySubtitle: "Every moment with you shines bright",
  milestones: [
    { title: "Day We Met", text: "A new star shone in my world." },
    { title: "First Birthday Together", text: "Making unforgettable memories." },
    { title: "Today", text: "Celebrating your special day under the stars." },
  ],

  memoriesTitle: "Starlight Memories",
  memoryPhotos: [
    "/templates/birthday-galaxy/images/1.jpeg",
    "/templates/birthday-galaxy/images/2.jpeg",
    "/templates/birthday-galaxy/images/3.jpeg",
    "/templates/birthday-galaxy/images/4.jpeg",
    "/templates/birthday-galaxy/images/5.jpeg",
    "/templates/birthday-galaxy/images/6.jpeg",
  ],

  specialTitle: "Why You're My Favourite",
  specialCards: [
    { title: "Your Kindness", text: "You fill every space with warmth." },
    { title: "Your Smile", text: "Brighter than any supernova." },
  ],

  wishesTitle: "Birthday Wishes For You",
  wishesList: [
    { title: "Endless Happiness", text: "May all your dreams come true this year!" },
    { title: "Good Health & Joy", text: "Wishing you peace, health, and love always." },
  ],

  noteTitle: "A Secret Note",
  noteText: "You are the brightest star in my sky. Happy Birthday!",

  wishTitle: "Blow The Candle & Make A Wish",
  wishMessage: "May your year ahead be as luminous as you are!",

  surpriseTitle: "Your Birthday Gift",
  surpriseMessage: "A whole universe of love, wrapped up just for you!",

  loveLetterText: "Happy Birthday, my love!\n\nThank you for bringing so much light and joy into my life. Every day with you is a gift.\n\nHere's to another wonderful year around the sun!\n\nForever yours ❤️",

  songTitle: "Happy Birthday",
  songArtist: "Dedicated to You",
  audioSrc: "",

  finalTitle: "Happy Birthday!",
  finalMessage: "May your day be magical and your year extraordinary.",
  replayButtonText: "Replay Galaxy ✨",

  _page_title: "Happy Birthday — Cosmic Galaxy Surprise",
  _page_seoTitle: "Happy Birthday — Cosmic Galaxy Surprise",
  _page_seoDesc: "A cosmic galaxy birthday experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
