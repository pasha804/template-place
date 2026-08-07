import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { Bell, Check, CheckCheck } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Dashboard" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);
      return data ?? [];
    },
    enabled: !!user,
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications", user?.id] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      await supabase.from("notifications").update({ read_at: new Date().toISOString() })
        .eq("user_id", user!.id).is("read_at", null);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications", user?.id] }),
  });

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Notifications {unreadCount > 0 && <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-sm text-primary-foreground">{unreadCount}</span>}</h1>
            {unreadCount > 0 && (
              <button type="button" onClick={() => markAllRead.mutate()}
                className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <CheckCheck className="h-4 w-4" /> Mark all read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
              <Bell className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="font-semibold">No notifications yet</p>
              <p className="mt-1 text-sm text-muted-foreground">We'll let you know when something important happens</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((n, i) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border p-4 transition-all",
                    n.read_at ? "border-border/40 bg-surface opacity-70" : "border-primary/20 bg-primary/5"
                  )}
                >
                  <div className={cn("mt-0.5 h-2 w-2 rounded-full shrink-0", n.read_at ? "bg-muted" : "bg-primary")} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{format(new Date(n.created_at), "MMM d, h:mm a")}</p>
                  </div>
                  {!n.read_at && (
                    <button type="button" onClick={() => markRead.mutate(n.id)}
                      className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-primary transition-colors" aria-label="Mark read">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
