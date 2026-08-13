import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { l as series$1 } from "./registry-BOtXfR_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Confetti-CGpUvMtJ.js
var import_jsx_runtime = require_jsx_runtime();
var pieces = series$1(211, 70, (r) => ({
	x: (r() - .5) * 700,
	y: -120 - r() * 420,
	rot: r() * 720 - 360,
	size: 6 + r() * 10,
	delay: r() * .35,
	round: r() > .5,
	hue: Math.floor(r() * 3)
}));
var COLORS = [
	"oklch(0.7 0.24 350)",
	"oklch(0.87 0.12 88)",
	"oklch(0.55 0.24 300)"
];
function Confetti({ active }) {
	if (!active) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden",
		children: pieces.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute neon-outline",
			style: {
				width: p.size,
				height: p.round ? p.size : p.size * .5,
				borderRadius: p.round ? "9999px" : "2px",
				background: COLORS[p.hue]
			},
			initial: {
				x: 0,
				y: 0,
				opacity: 0,
				scale: .4
			},
			animate: {
				x: p.x,
				y: [
					0,
					p.y,
					p.y + 620
				],
				opacity: [
					0,
					1,
					0
				],
				rotate: p.rot,
				scale: 1
			},
			transition: {
				duration: 2.6,
				delay: p.delay,
				ease: "easeOut"
			}
		}, i))
	});
}
//#endregion
export { Confetti as t };
