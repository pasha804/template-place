import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ht as CircleX, Lt as DollarSign, O as ShoppingCart, Ut as CircleCheck, Vt as Clock, kt as FileText, l as Users, xt as Globe } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as formatPKR, r as useAdminStats } from "./use-orders-C6K1Wbrl.mjs";
import { t as AdminNav } from "./AdminNav-D3fACHiq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DeEfSP3w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Hook to periodically check and clean up expired pages
* Runs on the client side as a backup to the server-side cron job
*/
function useExpirationCleanup() {
	const user = useAuthStore((s) => s.user);
	const isAdmin = user?.role === "admin" || user?.role === "super_admin";
	(0, import_react.useEffect)(() => {
		if (!isAdmin) return;
		const checkExpiredPages = async () => {
			try {
				await supabase.rpc("delete_expired_pages");
				console.log("[Expiration Cleanup] Checked for expired pages");
			} catch (error) {
				console.error("[Expiration Cleanup] Error:", error);
			}
		};
		checkExpiredPages();
		const interval = setInterval(checkExpiredPages, 3600 * 1e3);
		return () => clearInterval(interval);
	}, [isAdmin]);
}
/**
* Admin Dashboard — /admin
* Only accessible to users with role "admin" or "moderator".
*/
function AdminDashboard() {
	const navigate = useNavigate();
	const { user, isAdmin } = useAuthStore();
	const { data: stats, isLoading } = useAdminStats();
	useExpirationCleanup();
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (!isAdmin) {
			navigate({ to: "/dashboard" });
			return;
		}
	}, [
		user,
		isAdmin,
		navigate
	]);
	const statCards = [
		{
			label: "Total orders",
			value: stats?.totalOrders ?? 0,
			icon: ShoppingCart,
			color: "#8b5cf6",
			sub: "all time"
		},
		{
			label: "Pending",
			value: stats?.pendingOrders ?? 0,
			icon: Clock,
			color: "#fbbf24",
			sub: "awaiting review"
		},
		{
			label: "Verified",
			value: stats?.paidOrders ?? 0,
			icon: CircleCheck,
			color: "#34d399",
			sub: "paid & published"
		},
		{
			label: "Rejected",
			value: stats?.failedOrders ?? 0,
			icon: CircleX,
			color: "#f87171",
			sub: "failed verification"
		},
		{
			label: "Published pages",
			value: stats?.publishedPages ?? 0,
			icon: Globe,
			color: "#22d3ee",
			sub: "live"
		},
		{
			label: "Pending pages",
			value: stats?.pendingPages ?? 0,
			icon: FileText,
			color: "#fb923c",
			sub: "awaiting approval"
		},
		{
			label: "Total revenue",
			value: formatPKR(stats?.totalRevenuePaisa ?? 0),
			icon: DollarSign,
			color: "#a78bfa",
			sub: "PKR verified orders",
			isText: true
		},
		{
			label: "Total users",
			value: stats?.totalUsers ?? 0,
			icon: Users,
			color: "#f472b6",
			sub: "registered"
		}
	];
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-6 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-black text-white",
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/40",
						children: "Manage orders, users, and publications"
					})]
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-28 animate-pulse rounded-2xl bg-white/[0.04]" }, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
					children: statCards.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 14
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .05 },
						className: "relative overflow-hidden rounded-2xl border border-white/[0.06] p-5",
						style: { background: `linear-gradient(160deg, ${s.color}10 0%, ${s.color}04 100%)` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-x-0 top-0 h-px",
							style: { background: `linear-gradient(90deg, transparent, ${s.color}50, transparent)` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-white/40",
									children: s.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-2xl font-black text-white",
									style: s.isText ? {
										color: s.color,
										fontSize: "1.1rem"
									} : void 0,
									children: s.value
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-white/25 mt-0.5",
									children: s.sub
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl",
								style: {
									background: `${s.color}18`,
									border: `1px solid ${s.color}30`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
									className: "h-4.5 w-4.5",
									style: {
										color: s.color,
										width: 18,
										height: 18
									}
								})
							})]
						})]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/orders",
							className: "flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 hover:bg-amber-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-8 w-8 text-amber-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-white",
								children: "Pending Orders"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/40",
								children: "Review and verify payments"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/pending",
							className: "flex items-center gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 hover:bg-violet-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-8 w-8 text-violet-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-white",
								children: "Pending Websites Queue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/40",
								children: "Review, preview & go live"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/users",
							className: "flex items-center gap-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 hover:bg-pink-500/10 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-8 w-8 text-pink-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-white",
								children: "Users"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/40",
								children: "Manage accounts & roles"
							})] })]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AdminDashboard as component };
