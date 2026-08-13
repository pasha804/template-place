import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { z as RotateCcw } from "../_libs/lucide-react.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TheEnd-PjE_gncl.js
var import_jsx_runtime = require_jsx_runtime();
function TheEnd({ name, onRestart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "Onward & Upward",
		subtitle: "This chapter is closed, but the best stories are yet to be written.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlowButton, {
			onClick: onRestart,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
				className: "h-4 w-4",
				"aria-hidden": true
			}), "Celebrate Again"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-xl flex-col items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 200 100",
				className: "ct-animate-glow h-40 w-72 ct-neon-gold",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
					d: "M60 50c0-16 -13-26 -26-26S8 34 8 50s13 26 26 26 26-10 40-26 26-26 40-26 26 10 26 26-13 26-26 26-26-10-40-26",
					fill: "none",
					stroke: "var(--ct-primary)",
					strokeWidth: "3",
					strokeLinecap: "round",
					initial: { pathLength: 0 },
					animate: { pathLength: 1 },
					transition: {
						duration: 3,
						ease: "easeInOut"
					}
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
				initial: {
					opacity: 0,
					y: 18
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: 1.8,
					duration: 1
				},
				className: "ct-gradient-text ct-font-script mt-6 text-3xl sm:text-4xl",
				children: [
					"Congratulations again, ",
					name,
					" ♡"
				]
			})]
		})
	});
}
//#endregion
export { TheEnd };
