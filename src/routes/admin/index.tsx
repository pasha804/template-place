/**
 * Admin Dashboard — /admin
 * Only accessible to users with role "admin" or "moderator".
 */
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart, Clock, CheckCircle2, XCircle, Globe,
  Users, BarChart2, DollarSign, FileText,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useAdminStats, formatPKR } from "@/hooks/use-orders";
import { AdminNav } from "@/components/admin/AdminNav";
import { useExpirationCleanup } from "@/hooks/use-expiration-cleanup";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin — Greeting Vibes" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const { data: stats, isLoading } = useAdminStats();
  
  // Periodically clean up expired pages
  useExpirationCleanup();

  useEffect(() => {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (!isAdmin) { navigate({ to: "/dashboard" }); return; }
  }, [user, isAdmin, navigate]);

  const statCards = [
    { label: "Total orders",    value: stats?.totalOrders   ?? 0, icon: ShoppingCart, color: "#8b5cf6", sub: "all time" },
    { label: "Pending",         value: stats?.pendingOrders ?? 0, icon: Clock,        color: "#fbbf24", sub: "awaiting review" },
    { label: "Verified",        value: stats?.paidOrders    ?? 0, icon: CheckCircle2, color: "#34d399", sub: "paid & published" },
    { label: "Rejected",        value: stats?.failedOrders  ?? 0, icon: XCircle,      color: "#f87171", sub: "failed verification" },
    { label: "Published pages", value: stats?.publishedPages ?? 0, icon: Globe,       color: "#22d3ee", sub: "live" },
    { label: "Pending pages",   value: stats?.pendingPages  ?? 0, icon: FileText,     color: "#fb923c", sub: "awaiting approval" },
    { label: "Total revenue",   value: formatPKR(stats?.totalRevenuePaisa ?? 0), icon: DollarSign, color: "#a78bfa", sub: "PKR verified orders", isText: true },
    { label: "Total users",     value: stats?.totalUsers    ?? 0, icon: Users,        color: "#f472b6", sub: "registered" },
  ];

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#08071a]">
      <AdminNav />
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-white/40">Manage orders, users, and publications</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/[0.04]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statCards.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative overflow-hidden rounded-2xl border border-white/[0.06] p-5"
                style={{ background: `linear-gradient(160deg, ${s.color}10 0%, ${s.color}04 100%)` }}>
                <div className="absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${s.color}50, transparent)` }} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-white/40">{s.label}</p>
                    <p className="mt-1.5 text-2xl font-black text-white"
                      style={s.isText ? { color: s.color, fontSize: "1.1rem" } : undefined}>
                      {s.value}
                    </p>
                    <p className="text-[10px] text-white/25 mt-0.5">{s.sub}</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                    <s.icon className="h-4.5 w-4.5" style={{ color: s.color, width: 18, height: 18 }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Quick actions */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link to="/admin/orders"
            className="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 hover:bg-amber-500/10 transition-colors">
            <Clock className="h-8 w-8 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Pending Orders</p>
              <p className="text-sm text-white/40">Review and verify payments</p>
            </div>
          </Link>
          <Link to="/admin/pending"
            className="flex items-center gap-4 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 hover:bg-violet-500/10 transition-colors">
            <Globe className="h-8 w-8 text-violet-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Pending Websites Queue</p>
              <p className="text-sm text-white/40">Review, preview & go live</p>
            </div>
          </Link>
          <Link to="/admin/users"
            className="flex items-center gap-4 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 hover:bg-pink-500/10 transition-colors">
            <Users className="h-8 w-8 text-pink-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Users</p>
              <p className="text-sm text-white/40">Manage accounts & roles</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
