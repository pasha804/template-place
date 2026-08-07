/**
 * Admin Users — /admin/users
 * View all users, see their roles, promote to admin/moderator.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Shield, User, AlertCircle, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: AdminUsersPage,
});

type AppRole = "admin" | "moderator" | "support" | "user";

function AdminUsersPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStore();
  const qc = useQueryClient();

  useEffect(() => {
    if (!user)    { navigate({ to: "/auth/login" }); return; }
    if (!isAdmin) { navigate({ to: "/dashboard" }); return; }
  }, [user, isAdmin, navigate]);

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: roles = [] } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("*");
      return data ?? [];
    },
  });

  const setRole = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: AppRole }) => {
      // Remove existing non-user roles
      await supabase.from("user_roles").delete().eq("user_id", userId).neq("role", "user");
      if (role !== "user") {
        await supabase.from("user_roles").upsert({ user_id: userId, role }, { onConflict: "user_id,role" });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-user-roles"] });
      toast.success("Role updated");
    },
  });

  function getUserRole(userId: string): AppRole {
    const userRoles = roles.filter(r => r.user_id === userId).map(r => r.role as AppRole);
    if (userRoles.includes("admin"))     return "admin";
    if (userRoles.includes("moderator")) return "moderator";
    if (userRoles.includes("support"))   return "support";
    return "user";
  }

  const ROLE_STYLES: Record<AppRole, { color: string; bg: string }> = {
    admin:     { color: "#f87171", bg: "rgba(248,113,113,0.12)" },
    moderator: { color: "#a78bfa", bg: "rgba(167,139,250,0.12)" },
    support:   { color: "#fbbf24", bg: "rgba(251,191,36,0.12)"  },
    user:      { color: "#6b7280", bg: "rgba(107,114,128,0.10)" },
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#08071a]">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white">Users</h1>
          <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs text-white/40">
            {profiles.length} registered
          </span>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />)}
          </div>
        ) : profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.07] py-20 text-center">
            <AlertCircle className="mb-3 h-10 w-10 text-white/20" />
            <p className="text-white/50">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-white/[0.07]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                  {["User", "Email", "Country", "Joined", "Role"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-white/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile, i) => {
                  const role = getUserRole(profile.id);
                  const rs   = ROLE_STYLES[role];
                  return (
                    <motion.tr key={profile.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs font-bold text-violet-400">
                            {(profile.full_name ?? profile.email ?? "?")[0].toUpperCase()}
                          </div>
                          <span className="font-medium text-white/80 truncate max-w-[140px]">
                            {profile.full_name ?? "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">{profile.email ?? "—"}</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{profile.country ?? "—"}</td>
                      <td className="px-4 py-3 text-white/30 text-xs">
                        {format(new Date(profile.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="px-4 py-3">
                        <div className="relative inline-block">
                          <select
                            value={role}
                            onChange={(e) => setRole.mutate({ userId: profile.id, role: e.target.value as AppRole })}
                            disabled={profile.id === user?.id}
                            className="appearance-none rounded-xl border px-3 py-1.5 text-xs font-semibold capitalize cursor-pointer outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                            style={{ color: rs.color, background: rs.bg, borderColor: rs.color + "40" }}>
                            {(["user","support","moderator","admin"] as AppRole[]).map(r => (
                              <option key={r} value={r} className="bg-[#1a1730] text-white capitalize">{r}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2"
                            style={{ color: rs.color }} />
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
