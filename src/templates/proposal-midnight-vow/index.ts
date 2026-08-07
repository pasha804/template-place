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
    createBlockInstance("hearts", { symbol: "✦", count: 22, speed: 16 }),
    createBlockInstance("hero", {
      eyebrow: "There is something I need to ask",
      title: "Before I ask, let me explain",
      subtitle: "Take your time. This page waited a long while to exist.",
      align: "center",
    }),
    createBlockInstance("typewriter", {
      lines: [
        "I rehearsed this a hundred times.",
        "None of them sounded right.",
        "So I built you a page instead.",
      ],
      speedMs: 60,
    }),
    createBlockInstance("timeline", {
      heading: "How we got here",
      items: [
        "The beginning|A conversation that ran longer than it should have.",
        "The middle|Every ordinary week that somehow wasn't ordinary.",
        "Tonight|The part where I stop being subtle.",
      ],
    }),
    createBlockInstance("letter", {
      heading: "So, here it is",
      body: "I want the mornings, the arguments about nothing, the long drives and the quiet ones.\nI want all of it, with you.",
      signature: "— Will you marry me?",
    }),
    createBlockInstance("cta", { title: "Say it out loud", buttonLabel: "Yes", buttonUrl: "" }),
  ],
});
