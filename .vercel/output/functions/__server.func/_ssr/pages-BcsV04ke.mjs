import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ft as ExternalLink, Pt as EyeOff, Wt as CircleAlert, g as Trash2 } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminNav } from "./AdminNav-D3fACHiq.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pages-BcsV04ke.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Admin Pages — /admin/pages
* View all published/pending pages, unpublish, expire, delete.
*/
var STATUS_STYLES = {
	published: {
		color: "#34d399",
		bg: "rgba(52,211,153,0.12)",
		border: "rgba(52,211,153,0.3)"
	},
	pending_approval: {
		color: "#fbbf24",
		bg: "rgba(251,191,36,0.12)",
		border: "rgba(251,191,36,0.3)"
	},
	draft: {
		color: "#6b7280",
		bg: "rgba(107,114,128,0.10)",
		border: "rgba(107,114,128,0.25)"
	},
	expired: {
		color: "#f87171",
		bg: "rgba(248,113,113,0.12)",
		border: "rgba(248,113,113,0.3)"
	},
	archived: {
		color: "#8b87b8",
		bg: "rgba(139,135,184,0.10)",
		border: "rgba(139,135,184,0.2)"
	}
};
function AdminPagesPage() {
	const navigate = useNavigate();
	const { user, isAdmin } = useAuthStore();
	const qc = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
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
	const { data: pages = [], isLoading } = useQuery({
		queryKey: ["admin-pages", statusFilter],
		queryFn: async () => {
			let q = supabase.from("pages").select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, expires_at, published_at, deleted_at, view_count, created_at, updated_at").is("deleted_at", null).order("updated_at", { ascending: false });
			if (statusFilter !== "all") q = q.eq("status", statusFilter);
			const { data, error } = await q;
			if (error) throw error;
			return data ?? [];
		}
	});
	const updatePageStatus = useMutation({
		mutationFn: async ({ pageId, status }) => {
			const { error } = await supabase.from("pages").update({
				status,
				is_public: status === "published",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", pageId);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-pages"] });
			toast.success("Page updated");
		},
		onError: (err) => {
			toast.error(`Failed to update status: ${err?.message || "Unknown error"}`);
		}
	});
	const deletePage = useMutation({
		mutationFn: async (pageId) => {
			const { error } = await supabase.from("pages").update({ deleted_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", pageId);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-pages"] });
			toast.success("Page deleted");
		}
	});
	const statusTabs = [
		{
			label: "Published (Live)",
			value: "published"
		},
		{
			label: "All Pages",
			value: "all"
		},
		{
			label: "Archived",
			value: "archived"
		},
		{
			label: "Expired",
			value: "expired"
		}
	];
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-black text-white",
						children: "Published Websites"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-white/50",
						children: "Manage live published dedication pages and public access links."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40",
						children: [pages.length, " pages"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-6 flex flex-wrap gap-2",
					children: statusTabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStatusFilter(t.value),
						className: cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-all", statusFilter === t.value ? "bg-violet-600 text-white" : "border border-white/[0.08] text-white/40 hover:text-white/70"),
						children: t.label
					}, t.value))
				}),
				isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-2xl bg-white/[0.04]" }, i))
				}) : pages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mb-3 h-10 w-10 text-white/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-white/50",
						children: "No published pages found"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-2xl border border-white/[0.07]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-white/[0.06] bg-white/[0.03]",
							children: [
								"Title & Template",
								"Public Slug",
								"Views",
								"Status",
								"Published Date",
								"Actions"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30",
								children: h
							}, h))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pages.map((page, i) => {
							const st = STATUS_STYLES[page.status] ?? STATUS_STYLES.draft;
							const liveUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${page.slug}`;
							const templateId = page.template_id || page.content?._template_id || page.template_id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								transition: { delay: i * .02 },
								className: "border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-white/90 truncate max-w-[220px]",
												children: page.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-violet-400 font-mono",
												children: templateId
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-xs text-white/50",
												children: ["/p/", page.slug]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													navigator.clipboard.writeText(liveUrl);
													toast.success("Link copied!");
												},
												className: "shrink-0 rounded-lg bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 text-[10px] font-semibold text-violet-400 hover:bg-violet-500/25 transition-colors",
												children: "Copy link"
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-white/50 text-xs",
										children: page.view_count.toLocaleString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize whitespace-nowrap",
											style: {
												color: st.color,
												background: st.bg,
												borderColor: st.border
											},
											children: page.status.replace("_", " ")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-white/40 text-xs",
										children: page.published_at ? format(new Date(page.published_at), "MMM d, yyyy") : format(new Date(page.updated_at), "MMM d, yyyy")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: liveUrl,
													target: "_blank",
													rel: "noopener noreferrer",
													className: "flex h-8 px-2.5 items-center gap-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors",
													title: "Preview Live Website",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Preview" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => navigate({
														to: "/editor/template/$templateId",
														params: { templateId },
														search: { pageId: page.id }
													}),
													className: "flex h-8 px-2.5 items-center gap-1 rounded-lg bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300 hover:bg-violet-600/30 transition-colors",
													children: "Edit"
												}),
												page.status === "published" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => updatePageStatus.mutate({
														pageId: page.id,
														status: "archived"
													}),
													className: "flex h-8 px-2.5 items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-400 hover:bg-amber-500/25 transition-colors",
													title: "Unpublish Website",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unpublish" })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														if (confirm("Are you sure you want to delete this published page?")) deletePage.mutate(page.id);
													},
													className: "flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors",
													title: "Delete Page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
												})
											]
										})
									})
								]
							}, page.id);
						}) })]
					})
				})
			]
		})]
	});
}
//#endregion
export { AdminPagesPage as component };
