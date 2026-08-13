import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { C as Sparkles, Nt as Eye, Pt as EyeOff, Ut as CircleCheck, Wt as CircleAlert, ft as LoaderCircle } from "../_libs/lucide-react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-D76pFcew.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	password: stringType().min(8, "Password must be at least 8 characters"),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords do not match",
	path: ["confirm"]
});
function ResetPasswordPage() {
	const navigate = useNavigate();
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const [showCf, setShowCf] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [invalid, setInvalid] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	const pw = watch("password") ?? "";
	const strength = pw.length >= 12 ? 3 : pw.length >= 8 ? 2 : pw.length >= 4 ? 1 : 0;
	const strengthColors = [
		"",
		"#f87171",
		"#fbbf24",
		"#34d399"
	];
	const strengthLabels = [
		"",
		"Weak",
		"Good",
		"Strong"
	];
	(0, import_react.useEffect)(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
			if (event === "PASSWORD_RECOVERY") setReady(true);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setReady(true);
			else setTimeout(() => {
				supabase.auth.getSession().then(({ data: d2 }) => {
					if (!d2.session) setInvalid(true);
				});
			}, 1500);
		});
		return () => subscription.unsubscribe();
	}, []);
	async function onSubmit(data) {
		const { error } = await supabase.auth.updateUser({ password: data.password });
		if (error) {
			toast.error(error.message);
			return;
		}
		setDone(true);
		setTimeout(() => navigate({ to: "/dashboard" }), 2500);
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .88,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			transition: {
				type: "spring",
				stiffness: 180,
				damping: 18
			},
			className: "w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(52,211,153,0.25)] p-10 text-center",
			style: {
				background: "linear-gradient(160deg, rgba(52,211,153,0.08) 0%, rgba(167,139,250,0.05) 100%)",
				backdropFilter: "blur(20px)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-emerald-400" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Password updated"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted-foreground",
					children: "Your new password is set. Redirecting you to the dashboard…"
				})
			]
		})
	});
	if (invalid) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .88,
				opacity: 0
			},
			animate: {
				scale: 1,
				opacity: 1
			},
			className: "w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(248,113,113,0.25)] p-10 text-center",
			style: {
				background: "linear-gradient(160deg, rgba(248,113,113,0.08) 0%, rgba(167,139,250,0.04) 100%)",
				backdropFilter: "blur(20px)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto mb-4 h-10 w-10 text-red-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					children: "Link expired"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This password reset link has expired or already been used."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth/forgot-password",
					className: "mt-6 block rounded-2xl bg-[image:var(--gradient-brand)] py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)]",
					children: "Request a new link"
				})
			]
		})
	});
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
			className: "h-8 w-8 animate-spin",
			style: { color: "rgba(167,139,250,0.8)" }
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute inset-0",
				style: { background: "radial-gradient(ellipse 60% 55% at 50% 20%, rgba(124,58,237,0.20) 0%, transparent 60%)" }
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
								children: "Set new password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Choose a strong password for your account"
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
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										htmlFor: "password",
										children: "New password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "password",
											type: showPw ? "text" : "password",
											autoComplete: "new-password",
											placeholder: "At least 8 characters",
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
									pw.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-1 gap-1",
											children: [
												1,
												2,
												3
											].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-1 flex-1 rounded-full transition-all duration-300",
												style: { background: strength >= s ? strengthColors[strength] : "rgba(167,139,250,0.15)" }
											}, s))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium",
											style: { color: strengthColors[strength] },
											children: strengthLabels[strength]
										})]
									}),
									errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: errors.password.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										htmlFor: "confirm",
										children: "Confirm password"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											id: "confirm",
											type: showCf ? "text" : "password",
											autoComplete: "new-password",
											placeholder: "Repeat your password",
											className: "w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50",
											...register("confirm")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowCf((v) => !v),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
											"aria-label": showCf ? "Hide password" : "Show password",
											children: showCf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})]
									}),
									errors.confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: errors.confirm.message
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: isSubmitting,
									className: "group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60",
									children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Update password"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-sm text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth/login",
							className: "font-bold text-primary hover:text-primary/80 transition-colors",
							children: "← Back to sign in"
						})
					})
				]
			})
		]
	});
}
//#endregion
export { ResetPasswordPage as component };
