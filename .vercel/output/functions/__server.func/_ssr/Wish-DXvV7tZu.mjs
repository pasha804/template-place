import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { it as MicOff, nn as ArrowRight, rt as Mic } from "../_libs/lucide-react.mjs";
import { n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
import { t as Confetti } from "./Confetti-CGpUvMtJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Wish-DXvV7tZu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CANDLES = [{
	x: "35.5%",
	y: "16.5%"
}, {
	x: "48.8%",
	y: "14.5%"
}];
function Wish({ onNext, anniversaryDate, title, subtitle }) {
	const [out, setOut] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const stopRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => stopRef.current?.(), []);
	const blow = () => {
		setOut(true);
		stopRef.current?.();
		setListening(false);
	};
	const listen = async () => {
		if (listening) {
			stopRef.current?.();
			setListening(false);
			return;
		}
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			const ctx = new AudioContext();
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 1024;
			ctx.createMediaStreamSource(stream).connect(analyser);
			const data = new Uint8Array(analyser.frequencyBinCount);
			let raf = 0;
			const tick = () => {
				analyser.getByteFrequencyData(data);
				let sum = 0;
				for (let i = 0; i < 40; i++) sum += data[i] ?? 0;
				if (sum / 40 > 105) blow();
				else raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
			stopRef.current = () => {
				cancelAnimationFrame(raf);
				stream.getTracks().forEach((t) => t.stop());
				ctx.close();
				stopRef.current = null;
			};
			setListening(true);
		} catch {
			setListening(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: title || "Make a Wish",
		subtitle: out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "script text-2xl text-glow",
			style: { color: "var(--primary)" },
			children: "Your wish is on its way ✧"
		}) : subtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Blow out the candles and",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"make your anniversary wish."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				type: "button",
				onClick: listen,
				whileHover: { scale: 1.08 },
				whileTap: { scale: .94 },
				className: `grid h-14 w-14 place-items-center rounded-full glow-ring ${listening ? "animate-glow-pulse" : ""}`,
				style: {
					backgroundImage: "var(--gradient-pink)",
					color: "var(--primary-foreground)"
				},
				"aria-label": listening ? "Stop listening" : "Blow out the candles with your microphone",
				children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "h-6 w-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs",
				style: { color: "var(--muted-foreground)" },
				children: listening ? "Listening… blow gently 🎤" : "Tap the mic & blow (or just tap the candles)"
			}),
			out && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
				onClick: onNext,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
				children: "Next"
			})
		] }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, { active: out }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					type: "button",
					onClick: blow,
					animate: { y: [
						0,
						-10,
						0
					] },
					transition: {
						duration: 6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					className: "relative block w-full",
					"aria-label": "Tap the candles to blow them out",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/templates/anniversary-galaxy/cake.webp",
						alt: "Anniversary cake with candles",
						width: 1024,
						height: 1024,
						loading: "lazy",
						className: "w-full",
						style: { filter: "drop-shadow(0 20px 50px oklch(0.66 0.27 345 / 35%))" }
					}), CANDLES.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -translate-x-1/2 -translate-y-1/2",
						style: {
							left: c.x,
							top: c.y
						},
						children: !out ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "animate-flame block h-6 w-4 rounded-full mix-blend-screen",
							style: {
								animationDelay: `${i * .13}s`,
								filter: "blur(1.5px)",
								background: "radial-gradient(circle at 50% 70%,oklch(0.98 0.14 92),oklch(0.82 0.19 62) 55%,transparent)"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -inset-5 -z-10 animate-glow-pulse rounded-full mix-blend-screen blur-xl",
							style: { background: "oklch(0.87 0.12 88 / 40%)" }
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
							initial: {
								opacity: .7,
								y: 0,
								scale: .6
							},
							animate: {
								opacity: 0,
								y: -70,
								scale: 2.4
							},
							transition: {
								duration: 2.6,
								ease: "easeOut"
							},
							className: "relative block h-4 w-4 rounded-full blur-md",
							style: { background: "oklch(0.96 0.015 330 / 35%)" }
						})
					}, i))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "script mt-2 text-3xl text-glow",
					style: { color: "var(--primary)" },
					children: "Happy Anniversary"
				})
			]
		})
	});
}
//#endregion
export { Wish };
