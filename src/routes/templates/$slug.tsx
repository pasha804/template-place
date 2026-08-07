import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, Check, Lock, Wand2, Play } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getUnifiedTemplate } from "@/engine/combined";
import { getExternalTemplateBySlug } from "@/engine/registry";
import { useAuthStore } from "@/store/auth";
import { useFavorites, useToggleFavorite } from "@/hooks/use-templates";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates/$slug")({
  component: TemplateDetailPage,
});

function TemplateDetailPage() {
  const { slug }  = Route.useParams();
  const navigate  = useNavigate();
  const user      = useAuthStore((s) => s.user);
  const { data: favIds = [] } = useFavorites(user?.id);
  const toggleFav = useToggleFavorite();

  const unified   = getUnifiedTemplate(slug);
  const extPlugin = unified?.kind === "external" ? getExternalTemplateBySlug(slug) : null;

  if (!unified) {
    return (
      <div className="flex min-h-screen flex-col" style={{ background: "#0a0914" }}>
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-5xl">😕</p>
            <h1 className="text-2xl font-bold text-white">Template not found</h1>
            <Link to="/templates" className="mt-4 inline-block text-violet-400 hover:underline">
              Browse all templates
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFav = favIds.includes(unified.id);

  function handleFav() {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (!unified) return;
    toggleFav.mutate({ templateId: unified.id, userId: user.id, isFav });
  }

  function handleCreate() {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (!unified) return;
    if (unified.kind === "external") {
      navigate({ to: "/editor/template/$templateId", params: { templateId: unified.id } });
    } else {
      navigate({ to: "/editor/new", search: { template: unified.id } });
    }
  }

  function handleDemo() {
    if (!unified) return;
    // Opens a dedicated demo page — not the editor
    window.open(`/demo/${unified.slug}`, "_blank");
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0914" }}>
      <Navbar />
      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link to="/templates"
            className="mb-8 flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to templates
          </Link>

          <div className="grid gap-10 lg:grid-cols-[420px_1fr]">
            {/* ── Left: info panel ── */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-3xl border border-white/[0.08]"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}>

                {/* Cover strip */}
                <div className="flex h-24 w-full items-center justify-center overflow-hidden"
                  style={{ background: unified.coverGradient }}>
                  {unified.thumbnailUrl
                    ? <img src={unified.thumbnailUrl} alt={unified.name} className="h-full w-full object-cover" />
                    : <span className="text-5xl">{unified.accentEmoji}</span>}
                </div>

                <div className="p-6">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h1 className="text-xl font-bold text-white">{unified.name}</h1>
                        {unified.kind === "external" && (
                          <span className="flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold text-pink-400">
                            <Wand2 className="h-2.5 w-2.5" /> LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-sm capitalize text-white/40">{unified.category}</p>
                    </div>
                    <button type="button" onClick={handleFav}
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border transition-all hover:scale-110",
                        isFav ? "border-red-500/30 bg-red-500/10" : "border-white/10 hover:border-red-500/30",
                      )}
                      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}>
                      <Heart className={cn("h-4 w-4", isFav ? "fill-red-400 text-red-400" : "text-white/40")} />
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed text-white/45 mb-4">{unified.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {unified.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] text-violet-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-3xl font-black"
                      style={{ background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                      {unified.priceCents === 0 ? "Free" : `Rs. ${unified.priceCents.toLocaleString("en-PK")}`}
                    </span>
                    {unified.isPremium && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 text-xs font-bold text-amber-400">
                        <Sparkles className="h-3 w-3" /> Premium
                      </span>
                    )}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex gap-2 mb-4">
                    <button type="button" onClick={handleCreate}
                      className="flex-1 rounded-2xl py-4 text-sm font-black text-white transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", boxShadow: "0 0 24px rgba(236,72,153,0.35)" }}>
                      {unified.kind === "external" ? "Create Now ✨" : "Create my page →"}
                    </button>

                    {/* Demo — opens in a new page, not the editor */}
                    <button type="button" onClick={handleDemo}
                      className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-4 text-sm font-semibold text-white/70 hover:bg-white/[0.10] hover:text-white transition-all">
                      <Play className="h-4 w-4" /> Demo
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-5 text-xs text-white/25">
                    <span className="flex items-center gap-1"><Check className="h-3 w-3 text-emerald-400" /> No code</span>
                    <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-emerald-400" /> SSL secure</span>
                    <span className="flex items-center gap-1"><Wand2 className="h-3 w-3 text-violet-400" /> Instant preview</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Right: cover + features ── */}
            <div>
              {/* Cover banner */}
              <div className="overflow-hidden rounded-3xl border border-white/[0.07]"
                style={{ aspectRatio: "16/9", background: unified.coverGradient, boxShadow: "0 0 60px rgba(0,0,0,0.6)" }}>
                {unified.thumbnailUrl ? (
                  <img src={unified.thumbnailUrl} alt={unified.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-8xl">{unified.accentEmoji}</div>
                )}
              </div>

              {/* Features */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {unified.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-white/70">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
