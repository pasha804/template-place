import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "welcome",
    label: "Welcome Screen",
    icon: "🌌",
    fields: [
      { key: "welcomeBadge", label: "Badge text", kind: "text", placeholder: "A little galaxy just for you" },
      { key: "partnerName", label: "Partner's name", kind: "text", placeholder: "My Love" },
      { key: "couplePhotoUrl", label: "Couple photo", kind: "image", help: "Shown on Welcome and Song screens" },
      { key: "welcomeDescription", label: "Welcome text", kind: "textarea", rows: 3 },
      { key: "welcomeButtonText", label: "Button text", kind: "text", placeholder: "Start Our Journey" },
    ],
  },
  {
    key: "journey",
    label: "Our Journey Screen",
    icon: "🛤️",
    fields: [
      { key: "journeyTitle", label: "Section title", kind: "text", placeholder: "Our Journey" },
      { key: "journeySubtitle", label: "Section subtitle", kind: "text", placeholder: "Every step with you has been my favorite." },
      { key: "milestones", label: "Milestones", kind: "list-cards", help: "Title and text for each milestone." },
    ],
  },
  {
    key: "memories",
    label: "Memories Gallery Screen",
    icon: "📸",
    fields: [
      { key: "memoriesTitle", label: "Section title", kind: "text", placeholder: "Memories We Made" },
      { key: "memoriesSubtitle", label: "Section subtitle", kind: "text", placeholder: "Snapshots of moments frozen in time." },
      { key: "memoryPhotos", label: "Polaroid photos", kind: "list-image", help: "Photos shown in memory grid" },
    ],
  },
  {
    key: "whySpecial",
    label: "Why You're Special Screen",
    icon: "💖",
    fields: [
      { key: "whySpecialTitle", label: "Section title", kind: "text", placeholder: "Why You're Special" },
      { key: "whySpecialSubtitle", label: "Section subtitle", kind: "text", placeholder: "Things that make you the most special person in my life." },
      { key: "whyCards", label: "Flip Cards", kind: "list-cards", help: "Title, Front text, and Back text" },
    ],
  },
  {
    key: "loveLetter",
    label: "Love Letter Screen",
    icon: "💌",
    fields: [
      { key: "letterTitle", label: "Section title", kind: "text", placeholder: "My Heart To Yours" },
      { key: "letterSubtitle", label: "Section subtitle", kind: "text", placeholder: "A letter for you" },
      { key: "letterText", label: "Typewriter letter text", kind: "textarea", rows: 8 },
    ],
  },
  {
    key: "wish",
    label: "Make a Wish Screen",
    icon: "✨",
    fields: [
      { key: "wishTitle", label: "Section title", kind: "text", placeholder: "Make a Wish" },
      { key: "wishSubtitle", label: "Section subtitle", kind: "text", placeholder: "Blow the cosmic candle together" },
      { key: "anniversaryDate", label: "Anniversary date", kind: "date" },
    ],
  },
  {
    key: "specialMessage",
    label: "Special Envelope Screen",
    icon: "✉️",
    fields: [
      { key: "specialTitle", label: "Section title", kind: "text", placeholder: "Special Message" },
      { key: "specialMessage", label: "Message inside envelope", kind: "textarea", rows: 4 },
    ],
  },
  {
    key: "gift",
    label: "Gift Reveal Screen",
    icon: "🎁",
    fields: [
      { key: "giftTitle", label: "Section title", kind: "text", placeholder: "A Gift For You" },
      { key: "giftMessage", label: "Gift reveal message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "song",
    label: "Our Song Screen",
    icon: "🎵",
    fields: [
      { key: "songSectionTitle", label: "Section title", kind: "text", placeholder: "Our Song" },
      { key: "songTitle", label: "Song title", kind: "text", placeholder: "Perfect" },
      { key: "songArtist", label: "Artist", kind: "text", placeholder: "Ed Sheeran" },
      { key: "audioSrc", label: "Music audio URL", kind: "text", placeholder: "/audio/song.mp3" },
    ],
  },
  {
    key: "forever",
    label: "Forever Screen",
    icon: "♾️",
    fields: [
      { key: "foreverTitle", label: "Section title", kind: "text", placeholder: "To Infinity & Beyond" },
      { key: "foreverText", label: "Forever message", kind: "textarea", rows: 3 },
    ],
  },
  {
    key: "theEnd",
    label: "Final Screen",
    icon: "🌟",
    fields: [
      { key: "theEndTitle", label: "Final heading", kind: "text", placeholder: "Our Galaxy Awaits" },
      { key: "theEndMessage", label: "Final message", kind: "textarea", rows: 3 },
      { key: "replayButtonText", label: "Replay button text", kind: "text", placeholder: "Replay Journey ✦" },
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
  welcomeBadge: "A little galaxy just for you",
  partnerName: "My Love",
  couplePhotoUrl: "/templates/anniversary-galaxy/couple-galaxy.webp",
  welcomeDescription: "You mean the universe to me. Eleven little chapters of us — our journey, our memories, and every reason I'd choose you again.",
  welcomeButtonText: "Start Our Journey",

  journeyTitle: "Our Journey",
  journeySubtitle: "Every step with you has been my favorite.",
  milestones: [
    { title: "First Hello", text: "The moment we met." },
    { title: "First Talk", text: "The beginning of everything." },
    { title: "First Date", text: "The day we became something special." },
    { title: "Today", text: "Our beautiful journey continues…" },
  ],

  memoriesTitle: "Memories We Made",
  memoriesSubtitle: "Snapshots of moments frozen in time.",
  memoryPhotos: [
    "/templates/anniversary-galaxy/memory-1.webp",
    "/templates/anniversary-galaxy/memory-2.webp",
    "/templates/anniversary-galaxy/memory-3.webp",
    "/templates/anniversary-galaxy/memory-4.webp",
    "/templates/anniversary-galaxy/memory-5.webp",
    "/templates/anniversary-galaxy/memory-6.webp",
  ],

  whySpecialTitle: "Why You're Special",
  whySpecialSubtitle: "Things that make you the most special person in my life.",
  whyCards: [
    { title: "Your Heart", front: "So pure, so kind.", back: "You love without conditions and it changed me." },
    { title: "Your Smile", front: "It lights up my whole world.", back: "One smile from you and every bad day disappears." },
    { title: "You", front: "Simply amazing.", back: "There is no one, anywhere, quite like you." },
  ],

  letterTitle: "My Heart To Yours",
  letterSubtitle: "A letter for you",
  letterText:
    "Happy Anniversary, my love.\n\nYou're not just a part of my life, you are my life.\n\nThank you for coming into my world and making it so beautiful. Your smile, your kindness, your soul — everything about you is my favorite.\n\nI wish I could give you the world, but for now, let me give you this little galaxy.\n\nI love you more than words can ever say.\n\nForever yours ♡",

  wishTitle: "Make a Wish",
  wishSubtitle: "Blow the cosmic candle together",
  anniversaryDate: "2024-09-11",

  specialTitle: "Special Message",
  specialMessage:
    "Thank you for every laugh, every quiet night, and every ordinary day you make feel like magic. I'd choose you again, in every galaxy.",

  giftTitle: "A Gift For You",
  giftMessage:
    "No box could ever hold what I feel for you — so take this whole galaxy instead.",

  songSectionTitle: "Our Song",
  songTitle: "Perfect",
  songArtist: "Ed Sheeran",
  audioSrc: "",

  foreverTitle: "To Infinity & Beyond",
  foreverText: "I will love you through every universe, every life, and every galaxy.",

  theEndTitle: "Our Galaxy Awaits",
  theEndMessage: "Happy Anniversary, my forever love.",
  replayButtonText: "Replay Journey ✦",

  _page_title: "Happy Anniversary — A Little Galaxy Just For You",
  _page_seoTitle: "Happy Anniversary — A Little Galaxy Just For You",
  _page_seoDesc: "An interactive cinematic anniversary love story made just for you.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
