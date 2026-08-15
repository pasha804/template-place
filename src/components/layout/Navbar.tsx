import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Bell, User, LogOut,
  Settings, LayoutDashboard, Search, Moon, Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const navLinks: { label: string; href: string; hasDropdown?: boolean }[] = [
  { label: "Home",      href: "/" },
  { label: "Contact",   href: "/contact" },
  { label: "Pricing",   href: "/pricing" },
  { label: "Templates", href: "/templates" },
];

function useDark() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem("shaukat-theme") !== "light";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
    localStorage.setItem("shaukat-theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark] as const;
}

export function Navbar() {
  const [open, setOpen]           = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [profileOpen, setProfile] = useState(false);
  const [searchOpen, setSearch]   = useState(false);
  const [dark, setDark]           = useDark();
  const { user, isAdmin, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProfile(false);
    setSearch(false);
  }, [router.state.location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[#0a0914]/90 backdrop-blur-xl py-3"
          : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link to="/" className="group flex shrink-0 items-center gap-2.5 mr-2">
          <img
            src="/dp.jpeg"
            alt="Greeting Vibes Logo"
            className="h-9 w-9 rounded-xl object-cover shadow-[0_0_18px_rgba(236,72,153,0.45)] ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="leading-tight">
            <p className="text-sm font-bold text-white transition-colors group-hover:text-pink-300">Greeting Vibes</p>
            <p className="text-[10px] text-white/40">Templates</p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden flex-1 items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
              activeProps={{ className: "text-pink-400 font-semibold" }}
              activeOptions={{ exact: l.href === "/" }}
            >
              {l.label}
              {l.hasDropdown && <ChevronDown className="h-3 w-3 opacity-50" />}
            </Link>
          ))}
        </nav>

        {/* ── Right side ── */}
        <div className="hidden items-center gap-2 md:flex ml-auto">
          {/* Search bar */}
          <div className="relative flex items-center">
            <div className="flex h-9 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.05] px-3 text-sm text-white/40 backdrop-blur">
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="text-[12px]">Search templates...</span>
              <kbd className="ml-1 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-white/30">/</kbd>
            </div>
          </div>

          {/* Dark / light toggle */}
          <button
            type="button"
            onClick={() => setDark(d => !d)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white/50 transition-all hover:text-white"
            aria-label="Toggle theme"
          >
            {dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {user ? (
            <div className="relative">
              <button type="button" onClick={() => setProfile(p => !p)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-xs font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                {user.email?.[0]?.toUpperCase() ?? "U"}
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f0d24]/95 p-1.5 shadow-xl backdrop-blur-xl"
                  >
                    <div className="border-b border-white/[0.06] px-3 py-2.5 mb-1">
                      <p className="text-[11px] text-white/40">Signed in as</p>
                      <p className="truncate text-sm font-semibold text-white">{user.email}</p>
                    </div>
                    <NavDropItem to="/dashboard"              icon={LayoutDashboard} label="Dashboard" />
                    <NavDropItem to="/dashboard/profile"      icon={User}            label="Profile" />
                    <NavDropItem to="/dashboard/notifications" icon={Bell}           label="Notifications" />
                    {isAdmin && <NavDropItem to="/admin" icon={Settings} label="Admin Panel" accent />}
                    <div className="mt-1 border-t border-white/[0.06] pt-1">
                      <button type="button" onClick={signOut}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white">
                Log in
              </Link>
              <Link to="/auth/signup"
                className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(236,72,153,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                Sign up
                <span className="text-base leading-none">→</span>
              </Link>
            </>
          )}
        </div>

        {/* ── Mobile hamburger ── */}
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <button type="button" onClick={() => setOpen(p => !p)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-white/70">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0a0914]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((l) => (
                <Link key={l.href} to={l.href}
                  className="rounded-xl px-4 py-3 text-sm text-white/60 transition-all hover:bg-white/5 hover:text-white">
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
                {user ? (
                  <>
                    <Link to="/dashboard" className="rounded-xl bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white">Dashboard</Link>
                    <button type="button" onClick={signOut} className="rounded-xl border border-red-500/30 px-4 py-3 text-center text-sm text-red-400">Sign out</button>
                  </>
                ) : (
                  <>
                    <Link to="/auth/login" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-white/80">Log in</Link>
                    <Link to="/auth/signup" className="rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 px-4 py-3 text-center text-sm font-bold text-white">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavDropItem({ to, icon: Icon, label, accent }: { to: string; icon: React.ComponentType<{className?: string}>; label: string; accent?: boolean }) {
  return (
    <Link to={to}
      className={cn(
        "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/[0.05]",
        accent ? "text-violet-400" : "text-white/60 hover:text-white"
      )}>
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}
