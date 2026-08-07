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
    createBlockInstance("particles", { density: 90, twinkle: true }),
    createBlockInstance("hero", {
      eyebrow: "Happy Valentine's",
      title: "Obnoxiously in love with you",
      subtitle: "No subtlety was harmed in the making of this page.",
      align: "center",
    }),
    createBlockInstance("typewriter", {
      lines: ["You. Specifically you.", "Every single time."],
      speedMs: 55,
    }),
    createBlockInstance("floating-cards", {
      heading: "Evidence",
      items: [
        "You steal my hoodies and I let you.",
        "You send memes at 2am and I'm awake for them.",
        "You are the only person I text back immediately.",
      ],
    }),
    createBlockInstance("gif", { url: "", caption: "This, but forever.", size: "md" }),
    createBlockInstance("confetti", { trigger: "click", buttonLabel: "Press me", intensity: 220 }),
  ],
});
