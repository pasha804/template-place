import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ft as ExternalLink, S as SquarePen, W as Plus, g as Trash2, kt as FileText } from "../_libs/lucide-react.mjs";
import { o as getExternalTemplate } from "./registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as useUserPages, n as useDeletePage } from "./use-pages-D3HISOQY.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-CWj_09Fw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PagesPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const { data: pages = [], isLoading } = useUserPages(user?.id, filter !== "all" ? filter : void 0);
	const deletePage = useDeletePage();
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	async function handleDelete(id) {
		if (!user || !confirm("Delete this page?")) return;
		await deletePage.mutateAsync({
			id,
			userId: user.id
		});
		toast.success("Page deleted");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "My Pages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/templates",
							className: "flex items-center gap-2 rounded-2xl bg-aurora px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Create page"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex flex-wrap gap-2",
						children: [
							{
								label: "All",
								value: "all"
							},
							{
								label: "Published",
								value: "published"
							},
							{
								label: "Pending Approval",
								value: "pending_approval"
							},
							{
								label: "Drafts",
								value: "draft"
							},
							{
								label: "Expired",
								value: "expired"
							},
							{
								label: "Archived",
								value: "archived"
							}
						].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(t.value),
							className: cn("rounded-full px-4 py-2 text-xs font-semibold transition-all", filter === t.value ? "bg-primary text-primary-foreground shadow-glow" : "border border-border text-muted-foreground hover:text-foreground"),
							children: t.label
						}, t.value))
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [
							1,
							2,
							3
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 animate-pulse rounded-2xl bg-muted/40" }, i))
					}) : pages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mb-4 h-10 w-10 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "No pages found"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: filter === "all" ? "Create your first page to get started" : `No ${filter} pages yet`
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: pages.map((page, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .04 },
							className: "flex items-center gap-4 rounded-2xl border border-border/60 bg-surface px-5 py-4 transition-all hover:border-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium truncate",
										children: page.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize shrink-0", page.status === "published" ? "bg-success/10 text-success" : page.status === "pending_approval" ? "bg-orange-500/15 text-orange-400" : page.status === "draft" ? "bg-warning/10 text-warning" : page.status === "expired" ? "bg-red-500/10 text-red-400" : "bg-muted/20 text-muted-foreground"),
										children: page.status === "pending_approval" ? "Pending Approval" : page.status
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"/p/",
										page.slug || page.id,
										" · ",
										page.view_count || 0,
										" views · Updated ",
										page.updated_at ? function() {
											try {
												return format(new Date(page.updated_at), "MMM d");
											} catch {
												return "Recently";
											}
										}() : "Recently"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 shrink-0",
								children: [
									(() => {
										return !!getExternalTemplate(page.template_id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/editor/template/$templateId",
											params: { templateId: page.template_id },
											search: { pageId: page.id },
											className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/editor/$pageId",
											params: { pageId: page.id },
											className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-3.5 w-3.5" })
										});
									})(),
									page.status === "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/p/$slug",
										params: { slug: page.slug },
										target: "_blank",
										className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleDelete(page.id),
										className: "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}, page.id))
					})
				]
			})]
		})]
	});
}
//#endregion
export { PagesPage as component };
