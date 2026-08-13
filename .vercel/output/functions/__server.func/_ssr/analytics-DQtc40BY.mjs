import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Nt as Eye, tt as Monitor, xt as Globe } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useUserPages } from "./use-pages-D3HISOQY.mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as format, t as subDays } from "../_libs/date-fns.mjs";
import { a as Bar, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as BarChart, o as Pie, r as YAxis, s as Cell, t as PieChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-DQtc40BY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"var(--primary)",
	"var(--accent)",
	"var(--success)",
	"var(--warning)"
];
function AnalyticsPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: pages = [] } = useUserPages(user?.id);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const pageIds = pages.map((p) => p.id);
	const { data: views = [] } = useQuery({
		queryKey: ["all-views", pageIds],
		queryFn: async () => {
			if (!pageIds.length) return [];
			const { data, error } = await supabase.from("page_views").select("*").in("page_id", pageIds).order("created_at", { ascending: true });
			if (error) throw error;
			return data;
		},
		enabled: pageIds.length > 0
	});
	const chartData = (0, import_react.useMemo)(() => {
		return Array.from({ length: 14 }, (_, i) => {
			const date = subDays(/* @__PURE__ */ new Date(), 13 - i);
			const key = format(date, "yyyy-MM-dd");
			const count = views.filter((v) => v.created_at.slice(0, 10) === key).length;
			return {
				date: format(date, "MMM d"),
				views: count
			};
		});
	}, [views]);
	const deviceData = (0, import_react.useMemo)(() => {
		const counts = {};
		views.forEach((v) => {
			const d = v.device ?? "unknown";
			counts[d] = (counts[d] ?? 0) + 1;
		});
		return Object.entries(counts).map(([name, value]) => ({
			name,
			value
		}));
	}, [views]);
	const countryData = (0, import_react.useMemo)(() => {
		const counts = {};
		views.forEach((v) => {
			const c = v.country ?? "Unknown";
			counts[c] = (counts[c] ?? 0) + 1;
		});
		return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => ({
			name,
			count
		}));
	}, [views]);
	const totalViews = views.length;
	const uniqueVisitors = new Set(views.map((v) => v.visitor_hash ?? v.id)).size;
	const topCountry = countryData[0]?.name ?? "—";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mb-8 text-2xl font-bold",
						children: "Analytics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4",
						children: [
							{
								label: "Total views",
								value: totalViews,
								icon: Eye,
								color: "var(--primary)"
							},
							{
								label: "Unique visitors",
								value: uniqueVisitors,
								icon: Globe,
								color: "var(--accent)"
							},
							{
								label: "Top country",
								value: topCountry,
								icon: Globe,
								color: "var(--success)"
							},
							{
								label: "Active pages",
								value: pages.filter((p) => p.status === "published").length,
								icon: Monitor,
								color: "var(--warning)"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "rounded-2xl border border-border/60 bg-surface p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
									className: "h-4 w-4",
									style: { color: s.color }
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold",
								style: { color: s.color },
								children: s.value
							})]
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 rounded-2xl border border-border/60 bg-surface p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-6 font-semibold",
							children: "Views — last 14 days"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: 200,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: chartData,
								barSize: 12,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "date",
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										tick: {
											fontSize: 11,
											fill: "var(--muted-foreground)"
										},
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "var(--surface)",
											border: "1px solid var(--border)",
											borderRadius: 12,
											fontSize: 12
										},
										cursor: {
											fill: "var(--primary)",
											opacity: .1
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "views",
										fill: "var(--primary)",
										radius: [
											6,
											6,
											0,
											0
										]
									})
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-semibold",
								children: "Devices"
							}), deviceData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No data yet"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: 120,
									height: 120,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: deviceData,
										dataKey: "value",
										cx: "50%",
										cy: "50%",
										innerRadius: 32,
										outerRadius: 50,
										children: deviceData.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
									}) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: deviceData.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-2.5 w-2.5 rounded-full",
												style: { background: COLORS[i % COLORS.length] }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "capitalize",
												children: d.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground ml-auto",
												children: d.value
											})
										]
									}, d.name))
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border/60 bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 font-semibold",
								children: "Top countries"
							}), countryData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No data yet"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: countryData.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-24 truncate text-sm",
											children: c.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 rounded-full bg-muted/30 h-1.5",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-primary transition-all",
												style: { width: `${c.count / (countryData[0]?.count ?? 1) * 100}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground w-8 text-right",
											children: c.count
										})
									]
								}, c.name))
							})]
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { AnalyticsPage as component };
