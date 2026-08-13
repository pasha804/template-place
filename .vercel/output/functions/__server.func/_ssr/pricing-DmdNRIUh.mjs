import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { t as Navbar } from "./Navbar-CvTbFDxU.mjs";
import { t as Footer } from "./Footer-BTWP9whH.mjs";
import { n as PricingSection, t as FAQSection } from "./FAQSection-ZfhL0WT_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-DmdNRIUh.js
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricingSection, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQSection, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { PricingPage as component };
