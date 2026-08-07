import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ShoppingCart, Users, Globe,
  Clock, ArrowLeft, Shield, Sparkles,
} from "lucide-react";
import { usePendingWebsites } from "@/hooks/use-orders";

export function AdminNav() {
  const { data: pendingItems = [] } = usePendingWebsites();
  const pendingCount = pendingItems.length;

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
