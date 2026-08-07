import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { useUserPages } from "@/hooks/use-pages";
import { format, subDays } from "date-fns";
import { Eye, Globe, Monitor, Smartphone } from "lucide-react";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Dashboard" }] }),
  component: AnalyticsPage,
});

const COLORS = ["var(--primary)", "var(--accent)", "var(--success)", "var(--warning)"];

function AnalyticsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: pages = [] } = useUserPages(user?.id);

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const pageIds = pages.map((p) => p.id);

  const { data: views = [] } = useQuery({
    queryKey: ["all-views", pageIds],
    queryFn: async () => {
      if (!pageIds.length) return [];
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .in("page_id", pageIds)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: pageIds.length > 0,
  });

  const chartData = useMemo(() => {
    const last14 = Array.from({ length: 14 }, (_, i) => {
      const date = subDays(new Date(), 13 - i);
      const key = format(date, "yyyy-MM-dd");
      const count = views.filter((v) => v.created_at.slice(0, 10) === key).length;
      return { date: format(date, "MMM d"), views: count };
    });
    return last14;
  }, [views]);

  const deviceData = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => { const d = v.device ?? "unknown"; counts[d] = (counts[d] ?? 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [views]);

  const countryData = useMemo(() => {
    const counts: Record<string, number> = {};
    views.forEach((v) => { const c = v.country ?? "Unknown"; counts[c] = (counts[c] ?? 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([name, count]) => ({ name, count }));
  }, [views]);

  const totalViews = views.length;
  const uniqueVisitors = new Set(views.map((v) => v.visitor_hash ?? v.id)).size;
  const topCountry = countryData[0]?.name ?? "—";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <h1 className="mb-8 text-2xl font-bold">Analytics</h1>

          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { label: "Total views", value: totalViews, icon: Eye, color: "var(--primary)" },
              { label: "Unique visitors", value: uniqueVisitors, icon: Globe, color: "var(--accent)" },
              { label: "Top country", value: topCountry, icon: Globe, color: "var(--success)" },
              { label: "Active pages", value: pages.filter((p) => p.status === "published").length, icon: Monitor, color: "var(--warning)" },
            ].map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/60 bg-surface p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <s.icon className="h-4 w-4" style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Views chart */}
          <div className="mb-6 rounded-2xl border border-border/60 bg-surface p-6">
            <h2 className="mb-6 font-semibold">Views — last 14 days</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barSize={12}>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                  cursor={{ fill: "var(--primary)", opacity: 0.1 }}
                />
                <Bar dataKey="views" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Devices */}
            <div className="rounded-2xl border border-border/60 bg-surface p-6">
              <h2 className="mb-6 font-semibold">Devices</h2>
              {deviceData.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                <div className="flex items-center gap-6">
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie data={deviceData} dataKey="value" cx="50%" cy="50%" innerRadius={32} outerRadius={50}>
                        {deviceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2">
                    {deviceData.map((d, i) => (
                      <div key={d.name} className="flex items-center gap-2 text-sm">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="capitalize">{d.name}</span>
                        <span className="text-muted-foreground ml-auto">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Countries */}
            <div className="rounded-2xl border border-border/60 bg-surface p-6">
              <h2 className="mb-4 font-semibold">Top countries</h2>
              {countryData.length === 0 ? (
                <p className="text-sm text-muted-foreground">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {countryData.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span className="w-24 truncate text-sm">{c.name}</span>
                      <div className="flex-1 rounded-full bg-muted/30 h-1.5">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${(c.count / (countryData[0]?.count ?? 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{c.count}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
