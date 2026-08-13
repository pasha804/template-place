import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ft as ExternalLink, Nt as Eye, S as SquarePen, Vt as Clock, W as Plus, Wt as CircleAlert, g as Trash2, h as TrendingUp, kt as FileText } from "../_libs/lucide-react.mjs";
import { o as getExternalTemplate } from "./registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useUserPages, n as useDeletePage } from "./use-pages-DEg-ttb2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CL8wSKRw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpirationTimer({ expiresAt, pageSlug }) {
	const [timeLeft, setTimeLeft] = (0, import_react.useState)("");
	const [isExpired, setIsExpired] = (0, import_react.useState)(false);
	const [urgency, setUrgency] = (0, import_react.useState)("safe");
	(0, import_react.useEffect)(() => {
		if (!expiresAt) {
			setTimeLeft("Never expires");
			return;
		}
		const calculateTimeLeft = () => {
			const now = (/* @__PURE__ */ new Date()).getTime();
			const diff = new Date(expiresAt).getTime() - now;
			if (diff <= 0) {
				setIsExpired(true);
				setTimeLeft("Expired");
				return;
			}
			const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
			const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
			const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
			if (days === 0) setUrgency("critical");
			else if (days <= 3) setUrgency("warning");
			else setUrgency("safe");
			if (days > 0) setTimeLeft(`${days}d ${hours}h ${minutes}m`);
			else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m`);
			else setTimeLeft(`${minutes}m`);
		};
		calculateTimeLeft();
		const interval = setInterval(calculateTimeLeft, 6e4);
		return () => clearInterval(interval);
	}, [expiresAt]);
	if (!expiresAt) return null;
	const colors = {
		safe: {
			bg: "bg-emerald-500/10",
			text: "text-emerald-400",
			border: "border-emerald-500/20"
		},
		warning: {
			bg: "bg-amber-500/10",
			text: "text-amber-400",
			border: "border-amber-500/20"
		},
		critical: {
			bg: "bg-red-500/10",
			text: "text-red-400",
			border: "border-red-500/20"
		}
	};
	const style = isExpired ? colors.critical : colors[urgency];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${style.bg} ${style.text} ${style.border}`,
		children: isExpired ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expired - Website removed" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Expires in: ", timeLeft] })] })
	});
}
var statusStyle = {
	draft: {
		color: "#fbbf24",
		bg: "rgba(251,191,36,0.12)",
		border: "rgba(251,191,36,0.25)"
	},
	published: {
		color: "#34d399",
		bg: "rgba(52,211,153,0.12)",
		border: "rgba(52,211,153,0.25)"
	},
	expired: {
		color: "#f87171",
		bg: "rgba(248,113,113,0.12)",
		border: "rgba(248,113,113,0.25)"
	},
	archived: {
		color: "#8b87b8",
		bg: "rgba(139,135,184,0.10)",
		border: "rgba(139,135,184,0.20)"
	},
	pending_approval: {
		color: "#fb923c",
		bg: "rgba(251,146,60,0.12)",
		border: "rgba(251,146,60,0.25)"
	}
};
function safeFormatDate(dateStr, fmt = "MMM d, yyyy") {
	if (!dateStr) return "Recently";
	try {
		const d = new Date(dateStr);
		if (isNaN(d.getTime())) return "Recently";
		return format(d, fmt);
	} catch {
		return "Recently";
	}
}
function PageCard({ page }) {
	const deletePage = useDeletePage();
	const user = useAuthStore((s) => s.user);
	const st = statusStyle[page.status] ?? statusStyle.draft;
	async function handleDelete() {
		if (!user || !confirm("Delete this page? This cannot be undone.")) return;
		await deletePage.mutateAsync({
			id: page.id,
			userId: user.id
		});
		toast.success("Page deleted");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 16
		},
		animate: {
			opacity: 1,
			y: 0
		},
		whileHover: {
			y: -3,
			transition: { duration: .2 }
		},
		className: "group relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-5 transition-all duration-300",
		style: {
			background: "linear-gradient(160deg, rgba(167,139,250,0.06) 0%, rgba(244,114,182,0.03) 100%)",
			backdropFilter: "blur(12px)"
		},
		onMouseEnter: (e) => {
			e.currentTarget.style.borderColor = "rgba(167,139,250,0.25)";
			e.currentTarget.style.boxShadow = "0 8px 40px -12px rgba(167,139,250,0.25)";
		},
		onMouseLeave: (e) => {
			e.currentTarget.style.borderColor = "";
			e.currentTarget.style.boxShadow = "";
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-0 h-px",
				style: { background: `linear-gradient(90deg, transparent, ${st.color}55, transparent)` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold truncate",
							children: page.title || "Untitled Page"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize",
							style: {
								color: st.color,
								background: st.bg,
								borderColor: st.border
							},
							children: page.status === "pending_approval" ? "Pending Approval" : page.status || "draft"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground truncate",
						children: ["/p/", page.slug || page.id]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [
						getExternalTemplate(page.template_id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/editor/template/$templateId",
							params: { templateId: page.template_id },
							search: { pageId: page.id },
							className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-primary/12 hover:text-primary",
							"aria-label": "Edit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/editor/$pageId",
							params: { pageId: page.id },
							className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-primary/12 hover:text-primary",
							"aria-label": "Edit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
						}),
						page.status === "published" && page.slug && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/p/$slug",
							params: { slug: page.slug },
							target: "_blank",
							className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-cyan-500/12 hover:text-cyan-400",
							"aria-label": "View live",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleDelete,
							className: "flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-red-500/12 hover:text-red-400 opacity-0 group-hover:opacity-100",
							"aria-label": "Delete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
							className: "h-3.5 w-3.5",
							style: { color: st.color }
						}),
						(page.view_count || 0).toLocaleString(),
						" views"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), safeFormatDate(page.updated_at)]
				})]
			}),
			page.status === "published" && page.expires_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpirationTimer, {
					expiresAt: page.expires_at,
					pageSlug: page.slug || page.id
				})
			})
		]
	});
}
function DashboardPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: pages = [], isLoading } = useUserPages(user?.id);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const stats = {
		total: pages.length,
		published: pages.filter((p) => p.status === "published").length,
		totalViews: pages.reduce((s, p) => s + (Number(p.view_count) || 0), 0),
		drafts: pages.filter((p) => p.status === "draft").length
	};
	const statCards = [
		{
			label: "Total pages",
			value: stats.total,
			icon: FileText,
			c1: "#8b5cf6",
			c2: "#9333ea"
		},
		{
			label: "Published",
			value: stats.published,
			icon: TrendingUp,
			c1: "#34d399",
			c2: "#14b8a6"
		},
		{
			label: "Total views",
			value: stats.totalViews,
			icon: Eye,
			c1: "#22d3ee",
			c2: "#0ea5e9"
		},
		{
			label: "Drafts",
			value: stats.drafts,
			icon: Clock,
			c1: "#fbbf24",
			c2: "#f97316"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-black",
							children: "My Panel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Manage your pages, plans and payments"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/templates",
							className: "group flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Create page"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4",
						children: statCards.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .07 },
							className: "relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-5",
							style: {
								background: `linear-gradient(160deg, ${s.c1}10 0%, ${s.c2}06 100%)`,
								backdropFilter: "blur(12px)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-0 top-0 h-px",
								style: { background: `linear-gradient(90deg, transparent, ${s.c1}50, transparent)` }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-3xl font-black",
									style: {
										background: `linear-gradient(135deg, ${s.c1}, ${s.c2})`,
										WebkitBackgroundClip: "text",
										backgroundClip: "text",
										color: "transparent"
									},
									children: s.value.toLocaleString()
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-2xl",
									style: {
										background: `${s.c1}18`,
										border: `1px solid ${s.c1}25`
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
										className: "h-5 w-5",
										style: { color: s.c1 }
									})
								})]
							})]
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-lg font-bold",
							children: [
								"My pages (",
								pages.length,
								")"
							]
						}), pages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard/pages",
							className: "text-xs text-primary hover:underline",
							children: "View list →"
						})]
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-32 animate-pulse rounded-3xl border border-[var(--glass-border)]",
							style: { background: "rgba(167,139,250,0.04)" }
						}, i))
					}) : pages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--glass-border)] py-24 text-center",
						style: { background: "rgba(167,139,250,0.02)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-5 flex h-16 w-16 items-center justify-center rounded-3xl",
								style: {
									background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.10))",
									border: "1px solid rgba(167,139,250,0.2)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-8 w-8 text-primary" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold",
								children: "You have no pages yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Create your first personalized page in minutes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/templates",
								className: "mt-6 flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Create my first page"]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: pages.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .04 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageCard, { page: p })
						}, p.id))
					})
				]
			})]
		})]
	});
}
//#endregion
export { DashboardPage as component };
