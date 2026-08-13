import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { B as Rewind, G as Play, J as Pause, Z as Music, jt as FastForward } from "../_libs/lucide-react.mjs";
import { a as between, c as series, t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Anthem-Bmjoihef.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function format(seconds) {
	return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}
function Anthem({ onNext, songTitle, songArtist }) {
	const title = songTitle || "Unstoppable";
	const artist = songArtist || "Sia";
	const DURATION = 217;
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = setInterval(() => {
			setElapsed((prev) => prev + 1 >= DURATION ? 0 : prev + 1);
		}, 1e3);
		return () => clearInterval(id);
	}, [playing]);
	const notes = series(3141, 12, (r) => ({
		left: between(r, 2, 96),
		top: between(r, 2, 88),
		size: between(r, 14, 26),
		delay: between(r, 0, 5)
	}));
	const progress = elapsed / DURATION * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "Your Anthem",
		subtitle: "Every victory deserves a soundtrack.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-3xl",
			children: [notes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music, {
				"aria-hidden": true,
				className: "ct-animate-float pointer-events-none absolute",
				style: {
					left: `${n.left}%`,
					top: `${n.top}%`,
					width: n.size,
					height: n.size,
					color: "var(--ct-primary)",
					opacity: .5,
					animationDelay: `${n.delay}s`
				}
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ct-glass relative flex flex-col items-center gap-8 rounded-3xl p-6 sm:flex-row sm:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					animate: playing ? { rotate: 360 } : { rotate: 0 },
					transition: playing ? {
						duration: 6,
						repeat: Infinity,
						ease: "linear"
					} : { duration: .4 },
					className: "relative h-44 w-44 shrink-0 rounded-full",
					style: {
						background: "repeating-radial-gradient(circle, oklch(0.16 0.04 160) 0px, oklch(0.16 0.04 160) 5px, oklch(0.22 0.05 158) 6px, oklch(0.22 0.05 158) 7px)",
						boxShadow: "var(--ct-shadow-emerald)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full",
						style: {
							backgroundImage: "var(--ct-gradient-gold)",
							boxShadow: "var(--ct-shadow-gold)"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
						style: { background: "var(--ct-background)" }
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full text-center sm:text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "ct-font-script text-2xl",
							style: { color: "var(--ct-accent)" },
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "ct-font-serif text-lg",
							style: { color: "var(--ct-muted-fg)" },
							children: artist
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 h-1.5 w-full overflow-hidden rounded-full",
							style: { background: "var(--ct-muted)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full transition-[width] duration-1000 ease-linear",
								style: {
									width: `${progress}%`,
									backgroundImage: "var(--ct-gradient-gold)"
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between text-xs",
							style: {
								fontFamily: "var(--ct-font-sans)",
								color: "var(--ct-muted-fg)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(elapsed) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: format(DURATION) })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-center sm:justify-start gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Rewind ten seconds",
									onClick: () => setElapsed((p) => Math.max(0, p - 10)),
									className: "ct-glass-deep flex h-11 w-11 cursor-pointer items-center justify-center rounded-full",
									style: { color: "var(--ct-primary)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rewind, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": playing ? "Pause the anthem" : "Play the anthem",
									onClick: () => setPlaying((p) => !p),
									className: "flex h-14 w-14 cursor-pointer items-center justify-center rounded-full",
									style: {
										backgroundImage: "var(--ct-gradient-gold)",
										boxShadow: "var(--ct-shadow-gold)",
										color: "var(--ct-primary-fg)"
									},
									children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {
										className: "h-5 w-5",
										"aria-hidden": true
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
										className: "h-5 w-5",
										"aria-hidden": true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": "Skip forward ten seconds",
									onClick: () => setElapsed((p) => Math.min(DURATION, p + 10)),
									className: "ct-glass-deep flex h-11 w-11 cursor-pointer items-center justify-center rounded-full",
									style: { color: "var(--ct-primary)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								})
							]
						})
					]
				})]
			})]
		})
	});
}
//#endregion
export { Anthem };
