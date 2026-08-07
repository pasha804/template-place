import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "intro",
    label: "Intro Screen",
    icon: "🥺",
    fields: [
      { key: "introTitle", label: "Intro Headline", kind: "text", placeholder: "I am really sorry..." },
      { key: "partnerName", label: "Partner's Name", kind: "text", placeholder: "My Sweetheart" },
      { key: "introSubtext", label: "Intro Subtext", kind: "text", placeholder: "Please open this message from my heart." },
      { key: "introButtonText", label: "Button Text", kind: "text", placeholder: "Open Message 🥺" },
    ],
  },
  {
    key: "screen1",
    label: "Apology Letter Screen",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Letter Heading", kind: "text", placeholder: "From Me To You" },
      { key: "letterBody", label: "Letter Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "screen2",
    label: "Reasons & Promises Screen",
    icon: "🌸",
    fields: [
      { key: "promisesTitle", label: "Section Heading", kind: "text", placeholder: "My Promises To You" },
      { key: "promisesList", label: "Promises List", kind: "list-cards" },
    ],
  },
  {
    key: "lyrics",
    label: "Music & Song Lyrics Screen",
    icon: "🎵",
    fields: [
      { key: "lyricsTitle", label: "Song Title", kind: "text", placeholder: "Our Song Lyrics" },
      { key: "songLyrics", label: "Song Lyrics Text", kind: "textarea", rows: 10 },
      { key: "audioSrc", label: "Audio Track URL", kind: "audio" },
    ],
  },
  {
    key: "forgive",
    label: "Forgiveness Prompt Screen",
    icon: "💖",
    fields: [
      { key: "forgiveQuestion", label: "Question", kind: "text", placeholder: "Can we be okay again?" },
      { key: "yesButtonText", label: "Yes Button Text", kind: "text", placeholder: "Yes ❤️" },
      { key: "noButtonText", label: "No Button Text", kind: "text", placeholder: "No 🥺" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "sorry-sweet" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  introTitle: "I am really sorry...",
  partnerName: "My Sweetheart",
  introSubtext: "Please open this message from my heart.",
  introButtonText: "Open Message 🥺",

  letterTitle: "From Me To You",
  letterBody: "I am so sorry for hurting your feelings. You mean the world to me and I never want to see you sad, especially because of me.",

  promisesTitle: "My Promises To You",
  promisesList: [
    { title: "Promise 1", text: "I will listen to you more attentively." },
    { title: "Promise 2", text: "I will make sure you always feel loved and valued." },
  ],

  lyricsTitle: "Our Song Lyrics",
  songLyrics: "Every day with you is a gift...\nI am sorry for my mistakes...",
  audioSrc: "/templates/sorry-sweet/music.mp3",

  forgiveQuestion: "Can we be okay again?",
  yesButtonText: "Yes ❤️",
  noButtonText: "No 🥺",

  _page_title: "I Am Sorry — Sweet Edition",
  _page_seoTitle: "I Am Sorry — Sweet Edition",
  _page_seoDesc: "A sweet interactive apology with song lyrics and warm wishes.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
