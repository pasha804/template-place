import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { ct as Mail } from "../_libs/lucide-react.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SpecialMessage-cJyu4g6k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_MSG = "What you built to get here — the discipline, the patience, the belief — you get to keep forever. Everything after this is you, compounding.";
function SpecialMessage({ onNext, message }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const text = message || DEFAULT_MSG;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "Special Message",
		subtitle: open ? "Keep this one." : "There's a letter waiting for you.",
		footer: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-80 max-w-xl flex-col items-center [perspective:1000px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				type: "button",
				onClick: () => setOpen(true),
				"aria-label": "Open the special message",
				animate: open ? {
					rotateX: -22,
					y: 40,
					scale: .92
				} : {
					rotateX: 0,
					y: 0,
					scale: 1
				},
				whileHover: open ? {} : { scale: 1.04 },
				transition: {
					type: "spring",
					stiffness: 140,
					damping: 16
				},
				className: "relative z-10 flex h-52 w-full max-w-sm cursor-pointer items-center justify-center rounded-2xl",
				style: {
					backgroundImage: "var(--ct-gradient-gold)",
					boxShadow: "var(--ct-shadow-gold)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ct-glass-deep flex h-[85%] w-[92%] items-center justify-center rounded-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
						className: "h-10 w-10",
						style: { color: "var(--ct-primary)" },
						"aria-hidden": true
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 0,
					scale: .85
				},
				animate: {
					opacity: 1,
					y: -150,
					scale: 1
				},
				transition: {
					delay: .15,
					duration: .8,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "ct-glass absolute top-0 z-20 w-full max-w-md rounded-3xl p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ct-font-script text-2xl leading-relaxed sm:text-3xl",
					style: { color: "var(--ct-accent)" },
					children: "“This is just the beginning of your legacy.”"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ct-font-serif mt-4 text-base",
					style: { color: "var(--ct-muted-fg)" },
					children: text
				})]
			}) : null })]
		})
	});
}
//#endregion
export { SpecialMessage };
