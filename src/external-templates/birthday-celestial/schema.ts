import type { SectionDef, TemplateConfig } from "@/engine/types";

export const schema: SectionDef[] = [
  {
    key: "hero",
    label: "Hero & Welcome Screen",
    icon: "✨",
    fields: [
      {
        key: "recipientName",
        label: "Birthday Person Name",
        kind: "text",
        placeholder: "Jana",
      },
      {
        key: "heroDate",
        label: "Special Date / Time",
        kind: "text",
        placeholder: "12th August, 2026 - Wednesday 3:00 AM",
      },
      {
        key: "heroTagline",
        label: "Hero Photo Tagline",
        kind: "text",
        placeholder: "for my special one",
      },
      {
        key: "heroDescription",
        label: "Welcome Subtitle",
        kind: "textarea",
        rows: 3,
        placeholder:
          "You mean the universe to me. A special journey through our memories, love, and every reason you make every day magical, my Jana.",
      },
      {
        key: "heroImage",
        label: "Hero Galaxy Image",
        kind: "image",
      },
    ],
  },
  {
    key: "ageSection",
    label: "Age Celebration",
    icon: "🎂",
    fields: [
      {
        key: "age",
        label: "Age (Years Old)",
        kind: "number",
      },
      {
        key: "ageNickname",
        label: "Sweet Nickname",
        kind: "text",
        placeholder: "Jana",
      },
      {
        key: "ageSpecialMessage",
        label: "Birthday Age Greeting",
        kind: "textarea",
        rows: 3,
        placeholder:
          "Happy Birthday to the most special person in my life! Wishing you endless happiness, love, and many many happy returns of the day! 💖",
      },
    ],
  },
  {
    key: "quizSection",
    label: "Love Quiz",
    icon: "❓",
    fields: [
      {
        key: "quizTitle",
        label: "Quiz Title",
        kind: "text",
        placeholder: "How Well Do You Know Me?",
      },
      {
        key: "quizSubtitle",
        label: "Quiz Subtitle",
        kind: "text",
        placeholder:
          "Answer these questions about us — Let's see how well you know my heart ❤️",
      },
    ],
  },
  {
    key: "cakeSection",
    label: "Candle & Cake Wish",
    icon: "🕯️",
    fields: [
      {
        key: "cakeHeadingUnlit",
        label: "Pre-Blow Heading",
        kind: "text",
        placeholder: "Make a Wish",
      },
      {
        key: "cakeHeadingLit",
        label: "Post-Blow Message",
        kind: "text",
        placeholder: "Your wish is on its way ✧",
      },
      {
        key: "cakeMessage",
        label: "Cake Caption",
        kind: "text",
        placeholder: "Happy Birthday",
      },
    ],
  },
  {
    key: "songSection",
    label: "Our Song & Music Player",
    icon: "🎵",
    fields: [
      {
        key: "songTitle",
        label: "Song Title",
        kind: "text",
        placeholder: "Our Song",
      },
      {
        key: "songSubtitle",
        label: "Song Subtitle",
        kind: "text",
        placeholder: "Walks like every moment with you",
      },
      {
        key: "songDescription",
        label: "Song Dedication Note",
        kind: "textarea",
        rows: 3,
        placeholder:
          "This song reminds me of every beautiful moment we've shared together. Every beat, every note, every word... it's all about us. 💕",
      },
    ],
  },
  {
    key: "letterSection",
    label: "Love Letter & Envelope",
    icon: "💌",
    fields: [
      {
        key: "letterTitle",
        label: "Letter Title",
        kind: "text",
        placeholder: "A Special Message",
      },
      {
        key: "letterBody",
        label: "Love Letter Content",
        kind: "textarea",
        rows: 8,
      },
    ],
  },
  {
    key: "surpriseGiftSection",
    label: "Surprise Gift Box",
    icon: "🎁",
    fields: [
      {
        key: "giftTitle",
        label: "Gift Heading",
        kind: "text",
        placeholder: "A Little Surprise",
      },
      {
        key: "giftRevealedTitle",
        label: "Revealed Title",
        kind: "text",
        placeholder: "Forever, yours",
      },
      {
        key: "giftDescription",
        label: "Gift Message",
        kind: "textarea",
        rows: 3,
        placeholder:
          "No box could ever hold what I wish for you — so take this whole galaxy instead. Happy Birthday!",
      },
    ],
  },
  {
    key: "finaleSection",
    label: "Forever & Finale",
    icon: "💖",
    fields: [
      {
        key: "theEndTitle",
        label: "Ending Title",
        kind: "text",
        placeholder: "The End",
      },
      {
        key: "theEndSubtitle",
        label: "Ending Subtitle",
        kind: "text",
        placeholder: "But not really...",
      },
      {
        key: "theEndParagraph1",
        label: "Ending Line 1",
        kind: "textarea",
        rows: 2,
        placeholder: "This is just the beginning of all your adventures, my love.",
      },
      {
        key: "theEndParagraph2",
        label: "Ending Line 2",
        kind: "textarea",
        rows: 3,
        placeholder:
          "Every page of your story is filled with magic, and I'm so grateful to be a part of it. Here's to another year of memories, laughter, love, and all the beautiful moments ahead! 💖",
      },
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
      { key: "_page_slug", label: "Custom URL slug", kind: "text", placeholder: "birthday-celestial" },
      { key: "_page_isPublic", label: "Public page", kind: "boolean" },
      { key: "_page_expiresAt", label: "Expiration date", kind: "date" },
    ],
  },
];

