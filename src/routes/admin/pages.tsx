/**
 * Admin Pages — /admin/pages
 * View all published/pending pages, unpublish, expire, delete.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle, ExternalLink, EyeOff, Trash2, Filter } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type PageStatus = Database["public"]["Enums"]["page_status"];

export const Route = createFileRoute("/admin/pages")({
  head: () => ({ meta: [{ title: "Pages — Admin" }] }),
  component: AdminPagesPage,
});

const STATUS_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  published:        { color: "#34d399", bg: "rgba(52,211,153,0.12)",   border: "rgba(52,211,153,0.3)"   },
  pending_approval: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",   border: "rgba(251,191,36,0.3)"   },
  draft:            { color: "#6b7280", bg: "rgba(107,114,128,0.10)",  border: "rgba(107,114,128,0.25)" },
  expired:          { color: "#f87171", bg: "rgba(248,113,113,0.12)",  border: "rgba(248,113,113,0.3)"  },
  archived:         { color: "#8b87b8", bg: "rgba(139,135,184,0.10)",  border: "rgba(139,135,184,0.2)"  },
};

function AdminPagesPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const qc = useQueryClient();
  const [statusFilter, setStatusFilter] = useState<PageStatus | "all">("all");

  useEffect(() => {
    if (!user)    { navigate({ to: "/auth/login" }); return; }
    if (!isAdmin) { navigate({ to: "/dashboard" }); return; }
  }, [user, isAdmin, navigate]);

  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["admin-pages", statusFilter],
    queryFn: async () => {
      // Simple query without join — avoids FK name issues
      let q = supabase
        .from("pages")
        .select("*")
        .is("deleted_at", null)
        .order("updated_at", { ascending: false });
      if (statusFilter !== "all") q = q.eq("status", statusFilter as PageStatus);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });

  const updatePageStatus = useMutation({
    mutationFn: async ({ pageId, status }: { pageId: string; status: PageStatus }) => {
      const { error } = await supabase.from("pages")
        .update({ status, is_public: status === "published", updated_at: new Date().toISOString() })
        .eq("id", pageId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-pages"] });
      toast.success("Page updated");
    },
    onError: (err: any) => {
      toast.error(`Failed to update status: ${err?.message || "Unknown error"}`);
    },
  });

  const deletePage = useMutation({
    mutationFn: async (pageId: string) => {
      const { error } = await supabase.from("pages")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", pageId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-pages"] });
      toast.success("Page deleted");
    },
  });

  const statusTabs = [
    { label: "Published (Live)", value: "published" as PageStatus },
    { label: "All Pages",       value: "all"       as const },
    { label: "Archived",        value: "archived"  as PageStatus },
    { label: "Expired",         value: "expired"   as PageStatus },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#08071a]">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Published Websites</h1>
            <p className="mt-1 text-xs text-white/50">Manage live published dedication pages and public access links.</p>
          </div>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40">
            {pages.length} pages
          </span>
        </div>

        {/* Status filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {statusTabs.map(t => (
            <button key={t.value} type="button" onClick={() => setStatusFilter(t.value)}
              className={cn("rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                statusFilter === t.value
                  ? "bg-violet-600 text-white"
                  : "border border-white/[0.08] text-white/40 hover:text-white/70")}>
              {t.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />)}
          </div>
        ) : pages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-white/20" />
            <p className="text-white/50">No published pages found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  {["Title & Template", "Public Slug", "Views", "Status", "Published Date", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pages.map((page, i) => {
                  const st = STATUS_STYLES[page.status] ?? STATUS_STYLES.draft;
                  const liveUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/p/${page.slug}`;
                  const templateId = page.template_id || (page.content as Record<string, unknown>)?._template_id as string || "anniversary-galaxy";
                  
                  return (
                    <motion.tr key={page.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-white/90 truncate max-w-[220px]">{page.title}</span>
                          <span className="text-[11px] text-violet-400 font-mono">{templateId}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-white/50">/p/{page.slug}</span>
                          <button type="button"
                            onClick={() => { navigator.clipboard.writeText(liveUrl); toast.success("Link copied!"); }}
                            className="shrink-0 rounded-lg bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 text-[10px] font-semibold text-violet-400 hover:bg-violet-500/25 transition-colors">
                            Copy link
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">{page.view_count.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize whitespace-nowrap"
                          style={{ color: st.color, background: st.bg, borderColor: st.border }}>
                          {page.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/40 text-xs">
                        {page.published_at ? format(new Date(page.published_at), "MMM d, yyyy") : format(new Date(page.updated_at), "MMM d, yyyy")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {/* Live Preview Button */}
                          <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                            className="flex h-8 px-2.5 items-center gap-1 rounded-lg bg-white/[0.06] border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            title="Preview Live Website">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>Preview</span>
                          </a>

                          {/* Edit Button */}
                          <button type="button"
                            onClick={() => navigate({ to: "/editor/template/$templateId", params: { templateId }, search: { pageId: page.id } })}
                            className="flex h-8 px-2.5 items-center gap-1 rounded-lg bg-violet-600/20 border border-violet-500/30 text-xs text-violet-300 hover:bg-violet-600/30 transition-colors">
                            Edit
                          </button>

                          {/* Unpublish Button */}
                          {page.status === "published" && (
                            <button type="button"
                              onClick={() => updatePageStatus.mutate({ pageId: page.id, status: "archived" })}
                              className="flex h-8 px-2.5 items-center gap-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-xs text-amber-400 hover:bg-amber-500/25 transition-colors"
                              title="Unpublish Website">
                              <EyeOff className="h-3.5 w-3.5" />
                              <span>Unpublish</span>
                            </button>
                          )}

                          {/* Delete Button */}
                          <button type="button"
                            onClick={() => { if (confirm("Are you sure you want to delete this published page?")) deletePage.mutate(page.id); }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Delete Page">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
