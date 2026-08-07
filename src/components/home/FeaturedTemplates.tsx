import { motion } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, Eye, Star, Wand2 } from "lucide-react";
import { useState } from "react";
import { allUnifiedTemplates, type UnifiedTemplate } from "@/engine/combined";
import { useFavorites, useToggleFavorite } from "@/hooks/use-templates";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

function TemplateCard({ t, index }: { t: UnifiedTemplate; index: number }) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: favIds = [] } = useFavorites(user?.id);
  const toggleFav = useToggleFavorite();
  const isFav = favIds.includes(t.id);

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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.03)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? "0 20px 60px -15px rgba(139,92,246,0.35)" : "none",
        borderColor: hov ? "rgba(139,92,246,0.3)" : "",
      }}
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden" style={{ background: t.coverGradient }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {t.thumbnailUrl ? (
            <img src={t.thumbnailUrl} alt={t.name} className="w-full h-full object-cover" />
          ) : (
            <motion.span
              className="text-5xl drop-shadow-xl select-none"
              animate={{ scale: hov ? 1.15 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {t.accentEmoji}
            </motion.span>
          )}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {t.priceCents === 0 && (
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 backdrop-blur">FREE</span>
          )}
          {t.isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur">
              <Sparkles className="h-2.5 w-2.5" /> PRO
            </span>
          )}
          {t.kind === "external" && (
            <span className="flex items-center gap-1 rounded-full bg-pink-500/20 border border-pink-500/30 px-2.5 py-0.5 text-[10px] font-bold text-pink-400 backdrop-blur">
              <Wand2 className="h-2.5 w-2.5" /> LIVE
            </span>
          )}
        </div>
        {/* Fav */}
        <button type="button" onClick={() => { if (user) toggleFav.mutate({ templateId: t.id, userId: user.id, isFav }); }}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur transition-all hover:scale-110">
          <Heart className={cn("h-4 w-4", isFav ? "fill-rose-400 text-rose-400" : "text-white/70")} />
        </button>
        {/* Category */}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/30 backdrop-blur px-2.5 py-0.5 text-[10px] font-semibold capitalize text-white/80">
          {t.category}
        </span>
        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-bold text-white/80">4.9</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="font-bold text-white leading-tight">{t.name}</h3>
          {t.priceCents > 0 && (
            <span className="shrink-0 rounded-full bg-violet-500/15 px-2.5 py-0.5 text-xs font-bold text-violet-400">
              Rs. {t.priceCents.toLocaleString("en-PK")}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-white/45 line-clamp-2">{t.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {t.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[10px] text-white/50">#{tag}</span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" onClick={handleCreate}
            className="rounded-xl py-2.5 text-center text-xs font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg,#ec4899,#8b5cf6)", boxShadow: "0 4px 15px rgba(236,72,153,0.3)" }}>
            Create page
          </button>
          <Link to="/templates/$slug" params={{ slug: t.slug }}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-medium text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-violet-500/8 hover:text-white">
            <Eye className="h-3.5 w-3.5" /> Detail
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedTemplates() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-pink-400">
              Our Collection
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}
              className="text-4xl font-black text-white sm:text-5xl">
              Featured Templates
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/templates"
              className="group flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/70 backdrop-blur transition-all hover:border-violet-500/30 hover:text-white">
              View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {allUnifiedTemplates.slice(0, 6).map((t, i) => (
            <TemplateCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
