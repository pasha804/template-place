import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Memories-BLFlNZQ5.js
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_TILTS = [
	-5,
	4,
	-3,
	5,
	-4,
	3
];
function Lights() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute -top-4 left-0 right-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 400 40",
			className: "h-10 w-full",
			preserveAspectRatio: "none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0 6 Q100 34 200 12 T400 8",
				fill: "none",
				stroke: "oklch(0.8 0.1 88 / 0.5)",
				strokeWidth: "1"
			})
		}), [
			8,
			22,
			36,
			50,
			64,
			78,
			92
		].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute h-2.5 w-2.5 rounded-full neon-outline",
			style: {
				left: `${x}%`,
				top: 14 + i % 3 * 6,
				background: "var(--gold)"
			},
			animate: { opacity: [
				.4,
				1,
				.4
			] },
			transition: {
				duration: 2 + i % 4 * .6,
				repeat: Infinity,
				ease: "easeInOut"
			}
		}, x))]
	});
}
function Memories({ onNext, photos, title, subtitle }) {
	const srcs = photos && photos.length > 0 ? photos : [
		"/templates/anniversary-galaxy/memory-1.webp",
		"/templates/anniversary-galaxy/memory-2.webp",
		"/templates/anniversary-galaxy/memory-3.webp",
		"/templates/anniversary-galaxy/memory-4.webp",
		"/templates/anniversary-galaxy/memory-5.webp",
		"/templates/anniversary-galaxy/memory-6.webp"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Memories",
		subtitle: subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Some of my favorite memories with you.",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"I'll treasure them forever."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-lg pt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-3",
				children: srcs.slice(0, 6).map((src, i) => {
					const tilt = DEFAULT_TILTS[i] ?? 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
						initial: {
							opacity: 0,
							y: -40,
							rotate: tilt * 2
						},
						animate: {
							opacity: 1,
							y: 0,
							rotate: tilt
						},
						transition: {
							delay: .2 + i * .12,
							duration: 1,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						whileHover: {
							scale: 1.08,
							rotate: 0,
							zIndex: 10
						},
						className: "relative origin-top rounded-sm p-1.5 pb-5",
						style: {
							background: "var(--paper)",
							boxShadow: "var(--shadow-glow-soft)",
							transformOrigin: "top center"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							className: "absolute -top-3 left-1/2 h-4 w-1.5 -translate-x-1/2 rounded-sm",
							style: { background: "oklch(0.87 0.12 88 / 80%)" },
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							animate: { rotate: [
								tilt - 1.5,
								tilt + 1.5,
								tilt - 1.5
							] },
							transition: {
								duration: 5 + i * .4,
								repeat: Infinity,
								ease: "easeInOut"
							},
							className: "overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: `Memory ${i + 1}`,
								width: 512,
								height: 640,
								loading: "lazy",
								className: "h-32 w-full object-cover sm:h-36"
							})
						})]
					}, src + i);
				})
			})]
		})
	});
}
//#endregion
export { Memories };
