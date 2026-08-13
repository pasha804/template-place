import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { it as MicOff, rt as Mic } from "../_libs/lucide-react.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
import { t as Confetti } from "./Confetti-DdLQBJEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Launch-ChCTOM-U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Launch({ onNext }) {
	const [celebrated, setCelebrated] = (0, import_react.useState)(false);
	const [listening, setListening] = (0, import_react.useState)(false);
	const streamRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(null);
	const stopMic = (0, import_react.useCallback)(() => {
		if (rafRef.current !== null) {
			cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
		}
		streamRef.current?.getTracks().forEach((t) => t.stop());
		streamRef.current = null;
		setListening(false);
	}, []);
	(0, import_react.useEffect)(() => stopMic, [stopMic]);
	const celebrate = (0, import_react.useCallback)(() => {
		setCelebrated(true);
		stopMic();
	}, [stopMic]);
	const startMic = (0, import_react.useCallback)(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			const ctx = new AudioContext();
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 256;
			ctx.createMediaStreamSource(stream).connect(analyser);
			const data = new Uint8Array(analyser.frequencyBinCount);
			setListening(true);
			const tick = () => {
				analyser.getByteFrequencyData(data);
				let sum = 0;
				for (let i = 0; i < 40; i++) sum += data[i] ?? 0;
				if (sum / 40 > 105) {
					celebrate();
					return;
				}
				rafRef.current = requestAnimationFrame(tick);
			};
			rafRef.current = requestAnimationFrame(tick);
		} catch {
			stopMic();
		}
	}, [celebrate, stopMic]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneShell, {
		title: "Launch the Celebration",
		subtitle: celebrated ? "The world is celebrating you! ✧" : "Tap the bottle — or blow into your microphone — to pop the champagne.",
		footer: celebrated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlowButton, {
			variant: "ghost",
			onClick: listening ? stopMic : startMic,
			ariaLabel: listening ? "Stop" : "Use mic",
			children: [listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, {
				className: "h-4 w-4",
				"aria-hidden": true
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {
				className: "h-4 w-4",
				"aria-hidden": true
			}), listening ? "Listening…" : "Use Microphone"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: celebrate,
			children: "Pop It"
		})] }),
		children: [celebrated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, { seed: 9931 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
			type: "button",
			onClick: celebrate,
			"aria-label": "Pop the champagne",
			whileHover: { scale: 1.03 },
			whileTap: { scale: .98 },
			animate: celebrated ? { scale: [
				1,
				1.06,
				1
			] } : {},
			transition: { duration: .6 },
			className: "ct-animate-float relative mx-auto block w-full max-w-md cursor-pointer rounded-[2rem] p-2",
			style: {
				backgroundImage: "var(--ct-gradient-gold)",
				boxShadow: "var(--ct-shadow-gold)"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/templates/congratulations-triumph/champagne-podium.jpg",
				alt: "Champagne bottle bursting with golden sparks",
				width: 1024,
				height: 1024,
				loading: "lazy",
				decoding: "async",
				className: "w-full rounded-[1.7rem] object-cover"
			})
		})]
	});
}
//#endregion
export { Launch };
