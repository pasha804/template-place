import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "loader",
    label: "Opening Loader Screen",
    icon: "✨",
    fields: [
      { key: "loaderHeading", label: "Shimmer text", kind: "text", placeholder: "Preparing something magical..." },
    ],
  },
  {
    key: "intro",
    label: "Intro Screen",
    icon: "💌",
    fields: [
      { key: "partnerName", label: "Partner's name", kind: "text", placeholder: "Meri Jaan" },
      { key: "introHeading", label: "Intro heading", kind: "text", placeholder: "Happy Anniversary, Meri Jaan!" },
      { key: "introGifUrl", label: "Intro GIF URL", kind: "gif" },
      { key: "introSubtext", label: "Intro subtext", kind: "text", placeholder: "I created this secret space just for you, to celebrate our beautiful love..." },
      { key: "introButtonText", label: "Button text", kind: "text", placeholder: "Open My Heart ✨" },
    ],
  },
  {
    key: "anniversary",
    label: "Anniversary Counter Screen",
    icon: "💖",
    fields: [
      { key: "anniversaryTitle", label: "Screen title", kind: "text", placeholder: "Together Since" },
      { key: "anniversaryDate", label: "Anniversary / relationship start date", kind: "text", placeholder: "2024-09-11", help: "ISO date format (YYYY-MM-DD)" },
      { key: "anniversarySubtitle", label: "Screen subtitle", kind: "text", placeholder: "Every second with you is a blessing" },
    ],
  },
  {
    key: "reasons",
    label: "Reasons I Love You Screen",
    icon: "🌸",
    fields: [
      { key: "reasonsTitle", label: "Screen title", kind: "text", placeholder: "Reasons I Love You" },
      { key: "reasonsSubtitle", label: "Screen subtitle", kind: "text", placeholder: "Tap each card to reveal what my heart holds" },
      { key: "reasons", label: "Flip card reasons", kind: "list-cards", help: "Title, Front teaser, and Back full text" },
    ],
  },
  {
    key: "gallery",
    label: "Photo Gallery Screen",
    icon: "📸",
    fields: [
      { key: "galleryTitle", label: "Screen title", kind: "text", placeholder: "Our Beautiful Moments" },
      { key: "gallerySubtitle", label: "Screen subtitle", kind: "text", placeholder: "Swipe to relive our favourite memories together" },
      { key: "galleryPhotos", label: "Gallery photos", kind: "list-image", help: "Photos shown in the 3D coverflow gallery" },
    ],
  },
  {
    key: "promises",
    label: "Promises & Vows Screen",
    icon: "💍",
    fields: [
      { key: "promisesTitle", label: "Screen title", kind: "text", placeholder: "My Promises To You" },
      { key: "promisesSubtitle", label: "Screen subtitle", kind: "text", placeholder: "Forever engraved in my heart" },
      { key: "promises", label: "Vows & promises", kind: "list-cards", help: "Promise title and text" },
    ],
  },
  {
    key: "message",
    label: "Love Letter & Music Screen",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Screen title", kind: "text", placeholder: "My Dearest Love" },
      { key: "letterText", label: "Love letter (typewriter)", kind: "textarea", rows: 8 },
      { key: "signature", label: "Letter signature", kind: "text", placeholder: "Forever Yours ❤️" },
      { key: "audioSrc", label: "Background music URL", kind: "audio", help: "Upload an mp3 track URL" },
      { key: "replayButtonText", label: "Replay button text", kind: "text", placeholder: "Relive Our Journey 💖" },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "happy-anniversary" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  loaderHeading: "Preparing something magical...",
  partnerName: "Meri Jaan",
  introHeading: "Happy Anniversary, Meri Jaan!",
  introGifUrl: "/templates/anniversary-romantic/gifs/intro.gif",
  introSubtext: "I created this secret space just for you, to celebrate our beautiful love...",
  introButtonText: "Open My Heart ✨",

  anniversaryTitle: "Together Since",
  anniversaryDate: "2024-09-11",
  anniversarySubtitle: "Every second with you is a blessing",

  reasonsTitle: "Reasons I Love You",
  reasonsSubtitle: "Tap each card to reveal what my heart holds",
  reasons: [
    { emoji: "😊", title: "Your Smile", front: "It lights up my darkest days.", back: "Every time you smile, the whole world just feels right.", color: "#e11d48" },
    { emoji: "🌸", title: "Your Kindness", front: "You care about everyone around you.", back: "Your heart is the most beautiful thing about you.", color: "#d946ef" },
    { emoji: "💫", title: "Your Strength", front: "You face every challenge with grace.", back: "Watching you rise through every storm makes me fall deeper in love.", color: "#fbbf24" },
    { emoji: "✨", title: "Just Being You", front: "You are perfect exactly as you are.", back: "Every single thing about you makes you, YOU.", color: "#e11d48" },
  ],

  galleryTitle: "Our Beautiful Moments",
  gallerySubtitle: "Swipe to relive our favourite memories together",
  galleryPhotos: [
    "/templates/anniversary-romantic/images/1.jpg",
    "/templates/anniversary-romantic/images/2.jpg",
    "/templates/anniversary-romantic/images/3.jpg",
    "/templates/anniversary-romantic/images/4.jpg",
  ],

  promisesTitle: "My Promises To You",
  promisesSubtitle: "Forever engraved in my heart",
  promises: [
    { seal: "🕯️", text: "I promise to always listen, even when it's hard.", sub: "Through every storm, my ears and heart are yours." },
    { seal: "😄", text: "I promise to make you laugh every single day.", sub: "Life is better when it's full of your laughter." },
    { seal: "🤝", text: "I promise to always be your safe place.", sub: "No matter what the world throws at you, I've got you." },
    { seal: "💍", text: "I promise to choose you, over and over again.", sub: "Every single day, in every single moment." },
  ],

  letterTitle: "My Dearest Love",
  letterText: "My dearest love,\n\nEvery single day with you feels like a beautiful dream I never want to wake from. You have brought so much joy, warmth, and meaning into my life — more than words could ever capture.\n\nThank you for being my person, my safe place, my greatest adventure.\n\nForever yours ❤️",
  signature: "Forever Yours ❤️",
  audioSrc: "",
  replayButtonText: "Relive Our Journey 💖",

  _page_title: "Happy Anniversary 💑",
  _page_seoTitle: "Happy Anniversary 💑",
  _page_seoDesc: "A cinematic anniversary surprise — 7 emotional screens with gallery, flip cards, promises, and a love letter.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
