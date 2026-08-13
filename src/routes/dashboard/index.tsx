import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Plus, FileText, Eye, TrendingUp, Clock, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { useAuthStore } from "@/store/auth";
import { useUserPages, useDeletePage } from "@/hooks/use-pages";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { ExpirationTimer } from "@/components/dashboard/ExpirationTimer";
import { getExternalTemplate } from "@/engine/registry";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type Page = Database["public"]["Tables"]["pages"]["Row"];

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — Greeting Vibes Templates" }] }),
  component: DashboardPage,
});

const statusStyle = {
  draft:            { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.25)" },
  published:        { color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.25)" },
  expired:          { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)" },
  archived:         { color: "#8b87b8", bg: "rgba(139,135,184,0.10)", border: "rgba(139,135,184,0.20)" },
  pending_approval: { color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.25)" },
} as const;

function safeFormatDate(dateStr?: string | null, fmt: string = "MMM d, yyyy") {
  if (!dateStr) return "Recently";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Recently";
    return format(d, fmt);
  } catch {
    return "Recently";
  }
}

function PageCard({ page }: { page: Page }) {
  const deletePage = useDeletePage();
  const user = useAuthStore((s) => s.user);
  const statusKey = page.status as keyof typeof statusStyle;
  const st = statusStyle[statusKey] ?? statusStyle.draft;

  async function handleDelete() {
    if (!user || !confirm("Delete this page? This cannot be undone.")) return;
    await deletePage.mutateAsync({ id: page.id, userId: user.id });
    toast.success("Page deleted");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-5 transition-all duration-300"
      style={{
        background: "linear-gradient(160deg, rgba(167,139,250,0.06) 0%, rgba(244,114,182,0.03) 100%)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px -12px rgba(167,139,250,0.25)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${st.color}55, transparent)` }} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2 flex-wrap">
            <h3 className="font-bold truncate">{page.title || "Untitled Page"}</h3>
            <span className="shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-bold capitalize"
              style={{ color: st.color, background: st.bg, borderColor: st.border }}>
              {page.status === "pending_approval" ? "Pending Approval" : (page.status || "draft")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">/p/{page.slug || page.id}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {getExternalTemplate(page.template_id) ? (
            <Link
              to="/editor/template/$templateId"
              params={{ templateId: page.template_id }}
              search={{ pageId: page.id }}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-primary/12 hover:text-primary"
              aria-label="Edit">
              <Edit className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <Link to="/editor/$pageId" params={{ pageId: page.id }}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-primary/12 hover:text-primary"
              aria-label="Edit">
              <Edit className="h-3.5 w-3.5" />
            </Link>
          )}
          {page.status === "published" && page.slug && (
            <Link to="/p/$slug" params={{ slug: page.slug }} target="_blank"
              className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-cyan-500/12 hover:text-cyan-400"
              aria-label="View live">
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          )}
          <button type="button" onClick={handleDelete}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-red-500/12 hover:text-red-400 opacity-0 group-hover:opacity-100"
            aria-label="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" style={{ color: st.color }} />
          {(page.view_count || 0).toLocaleString()} views
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {safeFormatDate(page.updated_at)}
        </span>
      </div>

      {/* Expiration timer for published pages */}
      {page.status === "published" && (page as any).expires_at && typeof (page as any).expires_at === 'string' && (
        <div className="mt-3">
          <ExpirationTimer 
            expiresAt={(page as any).expires_at} 
            pageSlug={page.slug || page.id} 
          />
        </div>
      )}
    </motion.div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: pages = [], isLoading } = useUserPages(user?.id);

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const stats = {
    total:       pages.length,
    published:   pages.filter((p) => p.status === "published").length,
    totalViews:  pages.reduce((s, p) => s + (Number(p.view_count) || 0), 0),
    drafts:      pages.filter((p) => p.status === "draft").length,
  };

  const statCards = [
    { label: "Total pages",   value: stats.total,      icon: FileText,   c1: "#8b5cf6", c2: "#9333ea" },
    { label: "Published",     value: stats.published,  icon: TrendingUp, c1: "#34d399", c2: "#14b8a6" },
    { label: "Total views",   value: stats.totalViews, icon: Eye,        c1: "#22d3ee", c2: "#0ea5e9" },
    { label: "Drafts",        value: stats.drafts,     icon: Clock,      c1: "#fbbf24", c2: "#f97316" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">My Panel</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage your pages, plans and payments</p>
            </div>
            <Link to="/templates"
              className="group flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)]">
              <Plus className="h-4 w-4" /> Create page
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)] p-5"
                style={{ background: `linear-gradient(160deg, ${s.c1}10 0%, ${s.c2}06 100%)`, backdropFilter: "blur(12px)" }}
              >
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${s.c1}50, transparent)` }} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-1.5 text-3xl font-black" style={{ background: `linear-gradient(135deg, ${s.c1}, ${s.c2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                      {s.value.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ background: `${s.c1}18`, border: `1px solid ${s.c1}25` }}>
                    <s.icon className="h-5 w-5" style={{ color: s.c1 }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pages */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">My pages ({pages.length})</h2>
            {pages.length > 0 && (
              <Link to="/dashboard/pages" className="text-xs text-primary hover:underline">View list →</Link>
            )}
          </div>

          {isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-3xl border border-[var(--glass-border)]"
                  style={{ background: "rgba(167,139,250,0.04)" }} />
              ))}
            </div>
          ) : pages.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--glass-border)] py-24 text-center"
              style={{ background: "rgba(167,139,250,0.02)" }}>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl" style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.10))", border: "1px solid rgba(167,139,250,0.2)" }}>
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">You have no pages yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Create your first personalized page in minutes</p>
              <Link to="/templates"
                className="mt-6 flex items-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] px-7 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)]">
                <Plus className="h-4 w-4" /> Create my first page
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pages.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <PageCard page={p} />
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
