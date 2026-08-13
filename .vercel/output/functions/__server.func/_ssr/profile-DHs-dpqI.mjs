import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { L as Save, ft as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DHs-dpqI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	full_name: stringType().min(2, "Name is too short"),
	bio: stringType().max(200).optional(),
	country: stringType().optional()
});
function ProfilePage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const qc = useQueryClient();
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile", user?.id],
		queryFn: async () => {
			const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
			return data;
		},
		enabled: !!user
	});
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	(0, import_react.useEffect)(() => {
		if (profile) reset({
			full_name: profile.full_name ?? "",
			bio: profile.bio ?? "",
			country: profile.country ?? ""
		});
	}, [profile, reset]);
	async function onSubmit(data) {
		if (!user) return;
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			...data,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (error) {
			toast.error("Failed to save profile");
			return;
		}
		qc.invalidateQueries({ queryKey: ["profile", user.id] });
		toast.success("Profile updated");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-8 text-2xl font-bold",
					children: "Profile"
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center py-16",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary",
								children: profile?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: profile?.full_name ?? "Your name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: user?.email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"Storage: ",
									Math.round((profile?.storage_used_bytes ?? 0) / 1024 / 1024),
									"MB / ",
									Math.round((profile?.storage_quota_bytes ?? 100 * 1024 * 1024) / 1024 / 1024),
									"MB"
								]
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit(onSubmit),
						className: "space-y-5 rounded-2xl border border-border/60 bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1.5 block text-sm font-medium",
									children: "Full name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary",
									...register("full_name")
								}),
								errors.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-destructive",
									children: errors.full_name.message
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium",
								children: "Bio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								rows: 3,
								placeholder: "A short bio...",
								className: "w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary",
								...register("bio")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1.5 block text-sm font-medium",
								children: "Country"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Your country",
								className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary",
								...register("country")
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: isSubmitting,
								className: "flex items-center gap-2 rounded-2xl bg-aurora px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60",
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Save changes"]
							})
						]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { ProfilePage as component };
