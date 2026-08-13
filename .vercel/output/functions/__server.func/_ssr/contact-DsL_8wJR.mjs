import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion } from "../_libs/framer-motion.mjs";
import { Ut as CircleCheck, at as MessageCircle, ct as Mail, ft as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Navbar } from "./Navbar-wFLacLti.mjs";
import { t as Footer } from "./Footer-BTWP9whH.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-DsL_8wJR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().email(),
	subject: stringType().min(5, "Subject too short"),
	message: stringType().min(20, "Message too short")
});
function ContactPage() {
	const [sent, setSent] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: u(schema) });
	async function onSubmit(data) {
		try {
			await supabase.from("support_tickets").insert({
				email: data.email,
				subject: data.subject,
				message: data.message,
				status: "open"
			});
			setSent(true);
		} catch {
			toast.error("Failed to send. Try emailing us directly.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "pt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-2xl px-4 py-16 sm:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl font-bold",
								children: "Contact us"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-muted-foreground",
								children: "Have a question or need help? Fill out the form and we'll get back to you within 24 hours."
							}),
							sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									scale: .9,
									opacity: 0
								},
								animate: {
									scale: 1,
									opacity: 1
								},
								className: "mt-10 flex flex-col items-center rounded-3xl border border-border/60 bg-surface p-12 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mb-4 h-12 w-12 text-success" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "Message received"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-muted-foreground",
										children: "We'll reply to your email within 24 hours."
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSubmit(onSubmit),
								className: "mt-10 space-y-5 rounded-3xl border border-border/60 bg-surface p-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-sm font-medium",
											children: "Email"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "you@example.com",
											className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
											...register("email")
										}),
										errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-destructive",
											children: errors.email.message
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-sm font-medium",
											children: "Subject"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "What's on your mind?",
											className: "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
											...register("subject")
										}),
										errors.subject && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-destructive",
											children: errors.subject.message
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-1.5 block text-sm font-medium",
											children: "Message"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 5,
											placeholder: "Tell us more...",
											className: "w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
											...register("message")
										}),
										errors.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-destructive",
											children: errors.message.message
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: isSubmitting,
										className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-aurora py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60",
										children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Send message"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface px-5 py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Email us directly"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:greetingvibes786@gmail.com",
									className: "text-xs text-primary hover:underline",
									children: "greetingvibes786@gmail.com"
								})] })]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ContactPage as component };
