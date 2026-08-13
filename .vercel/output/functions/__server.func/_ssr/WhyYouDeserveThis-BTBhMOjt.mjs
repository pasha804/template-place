import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { j as Shield, pt as Lightbulb, v as Target, zt as Crown } from "../_libs/lucide-react.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WhyYouDeserveThis-BTBhMOjt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_CARDS = [
	{
		title: "Your Resilience",
		icon: "Shield",
		front: "You kept going when stopping would have been easier.",
		back: "Every setback became a lesson instead of an ending. That stubborn refusal to quit is the rarest quality there is."
	},
	{
		title: "Your Dedication",
		icon: "Target",
		front: "You gave this everything, long before anyone noticed.",
		back: "Discipline in the dark is what makes success look effortless in the light. You did the unglamorous work, and it built something permanent.",
		featured: true
	},
	{
		title: "Your Vision",
		icon: "Lightbulb",
		front: "You saw this moment before it existed.",
		back: "You imagined a version of your life that hadn't happened yet — and then walked toward it until it became real. That's vision."
	}
];
var ICON_MAP = {
	Shield,
	Target,
	Lightbulb,
	Crown
};
function WhyYouDeserveThis({ onNext, cards }) {
	const [flipped, setFlipped] = (0, import_react.useState)(null);
	const items = cards && cards.length > 0 ? cards : DEFAULT_CARDS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "Why You Deserve This",
		subtitle: "Tap a card to read the whole truth.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 items-center gap-7 md:grid-cols-3",
			children: items.map((card, i) => {
				const Icon = ICON_MAP[card.icon] ?? Shield;
				const isFlipped = flipped === i;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 30
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: .2 + i * .15,
						duration: .6
					},
					className: card.featured ? "md:-my-6" : "",
					style: { perspective: "1000px" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setFlipped(isFlipped ? null : i),
						"aria-label": `Flip the card about ${card.title}`,
						className: "relative w-full cursor-pointer text-left",
						style: {
							height: card.featured ? "320px" : "288px",
							transformStyle: "preserve-3d",
							transition: "transform 0.7s",
							transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ct-glass ct-hover-lift absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl p-7 text-center",
							style: { backfaceVisibility: "hidden" },
							children: [
								card.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
									className: "ct-animate-glow h-7 w-7",
									style: { color: "var(--ct-primary)" },
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-14 w-14 items-center justify-center rounded-2xl",
									style: {
										backgroundImage: "var(--ct-gradient-gold)",
										boxShadow: "var(--ct-shadow-gold)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-6 w-6",
										style: { color: "var(--ct-primary-fg)" },
										"aria-hidden": true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "ct-font-script text-2xl",
									style: { color: "var(--ct-accent)" },
									children: card.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "ct-font-serif text-base",
									style: { color: "var(--ct-muted-fg)" },
									children: card.front
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ct-font-sans text-[0.6rem] tracking-[0.25em] uppercase",
									style: { color: "var(--ct-primary)" },
									children: "Tap to flip"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ct-glass-deep absolute inset-0 flex items-center justify-center rounded-3xl p-7 text-center",
							style: {
								backfaceVisibility: "hidden",
								transform: "rotateY(180deg)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "ct-font-serif text-lg leading-relaxed",
								style: { color: "var(--ct-foreground)" },
								children: card.back
							})
						})]
					})
				}, card.title);
			})
		})
	});
}
//#endregion
export { WhyYouDeserveThis };
