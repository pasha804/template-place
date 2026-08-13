import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({ meta: [{ title: "Set new password — Greeting Vibes Templates" }] }),
  component: ResetPasswordPage,
});

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
type FormData = z.infer<typeof schema>;

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw]       = useState(false);
  const [showCf, setShowCf]       = useState(false);
  const [ready, setReady]         = useState(false);
  const [invalid, setInvalid]     = useState(false);
  const [done, setDone]           = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const pw = watch("password") ?? "";
  const strength = pw.length >= 12 ? 3 : pw.length >= 8 ? 2 : pw.length >= 4 ? 1 : 0;
  const strengthColors = ["", "#f87171", "#fbbf24", "#34d399"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  // Supabase sends a recovery link → on load the URL has #access_token & type=recovery
  // onAuthStateChange fires with event "PASSWORD_RECOVERY"
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    // Fallback: if user already has an active session (e.g. navigated here directly)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else {
        // Give the hash-based token a moment to be parsed
        setTimeout(() => {
          supabase.auth.getSession().then(({ data: d2 }) => {
            if (!d2.session) setInvalid(true);
          });
        }, 1500);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(data: FormData) {
    const { error } = await supabase.auth.updateUser({ password: data.password });
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 2500);
  }

  /* ── Success ── */
  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(52,211,153,0.25)] p-10 text-center"
          style={{
            background: "linear-gradient(160deg, rgba(52,211,153,0.08) 0%, rgba(167,139,250,0.05) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Password updated</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your new password is set. Redirecting you to the dashboard…
          </p>
        </motion.div>
      </div>
    );
  }

  /* ── Invalid / expired token ── */
  if (invalid) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(248,113,113,0.25)] p-10 text-center"
          style={{
            background: "linear-gradient(160deg, rgba(248,113,113,0.08) 0%, rgba(167,139,250,0.04) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h2 className="text-xl font-bold">Link expired</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This password reset link has expired or already been used.
          </p>
          <Link
            to="/auth/forgot-password"
            className="mt-6 block rounded-2xl bg-[image:var(--gradient-brand)] py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)]"
          >
            Request a new link
          </Link>
        </motion.div>
      </div>
    );
  }

  /* ── Loading while token is verified ── */
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "rgba(167,139,250,0.8)" }} />
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 20%, rgba(124,58,237,0.20) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

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
              <span
                style={{
                  background: "var(--gradient-brand)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Greeting
              </span>{" "}
              <span>Vibes</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold">Set new password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a strong password for your account
          </p>
        </div>

        {/* Card */}
        <div
          className="overflow-hidden rounded-3xl border border-[rgba(167,139,250,0.18)] p-8"
          style={{
            background:
              "linear-gradient(160deg, rgba(167,139,250,0.07) 0%, rgba(244,114,182,0.04) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "0 24px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New password */}
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                htmlFor="password"
              >
                New password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength meter */}
              {pw.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            strength >= s
                              ? strengthColors[strength]
                              : "rgba(167,139,250,0.15)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: strengthColors[strength] }}
                  >
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                htmlFor="confirm"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showCf ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                  {...register("confirm")}
                />
                <button
                  type="button"
                  onClick={() => setShowCf((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showCf ? "Hide password" : "Show password"}
                >
                  {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirm && (
                <p className="mt-1.5 text-xs text-red-400">{errors.confirm.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update password"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          <Link
            to="/auth/login"
            className="font-bold text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
