import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, BarChart2, CreditCard,
  User, Bell, Heart, Settings, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard",                label: "Dashboard",     icon: LayoutDashboard, exact: true },
  { to: "/dashboard/pages",          label: "My Pages",      icon: FileText },
  { to: "/dashboard/analytics",      label: "Analytics",     icon: BarChart2 },
  { to: "/dashboard/billing",        label: "Billing",       icon: CreditCard },
  { to: "/dashboard/favorites",      label: "Favorites",     icon: Heart },
  { to: "/dashboard/notifications",  label: "Notifications", icon: Bell },
  { to: "/dashboard/profile",        label: "Profile",       icon: User },
  { to: "/dashboard/settings",       label: "Settings",      icon: Settings },
];

function NavList({ onClose }: { onClose?: () => void }) {
  return (
    <nav className="space-y-0.5">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-muted-foreground transition-all hover:bg-primary/8 hover:text-foreground"
          activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
          activeOptions={item.exact ? { exact: true } : undefined}
          onClick={onClose}
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-xl transition-all",
                isActive ? "bg-primary/15" : "bg-transparent"
              )}>
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-primary" : "")} />
              </div>
              {item.label}
            </>
          )}
        </Link>
      ))}
    </nav>
  );
}

export function DashboardNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Close drawer on route change
  router.subscribe("onLoad", () => setOpen(false));

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside className="hidden w-56 shrink-0 border-r border-[var(--glass-border)] pt-8 pr-4 lg:block">
        <div className="sticky top-24">
          <NavList />
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-white/[0.08] bg-[#0a0914]/95 backdrop-blur-xl px-4 py-2 lg:hidden">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-muted-foreground transition-all"
            activeProps={{ className: "text-primary" }}
            activeOptions={item.exact ? { exact: true } : undefined}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-white/40")} />
                <span className={cn("text-[9px] font-medium", isActive ? "text-primary" : "text-white/30")}>
                  {item.label}
                </span>
              </>
            )}
          </Link>
        ))}
        {/* More button opens drawer */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-white/40 transition-all"
          aria-label="More"
        >
          <Menu className="h-5 w-5" />
          <span className="text-[9px] font-medium text-white/30">More</span>
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-white/[0.08] bg-[#0a0914] p-6 lg:hidden"
            >
              {/* Drawer header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src="/dp.jpeg"
                    alt="Greeting Vibes Logo"
                    className="h-8 w-8 rounded-xl object-cover shadow-[0_0_14px_rgba(236,72,153,0.45)] ring-1 ring-white/15"
                  />
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-white">Dashboard</p>
                    <p className="text-[10px] text-white/40">Navigation</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/40 hover:bg-white/[0.06] hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <NavList onClose={() => setOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
