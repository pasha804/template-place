import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Loader Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Loader Heading", kind: "text", placeholder: "Measuring cuteness overload..." },
    ],
  },
  {
    key: "first",
    label: "First Screen",
    icon: "💝",
    fields: [
      { key: "firstTitle", label: "Title", kind: "text", placeholder: "Hey Cutie!" },
      { key: "firstSubtext", label: "Subtext", kind: "text", placeholder: "I have something special to ask you..." },
      { key: "firstButtonText", label: "Button Text", kind: "text", placeholder: "Start Surprise 💖" },
    ],
  },
  {
    key: "heyBeautiful",
    label: "Hey Beautiful Screen",
    icon: "🌸",
    fields: [
      { key: "heyTitle", label: "Heading", kind: "text", placeholder: "Hey Beautiful 🌹" },
      { key: "partnerName", label: "Partner's Name", kind: "text", placeholder: "My Angel" },
      { key: "heyMessage", label: "Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "specialYou",
    label: "Special You Screen",
    icon: "✨",
    fields: [
      { key: "specialTitle", label: "Heading", kind: "text", placeholder: "Why You Are So Special" },
      { key: "specialMessage", label: "Message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "doYouLikeMe",
    label: "Do You Like Me Interactive Screen",
    icon: "💌",
    fields: [
      { key: "likeQuestion", label: "Question Text", kind: "text", placeholder: "Do you like me?" },
      { key: "yesButtonText", label: "Yes Button Text", kind: "text", placeholder: "Yes, I love you! ❤️" },
      { key: "noButtonText", label: "No Button Text", kind: "text", placeholder: "No 😜" },
    ],
  },
  {
    key: "quiz",
    label: "Love Quiz Screen",
    icon: "❓",
    fields: [
      { key: "quizTitle", label: "Quiz Title", kind: "text", placeholder: "The Cutest Quiz" },
      { key: "quizQuestions", label: "Questions List", kind: "list-cards" },
    ],
  },
  {
    key: "note",
    label: "Little Note Screen",
    icon: "📝",
    fields: [
      { key: "noteTitle", label: "Note Title", kind: "text", placeholder: "A Little Secret Note" },
      { key: "noteText", label: "Note Body", kind: "textarea", rows: 6 },
    ],
  },
  {
    key: "gallery",
    label: "Photo Memories Screen",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Gallery Title", kind: "text", placeholder: "Our Favorite Moments" },
      { key: "photos", label: "Photos", kind: "list-image" },
    ],
  },
  {
    key: "gifts",
    label: "Surprise Gifts Screen",
    icon: "🎁",
    fields: [
      { key: "giftsTitle", label: "Gifts Title", kind: "text", placeholder: "Pick Your Birthday / Proposal Gift" },
      { key: "giftBoxes", label: "Gifts List", kind: "list-cards" },
    ],
  },
  {
    key: "question",
    label: "Proposal Question Screen",
    icon: "💍",
    fields: [
      { key: "proposalQuestion", label: "Main Proposal Question", kind: "text", placeholder: "Will You Be Mine Forever?" },
      { key: "proposalSubtext", label: "Proposal Subtext", kind: "text", placeholder: "My heart belongs to you." },
    ],
  },
  {
    key: "celebration",
    label: "Celebration Finale Screen",
    icon: "🎉",
    fields: [
      { key: "celebrationTitle", label: "Title", kind: "text", placeholder: "YAY! She Said YES! 🎉" },
      { key: "celebrationMessage", label: "Message", kind: "textarea", rows: 3 },
      { key: "audioSrc", label: "Background Music URL", kind: "audio" },
    ],
  },
  {
    key: "page",
    label: "Page Settings",
    icon: "GS",
    fields: [
      { key: "_page_title", label: "Page title", kind: "text" },
      { key: "_page_seoTitle", label: "SEO title", kind: "text" },
      { key: "_page_seoDesc", label: "SEO description", kind: "textarea", rows: 2 },
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "proposal-cook" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Measuring cuteness overload...",

  firstTitle: "Hey Cutie!",
  firstSubtext: "I have something special to ask you...",
  firstButtonText: "Start Surprise 💖",

  heyTitle: "Hey Beautiful 🌹",
  partnerName: "My Angel",
  heyMessage: "From the moment you entered my life, everything became infinitely warmer.",

  specialTitle: "Why You Are So Special",
  specialMessage: "You are the sweetest part of my day, my favorite thought, and my home.",

  likeQuestion: "Do you like me?",
  yesButtonText: "Yes, I love you! ❤️",
  noButtonText: "No 😜",

  quizTitle: "The Cutest Quiz",
  quizQuestions: [
    { title: "Question 1", text: "Who is the cutest person in the room? (Hint: YOU!)" },
  ],

  noteTitle: "A Little Secret Note",
  noteText: "I just wanted to remind you how deeply loved and cherished you are.",

  galleryTitle: "Our Favorite Moments",
  photos: [
    "/templates/proposal-cook/images/photo1.jpg",
    "/templates/proposal-cook/images/photo2.jpg",
    "/templates/proposal-cook/images/photo3.jpg",
    "/templates/proposal-cook/images/photo4.jpg",
  ],

  giftsTitle: "Pick Your Birthday / Proposal Gift",
  giftBoxes: [
    { title: "Box 1", text: "1,000 Sweet Kisses 💋" },
    { title: "Box 2", text: "A Lifetime Of Happiness 💍" },
  ],

  proposalQuestion: "Will You Be Mine Forever?",
  proposalSubtext: "My heart belongs to you.",

  celebrationTitle: "YAY! She Said YES! 🎉",
  celebrationMessage: "Here's to our beautiful forever together ❤️",
  audioSrc: "/templates/proposal-cook/music.mp3",

  _page_title: "Romantic Proposal — Cute Edition",
  _page_seoTitle: "Romantic Proposal — Cute Edition",
  _page_seoDesc: "An interactive romantic proposal experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
