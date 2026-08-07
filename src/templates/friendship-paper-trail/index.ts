import { createBlockInstance } from "@/blocks/types";
import { defineTemplate } from "@/templates/contract";

import { animations } from "./animations";
import { manifest } from "./manifest";
import { Renderer } from "./renderer";
import { theme } from "./theme";

export default defineTemplate({
  manifest,
  theme,
  animations,
  Renderer,
  blocks: [
    createBlockInstance("hero", {
      eyebrow: "For you",
      title: "Thanks for staying",
      subtitle: "Friendship rarely gets a page. This one does.",
      align: "left",
    }),
    createBlockInstance("letter", {
      heading: "The part I never say",
      body: "You've seen me at my least impressive and never brought it up.\nThat is a rare thing and I notice it.",
      signature: "— Always",
    }),
    createBlockInstance("gallery", { heading: "Exhibits A through Z", images: [], layout: "grid" }),
    createBlockInstance("timeline", {
      heading: "The years",
      items: [
        "Then|We had no idea what we were doing.",
        "Later|We still didn't, but together.",
        "Now|Somehow it worked out.",
      ],
    }),
    createBlockInstance("cta", { title: "Your turn", buttonLabel: "Say something", buttonUrl: "" }),
  ],
});
