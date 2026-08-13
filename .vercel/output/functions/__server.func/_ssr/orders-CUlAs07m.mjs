import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { Ft as ExternalLink, Ht as CircleX, Nt as Eye, Ut as CircleCheck, Wt as CircleAlert, at as MessageCircle, ft as LoaderCircle, i as X } from "../_libs/lucide-react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useApproveOrder, d as useUnpublishPage, f as useVerifyPayment, i as useAllOrders, l as useRejectOrder, n as formatPKR, u as useRequestChanges } from "./use-orders-BvFKxMDx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminNav } from "./AdminNav-AuBv0bmC.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CUlAs07m.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Admin Orders — /admin/orders
* List all orders, filter by status, open detail modal to approve/reject/publish.
*/
var STATUS_STYLES = {
	pending: {
		label: "Pending Review",
		color: "#fbbf24",
		bg: "rgba(251,191,36,0.12)",
		border: "rgba(251,191,36,0.3)"
	},
	payment_verified: {
		label: "Payment Verified",
		color: "#38bdf8",
		bg: "rgba(56,189,248,0.12)",
		border: "rgba(56,189,248,0.3)"
	},
	paid: {
		label: "Published & Paid",
		color: "#34d399",
		bg: "rgba(52,211,153,0.12)",
		border: "rgba(52,211,153,0.3)"
	},
	failed: {
		label: "Rejected",
		color: "#f87171",
		bg: "rgba(248,113,113,0.12)",
		border: "rgba(248,113,113,0.3)"
	},
	refunded: {
		label: "Refunded",
		color: "#a78bfa",
		bg: "rgba(167,139,250,0.12)",
		border: "rgba(167,139,250,0.3)"
	},
	cancelled: {
		label: "Cancelled",
		color: "#6b7280",
		bg: "rgba(107,114,128,0.12)",
		border: "rgba(107,114,128,0.3)"
	}
};
function AdminOrdersPage() {
	const navigate = useNavigate();
	const { user, isAdmin } = useAuthStore();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [rejectNotes, setRejectNotes] = (0, import_react.useState)("");
	const [changeNotes, setChangeNotes] = (0, import_react.useState)("");
	const [showRejectForm, setShowRejectForm] = (0, import_react.useState)(false);
	const [showChangeForm, setShowChangeForm] = (0, import_react.useState)(false);
	const { data: orders = [], isLoading } = useAllOrders(statusFilter !== "all" ? statusFilter : void 0);
	const verifyPayment = useVerifyPayment();
	const approve = useApproveOrder();
	const reject = useRejectOrder();
	const requestChange = useRequestChanges();
	const unpublish = useUnpublishPage();
	(0, import_react.useEffect)(() => {
		if (!user) {
			navigate({ to: "/auth/login" });
			return;
		}
		if (!isAdmin) {
			navigate({ to: "/dashboard" });
			return;
		}
	}, [
		user,
		isAdmin,
		navigate
	]);
	async function handleVerifyPayment(order) {
		try {
			await verifyPayment.mutateAsync({ orderId: order.id });
			toast.success("Payment proof verified! Ready to publish live.");
		} catch (err) {
			toast.error(`Failed to verify payment: ${err?.message || "Unknown error"}`);
		}
	}
	async function handleApprove(order) {
		if (!order.page_id) {
			toast.error("No page linked to this order");
			return;
		}
		try {
			const result = await approve.mutateAsync({
				orderId: order.id,
				pageId: order.page_id
			});
			toast.success(`Published at /p/${result.slug}`);
			setSelected(null);
		} catch (err) {
			toast.error(`Failed to approve order: ${err?.message || "Unknown error"}`);
		}
	}
	async function handleReject(order) {
		if (!order.page_id) {
			toast.error("No page linked");
			return;
		}
		try {
			await reject.mutateAsync({
				orderId: order.id,
				pageId: order.page_id,
				notes: rejectNotes
			});
			toast.success("Order rejected");
			setSelected(null);
			setRejectNotes("");
			setShowRejectForm(false);
		} catch {
			toast.error("Failed to reject order");
		}
	}
	async function handleRequestChanges(order) {
		if (!changeNotes.trim()) {
			toast.error("Please enter change notes");
			return;
		}
		try {
			await requestChange.mutateAsync({
				orderId: order.id,
				notes: changeNotes
			});
			toast.success("Change request sent — page reverted to draft");
			setSelected(null);
			setChangeNotes("");
			setShowChangeForm(false);
		} catch {
			toast.error("Failed to request changes");
		}
	}
	const statusTabs = [
		{
			label: "All",
			value: "all"
		},
		{
			label: "Pending Review",
			value: "pending"
		},
		{
			label: "Payment Verified",
			value: "payment_verified"
		},
		{
			label: "Published & Paid",
			value: "paid"
		},
		{
			label: "Rejected",
			value: "failed"
		}
	];
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-black text-white",
							children: "Orders"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40",
							children: [orders.length, " total"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 flex flex-wrap gap-2",
						children: statusTabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setStatusFilter(t.value),
							className: cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-all", statusFilter === t.value ? "bg-violet-600 text-white" : "border border-white/[0.08] text-white/40 hover:text-white/70"),
							children: t.label
						}, t.value))
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-2xl bg-white/[0.04]" }, i))
					}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mb-3 h-10 w-10 text-white/20" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/50",
							children: "No orders found"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-2xl border border-white/[0.07]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-b border-white/[0.06] bg-white/[0.03]",
								children: [
									"Order ID",
									"Template",
									"Amount",
									"Payment",
									"Status",
									"Date",
									"Actions"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30",
									children: h
								}, h))
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.map((order, i) => {
								const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.cancelled;
								const templateName = order.order_items?.[0]?.label ?? "—";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									transition: { delay: i * .03 },
									className: "border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-white/70",
												children: order.reference
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/80 font-medium",
												children: templateName
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-white",
												children: formatPKR(order.total_cents)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/50 capitalize",
												children: order.payment_method ?? order.provider ?? "—"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize",
												style: {
													color: st.color,
													background: st.bg,
													borderColor: st.border
												},
												children: st.label
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white/40 text-xs",
												children: format(new Date(order.created_at), "MMM d, HH:mm")
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setSelected(order),
												className: "flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }), " Review"]
											})
										})
									]
								}, order.id);
							}) })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm",
				onClick: (e) => {
					if (e.target === e.currentTarget) setSelected(null);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 30,
						scale: .97
					},
					animate: {
						opacity: 1,
						y: 0,
						scale: 1
					},
					exit: {
						opacity: 0,
						y: 20,
						scale: .97
					},
					className: "my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f0d24]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-white/[0.06] px-6 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-bold text-white",
							children: ["Order #", selected.reference]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-white/40",
							children: format(new Date(selected.created_at), "MMMM d, yyyy · HH:mm")
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setSelected(null);
								setShowRejectForm(false);
								setShowChangeForm(false);
							},
							className: "flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									(() => {
										const st = STATUS_STYLES[selected.status] ?? STATUS_STYLES.cancelled;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full border px-3 py-1 text-xs font-bold capitalize",
											style: {
												color: st.color,
												background: st.bg,
												borderColor: st.border
											},
											children: st.label
										});
									})(),
									selected.whatsapp_sent && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 rounded-full bg-green-500/15 border border-green-500/25 px-3 py-1 text-xs font-medium text-green-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3 w-3" }), " WhatsApp sent"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-white/30 ml-auto font-semibold",
										children: formatPKR(selected.total_cents)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										label: "Template",
										value: selected.order_items?.[0]?.label ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										label: "Payment",
										value: selected.payment_method ?? selected.provider ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										label: "User ID",
										value: selected.user_id.slice(0, 12) + "…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
										label: "Currency",
										value: "PKR"
									})
								]
							}),
							selected.payment_screenshot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs font-semibold uppercase tracking-widest text-white/30",
								children: "Payment Screenshot"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-2xl border border-white/[0.08]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: selected.payment_screenshot,
									alt: "Payment proof",
									className: "max-h-64 w-full object-contain bg-black/40"
								})
							})] }),
							selected.admin_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-amber-500/20 bg-amber-500/5 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-amber-400 mb-1",
									children: "Admin Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-white/70",
									children: selected.admin_notes
								})]
							}),
							selected.page_id && (() => {
								const templateId = selected.order_items?.[0]?.template_id ?? "";
								if (!templateId) return null;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `/editor/template/${templateId}?pageId=${selected.page_id}`,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/60 hover:text-white transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-4 w-4" }), "View template configuration"]
								});
							})(),
							showRejectForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									height: 0
								},
								animate: {
									opacity: 1,
									height: "auto"
								},
								className: "rounded-2xl border border-red-500/20 bg-red-500/5 p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-red-400",
										children: "Reason for rejection"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: rejectNotes,
										onChange: (e) => setRejectNotes(e.target.value),
										placeholder: "Payment screenshot unclear / Amount mismatch / …",
										className: "w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-red-500/50 placeholder:text-white/25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleReject(selected),
											disabled: reject.isPending,
											className: "flex items-center gap-2 rounded-xl bg-red-600/80 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50",
											children: [reject.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3.5 w-3.5" }), "Confirm Reject"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowRejectForm(false),
											className: "rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white",
											children: "Cancel"
										})]
									})
								]
							}),
							showChangeForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									height: 0
								},
								animate: {
									opacity: 1,
									height: "auto"
								},
								className: "rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold text-amber-400",
										children: "Changes required"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										value: changeNotes,
										onChange: (e) => setChangeNotes(e.target.value),
										placeholder: "Please update the recipient's name / Fix the letter / …",
										className: "w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-amber-500/50 placeholder:text-white/25"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleRequestChanges(selected),
											disabled: requestChange.isPending,
											className: "flex items-center gap-2 rounded-xl bg-amber-600/80 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50",
											children: [requestChange.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : null, "Send Request"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowChangeForm(false),
											className: "rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white",
											children: "Cancel"
										})]
									})
								]
							}),
							selected.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 border-t border-white/[0.06] pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleVerifyPayment(selected),
									disabled: verifyPayment.isPending,
									className: "flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50",
									children: [verifyPayment.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Step 1: Verify Payment"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setShowRejectForm(true);
										setShowChangeForm(false);
									},
									className: "flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject Order"]
								})]
							}),
							selected.status === "payment_verified" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3 border-t border-white/[0.06] pt-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => handleApprove(selected),
										disabled: approve.isPending,
										className: "flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50",
										children: [approve.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Step 2: Publish Live"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setShowChangeForm(true);
											setShowRejectForm(false);
										},
										className: "flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-400 hover:bg-amber-500/15 transition-colors",
										children: "Request Changes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setShowRejectForm(true);
											setShowChangeForm(false);
										},
										className: "flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Reject Order"]
									})
								]
							}),
							selected.status === "paid" && selected.page_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-3 border-t border-white/[0.06] pt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: async () => {
										await unpublish.mutateAsync(selected.page_id);
										toast.success("Page unpublished");
										setSelected(null);
									},
									className: "rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors",
									children: "Unpublish Website"
								})
							})
						]
					})]
				})
			}) })
		]
	});
}
function InfoRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] uppercase tracking-widest text-white/25 mb-0.5",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-white/80 font-medium truncate",
		children: value
	})] });
}
//#endregion
export { AdminOrdersPage as component };
