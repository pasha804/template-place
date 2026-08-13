import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { C as Sparkles, nn as ArrowRight, w as Smile, yt as Heart, zt as Crown } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WhySpecial-D8EXxcV1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var defaultCards = [
	{
		icon: Heart,
		title: "Your Heart",
		front: "So pure, so kind.",
		back: "You love without conditions and it changed me."
	},
	{
		icon: Smile,
		title: "Your Smile",
		front: "It lights up my whole world.",
		back: "One smile from you and every bad day disappears.",
		featured: true
	},
	{
		icon: Sparkles,
		title: "You",
		front: "Simply amazing.",
		back: "There is no one, anywhere, quite like you."
	}
];
function WhySpecial({ onNext, title, subtitle, cards }) {
	const [flipped, setFlipped] = (0, import_react.useState)(null);
	const cardList = cards && cards.length > 0 ? cards : defaultCards;
	const icons = [
		Heart,
		Smile,
		Sparkles
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Why You're Special",
		subtitle: subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Things that make you the most",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"special person in my life."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-wide",
			style: { color: "var(--muted-foreground)" },
			children: "Tap a card to see why you're special ✧"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		})] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex w-full max-w-2xl items-center justify-center gap-3 sm:gap-5",
			children: cardList.map((c, i) => {
				const Icon = c.icon || icons[i % icons.length];
				const open = flipped === i;
				const featured = c.featured || i === 1;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					type: "button",
					onClick: () => setFlipped(open ? null : i),
					initial: {
						opacity: 0,
						y: 36,
						rotateY: -30
					},
					animate: {
						opacity: 1,
						y: 0,
						rotateY: 0
					},
					transition: {
						delay: .2 + i * .18,
						duration: 1,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					whileHover: { y: -8 },
					className: `relative ${featured ? "h-52 w-36 sm:h-64 sm:w-48" : "h-40 w-24 sm:h-52 sm:w-36"} shrink-0`,
					style: { perspective: "1000px" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						animate: { rotateY: open ? 180 : 0 },
						transition: {
							duration: .8,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						style: {
							position: "relative",
							height: "100%",
							width: "100%",
							transformStyle: "preserve-3d"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `glass absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl p-3 ${featured ? "glow-ring" : ""}`,
							style: { backfaceVisibility: "hidden" },
							children: [
								featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
									className: "h-4 w-4",
									style: { color: "var(--gold)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "animate-glow-pulse",
									style: { color: "var(--primary)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: featured ? "h-9 w-9" : "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `script text-glow-soft ${featured ? "text-2xl" : "text-lg"}`,
									style: { color: "var(--primary)" },
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] leading-snug",
									style: { color: "var(--muted-foreground)" },
									children: c.front
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass-deep absolute inset-0 flex items-center justify-center rounded-3xl p-4",
							style: {
								backfaceVisibility: "hidden",
								transform: "rotateY(180deg)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-sm leading-relaxed",
								style: { color: "var(--foreground)" },
								children: c.back
							})
						})]
					})
				}, c.title || i);
			})
		})
	});
}
//#endregion
export { WhySpecial };
