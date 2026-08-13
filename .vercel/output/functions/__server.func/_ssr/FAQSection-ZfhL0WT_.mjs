import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { Jt as Check, W as Plus, n as Zap, nt as Minus, zt as Crown } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FAQSection-ZfhL0WT_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plans = [{
	id: "package1",
	tier: "Package 1",
	price: "Rs. 1,000",
	period: "",
	tagline: "Perfect for a one-time surprise",
	icon: Zap,
	iconColor: "#a78bfa",
	gradient: "from-violet-500/15 to-purple-600/8",
	border: "rgba(167,139,250,0.2)",
	glow: "rgba(167,139,250,0.25)",
	features: [
		"1 personalized page",
		"Full customization via editor",
		"WhatsApp sharing link",
		"Standard support"
	],
	cta: "Get Started",
	ctaHref: "/auth/signup",
	highlight: false
}, {
	id: "package2",
	tier: "Package 2",
	price: "Rs. 2,000",
	period: "",
	tagline: "Everything included, priority delivery",
	icon: Crown,
	iconColor: "#f59e0b",
	gradient: "from-amber-500/20 to-orange-500/10",
	border: "rgba(251,191,36,0.3)",
	glow: "rgba(251,191,36,0.35)",
	badge: "Most Popular",
	features: [
		"1 personalized page",
		"Full customization via editor",
		"Custom URL slug",
		"Priority support",
		"VIP delivery"
	],
	cta: "Get Package 2",
	ctaHref: "/auth/signup",
	highlight: true
}];
function PricingSection() {
	const [hovered, setHovered] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-3 sm:py-4 overflow-hidden",
		id: "pricing",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(124,58,237,0.14) 0%, transparent 70%)" }
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
							children: "Simple Pricing"
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
							children: "Two packages. That's it."
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
							children: "All prices in PKR. Pay once, your page goes live after admin approval."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-3xl gap-6 sm:grid-cols-2",
					children: plans.map((plan, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 28
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						viewport: { once: true },
						transition: {
							delay: i * .12,
							duration: .65,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						onMouseEnter: () => setHovered(plan.id),
						onMouseLeave: () => setHovered(null),
						className: cn("relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500", plan.highlight && "sm:scale-[1.04] shadow-[0_0_80px_-20px_rgba(251,191,36,0.4)]"),
						style: {
							backgroundImage: plan.highlight ? "linear-gradient(160deg, rgba(245,158,11,0.12) 0%, rgba(249,115,22,0.06) 100%)" : "linear-gradient(160deg, rgba(139,92,246,0.10) 0%, rgba(147,51,234,0.05) 100%)",
							borderColor: hovered === plan.id || plan.highlight ? plan.border : "var(--glass-border)",
							boxShadow: plan.highlight ? `0 0 0 1px ${plan.border}, 0 20px 80px -20px ${plan.glow}` : hovered === plan.id ? `0 0 0 1px ${plan.border}, 0 12px 50px -16px ${plan.glow}` : "none"
						},
						children: [plan.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -top-0 left-0 right-0 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-b-xl bg-gradient-to-r from-amber-400 to-yellow-300 px-4 py-1 text-[10px] font-black uppercase tracking-wider text-black shadow-lg",
								children: plan.badge
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("flex flex-col flex-1", plan.badge && "pt-5"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex h-11 w-11 items-center justify-center rounded-xl",
										style: {
											background: plan.iconColor + "20",
											border: `1px solid ${plan.iconColor}30`
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(plan.icon, {
											className: "h-5 w-5",
											style: { color: plan.iconColor }
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-bold",
										children: plan.tier
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-baseline gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl font-black",
										style: {
											background: plan.highlight ? "linear-gradient(135deg, #f59e0b, #fbbf24)" : `linear-gradient(135deg, ${plan.iconColor}, ${plan.iconColor}cc)`,
											WebkitBackgroundClip: "text",
											backgroundClip: "text",
											color: "transparent"
										},
										children: plan.price
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted-foreground",
										children: "PKR"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-6 text-sm text-muted-foreground",
									children: plan.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-5 h-px w-full",
									style: { background: plan.border }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mb-8 flex-1 space-y-3",
									children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
											style: { background: plan.iconColor + "20" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												className: "h-3 w-3",
												style: { color: plan.iconColor }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: f
										})]
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: plan.ctaHref,
									className: "block w-full rounded-2xl py-4 text-center text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98]",
									style: plan.highlight ? {
										background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
										color: "#000",
										boxShadow: "0 8px 30px -8px rgba(251,191,36,0.5)"
									} : {
										background: plan.iconColor + "15",
										color: plan.iconColor,
										border: `1px solid ${plan.iconColor}30`
									},
									children: plan.cta
								})
							]
						})]
					}, plan.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: { once: true },
					transition: { delay: .4 },
					className: "mt-10 text-center text-xs text-muted-foreground",
					children: "All pages include SSL security, mobile-responsive design, and 99.9% uptime. Payment via EasyPaisa · Bank Transfer · PayPal."
				})
			]
		})]
	});
}
var faqs = [
	{
		q: "How long does it take to create a page?",
		a: "Most pages are ready in under 5 minutes. Choose a template, fill in your names, upload a photo, and you're done. The platform handles the design, animations, and hosting automatically."
	},
	{
		q: "Do I need to create an account?",
		a: "You need a free account to save and publish your page. Registration takes under 30 seconds with just an email and password."
	},
	{
		q: "Can I add a password or PIN to my page?",
		a: "Yes. Every page supports optional password protection and a 4–6 digit PIN lock. Only people with the correct code can view the page — perfect for intimate surprises."
	},
	{
		q: "What happens after the page expires?",
		a: "Expired pages are deactivated but never deleted. You can renew them at any time from your dashboard to restore full access and sharing."
	},
	{
		q: "Can I add my own music and photos?",
		a: "Absolutely. Premium templates support your own audio file and up to 10 images. The visual editor has a built-in uploader with crop and resize tools."
	},
	{
		q: "Is the link permanent?",
		a: "Permanent page plans give you a link that never expires. Monthly plans renew the page each billing cycle. Free pages last 7 days."
	},
	{
		q: "Can I see who visited my page?",
		a: "Yes. Your dashboard shows real-time visitor counts, countries, devices, and referrer sources for every published page."
	},
	{
		q: "Do you support multiple languages?",
		a: "The editor and templates fully support any language. Simply type in your language and the template renders it beautifully. Platform UI is English-first with more locales coming."
	}
];
function FAQSection() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative py-3 sm:py-4 overflow-hidden",
		id: "faq",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0",
			style: { background: "radial-gradient(ellipse 55% 50% at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 65%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-3xl px-4 sm:px-6",
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
							children: "Got questions?"
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
							className: "text-3xl font-black text-white sm:text-4xl",
							children: [
								"Frequently asked",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										background: "linear-gradient(135deg, #a78bfa, #f472b6)",
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent"
									},
									children: "questions"
								})
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
							className: "mt-2 text-sm text-white/50",
							children: "Everything you need to know before you start creating"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: faqs.map((faq, i) => {
						const isOpen = open === i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: { once: true },
							transition: {
								delay: i * .04,
								duration: .5
							},
							className: cn("overflow-hidden rounded-2xl border transition-all duration-300", isOpen ? "border-primary/30 shadow-[0_0_30px_-10px_rgba(167,139,250,0.3)]" : "border-[var(--glass-border)] hover:border-primary/20"),
							style: {
								background: isOpen ? "linear-gradient(160deg, rgba(167,139,250,0.08) 0%, rgba(244,114,182,0.04) 100%)" : "var(--gradient-card)",
								backdropFilter: "blur(12px)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
								onClick: () => setOpen(isOpen ? null : i),
								"aria-expanded": isOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-sm font-semibold leading-snug transition-colors", isOpen ? "text-white" : "text-white/80"),
									children: faq.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300", isOpen ? "border-primary/40 bg-primary/15 text-primary rotate-0" : "border-white/10 text-white/50"),
									children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								initial: false,
								children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										height: 0,
										opacity: 0
									},
									animate: {
										height: "auto",
										opacity: 1
									},
									exit: {
										height: 0,
										opacity: 0
									},
									transition: {
										duration: .28,
										ease: [
											.22,
											1,
											.36,
											1
										]
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "border-t border-primary/10 px-6 pb-5 pt-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-white/60",
											children: faq.a
										})
									})
								})
							})]
						}, i);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: .3 },
					className: "mt-12 rounded-3xl border border-[var(--glass-border)] p-8 text-center",
					style: {
						background: "var(--gradient-card)",
						backdropFilter: "blur(16px)"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold text-white",
							children: "Still have questions?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-white/60",
							children: "Our team replies within 24 hours — always human, never a bot."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/contact",
							className: "mt-5 inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary/8 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/15 hover:scale-[1.02]",
							children: "Contact support →"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { PricingSection as n, FAQSection as t };
