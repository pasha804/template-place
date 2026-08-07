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
    createBlockInstance("confetti", { trigger: "load", intensity: 200 }),
    createBlockInstance("hero", {
      eyebrow: "Happy birthday",
      title: "Another year of you",
      subtitle: "The world got a little better the day you showed up in it.",
      align: "center",
    }),
    createBlockInstance("countdown", {
      heading: "Years, days and seconds of you",
      targetDate: "2000-01-01",
      direction: "up",
    }),
    createBlockInstance("gallery", { heading: "Some favourite frames", images: [], layout: "grid" }),
    createBlockInstance("letter", {
      heading: "Something I wanted to say properly",
      body: "Every year I try to find a better way to say this and every year I land on the same thing.\nI'm glad you exist. Happy birthday.",
      signature: "— With love",
    }),
    createBlockInstance("cta", { title: "Go on then, open the cake", buttonLabel: "Reply", buttonUrl: "" }),
  ],
});
