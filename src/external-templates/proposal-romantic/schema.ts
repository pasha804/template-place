import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Loader Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Loader Heading", kind: "text", placeholder: "Preparing a romantic surprise..." },
    ],
  },
  {
    key: "first",
    label: "First Screen",
    icon: "💖",
    fields: [
      { key: "firstTitle", label: "Title", kind: "text", placeholder: "My Dearest Love" },
      { key: "firstSubtext", label: "Subtext", kind: "text", placeholder: "A romantic surprise crafted with all my heart." },
      { key: "firstButtonText", label: "Button Text", kind: "text", placeholder: "Begin Surprise 💖" },
    ],
  },
  {
    key: "heyBeautiful",
    label: "Hey Beautiful Screen",
    icon: "🌹",
    fields: [
      { key: "heyTitle", label: "Heading", kind: "text", placeholder: "To My Soulmate 🌹" },
      { key: "partnerName", label: "Partner's Name", kind: "text", placeholder: "My Love" },
      { key: "heyMessage", label: "Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "specialYou",
    label: "Special You Screen",
    icon: "✨",
    fields: [
      { key: "specialTitle", label: "Heading", kind: "text", placeholder: "Why You Are My Everything" },
      { key: "specialMessage", label: "Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "doYouLikeMe",
    label: "Do You Love Me Screen",
    icon: "💌",
    fields: [
      { key: "likeQuestion", label: "Question Text", kind: "text", placeholder: "Do you love me?" },
      { key: "yesButtonText", label: "Yes Button Text", kind: "text", placeholder: "Yes, Forever! ❤️" },
      { key: "noButtonText", label: "No Button Text", kind: "text", placeholder: "No 😜" },
    ],
  },
  {
    key: "quiz",
    label: "Our Love Quiz",
    icon: "❓",
    fields: [
      { key: "quizTitle", label: "Quiz Title", kind: "text", placeholder: "How Well Do You Know My Heart?" },
      { key: "quizQuestions", label: "Questions List", kind: "list-cards" },
    ],
  },
  {
    key: "note",
    label: "Love Letter Screen",
    icon: "📝",
    fields: [
      { key: "noteTitle", label: "Note Title", kind: "text", placeholder: "A Secret Love Note" },
      { key: "noteText", label: "Note Body", kind: "textarea", rows: 6 },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Screen",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Gallery Title", kind: "text", placeholder: "Our Love In Pictures" },
      { key: "photos", label: "Photos", kind: "list-image" },
    ],
  },
  {
    key: "gifts",
    label: "Surprise Gifts Screen",
    icon: "🎁",
    fields: [
      { key: "giftsTitle", label: "Gifts Title", kind: "text", placeholder: "Select Your Romantic Gift" },
      { key: "giftBoxes", label: "Gifts List", kind: "list-cards" },
    ],
  },
  {
    key: "question",
    label: "Proposal Question Screen",
    icon: "💍",
    fields: [
      { key: "proposalQuestion", label: "Proposal Question", kind: "text", placeholder: "Will You Marry Me?" },
      { key: "proposalSubtext", label: "Proposal Subtext", kind: "text", placeholder: "I want to spend every tomorrow with you." },
    ],
  },
  {
    key: "celebration",
    label: "Celebration Screen",
    icon: "🎉",
    fields: [
      { key: "celebrationTitle", label: "Title", kind: "text", placeholder: "SHE SAID YES! 💍✨" },
      { key: "celebrationMessage", label: "Message", kind: "textarea", rows: 3 },
      { key: "audioSrc", label: "Background Music URL", kind: "audio" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "proposal-romantic" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Preparing a romantic surprise...",

  firstTitle: "My Dearest Love",
  firstSubtext: "A romantic surprise crafted with all my heart.",
  firstButtonText: "Begin Surprise 💖",

  heyTitle: "To My Soulmate 🌹",
  partnerName: "My Love",
  heyMessage: "You are the best decision I have ever made.",

  specialTitle: "Why You Are My Everything",
  specialMessage: "Life with you is a dream come true, day after day.",

  likeQuestion: "Do you love me?",
  yesButtonText: "Yes, Forever! ❤️",
  noButtonText: "No 😜",

  quizTitle: "How Well Do You Know My Heart?",
  quizQuestions: [
    { title: "Question 1", text: "When did I know you were the one? (From day one!)" },
  ],

  noteTitle: "A Secret Love Note",
  noteText: "I promise to love, protect, and cherish you for all of eternity.",

  galleryTitle: "Our Love In Pictures",
  photos: [
    "/templates/proposal-romantic/images/photo1.jpg",
    "/templates/proposal-romantic/images/photo2.jpg",
    "/templates/proposal-romantic/images/photo3.jpg",
    "/templates/proposal-romantic/images/photo4.jpg",
  ],

  giftsTitle: "Select Your Romantic Gift",
  giftBoxes: [
    { title: "Gift 1", text: "My Endless Loyalty & Devotion ❤️" },
    { title: "Gift 2", text: "An Eternal Diamond Ring 💍" },
  ],

  proposalQuestion: "Will You Marry Me?",
  proposalSubtext: "I want to spend every tomorrow with you.",

  celebrationTitle: "SHE SAID YES! 💍✨",
  celebrationMessage: "Our forever starts today ❤️",
  audioSrc: "",

  _page_title: "Romantic Proposal — Midnight Edition",
  _page_seoTitle: "Romantic Proposal — Midnight Edition",
  _page_seoDesc: "A cinematic romantic proposal.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
