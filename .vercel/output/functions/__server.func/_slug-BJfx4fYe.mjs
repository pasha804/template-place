import { o as __toESM } from "./_runtime.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { rn as ArrowLeft } from "./_libs/lucide-react.mjs";
import { s as getExternalTemplateBySlug } from "./_ssr/registry-BOtXfR_2.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as getTemplateBySlug, t as TemplateSurface } from "./_ssr/registry-DOvo1fxH.mjs";
import { t as Route } from "./_slug-DV78iSSS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BJfx4fYe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Demo route — /demo/:slug
* Renders the template fullscreen using its default config.
* No editor, no header, no chrome — just the raw template experience.
* Opens in a new tab when user clicks "Demo" on the detail page.
*
* IMPORTANT: No wrapper height/overflow constraints — the template renders
* exactly as it would standalone. The body is the scroll container.
*/
function DemoPage() {
	const { slug } = Route.useParams();
	(0, import_react.useEffect)(() => {
		document.body.classList.add("template-page");
		document.body.style.margin = "0";
		document.body.style.padding = "0";
		return () => {
			document.body.classList.remove("template-page");
			document.body.style.margin = "";
			document.body.style.padding = "";
		};
	}, []);
	const extPlugin = getExternalTemplateBySlug(slug);
	const blockPlugin = getTemplateBySlug(slug);
	if (extPlugin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed top-3 left-3 z-[9999] pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/templates/$slug",
			params: { slug },
			className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-black/80 transition-all",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "template-runtime",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(extPlugin.Renderer, {
			config: extPlugin.defaults,
			mode: "view"
		})
	})] });
	if (blockPlugin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed top-3 left-3 z-[9999] pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/templates/$slug",
			params: { slug },
			className: "pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-black/80 transition-all",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " Back"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "template-runtime",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateSurface, {
			blocks: blockPlugin.blocks,
			theme: blockPlugin.theme,
			mode: "view"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 bg-[#08071a]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-white/40",
			children: "Template not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/templates",
			className: "text-sm text-violet-400 hover:underline",
			children: "Browse templates"
		})]
	});
}
//#endregion
export { DemoPage as component };
