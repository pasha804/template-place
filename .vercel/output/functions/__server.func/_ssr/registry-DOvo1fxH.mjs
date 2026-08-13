import { r as __exportAll } from "./client-Dc1BRJHd.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { i as resolveBlockProps, n as createBlockInstance, r as getBlockDefinition } from "./registry-BHB5YlGA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/registry-DOvo1fxH.js
var import_jsx_runtime = require_jsx_runtime();
function defineTemplate(plugin) {
	return plugin;
}
var animations$5 = {
	entrance: "rise",
	ambient: "aurora"
};
var manifest$5 = {
	id: "anniversary-slow-burn",
	slug: "slow-burn-anniversary",
	name: "Slow Burn",
	tagline: "Every day counted, none of them wasted",
	description: "An anniversary page built around a live counter of your time together, a masonry wall of photos, and the reasons list you never quite said out loud. This is the pin to unlock this 1234",
	category: "anniversary",
	tags: [
		"anniversary",
		"counter",
		"masonry",
		"reasons"
	],
	priceCents: 150,
	isPremium: false,
	coverGradient: "linear-gradient(135deg,#7a2c3d 0%,#c9526b 50%,#e9a06b 100%)",
	accentEmoji: "🕯️",
	features: [
		"Live day counter",
		"Masonry gallery",
		"Reasons grid",
		"Background music"
	],
	defaultPin: "1234",
	pinProtected: true
};
var entranceVariants = {
	fade: {
		hidden: { opacity: 0 },
		show: { opacity: 1 }
	},
	rise: {
		hidden: {
			opacity: 0,
			y: 26
		},
		show: {
			opacity: 1,
			y: 0
		}
	},
	zoom: {
		hidden: {
			opacity: 0,
			scale: .97
		},
		show: {
			opacity: 1,
			scale: 1
		}
	}
};
/**
* Shared page shell every template renderer composes with. It owns the theme
* variables, ambient background, and the block iteration loop so individual
* templates only decide composition and styling.
*/
function TemplateSurface({ blocks, theme, mode, entrance = "rise", ambient = "aurora" }) {
	const variants = entranceVariants[entrance];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "template-runtime relative min-h-full w-full overflow-hidden",
		style: {
			background: theme.background,
			color: theme.foreground,
			fontFamily: theme.bodyFont
		},
		children: [ambient !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ambient === "aurora" ? "animate-aurora" : "animate-float-slow",
				style: {
					position: "absolute",
					inset: "-20%",
					background: `radial-gradient(45% 40% at 20% 15%, ${theme.primary}30 0%, transparent 65%), radial-gradient(45% 40% at 80% 70%, ${theme.accent}28 0%, transparent 65%)`
				}
			})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			children: blocks.map((instance) => {
				const def = getBlockDefinition(instance.type);
				const props = resolveBlockProps(instance);
				if (!def || !props) return null;
				const Block = def.Component;
				if (def.group === "effects" && def.type !== "confetti" && def.type !== "gif") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none fixed inset-0 z-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						props,
						theme,
						mode
					})
				}, instance.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					className: "relative z-10",
					initial: "hidden",
					whileInView: "show",
					viewport: {
						once: true,
						margin: "-60px"
					},
					variants,
					transition: {
						duration: .65,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						props,
						theme,
						mode
					})
				}, instance.id);
			})
		})]
	});
}
function Renderer$5(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations$5.entrance,
		ambient: animations$5.ambient
	});
}
var theme$5 = {
	primary: "#e08a6b",
	accent: "#c9526b",
	background: "#160f11",
	surface: "#211618",
	foreground: "#fbf1ec",
	muted: "#c2a89f",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "16px"
};
var anniversary_slow_burn_exports = /* @__PURE__ */ __exportAll({ default: () => anniversary_slow_burn_default });
var anniversary_slow_burn_default = defineTemplate({
	manifest: manifest$5,
	theme: theme$5,
	animations: animations$5,
	Renderer: Renderer$5,
	blocks: [
		createBlockInstance("hero", {
			eyebrow: "Happy anniversary",
			title: "Still the best decision I made",
			subtitle: "A page for the years, and for the very ordinary days inside them.",
			align: "center"
		}),
		createBlockInstance("countdown", {
			heading: "Together for",
			targetDate: "2020-01-01",
			direction: "up"
		}),
		createBlockInstance("gallery", {
			heading: "The archive",
			images: [],
			layout: "masonry"
		}),
		createBlockInstance("floating-cards", {
			heading: "Reasons, in no order",
			items: [
				"You remember the small things I mention once.",
				"You make silence comfortable.",
				"You have never once made me feel like too much."
			]
		}),
		createBlockInstance("music", {
			title: "Our song",
			artist: "",
			trackUrl: "",
			autoplay: false
		}),
		createBlockInstance("letter", {
			heading: "For the record",
			body: "If I had to do it again I would, faster.",
			signature: "— Yours"
		})
	]
});
var animations$4 = {
	entrance: "rise",
	ambient: "aurora"
};
var manifest$4 = {
	id: "birthday-golden-hour",
	slug: "golden-hour-birthday",
	name: "Golden Hour Birthday",
	tagline: "Confetti, countdown and a warm gold glow",
	description: "A birthday page that opens with confetti, counts the years, and holds a gallery plus a written note. Built for someone who deserves more than a text message. This is the pin to unlock this 1234",
	category: "birthday",
	tags: [
		"birthday",
		"confetti",
		"countdown",
		"gallery"
	],
	priceCents: 300,
	isPremium: true,
	coverGradient: "linear-gradient(135deg,#f5b24a 0%,#ef6f5b 55%,#8d4bd8 100%)",
	accentEmoji: "🎂",
	features: [
		"Confetti on open",
		"Age countdown",
		"Photo gallery",
		"Personal letter"
	],
	defaultPin: "1234",
	pinProtected: true
};
function Renderer$4(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations$4.entrance,
		ambient: animations$4.ambient
	});
}
var theme$4 = {
	primary: "#f5b24a",
	accent: "#ef6f5b",
	background: "#14100c",
	surface: "#1e1811",
	foreground: "#fdf6ec",
	muted: "#c4b49c",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "20px"
};
var birthday_golden_hour_exports = /* @__PURE__ */ __exportAll({ default: () => birthday_golden_hour_default });
var birthday_golden_hour_default = defineTemplate({
	manifest: manifest$4,
	theme: theme$4,
	animations: animations$4,
	Renderer: Renderer$4,
	blocks: [
		createBlockInstance("confetti", {
			trigger: "load",
			intensity: 200
		}),
		createBlockInstance("hero", {
			eyebrow: "Happy birthday",
			title: "Another year of you",
			subtitle: "The world got a little better the day you showed up in it.",
			align: "center"
		}),
		createBlockInstance("countdown", {
			heading: "Years, days and seconds of you",
			targetDate: "2000-01-01",
			direction: "up"
		}),
		createBlockInstance("gallery", {
			heading: "Some favourite frames",
			images: [],
			layout: "grid"
		}),
		createBlockInstance("letter", {
			heading: "Something I wanted to say properly",
			body: "Every year I try to find a better way to say this and every year I land on the same thing.\nI'm glad you exist. Happy birthday.",
			signature: "— With love"
		}),
		createBlockInstance("cta", {
			title: "Go on then, open the cake",
			buttonLabel: "Reply",
			buttonUrl: ""
		})
	]
});
var animations$3 = {
	entrance: "rise",
	ambient: "none"
};
var manifest$3 = {
	id: "friendship-paper-trail",
	slug: "paper-trail-friendship",
	name: "Paper Trail",
	tagline: "For the friend who has seen every version of you",
	description: "A warm, print-inspired page for friendship, gratitude or an apology: a written note, a grid of shared moments and a timeline of the years. This is the pin to unlock this 1234",
	category: "friendship",
	tags: [
		"friendship",
		"gratitude",
		"timeline",
		"minimal"
	],
	priceCents: 0,
	isPremium: false,
	coverGradient: "linear-gradient(135deg,#f6efe4 0%,#d7c4a3 50%,#6b8f71 100%)",
	accentEmoji: "🧡",
	features: [
		"Written note",
		"Moments grid",
		"Years timeline",
		"Free to publish"
	],
	defaultPin: "1234",
	pinProtected: true
};
function Renderer$3(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations$3.entrance,
		ambient: animations$3.ambient
	});
}
var theme$3 = {
	primary: "#c08b4a",
	accent: "#6b8f71",
	background: "#f8f4ec",
	surface: "#ffffff",
	foreground: "#26221c",
	muted: "#6b6257",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "12px"
};
var friendship_paper_trail_exports = /* @__PURE__ */ __exportAll({ default: () => friendship_paper_trail_default });
var friendship_paper_trail_default = defineTemplate({
	manifest: manifest$3,
	theme: theme$3,
	animations: animations$3,
	Renderer: Renderer$3,
	blocks: [
		createBlockInstance("hero", {
			eyebrow: "For you",
			title: "Thanks for staying",
			subtitle: "Friendship rarely gets a page. This one does.",
			align: "left"
		}),
		createBlockInstance("letter", {
			heading: "The part I never say",
			body: "You've seen me at my least impressive and never brought it up.\nThat is a rare thing and I notice it.",
			signature: "— Always"
		}),
		createBlockInstance("gallery", {
			heading: "Exhibits A through Z",
			images: [],
			layout: "grid"
		}),
		createBlockInstance("timeline", {
			heading: "The years",
			items: [
				"Then|We had no idea what we were doing.",
				"Later|We still didn't, but together.",
				"Now|Somehow it worked out."
			]
		}),
		createBlockInstance("cta", {
			title: "Your turn",
			buttonLabel: "Say something",
			buttonUrl: ""
		})
	]
});
var animations$2 = {
	entrance: "fade",
	ambient: "drift"
};
var manifest$2 = {
	id: "proposal-midnight-vow",
	slug: "midnight-vow-proposal",
	name: "Midnight Vow",
	tagline: "A slow reveal that ends in one question",
	description: "A proposal page paced like a short film: a quiet opening, a typed confession, the story so far, and then the question — with a button that sends the answer straight to you. This is the pin to unlock this 1234",
	category: "proposal",
	tags: [
		"proposal",
		"typewriter",
		"timeline",
		"romantic"
	],
	priceCents: 300,
	isPremium: true,
	coverGradient: "linear-gradient(135deg,#1b1f3b 0%,#5b3f8f 50%,#d96a9a 100%)",
	accentEmoji: "💍",
	features: [
		"Typed confession",
		"Story timeline",
		"Floating hearts",
		"Answer button"
	],
	defaultPin: "1234",
	pinProtected: true
};
function Renderer$2(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations$2.entrance,
		ambient: animations$2.ambient
	});
}
var theme$2 = {
	primary: "#d96a9a",
	accent: "#8f7bd8",
	background: "#0d0f1e",
	surface: "#161a30",
	foreground: "#f3f1fb",
	muted: "#a9a5c4",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "22px"
};
var proposal_midnight_vow_exports = /* @__PURE__ */ __exportAll({ default: () => proposal_midnight_vow_default });
var proposal_midnight_vow_default = defineTemplate({
	manifest: manifest$2,
	theme: theme$2,
	animations: animations$2,
	Renderer: Renderer$2,
	blocks: [
		createBlockInstance("hearts", {
			symbol: "✦",
			count: 22,
			speed: 16
		}),
		createBlockInstance("hero", {
			eyebrow: "There is something I need to ask",
			title: "Before I ask, let me explain",
			subtitle: "Take your time. This page waited a long while to exist.",
			align: "center"
		}),
		createBlockInstance("typewriter", {
			lines: [
				"I rehearsed this a hundred times.",
				"None of them sounded right.",
				"So I built you a page instead."
			],
			speedMs: 60
		}),
		createBlockInstance("timeline", {
			heading: "How we got here",
			items: [
				"The beginning|A conversation that ran longer than it should have.",
				"The middle|Every ordinary week that somehow wasn't ordinary.",
				"Tonight|The part where I stop being subtle."
			]
		}),
		createBlockInstance("letter", {
			heading: "So, here it is",
			body: "I want the mornings, the arguments about nothing, the long drives and the quiet ones.\nI want all of it, with you.",
			signature: "— Will you marry me?"
		}),
		createBlockInstance("cta", {
			title: "Say it out loud",
			buttonLabel: "Yes",
			buttonUrl: ""
		})
	]
});
var animations$1 = {
	entrance: "zoom",
	ambient: "drift"
};
var manifest$1 = {
	id: "valentine-neon-pulse",
	slug: "neon-pulse-valentine",
	name: "Neon Pulse",
	tagline: "Loud, bright and completely unsubtle",
	description: "A Valentine's page with a starfield, a neon headline, a reasons grid and a GIF slot — for people whose love language is being obvious about it. This is the pin to unlock this 1234",
	category: "valentine",
	tags: [
		"valentine",
		"neon",
		"particles",
		"gif"
	],
	priceCents: 150,
	isPremium: false,
	coverGradient: "linear-gradient(135deg,#12002e 0%,#7b1fa2 45%,#ff2e88 100%)",
	accentEmoji: "💗",
	features: [
		"Starfield background",
		"Neon headline",
		"Reasons grid",
		"GIF slot"
	],
	defaultPin: "1234",
	pinProtected: true
};
function Renderer$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations$1.entrance,
		ambient: animations$1.ambient
	});
}
var theme$1 = {
	primary: "#ff2e88",
	accent: "#8b5cf6",
	background: "#0a0316",
	surface: "#150826",
	foreground: "#fdeaf6",
	muted: "#b79ec7",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "24px"
};
var valentine_neon_pulse_exports = /* @__PURE__ */ __exportAll({ default: () => valentine_neon_pulse_default });
var valentine_neon_pulse_default = defineTemplate({
	manifest: manifest$1,
	theme: theme$1,
	animations: animations$1,
	Renderer: Renderer$1,
	blocks: [
		createBlockInstance("particles", {
			density: 90,
			twinkle: true
		}),
		createBlockInstance("hero", {
			eyebrow: "Happy Valentine's",
			title: "Obnoxiously in love with you",
			subtitle: "No subtlety was harmed in the making of this page.",
			align: "center"
		}),
		createBlockInstance("typewriter", {
			lines: ["You. Specifically you.", "Every single time."],
			speedMs: 55
		}),
		createBlockInstance("floating-cards", {
			heading: "Evidence",
			items: [
				"You steal my hoodies and I let you.",
				"You send memes at 2am and I'm awake for them.",
				"You are the only person I text back immediately."
			]
		}),
		createBlockInstance("gif", {
			url: "",
			caption: "This, but forever.",
			size: "md"
		}),
		createBlockInstance("confetti", {
			trigger: "click",
			buttonLabel: "Press me",
			intensity: 220
		})
	]
});
var animations = {
	entrance: "fade",
	ambient: "none"
};
var manifest = {
	id: "wedding-ivory-vows",
	slug: "ivory-vows-wedding",
	name: "Ivory Vows",
	tagline: "An invitation that behaves like a keepsake",
	description: "A wedding page with the ceremony countdown, the story of the couple, a film-style gallery and a clear call to RSVP. Light, editorial, unhurried. This is the pin to unlock this 1234",
	category: "wedding",
	tags: [
		"wedding",
		"invitation",
		"rsvp",
		"elegant"
	],
	priceCents: 300,
	isPremium: true,
	coverGradient: "linear-gradient(135deg,#f3ece1 0%,#d8c3a5 55%,#8a7a63 100%)",
	accentEmoji: "🤍",
	features: [
		"Ceremony countdown",
		"Couple story",
		"Film gallery",
		"RSVP button"
	],
	defaultPin: "1234",
	pinProtected: true
};
function Renderer(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
		...props,
		entrance: animations.entrance,
		ambient: animations.ambient
	});
}
var theme = {
	primary: "#a4885f",
	accent: "#8a9a86",
	background: "#faf6ef",
	surface: "#ffffff",
	foreground: "#241f19",
	muted: "#6e6357",
	displayFont: "'Sora', sans-serif",
	bodyFont: "'Manrope', sans-serif",
	radius: "10px"
};
var wedding_ivory_vows_exports = /* @__PURE__ */ __exportAll({ default: () => wedding_ivory_vows_default });
var wedding_ivory_vows_default = defineTemplate({
	manifest,
	theme,
	animations,
	Renderer,
	blocks: [
		createBlockInstance("hero", {
			eyebrow: "You are invited",
			title: "Two names, one date",
			subtitle: "We would like you there when we say it out loud.",
			align: "center"
		}),
		createBlockInstance("countdown", {
			heading: "Until the ceremony",
			targetDate: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 120).toISOString().slice(0, 10),
			direction: "down"
		}),
		createBlockInstance("timeline", {
			heading: "The day",
			items: [
				"3:00 pm|Ceremony — the part with the nerves.",
				"5:00 pm|Dinner — the part with the speeches.",
				"8:00 pm|Dancing — the part with the regrets."
			]
		}),
		createBlockInstance("gallery", {
			heading: "Us, lately",
			images: [],
			layout: "carousel"
		}),
		createBlockInstance("letter", {
			heading: "A note to everyone coming",
			body: "Thank you for the years of being around for the smaller days.\nThis one is bigger because you're in it.",
			signature: "— With love, the two of us"
		}),
		createBlockInstance("cta", {
			title: "Let us know you're coming",
			buttonLabel: "RSVP",
			buttonUrl: ""
		})
	]
});
var plugins = Object.values(/* @__PURE__ */ Object.assign({
	"./anniversary-slow-burn/index.ts": anniversary_slow_burn_exports,
	"./birthday-golden-hour/index.ts": birthday_golden_hour_exports,
	"./friendship-paper-trail/index.ts": friendship_paper_trail_exports,
	"./proposal-midnight-vow/index.ts": proposal_midnight_vow_exports,
	"./valentine-neon-pulse/index.ts": valentine_neon_pulse_exports,
	"./wedding-ivory-vows/index.ts": wedding_ivory_vows_exports
})).map((m) => m.default).filter(Boolean).sort((a, b) => a.manifest.name.localeCompare(b.manifest.name));
var templateRegistry = new Map(plugins.map((p) => [p.manifest.id, p]));
var templateSlugIndex = new Map(plugins.map((p) => [p.manifest.slug, p]));
function getTemplate(id) {
	return templateRegistry.get(id);
}
function getTemplateBySlug(slug) {
	return templateSlugIndex.get(slug);
}
//#endregion
export { getTemplate as n, getTemplateBySlug as r, TemplateSurface as t };
