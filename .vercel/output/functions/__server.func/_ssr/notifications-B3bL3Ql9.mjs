import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Jt as Check, Yt as CheckCheck, en as Bell } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-B3bL3Ql9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const { data: notifications = [] } = useQuery({
		queryKey: ["notifications", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50);
			return data ?? [];
		},
		enabled: !!user
	});
	const markRead = useMutation({
		mutationFn: async (id) => {
			await supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications", user?.id] })
	});
	const markAllRead = useMutation({
		mutationFn: async () => {
			await supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", user.id).is("read_at", null);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications", user?.id] })
	});
	const unreadCount = notifications.filter((n) => !n.read_at).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-bold",
						children: ["Notifications ", unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground",
							children: unreadCount
						})]
					}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => markAllRead.mutate(),
						className: "flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), " Mark all read"]
					})]
				}), notifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mb-4 h-10 w-10 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "No notifications yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "We'll let you know when something important happens"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: notifications.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .03 },
						className: cn("flex items-start gap-4 rounded-2xl border p-4 transition-all", n.read_at ? "border-border/40 bg-surface opacity-70" : "border-primary/20 bg-primary/5"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-0.5 h-2 w-2 rounded-full shrink-0", n.read_at ? "bg-muted" : "bg-primary") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: format(new Date(n.created_at), "MMM d, h:mm a")
									})
								]
							}),
							!n.read_at && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => markRead.mutate(n.id),
								className: "shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-primary transition-colors",
								"aria-label": "Mark read",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
							})
						]
					}, n.id))
				})]
			})]
		})]
	});
}
//#endregion
export { NotificationsPage as component };
