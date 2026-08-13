import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { At as Feather } from "../_libs/lucide-react.mjs";
import { a as between, c as series, t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NoteOfPride-DJxVI-1F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useTypewriter(text, { speed = 28, delay = 500 } = {}) {
	const [out, setOut] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setOut("");
		let i = 0;
		let timer;
		const start = setTimeout(() => {
			timer = setInterval(() => {
				i++;
				setOut(text.slice(0, i));
				if (i >= text.length) clearInterval(timer);
			}, speed);
		}, delay);
		return () => {
			clearTimeout(start);
			clearInterval(timer);
		};
	}, [
		text,
		speed,
		delay
	]);
	return {
		text: out,
		done: out.length >= text.length
	};
}
var DEFAULT_NOTE = "Watching you achieve this has been nothing short of inspiring. Your hard work has finally paid off — and honestly, it paid off long before today, in the person you became while chasing it. I hope you pause, just for a moment, and let yourself feel proud. You've earned every bit of this.";
function NoteOfPride({ name, onNext, noteText }) {
	const { text, done } = useTypewriter(noteText || DEFAULT_NOTE, {
		speed: 14,
		delay: 700
	});
	const petals = series(4711, 16, (r) => ({
		left: between(r, 0, 100),
		top: between(r, 0, 100),
		size: between(r, 8, 18),
		delay: between(r, 0, 6),
		duration: between(r, 8, 16)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "A Note of Pride",
		subtitle: "Written slowly, and meant completely.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-2xl",
			style: { perspective: "1200px" },
			children: [petals.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "ct-animate-float pointer-events-none absolute rounded-full opacity-50",
				style: {
					left: `${p.left}%`,
					top: `${p.top}%`,
					width: p.size,
					height: p.size / 2,
					background: "var(--ct-primary)",
					animationDelay: `${p.delay}s`,
					animationDuration: `${p.duration}s`
				}
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					rotateX: -75,
					y: -40
				},
				animate: {
					opacity: 1,
					rotateX: 0,
					y: 0
				},
				transition: {
					duration: 1,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "ct-ruled-paper relative rounded-lg p-8 text-left shadow-2xl sm:p-12",
				style: {
					transformOrigin: "top center",
					color: "var(--ct-ink)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ct-font-script min-h-56 text-xl leading-[34px] sm:text-2xl sm:leading-[34px]",
						children: [text, !done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ct-animate-flame inline-block",
							children: "|"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ct-font-script mt-6 text-right text-xl",
						children: ["— With all my pride, for ", name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Feather, {
						"aria-hidden": true,
						className: "ct-animate-laurel absolute -right-2 -bottom-4 h-10 w-10 ct-neon-gold",
						style: { color: "var(--ct-primary)" }
					})
				]
			})]
		})
	});
}
//#endregion
export { NoteOfPride };