export const defaults: TemplateConfig = {
  recipientName: "Jana",
  heroDate: "12th August, 2026 - Wednesday 3:00 AM",
  heroTagline: "for my special one",
  heroDescription:
    "You mean the universe to me. A special journey through our memories, love, and every reason you make every day magical, my Jana.",
  heroImage: "/templates/birthday-celestial/images/couple-galaxy.webp",

  age: 25,
  ageNickname: "Jana",
  ageSpecialMessage:
    "Happy Birthday to the most special person in my life! Wishing you endless happiness, love, and many many happy returns of the day! 💖",

  quizTitle: "How Well Do You Know Me?",
  quizSubtitle:
    "Answer these questions about us — Let's see how well you know my heart ❤️",

  cakeHeadingUnlit: "Make a Wish",
  cakeHeadingLit: "Your wish is on its way ✧",
  cakeMessage: "Happy Birthday",

  songTitle: "Our Song",
  songSubtitle: "Walks like every moment with you",
  songDescription:
    "This song reminds me of every beautiful moment we've shared together. Every beat, every note, every word... it's all about us. 💕",

  letterTitle: "A Special Message",
  letterBody: `Happy Birthday, Jana, my love.

Today is all about you — and you deserve every bit of happiness in this world.

Thank you for being my world, my Jana, and for making every moment so beautiful. Your smile lights up my darkest days, your kindness touches my soul, and everything about you is my absolute favorite.

You are my forever person, the one I want to make memories with for the rest of my life. Every laugh, every moment, every memory - they're all treasures I hold close to my heart.

I wish I could give you the entire universe, but for now, let me give you this little galaxy filled with all my love.

Happy Birthday, with all my heart and soul.

Forever yours,
Your love ♡`,

  giftTitle: "A Little Surprise",
  giftRevealedTitle: "Forever, yours",
  giftDescription:
    "No box could ever hold what I wish for you — so take this whole galaxy instead. Happy Birthday!",

  theEndTitle: "The End",
  theEndSubtitle: "But not really...",
  theEndParagraph1: "This is just the beginning of all your adventures, my love.",
  theEndParagraph2:
    "Every page of your story is filled with magic, and I'm so grateful to be a part of it. Here's to another year of memories, laughter, love, and all the beautiful moments ahead! 💖",

  _page_title: "Happy Birthday — Celestial Love Story",
  _page_seoTitle: "Happy Birthday — Celestial Love Story",
  _page_seoDesc: "A 15-chapter cinematic birthday celebration.",
  _page_slug: "",
  _page_isPublic: false,
  _page_expiresAt: "",
};
