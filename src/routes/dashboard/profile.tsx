import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, User, Camera, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/profile")({
  head: () => ({ meta: [{ title: "Profile — Dashboard" }] }),
  component: ProfilePage,
});

const schema = z.object({
  full_name: z.string().min(2, "Name is too short"),
  bio: z.string().max(200).optional(),
  country: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const qc = useQueryClient();

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user!.id).single();
      return data;
    },
    enabled: !!user,
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (profile) reset({ full_name: profile.full_name ?? "", bio: profile.bio ?? "", country: profile.country ?? "" });
  }, [profile, reset]);

  async function onSubmit(data: FormData) {
    if (!user) return;
    const { error } = await supabase.from("profiles").upsert({ id: user.id, ...data, updated_at: new Date().toISOString() });
    if (error) { toast.error("Failed to save profile"); return; }
    qc.invalidateQueries({ queryKey: ["profile", user.id] });
    toast.success("Profile updated");
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <h1 className="mb-8 text-2xl font-bold">Profile</h1>
          {isLoading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
              {/* Avatar */}
              <div className="mb-8 flex items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-3xl font-bold text-primary">
                    {profile?.full_name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U"}
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{profile?.full_name ?? "Your name"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Storage: {Math.round((profile?.storage_used_bytes ?? 0) / 1024 / 1024)}MB / {Math.round((profile?.storage_quota_bytes ?? 100 * 1024 * 1024) / 1024 / 1024)}MB
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border/60 bg-surface p-6">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Full name</label>
                  <input type="text" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary" {...register("full_name")} />
                  {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Bio</label>
                  <textarea rows={3} placeholder="A short bio..."
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    {...register("bio")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Country</label>
                  <input type="text" placeholder="Your country"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                    {...register("country")} />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-2xl bg-aurora px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow disabled:opacity-60">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save changes
                </button>
              </form>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
