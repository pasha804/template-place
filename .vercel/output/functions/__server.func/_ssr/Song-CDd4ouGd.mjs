import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { D as SkipBack, E as SkipForward, G as Play, J as Pause, Q as Music2, nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { l as series$1, n as GlowButton$1 } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-Dy13sQuy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Song-CDd4ouGd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DURATION = 263;
var notes = series$1(503, 8, (r) => ({
	x: r() * 100,
	y: r() * 100,
	size: 14 + r() * 14,
	dur: 6 + r() * 6,
	delay: r() * 5
}));
var fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
function Song({ onNext, songTitle, songArtist, couplePhoto, songSectionTitle, songSectionSubtitle }) {
	const [playing, setPlaying] = (0, import_react.useState)(true);
	const [time, setTime] = (0, import_react.useState)(35);
	const title = songTitle || "Perfect";
	const artist = songArtist || "Ed Sheeran";
	const photo = couplePhoto || "/templates/anniversary-galaxy/couple-galaxy.webp";
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = setInterval(() => setTime((t) => (t + 1) % DURATION), 1e3);
		return () => clearInterval(id);
	}, [playing]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: songSectionTitle || "Our Song",
		subtitle: songSectionSubtitle || /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			"Every moment with you",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
			"is our favorite melody."
		] }),
		footerSlot: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton$1, {
			onClick: onNext,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" }),
			children: "Next"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto w-full max-w-sm",
			children: [
				notes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
					className: "absolute neon-outline",
					style: {
						left: `${n.x}%`,
						top: `${n.y}%`,
						color: "oklch(0.7 0.24 350 / 50%)"
					},
					animate: {
						y: [
							0,
							-30,
							0
						],
						rotate: [
							-14,
							14,
							-14
						],
						opacity: [
							.3,
							.9,
							.3
						]
					},
					transition: {
						duration: n.dur,
						delay: n.delay,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { style: {
						width: n.size,
						height: n.size
					} })
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: .8,
						opacity: 0
					},
					animate: {
						scale: 1,
						opacity: 1
					},
					transition: {
						duration: 1.1,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					className: "relative mx-auto h-52 w-52 sm:h-60 sm:w-60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						animate: { rotate: 360 },
						transition: {
							duration: 6,
							repeat: Infinity,
							ease: "linear"
						},
						style: { animationPlayState: playing ? "running" : "paused" },
						className: "h-full w-full rounded-full",
						style: {
							background: "repeating-radial-gradient(circle,oklch(0.16 0.03 300) 0 3px,oklch(0.1 0.02 300) 3px 6px)",
							boxShadow: "var(--shadow-glow-soft)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute overflow-hidden rounded-full",
							style: {
								inset: "26%",
								border: "2px solid oklch(0.7 0.24 350 / 50%)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: photo,
								alt: "Our song",
								width: 1024,
								height: 1024,
								loading: "lazy",
								className: "h-full w-full object-cover",
								style: { objectPosition: "50% 72%" }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full neon-outline",
							style: { background: "var(--primary)" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl",
						style: { background: "oklch(0.7 0.24 350 / 20%)" }
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass mt-6 rounded-3xl px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-serif text-lg",
							style: { color: "var(--foreground)" },
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.2em] uppercase",
							style: { color: "var(--muted-foreground)" },
							children: artist
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-3 text-[11px]",
							style: { color: "var(--muted-foreground)" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(time) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-1 min-w-0 flex-1 overflow-hidden rounded-full",
									style: { background: "var(--secondary)" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										className: "h-full rounded-full",
										style: { backgroundImage: "var(--gradient-pink)" },
										animate: { width: `${time / DURATION * 100}%` },
										transition: {
											ease: "linear",
											duration: .9
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(DURATION) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-center gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTime((t) => Math.max(0, t - 15)),
									className: "transition-colors",
									style: { color: "var(--muted-foreground)" },
									"aria-label": "Rewind",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipBack, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									type: "button",
									onClick: () => setPlaying((p) => !p),
									whileHover: { scale: 1.08 },
									whileTap: { scale: .93 },
									className: "grid h-12 w-12 place-items-center rounded-full glow-ring",
									style: {
										backgroundImage: "var(--gradient-pink)",
										color: "var(--primary-foreground)"
									},
									"aria-label": playing ? "Pause" : "Play",
									children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setTime((t) => Math.min(DURATION, t + 15)),
									className: "transition-colors",
									style: { color: "var(--muted-foreground)" },
									"aria-label": "Forward",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkipForward, { className: "h-5 w-5" })
								})
							]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Song };
