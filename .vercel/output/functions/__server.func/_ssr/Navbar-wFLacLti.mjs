import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { I as Search, P as Settings, b as Sun, en as Bell, et as Moon, ht as LayoutDashboard, i as X, lt as LogOut, ot as Menu, qt as ChevronDown, u as User } from "../_libs/lucide-react.mjs";
import { g as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as useAuth } from "./use-auth-BkAzBpck.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Navbar-wFLacLti.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var navLinks = [
	{
		label: "Home",
		href: "/"
	},
	{
		label: "Templates",
		href: "/templates"
	},
	{
		label: "Pricing",
		href: "/pricing"
	},
	{
		label: "Contact",
		href: "/contact"
	}
];
function useDark() {
	const [dark, setDark] = (0, import_react.useState)(() => {
		if (typeof window === "undefined") return true;
		return localStorage.getItem("shaukat-theme") !== "light";
	});
	(0, import_react.useEffect)(() => {
		document.documentElement.classList.toggle("light", !dark);
		localStorage.setItem("shaukat-theme", dark ? "dark" : "light");
	}, [dark]);
	return [dark, setDark];
}
function Navbar() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [profileOpen, setProfile] = (0, import_react.useState)(false);
	const [searchOpen, setSearch] = (0, import_react.useState)(false);
	const [dark, setDark] = useDark();
	const { user, isAdmin, signOut } = useAuth();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const h = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", h, { passive: true });
		return () => window.removeEventListener("scroll", h);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
		setProfile(false);
		setSearch(false);
	}, [router.state.location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled ? "border-b border-white/[0.06] bg-[#0a0914]/90 backdrop-blur-xl py-3" : "bg-transparent py-4"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2.5 mr-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-black text-white",
							children: "G"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold text-white",
							children: "Greeting Vibes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-white/40",
							children: "Templates"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden flex-1 items-center gap-0.5 md:flex",
					children: navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: l.href,
						className: "flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white",
						activeProps: { className: "text-pink-400 font-semibold" },
						activeOptions: { exact: l.href === "/" },
						children: [l.label, l.hasDropdown && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-50" })]
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 md:flex ml-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 text-sm text-white/40 backdrop-blur",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px]",
										children: "Search templates..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
										className: "ml-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30",
										children: "/"
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDark((d) => !d),
							className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white/50 transition-all hover:text-white",
							"aria-label": "Toggle theme",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setProfile((p) => !p),
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]",
								children: user.email?.[0]?.toUpperCase() ?? "U"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: profileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 8,
									scale: .95
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								exit: {
									opacity: 0,
									y: 6,
									scale: .95
								},
								transition: { duration: .15 },
								className: "absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0d24]/95 p-1.5 shadow-xl backdrop-blur-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border-b border-white/[0.06] px-3 py-2.5 mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-white/40",
											children: "Signed in as"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-semibold text-white",
											children: user.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropItem, {
										to: "/dashboard",
										icon: LayoutDashboard,
										label: "Dashboard"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropItem, {
										to: "/dashboard/profile",
										icon: User,
										label: "Profile"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropItem, {
										to: "/dashboard/notifications",
										icon: Bell,
										label: "Notifications"
									}),
									isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavDropItem, {
										to: "/admin",
										icon: Settings,
										label: "Admin Panel",
										accent: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 border-t border-white/[0.06] pt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: signOut,
											className: "flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"]
										})
									})
								]
							}) })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/login",
							className: "rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white",
							children: "Log in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth/signup",
							className: "flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]",
							children: ["Sign up", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base leading-none",
								children: "→"
							})]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-2 md:hidden ml-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen((p) => !p),
						className: "flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white/70",
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				height: 0
			},
			animate: {
				opacity: 1,
				height: "auto"
			},
			exit: {
				opacity: 0,
				height: 0
			},
			transition: { duration: .22 },
			className: "overflow-hidden border-t border-white/[0.06] bg-[#0a0914]/95 backdrop-blur-xl md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1 px-4 py-4",
				children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.href,
					className: "rounded-xl px-4 py-3 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white",
					children: l.label
				}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "rounded-xl bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white",
						children: "Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: signOut,
						className: "rounded-xl border border-red-500/30 px-4 py-3 text-center text-sm text-red-400",
						children: "Sign out"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/login",
						className: "rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-white/80",
						children: "Log in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth/signup",
						className: "rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-3 text-center text-sm font-bold text-white",
						children: "Sign up"
					})] })
				})]
			})
		}) })]
	});
}
function NavDropItem({ to, icon: Icon, label, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/[0.05]", accent ? "text-violet-400" : "text-white/60 hover:text-white"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }),
			" ",
			label
		]
	});
}
//#endregion
export { Navbar as t };
