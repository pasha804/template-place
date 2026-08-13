import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { C as Sparkles, Et as Funnel, I as Search, a as WandSparkles, i as X, yt as Heart } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as Footer } from "./Footer-BTWP9whH.mjs";
import { i as useToggleFavorite, r as useFavorites, t as allUnifiedTemplates } from "./combined-BKJH_seF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-nErJ5yCb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var sortOptions = [
	{
		value: "trending",
		label: "Trending"
	},
	{
		value: "newest",
		label: "Newest"
	},
	{
		value: "free",
		label: "Free first"
	},
	{
		value: "premium",
		label: "Premium"
	}
];
function TemplateCard({ t, isFav, onFav }) {
	const [hov, setHov] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
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
		layout: true,
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			scale: .95
		},
		transition: {
			duration: .45,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		onHoverStart: () => setHov(true),
		onHoverEnd: () => setHov(false),
		className: "group relative overflow-hidden rounded-3xl border border-white/[0.07] transition-all duration-300",
		style: {
			background: "rgba(255,255,255,0.03)",
			transform: hov ? "translateY(-6px)" : "translateY(0)",
			boxShadow: hov ? "0 20px 70px -18px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.2)" : "0 2px 12px -4px rgba(0,0,0,0.3)",
			borderColor: hov ? "rgba(139,92,246,0.25)" : ""
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 overflow-hidden",
			style: { background: t.coverGradient },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/0 transition-all duration-300",
					style: { backgroundColor: hov ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 flex items-center justify-center",
					children: t.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: t.thumbnailUrl,
						alt: t.name,
						className: "w-full h-full object-cover",
						style: { opacity: hov ? .85 : .7 }
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
						className: "text-5xl drop-shadow-2xl select-none",
						animate: { scale: hov ? 1.15 : 1 },
						transition: { duration: .3 },
						children: t.accentEmoji
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 flex gap-1.5",
					children: [
						t.priceCents === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-black/35 backdrop-blur border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400",
							children: "FREE"
						}),
						t.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-black/35 backdrop-blur border border-amber-500/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-2.5 w-2.5" }), " PRO"]
						}),
						t.kind === "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-black/35 backdrop-blur border border-pink-500/40 px-2.5 py-0.5 text-[10px] font-bold text-pink-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-2.5 w-2.5" }), " LIVE"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onFav,
					className: "absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur transition-all hover:scale-110",
					"aria-label": isFav ? "Remove from favorites" : "Add to favorites",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4 transition-all", isFav ? "fill-rose-400 text-rose-400" : "text-white/70") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute bottom-3 left-3 rounded-full bg-black/30 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold capitalize text-white/80",
					children: t.category
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold leading-tight text-white",
						children: t.name
					}), t.priceCents > 0 && !t.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
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
						children: t.kind === "external" ? "Create Now ✨" : "Create page"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/templates/$slug",
						params: { slug: t.slug },
						className: "flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:text-white",
						children: "Detail"
					})]
				})
			]
		})]
	});
}
function TemplatesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("trending");
	const user = useAuthStore((s) => s.user);
	const { data: favIds = [] } = useFavorites(user?.id);
	const toggleFav = useToggleFavorite();
	const navigate = useNavigate();
	const categories = (0, import_react.useMemo)(() => {
		return ["all", ...[...new Set(allUnifiedTemplates.map((t) => t.category))]];
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		let list = [...allUnifiedTemplates];
		if (search) {
			const q = search.toLowerCase();
			list = list.filter((t) => t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q) || t.tags.some((tag) => tag.includes(q)));
		}
		if (category !== "all") list = list.filter((t) => t.category === category);
		if (sort === "free") list.sort((a, b) => a.priceCents - b.priceCents);
		else if (sort === "premium") list.sort((a, b) => b.priceCents - a.priceCents);
		return list;
	}, [
		search,
		category,
		sort
	]);
	function handleFav(id) {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		toggleFav.mutate({
			templateId: id,
			userId: user.id,
			isFav: favIds.includes(id)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		style: { background: "#0a0914" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-0",
							style: { background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.20) 0%, transparent 65%)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "pointer-events-none absolute inset-0 opacity-[0.025]",
							style: {
								backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)",
								backgroundSize: "48px 48px"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto max-w-3xl px-4",
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
									className: "mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-4 py-1.5 text-xs font-semibold text-violet-400",
									children: [allUnifiedTemplates.length, "+ templates available"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									initial: {
										opacity: 0,
										y: 20
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: .08 },
									className: "text-5xl font-black text-white sm:text-6xl",
									children: [
										"Find your",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												background: "linear-gradient(135deg,#a78bfa,#f472b6)",
												WebkitBackgroundClip: "text",
												backgroundClip: "text",
												color: "transparent"
											},
											children: "perfect"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"template"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: {
										opacity: 0,
										y: 12
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: .16 },
									className: "mt-4 text-lg text-white/45",
									children: "Choose a template and create your dedication in minutes"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex flex-col gap-3 sm:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: search,
										onChange: (e) => setSearch(e.target.value),
										placeholder: "Search templates...",
										className: "w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] pl-11 pr-10 py-3.5 text-sm text-white/80 outline-none backdrop-blur transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 placeholder:text-white/25"
									}),
									search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setSearch(""),
										className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: sort,
									onChange: (e) => setSort(e.target.value),
									className: "appearance-none rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-3.5 pr-10 text-sm text-white/70 outline-none backdrop-blur focus:border-violet-500/50 cursor-pointer",
									children: sortOptions.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: o.value,
										className: "bg-[#0f0d24]",
										children: o.label
									}, o.value))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-8 flex flex-wrap gap-2",
							children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCategory(cat),
								className: cn("rounded-full px-4 py-2 text-xs font-semibold capitalize transition-all duration-200", category === cat ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]" : "border border-white/[0.07] bg-white/[0.04] text-white/45 hover:border-violet-500/30 hover:text-white/70"),
								children: cat
							}, cat))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-6 text-sm text-white/30",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-white/70",
									children: filtered.length
								}),
								" ",
								filtered.length === 1 ? "template" : "templates",
								search && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									" for \"",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-violet-400",
										children: search
									}),
									"\""
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "popLayout",
							children: filtered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layout: true,
								className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
								children: filtered.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateCard, {
									t,
									isFav: favIds.includes(t.id),
									onFav: () => handleFav(t.id)
								}, t.id))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								className: "flex flex-col items-center justify-center py-28 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mb-4 text-5xl",
										children: "🔍"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-white",
										children: "No templates found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-white/40",
										children: "Try a different search term or clear your filters."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setSearch("");
											setCategory("all");
										},
										className: "mt-5 rounded-2xl border border-violet-500/25 bg-violet-500/8 px-6 py-3 text-sm font-semibold text-violet-400 transition-all hover:bg-violet-500/15",
										children: "Clear filters"
									})
								]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { TemplatesPage as component };
