import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SceneShell-DjkoBOmZ.js
var import_jsx_runtime = require_jsx_runtime();
function SceneShell({ title, subtitle, children, footer, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.section, {
		initial: {
			opacity: 0,
			y: 24
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -20
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `mx-auto w-full max-w-6xl px-5 py-10 text-center sm:px-8 ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .08,
					duration: .7
				},
				className: "ct-gradient-text ct-font-script text-3xl font-semibold leading-tight sm:text-5xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { scaleX: 0 },
				animate: { scaleX: 1 },
				transition: {
					delay: .2,
					duration: .8
				},
				className: "mx-auto mt-4 h-px w-40 origin-center",
				style: { backgroundImage: "var(--ct-gradient-gold)" }
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					delay: .3,
					duration: .7
				},
				className: "ct-font-serif mx-auto mt-5 max-w-2xl text-lg sm:text-xl",
				style: { color: "var(--ct-muted-fg)" },
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10",
				children
			}),
			footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 flex flex-wrap items-center justify-center gap-4",
				children: footer
			})
		]
	});
}
//#endregion
export { SceneShell as t };
