import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
import { t as Confetti } from "./Confetti-DdLQBJEX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TheReward-BGhK89GU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_REWARD_MSG = "The greatest reward is knowing you never gave up. Keep shining.";
function TheReward({ onNext, rewardMessage }) {
	const [opened, setOpened] = (0, import_react.useState)(false);
	const text = rewardMessage || DEFAULT_REWARD_MSG;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SceneShell, {
		title: "The Reward",
		subtitle: opened ? "Take it — it was always yours." : "Something has been waiting for you.",
		footer: opened ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}) : null,
		children: [opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, { seed: 2718 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-[26rem] max-w-xl flex-col items-center justify-start",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					initial: {
						scale: 0,
						opacity: .9
					},
					animate: {
						scale: 6,
						opacity: 0
					},
					transition: {
						duration: 1.2,
						ease: "easeOut"
					},
					className: "pointer-events-none absolute top-32 h-40 w-40 rounded-full border-2",
					style: {
						borderColor: "var(--ct-primary)",
						boxShadow: "var(--ct-shadow-gold)"
					}
				}, "shockwave") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					type: "button",
					onClick: () => setOpened(true),
					"aria-label": "Open the reward",
					animate: opened ? {
						scale: .72,
						rotate: -8,
						opacity: .55
					} : {
						rotate: [
							-2.5,
							2.5,
							-2.5
						],
						y: [
							0,
							-10,
							0
						]
					},
					transition: opened ? { duration: .7 } : {
						duration: 5.5,
						repeat: Infinity,
						ease: "easeInOut"
					},
					whileHover: opened ? {} : { scale: 1.04 },
					className: "relative w-full max-w-sm cursor-pointer rounded-[2rem] p-2",
					style: {
						backgroundImage: "var(--ct-gradient-gold)",
						boxShadow: "var(--ct-shadow-gold)"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/templates/congratulations-triumph/treasure-chest.jpg",
						alt: "Golden treasure chest glowing from within",
						width: 1024,
						height: 1024,
						loading: "lazy",
						decoding: "async",
						className: "w-full rounded-[1.7rem] object-cover"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: opened && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 60,
						scale: .9
					},
					animate: {
						opacity: 1,
						y: -120,
						scale: 1
					},
					transition: {
						delay: .35,
						duration: .9,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "ct-glass absolute top-40 z-20 w-full max-w-md rounded-3xl p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ct-font-script text-2xl leading-relaxed sm:text-3xl",
						style: { color: "var(--ct-accent)" },
						children: [
							"\"",
							text,
							"\""
						]
					})
				}) })
			]
		})]
	});
}
//#endregion
export { TheReward };
