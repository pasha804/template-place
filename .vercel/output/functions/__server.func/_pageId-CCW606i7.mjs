import { o as __toESM } from "./_runtime.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "./_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "./_libs/framer-motion.mjs";
import { Gt as ChevronRight, M as ShieldCheck, Ut as CircleCheck, at as MessageCircle, d as Upload, ft as LoaderCircle, i as X, rn as ArrowLeft } from "./_libs/lucide-react.mjs";
import { o as getExternalTemplate } from "./_ssr/registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./_ssr/auth-Dy4ewPDE.mjs";
import { _ as useNavigate, g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_pageId-DAvt69nF.mjs";
import { c as usePlaceOrder, n as formatPKR, o as useMarkWhatsappSent, t as PLANS_PKR } from "./_ssr/use-orders-BvFKxMDx.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { r as usePage } from "./_ssr/use-pages-DEg-ttb2.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_pageId-CCW606i7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Checkout — /checkout/:pageId
*
* Shown after user finishes editing and clicks "Continue".
* PKR pricing, JazzCash / EasyPaisa / Bank Transfer.
* On "Place Order" → creates order, marks page pending_approval,
* then shows WhatsApp redirect.
*/
var PAYMENT_METHODS = [
	{
		id: "easypaisa",
		label: "EasyPaisa",
		emoji: "💚",
		instructions: [
			"Open EasyPaisa app or dial *786*2#",
			"Send payment to: +92 332 4967481",
			"Account name: Shaukat Ali",
			"Take a screenshot of the transaction",
			"Upload the screenshot below"
		]
	},
	{
		id: "bank",
		label: "Bank Transfer",
		emoji: "🏦",
		instructions: [
			"Bank: UBL (United Bank Limited)",
			"Account Title: Shaukat Ali",
			"IBAN: PK34UNIL0109000253737045",
			"Take a screenshot after transfer",
			"Upload the receipt below"
		]
	},
	{
		id: "paypal",
		label: "PayPal",
		emoji: "💙",
		instructions: [
			"Send payment to: shaukat.ali590@gmail.com",
			"PayPal username: @shaukatali5900",
			"Use 'Friends & Family' to avoid fees",
			"Add your Order ID in the note",
			"Upload the payment screenshot below"
		]
	}
];
function CheckoutPage() {
	const { pageId } = Route.useParams();
	const navigate = useNavigate();
	const user = useAuthStore((s) => s.user);
	const { data: page, isLoading } = usePage(pageId);
	const placeOrder = usePlaceOrder();
	const markWhatsapp = useMarkWhatsappSent();
	const [selectedPlan, setSelectedPlan] = (0, import_react.useState)("premium");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("easypaisa");
	const [screenshot, setScreenshot] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("plan");
	const [orderId, setOrderId] = (0, import_react.useState)("");
	const [orderRef, setOrderRef] = (0, import_react.useState)("");
	const [whatsappSent, setWhatsappSent] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!user) navigate({ to: "/auth/login" });
	}, [user, navigate]);
	const plugin = page ? getExternalTemplate(page.template_id) : null;
	const plan = PLANS_PKR.find((p) => p.key === selectedPlan) ?? PLANS_PKR[1];
	const method = PAYMENT_METHODS.find((m) => m.id === paymentMethod) ?? PAYMENT_METHODS[0];
	function handleFileUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 5 * 1024 * 1024) {
			toast.error("File too large — max 5 MB");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => setScreenshot(reader.result);
		reader.readAsDataURL(file);
	}
	async function handlePlaceOrder() {
		if (!user || !page || !plugin) return;
		if (!screenshot) {
			toast.error("Please upload your payment screenshot");
			return;
		}
		try {
			const o = await placeOrder.mutateAsync({
				userId: user.id,
				pageId: page.id,
				templateId: plugin.manifest.id,
				templateName: plugin.manifest.name,
				planKey: selectedPlan,
				pricePaisa: plan.pricePaisa,
				paymentMethod,
				paymentScreenshot: screenshot
			});
			const ref = o?.reference || o?.id || `ORD-${Date.now().toString().slice(-6)}`;
			setOrderId(o?.id || ref);
			setOrderRef(ref);
			setStep("success");
		} catch {
			toast.error("Failed to place order. Please try again.");
		}
	}
	function buildWhatsAppMessage() {
		return encodeURIComponent(`Hello Greeting Vibes,

I have customized the following template and completed payment.

Order ID: ${orderRef}
Template: ${plugin?.manifest.name ?? "—"}
Payment Method: ${method.label}
Amount: ${formatPKR(plan.pricePaisa)}

I have uploaded my payment screenshot in the order system.
Please verify my payment and publish my website.

Thank you.`);
	}
	function openWhatsApp() {
		const msg = buildWhatsAppMessage();
		window.open(`https://wa.me/923084453846?text=${msg}`, "_blank");
		if (orderId) markWhatsapp.mutate(orderId);
		setWhatsappSent(true);
	}
	if (isLoading || !page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-[#08071a]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-violet-400" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a]",
		style: { fontFamily: "'Manrope', sans-serif" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#08071a]/90 px-4 backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({
					to: "/editor/template/$templateId",
					params: { templateId: page.template_id },
					search: { pageId: page.id }
				}),
				className: "flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to editor"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-semibold text-white/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-400" }), "Secure Checkout"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10 flex items-center justify-center gap-0",
				children: [
					"Select Plan",
					"Payment",
					"Confirmed"
				].map((s, i) => {
					const current = step === "plan" ? 0 : step === "payment" ? 1 : 2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all", i < current ? "bg-emerald-500 text-white" : i === current ? "bg-violet-600 text-white" : "bg-white/[0.06] text-white/30"),
								children: i < current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : i + 1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mx-2 text-xs font-medium hidden sm:block", i === current ? "text-white" : "text-white/30"),
								children: s
							}),
							i < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-white/20 mx-1" })
						]
					}, s);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
				mode: "wait",
				children: [
					step === "plan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: 30
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -30
						},
						className: "grid gap-8 lg:grid-cols-[1fr_380px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mb-2 text-2xl font-black text-white",
								children: "Choose your plan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-8 text-sm text-white/40",
								children: "All plans publish your personalized page for you"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: PLANS_PKR.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									type: "button",
									whileTap: { scale: .99 },
									onClick: () => setSelectedPlan(p.key),
									className: cn("relative w-full rounded-2xl border p-5 text-left transition-all", selectedPlan === p.key ? "border-violet-500/60 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]" : "border-white/[0.07] bg-white/[0.03] hover:border-white/15"),
									children: [p.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 right-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-0.5 text-[10px] font-bold text-white",
										children: "Most Popular"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-bold text-white",
											children: p.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "mt-2 space-y-1",
											children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-center gap-2 text-xs text-white/55",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3 text-emerald-400 shrink-0" }),
													" ",
													f
												]
											}, f))
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-4 text-right shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-2xl font-black text-white",
												children: ["Rs. ", p.pricePKR.toLocaleString()]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-white/35",
												children: "PKR"
											})]
										})]
									})]
								}, p.key))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:sticky lg:top-24 lg:self-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mb-4 font-bold text-white",
										children: "Order Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-5 overflow-hidden rounded-2xl border border-white/[0.06]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-24 items-center justify-center text-4xl",
											style: { background: plugin?.manifest.coverGradient ?? "linear-gradient(135deg,#3d0000,#000)" },
											children: plugin?.manifest.thumbnailUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: plugin.manifest.thumbnailUrl,
												alt: "",
												className: "h-full w-full object-cover"
											}) : plugin?.manifest.accentEmoji
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-semibold text-white",
												children: page.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-white/40",
												children: plugin?.manifest.name
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 border-t border-white/[0.06] pt-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Plan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white font-medium",
													children: plan.label
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Subtotal"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-white",
													children: ["Rs. ", plan.pricePKR.toLocaleString()]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Discount"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-400",
													children: "—"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between border-t border-white/[0.06] pt-3 text-base font-black",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white",
													children: "Total"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-white",
													children: ["Rs. ", plan.pricePKR.toLocaleString()]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
										whileTap: { scale: .98 },
										onClick: () => setStep("payment"),
										className: "mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:scale-[1.02] transition-all",
										children: "Continue to Payment →"
									})
								]
							})
						})]
					}, "plan"),
					step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							x: 30
						},
						animate: {
							opacity: 1,
							x: 0
						},
						exit: {
							opacity: 0,
							x: -30
						},
						className: "grid gap-8 lg:grid-cols-[1fr_380px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mb-2 text-2xl font-black text-white",
								children: "Payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 text-sm text-white/40",
								children: "Select a payment method and upload your receipt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 flex flex-col sm:flex-row gap-2",
								children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setPaymentMethod(m.id),
									className: cn("flex-1 rounded-2xl border py-3 text-sm font-semibold transition-all", paymentMethod === m.id ? "border-violet-500/60 bg-violet-500/10 text-white" : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:text-white/80"),
									children: [
										m.emoji,
										" ",
										m.label
									]
								}, m.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-xs font-bold uppercase tracking-widest text-white/40",
									children: "Instructions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "space-y-2",
									children: method.instructions.map((ins, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-3 text-sm text-white/70",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400",
											children: i + 1
										}), ins]
									}, i))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-xs font-bold uppercase tracking-widest text-white/40",
										children: "Payment Screenshot *"
									}),
									screenshot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative overflow-hidden rounded-xl border border-white/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: screenshot,
												alt: "Payment proof",
												className: "max-h-48 w-full object-contain bg-black/30"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setScreenshot(""),
												className: "absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-red-400",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 bg-emerald-500/10 px-3 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-emerald-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-emerald-400 font-medium",
													children: "Screenshot uploaded"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => fileRef.current?.click(),
										className: "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 py-8 text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm",
												children: "Click to upload screenshot"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-white/25",
												children: "PNG, JPG — max 5 MB"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										ref: fileRef,
										type: "file",
										accept: "image/*",
										className: "hidden",
										onChange: handleFileUpload
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:sticky lg:top-24 lg:self-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mb-4 font-bold text-white",
										children: "Order Summary"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Template"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white font-medium",
													children: plugin?.manifest.name
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Plan"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white font-medium",
													children: plan.label
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/50",
													children: "Payment via"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white font-medium",
													children: method.label
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between border-t border-white/[0.06] pt-3 text-lg font-black",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white",
													children: "Total"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-white",
													children: ["Rs. ", plan.pricePKR.toLocaleString()]
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
										type: "button",
										whileTap: { scale: .98 },
										onClick: handlePlaceOrder,
										disabled: placeOrder.isPending || !screenshot,
										className: "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
										children: placeOrder.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Placing Order…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
											" Place Order — Rs. ",
											plan.pricePKR.toLocaleString()
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setStep("plan"),
										className: "mt-3 w-full text-center text-xs text-white/30 hover:text-white/60 transition-colors",
										children: "← Back to plans"
									})
								]
							})
						})]
					}, "payment"),
					step === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						className: "mx-auto max-w-lg text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: { scale: 0 },
								animate: { scale: 1 },
								transition: {
									delay: .15,
									type: "spring",
									bounce: .5
								},
								className: "mb-6 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-emerald-400" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mb-2 text-3xl font-black text-white",
								children: "Order Placed!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-1 text-white/50 text-sm",
								children: ["Order ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-white/80",
									children: orderRef
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-8 text-sm text-white/40",
								children: [
									"Your page is now ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-amber-400 font-semibold",
										children: "pending payment verification"
									}),
									". Send us your order details on WhatsApp so we can verify faster."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								type: "button",
								whileTap: { scale: .97 },
								whileHover: { scale: 1.03 },
								onClick: openWhatsApp,
								className: cn("mb-4 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-bold text-white transition-all", whatsappSent ? "bg-emerald-600/80 border border-emerald-500/40" : "bg-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.45)]"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }), whatsappSent ? "Sent on WhatsApp ✓" : "Send Order to WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-widest text-white/30 mb-2",
									children: "What happens next?"
								}), [
									"Admin receives your order & payment screenshot",
									"Payment is verified (usually within 2-4 hours)",
									"Your page goes live at greetingvibes.com/p/your-slug",
									"You get notified when it's published"
								].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400",
										children: i + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-white/60",
										children: step
									})]
								}, i))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								className: "inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Go to dashboard"]
							})
						]
					}, "success")
				]
			})]
		})]
	});
}
//#endregion
export { CheckoutPage as component };
