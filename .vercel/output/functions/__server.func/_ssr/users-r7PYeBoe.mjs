import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Wt as CircleAlert, qt as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminNav } from "./AdminNav-D3fACHiq.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/users-r7PYeBoe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Admin Users — /admin/users
* View all users, see their roles, promote to admin/moderator.
*/
function AdminUsersPage() {
	const navigate = useNavigate();
	const { user, isAdmin } = useAuthStore();
	const qc = useQueryClient();
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
	const { data: profiles = [], isLoading } = useQuery({
		queryKey: ["admin-users"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").is("deleted_at", null).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const { data: roles = [] } = useQuery({
		queryKey: ["admin-user-roles"],
		queryFn: async () => {
			const { data } = await supabase.from("user_roles").select("*");
			return data ?? [];
		}
	});
	const setRole = useMutation({
		mutationFn: async ({ userId, role }) => {
			await supabase.from("user_roles").delete().eq("user_id", userId).neq("role", "user");
			if (role !== "user") await supabase.from("user_roles").upsert({
				user_id: userId,
				role
			}, { onConflict: "user_id,role" });
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["admin-user-roles"] });
			toast.success("Role updated");
		}
	});
	function getUserRole(userId) {
		const userRoles = roles.filter((r) => r.user_id === userId).map((r) => r.role);
		if (userRoles.includes("admin")) return "admin";
		if (userRoles.includes("moderator")) return "moderator";
		if (userRoles.includes("support")) return "support";
		return "user";
	}
	const ROLE_STYLES = {
		admin: {
			color: "#f87171",
			bg: "rgba(248,113,113,0.12)"
		},
		moderator: {
			color: "#a78bfa",
			bg: "rgba(167,139,250,0.12)"
		},
		support: {
			color: "#fbbf24",
			bg: "rgba(251,191,36,0.12)"
		},
		user: {
			color: "#6b7280",
			bg: "rgba(107,114,128,0.10)"
		}
	};
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black text-white",
					children: "Users"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40",
					children: [profiles.length, " registered"]
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-2xl bg-white/[0.04]" }, i))
			}) : profiles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mb-3 h-10 w-10 text-white/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/50",
					children: "No users found"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-2xl border border-white/[0.07]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-white/[0.06] bg-white/[0.03]",
						children: [
							"User",
							"Email",
							"Country",
							"Joined",
							"Role"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: profiles.map((profile, i) => {
						const role = getUserRole(profile.id);
						const rs = ROLE_STYLES[role];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: { delay: i * .02 },
							className: "border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400",
											children: (profile.full_name ?? profile.email ?? "?")[0].toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-white/80 truncate max-w-[140px]",
											children: profile.full_name ?? "—"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-white/50 text-xs",
									children: profile.email ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-white/40 text-xs",
									children: profile.country ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-white/30 text-xs",
									children: format(new Date(profile.created_at), "MMM d, yyyy")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative inline-block",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: role,
											onChange: (e) => setRole.mutate({
												userId: profile.id,
												role: e.target.value
											}),
											disabled: profile.id === user?.id,
											className: "appearance-none rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize cursor-pointer outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
											style: {
												color: rs.color,
												background: rs.bg,
												borderColor: rs.color + "40"
											},
											children: [
												"user",
												"support",
												"moderator",
												"admin"
											].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: r,
												className: "bg-[#1a1730] text-white capitalize",
												children: r
											}, r))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											className: "pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2",
											style: { color: rs.color }
										})]
									})
								})
							]
						}, profile.id);
					}) })]
				})
			})]
		})]
	});
}
//#endregion
export { AdminUsersPage as component };
