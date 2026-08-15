import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "first",
    label: "First Screen",
    icon: "🎁",
    fields: [
      { key: "firstTitle", label: "Heading", kind: "text", placeholder: "Happy Birthday! 🎂" },
      { key: "firstSubtext", label: "Subtext", kind: "text", placeholder: "For someone who makes my life so special." },
      { key: "firstButtonText", label: "Button Text", kind: "text", placeholder: "Start Surprise 🎁" },
      { key: "welcomeGifUrl", label: "Welcome GIF", kind: "image" },
    ],
  },
  {
    key: "cake",
    label: "Cake & Wish Screen",
    icon: "🎂",
    fields: [
      { key: "cakeHeadingUnlit", label: "Heading (Before Blowing)", kind: "text", placeholder: "Make a Wish 🕯️" },
      { key: "cakeHeadingLit", label: "Heading (After Blowing)", kind: "text", placeholder: "Happy Birthday! 🎉" },
      { key: "cakeBirthdayText", label: "Birthday Subtitle / Wish text", kind: "text", placeholder: "your wish has been sent ✨" },
    ],
  },
  {
    key: "second",
    label: "Second Screen (Wish Cards)",
    icon: "💖",
    fields: [
      { key: "wishCardsHeading", label: "Section Heading", kind: "text", placeholder: "Special Wishes For You" },
      { key: "wishCards", label: "Wish Cards List", kind: "list-cards" },
    ],
  },
  {
    key: "third",
    label: "Third Screen (Memories)",
    icon: "📸",
    fields: [
      { key: "memoriesHeading", label: "Section Heading", kind: "text", placeholder: "Moments We Cherish" },
      { key: "memoryPhotos", label: "Photos", kind: "list-image" },
    ],
  },
  {
    key: "fourth",
    label: "Fourth Screen (Letter)",
    icon: "💌",
    fields: [
      { key: "letterHeading", label: "Letter Heading", kind: "text", placeholder: "A Letter, Just For You" },
      { key: "letterText", label: "Letter Body", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "vault",
    label: "Secret Vault Screen",
    icon: "🔒",
    fields: [
      { key: "vaultTitle", label: "Vault Heading", kind: "text", placeholder: "The Secret Vault" },
      { key: "pin", label: "Unlock PIN Code", kind: "pin", placeholder: "1234" },
      { key: "vaultAvatarUrl", label: "Vault Avatar Photo", kind: "image" },
    ],
  },
  {
    key: "hug",
    label: "Virtual Hug Overlay",
    icon: "🤗",
    fields: [
      { key: "hugTitle", label: "Overlay Heading", kind: "text", placeholder: "Sending You A Big Hug!" },
      { key: "hugMessage", label: "Hug Message", kind: "text", placeholder: "Warmest hugs across the miles! ❤️" },
      { key: "hugGifUrl", label: "Hug GIF URL", kind: "image" },
    ],
  },
  {
    key: "theme",
    label: "Theme Colors & Background",
    icon: "🎨",
    fields: [
      { key: "bgGradientFrom", label: "Background Radial (Center/Top)", kind: "color" },
      { key: "bgGradientMid", label: "Background Radial (Mid)", kind: "color" },
      { key: "bgGradientTo", label: "Background Radial (Outer)", kind: "color" },
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
  // First screen
  firstTitle: "Happy Birthday! 🎂",
  firstSubtext: "For someone who makes my life so special.",
  firstButtonText: "Start Surprise 🎁",
  welcomeSubText: "For someone who makes my life so special.",
  welcomeButtonText: "Start Surprise 🎁",
  welcomeGifUrl: "/templates/birthday-surprise/gifs/heppi.gif",

  // Cake screen
  cakeHeadingUnlit: "Make a Wish 🕯️",
  cakeHeadingLit: "Happy Birthday! 🎉",
  cakeBirthdayText: "Happy Birthday!",
  candleInstruction: "Make a wish and blow out the candles!",

  // Wish cards screen
  wishCardsHeading: "Special Wishes For You",
  thirdTitle: "Special Wishes For You",
  wishCards: [
    "Wishing you a day as bright and beautiful as your smile — Happy Birthday!",
    "May this birthday bring you all the love, laughter, and joy you deserve!",
    "Another year older, another year more amazing. You just keep getting better!",
    "You make everyone around you happier just by existing. Today we celebrate YOU!",
    "Today is YOUR day — make a wish, eat the cake, and let yourself be celebrated!",
  ],
  reasonsCards: [
    { title: "Your Smile", text: "Brightens up every single day." },
    { title: "Your Soul", text: "Pure gold and full of love." },
  ],

  // Memories screen
  secondTitle: "Moments We Cherish",
  secondSubtext: "Tap to see our favorite memories",
  memoriesHeading: "Moments We Cherish",
  photos: [
    "/templates/birthday-surprise/images/1.jpg",
    "/templates/birthday-surprise/images/2.jpg",
    "/templates/birthday-surprise/images/3.jpg",
    "/templates/birthday-surprise/images/4.jpg",
  ],
  memoryPhotos: [
    "/templates/birthday-surprise/images/1.jpg",
    "/templates/birthday-surprise/images/2.jpg",
    "/templates/birthday-surprise/images/3.jpg",
    "/templates/birthday-surprise/images/4.jpg",
  ],

  // Letter screen
  fourthTitle: "A Message From The Heart",
  letterHeading: "A Message From The Heart",
  letterText: "Happy Birthday!\n\nI hope your special day is overflowing with laughter, sweet treats, and everything you love most.\n\nKeep shining bright! ❤️",

  // Vault screen
  vaultTitle: "The Secret Vault",
  vaultPin: "1234",
  pin: "1234",
  vaultAvatarUrl: "/templates/birthday-surprise/images/1.jpg",
  vaultSecretText: "You unlocked the vault! You deserve all the happiness in the universe! 🎉",

  // Hug overlay
  hugTitle: "Sending You A Big Hug!",
  hugMessage: "Warmest hugs across the miles! ❤️",
  hugGifUrl: "/templates/birthday-surprise/gifs/hug.gif",

  // Background gradient colors
  bgGradientFrom: "#3d0000",
  bgGradientMid: "#1a0000",
  bgGradientTo: "#000000",

  audioSrc: "",

  _page_title: "Happy Birthday — Ultimate Surprise",
  _page_seoTitle: "Happy Birthday — Ultimate Surprise",
  _page_seoDesc: "An interactive birthday surprise experience.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
