import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SceneShell-Dy13sQuy.js
var import_jsx_runtime = require_jsx_runtime();
function SceneShell({ title, subtitle, children, footerSlot, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 w-full flex-1 flex-col items-center justify-center px-5 py-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h2, {
				initial: {
					opacity: 0,
					y: 26,
					filter: "blur(10px)"
				},
				animate: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)"
				},
				transition: {
					duration: 1,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "script gradient-text leading-tight",
				style: { fontSize: "clamp(2.5rem,8vw,4.5rem)" },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scaleX: 0
				},
				animate: {
					opacity: 1,
					scaleX: 1
				},
				transition: {
					delay: .2,
					duration: .9,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "mt-4 h-px w-32",
				style: { backgroundImage: "var(--gradient-aurora)" }
			}),
			subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .25,
					duration: .9
				},
				className: "mt-4 max-w-xl text-sm leading-relaxed sm:text-base",
				style: { color: "var(--muted-foreground)" },
				children: subtitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 30
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .4,
					duration: 1,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: `mt-8 flex w-full flex-1 flex-col items-center justify-center ${className}`,
				children
			}),
			footerSlot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					delay: .7,
					duration: .8
				},
				className: "mt-7 flex flex-col items-center gap-3",
				children: footerSlot
			})
		]
	});
}
//#endregion
export { SceneShell as t };
