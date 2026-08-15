import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "apology",
    label: "Apology Screen",
    icon: "🥺",
    fields: [
      { key: "partnerName", label: "Partner's Name", kind: "text", placeholder: "My Dearest" },
      { key: "apologyTitle", label: "Apology Headline", kind: "text", placeholder: "I Am So Truly Sorry" },
      { key: "apologySubtext", label: "Subtext", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "reasons",
    label: "Why I'm Sorry Section",
    icon: "💔",
    fields: [
      { key: "reasonsTitle", label: "Section Title", kind: "text", placeholder: "Why My Heart Hurts" },
      { key: "reasonsSorry", label: "Reasons List", kind: "list-cards" },
    ],
  },
  {
    key: "promises",
    label: "My Promises Section",
    icon: "🤝",
    fields: [
      { key: "promisesTitle", label: "Section Title", kind: "text", placeholder: "My Promises To You" },
      { key: "promisesList", label: "Promises List", kind: "list-cards" },
    ],
  },
  {
    key: "photos",
    label: "Memory Photos Section",
    icon: "📸",
    fields: [
      { key: "photosTitle", label: "Section Title", kind: "text", placeholder: "Remembering Our Happiness" },
      { key: "memoryPhotos", label: "Photos List", kind: "list-image" },
    ],
  },
  {
    key: "forgive",
    label: "Forgive Me Interactive Section",
    icon: "💖",
    fields: [
      { key: "forgiveQuestion", label: "Forgiveness Prompt", kind: "text", placeholder: "Will you forgive me?" },
      { key: "yesButtonText", label: "Yes Button Text", kind: "text", placeholder: "I Forgive You ❤️" },
      { key: "noButtonText", label: "No Button Text", kind: "text", placeholder: "Still Thinking 🥺" },
      { key: "forgivenMessage", label: "Forgiven Message", kind: "textarea", rows: 3 },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "sorry-apology" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  partnerName: "My Dearest",
  apologyTitle: "I Am So Truly Sorry",
  apologySubtext: "I made a mistake, and my heart breaks knowing I hurt you. Please let me make it right.",

  reasonsTitle: "Why My Heart Hurts",
  reasonsSorry: [
    { title: "I Was Thoughtless", text: "I should have listened more carefully and cared more deeply." },
    { title: "I Value You", text: "Your peace and happiness mean everything to me." },
  ],

  promisesTitle: "My Promises To You",
  promisesList: [
    { title: "To Listen Better", text: "I promise to hear you out with patience and understanding." },
    { title: "To Never Repeat This", text: "I promise to learn from this and treat you with endless care." },
  ],

  photosTitle: "Remembering Our Happiness",
  memoryPhotos: [
    "/templates/sorry-apology/heppi.gif",
    "/templates/sorry-apology/hug.gif",
  ],

  forgiveQuestion: "Will you forgive me?",
  yesButtonText: "I Forgive You ❤️",
  noButtonText: "Still Thinking 🥺",
  forgivenMessage: "Thank you for giving me another chance! I promise to make you smile every day ❤️",
  audioSrc: "",

  _page_title: "I Am Sorry — Heartfelt Apology",
  _page_seoTitle: "I Am Sorry — Heartfelt Apology",
  _page_seoDesc: "A sincere interactive apology experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
