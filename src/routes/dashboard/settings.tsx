import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Settings, Trash2, LogOut, Shield, Bell } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ui-custom/ThemeToggle";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — Dashboard" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  async function handleSignOut() {
    await signOut();
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <h1 className="mb-8 text-2xl font-bold">Settings</h1>

          <div className="max-w-xl space-y-5">
            {/* Theme */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/60 bg-surface p-6">
              <h2 className="mb-4 font-semibold">Appearance</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <ThemeToggle />
              </div>
            </motion.div>

            {/* Account */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="rounded-2xl border border-border/60 bg-surface p-6">
              <h2 className="mb-4 font-semibold">Account</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-muted/30 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Shield className="h-4 w-4 text-success" />
                </div>
                <button type="button" onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground transition-all hover:border-destructive/30 hover:text-destructive">
                  <LogOut className="h-4 w-4" /> Sign out of all devices
                </button>
              </div>
            </motion.div>

            {/* Danger zone */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
              <h2 className="mb-2 font-semibold text-destructive">Danger zone</h2>
              <p className="mb-4 text-xs text-muted-foreground">These actions are permanent and cannot be undone.</p>
              <button
                type="button"
                onClick={() => toast.error("To delete your account, contact support at greetingvibes786@gmail.com")}
                className="flex items-center gap-2 rounded-xl border border-destructive/30 px-4 py-2.5 text-sm text-destructive transition-all hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" /> Delete account
              </button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
