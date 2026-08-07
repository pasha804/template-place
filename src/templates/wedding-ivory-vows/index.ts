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
      eyebrow: "You are invited",
      title: "Two names, one date",
      subtitle: "We would like you there when we say it out loud.",
      align: "center",
    }),
    createBlockInstance("countdown", {
      heading: "Until the ceremony",
      targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 120).toISOString().slice(0, 10),
      direction: "down",
    }),
    createBlockInstance("timeline", {
      heading: "The day",
      items: [
        "3:00 pm|Ceremony — the part with the nerves.",
        "5:00 pm|Dinner — the part with the speeches.",
        "8:00 pm|Dancing — the part with the regrets.",
      ],
    }),
    createBlockInstance("gallery", { heading: "Us, lately", images: [], layout: "carousel" }),
    createBlockInstance("letter", {
      heading: "A note to everyone coming",
      body: "Thank you for the years of being around for the smaller days.\nThis one is bigger because you're in it.",
      signature: "— With love, the two of us",
    }),
    createBlockInstance("cta", { title: "Let us know you're coming", buttonLabel: "RSVP", buttonUrl: "" }),
  ],
});
