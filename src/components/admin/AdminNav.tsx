import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  LayoutDashboard, ShoppingCart, Users, Globe,
  Clock, ArrowLeft, Shield, RefreshCw,
} from "lucide-react";
import { usePendingWebsites } from "@/hooks/use-orders";

export function AdminNav() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: pendingItems = [] } = usePendingWebsites();
  const pendingCount = pendingItems.length;

  async function handleRefreshAll() {
    setIsRefreshing(true);
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["pending-websites"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-pages"] }),
      ]);
      toast.success("Admin dashboard refreshed!");
    } catch {
      toast.error("Failed to refresh database data.");
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  }

  async function handleResetTestData() {
    if (!confirm("Are you sure you want to clean all test data? This will remove local test drafts and testing records.")) return;
    try {
      if (typeof window !== "undefined") {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("page_") || key.startsWith("order_") || key.includes("draft"))) {
            localStorage.removeItem(key);
          }
        }
      }
      await handleRefreshAll();
      toast.success("Test data cleared successfully! Clean testing environment ready.");
    } catch (e) {
      toast.error("Failed to clean test data.");
    }
  }

  const navItems = [
    { to: "/admin",         label: "Dashboard",        icon: LayoutDashboard, exact: true },
    { to: "/admin/pending", label: "Pending Websites", icon: Clock, badge: pendingCount },
    { to: "/admin/orders",  label: "Orders",           icon: ShoppingCart },
    { to: "/admin/pages",   label: "Pages",            icon: Globe },
    { to: "/admin/users",   label: "Users",            icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-white/[0.06] bg-[#0a0918]/95 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-violet-600">
          <Shield className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-white/80">Admin Panel</span>
        <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-red-400">
          Admin only
        </span>

        {/* 1-Click Refresh Data Button */}
        <button
          type="button"
          onClick={handleRefreshAll}
          disabled={isRefreshing}
          className="flex items-center gap-1 rounded-lg bg-white/[0.06] border border-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all ml-2"
          title="Refresh all admin database queries"
        >
          <RefreshCw className={`h-3 w-3 ${isRefreshing ? "animate-spin text-violet-400" : ""}`} />
          <span>{isRefreshing ? "Refreshing..." : "Refresh Data"}</span>
        </button>

        {/* Reset Test Data Button */}
        <button
          type="button"
          onClick={handleResetTestData}
          className="flex items-center gap-1 rounded-lg bg-red-500/10 border border-red-500/20 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-500/20 transition-all"
          title="Clean development/testing data"
        >
          <span>Reset Test Data</span>
        </button>
      </div>

      <div className="flex items-center gap-0.5">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-white/40 hover:bg-white/[0.05] hover:text-white/80 transition-colors relative"
            activeProps={{ className: "bg-violet-600/20 text-violet-300 font-semibold" }}
            activeOptions={item.exact ? { exact: true } : undefined}>
            <item.icon className="h-3.5 w-3.5" />
            {item.label}
            {item.badge ? item.badge > 0 && (
              <span className="ml-1 rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-400 border border-amber-500/30">
                {item.badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>

      <Link to="/dashboard"
        className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/70 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Dashboard
      </Link>
    </nav>
  );
}
