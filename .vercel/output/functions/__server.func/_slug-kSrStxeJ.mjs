import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { c as motion } from "./_libs/framer-motion.mjs";
import { C as Sparkles, G as Play, Jt as Check, a as WandSparkles, rn as ArrowLeft, ut as Lock, yt as Heart } from "./_libs/lucide-react.mjs";
import { s as getExternalTemplateBySlug } from "./_ssr/registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./_ssr/auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Navbar } from "./_ssr/Navbar-wFLacLti.mjs";
import { t as Footer } from "./_ssr/Footer-BTWP9whH.mjs";
import { t as Route } from "./_slug-Ck9zeZD4.mjs";
import { i as useToggleFavorite, n as getUnifiedTemplate, r as useFavorites } from "./_ssr/combined-BKJH_seF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-kSrStxeJ.js
var import_jsx_runtime = require_jsx_runtime();
function TemplateDetailPage() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: favIds = [] } = useFavorites(user?.id);
	const toggleFav = useToggleFavorite();
	const unified = getUnifiedTemplate(slug);
	unified?.kind === "external" && getExternalTemplateBySlug(slug);
	if (!unified) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col",
		style: { background: "#0a0914" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex flex-1 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-5xl",
							children: "😕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold text-white",
							children: "Template not found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/templates",
							className: "mt-4 inline-block text-violet-400 hover:underline",
							children: "Browse all templates"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
	const isFav = favIds.includes(unified.id);
	function handleFav() {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (!unified) return;
		toggleFav.mutate({
			templateId: unified.id,
			userId: user.id,
			isFav
		});
	}
	function handleCreate() {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (!unified) return;
		if (unified.kind === "external") navigate({
			to: "/editor/template/$templateId",
			params: { templateId: unified.id }
		});
		else navigate({
			to: "/editor/new",
			search: { template: unified.id }
		});
	}
	function handleDemo() {
		if (!unified) return;
		window.open(`/demo/${unified.slug}`, "_blank");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		style: { background: "#0a0914" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/templates",
						className: "mb-8 flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to templates"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-10 lg:grid-cols-[420px_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:sticky lg:top-28 lg:self-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: -20
								},
								animate: {
									opacity: 1,
									x: 0
								},
								transition: { duration: .6 },
								className: "overflow-hidden rounded-3xl border border-white/[0.08]",
								style: {
									background: "rgba(255,255,255,0.03)",
									backdropFilter: "blur(16px)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-24 w-full items-center justify-center overflow-hidden",
									style: { background: unified.coverGradient },
									children: unified.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: unified.thumbnailUrl,
										alt: unified.name,
										className: "h-full w-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-5xl",
										children: unified.accentEmoji
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3 mb-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 mb-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "text-xl font-bold text-white",
													children: unified.name
												}), unified.kind === "external" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold text-pink-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-2.5 w-2.5" }), " LIVE"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm capitalize text-white/40",
												children: unified.category
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: handleFav,
												className: cn("flex h-10 w-10 items-center justify-center rounded-xl border transition-all hover:scale-110", isFav ? "border-red-500/30 bg-red-500/10" : "border-white/10 hover:border-red-500/30"),
												"aria-label": isFav ? "Remove from favorites" : "Add to favorites",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("h-4 w-4", isFav ? "fill-red-400 text-red-400" : "text-white/40") })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm leading-relaxed text-white/45 mb-4",
											children: unified.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-1.5 mb-5",
											children: unified.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] text-violet-400",
												children: ["#", tag]
											}, tag))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline gap-2 mb-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-3xl font-black",
												style: {
													background: "linear-gradient(135deg,#a78bfa,#f472b6)",
													WebkitBackgroundClip: "text",
													backgroundClip: "text",
													color: "transparent"
												},
												children: unified.priceCents === 0 ? "Free" : `Rs. ${unified.priceCents.toLocaleString("en-PK")}`
											}), unified.isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 text-xs font-bold text-amber-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Premium"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2 mb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: handleCreate,
												className: "flex-1 rounded-2xl py-4 text-sm font-black text-white transition-all hover:scale-[1.02]",
												style: {
													background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
													boxShadow: "0 0 24px rgba(236,72,153,0.35)"
												},
												children: unified.kind === "external" ? "Create Now ✨" : "Create my page →"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleDemo,
												className: "flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-4 text-sm font-semibold text-white/70 hover:bg-white/[0.10] hover:text-white transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" }), " Demo"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-5 text-xs text-white/25",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-emerald-400" }), " No code"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3 w-3 text-emerald-400" }), " SSL secure"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WandSparkles, { className: "h-3 w-3 text-violet-400" }), " Instant preview"]
												})
											]
										})
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-3xl border border-white/[0.07]",
							style: {
								aspectRatio: "16/9",
								background: unified.coverGradient,
								boxShadow: "0 0 60px rgba(0,0,0,0.6)"
							},
							children: unified.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: unified.thumbnailUrl,
								alt: unified.name,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-8xl",
								children: unified.accentEmoji
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3 sm:grid-cols-2",
							children: unified.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-white/70",
									children: f
								})]
							}, f))
						})] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { TemplateDetailPage as component };
