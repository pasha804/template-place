import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { Bt as CreditCard, P as Settings, Xt as ChartNoAxesColumn, en as Bell, ht as LayoutDashboard, i as X, kt as FileText, ot as Menu, u as User, yt as Heart } from "../_libs/lucide-react.mjs";
import { g as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DashboardNav-Cbb2hl6P.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navItems = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/dashboard/pages",
		label: "My Pages",
		icon: FileText
	},
	{
		to: "/dashboard/analytics",
		label: "Analytics",
		icon: ChartNoAxesColumn
	},
	{
		to: "/dashboard/billing",
		label: "Billing",
		icon: CreditCard
	},
	{
		to: "/dashboard/favorites",
		label: "Favorites",
		icon: Heart
	},
	{
		to: "/dashboard/notifications",
		label: "Notifications",
		icon: Bell
	},
	{
		to: "/dashboard/profile",
		label: "Profile",
		icon: User
	},
	{
		to: "/dashboard/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavList({ onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "space-y-0.5",
		children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.to,
			className: "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-primary/8 hover:text-foreground",
			activeProps: { className: "bg-primary/10 text-primary font-semibold" },
			activeOptions: item.exact ? { exact: true } : void 0,
			onClick: onClose,
			children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex h-8 w-8 items-center justify-center rounded-xl transition-all", isActive ? "bg-primary/15" : "bg-transparent"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "") })
			}), item.label] })
		}, item.to))
	});
}
function DashboardNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	useRouter().subscribe("onLoad", () => setOpen(false));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "hidden w-56 shrink-0 border-r border-[var(--glass-border)] pt-8 pr-4 lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sticky top-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-white/[0.08] bg-[#0a0914]/95 backdrop-blur-xl px-4 py-2 lg:hidden",
			children: [navItems.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				className: "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-muted-foreground transition-all",
				activeProps: { className: "text-primary" },
				activeOptions: item.exact ? { exact: true } : void 0,
				children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("h-5 w-5", isActive ? "text-primary" : "text-white/40") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("text-[9px] font-medium", isActive ? "text-primary" : "text-white/30"),
					children: item.label
				})] })
			}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(true),
				className: "flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-white/40 transition-all",
				"aria-label": "More",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[9px] font-medium text-white/30",
					children: "More"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .2 },
			className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden",
			onClick: () => setOpen(false)
		}, "overlay"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { x: "-100%" },
			animate: { x: 0 },
			exit: { x: "-100%" },
			transition: {
				type: "spring",
				stiffness: 320,
				damping: 30
			},
			className: "fixed inset-y-0 left-0 z-50 w-72 border-r border-white/[0.08] bg-[#0a0914] p-6 lg:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 shadow-[0_0_14px_rgba(168,85,247,0.5)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-black text-white",
							children: "S"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-white",
							children: "Dashboard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-white/40",
							children: "Navigation"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					className: "flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white transition-colors",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onClose: () => setOpen(false) })]
		}, "drawer")] }) })
	] });
}
//#endregion
export { DashboardNav as t };
