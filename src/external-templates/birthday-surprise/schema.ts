import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "first",
    label: "First Screen",
    icon: "🎁",
    fields: [
      { key: "firstTitle", label: "Heading", kind: "text", placeholder: "A Secret Surprise Awaits..." },
      { key: "firstSubtext", label: "Subtext", kind: "text", placeholder: "For someone who makes my life so special." },
      { key: "firstButtonText", label: "Button Text", kind: "text", placeholder: "Start Surprise 🎁" },
    ],
  },
  {
    key: "second",
    label: "Second Screen (Memories)",
    icon: "📸",
    fields: [
      { key: "secondTitle", label: "Section Heading", kind: "text", placeholder: "Moments We Cherish" },
      { key: "secondSubtext", label: "Subtext", kind: "text", placeholder: "Tap to see our favorite memories" },
      { key: "photos", label: "Photos", kind: "list-image" },
    ],
  },
  {
    key: "third",
    label: "Third Screen (Reasons)",
    icon: "💖",
    fields: [
      { key: "thirdTitle", label: "Section Heading", kind: "text", placeholder: "Why You're So Special" },
      { key: "reasonsCards", label: "Reasons List", kind: "list-cards" },
    ],
  },
  {
    key: "fourth",
    label: "Fourth Screen (Letter)",
    icon: "💌",
    fields: [
      { key: "fourthTitle", label: "Section Heading", kind: "text", placeholder: "A Message From The Heart" },
      { key: "letterText", label: "Letter Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "cake",
    label: "Cake & Wish Screen",
    icon: "🎂",
    fields: [
      { key: "cakeBirthdayText", label: "Birthday Headline", kind: "text", placeholder: "Happy Birthday!" },
      { key: "candleInstruction", label: "Instruction Text", kind: "text", placeholder: "Make a wish and blow out the candles!" },
    ],
  },
  {
    key: "vault",
    label: "Secret Vault Screen",
    icon: "🔒",
    fields: [
      { key: "vaultTitle", label: "Vault Heading", kind: "text", placeholder: "The Secret Vault" },
      { key: "vaultPin", label: "Unlock Code / PIN", kind: "pin", placeholder: "1234" },
      { key: "vaultSecretText", label: "Secret Revealed Text", kind: "textarea", rows: 4 },
    ],
  },
  {
    key: "hug",
    label: "Virtual Hug Overlay",
    icon: "🤗",
    fields: [
      { key: "hugTitle", label: "Overlay Heading", kind: "text", placeholder: "Sending You A Big Hug!" },
      { key: "hugMessage", label: "Hug Message", kind: "text", placeholder: "Warmest hugs across the miles! ❤️" },
    ],
  },
  {
    key: "music",
    label: "Background Music",
    icon: "🎵",
    fields: [
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-surprise" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  firstTitle: "A Secret Surprise Awaits...",
  firstSubtext: "For someone who makes my life so special.",
  firstButtonText: "Start Surprise 🎁",

  secondTitle: "Moments We Cherish",
  secondSubtext: "Tap to see our favorite memories",
  photos: [
    "/templates/birthday-surprise/images/1.jpg",
    "/templates/birthday-surprise/images/2.jpg",
    "/templates/birthday-surprise/images/3.jpg",
    "/templates/birthday-surprise/images/4.jpg",
  ],

  thirdTitle: "Why You're So Special",
  reasonsCards: [
    { title: "Your Smile", text: "Brightens up every single day." },
    { title: "Your Soul", text: "Pure gold and full of love." },
  ],

  fourthTitle: "A Message From The Heart",
  letterText: "Happy Birthday!\n\nI hope your special day is overflowing with laughter, sweet treats, and everything you love most.\n\nKeep shining bright! ❤️",

  cakeBirthdayText: "Happy Birthday!",
  candleInstruction: "Make a wish and blow out the candles!",

  vaultTitle: "The Secret Vault",
  vaultPin: "1234",
  vaultSecretText: "You unlocked the vault! You deserve all the happiness in the universe! 🎉",

  hugTitle: "Sending You A Big Hug!",
  hugMessage: "Warmest hugs across the miles! ❤️",
  audioSrc: "/templates/birthday-surprise/music.mp3",

  _page_title: "Happy Birthday — Ultimate Surprise",
  _page_seoTitle: "Happy Birthday — Ultimate Surprise",
  _page_seoDesc: "An interactive birthday surprise experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
