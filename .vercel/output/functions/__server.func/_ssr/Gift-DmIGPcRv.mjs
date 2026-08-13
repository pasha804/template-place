import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight, wt as Gift$1 } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
import { t as Confetti } from "./Confetti-CGpUvMtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Gift-DmIGPcRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_GIFT_MSG = "No box could ever hold what I feel for you — so take this whole galaxy instead.";
function Gift({ onNext, giftMessage, title, subtitle }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const text = giftMessage || DEFAULT_GIFT_MSG;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "A Little Surprise",
		subtitle: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "script text-2xl text-glow",
			style: { color: "var(--primary)" },
			children: "Surprise — it's my heart ♡"
		}) : subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Tap the gift box to",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"open your surprise."
		] }),
		footerSlot: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: () => setOpen(true),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gift$1, { className: "h-4 w-4" }),
			children: "Open Gift"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex w-full max-w-sm flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, { active: open }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					type: "button",
					onClick: () => setOpen(true),
					animate: {
						y: [
							0,
							-12,
							0
						],
						rotate: [
							-1.5,
							1.5,
							-1.5
						]
					},
					transition: {
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					whileHover: { scale: 1.05 },
					whileTap: { scale: .95 },
					className: "relative w-52 neon-outline",
					"aria-label": "Open the surprise gift",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						src: "/templates/anniversary-galaxy/gift.webp",
						alt: "Galaxy gift box",
						width: 1024,
						height: 1024,
						loading: "lazy",
						animate: open ? {
							scale: .9,
							rotate: -4
						} : {},
						transition: { duration: .6 },
						className: "w-full"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						initial: {
							scale: .2,
							opacity: .9
						},
						animate: {
							scale: 3,
							opacity: 0
						},
						transition: {
							duration: 1.4,
							ease: "easeOut"
						},
						className: "absolute inset-0 rounded-full blur-2xl",
						style: { background: "oklch(0.7 0.24 350 / 40%)" }
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30,
						scale: .9
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					transition: {
						duration: .9,
						delay: .35,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "glass mt-6 w-full rounded-3xl px-6 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "script text-3xl text-glow",
						style: { color: "var(--primary)" },
						children: "Forever, yours"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-serif text-sm leading-relaxed",
						style: { color: "var(--muted-foreground)" },
						children: text
					})]
				}) })
			]
		})
	});
}
//#endregion
export { Gift };
