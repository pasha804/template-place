/**
 * Pending Websites — /admin/pending
 * Dedicated queue for reviewing, live-previewing, and publishing pending websites after user payment.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, CheckCircle2, XCircle, Eye, ExternalLink, X,
  AlertCircle, Sparkles, MessageCircle, FileText, User, Mail, DollarSign, Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";
import { useApproveOrder, useRejectOrder, useRequestChanges, formatPKR, usePendingWebsites } from "@/hooks/use-orders";
import { AdminNav } from "@/components/admin/AdminNav";
import { getExternalTemplate } from "@/engine/registry";
import type { Database } from "@/integrations/supabase/types";

type PageRow = Database["public"]["Tables"]["pages"]["Row"];
type OrderRow = Database["public"]["Tables"]["orders"]["Row"] & {
  payment_screenshot?: string;
  payment_method?: string;
};
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export const Route = createFileRoute("/admin/pending")({
  head: () => ({ meta: [{ title: "Pending Websites — Admin" }] }),
  component: AdminPendingWebsitesPage,
});

function AdminPendingWebsitesPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const { data: pendingItems = [], isLoading, refetch } = usePendingWebsites();

  const approve = useApproveOrder();
  const reject = useRejectOrder();
  const requestChange = useRequestChanges();

  const [previewItem, setPreviewItem] = useState<{ page: PageRow; order: OrderRow | null } | null>(null);
  const [screenshotModal, setScreenshotModal] = useState<string | null>(null);
  const [rejectingItem, setRejectingItem] = useState<{ orderId: string; pageId: string } | null>(null);
  const [rejectNotes, setRejectNotes] = useState("");

  useEffect(() => {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (!isAdmin) { navigate({ to: "/dashboard" }); return; }
  }, [user, isAdmin, navigate]);

  async function handlePublish(orderId: string | undefined, pageObj: PageRow) {
    try {
      const res = await approve.mutateAsync({ orderId, pageId: pageObj.id, pageData: pageObj });
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
        notes: rejectNotes || "Payment could not be verified.",
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

  return (
    <div className="min-h-screen bg-[#08071a] text-white">
      <AdminNav />

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black">Pending Websites Queue</h1>
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-400">
                {pendingItems.length} Pending Approval
              </span>
            </div>
            <p className="mt-1 text-sm text-white/50">
              Review customized user templates, verify payment screenshots, and publish websites live.
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
        ) : pendingItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.08] py-24 text-center">
            <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-400/40" />
            <h3 className="text-xl font-bold text-white/80">Queue is Clear!</h3>
            <p className="mt-1 text-sm text-white/40">No pending websites waiting for review right now.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingItems.map(({ page, order, userProfile }) => {
              const plugin = getExternalTemplate(page.template_id);
              const liveUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${page.slug}`;

              return (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md hover:border-violet-500/30 transition-all"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Page & Template Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-0.5 text-xs font-semibold text-violet-300">
                          {plugin?.manifest.name ?? page.template_id}
                        </span>
                        <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-0.5 text-xs font-semibold text-amber-400 capitalize">
                          {page.status.replace("_", " ")}
                        </span>
                        <span className="text-xs text-white/40">
                          Submitted {format(new Date(page.updated_at), "MMM d, yyyy · h:mm a")}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-white">{page.title}</h2>
                      <p className="font-mono text-xs text-white/40">URL Slug: /p/{page.slug}</p>

                      {/* User details */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white/60 pt-2 border-t border-white/[0.05]">
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-violet-400" />
                          {userProfile?.full_name || "User ID: " + page.user_id.slice(0, 8)}
                        </span>
                        {userProfile?.email && (
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-pink-400" />
                            {userProfile.email}
                          </span>
                        )}
                        {order && (
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                            Amount: {formatPKR(order.total_cents)} ({order.provider || "EasyPaisa"})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Screenshot & Actions */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                      {order?.payment_screenshot && (
                        <button
                          type="button"
                          onClick={() => setScreenshotModal(order.payment_screenshot || null)}
                          className="group relative flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/40 hover:border-violet-500/50 transition-all"
                        >
                          <img
                            src={order.payment_screenshot}
                            alt="Payment Proof"
                            className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ImageIcon className="h-5 w-5 text-white" />
                          </div>
                        </button>
                      )}

                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => setPreviewItem({ page, order })}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                        >
                          <Eye className="h-4 w-4 text-violet-400" />
                          Preview Website
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePublish(order?.id, page)}
                          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Publish Live
                        </button>

                        {order && (
                          <button
                            type="button"
                            onClick={() => setRejectingItem({ orderId: order.id, pageId: page.id })}
                            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Live Preview Modal */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0918] shadow-2xl"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-[#0a0918]">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white">{previewItem.page.title}</h3>
                  <span className="rounded-full bg-violet-500/15 border border-violet-500/30 px-3 py-0.5 text-xs text-violet-300">
                    Template: {previewItem.page.template_id}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePublish(previewItem.order?.id, previewItem.page)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Publish Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewItem(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Live Render Area */}
              <div className="relative flex-1 overflow-y-auto bg-black">
                {(() => {
                  const plugin = getExternalTemplate(previewItem.page.template_id);
                  if (!plugin) {
                    return (
                      <div className="flex h-full flex-col items-center justify-center gap-4 text-center px-4">
                        <AlertCircle className="h-12 w-12 text-amber-400" />
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2">Template Not Found</h3>
                          <p className="text-white/50 text-sm mb-4">
                            The template plugin for this page could not be loaded.
                          </p>
                          <p className="text-white/30 text-xs font-mono">
                            Template ID: {previewItem.page.template_id || "missing"}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  const RendererComponent = plugin.Renderer;
                  return (
                    <div className="min-h-full">
                      <RendererComponent config={(previewItem.page.content as Record<string, unknown>) ?? {}} mode="view" />
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Payment Screenshot Modal */}
      <AnimatePresence>
        {screenshotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md" onClick={() => setScreenshotModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative max-h-[85vh] max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0918] p-2">
              <img src={screenshotModal} alt="Full Payment Receipt" className="max-h-[80vh] w-auto rounded-2xl object-contain" />
              <button type="button" onClick={() => setScreenshotModal(null)} className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rejection Modal */}
      <AnimatePresence>
        {rejectingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0a0918] p-6">
              <h3 className="text-xl font-bold text-white mb-2">Reject Website Request</h3>
              <p className="text-xs text-white/50 mb-4">Provide a reason for the user. The page will revert to draft status.</p>
              <textarea
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
                placeholder="Reason (e.g. Payment screenshot unreadable or incomplete payment)..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500"
                rows={4}
              />
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setRejectingItem(null)} className="rounded-xl px-4 py-2 text-xs font-semibold text-white/50 hover:text-white">Cancel</button>
                <button type="button" onClick={handleRejectConfirm} className="rounded-xl bg-red-500 px-4 py-2 text-xs font-bold text-white hover:bg-red-600">Confirm Rejection</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
