import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { a as between, c as series, t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Memories-BhqKA9gU.js
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_PHOTOS = [
	{
		src: "/templates/congratulations-triumph/memory-1.jpg",
		caption: "Late nights, lamp still on"
	},
	{
		src: "/templates/congratulations-triumph/memory-2.jpg",
		caption: "The people who believed"
	},
	{
		src: "/templates/congratulations-triumph/memory-3.jpg",
		caption: "Fuelled by coffee"
	},
	{
		src: "/templates/congratulations-triumph/memory-4.jpg",
		caption: "Proof, in your hands"
	},
	{
		src: "/templates/congratulations-triumph/memory-5.jpg",
		caption: "Sunrise after the storm"
	},
	{
		src: "/templates/congratulations-triumph/memory-6.jpg",
		caption: "The final moment"
	}
];
function Memories({ onNext, photos }) {
	const items = photos && photos.length > 0 ? photos : DEFAULT_PHOTOS;
	const tilts = series(6060, items.length, (r) => ({
		rotate: between(r, -9, 9),
		delay: between(r, 0, .6)
	}));
	const lights = series(8080, 22, (r) => ({ delay: between(r, 0, 2.5) }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneShell, {
		title: "Memories of the Grind",
		subtitle: "The moments that quietly built this victory.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "mb-10 flex items-center justify-between px-2",
			children: lights.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ct-animate-twinkle h-2 w-2 rounded-full",
				style: {
					background: "var(--ct-primary)",
					boxShadow: "var(--ct-shadow-gold)",
					animationDelay: `${l.delay}s`,
					transform: `translateY(${i % 2 === 0 ? 0 : 8}px)`
				}
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3",
			children: items.map((photo, i) => {
				const t = tilts[i] ?? {
					rotate: 0,
					delay: 0
				};
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.figure, {
					initial: {
						opacity: 0,
						y: -80,
						rotate: t.rotate * 2.2
					},
					animate: {
						opacity: 1,
						y: 0,
						rotate: t.rotate
					},
					transition: {
						delay: .2 + t.delay,
						type: "spring",
						stiffness: 90,
						damping: 12
					},
					whileHover: {
						scale: 1.08,
						rotate: 0,
						zIndex: 10
					},
					className: "relative rounded-sm p-3 pb-10 shadow-2xl",
					style: { background: "var(--ct-parchment)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-4deg] opacity-80",
							style: { backgroundImage: "var(--ct-gradient-gold)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photo.src,
							alt: photo.caption,
							width: 768,
							height: 768,
							loading: "lazy",
							decoding: "async",
							className: "aspect-square w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "ct-font-script absolute right-0 bottom-3 left-0 px-3 text-sm",
							style: { color: "var(--ct-ink)" },
							children: photo.caption
						})
					]
				}, i);
			})
		})]
	});
}
//#endregion
export { Memories };
