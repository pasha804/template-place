import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { l as series$1, n as GlowButton$1, r as Heart$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Forever-Cvq6zt_y.js
var import_jsx_runtime = require_jsx_runtime();
var floaters = series$1(409, 12, (r) => ({
	x: r() * 100,
	y: r() * 100,
	size: 10 + r() * 18,
	dur: 6 + r() * 6,
	delay: r() * 4
}));
function Forever({ onNext, title, text, partnerName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Forever Yours",
		subtitle: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Just a little something for",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"my forever person."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex h-64 w-full max-w-sm items-center justify-center sm:h-72",
			children: [floaters.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute neon-outline",
				style: {
					left: `${f.x}%`,
					top: `${f.y}%`,
					width: f.size,
					color: "oklch(0.7 0.24 350 / 50%)"
				},
				animate: {
					y: [
						0,
						-26,
						0
					],
					opacity: [
						.3,
						.85,
						.3
					],
					scale: [
						.9,
						1.1,
						.9
					]
				},
				transition: {
					duration: f.dur,
					delay: f.delay,
					repeat: Infinity,
					ease: "easeInOut"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart$1, { className: "h-full w-full" })
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					scale: .6,
					opacity: 0
				},
				animate: {
					scale: 1,
					opacity: 1
				},
				transition: {
					duration: 1.2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative animate-heartbeat",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 200 180",
						className: "h-56 w-56 neon-outline sm:h-64 sm:w-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
							d: "M100 165C100 165 20 118 20 66C20 38 42 20 66 20C82 20 93 29 100 40C107 29 118 20 134 20C158 20 180 38 180 66C180 118 100 165 100 165Z",
							fill: "none",
							stroke: "oklch(0.72 0.25 348)",
							strokeWidth: "5",
							strokeLinecap: "round",
							initial: { pathLength: 0 },
							animate: { pathLength: 1 },
							transition: {
								duration: 2.2,
								ease: "easeInOut"
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 -z-10 rounded-full blur-3xl",
						style: { background: "oklch(0.7 0.24 350 / 25%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "script absolute inset-0 flex items-center justify-center px-12 text-center text-2xl leading-tight text-glow sm:text-3xl",
						style: { color: "var(--primary)" },
						children: text || "I love you forever"
					})
				]
			})]
		})
	});
}
//#endregion
export { Forever };
