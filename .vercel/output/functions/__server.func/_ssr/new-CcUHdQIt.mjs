import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { ft as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getTemplate } from "./registry-DOvo1fxH.mjs";
import { t as useCreatePage } from "./use-pages-DEg-ttb2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./new-zZLEoPq6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/new-CcUHdQIt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function generateSlug(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
function NewEditorPage() {
	const { template: templateId } = Route.useSearch();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const createPage = useCreatePage();
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		const plugin = getTemplate(templateId);
		if (!plugin) {
			toast.error("Template not found");
			navigate({ to: "/templates" });
			return;
		}
		async function init() {
			if (!user || !plugin) return;
			try {
				const page = await createPage.mutateAsync({
					user_id: user.id,
					template_id: plugin.manifest.id,
					title: `My ${plugin.manifest.name} page`,
					slug: generateSlug(plugin.manifest.slug),
					blocks: plugin.blocks,
					theme: plugin.theme,
					status: "draft",
					is_public: false,
					content: {}
				});
				navigate({
					to: "/editor/$pageId",
					params: { pageId: page.id }
				});
			} catch (err) {
				toast.error("Failed to create page. Please try again.");
				navigate({ to: "/templates" });
			}
		}
		init();
	}, [user, templateId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Setting up your page…"
			})]
		})
	});
}
//#endregion
export { NewEditorPage as component };
