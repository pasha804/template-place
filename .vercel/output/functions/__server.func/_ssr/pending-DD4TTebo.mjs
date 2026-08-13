import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { d as require_jsx_runtime } from "../_libs/@react-three/drei+[...].mjs";
import { c as motion, l as AnimatePresence } from "../_libs/framer-motion.mjs";
import { Ht as CircleX, Lt as DollarSign, Nt as Eye, Ut as CircleCheck, Wt as CircleAlert, ct as Mail, i as X, u as User, vt as Image } from "../_libs/lucide-react.mjs";
import { o as getExternalTemplate } from "./registry-BOtXfR_2.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useApproveOrder, l as useRejectOrder, n as formatPKR, s as usePendingWebsites, u as useRequestChanges } from "./use-orders-BvFKxMDx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AdminNav } from "./AdminNav-AuBv0bmC.mjs";
import { n as format } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pending-DD4TTebo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Pending Websites — /admin/pending
* Dedicated queue for reviewing, live-previewing, and publishing pending websites after user payment.
*/
function AdminPendingWebsitesPage() {
	const navigate = useNavigate();
	const { user, isAdmin } = useAuthStore();
	const { data: pendingItems = [], isLoading, refetch } = usePendingWebsites();
	const approve = useApproveOrder();
	const reject = useRejectOrder();
	useRequestChanges();
	const [previewItem, setPreviewItem] = (0, import_react.useState)(null);
	const [screenshotModal, setScreenshotModal] = (0, import_react.useState)(null);
	const [rejectingItem, setRejectingItem] = (0, import_react.useState)(null);
	const [rejectNotes, setRejectNotes] = (0, import_react.useState)("");
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
	async function handlePublish(orderId, pageObj) {
		try {
			if (!orderId) {
				toast.error("Order ID is required");
				return;
			}
			const res = await approve.mutateAsync({
				orderId,
				pageId: pageObj.id
			});
			toast.success(`Published successfully! Live at /p/${res.slug}`);
			refetch();
			setPreviewItem(null);
		} catch (e) {
			console.error("Publish error:", e);
			toast.error("Failed to publish website");
		}
	}
	async function handleRejectConfirm() {
		if (!rejectingItem) return;
		try {
			await reject.mutateAsync({
				orderId: rejectingItem.orderId,
				pageId: rejectingItem.pageId,
				notes: rejectNotes || "Payment could not be verified."
			});
			toast.success("Website request rejected");
			setRejectingItem(null);
			setRejectNotes("");
			refetch();
		} catch {
			toast.error("Failed to reject website");
		}
	}
	if (!isAdmin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#08071a] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-black",
							children: "Pending Websites Queue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400",
							children: [pendingItems.length, " Pending Approval"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-white/50",
						children: "Review customized user templates, verify payment screenshots, and publish websites live."
					})] })
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-2xl bg-white/[0.04]" }, i))
				}) : pendingItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] py-24 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mb-4 h-12 w-12 text-emerald-400/40" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white/80",
							children: "Queue is Clear!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-white/40",
							children: "No pending websites waiting for review right now."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6",
					children: pendingItems.map(({ page, order, userProfile }) => {
						const plugin = getExternalTemplate(page.template_id);
						`${typeof window !== "undefined" ? window.location.origin : ""}${page.slug}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md hover:border-violet-500/30 transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 flex-wrap",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-0.5 text-xs font-semibold text-violet-300",
													children: plugin?.manifest.name ?? page.template_id
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-0.5 text-xs font-semibold text-amber-400 capitalize",
													children: page.status.replace("_", " ")
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-white/40",
													children: ["Submitted ", format(new Date(page.updated_at), "MMM d, yyyy · h:mm a")]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-2xl font-bold text-white",
											children: page.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-mono text-xs text-white/40",
											children: ["URL Slug: /p/", page.slug]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2 border-t border-white/[0.05]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-violet-400" }), userProfile?.full_name || "User ID: " + page.user_id.slice(0, 8)]
												}),
												userProfile?.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-pink-400" }), userProfile.email]
												}),
												order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3.5 w-3.5 text-emerald-400" }),
														"Amount: ",
														formatPKR(order.total_cents),
														" (",
														order.provider || "EasyPaisa",
														")"
													]
												})
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row items-center gap-4 shrink-0",
									children: [order?.payment_screenshot && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setScreenshotModal(order.payment_screenshot || null),
										className: "group relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:border-violet-500/50 transition-all",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: order.payment_screenshot,
											alt: "Payment Proof",
											className: "h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-5 w-5 text-white" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap gap-2 w-full sm:w-auto",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setPreviewItem({
													page,
													order
												}),
												className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 text-violet-400" }), "Preview Website"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => handlePublish(order?.id, page),
												className: "flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), "Publish Live"]
											}),
											order && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setRejectingItem({
													orderId: order.id,
													pageId: page.id
												}),
												className: "flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), "Reject"]
											})
										]
									})]
								})]
							})
						}, page.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: previewItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: "relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0918] shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0a0918]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white",
								children: previewItem.page.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-0.5 text-xs text-violet-300",
								children: ["Template: ", previewItem.page.template_id]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handlePublish(previewItem.order?.id, previewItem.page),
								className: "flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Publish Now"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPreviewItem(null),
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex-1 overflow-y-auto bg-black",
						children: (() => {
							const plugin = getExternalTemplate(previewItem.page.template_id);
							if (!plugin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col items-center justify-center gap-4 text-center px-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-12 w-12 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-bold text-white mb-2",
										children: "Template Not Found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/50 text-sm mb-4",
										children: "The template plugin for this page could not be loaded."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-white/30 text-xs font-mono",
										children: ["Template ID: ", previewItem.page.template_id || "missing"]
									})
								] })]
							});
							const RendererComponent = plugin.Renderer;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-h-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RendererComponent, {
									config: previewItem.page.content ?? {},
									mode: "view"
								})
							});
						})()
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: screenshotModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md",
				onClick: () => setScreenshotModal(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .9
					},
					className: "relative max-h-[85vh] max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0918] p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: screenshotModal,
						alt: "Full Payment Receipt",
						className: "max-h-[80vh] w-auto rounded-2xl object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScreenshotModal(null),
						className: "absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: rejectingItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .9
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .9
					},
					className: "w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0918] p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-bold text-white mb-2",
							children: "Reject Website Request"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-white/50 mb-4",
							children: "Provide a reason for the user. The page will revert to draft status."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: rejectNotes,
							onChange: (e) => setRejectNotes(e.target.value),
							placeholder: "Reason (e.g. Payment screenshot unreadable or incomplete payment)...",
							className: "w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500",
							rows: 4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setRejectingItem(null),
								className: "rounded-xl px-4 py-2 text-xs font-semibold text-white/50 hover:text-white",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleRejectConfirm,
								className: "rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600",
								children: "Confirm Rejection"
							})]
						})
					]
				})
			}) })
		]
	});
}
//#endregion
export { AdminPendingWebsitesPage as component };
