import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { At as Feather, nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { l as series$1, n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LoveLetter-4zO8DRV1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useTypewriter(text, speed = 28, startDelay = 500) {
	const [out, setOut] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setOut("");
		let i = 0;
		let timer;
		const start = setTimeout(() => {
			timer = setInterval(() => {
				i += 1;
				setOut(text.slice(0, i));
				if (i >= text.length) clearInterval(timer);
			}, speed);
		}, startDelay);
		return () => {
			clearTimeout(start);
			clearInterval(timer);
		};
	}, [
		text,
		speed,
		startDelay
	]);
	return {
		out,
		done: out.length >= text.length
	};
}
var DEFAULT_LETTER = `Happy Anniversary, my love.

You're not just a part of my life, you are my life.

Thank you for coming into my world and making it so beautiful. Your smile, your kindness, your soul — everything about you is my favorite.

I wish I could give you the world, but for now, let me give you this little galaxy.

I love you more than words can ever say.

Forever yours ♡`;
var petals = series$1(311, 10, (r) => ({
	x: r() * 100,
	y: r() * 100,
	size: 16 + r() * 22,
	dur: 7 + r() * 6,
	delay: r() * 4
}));
function LoveLetter({ onNext, letterText, title, subtitle }) {
	const { out } = useTypewriter(letterText || DEFAULT_LETTER, 14, 450);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "A Little Letter",
		subtitle: subtitle || void 0,
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-md",
			children: [petals.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				className: "absolute -z-0 neon-outline",
				style: {
					left: `${p.x}%`,
					top: `${p.y}%`,
					fontSize: p.size,
					color: "oklch(0.7 0.24 350 / 60%)"
				},
				animate: {
					y: [
						0,
						-14,
						0
					],
					rotate: [
						-12,
						12,
						-12
					],
					opacity: [
						.4,
						.9,
						.4
					]
				},
				transition: {
					duration: p.dur,
					delay: p.delay,
					repeat: Infinity,
					ease: "easeInOut"
				},
				children: "❀"
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					rotateX: 24,
					y: 40
				},
				animate: {
					opacity: 1,
					rotateX: 0,
					y: 0
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
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					animate: {
						y: [
							0,
							-8,
							0
						],
						rotate: [
							-.7,
							.7,
							-.7
						]
					},
					transition: {
						duration: 8,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "relative overflow-hidden rounded-md px-6 py-7 text-left",
					style: {
						background: "linear-gradient(160deg,oklch(0.92 0.045 88),oklch(0.84 0.06 78))",
						boxShadow: "0 0 50px oklch(0.87 0.12 88 / 28%), var(--shadow-glow-soft)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0",
						style: { background: "repeating-linear-gradient(180deg,transparent,transparent 25px,oklch(0.4 0.06 300/0.07) 26px)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "script relative min-h-[15rem] whitespace-pre-line leading-[1.7]",
						style: {
							fontSize: "1.05rem",
							color: "oklch(0.33 0.09 300)"
						},
						children: [out, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							animate: { opacity: [1, 0] },
							transition: {
								duration: .7,
								repeat: Infinity
							},
							className: "ml-0.5 inline-block h-4 w-[2px] align-middle rounded-full",
							style: { background: "oklch(0.33 0.09 300)" }
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					animate: {
						rotate: [
							-8,
							4,
							-8
						],
						y: [
							0,
							-6,
							0
						]
					},
					transition: {
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "absolute -bottom-4 -right-3 neon-outline",
					style: { color: "var(--gold)" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, { className: "h-10 w-10" })
				})]
			})]
		})
	});
}
//#endregion
export { LoveLetter };
