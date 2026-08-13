import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { x as Star } from "../_libs/lucide-react.mjs";
import { t as GlowButton } from "./registry-BOtXfR_2.mjs";
import { t as SceneShell } from "./SceneShell-DjkoBOmZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Journey-C81ZjBNF.js
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_MILESTONES = [
	{
		title: "The Beginning",
		copy: "A quiet decision no one applauded. You started anyway."
	},
	{
		title: "The Hard Work",
		copy: "Long nights, early mornings, and a hundred small sacrifices nobody saw."
	},
	{
		title: "The Breakthrough",
		copy: "The moment it finally clicked — and you realised you were capable all along."
	},
	{
		title: "Today: Victory",
		copy: "The proof, in your hands. Earned entirely, undeniably, by you."
	}
];
function Journey({ onNext, milestones }) {
	const items = milestones && milestones.length > 0 ? milestones.map((m) => ({
		title: m.title,
		copy: m.copy || m.text || ""
	})) : DEFAULT_MILESTONES;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SceneShell, {
		title: "The Journey",
		subtitle: "Every great achievement is the result of countless small steps.",
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowButton, {
			onClick: onNext,
			children: "Continue"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-2xl pl-8 text-left sm:pl-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { scaleY: 0 },
				animate: { scaleY: 1 },
				transition: {
					duration: 1.6,
					ease: "easeInOut"
				},
				className: "absolute top-2 bottom-2 left-2.5 w-px origin-top sm:left-6",
				style: { backgroundImage: "var(--ct-gradient-gold)" }
			}), items.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
				initial: {
					opacity: 0,
					x: -22
				},
				animate: {
					opacity: 1,
					x: 0
				},
				transition: {
					delay: .45 + i * .28,
					duration: .6
				},
				className: "ct-glass ct-hover-lift relative mb-5 rounded-2xl p-4 sm:mb-6 sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-6 -left-[1.65rem] flex h-6 w-6 items-center justify-center rounded-full sm:-left-[2.6rem]",
						style: {
							backgroundImage: "var(--ct-gradient-gold)",
							boxShadow: "var(--ct-shadow-gold)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
							className: "h-3.5 w-3.5",
							style: { color: "var(--ct-primary-fg)" },
							"aria-hidden": true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "ct-font-script text-lg sm:text-2xl",
						style: { color: "var(--ct-accent)" },
						children: m.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ct-font-serif mt-2 text-sm sm:text-lg",
						style: { color: "var(--ct-muted-fg)" },
						children: m.copy
					})
				]
			}, m.title))]
		})
	});
}
//#endregion
export { Journey };
