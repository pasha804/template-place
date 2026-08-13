import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { z as RotateCcw } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TheEnd-D9SL8_DP.js
var import_jsx_runtime = require_jsx_runtime();
function TheEnd({ onRestart, title, message, replayButtonText, partnerName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "The End",
		subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"But not really…",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"This is just the beginning of our forever."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onRestart,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" }),
			children: replayButtonText || "Back to Start"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
					viewBox: "0 0 240 120",
					className: "h-32 w-64 neon-outline sm:h-40 sm:w-80",
					initial: {
						opacity: 0,
						scale: .8
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { duration: 1.2 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
						d: "M60 60c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34zm60 0c0-22 14-34 30-34s30 12 30 34-14 34-30 34-30-12-30-34z",
						fill: "none",
						stroke: "oklch(0.72 0.25 348)",
						strokeWidth: "5",
						strokeLinecap: "round",
						initial: { pathLength: 0 },
						animate: { pathLength: 1 },
						transition: {
							duration: 3,
							ease: "easeInOut"
						}
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 -z-10 blur-3xl",
					style: { background: "oklch(0.7 0.24 350 / 20%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 18
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						delay: 1.4,
						duration: 1.2
					},
					className: "script mt-6 text-3xl leading-snug text-glow sm:text-4xl text-center",
					style: { color: "var(--primary)" },
					children: message ? message : `Happy Anniversary,\n${partnerName ? partnerName : "My Love"} ♡`
				})
			]
		})
	});
}
//#endregion
export { TheEnd };
