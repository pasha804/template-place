import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { C as Sparkles, Nt as Eye, Pt as EyeOff, ft as LoaderCircle, nn as ArrowRight } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cvhb4rO9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().email("Enter a valid email"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
function LoginPage() {
	const navigate = useNavigate();
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	async function onSubmit(data) {
		try {
			const { data: authData, error } = await supabase.auth.signInWithPassword({
				email: data.email,
				password: data.password
			});
			if (error || !authData.session) {
				const rawErr = (error?.message || "").toLowerCase();
				if (rawErr.includes("invalid login credentials") || rawErr.includes("invalid_credentials")) toast.error("Incorrect password or email. Please check your credentials.");
				else if (rawErr.includes("user not found") || rawErr.includes("email not found")) toast.error("Account does not exist with this email.");
				else if (rawErr.includes("email not confirmed")) toast.error("Please confirm your email before signing in.");
				else toast.error(error?.message || "Invalid credentials. Please check your email and password.");
				return;
			}
			toast.success("Welcome back!");
			await new Promise((r) => setTimeout(r, 150));
			await navigate({ to: "/dashboard" });
		} catch {
			toast.error("Authentication failed. Please check your credentials.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				style: { background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(124,58,237,0.22) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 75% 75%, rgba(244,114,182,0.16) 0%, transparent 60%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0 opacity-[0.025]",
				style: {
					backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
					backgroundSize: "48px 48px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 28
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .7,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "relative w-full max-w-[420px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "mb-5 flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow-brand)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-white" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-xl font-bold",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												background: "var(--gradient-brand)",
												WebkitBackgroundClip: "text",
												backgroundClip: "text",
												color: "transparent"
											},
											children: "Greeting"
										}),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vibes" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold",
								children: "Welcome back"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Sign in to your account to continue"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-3xl border border-[rgba(167,139,250,0.18)] p-8",
						style: {
							background: "linear-gradient(160deg, rgba(167,139,250,0.07) 0%, rgba(244,114,182,0.04) 100%)",
							backdropFilter: "blur(20px)",
							boxShadow: "0 24px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit(onSubmit),
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										htmlFor: "email",
										children: "Email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "email",
										type: "email",
										autoComplete: "email",
										placeholder: "you@example.com",
										className: "w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50",
										...register("email")
									}),
									errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: errors.email.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
											htmlFor: "password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/auth/forgot-password",
											className: "text-xs text-primary hover:text-primary/80 transition-colors",
											children: "Forgot?"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "password",
											type: showPw ? "text" : "password",
											autoComplete: "current-password",
											placeholder: "••••••••",
											className: "w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50",
											...register("password")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPw((v) => !v),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
											"aria-label": showPw ? "Hide password" : "Show password",
											children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									}),
									errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: errors.password.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isSubmitting,
									className: "group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60",
									children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sign in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })] })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: [
							"Don't have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth/signup",
								className: "font-bold text-primary hover:text-primary/80 transition-colors",
								children: "Sign up free"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { LoginPage as component };
