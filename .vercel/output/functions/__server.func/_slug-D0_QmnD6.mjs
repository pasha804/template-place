import { o as __toESM } from "./_runtime.mjs";
import { n as supabase } from "./_ssr/client-Dc1BRJHd.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { Wt as CircleAlert, ft as LoaderCircle } from "./_libs/lucide-react.mjs";
import { o as getExternalTemplate } from "./_ssr/registry-BOtXfR_2.mjs";
import { r as usePage } from "./_ssr/use-pages-D3HISOQY.mjs";
import { n as getTemplate } from "./_ssr/registry-DOvo1fxH.mjs";
import { t as Route } from "./_slug-CiM2pOUS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-D0_QmnD6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PublicPageViewer() {
	const { slug } = Route.useParams();
	const { data: page, isLoading, error } = usePage(slug, "slug");
	const [access, setAccess] = (0, import_react.useState)("loading");
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
	(0, import_react.useEffect)(() => {
		if (isLoading) return;
		if (!page || error) {
			setAccess("notfound");
			return;
		}
		if (page.expires_at && new Date(page.expires_at) < /* @__PURE__ */ new Date()) {
			setAccess("expired");
			return;
		}
		setAccess("granted");
		if (page.status === "published") recordView(page.id);
	}, [
		page,
		isLoading,
		error
	]);
	async function recordView(pageId) {
		const ua = navigator.userAgent;
		const device = /mobile/i.test(ua) ? "mobile" : /tablet/i.test(ua) ? "tablet" : "desktop";
		await supabase.from("page_views").insert({
			page_id: pageId,
			device,
			referrer: document.referrer || null
		});
	}
	if (access === "loading" || isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-black",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-8 w-8 animate-spin",
			style: { color: "rgba(167,139,250,0.8)" }
		})
	});
	if (access === "notfound") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-white/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-white",
				children: "Page not found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-white/40",
				children: "This page doesn't exist or may have been removed."
			})
		]
	});
	if (access === "expired") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-amber-400" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-white",
				children: "Page expired"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-white/40",
				children: "This page's access period has ended."
			})
		]
	});
	if (access === "granted" && page) {
		const templateId = page.template_id || page.content?._template_id;
		if (!templateId) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-red-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white",
					children: "Template Error"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/40",
					children: "This page is missing template information."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-white/25 font-mono",
					children: ["Page ID: ", page.id]
				})
			]
		});
		const extPlugin = getExternalTemplate(templateId);
		if (extPlugin) {
			const config = page.content ?? extPlugin.defaults;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "template-runtime",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(extPlugin.Renderer, {
					config,
					mode: "view"
				})
			});
		}
		const blockPlugin = getTemplate(templateId);
		if (blockPlugin) {
			const blocks = page.blocks;
			const theme = page.theme;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "template-runtime",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(blockPlugin.Renderer, {
					blocks,
					theme,
					mode: "view"
				})
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-amber-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold text-white",
					children: "Template Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-white/40",
					children: "The template for this page is not available."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-white/25 font-mono",
					children: ["Template ID: ", templateId]
				})
			]
		});
	}
	return null;
}
//#endregion
export { PublicPageViewer as component };
