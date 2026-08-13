import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1, r as Heart$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Journey--zir1yha.js
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_MILESTONES = [
	{
		title: "First Hello",
		text: "The moment we met."
	},
	{
		title: "First Talk",
		text: "The beginning of everything."
	},
	{
		title: "First Date",
		text: "The day we became something special."
	},
	{
		title: "Today",
		text: "Our beautiful journey continues…"
	}
];
function Journey({ onNext, milestones, title, subtitle }) {
	const items = milestones && milestones.length > 0 ? milestones : DEFAULT_MILESTONES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Our Journey",
		subtitle: subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Every love story is beautiful,",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"but ours is my favorite."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-md pl-12 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "100%",
					opacity: 1
				},
				transition: {
					duration: 2,
					delay: .5,
					ease: "easeInOut"
				},
				className: "absolute left-[1.35rem] top-2 w-[2px] rounded-full neon-outline",
				style: { backgroundImage: "linear-gradient(to bottom, var(--primary), var(--accent), oklch(0.7 0.24 350 / 10%))" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-8",
				children: items.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
					initial: {
						opacity: 0,
						x: 28,
						filter: "blur(8px)"
					},
					animate: {
						opacity: 1,
						x: 0,
						filter: "blur(0px)"
					},
					transition: {
						delay: .7 + i * .35,
						duration: .9,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "absolute -left-12 top-0 w-8 neon-outline",
							style: { color: "var(--primary)" },
							animate: { scale: [
								1,
								1.14,
								1
							] },
							transition: {
								duration: 2.2,
								repeat: Infinity,
								delay: i * .3
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart$1, { className: "h-full w-full" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-serif text-lg tracking-wide text-glow-soft",
							style: { color: "var(--primary)" },
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-sm",
							style: { color: "var(--muted-foreground)" },
							children: m.text
						})
					]
				}, m.title))
			})]
		})
	});
}
//#endregion
export { Journey };
