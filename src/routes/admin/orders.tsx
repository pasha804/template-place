/**
 * Admin Orders — /admin/orders
 * List all orders, filter by status, open detail modal to approve/reject/publish.
 */
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, XCircle, Clock, MessageCircle, Globe,
  ExternalLink, Eye, X, Loader2, ChevronDown, AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuthStore } from "@/store/auth";
import {
  useAllOrders, useApproveOrder, useVerifyPayment, useRejectOrder,
  useRequestChanges, useUnpublishPage, formatPKR,
} from "@/hooks/use-orders";
import { AdminNav } from "@/components/admin/AdminNav";
import { cn } from "@/lib/utils";
import { getExternalTemplate } from "@/engine/registry";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Admin" }] }),
  component: AdminOrdersPage,
});

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string; border: string }> = {
  pending:          { label: "Pending Review",   color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.3)" },
  payment_verified: { label: "Payment Verified", color: "#38bdf8", bg: "rgba(56,189,248,0.12)",  border: "rgba(56,189,248,0.3)" },
  paid:             { label: "Published & Paid", color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.3)" },
  failed:           { label: "Rejected",         color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.3)" },
  refunded:         { label: "Refunded",         color: "#a78bfa", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
  cancelled:        { label: "Cancelled",        color: "#6b7280", bg: "rgba(107,114,128,0.12)", border: "rgba(107,114,128,0.3)" },
};

type OrderRow = {
  id: string;
  reference: string;
  status: OrderStatus;
  total_cents: number;
  currency: string;
  created_at: string;
  user_id: string;
  provider: string | null;
  payment_method?: string;
  payment_screenshot?: string;
  admin_notes?: string;
  page_id?: string;
  whatsapp_sent?: boolean;
  order_items?: { label: string; template_id?: string }[];
};

function AdminOrdersPage() {
  const navigate    = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selected, setSelected]         = useState<OrderRow | null>(null);
  const [rejectNotes, setRejectNotes]   = useState("");
  const [changeNotes, setChangeNotes]   = useState("");
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [showChangeForm, setShowChangeForm] = useState(false);

  const verifyPayment = useVerifyPayment();
  const approve       = useApproveOrder();
  const reject        = useRejectOrder();
  const requestChange = useRequestChanges();
  const unpublish     = useUnpublishPage();

  useEffect(() => {
    if (!user)    { navigate({ to: "/auth/login" }); return; }
    if (!isAdmin) { navigate({ to: "/dashboard" }); return; }
  }, [user, isAdmin, navigate]);

  async function handleVerifyPayment(order: OrderRow) {
    try {
      await verifyPayment.mutateAsync({ orderId: order.id });
      toast.success("Payment proof verified! Ready to publish live.");
    } catch (err: any) {
      toast.error(`Failed to verify payment: ${err?.message || "Unknown error"}`);
    }
  }

  async function handleApprove(order: OrderRow) {
    if (!order.page_id) { toast.error("No page linked to this order"); return; }
    try {
      const result = await approve.mutateAsync({ orderId: order.id, pageId: order.page_id });
      toast.success(`Published at /p/${result.slug}`);
      setSelected(null);
    } catch (err: any) {
      toast.error(`Failed to approve order: ${err?.message || "Unknown error"}`);
    }
  }

  async function handleReject(order: OrderRow) {
    if (!order.page_id) { toast.error("No page linked"); return; }
    try {
      await reject.mutateAsync({ orderId: order.id, pageId: order.page_id, notes: rejectNotes });
      toast.success("Order rejected");
      setSelected(null); setRejectNotes(""); setShowRejectForm(false);
    } catch { toast.error("Failed to reject order"); }
  }

  async function handleRequestChanges(order: OrderRow) {
    if (!changeNotes.trim()) { toast.error("Please enter change notes"); return; }
    try {
      await requestChange.mutateAsync({ orderId: order.id, notes: changeNotes });
      toast.success("Change request sent — page reverted to draft");
      setSelected(null); setChangeNotes(""); setShowChangeForm(false);
    } catch { toast.error("Failed to request changes"); }
  }

  const statusTabs: { label: string; value: OrderStatus | "all" }[] = [
    { label: "All",              value: "all" },
    { label: "Pending Review",   value: "pending" as OrderStatus },
    { label: "Payment Verified", value: "payment_verified" as OrderStatus },
    { label: "Published & Paid", value: "paid" as OrderStatus },
    { label: "Rejected",         value: "failed" as OrderStatus },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#08071a]">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">Orders</h1>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40">
            {orders.length} total
          </span>
        </div>

        {/* Status filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {statusTabs.map((t) => (
            <button key={t.value} type="button" onClick={() => setStatusFilter(t.value)}
              className={cn("rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                statusFilter === t.value
                  ? "bg-violet-600 text-white"
                  : "border border-white/[0.08] text-white/40 hover:text-white/70")}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Orders table */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />)}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-white/20" />
            <p className="text-white/50">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  {["Order ID", "Template", "Amount", "Payment", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(orders as OrderRow[]).map((order, i) => {
                  const st = STATUS_STYLES[order.status] ?? STATUS_STYLES.cancelled;
                  const templateName = order.order_items?.[0]?.label ?? "—";
                  return (
                    <motion.tr key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-white/70">{order.reference}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/80 font-medium">{templateName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-white">{formatPKR(order.total_cents)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/50 capitalize">{order.payment_method ?? order.provider ?? "—"}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize"
                          style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/40 text-xs">{format(new Date(order.created_at), "MMM d, HH:mm")}</span>
                      </td>
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => setSelected(order)}
                          className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-colors">
                          <Eye className="h-3.5 w-3.5" /> Review
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              className="my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0f0d24]">

              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
                <div>
                  <p className="font-bold text-white">Order #{selected.reference}</p>
                  <p className="text-xs text-white/40">{format(new Date(selected.created_at), "MMMM d, yyyy · HH:mm")}</p>
                </div>
                <button type="button" onClick={() => { setSelected(null); setShowRejectForm(false); setShowChangeForm(false); }}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Status badge */}
                <div className="flex items-center gap-3">
                  {(() => {
                    const st = STATUS_STYLES[selected.status] ?? STATUS_STYLES.cancelled;
                    return (
                      <span className="rounded-full border px-3 py-1 text-xs font-bold capitalize"
                        style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                        {st.label}
                      </span>
                    );
                  })()}
                  {selected.whatsapp_sent && (
                    <span className="flex items-center gap-1 rounded-full bg-green-500/15 border border-green-500/25 px-3 py-1 text-xs font-medium text-green-400">
                      <MessageCircle className="h-3 w-3" /> WhatsApp sent
                    </span>
                  )}
                  <span className="text-xs text-white/30 ml-auto font-semibold">{formatPKR(selected.total_cents)}</span>
                </div>

                {/* Order details */}
                <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <InfoRow label="Template"    value={selected.order_items?.[0]?.label ?? "—"} />
                  <InfoRow label="Payment"     value={selected.payment_method ?? selected.provider ?? "—"} />
                  <InfoRow label="User ID"     value={selected.user_id.slice(0, 12) + "…"} />
                  <InfoRow label="Currency"    value="PKR" />
                </div>

                {/* Payment screenshot */}
                {selected.payment_screenshot && (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/30">Payment Screenshot</p>
                    <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
                      <img src={selected.payment_screenshot} alt="Payment proof"
                        className="max-h-64 w-full object-contain bg-black/40" />
                    </div>
                  </div>
                )}

                {/* Admin notes */}
                {selected.admin_notes && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
                    <p className="text-xs font-semibold text-amber-400 mb-1">Admin Notes</p>
                    <p className="text-sm text-white/70">{selected.admin_notes}</p>
                  </div>
                )}

                {/* Preview / edit link */}
                {selected.page_id && (() => {
                  // template_id on the order_items is the DB UUID — use it to open the editor
                  const templateId = selected.order_items?.[0]?.template_id ?? "";
                  if (!templateId) return null;
                  return (
                    <a
                      href={`/editor/template/${templateId}?pageId=${selected.page_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white/60 hover:text-white transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      View template configuration
                    </a>
                  );
                })()}

                {/* Reject form */}
                {showRejectForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 space-y-3">
                    <p className="text-sm font-semibold text-red-400">Reason for rejection</p>
                    <textarea rows={3} value={rejectNotes} onChange={(e) => setRejectNotes(e.target.value)}
                      placeholder="Payment screenshot unclear / Amount mismatch / …"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-red-500/50 placeholder:text-white/25" />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleReject(selected)}
                        disabled={reject.isPending}
                        className="flex items-center gap-2 rounded-xl bg-red-600/80 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                        {reject.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                        Confirm Reject
                      </button>
                      <button type="button" onClick={() => setShowRejectForm(false)}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white">
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Request changes form */}
                {showChangeForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-3">
                    <p className="text-sm font-semibold text-amber-400">Changes required</p>
                    <textarea rows={3} value={changeNotes} onChange={(e) => setChangeNotes(e.target.value)}
                      placeholder="Please update the recipient's name / Fix the letter / …"
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5 text-sm text-white/80 outline-none focus:border-amber-500/50 placeholder:text-white/25" />
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleRequestChanges(selected)}
                        disabled={requestChange.isPending}
                        className="flex items-center gap-2 rounded-xl bg-amber-600/80 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                        {requestChange.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                        Send Request
                      </button>
                      <button type="button" onClick={() => setShowChangeForm(false)}
                        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/50 hover:text-white">
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons — 3-step Pipeline */}
                {selected.status === "pending" && (
                  <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
                    <button type="button" onClick={() => handleVerifyPayment(selected)}
                      disabled={verifyPayment.isPending}
                      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50">
                      {verifyPayment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      Step 1: Verify Payment
                    </button>
                    <button type="button" onClick={() => { setShowRejectForm(true); setShowChangeForm(false); }}
                      className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-colors">
                      <XCircle className="h-4 w-4" /> Reject Order
                    </button>
                  </div>
                )}

                {(selected.status as string) === "payment_verified" && (
                  <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-5">
                    <button type="button" onClick={() => handleApprove(selected)}
                      disabled={approve.isPending}
                      className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50">
                      {approve.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                      Step 2: Publish Live
                    </button>
                    <button type="button" onClick={() => { setShowChangeForm(true); setShowRejectForm(false); }}
                      className="flex items-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-sm font-semibold text-amber-400 hover:bg-amber-500/15 transition-colors">
                      Request Changes
                    </button>
                    <button type="button" onClick={() => { setShowRejectForm(true); setShowChangeForm(false); }}
                      className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/15 transition-colors">
                      <XCircle className="h-4 w-4" /> Reject Order
                    </button>
                  </div>
                )}

                {selected.status === "paid" && selected.page_id && (
                  <div className="flex gap-3 border-t border-white/[0.06] pt-5">
                    <button type="button" onClick={async () => {
                      await unpublish.mutateAsync(selected.page_id!);
                      toast.success("Page unpublished");
                      setSelected(null);
                    }}
                      className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-semibold text-amber-400 hover:bg-amber-500/20 transition-colors">
                      Unpublish Website
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/25 mb-0.5">{label}</p>
      <p className="text-sm text-white/80 font-medium truncate">{value}</p>
    </div>
  );
}
