import { defineExternalTemplate } from "@/engine/types";
import { SorryTeddyRenderer } from "./Renderer";
import { schema, defaults } from "./schema";

export default defineExternalTemplate({
  manifest: {
    id:           "e5f6a7b8-c9d0-1234-efab-567890123456",
    slug:         "sorry-teddy",
    name:         "Sorry Teddy",
    tagline:      "A 6-page teddy bear apology with diary, letter, hug & gift",
    description:
      "A warm, heartfelt apology site featuring a starry night background and adorable teddy bear GIFs. " +
      "6 pages: Opening, Diary page, Apology, Love Letter, Hug, and Gift reveal. " +
      "Optional background music player included.",
    category:     "sorry",
    tags:         ["sorry","apology","teddy","bear","cute","diary","letter","hug","gift","starry"],
    priceCents:   999,
    isPremium:    false,
    coverGradient: "linear-gradient(135deg,#111827 0%,#1f2937 50%,#374151 100%)",
    accentEmoji:  "🐻",
    features: [
      "6-page journey: Opening → Diary → Apology → Letter → Hug → Gift",
      "Starry animated background",
      "Adorable teddy bear GIFs",
      "Optional background music player",
      "Smooth page transitions",
    ],
    thumbnailUrl: "/templates/sorry-teddy/gifs/sad-teddy.gif",
    author: "@pasha_dev_",
    previewImages: ["/templates/sorry-teddy/gifs/sad-teddy.gif", "/templates/sorry-teddy/gifs/teddy-hug.gif", "/templates/sorry-teddy/gifs/teddy-giving-flower.gif"],
  },
  schema, defaults, Renderer: SorryTeddyRenderer,
});
