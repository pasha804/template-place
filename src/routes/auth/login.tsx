import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — Greeting Vibes Templates" }] }),
  component: LoginPage,
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error || !authData.session) {
        const rawErr = (error?.message || "").toLowerCase();
        if (rawErr.includes("invalid login credentials") || rawErr.includes("invalid_credentials")) {
          toast.error("Incorrect password or email. Please check your credentials.");
        } else if (rawErr.includes("user not found") || rawErr.includes("email not found")) {
          toast.error("Account does not exist with this email.");
        } else if (rawErr.includes("email not confirmed")) {
          toast.error("Please confirm your email before signing in.");
        } else {
          toast.error(error?.message || "Invalid credentials. Please check your email and password.");
        }
        return;
      }

      toast.success("Welcome back!");
      await new Promise((r) => setTimeout(r, 150));
      await navigate({ to: "/dashboard" });
    } catch {
      toast.error("Authentication failed. Please check your credentials.");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(124,58,237,0.22) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 75% 75%, rgba(244,114,182,0.16) 0%, transparent 60%)",
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[420px]"
      >
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="mb-5 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow-brand)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">
              <span style={{ background: "var(--gradient-brand)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>Greeting</span>
              {" "}<span>Vibes</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div
          className="overflow-hidden rounded-3xl border border-[rgba(167,139,250,0.18)] p-8"
          style={{
            background: "linear-gradient(160deg, rgba(167,139,250,0.07) 0%, rgba(244,114,182,0.04) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="email">Email</label>
              <input
                id="email" type="email" autoComplete="email" placeholder="you@example.com"
                className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                {...register("email")}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="password">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-primary hover:text-primary/80 transition-colors">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  id="password" type={showPw ? "text" : "password"} autoComplete="current-password" placeholder="••••••••"
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                  {...register("password")}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            <button
              type="submit" disabled={isSubmitting}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>Sign in <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="font-bold text-primary hover:text-primary/80 transition-colors">
            Sign up free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
