import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Opening Heading", kind: "text", placeholder: "Preparing a sweet surprise..." },
    ],
  },
  {
    key: "intro",
    label: "Intro Screen",
    icon: "🎁",
    fields: [
      { key: "introTitle", label: "Intro headline", kind: "text", placeholder: "A Cutiepie was born today, 21 years ago!" },
      { key: "introSubtext", label: "Intro subtext", kind: "text", placeholder: "Yes, it's YOU! A little surprise awaits..." },
      { key: "introButtonText", label: "Button text", kind: "text", placeholder: "Open My Surprise 🎁" },
    ],
  },
  {
    key: "cake",
    label: "Cake Screen",
    icon: "🎂",
    fields: [
      { key: "cakeBirthdayText", label: "Birthday headline", kind: "text", placeholder: "Happy Birthday, Cutiepiee!" },
      { key: "candleInstruction", label: "Candle instruction text", kind: "text", placeholder: "Make a wish & blow the candle!" },
    ],
  },
  {
    key: "photos",
    label: "Photo Carousel Screen",
    icon: "📸",
    fields: [
      { key: "photosTitle", label: "Section title", kind: "text", placeholder: "Moments of Joy" },
      { key: "photo1", label: "Photo 1", kind: "image" },
      { key: "photo2", label: "Photo 2", kind: "image" },
      { key: "photo3", label: "Photo 3", kind: "image" },
      { key: "photo4", label: "Photo 4", kind: "image" },
    ],
  },
  {
    key: "message",
    label: "Birthday Message Screen",
    icon: "💌",
    fields: [
      { key: "messageText", label: "Message text", kind: "textarea", rows: 10 },
    ],
  },
  {
    key: "hug",
    label: "Hug Finale Screen",
    icon: "🤗",
    fields: [
      { key: "hugTitle", label: "Finale title", kind: "text", placeholder: "Sending Big Hugs!" },
      { key: "hugMessage", label: "Hug message", kind: "text", placeholder: "Sending you the warmest hugs! ❤️" },
      { key: "hugButtonText", label: "Button text", kind: "text", placeholder: "Send Big Hug 🤗" },
      { key: "audioSrc", label: "Background music URL", kind: "audio", help: "Upload an .mp3 track URL." },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-bloom" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Preparing a sweet surprise...",

  introTitle: "A Cutiepie was born today, 21 years ago!",
  introSubtext: "Yes, it's YOU! A little surprise awaits...",
  introButtonText: "Open My Surprise 🎁",

  cakeBirthdayText: "Happy Birthday, Cutiepiee!",
  candleInstruction: "Make a wish & blow the candle!",

  photosTitle: "Moments of Joy",
  photo1: "/templates/birthday-bloom/images/1.jpg",
  photo2: "/templates/birthday-bloom/images/2.jpg",
  photo3: "/templates/birthday-bloom/images/3.jpg",
  photo4: "/templates/birthday-bloom/images/4.jpg",

  messageText: "Happy Birthday, Cutiepie! 🎂✨\n\nYou deserve all the happiness, love, and smiles in the world today and always.\n\nYou have this special way of making everything around you brighter. Your smile, your kindness, and the way you make people feel truly cared for is a rare gift.\n\nI hope your day is filled with laughter, surprises, and moments that make your heart happy.\n\nYou're truly one of a kind, and I just want you to know how special you are.\n\nKeep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💗",

  hugTitle: "Sending Big Hugs!",
  hugMessage: "Sending you the warmest hugs! ❤️",
  hugButtonText: "Send Big Hug 🤗",
  audioSrc: "",

  _page_title: "Happy Birthday — A Surprise Just For You",
  _page_seoTitle: "Happy Birthday — A Surprise Just For You",
  _page_seoDesc: "A floral interactive birthday surprise with cake, photos, letter and warm hugs.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
