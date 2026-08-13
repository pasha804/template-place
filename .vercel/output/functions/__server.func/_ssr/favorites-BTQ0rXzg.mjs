import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { nn as ArrowRight, yt as Heart } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { r as useFavorites, t as allUnifiedTemplates } from "./combined-BKJH_seF.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-BTQ0rXzg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: favIds = [] } = useFavorites(user?.id);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	const favTemplates = allUnifiedTemplates.filter((t) => favIds.includes(t.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-8 text-2xl font-bold",
					children: "Favorites"
				}), favTemplates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "mb-4 h-10 w-10 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "No favorites yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Heart a template while browsing to save it here"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/templates",
							className: "mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline",
							children: ["Browse templates ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: favTemplates.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .06 },
						className: "overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all hover:border-primary/30 hover:shadow-glow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-36 w-full relative overflow-hidden",
							style: { background: t.coverGradient },
							children: t.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: t.thumbnailUrl,
								alt: t.name,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-4xl",
								children: t.accentEmoji
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: t.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground line-clamp-1",
									children: t.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/templates/$slug",
										params: { slug: t.slug },
										className: "flex-1 rounded-xl bg-primary py-2 text-center text-xs font-semibold text-primary-foreground",
										children: "Create page"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/templates/$slug",
										params: { slug: t.slug },
										className: "flex-1 rounded-xl border border-border py-2 text-center text-xs transition-colors hover:border-primary/40",
										children: "View"
									})]
								})
							]
						})]
					}, t.id))
				})]
			})]
		})]
	});
}
//#endregion
export { FavoritesPage as component };
