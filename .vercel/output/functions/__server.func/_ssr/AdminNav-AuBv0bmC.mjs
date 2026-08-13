import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { O as ShoppingCart, V as RefreshCw, Vt as Clock, ht as LayoutDashboard, j as Shield, l as Users, rn as ArrowLeft, xt as Globe } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { s as usePendingWebsites } from "./use-orders-BvFKxMDx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminNav-AuBv0bmC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminNav() {
	const queryClient = useQueryClient();
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const { data: pendingItems = [] } = usePendingWebsites();
	const pendingCount = pendingItems.length;
	async function handleRefreshAll() {
		setIsRefreshing(true);
		try {
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
				queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
				queryClient.invalidateQueries({ queryKey: ["pending-websites"] }),
				queryClient.invalidateQueries({ queryKey: ["admin-pages"] })
			]);
			toast.success("Admin dashboard refreshed!");
		} catch {
			toast.error("Failed to refresh database data.");
		} finally {
			setTimeout(() => setIsRefreshing(false), 500);
		}
	}
	async function handleResetTestData() {
		if (!confirm("Are you sure you want to clean all test data? This will remove local test drafts and testing records.")) return;
		try {
			if (typeof window !== "undefined") for (let i = localStorage.length - 1; i >= 0; i--) {
				const key = localStorage.key(i);
				if (key && (key.startsWith("page_") || key.startsWith("order_") || key.includes("draft"))) localStorage.removeItem(key);
			}
			await handleRefreshAll();
			toast.success("Test data cleared successfully! Clean testing environment ready.");
		} catch (e) {
			toast.error("Failed to clean test data.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		className: "sticky top-0 z-40 flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#0a0918]/95 px-4 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-600",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3.5 w-3.5 text-white" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-white/80",
						children: "Admin Panel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-red-400",
						children: "Admin only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleRefreshAll,
						disabled: isRefreshing,
						className: "flex items-center gap-1 rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all ml-2",
						title: "Refresh all admin database queries",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3 w-3 ${isRefreshing ? "animate-spin text-violet-400" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isRefreshing ? "Refreshing..." : "Refresh Data" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleResetTestData,
						className: "flex items-center gap-1 rounded-lg bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 transition-all",
						title: "Clean development/testing data",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Test Data" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-0.5",
				children: [
					{
						to: "/admin",
						label: "Dashboard",
						icon: LayoutDashboard,
						exact: true
					},
					{
						to: "/admin/pending",
						label: "Pending Websites",
						icon: Clock,
						badge: pendingCount
					},
					{
						to: "/admin/orders",
						label: "Orders",
						icon: ShoppingCart
					},
					{
						to: "/admin/pages",
						label: "Pages",
						icon: Globe
					},
					{
						to: "/admin/users",
						label: "Users",
						icon: Users
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: "flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/[0.05] hover:text-white/80 transition-colors relative",
					activeProps: { className: "bg-violet-600/20 text-violet-300 font-semibold" },
					activeOptions: item.exact ? { exact: true } : void 0,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-3.5 w-3.5" }),
						item.label,
						item.badge ? item.badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-400 border border-amber-500/30",
							children: item.badge
						}) : null
					]
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard",
				className: "flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Dashboard"]
			})
		]
	});
}
//#endregion
export { AdminNav as t };
