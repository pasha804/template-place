import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "welcome",
    label: "Welcome Screen",
    icon: "🏆",
    fields: [
      { key: "recipientName", label: "Recipient Name", kind: "text", placeholder: "Champion" },
      { key: "welcomeTitle", label: "Heading", kind: "text", placeholder: "Congratulations!" },
      { key: "welcomeSubtitle", label: "Subheading", kind: "text", placeholder: "A triumph celebrated across the stars" },
      { key: "welcomeButtonText", label: "Button Text", kind: "text", placeholder: "Begin Celebration 🏆" },
    ],
  },
  {
    key: "journey",
    label: "Path To Success Screen",
    icon: "🛤️",
    fields: [
      { key: "journeyTitle", label: "Section Title", kind: "text", placeholder: "Your Path To Triumph" },
      { key: "journeySubtitle", label: "Section Subtitle", kind: "text", placeholder: "Every hard milestone led to this glory" },
      { key: "milestones", label: "Milestones", kind: "list-cards" },
    ],
  },
  {
    key: "deserve",
    label: "Why You Deserve This Screen",
    icon: "🌟",
    fields: [
      { key: "deserveTitle", label: "Section Title", kind: "text", placeholder: "Why You Earned This" },
      { key: "deserveCards", label: "Reasons Cards", kind: "list-cards" },
    ],
  },
  {
    key: "memories",
    label: "Moments Of Pride Screen",
    icon: "📸",
    fields: [
      { key: "memoriesTitle", label: "Section Title", kind: "text", placeholder: "Hall of Victory" },
      { key: "memoryPhotos", label: "Photos List", kind: "list-image" },
    ],
  },
  {
    key: "limitless",
    label: "Limitless Potential Screen",
    icon: "🚀",
    fields: [
      { key: "limitlessTitle", label: "Section Title", kind: "text", placeholder: "Limitless Potential" },
      { key: "limitlessText", label: "Inspirational Quote", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "noteOfPride",
    label: "Note Of Pride Screen",
    icon: "💌",
    fields: [
      { key: "noteTitle", label: "Section Title", kind: "text", placeholder: "A Note Of Absolute Pride" },
      { key: "noteText", label: "Note Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "anthem",
    label: "Victory Anthem Screen",
    icon: "🎵",
    fields: [
      { key: "anthemTitle", label: "Song Title", kind: "text", placeholder: "We Are The Champions" },
      { key: "anthemArtist", label: "Artist", kind: "text", placeholder: "Queen" },
      { key: "audioSrc", label: "Audio URL", kind: "audio" },
    ],
  },
  {
    key: "reward",
    label: "The Reward Screen",
    icon: "🎁",
    fields: [
      { key: "rewardTitle", label: "Reward Heading", kind: "text", placeholder: "Your Crown Of Success" },
      { key: "rewardMessage", label: "Reward Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "special",
    label: "Special Message Screen",
    icon: "✉️",
    fields: [
      { key: "specialTitle", label: "Message Heading", kind: "text", placeholder: "Secret Message Of Praise" },
      { key: "specialMessage", label: "Message Inside Envelope", kind: "textarea", rows: 4 },
    ],
  },
  {
    key: "launch",
    label: "New Heights Screen",
    icon: "✨",
    fields: [
      { key: "launchTitle", label: "Heading", kind: "text", placeholder: "To Higher Heights" },
      { key: "launchText", label: "Subheading", kind: "text", placeholder: "This is just the first peak of many!" },
    ],
  },
  {
    key: "theEnd",
    label: "Final Screen",
    icon: "👑",
    fields: [
      { key: "theEndTitle", label: "Final Title", kind: "text", placeholder: "Walk Proudly!" },
      { key: "theEndMessage", label: "Final Message", kind: "textarea", rows: 3 },
      { key: "replayButtonText", label: "Replay Button Text", kind: "text", placeholder: "Replay Triumph 🏆" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "congratulations-triumph" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  recipientName: "Champion",
  welcomeTitle: "Congratulations!",
  welcomeSubtitle: "A triumph celebrated across the stars",
  welcomeButtonText: "Begin Celebration 🏆",

  journeyTitle: "Your Path To Triumph",
  journeySubtitle: "Every hard milestone led to this glory",
  milestones: [
    { title: "The Struggle", text: "Endless hours of hard work and dedication." },
    { title: "The Breakthrough", text: "Overcoming every obstacle in your path." },
    { title: "The Victory", text: "Standing victorious at the summit!" },
  ],

  deserveTitle: "Why You Earned This",
  deserveCards: [
    { title: "Unwavering Grit", text: "You never backed down when things got tough." },
    { title: "Pure Talent", text: "Your skill and passion shine in everything you do." },
  ],

  memoriesTitle: "Hall of Victory",
  memoryPhotos: [
    "/templates/congratulations-triumph/memory-1.jpg",
    "/templates/congratulations-triumph/memory-2.jpg",
    "/templates/congratulations-triumph/memory-3.jpg",
    "/templates/congratulations-triumph/memory-4.jpg",
    "/templates/congratulations-triumph/memory-5.jpg",
    "/templates/congratulations-triumph/memory-6.jpg",
  ],

  limitlessTitle: "Limitless Potential",
  limitlessText: "The sky is not your limit — it is just your starting point.",

  noteTitle: "A Note Of Absolute Pride",
  noteText: "Watching you achieve this goal brings immense pride and inspiration to everyone around you. Congratulations on a well-deserved victory!",

  anthemTitle: "We Are The Champions",
  anthemArtist: "Queen",
  audioSrc: "/templates/congratulations-triumph/music.mp3",

  rewardTitle: "Your Crown Of Success",
  rewardMessage: "Wear your success with honor — you worked relentlessly for it!",

  specialTitle: "Secret Message Of Praise",
  specialMessage: "Keep inspiring us all. Your journey of greatness has only just begun!",

  launchTitle: "To Higher Heights",
  launchText: "This is just the first peak of many!",

  theEndTitle: "Walk Proudly!",
  theEndMessage: "Congratulations once again on your grand achievement!",
  replayButtonText: "Replay Triumph 🏆",

  _page_title: "Congratulations — Triumph Edition",
  _page_seoTitle: "Congratulations — Triumph Edition",
  _page_seoDesc: "A triumphant celebration experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
