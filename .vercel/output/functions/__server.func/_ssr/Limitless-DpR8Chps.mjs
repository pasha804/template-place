import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Limitless-DpR8Chps.js
var import_jsx_runtime = require_jsx_runtime();
function Limitless({ onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "Limitless Potential",
		subtitle: "What you just proved to yourself changes everything that comes next.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ct-animate-glow relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				viewBox: "0 0 200 200",
				className: "absolute inset-0 h-full w-full ct-neon-gold",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
					d: "M100 12 L124 74 L190 78 L138 118 L156 182 L100 146 L44 182 L62 118 L10 78 L76 74 Z",
					fill: "none",
					stroke: "var(--ct-primary)",
					strokeWidth: "2",
					strokeLinejoin: "round",
					initial: {
						pathLength: 0,
						opacity: 0
					},
					animate: {
						pathLength: 1,
						opacity: 1
					},
					transition: {
						duration: 2.2,
						ease: "easeInOut"
					}
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: 2,
					duration: 1
				},
				className: "ct-font-script relative z-10 max-w-52 text-xl leading-snug sm:max-w-56 sm:text-2xl",
				style: { color: "var(--ct-accent)" },
				children: "The sky is not the limit. Your potential is limitless."
			})]
		})
	});
}
//#endregion
export { Limitless };
