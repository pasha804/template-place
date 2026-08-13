import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ct as Github, _t as Instagram, ct as Mail, p as Twitter, r as Youtube, yt as Heart } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-BTWP9whH.js
var import_jsx_runtime = require_jsx_runtime();
var cols = {
	Product: [
		{
			label: "Templates",
			href: "/templates"
		},
		{
			label: "Pricing",
			href: "/pricing"
		},
		{
			label: "Features",
			href: "/#features"
		}
	],
	Company: [
		{
			label: "About Us",
			href: "/contact"
		},
		{
			label: "Careers",
			href: "/contact"
		},
		{
			label: "Contact",
			href: "/contact"
		},
		{
			label: "Partners",
			href: "/contact"
		}
	],
	Support: [
		{
			label: "Help Center",
			href: "/contact"
		},
		{
			label: "Documentation",
			href: "/contact"
		},
		{
			label: "Status",
			href: "/contact"
		},
		{
			label: "Privacy Policy",
			href: "/contact"
		}
	]
};
var socials = [
	{
		icon: Twitter,
		href: "https://twitter.com",
		label: "Twitter",
		color: "#1d9bf0"
	},
	{
		icon: Instagram,
		href: "https://instagram.com",
		label: "Instagram",
		color: "#e1306c"
	},
	{
		icon: Youtube,
		href: "https://youtube.com",
		label: "YouTube",
		color: "#ff0000"
	},
	{
		icon: Github,
		href: "https://github.com",
		label: "GitHub",
		color: "#e6edf3"
	},
	{
		icon: Mail,
		href: "mailto:greetingvibes786@gmail.com",
		label: "Email",
		color: "#a78bfa"
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "relative mt-10 border-t border-white/[0.06]",
		style: { background: "rgba(255,255,255,0.015)" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 md:grid-cols-2 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "mb-5 flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.4)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-black text-white",
									children: "G"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-bold text-white",
								children: "Greeting Vibes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-white/35",
								children: "Templates"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 max-w-xs text-sm leading-relaxed text-white/40",
							children: "Build stunning personal websites for your loved ones. Choose a template, customize it and share your love in minutes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
								href: s.href,
								target: "_blank",
								rel: "noopener noreferrer",
								"aria-label": s.label,
								whileHover: {
									y: -3,
									scale: 1.1
								},
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 17
								},
								className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-white/40 transition-colors",
								onMouseEnter: (e) => {
									e.currentTarget.style.color = s.color;
									e.currentTarget.style.borderColor = s.color + "40";
								},
								onMouseLeave: (e) => {
									e.currentTarget.style.color = "";
									e.currentTarget.style.borderColor = "";
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4" })
							}, s.label))
						})
					]
				}), Object.entries(cols).map(([group, items], gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/30",
					children: group
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.href,
						className: "group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-3" }), item.label]
					}) }, item.label))
				})] }, group))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-white/25",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Greeting Vibes Templates. All rights reserved."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1.5 text-xs text-white/25",
					children: [
						"Made with ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-3 w-3 fill-pink-500 text-pink-500" }),
						" for every occasion"
					]
				})]
			})]
		})
	});
}
//#endregion
export { Footer as t };
