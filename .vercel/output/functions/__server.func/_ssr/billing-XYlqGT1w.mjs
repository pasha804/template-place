import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Bt as CreditCard, nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/billing-XYlqGT1w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BillingPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const { data: subscription } = useQuery({
		queryKey: ["subscription", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle();
			return data;
		},
		enabled: !!user
	});
	const { data: orders = [] } = useQuery({
		queryKey: ["orders", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10);
			return data ?? [];
		},
		enabled: !!user
	});
	const { data: invoices = [] } = useQuery({
		queryKey: ["invoices", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("invoices").select("*").eq("user_id", user.id).order("issued_at", { ascending: false }).limit(10);
			return data ?? [];
		},
		enabled: !!user
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-8 text-2xl font-bold",
						children: "Billing"
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
						className: "mb-8 rounded-2xl border border-border/60 bg-surface p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Current plan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-xl font-bold capitalize",
									children: subscription ? subscription.plan_name : "Free"
								}),
								subscription?.current_period_end && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: ["Renews ", format(new Date(subscription.current_period_end), "MMMM d, yyyy")]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6 text-primary" })
							})]
						}), !subscription && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Upgrade to unlock more pages and features"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pricing",
								className: "mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline",
								children: ["View plans ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})]
						})]
					}),
					orders.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 font-semibold",
							children: "Order history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: ["#", order.reference]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: format(new Date(order.created_at), "MMM d, yyyy")
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold",
										children: ["Rs. ", (order.total_cents / 100).toLocaleString("en-PK")]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: `text-xs capitalize ${order.status === "paid" ? "text-success" : "text-muted-foreground"}`,
										children: order.status
									})]
								})]
							}, order.id))
						})]
					}),
					invoices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-4 font-semibold",
						children: "Invoices"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: invoices.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium",
								children: ["Invoice ", inv.number]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: format(new Date(inv.issued_at), "MMM d, yyyy")
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-semibold",
									children: ["Rs. ", (inv.amount_cents / 100).toLocaleString("en-PK")]
								}), inv.pdf_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: inv.pdf_url,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "text-xs text-primary hover:underline",
									children: "PDF"
								})]
							})]
						}, inv.id))
					})] }),
					orders.length === 0 && invoices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "mb-3 h-10 w-10 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "No orders yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Your purchase history will appear here"
							})
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { BillingPage as component };
