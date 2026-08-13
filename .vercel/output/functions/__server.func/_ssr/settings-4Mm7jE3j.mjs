import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { b as Sun, et as Moon, g as Trash2, j as Shield, lt as LogOut } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useAuth } from "./use-auth-BkAzBpck.mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { t as DashboardNav } from "./DashboardNav-Cbb2hl6P.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-4Mm7jE3j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getInitialDark() {
	if (typeof window === "undefined") return true;
	const stored = localStorage.getItem("shaukat-theme");
	if (stored === "light") return false;
	if (stored === "dark") return true;
	return true;
}
function applyTheme(dark) {
	const root = document.documentElement;
	if (dark) {
		root.classList.remove("light");
		localStorage.setItem("shaukat-theme", "dark");
	} else {
		root.classList.add("light");
		localStorage.setItem("shaukat-theme", "light");
	}
}
function ThemeToggle({ className }) {
	const [dark, setDark] = (0, import_react.useState)(getInitialDark);
	(0, import_react.useEffect)(() => {
		applyTheme(dark);
	}, [dark]);
	(0, import_react.useEffect)(() => {
		applyTheme(getInitialDark());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setDark((d) => !d),
		className: cn("flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-muted-foreground backdrop-blur transition-all hover:border-primary/40 hover:text-foreground", className),
		"aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
		children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
	});
}
function SettingsPage() {
	const navigate = useNavigate();
	const { user, signOut } = useAuth();
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user]);
	async function handleSignOut() {
		await signOut();
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl pt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mb-8 text-2xl font-bold",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "rounded-2xl border border-border/60 bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 font-semibold",
								children: "Appearance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Theme"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Switch between light and dark mode"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .05 },
							className: "rounded-2xl border border-border/60 bg-surface p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-4 font-semibold",
								children: "Account"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: user?.email
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 text-success" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: handleSignOut,
									className: "flex w-full items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground transition-all hover:border-destructive/30 hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out of all devices"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: .1 },
							className: "rounded-2xl border border-destructive/20 bg-destructive/5 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mb-2 font-semibold text-destructive",
									children: "Danger zone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 text-xs text-muted-foreground",
									children: "These actions are permanent and cannot be undone."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toast.error("To delete your account, contact support at greetingvibes786@gmail.com"),
									className: "flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm text-destructive transition-all hover:bg-destructive/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete account"]
								})
							]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { SettingsPage as component };
