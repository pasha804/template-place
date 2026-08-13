import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Navbar } from "./_ssr/Navbar-CvTbFDxU.mjs";
import { t as Footer } from "./_ssr/Footer-BTWP9whH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BA6SkkGe.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-24 pb-16 flex flex-col items-center justify-center text-center px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-black text-white mb-2",
					children: "Post not found"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/blog",
					className: "mt-4 text-sm text-primary hover:underline",
					children: "← Back to blog"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { BlogPostPage as component };
