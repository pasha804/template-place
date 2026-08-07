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
      eyebrow: "Happy anniversary",
      title: "Still the best decision I made",
      subtitle: "A page for the years, and for the very ordinary days inside them.",
      align: "center",
    }),
    createBlockInstance("countdown", {
      heading: "Together for",
      targetDate: "2020-01-01",
      direction: "up",
    }),
    createBlockInstance("gallery", { heading: "The archive", images: [], layout: "masonry" }),
    createBlockInstance("floating-cards", {
      heading: "Reasons, in no order",
      items: [
        "You remember the small things I mention once.",
        "You make silence comfortable.",
        "You have never once made me feel like too much.",
      ],
    }),
    createBlockInstance("music", { title: "Our song", artist: "", trackUrl: "", autoplay: false }),
    createBlockInstance("letter", {
      heading: "For the record",
      body: "If I had to do it again I would, faster.",
      signature: "— Yours",
    }),
  ],
});
