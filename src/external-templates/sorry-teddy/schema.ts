import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "opening",
    label: "Opening Page",
    icon: "🧸",
    fields: [
      { key: "openingTitle", label: "Heading", kind: "text", placeholder: "Teddy Bear Apology 🧸" },
      { key: "partnerName", label: "Partner's Name", kind: "text", placeholder: "My Cutie" },
      { key: "openingSubtext", label: "Subtext", kind: "text", placeholder: "Teddy has a very special message for you..." },
      { key: "openingButtonText", label: "Button Text", kind: "text", placeholder: "Open Teddy's Book 🧸" },
    ],
  },
  {
    key: "diary",
    label: "Teddy's Secret Diary Page",
    icon: "📖",
    fields: [
      { key: "diaryTitle", label: "Diary Heading", kind: "text", placeholder: "Teddy's Secret Diary" },
      { key: "diaryEntryText", label: "Diary Entry Text", kind: "textarea", rows: 6 },
    ],
  },
  {
    key: "hug",
    label: "Teddy Hug Page",
    icon: "🤗",
    fields: [
      { key: "hugTitle", label: "Hug Page Heading", kind: "text", placeholder: "Giant Teddy Hugs!" },
      { key: "hugMessage", label: "Hug Message", kind: "text", placeholder: "Sending you 1,000 warm teddy hugs ❤️" },
    ],
  },
  {
    key: "letter",
    label: "Heartfelt Letter Page",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Letter Heading", kind: "text", placeholder: "From My Heart" },
      { key: "letterText", label: "Letter Body", kind: "textarea", rows: 8 },
      { key: "signature", label: "Signature", kind: "text", placeholder: "Your Loving Teddy 🧸" },
    ],
  },
  {
    key: "gift",
    label: "Virtual Gift Page",
    icon: "🎁",
    fields: [
      { key: "giftTitle", label: "Gift Heading", kind: "text", placeholder: "A Special Gift For You" },
      { key: "giftRevealMessage", label: "Gift Reveal Text", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "apology",
    label: "Final Apology & Forgiveness Page",
    icon: "💖",
    fields: [
      { key: "apologyQuestion", label: "Question Prompt", kind: "text", placeholder: "Will you forgive your Teddy?" },
      { key: "yesButtonText", label: "Yes Button Text", kind: "text", placeholder: "Yes, I forgive you! ❤️" },
      { key: "noButtonText", label: "No Button Text", kind: "text", placeholder: "Still Thinking 🥺" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "sorry-teddy" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  openingTitle: "Teddy Bear Apology 🧸",
  partnerName: "My Cutie",
  openingSubtext: "Teddy has a very special message for you...",
  openingButtonText: "Open Teddy's Book 🧸",

  diaryTitle: "Teddy's Secret Diary",
  diaryEntryText: "Dear Diary,\nToday I made my favorite person sad. I feel so small and sorry. I wish I could wrap them in the warmest hug and make all the sadness disappear.",

  hugTitle: "Giant Teddy Hugs!",
  hugMessage: "Sending you 1,000 warm teddy hugs ❤️",

  letterTitle: "From My Heart",
  letterText: "I am truly sorry for my mistake. You bring so much joy into my life, and hurting you is the last thing I ever wanted to do.\n\nPlease forgive me ❤️",
  signature: "Your Loving Teddy 🧸",

  giftTitle: "A Special Gift For You",
  giftRevealMessage: "A lifetime promise to protect your smile and bring you endless happiness!",

  apologyQuestion: "Will you forgive your Teddy?",
  yesButtonText: "Yes, I forgive you! ❤️",
  noButtonText: "Still Thinking 🥺",
  audioSrc: "",

  _page_title: "I Am Sorry — Cute Teddy Edition",
  _page_seoTitle: "I Am Sorry — Cute Teddy Edition",
  _page_seoDesc: "An adorable teddy bear apology experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
