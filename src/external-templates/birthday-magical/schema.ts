import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Opening Heading", kind: "text", placeholder: "Casting magical spells..." },
      { key: "loaderSubtext", label: "Opening Subtext", kind: "text", placeholder: "Preparing a enchanted experience ✨" },
    ],
  },
  {
    key: "intro",
    label: "Intro Screen",
    icon: "🪄",
    fields: [
      { key: "introTitle", label: "Intro Title", kind: "text", placeholder: "A Magical Surprise Awaits" },
      { key: "birthdayName", label: "Birthday Person's Name", kind: "text", placeholder: "Princess 👑" },
      { key: "introButtonText", label: "Button Text", kind: "text", placeholder: "Enter The Magic ✨" },
    ],
  },
  {
    key: "age",
    label: "Age Reveal Screen",
    icon: "🎂",
    fields: [
      { key: "age", label: "Turning Age", kind: "number", placeholder: "21" },
      { key: "ageTitle", label: "Age Heading", kind: "text", placeholder: "Leveling Up!" },
      { key: "ageSubtitle", label: "Age Subtitle", kind: "text", placeholder: "21 Years Of Pure Magic" },
    ],
  },
  {
    key: "cake",
    label: "Interactive Cake Screen",
    icon: "🍰",
    fields: [
      { key: "cakeHeading", label: "Cake Title", kind: "text", placeholder: "Make a Wish!" },
      { key: "cakeInstruction", label: "Instruction Text", kind: "text", placeholder: "Blow on your mic or tap the candles!" },
    ],
  },
  {
    key: "constellation",
    label: "Constellation Screen",
    icon: "🌌",
    fields: [
      { key: "constellationTitle", label: "Section Title", kind: "text", placeholder: "Written In The Stars" },
      { key: "constellationStars", label: "Star Wishes", kind: "list-cards", help: "Label and wish for each star" },
    ],
  },
  {
    key: "timeline",
    label: "Timeline Screen",
    icon: "🛤️",
    fields: [
      { key: "timelineTitle", label: "Section Title", kind: "text", placeholder: "Chapter by Chapter" },
      { key: "timelineEvents", label: "Events", kind: "list-cards" },
    ],
  },
  {
    key: "reasons",
    label: "Reasons I Love You Screen",
    icon: "💖",
    fields: [
      { key: "reasonsTitle", label: "Section Title", kind: "text", placeholder: "Why You Are Magical" },
      { key: "reasonsList", label: "Reasons Cards", kind: "list-cards" },
    ],
  },
  {
    key: "superlatives",
    label: "Superlatives Screen",
    icon: "🏆",
    fields: [
      { key: "superlativesTitle", label: "Section Title", kind: "text", placeholder: "Official Awards" },
      { key: "superlativesList", label: "Awards List", kind: "list-cards" },
    ],
  },
  {
    key: "scratch",
    label: "Scratch Reveal Screen",
    icon: "🎟️",
    fields: [
      { key: "scratchTitle", label: "Section Title", kind: "text", placeholder: "Scratch For A Secret" },
      { key: "scratchSecretText", label: "Secret Revealed Text", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "unboxing",
    label: "Gift Unboxing Screen",
    icon: "🎁",
    fields: [
      { key: "unboxingTitle", label: "Section Title", kind: "text", placeholder: "Unwrap Your Gifts" },
      { key: "unboxingGifts", label: "Gifts List", kind: "list-cards" },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Screen",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Section Title", kind: "text", placeholder: "Magical Gallery" },
      { key: "photos", label: "Photo URLs", kind: "list-image" },
    ],
  },
  {
    key: "balloons",
    label: "Wish Balloons Screen",
    icon: "🎈",
    fields: [
      { key: "balloonsTitle", label: "Section Title", kind: "text", placeholder: "Pop The Wish Balloons!" },
      { key: "balloonWishes", label: "Balloons List", kind: "list-cards" },
    ],
  },
  {
    key: "wishes",
    label: "Wishes Carousel Screen",
    icon: "🌟",
    fields: [
      { key: "wishesTitle", label: "Section Title", kind: "text", placeholder: "Warmest Birthday Wishes" },
      { key: "wishesCarousel", label: "Wishes Cards", kind: "list-cards" },
    ],
  },
  {
    key: "message",
    label: "Love Letter Screen",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Section Title", kind: "text", placeholder: "From My Heart To Yours" },
      { key: "letterText", label: "Letter Body", kind: "textarea", rows: 10 },
      { key: "signature", label: "Signature", kind: "text", placeholder: "With all my love ❤️" },
    ],
  },
  {
    key: "celebration",
    label: "Finale Celebration Screen",
    icon: "🎉",
    fields: [
      { key: "celebrationTitle", label: "Finale Title", kind: "text", placeholder: "Happy Birthday!" },
      { key: "celebrationMessage", label: "Finale Message", kind: "textarea", rows: 3 },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-magical" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Casting magical spells...",
  loaderSubtext: "Preparing an enchanted experience ✨",

  introTitle: "A Magical Surprise Awaits",
  birthdayName: "Princess 👑",
  introButtonText: "Enter The Magic ✨",

  age: 21,
  ageTitle: "Leveling Up!",
  ageSubtitle: "21 Years Of Pure Magic",

  cakeHeading: "Make a Wish!",
  cakeInstruction: "Blow on your mic or tap the candles!",

  constellationTitle: "Written In The Stars",
  constellationStars: [
    { title: "Star 1", text: "Endless Joy" },
    { title: "Star 2", text: "Forever Smiles" },
    { title: "Star 3", text: "Sweet Dreams" },
  ],

  timelineTitle: "Chapter by Chapter",
  timelineEvents: [
    { title: "First Chapter", text: "The beginning of your journey." },
    { title: "Today", text: "A bright new chapter opens." },
  ],

  reasonsTitle: "Why You Are Magical",
  reasonsList: [
    { title: "Your Smile", text: "It brightens up every room." },
    { title: "Your Heart", text: "Filled with endless kindness." },
  ],

  superlativesTitle: "Official Awards",
  superlativesList: [
    { title: "Best Smile", text: "Awarded to the most adorable person." },
    { title: "Kindest Soul", text: "For making the world a better place." },
  ],

  scratchTitle: "Scratch For A Secret",
  scratchSecretText: "You are the most precious person in the world! ❤️",

  unboxingTitle: "Unwrap Your Gifts",
  unboxingGifts: [
    { title: "Gift 1", text: "Unlimited Warm Hugs 🤗" },
    { title: "Gift 2", text: "Endless Laughter 😄" },
  ],

  galleryTitle: "Magical Gallery",
  photos: [
    "/templates/birthday-magical/images/1.jpeg",
    "/templates/birthday-magical/images/2.jpeg",
    "/templates/birthday-magical/images/3.jpeg",
    "/templates/birthday-magical/images/4.jpeg",
    "/templates/birthday-magical/images/5.jpeg",
  ],

  balloonsTitle: "Pop The Wish Balloons!",
  balloonWishes: [
    { title: "Balloon 1", text: "Wish 1: Pure Happiness" },
    { title: "Balloon 2", text: "Wish 2: Endless Love" },
  ],

  wishesTitle: "Warmest Birthday Wishes",
  wishesCarousel: [
    { title: "Wish 1", text: "May your day be filled with magic and love." },
  ],

  letterTitle: "From My Heart To Yours",
  letterText: "Happy Birthday, my magical person!\n\nMay your special day be filled with enchantment, laughter, and everything your heart desires.\n\nYou bring so much magic into the lives of everyone around you.\n\nWith all my love,",
  signature: "With all my love ❤️",

  celebrationTitle: "Happy Birthday!",
  celebrationMessage: "May your year ahead be as extraordinary as you are ✨",
  audioSrc: "",

  _page_title: "Happy Birthday — Magical Surprise",
  _page_seoTitle: "Happy Birthday — Magical Surprise",
  _page_seoDesc: "An interactive 15-screen magical birthday experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
