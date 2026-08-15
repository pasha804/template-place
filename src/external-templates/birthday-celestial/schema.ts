import type { ExternalTemplateSchema } from "@/engine/types";

export const birthdayCelestialSchema: ExternalTemplateSchema = {
  sections: [
    {
      id: "hero",
      label: "Hero & Welcome",
      fields: [
        {
          key: "recipientName",
          label: "Birthday Person Name",
          type: "text",
          defaultValue: "Sumaira",
        },
        {
          key: "heroDate",
          label: "Special Date / Time",
          type: "text",
          defaultValue: "12th August, 2026 - Wednesday 3:00 AM",
        },
        {
          key: "heroTagline",
          label: "Hero Photo Tagline",
          type: "text",
          defaultValue: "for my special one",
        },
        {
          key: "heroDescription",
          label: "Welcome Subtitle",
          type: "textarea",
          defaultValue:
            "You mean the universe to me. A special journey through our memories, love, and every reason you make every day magical, my KuchuPuchu.",
        },
        {
          key: "heroImage",
          label: "Hero Galaxy Image",
          type: "image",
          defaultValue: "/templates/birthday-celestial/images/couple-galaxy.webp",
        },
      ],
    },
    {
      id: "ageSection",
      label: "Age Celebration",
      fields: [
        {
          key: "age",
          label: "Age (Years Old)",
          type: "number",
          defaultValue: 25,
        },
        {
          key: "ageNickname",
          label: "Sweet Nickname",
          type: "text",
          defaultValue: "ifsaaayyyy",
        },
        {
          key: "ageSpecialMessage",
          label: "Birthday Age Greeting",
          type: "textarea",
          defaultValue:
            "Mri yadi Happy Birthday Happy many Return off the day Kale ki bht zda Happy Birthday Day yadi ka 😭💕",
        },
      ],
    },
    {
      id: "quizSection",
      label: "Love Quiz",
      fields: [
        {
          key: "quizTitle",
          label: "Quiz Title",
          type: "text",
          defaultValue: "How Well Do You Know Me?",
        },
        {
          key: "quizSubtitle",
          label: "Quiz Subtitle",
          type: "text",
          defaultValue:
            "Answer these questions about us — Let's see how well you know my heart ❤️",
        },
      ],
    },
    {
      id: "cakeSection",
      label: "Candle & Cake Wish",
      fields: [
        {
          key: "cakeHeadingUnlit",
          label: "Pre-Blow Heading",
          type: "text",
          defaultValue: "Make a Wish",
        },
        {
          key: "cakeHeadingLit",
          label: "Post-Blow Message",
          type: "text",
          defaultValue: "Your wish is on its way ✧",
        },
        {
          key: "cakeMessage",
          label: "Cake Caption",
          type: "text",
          defaultValue: "Happy Birthday",
        },
      ],
    },
    {
      id: "songSection",
      label: "Our Song & Music Player",
      fields: [
        {
          key: "songTitle",
          label: "Song Title",
          type: "text",
          defaultValue: "Our Song",
        },
        {
          key: "songSubtitle",
          label: "Song Subtitle",
          type: "text",
          defaultValue: "Walks like every moment with you",
        },
        {
          key: "songDescription",
          label: "Song Dedication Note",
          type: "textarea",
          defaultValue:
            "This song reminds me of every beautiful moment we've shared together. Every beat, every note, every word... it's all about us. 💕",
        },
      ],
    },
    {
      id: "letterSection",
      label: "Love Letter & Envelope",
      fields: [
        {
          key: "letterTitle",
          label: "Letter Title",
          type: "text",
          defaultValue: "A Special Message",
        },
        {
          key: "letterBody",
          label: "Love Letter Content",
          type: "textarea",
          defaultValue: `Happy Birthday, Sumaira, my love.

Today is all about you — and you deserve every bit of happiness in this world.

Thank you for being my world, my KuchuPuchu, and for making every moment so beautiful. Your smile lights up my darkest days, your kindness touches my soul, and everything about you is my absolute favorite.

You are my forever person, the one I want to make memories with for the rest of my life. Every laugh, every moment, every "Lairyain" - they're all treasures I hold close to my heart.

I wish I could give you the entire universe, but for now, let me give you this little galaxy filled with all my love.

Happy Birthday, with all my heart and soul.

Forever yours,
Your love ♡`,
        },
      ],
    },
    {
      id: "surpriseGiftSection",
      label: "Surprise Gift Box",
      fields: [
        {
          key: "giftTitle",
          label: "Gift Heading",
          type: "text",
          defaultValue: "A Little Surprise",
        },
        {
          key: "giftRevealedTitle",
          label: "Revealed Title",
          type: "text",
          defaultValue: "Forever, yours",
        },
        {
          key: "giftDescription",
          label: "Gift Message",
          type: "textarea",
          defaultValue:
            "No box could ever hold what I wish for you — so take this whole galaxy instead. Happy Birthday!",
        },
      ],
    },
    {
      id: "finaleSection",
      label: "Forever & Finale",
      fields: [
        {
          key: "theEndTitle",
          label: "Ending Title",
          type: "text",
          defaultValue: "The End",
        },
        {
          key: "theEndSubtitle",
          label: "Ending Subtitle",
          type: "text",
          defaultValue: "But not really...",
        },
        {
          key: "theEndParagraph1",
          label: "Ending Line 1",
          type: "textarea",
          defaultValue: "This is just the beginning of all your adventures, my love.",
        },
        {
          key: "theEndParagraph2",
          label: "Ending Line 2",
          type: "textarea",
          defaultValue:
            "Every page of your story is filled with magic, and I'm so grateful to be a part of it. Here's to another year of memories, laughter, love, and all the beautiful moments ahead! 💖",
        },
      ],
    },
  ],
};

export const birthdayCelestialDefaults = {
  recipientName: "Sumaira",
  heroDate: "12th August, 2026 - Wednesday 3:00 AM",
  heroTagline: "for my special one",
  heroDescription:
    "You mean the universe to me. A special journey through our memories, love, and every reason you make every day magical, my KuchuPuchu.",
  heroImage: "/templates/birthday-celestial/images/couple-galaxy.webp",

  age: 25,
  ageNickname: "ifsaaayyyy",
  ageSpecialMessage:
    "Mri yadi Happy Birthday Happy many Return off the day Kale ki bht zda Happy Birthday Day yadi ka 😭💕",

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
  letterBody: `Happy Birthday, Sumaira, my love.

Today is all about you — and you deserve every bit of happiness in this world.

Thank you for being my world, my KuchuPuchu, and for making every moment so beautiful. Your smile lights up my darkest days, your kindness touches my soul, and everything about you is my absolute favorite.

You are my forever person, the one I want to make memories with for the rest of my life. Every laugh, every moment, every "Lairyain" - they're all treasures I hold close to my heart.

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
};
