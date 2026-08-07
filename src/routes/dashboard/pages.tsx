import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, FileText, Edit, ExternalLink, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { useUserPages, useDeletePage } from "@/hooks/use-pages";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getExternalTemplate } from "@/engine/registry";
import type { Database } from "@/integrations/supabase/types";

type PageStatus = Database["public"]["Enums"]["page_status"];

export const Route = createFileRoute("/dashboard/pages")({
  head: () => ({ meta: [{ title: "My Pages — Dashboard" }] }),
  component: PagesPage,
});

function PagesPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const [filter, setFilter] = useState<PageStatus | "all">("all");
  const { data: pages = [], isLoading } = useUserPages(user?.id, filter !== "all" ? filter : undefined);
  const deletePage = useDeletePage();

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  async function handleDelete(id: string) {
    if (!user || !confirm("Delete this page?")) return;
    await deletePage.mutateAsync({ id, userId: user.id });
    toast.success("Page deleted");
  }

  const tabs: { label: string; value: PageStatus | "all" }[] = [
    { label: "All",              value: "all" },
    { label: "Published",        value: "published" },
    { label: "Pending Approval", value: "pending_approval" as PageStatus },
    { label: "Drafts",           value: "draft" },
    { label: "Expired",          value: "expired" },
    { label: "Archived",         value: "archived" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Pages</h1>
            <Link to="/templates"
              className="flex items-center gap-2 rounded-2xl bg-aurora px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02]">
              <Plus className="h-4 w-4" /> Create page
            </Link>
          </div>

          {/* Filter tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t.value} type="button" onClick={() => setFilter(t.value)}
                className={cn("rounded-full px-4 py-2 text-xs font-semibold transition-all",
                  filter === t.value ? "bg-primary text-primary-foreground shadow-glow" : "border border-border text-muted-foreground hover:text-foreground")}>
                {t.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1,2,3].map((i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted/40" />)}
            </div>
          ) : pages.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
              <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="font-semibold">No pages found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {filter === "all" ? "Create your first page to get started" : `No ${filter} pages yet`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page, i) => (
                <motion.div key={page.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-surface px-5 py-4 transition-all hover:border-primary/30">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{page.title}</p>
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize shrink-0",
                        page.status === "published"        ? "bg-success/10 text-success" :
                        page.status === "pending_approval" ? "bg-orange-500/15 text-orange-400" :
                        page.status === "draft"            ? "bg-warning/10 text-warning" :
                        page.status === "expired"          ? "bg-red-500/10 text-red-400" :
                        "bg-muted/20 text-muted-foreground")}>
                        {page.status === "pending_approval" ? "Pending Approval" : page.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">/p/{page.slug || page.id} · {page.view_count || 0} views · Updated {page.updated_at ? (function(){ try { return format(new Date(page.updated_at), "MMM d"); } catch { return "Recently"; } })() : "Recently"}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {(() => {
                      const isExternal = !!getExternalTemplate(page.template_id);
                      return isExternal ? (
                        <Link
                          to="/editor/template/$templateId"
                          params={{ templateId: page.template_id }}
                          search={{ pageId: page.id }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                      ) : (
                        <Link to="/editor/$pageId" params={{ pageId: page.id }}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                      );
                    })()}
                    {page.status === "published" && (
                      <Link to="/p/$slug" params={{ slug: page.slug }} target="_blank"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    )}
                    <button type="button" onClick={() => handleDelete(page.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
