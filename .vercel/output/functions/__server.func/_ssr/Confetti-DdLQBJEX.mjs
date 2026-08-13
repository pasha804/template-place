import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { c as series } from "./registry-BOtXfR_2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Confetti-DdLQBJEX.js
var import_jsx_runtime = require_jsx_runtime();
function Confetti({ seed = 9931 }) {
	const pieces = series(seed, 90, (r) => ({
		x: (r() - .5) * 800,
		y: -80 - r() * 500,
		rot: r() * 720 - 360,
		size: 5 + r() * 10,
		delay: r() * .5,
		round: r() > .5,
		col: Math.floor(r() * 3)
	}));
	const COLORS = [
		"var(--ct-primary)",
		"var(--ct-accent)",
		"oklch(0.98 0.02 90)"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden",
		children: pieces.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			className: "absolute ct-neon-gold",
			style: {
				width: p.size,
				height: p.round ? p.size : p.size * .45,
				borderRadius: p.round ? "9999px" : "2px",
				background: COLORS[p.col]
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
					p.y + 700
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
				duration: 3,
				delay: p.delay,
				ease: "easeOut"
			}
		}, i))
	});
}
//#endregion
export { Confetti as t };
