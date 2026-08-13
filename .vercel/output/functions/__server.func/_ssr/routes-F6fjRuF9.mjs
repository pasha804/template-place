import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { a as useMotionValue, c as motion, i as useTransform, r as useSpring, t as useInView } from "../_libs/framer-motion.mjs";
import { C as Sparkles, G as Play, Gt as ChevronRight, Kt as ChevronLeft, N as Share2, Nt as Eye, Ot as Film, T as Smartphone, U as Quote, Xt as ChartNoAxesColumn, Y as Palette, Z as Music, _ as Timer, a as WandSparkles, gt as Layers, j as Shield, l as Users, mt as LayoutTemplate, n as Zap, nn as ArrowRight, q as Pencil, ut as Lock, vt as Image, x as Star, xt as Globe, yt as Heart, zt as Crown } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as useAuth } from "./use-auth-BkAzBpck.mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { t as Footer } from "./Footer-BTWP9whH.mjs";
import { i as useToggleFavorite, r as useFavorites, t as allUnifiedTemplates } from "./combined-BKJH_seF.mjs";
import { n as PricingSection, t as FAQSection } from "./FAQSection-NT9vxkBs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-F6fjRuF9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PHONES = [
	{
		id: "anniversary",
		title: "Happy Anniversary",
		sub: "Together Forever 🥂",
		topEmoji: "💑",
		bg: "linear-gradient(155deg,#1c0b35 0%,#3b0f70 45%,#6b21a8 100%)",
		accent: "#c084fc",
		glowColor: "rgba(192,132,252,0.7)",
		rotate: -12,
		x: -115,
		y: 30,
		scale: .82,
		zIndex: 10,
		delay: .15,
		hasCountdown: true,
		ctaText: "View Page"
	},
	{
		id: "birthday",
		title: "Happy Birthday",
		sub: "Sarah ❤️",
		topEmoji: "🎂",
		bg: "linear-gradient(155deg,#1a0520 0%,#4a0860 45%,#86198f 100%)",
		accent: "#f472b6",
		glowColor: "rgba(244,114,182,0.8)",
		rotate: -3,
		x: -10,
		y: -20,
		scale: 1,
		zIndex: 30,
		delay: 0,
		hasCountdown: false,
		ctaText: "View Page",
		featured: true
	},
	{
		id: "proposal",
		title: "Will You Marry Me?",
		sub: "A Special Day 💍",
		topEmoji: "💍",
		bg: "linear-gradient(155deg,#0d1635 0%,#1d3a7a 45%,#1e40af 100%)",
		accent: "#818cf8",
		glowColor: "rgba(129,140,248,0.6)",
		rotate: 9,
		x: 105,
		y: 20,
		scale: .86,
		zIndex: 20,
		delay: .1,
		hasCountdown: false,
		ctaText: "Yes, I Will! 💍"
	}
];
var SPARKLES = [
	{
		emoji: "😍",
		top: "12%",
		left: "6%",
		size: 28,
		delay: 0
	},
	{
		emoji: "💝",
		top: "14%",
		right: "7%",
		size: 26,
		delay: .7
	},
	{
		emoji: "🥰",
		top: "60%",
		left: "4%",
		size: 30,
		delay: 1.4
	},
	{
		emoji: "💌",
		top: "68%",
		right: "5%",
		size: 24,
		delay: 2.1
	},
	{
		emoji: "✨",
		top: "38%",
		left: "2%",
		size: 18,
		delay: .4
	},
	{
		emoji: "🌟",
		top: "45%",
		right: "3%",
		size: 18,
		delay: 1.1
	}
];
function Phone({ phone }) {
	const W = 185;
	const H = 370;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 60,
			scale: phone.scale * .85
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: phone.scale
		},
		transition: {
			duration: 1,
			delay: phone.delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "absolute",
		style: {
			width: W,
			height: H,
			left: "50%",
			top: "50%",
			marginLeft: -185 / 2,
			marginTop: -370 / 2,
			x: phone.x,
			y: phone.y,
			rotate: phone.rotate,
			zIndex: phone.zIndex
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			animate: { y: [
				0,
				phone.featured ? -14 : -9,
				0
			] },
			transition: {
				duration: phone.featured ? 3.5 : 4.5 + phone.id.length * .3,
				repeat: Infinity,
				ease: "easeInOut",
				delay: phone.delay * 2
			},
			style: {
				width: W,
				height: H,
				perspective: 800
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -inset-6 rounded-[48px] blur-2xl",
					style: {
						background: `radial-gradient(ellipse at 50% 60%, ${phone.glowColor} 0%, transparent 70%)`,
						opacity: phone.featured ? .9 : .55
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden",
					style: {
						width: W,
						height: H,
						borderRadius: 36,
						background: "linear-gradient(170deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
						border: `2px solid ${phone.accent}45`,
						boxShadow: [
							`0 0 0 1px rgba(255,255,255,0.06)`,
							`0 30px 80px -20px ${phone.glowColor}`,
							`inset 0 1px 0 rgba(255,255,255,0.15)`,
							`inset 0 -1px 0 rgba(0,0,0,0.3)`,
							phone.featured ? `0 0 60px -10px ${phone.glowColor}` : ""
						].filter(Boolean).join(", ")
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-[3px] overflow-hidden",
						style: {
							borderRadius: 34,
							background: phone.bg
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-5 pt-3 pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-bold text-white/50",
									children: "9:41"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [[
										3,
										2,
										3
									].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-1 rounded-full bg-white/50",
										style: { height: h + 6 }
									}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-1 h-2 w-3.5 rounded-sm border border-white/40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-2/3 rounded-sm bg-white/60" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "h-5 w-20 rounded-b-2xl bg-black/60 flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-white/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-full bg-black/80 border border-white/10" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center pt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: {
										scale: [
											1,
											1.12,
											1
										],
										rotate: [
											0,
											5,
											-3,
											0
										]
									},
									transition: {
										duration: 3,
										repeat: Infinity,
										ease: "easeInOut",
										delay: phone.delay
									},
									className: "flex h-14 w-14 items-center justify-center rounded-2xl text-3xl",
									style: {
										background: `${phone.accent}20`,
										border: `1px solid ${phone.accent}35`,
										boxShadow: `0 0 20px ${phone.accent}40`
									},
									children: phone.topEmoji
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2.5 px-4 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[12px] font-black leading-tight text-white",
									children: phone.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[10px] font-medium",
									style: { color: phone.accent },
									children: phone.sub
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mt-3 overflow-hidden rounded-2xl",
								style: {
									height: 80,
									background: `linear-gradient(135deg, ${phone.accent}18, ${phone.accent}08)`,
									border: `1px solid ${phone.accent}20`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full items-center justify-center gap-2",
									children: [
										.6,
										1,
										.7
									].map((op, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-12 w-12 items-center justify-center rounded-xl text-xl",
										style: {
											background: `${phone.accent}15`,
											opacity: op
										},
										children: phone.topEmoji
									}, i))
								})
							}),
							phone.hasCountdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mt-2.5 flex gap-1.5",
								children: [
									["12", "DAYS"],
									["08", "HRS"],
									["45", "MIN"],
									["30", "SEC"]
								].map(([n, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col items-center rounded-xl py-1.5",
									style: {
										background: `${phone.accent}18`,
										border: `1px solid ${phone.accent}22`
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-black text-white",
										children: n
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[7px] text-white/40",
										children: l
									})]
								}, l))
							}),
							!phone.hasCountdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mt-2.5 flex gap-1.5",
								children: [
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 flex-1 overflow-hidden rounded-xl",
									style: {
										background: `${phone.accent}14`,
										border: `1px solid ${phone.accent}18`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-full items-center justify-center text-sm opacity-40",
										children: phone.topEmoji
									})
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-4 mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-2xl py-2 text-center text-[10px] font-black text-white",
									style: {
										background: `linear-gradient(90deg, ${phone.accent}, #7c3aed)`,
										boxShadow: `0 4px 16px ${phone.accent}55`
									},
									children: phone.ctaText
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute bottom-2 left-0 right-0 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-20 rounded-full bg-white/20" })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 rounded-[36px]",
					style: { background: "linear-gradient(125deg, rgba(255,255,255,0.12) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.04) 100%)" }
				})
			]
		})
	});
}
function HeroSection() {
	const containerRef = (0, import_react.useRef)(null);
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
		stiffness: 80,
		damping: 20
	});
	const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), {
		stiffness: 80,
		damping: 20
	});
	function handleMouseMove(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		mouseX.set(e.clientX - rect.left - rect.width / 2);
		mouseY.set(e.clientY - rect.top - rect.height / 2);
	}
	function handleMouseLeave() {
		mouseX.set(0);
		mouseY.set(0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden pt-14 pb-2 sm:pt-16 sm:pb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "radial-gradient(ellipse 70% 90% at 78% 50%, rgba(109,40,217,0.35) 0%, transparent 65%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0",
					style: { background: "radial-gradient(ellipse 35% 35% at 60% 65%, rgba(236,72,153,0.18) 0%, transparent 60%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 opacity-[0.028]",
					style: {
						backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
						backgroundSize: "60px 60px"
					}
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-center lg:flex-row lg:items-center lg:gap-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex-1 py-1 lg:py-2 lg:max-w-[50%]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "mb-3 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-[12px] font-bold text-pink-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✨" }), " Create. Personalize. Share."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 28
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .75,
								delay: .1,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "text-5xl font-black leading-[1.06] text-white sm:text-6xl lg:text-[62px]",
							children: [
								"Create Beautiful",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										background: "linear-gradient(90deg,#ec4899 0%,#f97316 45%,#eab308 100%)",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent"
									},
									children: "Moments With Our"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Premium Templates"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 18
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .22
							},
							className: "mt-5 max-w-md text-base leading-relaxed text-white/50",
							children: "Build stunning personal websites for your loved ones in minutes. Choose a template, customize it your way and share your love."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .34
							},
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/templates",
								className: "group flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.04]",
								style: {
									background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
									boxShadow: "0 0 32px rgba(236,72,153,0.45)"
								},
								children: ["Explore Templates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex items-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white/80 backdrop-blur transition-all hover:bg-white/10 hover:text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-6 w-6 items-center justify-center rounded-full bg-white/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3 w-3 fill-white text-white" })
								}), "How It Works"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: .5 },
							className: "mt-8 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex -space-x-2.5",
								children: [
									"#ec4899",
									"#8b5cf6",
									"#3b82f6",
									"#10b981"
								].map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0a0914] text-xs font-black text-white",
									style: { background: `linear-gradient(135deg,${c},${c}aa)` },
									children: [
										"A",
										"B",
										"C",
										"D"
									][i]
								}, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-0.5",
								children: [
									[
										1,
										2,
										3,
										4
									].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-yellow-400 text-yellow-400" }, i)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 text-yellow-400/40 fill-yellow-400/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-xs font-bold text-white/80",
										children: "4.9/5"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-white/35",
								children: "from 8,500+ users"
							})] })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: containerRef,
					className: "relative hidden flex-1 select-none lg:flex lg:items-center lg:justify-center",
					style: {
						height: 460,
						minWidth: 460
					},
					onMouseMove: handleMouseMove,
					onMouseLeave: handleMouseLeave,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .8
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								duration: 1.2,
								delay: .2
							},
							className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
							style: {
								width: 480,
								height: 480,
								background: "radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(236,72,153,0.14) 40%, transparent 70%)",
								filter: "blur(40px)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/20",
							style: {
								width: 420,
								height: 420
							},
							animate: {
								scale: [
									1,
									1.06,
									1
								],
								opacity: [
									.4,
									.7,
									.4
								]
							},
							transition: {
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/15",
							style: {
								width: 340,
								height: 340
							},
							animate: {
								scale: [
									1,
									1.04,
									1
								],
								opacity: [
									.3,
									.6,
									.3
								]
							},
							transition: {
								duration: 5,
								repeat: Infinity,
								ease: "easeInOut",
								delay: 1
							}
						}),
						SPARKLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							className: "absolute z-40 flex items-center justify-center rounded-2xl",
							style: {
								top: s.top,
								left: "left" in s ? s.left : void 0,
								right: "right" in s ? s.right : void 0,
								width: s.size + 16,
								height: s.size + 16,
								fontSize: s.size,
								background: "rgba(255,255,255,0.06)",
								border: "1px solid rgba(255,255,255,0.1)",
								backdropFilter: "blur(8px)",
								boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
							},
							initial: {
								opacity: 0,
								scale: .5
							},
							animate: {
								opacity: 1,
								scale: 1,
								y: [
									0,
									-10,
									0
								],
								rotate: [
									0,
									8,
									-4,
									0
								]
							},
							transition: {
								opacity: {
									delay: .6 + s.delay,
									duration: .4
								},
								scale: {
									delay: .6 + s.delay,
									duration: .4,
									type: "spring",
									stiffness: 200
								},
								y: {
									delay: s.delay,
									duration: 4 + s.delay,
									repeat: Infinity,
									ease: "easeInOut"
								},
								rotate: {
									delay: s.delay,
									duration: 5 + s.delay,
									repeat: Infinity,
									ease: "easeInOut"
								}
							},
							children: s.emoji
						}, s.emoji)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							style: {
								rotateX,
								rotateY,
								transformStyle: "preserve-3d",
								perspective: 1200
							},
							className: "relative",
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								duration: .5,
								delay: .1
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative",
								style: {
									width: 185,
									height: 370
								},
								children: PHONES.map((phone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { phone }, phone.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: 30,
								y: -20
							},
							animate: {
								opacity: 1,
								x: 0,
								y: 0
							},
							transition: {
								delay: 1.1,
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "absolute top-[8%] right-[2%] z-50 flex items-center gap-2.5 rounded-2xl border border-white/10 px-3.5 py-2.5 backdrop-blur-xl",
							style: {
								background: "rgba(20,15,40,0.85)",
								boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-sm",
								children: "🚀"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-black text-white",
								children: "50K+ Pages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-white/40",
								children: "created this month"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: -30,
								y: 20
							},
							animate: {
								opacity: 1,
								x: 0,
								y: 0
							},
							transition: {
								delay: 1.3,
								duration: .7,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "absolute bottom-[14%] left-[1%] z-50 flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2 backdrop-blur-xl",
							style: {
								background: "rgba(20,15,40,0.85)",
								boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg",
								children: "❤️"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold text-white",
								children: "Just shared!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-white/40",
								children: "Birthday page · 2s ago"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .7
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								delay: 1.5,
								duration: .5,
								type: "spring",
								stiffness: 200
							},
							className: "absolute bottom-[30%] right-[3%] z-50 flex items-center gap-2 rounded-xl border border-emerald-500/25 px-3 py-1.5 backdrop-blur-xl",
							style: {
								background: "rgba(16,185,129,0.12)",
								boxShadow: "0 4px 20px rgba(16,185,129,0.2)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-bold text-emerald-400",
								children: "Premium Unlocked"
							})]
						})
					]
				})]
			})
		})]
	});
}
var stats = [
	{
		icon: Users,
		value: 5e3,
		suffix: "+",
		label: "Happy Customers",
		color: "#a78bfa"
	},
	{
		icon: Layers,
		value: 50,
		suffix: "+",
		label: "Premium Templates",
		color: "#f472b6"
	},
	{
		icon: Globe,
		value: 5e3,
		suffix: "K+",
		label: "Websites Created",
		color: "#38bdf8"
	},
	{
		icon: Shield,
		value: 99.9,
		suffix: "%",
		label: "Uptime Guaranteed",
		color: "#34d399",
		isDecimal: true
	}
];
function AnimatedNumber({ target, suffix, isDecimal }) {
	const ref = (0, import_react.useRef)(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-60px"
	});
	const mv = useMotionValue(0);
	const spring = useSpring(mv, {
		stiffness: 50,
		damping: 18
	});
	(0, import_react.useEffect)(() => {
		if (inView) mv.set(target);
	}, [
		inView,
		target,
		mv
	]);
	(0, import_react.useEffect)(() => {
		return spring.on("change", (v) => {
			if (!ref.current) return;
			ref.current.textContent = isDecimal ? v.toFixed(1) + suffix : Math.round(v).toLocaleString() + suffix;
		});
	}, [
		spring,
		suffix,
		isDecimal
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		ref,
		children: ["0", suffix]
	});
}
function StatsSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-2 sm:py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 24
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { duration: .65 },
				className: "overflow-hidden rounded-2xl border border-white/[0.07]",
				style: {
					background: "rgba(255,255,255,0.03)",
					backdropFilter: "blur(12px)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4",
					children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { opacity: 0 },
						whileInView: { opacity: 1 },
						viewport: { once: true },
						transition: { delay: i * .08 },
						className: "flex items-center gap-4 px-8 py-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
							style: {
								background: `${s.color}18`,
								border: `1px solid ${s.color}30`
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
								className: "h-5 w-5",
								style: { color: s.color }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-black text-white sm:text-3xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedNumber, {
								target: s.value,
								suffix: s.suffix,
								isDecimal: s.isDecimal
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-white/40",
							children: s.label
						})] })]
					}, s.label))
				})
			})
		})
	});
}
var steps = [
	{
		num: "01",
		icon: LayoutTemplate,
		title: "Choose a template",
		desc: "Browse 30+ stunning templates designed for every occasion — birthdays, anniversaries, proposals, weddings and more.",
		gradient: "from-violet-500 to-purple-600",
		glow: "rgba(167,139,250,0.35)",
		border: "rgba(167,139,250,0.2)",
		bg: "rgba(167,139,250,0.08)"
	},
	{
		num: "02",
		icon: Pencil,
		title: "Customize your page",
		desc: "Add your photos, write your message, pick colors and music. Live preview updates as you type.",
		gradient: "from-pink-500 to-rose-500",
		glow: "rgba(244,114,182,0.35)",
		border: "rgba(244,114,182,0.2)",
		bg: "rgba(244,114,182,0.08)"
	},
	{
		num: "03",
		icon: Share2,
		title: "Share the love",
		desc: "Get a unique link and share it on WhatsApp, Instagram or any platform. Watch the reactions roll in.",
		gradient: "from-cyan-400 to-sky-500",
		glow: "rgba(56,189,248,0.35)",
		border: "rgba(56,189,248,0.2)",
		bg: "rgba(56,189,248,0.08)"
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-3 sm:py-4 overflow-hidden",
		id: "how-it-works",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0 opacity-30",
			style: { background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(124,58,237,0.18) 0%, transparent 70%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 text-center sm:mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "mb-2 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/8 px-3 py-1 text-xs font-semibold text-pink-400",
							children: "Simple & Fast"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
							initial: {
								opacity: 0,
								y: 18
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "text-3xl font-black text-white sm:text-4xl",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .18 },
							className: "mt-2 text-sm text-white/50",
							children: "From zero to a magical link in under 5 minutes"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid gap-6 md:grid-cols-3 lg:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute top-16 left-[calc(16.6%+2rem)] hidden h-px w-[calc(66%-4rem)] md:block",
						style: { background: "linear-gradient(90deg, rgba(167,139,250,0.5), rgba(244,114,182,0.5), rgba(56,189,248,0.5))" }
					}), steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 32
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .14,
							duration: .7,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						whileHover: {
							y: -6,
							transition: { duration: .25 }
						},
						className: "relative overflow-hidden rounded-3xl border p-8 transition-all duration-300",
						style: {
							background: `linear-gradient(145deg, ${step.bg} 0%, rgba(15,13,36,0.6) 100%)`,
							borderColor: step.border,
							backdropFilter: "blur(16px)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500",
								style: {
									background: step.glow,
									opacity: .5
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mb-6 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-14 w-14 items-center justify-center rounded-2xl",
									style: {
										background: `linear-gradient(135deg, ${step.gradient.replace("from-", "").split(" to-")[0].trim()}, ${step.gradient.split(" to-")[1].trim()})`.replace(/([a-z]+)-(\d+)/g, (_, name, weight) => {
											return {
												"violet-500": "#8b5cf6",
												"purple-600": "#9333ea",
												"pink-500": "#ec4899",
												"rose-500": "#f43f5e",
												"cyan-400": "#22d3ee",
												"sky-500": "#0ea5e9"
											}[`${name}-${weight}`] ?? "#a78bfa";
										}),
										boxShadow: `0 8px 30px -8px ${step.glow}`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-6 w-6 text-white" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-5xl font-black opacity-20 bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent`,
									style: {
										fontFamily: "var(--font-display)",
										lineHeight: 1
									},
									children: step.num
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "relative mb-3 text-xl font-bold",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "relative text-sm leading-relaxed text-muted-foreground",
								children: step.desc
							})
						]
					}, step.num))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .4 },
					className: "mt-4 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates",
						className: "group flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-8 py-3.5 text-sm font-semibold text-primary backdrop-blur transition-all hover:bg-primary/15 hover:scale-[1.02]",
						children: ["Start creating for free", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
					})
				})
			]
		})]
	});
}
var categories = [
	{
		label: "Birthday",
		emoji: "🎂",
		count: 35,
		color: "#f472b6",
		href: "/templates?cat=birthday"
	},
	{
		label: "Anniversary",
		emoji: "❤️",
		count: 25,
		color: "#ef4444",
		href: "/templates?cat=anniversary"
	},
	{
		label: "Proposal",
		emoji: "💍",
		count: 20,
		color: "#a78bfa",
		href: "/templates?cat=proposal"
	},
	{
		label: "Love",
		emoji: "💖",
		count: 30,
		color: "#ec4899",
		href: "/templates?cat=valentine"
	},
	{
		label: "Friendship",
		emoji: "👫",
		count: 18,
		color: "#fbbf24",
		href: "/templates?cat=friendship"
	},
	{
		label: "Wedding",
		emoji: "💒",
		count: 22,
		color: "#34d399",
		href: "/templates?cat=wedding"
	},
	{
		label: "Special Days",
		emoji: "🎁",
		count: 40,
		color: "#f97316",
		href: "/templates?cat=special"
	},
	{
		label: "View All",
		emoji: "⊞",
		count: 100,
		color: "#818cf8",
		href: "/templates",
		isAll: true
	}
];
function CategoriesSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-3 sm:py-4",
		id: "categories",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 text-center sm:mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						className: "mb-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-400",
						children: "Browse Templates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
						initial: {
							opacity: 0,
							y: 16
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .08 },
						className: "text-4xl font-black text-white sm:text-5xl",
						children: "Popular Categories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 10
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: { delay: .14 },
						className: "mt-3 text-white/50",
						children: "Find the perfect template for every special occasion"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
				children: categories.map((cat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: {
						once: true,
						margin: "-20px"
					},
					transition: {
						delay: i * .06,
						duration: .5,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: cat.href,
						className: "group flex flex-col items-center gap-3 rounded-2xl border border-white/[0.07] p-5 text-center transition-all duration-300 hover:scale-[1.05]",
						style: {
							background: "rgba(255,255,255,0.03)",
							backdropFilter: "blur(10px)"
						},
						onMouseEnter: (e) => {
							const el = e.currentTarget;
							el.style.borderColor = cat.color + "40";
							el.style.background = cat.color + "10";
							el.style.boxShadow = `0 8px 30px -8px ${cat.color}44`;
						},
						onMouseLeave: (e) => {
							const el = e.currentTarget;
							el.style.borderColor = "";
							el.style.background = "";
							el.style.boxShadow = "";
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110",
							style: {
								background: `${cat.color}18`,
								border: `1px solid ${cat.color}28`,
								boxShadow: `0 0 20px ${cat.color}20`
							},
							children: cat.isAll ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								className: "h-6 w-6",
								viewBox: "0 0 24 24",
								fill: "none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "3",
										y: "3",
										width: "7",
										height: "7",
										rx: "1",
										fill: cat.color,
										opacity: "0.8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "14",
										y: "3",
										width: "7",
										height: "7",
										rx: "1",
										fill: cat.color,
										opacity: "0.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "3",
										y: "14",
										width: "7",
										height: "7",
										rx: "1",
										fill: cat.color,
										opacity: "0.5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
										x: "14",
										y: "14",
										width: "7",
										height: "7",
										rx: "1",
										fill: cat.color,
										opacity: "0.8"
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.emoji })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-white",
							children: cat.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-[11px] text-white/35",
							children: [cat.isAll ? "100+" : cat.count, " Templates"]
						})] })]
					})
				}, cat.label))
			})]
		})
	});
}
function TemplateCard({ t, index }) {
	const [hov, setHov] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: favIds = [] } = useFavorites(user?.id);
	const toggleFav = useToggleFavorite();
	const isFav = favIds.includes(t.id);
	function handleCreate(e) {
		e.preventDefault();
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (t.kind === "external") navigate({
			to: "/editor/template/$templateId",
			params: { templateId: t.id }
		});
		else navigate({
			to: "/editor/new",
			search: { template: t.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 28
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-30px"
		},
		transition: {
			delay: index * .07,
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		onHoverStart: () => setHov(true),
		onHoverEnd: () => setHov(false),
		className: "group relative overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-300",
		style: {
			background: "rgba(255,255,255,0.03)",
			transform: hov ? "translateY(-6px)" : "translateY(0)",
			boxShadow: hov ? "0 20px 60px -15px rgba(139,92,246,0.35)" : "none",
			borderColor: hov ? "rgba(139,92,246,0.3)" : ""
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 overflow-hidden",
			style: { background: t.coverGradient },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: t.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: t.thumbnailUrl,
						alt: t.name,
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "text-5xl drop-shadow-xl select-none",
						animate: { scale: hov ? 1.15 : 1 },
						transition: { duration: .3 },
						children: t.accentEmoji
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 flex gap-1.5",
					children: [
						t.priceCents === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur",
							children: "FREE"
						}),
						t.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), " PRO"]
						}),
						t.kind === "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-pink-500/20 border border-pink-500/30 px-2.5 py-0.5 text-[10px] font-bold text-pink-400 backdrop-blur",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-2.5 w-2.5" }), " LIVE"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (user) toggleFav.mutate({
							templateId: t.id,
							userId: user.id,
							isFav
						});
					},
					className: "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur transition-all hover:scale-110",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", isFav ? "fill-rose-400 text-rose-400" : "text-white/70") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-3 left-3 rounded-full bg-black/30 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold capitalize text-white/80",
					children: t.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 right-3 flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-yellow-400 text-yellow-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-white/80",
						children: "4.9"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-white leading-tight",
						children: t.name
					}), t.priceCents > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "shrink-0 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-bold text-violet-400",
						children: ["Rs. ", t.priceCents.toLocaleString("en-PK")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-relaxed text-white/45 line-clamp-2",
					children: t.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-1.5",
					children: t.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/50",
						children: ["#", tag]
					}, tag))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleCreate,
						className: "rounded-xl py-2.5 text-center text-xs font-bold text-white transition-all hover:scale-[1.02]",
						style: {
							background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
							boxShadow: "0 4px 15px rgba(236,72,153,0.3)"
						},
						children: "Create page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates/$slug",
						params: { slug: t.slug },
						className: "flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-violet-500/8 hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Detail"]
					})]
				})
			]
		})]
	});
}
function FeaturedTemplates() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-3 sm:py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-col items-start justify-between gap-4 sm:mb-4 sm:flex-row sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: {
						opacity: 0,
						y: 10
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					className: "mb-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-400",
					children: "Our Collection"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
					initial: {
						opacity: 0,
						y: 14
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .08 },
					className: "text-4xl font-black text-white sm:text-5xl",
					children: "Featured Templates"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: { once: true },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates",
						className: "group flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:text-white",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: allUnifiedTemplates.slice(0, 6).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, {
					t,
					index: i
				}, t.id))
			})]
		})
	});
}
var features = [
	{
		icon: Music,
		title: "Background Music",
		desc: "Upload your custom track or choose ambient vinyl audio that plays seamlessly on open.",
		gradient: "from-violet-500 to-purple-600",
		bg: "rgba(139,92,246,0.10)",
		border: "rgba(139,92,246,0.20)"
	},
	{
		icon: Image,
		title: "Photo Gallery",
		desc: "Interactive masonry grids with full-screen lightbox modal and pinch-zoom.",
		gradient: "from-pink-500 to-rose-500",
		bg: "rgba(236,72,153,0.10)",
		border: "rgba(236,72,153,0.20)"
	},
	{
		icon: Lock,
		title: "PIN & Vault Protection",
		desc: "Lock secret messages with custom PIN codes or interactive 3D keypads.",
		gradient: "from-emerald-400 to-teal-500",
		bg: "rgba(52,211,153,0.10)",
		border: "rgba(52,211,153,0.20)"
	},
	{
		icon: Timer,
		title: "Live Countdown",
		desc: "Real-time date counters for upcoming weddings, birthdays, and anniversaries.",
		gradient: "from-amber-400 to-orange-500",
		bg: "rgba(251,191,36,0.10)",
		border: "rgba(251,191,36,0.20)"
	},
	{
		icon: Globe,
		title: "Custom Shareable URLs",
		desc: "Personalized clean links like /p/zara-rayan-wedding or /p/birthday-queen.",
		gradient: "from-cyan-400 to-sky-500",
		bg: "rgba(34,211,238,0.10)",
		border: "rgba(34,211,238,0.20)"
	},
	{
		icon: Smartphone,
		title: "Mobile First & Responsive",
		desc: "Flawless rendering on mobile, tablet, and desktop with zero horizontal overflow.",
		gradient: "from-fuchsia-500 to-pink-600",
		bg: "rgba(217,70,239,0.10)",
		border: "rgba(217,70,239,0.20)"
	},
	{
		icon: Palette,
		title: "Full Customization",
		desc: "Live sync editor for text, names, dates, colors, stories, and image galleries.",
		gradient: "from-violet-500 to-indigo-600",
		bg: "rgba(99,102,241,0.10)",
		border: "rgba(99,102,241,0.20)"
	},
	{
		icon: ChartNoAxesColumn,
		title: "Real-time Visitor Analytics",
		desc: "Track view counts, device types, and geographic location statistics.",
		gradient: "from-green-400 to-emerald-500",
		bg: "rgba(74,222,128,0.10)",
		border: "rgba(74,222,128,0.20)"
	},
	{
		icon: Sparkles,
		title: "Awwwards-Grade Effects",
		desc: "Confetti cannons, floating rose petals, glowing cursors, and 3D spring tilt cards.",
		gradient: "from-rose-400 to-pink-500",
		bg: "rgba(251,113,133,0.10)",
		border: "rgba(251,113,133,0.20)"
	}
];
var showcaseCards = [
	{
		category: "Wedding",
		title: "Wedding Eternal & Petals",
		subtitle: "Luxury & Glassmorphism Experience",
		tags: [
			"Luxury",
			"Glassmorphism",
			"Cinematic",
			"Modern",
			"Premium"
		],
		badge: "Most Popular",
		badgeColor: "from-amber-400 to-pink-500",
		gradient: "from-amber-500/20 via-pink-500/10 to-purple-900/30",
		borderColor: "rgba(251, 191, 36, 0.35)",
		icon: Crown,
		highlights: [
			"Royal navy & gold-gradient typography",
			"Falling rose petals & ambient cursor glow",
			"Chapter-by-chapter story timeline & countdown",
			"Interactive WhatsApp RSVP & guest registry"
		],
		slug: "wedding-eternal"
	},
	{
		category: "Birthday",
		title: "Birthday Surprise & Aurora",
		subtitle: "3D & Interactive Party Showcase",
		tags: [
			"3D",
			"Interactive",
			"Animated",
			"Modern",
			"Glassmorphism"
		],
		badge: "Awwwards Quality",
		badgeColor: "from-pink-500 to-violet-600",
		gradient: "from-purple-500/20 via-fuchsia-500/10 to-indigo-900/30",
		borderColor: "rgba(217, 70, 239, 0.35)",
		icon: Sparkles,
		highlights: [
			"Interactive 3D vault keypad lock",
			"Confetti burst animations & gift reveals",
			"Custom music player with lyrics display",
			"Dynamic birthday memory timeline"
		],
		slug: "birthday-surprise"
	},
	{
		category: "Anniversary",
		title: "Anniversary Galaxy & Romantic",
		subtitle: "Minimal & Cinematic Starfield",
		tags: [
			"Minimal",
			"Cinematic",
			"Interactive",
			"Luxury",
			"Premium"
		],
		badge: "Staff Pick",
		badgeColor: "from-cyan-400 to-blue-600",
		gradient: "from-cyan-500/20 via-blue-500/10 to-slate-900/30",
		borderColor: "rgba(34, 211, 238, 0.35)",
		icon: Heart,
		highlights: [
			"Dynamic 3D canvas particle starfield",
			"Interactive glowing love letter modal",
			"Interactive memory timeline with audio",
			"Romantic quote & milestone counter"
		],
		slug: "anniversary-galaxy"
	},
	{
		category: "Congratulations",
		title: "Congratulations Triumph",
		subtitle: "Cinematic 3D & Audio Celebration",
		tags: [
			"Cinematic",
			"3D",
			"Animated",
			"Interactive",
			"Awwwards-quality"
		],
		badge: "New Release",
		badgeColor: "from-emerald-400 to-teal-600",
		gradient: "from-emerald-500/20 via-teal-500/10 to-zinc-900/30",
		borderColor: "rgba(52, 211, 153, 0.35)",
		icon: Film,
		highlights: [
			"Interactive 3D envelope spring reveal",
			"Rotating vinyl record player with controls",
			"Particle orbit background with responsive scaling",
			"Achievement timeline & celebration reward card"
		],
		slug: "congratulations-triumph"
	}
];
function resolveGradientColors(gradient) {
	const colorMap = {
		"violet-500": "#8b5cf6",
		"purple-600": "#9333ea",
		"pink-500": "#ec4899",
		"rose-500": "#f43f5e",
		"emerald-400": "#34d399",
		"teal-500": "#14b8a6",
		"amber-400": "#fbbf24",
		"orange-500": "#f97316",
		"cyan-400": "#22d3ee",
		"sky-500": "#0ea5e9",
		"fuchsia-500": "#d946ef",
		"pink-600": "#db2777",
		"indigo-600": "#4f46e5",
		"green-400": "#4ade80",
		"emerald-500": "#10b981",
		"rose-400": "#fb7185"
	};
	const [from, to] = gradient.replace("from-", "").split(" to-");
	return [colorMap[from.trim()] ?? "#a78bfa", colorMap[to.trim()] ?? "#f472b6"];
}
function FeaturesShowcase() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-3 sm:py-4 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse 60% 55% at 10% 50%, rgba(124,58,237,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 45% at 90% 50%, rgba(244,114,182,0.11) 0%, transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 text-center sm:mb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "mb-2 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-400 tracking-wide uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Premium Platform Capabilities"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 18
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .1 },
							className: "text-3xl font-extrabold text-white sm:text-5xl tracking-tight",
							children: [
								"Crafted for",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										background: "linear-gradient(135deg, #a78bfa, #f472b6, #38bdf8)",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent"
									},
									children: "Extraordinary"
								}),
								" ",
								"Moments"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .18 },
							className: "mt-2 max-w-2xl mx-auto text-sm text-white/50",
							children: "Every template is built with Awwwards-level fidelity, interactive animations, and flawless mobile responsiveness."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-2xl font-bold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-5 w-5 text-amber-400" }), " Premium Template Showcase"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-white/50",
							children: "Explore signature themes designed for every celebration"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/templates",
							className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all",
							children: ["View All 16 Templates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-2",
						children: showcaseCards.map((card, idx) => {
							const IconComp = card.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 30
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: {
									once: true,
									margin: "-40px"
								},
								transition: {
									delay: idx * .1,
									duration: .7,
									ease: [
										.22,
										1,
										.36,
										1
									]
								},
								whileHover: { y: -6 },
								className: "group relative overflow-hidden rounded-3xl border p-7 transition-all duration-500",
								style: {
									background: `linear-gradient(145deg, rgba(20, 18, 42, 0.85), rgba(12, 10, 28, 0.95))`,
									borderColor: card.borderColor,
									boxShadow: "0 20px 50px -20px rgba(0, 0, 0, 0.7)",
									backdropFilter: "blur(16px)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 transition-opacity duration-500 group-hover:opacity-100`,
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur shadow-lg",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComp, { className: "h-6 w-6 text-pink-400" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold tracking-widest uppercase text-violet-400",
												children: card.category
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-xl font-extrabold text-white",
												children: card.title
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${card.badgeColor} px-3 py-1 text-[10px] font-bold text-white shadow-md`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), card.badge]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "relative z-10 mt-3 text-xs font-medium text-white/60",
										children: card.subtitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "relative z-10 mt-5 space-y-2",
										children: card.highlights.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2 text-xs text-white/75",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-3.5 w-3.5 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h })]
										}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative z-10 mt-6 flex flex-wrap gap-1.5",
										children: card.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/70 backdrop-blur",
											children: ["#", tag]
										}, tag))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-white/40",
											children: "Ready to customize"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/templates",
											className: "inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 group-hover:text-pink-300 transition-colors",
											children: ["Explore Theme ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })]
										})]
									})
								]
							}, card.title);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold text-white",
						children: "Platform Features & Controls"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-white/40 mt-1",
						children: "Built to give you total creative freedom with zero coding"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: features.map((f, i) => {
						const [c1, c2] = resolveGradientColors(f.gradient);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 24
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-30px"
							},
							transition: {
								delay: i * .06,
								duration: .6,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							whileHover: {
								y: -5,
								transition: { duration: .22 }
							},
							className: "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300",
							style: {
								background: f.bg,
								borderColor: "var(--glass-border)",
								backdropFilter: "blur(12px)"
							},
							onMouseEnter: (e) => {
								e.currentTarget.style.borderColor = f.border;
								e.currentTarget.style.boxShadow = `0 8px 40px -12px ${c1}55`;
							},
							onMouseLeave: (e) => {
								e.currentTarget.style.borderColor = "";
								e.currentTarget.style.boxShadow = "";
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
									style: {
										background: `linear-gradient(135deg, ${c1}, ${c2})`,
										boxShadow: `0 6px 20px -6px ${c1}66`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-5 w-5 text-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-2 text-base font-bold text-white",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: f.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-40",
									style: { background: `radial-gradient(circle, ${c1}, transparent)` }
								})
							]
						}, f.title);
					})
				})
			]
		})]
	});
}
var testimonials = [
	{
		name: "Sofia R.",
		role: "Anniversary page",
		avatar: "S",
		gradient: "from-violet-500 to-purple-600",
		rating: 5,
		body: "I created a beautiful anniversary page for my partner in under 10 minutes. He cried. The countdown timer and gallery made it feel like a real digital gift."
	},
	{
		name: "Marcus T.",
		role: "Birthday page",
		avatar: "M",
		gradient: "from-cyan-400 to-sky-500",
		rating: 5,
		body: "Sent this to my best friend for his 30th. The confetti on load and floating hearts made him text me immediately. 10/10 experience."
	},
	{
		name: "Priya K.",
		role: "Proposal page",
		avatar: "P",
		gradient: "from-pink-500 to-rose-500",
		rating: 5,
		body: "The Midnight Vow template was exactly what I needed. The typewriter effect building up to the question was perfect. She said yes!"
	},
	{
		name: "James L.",
		role: "Wedding invitation",
		avatar: "J",
		gradient: "from-amber-400 to-orange-500",
		rating: 5,
		body: "We replaced our paper invitations with the Ivory Vows template. Guests were blown away by the countdown and the RSVP button directly on the page."
	},
	{
		name: "Amelia C.",
		role: "Mother's Day",
		avatar: "A",
		gradient: "from-emerald-400 to-teal-500",
		rating: 5,
		body: "Used Paper Trail for Mother's Day. The written letter section and the photo grid brought my mom to tears. Worth every penny — I'll use this every year."
	},
	{
		name: "Ryo N.",
		role: "Long-distance surprise",
		avatar: "R",
		gradient: "from-fuchsia-500 to-pink-600",
		rating: 5,
		body: "My girlfriend is in Tokyo. I sent her a custom page with our timeline and music. The PIN protection made it feel like unwrapping a real gift."
	}
];
function StarRow() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-0.5",
		children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-amber-400 text-amber-400" }, i))
	});
}
function TestimonialsSection() {
	const scrollRef = (0, import_react.useRef)(null);
	function handleScroll(dir) {
		if (scrollRef.current) scrollRef.current.scrollBy({
			left: dir === "left" ? -300 : 300,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden py-3 sm:py-4",
		id: "reviews",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(244,114,182,0.08) 0%, transparent 70%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-col items-center justify-between gap-3 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center sm:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							className: "mb-2 inline-flex items-center gap-2 rounded-full border border-pink-500/25 bg-pink-500/8 px-3.5 py-1 text-xs font-semibold text-pink-400",
							children: "❤️ Loved by thousands"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h2, {
							initial: {
								opacity: 0,
								y: 18
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: { delay: .08 },
							className: "text-3xl font-bold sm:text-4xl text-white",
							children: [
								"Real stories,",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										background: "linear-gradient(135deg, #f472b6, #fb7185)",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent"
									},
									children: "real smiles"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleScroll("left"),
							className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur transition-all hover:bg-white/10 hover:text-white active:scale-95",
							"aria-label": "Scroll left",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => handleScroll("right"),
							className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 backdrop-blur transition-all hover:bg-white/10 hover:text-white active:scale-95",
							"aria-label": "Scroll right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollRef,
					className: "flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
					children: testimonials.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .05,
							duration: .4
						},
						whileHover: {
							y: -4,
							transition: { duration: .2 }
						},
						className: "relative shrink-0 w-[260px] sm:w-[290px] snap-start overflow-hidden rounded-2xl border border-white/10 p-4 sm:p-5 transition-all duration-300 hover:border-pink-500/30",
						style: {
							background: "linear-gradient(160deg, rgba(167,139,250,0.06) 0%, rgba(244,114,182,0.03) 100%)",
							backdropFilter: "blur(14px)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full blur-xl opacity-30",
								style: { background: `linear-gradient(135deg, ${t.gradient.replace("from-", "").split(" to-")[0].trim()}, transparent)`.replace(/([a-z]+-\d+)/g, (m) => {
									return {
										"violet-500": "#8b5cf6",
										"cyan-400": "#22d3ee",
										"pink-500": "#ec4899",
										"amber-400": "#fbbf24",
										"emerald-400": "#34d399",
										"fuchsia-500": "#d946ef"
									}[m] ?? "#a78bfa";
								}) }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-4 w-4 opacity-30 text-pink-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarRow, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs leading-relaxed text-white/70 line-clamp-4 min-h-[4rem]",
								children: [
									"“",
									t.body,
									"”"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-center gap-2.5 border-t border-white/[0.06] pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white",
									style: { background: `linear-gradient(135deg, ${t.gradient.replace("from-", "").split(" to-")[0].trim()}, ${t.gradient.split(" to-")[1].trim()})`.replace(/([a-z]+-\d+)/g, (m) => {
										return {
											"violet-500": "#8b5cf6",
											"purple-600": "#9333ea",
											"cyan-400": "#22d3ee",
											"sky-500": "#0ea5e9",
											"pink-500": "#ec4899",
											"rose-500": "#f43f5e",
											"amber-400": "#fbbf24",
											"orange-500": "#f97316",
											"emerald-400": "#34d399",
											"teal-500": "#14b8a6",
											"fuchsia-500": "#d946ef",
											"pink-600": "#db2777"
										}[m] ?? "#a78bfa";
									}) },
									children: t.avatar
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-bold text-white",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[10px] text-white/40",
										children: t.role
									})]
								})]
							})
						]
					}, t.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .2 },
					className: "mt-6 flex flex-wrap items-center justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center -space-x-2",
						children: [
							"S",
							"M",
							"P",
							"J",
							"A",
							"R"
						].map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-7 w-7 items-center justify-center rounded-full border border-background text-[10px] font-bold text-white",
							style: { background: [
								"linear-gradient(135deg,#8b5cf6,#9333ea)",
								"linear-gradient(135deg,#22d3ee,#0ea5e9)",
								"linear-gradient(135deg,#ec4899,#f43f5e)",
								"linear-gradient(135deg,#fbbf24,#f97316)",
								"linear-gradient(135deg,#34d399,#14b8a6)",
								"linear-gradient(135deg,#d946ef,#db2777)"
							][i] },
							children: l
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							[...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }, i)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-1 text-xs font-bold text-white",
								children: "4.9/5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-white/40",
								children: "· from 2,400+ verified reviews"
							})
						]
					})]
				})
			]
		})]
	});
}
function HomePage() {
	useAuth();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		style: { background: "#0a0914" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturedTemplates, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeaturesShowcase, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialsSection, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { HomePage as component };
