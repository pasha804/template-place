import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, Filter, Heart, Sparkles, X, Wand2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { allUnifiedTemplates, type UnifiedTemplate } from "@/engine/combined";
import { useFavorites, useToggleFavorite } from "@/hooks/use-templates";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/templates/")({
  head: () => ({
    meta: [
      { title: "Templates — Greeting Vibes Templates" },
      { name: "description", content: "Browse interactive templates for every occasion." },
    ],
  }),
  component: TemplatesPage,
});

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest",   label: "Newest"   },
  { value: "free",     label: "Free first"},
  { value: "premium",  label: "Premium"  },
];

/* ─── Template card ─────────────────────────────────────────────────────── */
function TemplateCard({ t, isFav, onFav }: { t: UnifiedTemplate; isFav: boolean; onFav: () => void }) {
  const [hov, setHov] = useState(false);
  const navigate       = useNavigate();
  const user           = useAuthStore((s) => s.user);

  function handleCreate(e: React.MouseEvent) {
    e.preventDefault();
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (t.kind === "external") {
      navigate({ to: "/editor/template/$templateId", params: { templateId: t.id } });
    } else {
      navigate({ to: "/editor/new", search: { template: t.id } });
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        transform:  hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow:  hov
          ? "0 20px 70px -18px rgba(139,92,246,0.35), 0 0 0 1px rgba(139,92,246,0.2)"
          : "0 2px 12px -4px rgba(0,0,0,0.3)",
        borderColor: hov ? "rgba(139,92,246,0.25)" : "",
      }}
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden" style={{ background: t.coverGradient }}>
        <div className="absolute inset-0 bg-black/0 transition-all duration-300"
          style={{ backgroundColor: hov ? "rgba(0,0,0,0.22)" : "rgba(0,0,0,0)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          {t.thumbnailUrl ? (
            <img src={t.thumbnailUrl} alt={t.name}
              className="w-full h-full object-cover"
              style={{ opacity: hov ? 0.85 : 0.7 }} />
          ) : (
            <motion.span className="text-5xl drop-shadow-2xl select-none"
              animate={{ scale: hov ? 1.15 : 1 }} transition={{ duration: 0.3 }}>
              {t.accentEmoji}
            </motion.span>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {t.priceCents === 0 && (
            <span className="rounded-full bg-black/35 backdrop-blur border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">FREE</span>
          )}
          {t.isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-black/35 backdrop-blur border border-amber-500/40 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
              <Sparkles className="h-2.5 w-2.5" /> PRO
            </span>
          )}
          {/* "INTERACTIVE" badge for external templates */}
          {t.kind === "external" && (
            <span className="flex items-center gap-1 rounded-full bg-black/35 backdrop-blur border border-pink-500/40 px-2.5 py-0.5 text-[10px] font-bold text-pink-400">
              <Wand2 className="h-2.5 w-2.5" /> LIVE
            </span>
          )}
        </div>

        {/* Fav */}
        <button type="button" onClick={onFav}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur transition-all hover:scale-110"
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}>
          <Heart className={cn("h-4 w-4 transition-all", isFav ? "fill-rose-400 text-rose-400" : "text-white/70")} />
        </button>

        {/* Category */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold capitalize text-white/80">
          {t.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-1.5 flex items-start justify-between gap-2">
          <h3 className="font-bold leading-tight text-white">{t.name}</h3>
          {t.priceCents > 0 && !t.isPremium && (
            <span className="shrink-0 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-bold text-violet-400">
              Rs. {t.priceCents.toLocaleString("en-PK")}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-white/45 line-clamp-2">{t.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/50">
              #{tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={handleCreate}
            className="rounded-xl py-2.5 text-center text-xs font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", boxShadow: "0 4px 15px rgba(236,72,153,0.3)" }}>
            {t.kind === "external" ? "Create Now ✨" : "Create page"}
          </button>
          <Link to="/templates/$slug" params={{ slug: t.slug }}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:text-white">
            Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */
function TemplatesPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("all");
  const [sort,     setSort]     = useState("trending");
  const user    = useAuthStore((s) => s.user);
  const { data: favIds = [] } = useFavorites(user?.id);
  const toggleFav = useToggleFavorite();
  const navigate  = useNavigate();

  const categories = useMemo(() => {
    const cats = [...new Set(allUnifiedTemplates.map((t) => t.category))];
    return ["all", ...cats];
  }, []);

  const filtered = useMemo(() => {
    let list = [...allUnifiedTemplates];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q)),
      );
    }
    if (category !== "all") list = list.filter((t) => t.category === category);
    if (sort === "free")    list.sort((a, b) => a.priceCents - b.priceCents);
    else if (sort === "premium") list.sort((a, b) => b.priceCents - a.priceCents);
    return list;
  }, [search, category, sort]);

  function handleFav(id: string) {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    toggleFav.mutate({ templateId: id, userId: user.id, isFav: favIds.includes(id) });
  }

  return (
    <div className="min-h-screen" style={{ background: "#0a0914" }}>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative overflow-hidden py-16 text-center">
          <div aria-hidden className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.20) 0%, transparent 65%)" }} />
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative mx-auto max-w-3xl px-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/8 px-4 py-1.5 text-xs font-semibold text-violet-400">
              {allUnifiedTemplates.length}+ templates available
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="text-5xl font-black text-white sm:text-6xl">
              Find your{" "}
              <span style={{ background: "linear-gradient(135deg,#a78bfa,#f472b6)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                perfect
              </span>
              <br />template
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
              className="mt-4 text-lg text-white/45">
              Choose a template and create your dedication in minutes
            </motion.p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Search + sort */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.04] pl-11 pr-10 py-3.5 text-sm text-white/80 outline-none backdrop-blur transition-all focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 placeholder:text-white/25" />
              {search && (
                <button type="button" onClick={() => setSearch("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="appearance-none rounded-2xl border border-white/[0.07] bg-white/[0.04] px-5 py-3.5 pr-10 text-sm text-white/70 outline-none backdrop-blur focus:border-violet-500/50 cursor-pointer">
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#0f0d24]">{o.label}</option>
                ))}
              </select>
              <Filter className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
            </div>
          </div>

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold capitalize transition-all duration-200",
                  category === cat
                    ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    : "border border-white/[0.07] bg-white/[0.04] text-white/45 hover:border-violet-500/30 hover:text-white/70",
                )}>
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="mb-6 text-sm text-white/30">
            <span className="font-semibold text-white/70">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "template" : "templates"}
            {search && <> for &quot;<span className="text-violet-400">{search}</span>&quot;</>}
          </p>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filtered.map((t) => (
                  <TemplateCard key={t.id} t={t}
                    isFav={favIds.includes(t.id)}
                    onFav={() => handleFav(t.id)} />
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-28 text-center">
                <div className="mb-4 text-5xl">🔍</div>
                <h3 className="text-xl font-bold text-white">No templates found</h3>
                <p className="mt-2 text-white/40">Try a different search term or clear your filters.</p>
                <button type="button" onClick={() => { setSearch(""); setCategory("all"); }}
                  className="mt-5 rounded-2xl border border-violet-500/25 bg-violet-500/8 px-6 py-3 text-sm font-semibold text-violet-400 transition-all hover:bg-violet-500/15">
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
