import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Opening Heading", kind: "text", placeholder: "Preparing Something Magical..." },
      { key: "loaderSubtext", label: "Opening Subtext", kind: "text", placeholder: "For someone very special ✨" },
    ],
  },
  {
    key: "celebration",
    label: "Celebration Screen",
    icon: "🎉",
    fields: [
      { key: "celebrationHeading", label: "Celebration Title", kind: "text", placeholder: "Happy Birthday!" },
      { key: "celebrationSubtext", label: "Celebration Subtext", kind: "text", placeholder: "Today is all about celebrating you ✨" },
      { key: "celebrationButtonText", label: "Button Text", kind: "text", placeholder: "Begin The Surprise 🎁" },
    ],
  },
  {
    key: "age",
    label: "Age Reveal Screen",
    icon: "🎂",
    fields: [
      { key: "birthdayName", label: "Birthday person's name", kind: "text", placeholder: "Madam Jii 💕" },
      { key: "birthdayTagline", label: "Birthday tagline", kind: "text", placeholder: "🎉 It's your most special day! 🎉" },
      { key: "age", label: "Turning Age", kind: "number", placeholder: "18" },
      { key: "ageFactText", label: "Age milestone text", kind: "text", placeholder: "You are officially EIGHTEEN" },
    ],
  },
  {
    key: "bday",
    label: "Happy Birthday Screen",
    icon: "🎁",
    fields: [
      { key: "bdayHeading", label: "Main Heading", kind: "text", placeholder: "Happy Birthday!" },
      { key: "bdaySubheading", label: "Subheading", kind: "text", placeholder: "Wishing you a year filled with love, laughter, and endless joy." },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Screen",
    icon: "📸",
    fields: [
      { key: "photo1", label: "Photo 1", kind: "image" },
      { key: "photo2", label: "Photo 2", kind: "image" },
      { key: "photo3", label: "Photo 3", kind: "image" },
      { key: "photo4", label: "Photo 4", kind: "image" },
    ],
  },
  {
    key: "vibes",
    label: "GIF Vibes Screen",
    icon: "💫",
    fields: [
      { key: "gifVibesTitle", label: "Section Title", kind: "text", placeholder: "Our Vibes & Hugs" },
      { key: "gifVibesCards", label: "GIF Cards", kind: "list-cards", help: "Title, Caption, and Emoji for each card" },
    ],
  },
  {
    key: "wishes",
    label: "Wishes Wall Screen",
    icon: "🌟",
    fields: [
      { key: "wishesTitle", label: "Section Title", kind: "text", placeholder: "My Wishes For You" },
      { key: "wishesList", label: "Wish Cards", kind: "list-cards", help: "Title and text for each wish" },
    ],
  },
  {
    key: "letter",
    label: "Birthday Letter Screen",
    icon: "💌",
    fields: [
      { key: "letterText", label: "Birthday letter body", kind: "textarea", rows: 10 },
      { key: "letterSignature", label: "Signature", kind: "text", placeholder: "Forever Yours 💕" },
    ],
  },
  {
    key: "music",
    label: "Music",
    icon: "🎵",
    fields: [
      { key: "audioSrc", label: "Background music URL", kind: "audio", help: "Upload an .mp3 file URL. Leave blank to disable." },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-aurora" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Preparing Something Magical...",
  loaderSubtext: "For someone very special ✨",

  celebrationHeading: "Happy Birthday!",
  celebrationSubtext: "Today is all about celebrating you ✨",
  celebrationButtonText: "Begin The Surprise 🎁",

  birthdayName: "Madam Jii 💕",
  birthdayTagline: "🎉 It's your most special day! 🎉",
  age: 18,
  ageFactText: "You are officially EIGHTEEN",

  bdayHeading: "Happy Birthday!",
  bdaySubheading: "Wishing you a year filled with love, laughter, and endless joy.",

  photo1: "/templates/birthday-aurora/images/1.jpg",
  photo2: "/templates/birthday-aurora/images/2.jpg",
  photo3: "/templates/birthday-aurora/images/3.jpg",
  photo4: "/templates/birthday-aurora/images/4.jpg",

  gifVibesTitle: "Our Vibes & Hugs",
  gifVibesCards: [
    { title: "A Hug From Behind", caption: "This is me, every single day, wishing I could just give you this hug. 🫂", emoji: "🫂" },
    { title: "The Warmest Hug", caption: "You deserve all the warmth in the world. Sending you this one with everything I have. 💗", emoji: "💗" },
    { title: "That's You, Always", caption: "This is literally you — just being your adorable self without even trying. 🌸", emoji: "🌸" },
    { title: "My Wish For You", caption: "Please, please, please just know how much you are loved today. 🙏✨", emoji: "🙏" },
  ],

  wishesTitle: "My Wishes For You",
  wishesList: [
    { title: "I Wish You Joy", text: "May every single morning feel like the first day of something beautiful." },
    { title: "I Wish You Strength", text: "Whenever life gets heavy, I wish you the strength to carry on." },
    { title: "I Wish You Celebration", text: "You deserve to feel celebrated, seen, and appreciated. Always." },
    { title: "I Wish You Peace", text: "May all the noise and overthinking just melt away." },
  ],

  letterText: "My Dearest Madam Jii,\n\nOn this very special day, I want you to know how incredibly grateful I am to have you in my life.\n\nYou have this amazing ability to light up any room you enter, to make people smile even on their darkest days, and to spread kindness wherever you go.\n\nHappy Birthday, beautiful soul! 🎂✨\n\nWith all my love,",
  letterSignature: "Forever Yours 💕",
  audioSrc: "",

  _page_title: "Happy Birthday — Aurora Surprise",
  _page_seoTitle: "Happy Birthday — Aurora Surprise",
  _page_seoDesc: "An interactive magical aurora birthday surprise.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
