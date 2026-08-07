import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { useFavorites } from "@/hooks/use-templates";
import { allUnifiedTemplates } from "@/engine/combined";

export const Route = createFileRoute("/dashboard/favorites")({
  head: () => ({ meta: [{ title: "Favorites — Dashboard" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: favIds = [] } = useFavorites(user?.id);

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const favTemplates = allUnifiedTemplates.filter((t) => favIds.includes(t.id));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <h1 className="mb-8 text-2xl font-bold">Favorites</h1>

          {favTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
              <Heart className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="font-semibold">No favorites yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Heart a template while browsing to save it here</p>
              <Link to="/templates" className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Browse templates <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {favTemplates.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-surface transition-all hover:border-primary/30 hover:shadow-glow"
                >
                  <div className="h-36 w-full relative overflow-hidden" style={{ background: t.coverGradient }}>
                    {t.thumbnailUrl ? (
                      <img src={t.thumbnailUrl} alt={t.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-4xl">{t.accentEmoji}</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{t.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{t.tagline}</p>
                    <div className="mt-3 flex gap-2">
                      <Link to="/templates/$slug" params={{ slug: t.slug }}
                        className="flex-1 rounded-xl bg-primary py-2 text-center text-xs font-semibold text-primary-foreground">
                        Create page
                      </Link>
                      <Link to="/templates/$slug" params={{ slug: t.slug }}
                        className="flex-1 rounded-xl border border-border py-2 text-center text-xs transition-colors hover:border-primary/40">
                        View
                      </Link>
                    </div>
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
