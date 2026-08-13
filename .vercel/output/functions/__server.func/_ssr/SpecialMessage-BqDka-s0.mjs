import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SpecialMessage-BqDka-s0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_MESSAGE = "Thank you for every laugh, every quiet night, and every ordinary day you make feel like magic. I'd choose you again, in every galaxy.";
function SpecialMessage({ onNext, message, title, subtitle }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const text = message || DEFAULT_MESSAGE;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Special Message",
		subtitle: subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"A message from the heart,",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"just for you."
		] }),
		footerSlot: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: () => setOpen(true),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Open Message"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex w-full max-w-sm flex-col items-center",
			style: { perspective: "1200px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				type: "button",
				onClick: () => setOpen((o) => !o),
				animate: {
					y: open ? 10 : [
						0,
						-12,
						0
					],
					rotateX: open ? 18 : 0,
					scale: open ? .86 : 1
				},
				transition: {
					duration: open ? .9 : 6,
					repeat: open ? 0 : Infinity,
					ease: "easeInOut"
				},
				className: "relative w-56 neon-outline",
				"aria-label": "Open the love message",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/templates/anniversary-galaxy/envelope.webp",
					alt: "Glowing envelope",
					width: 1024,
					height: 1024,
					loading: "lazy",
					className: "w-full"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: -40,
					scale: .85
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: -30,
					scale: .9
				},
				transition: {
					duration: .9,
					delay: .25,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "glass-deep -mt-6 w-full rounded-3xl px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "script text-2xl leading-snug text-glow",
					style: { color: "var(--primary)" },
					children: [
						"Of all the things I have,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"you are my favorite."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-serif text-sm leading-relaxed",
					style: { color: "var(--muted-foreground)" },
					children: text
				})]
			}) })]
		})
	});
}
//#endregion
export { SpecialMessage };
