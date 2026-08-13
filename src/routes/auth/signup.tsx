import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Create account — Greeting Vibes Templates" }] }),
  component: SignupPage,
});

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.literal(true, { errorMap: () => ({ message: "Accept the terms to continue" }) }),
});
type FormData = z.infer<typeof schema>;

function SignupPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { terms: undefined },
  });

  const pw = watch("password") ?? "";
  const strength = pw.length >= 12 ? 3 : pw.length >= 8 ? 2 : pw.length >= 4 ? 1 : 0;
  const strengthColors = ["", "#f87171", "#fbbf24", "#34d399"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  async function onSubmit(data: FormData) {
    const { error } = await supabase.auth.signUp({
      email: data.email, password: data.password,
      options: { data: { full_name: data.fullName } },
    });
    if (error) { toast.error(error.message); return; }
    setEmailSent(true);
  }

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="w-full max-w-sm overflow-hidden rounded-3xl border border-[rgba(167,139,250,0.18)] p-10 text-center"
          style={{ background: "linear-gradient(160deg, rgba(167,139,250,0.08) 0%, rgba(52,211,153,0.05) 100%)", backdropFilter: "blur(20px)" }}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/25">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We sent a confirmation link to your email. Click it to activate your account and start creating.
          </p>
          <Link to="/auth/login"
            className="mt-6 block rounded-2xl bg-[image:var(--gradient-brand)] py-3.5 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)]">
            Back to sign in
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{
        background: "radial-gradient(ellipse 65% 55% at 70% 20%, rgba(244,114,182,0.20) 0%, transparent 60%), radial-gradient(ellipse 55% 50% at 25% 75%, rgba(124,58,237,0.16) 0%, transparent 60%)",
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px]"
      >
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
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Free to start — no credit card needed</p>
        </div>

        <div
          className="overflow-hidden rounded-3xl border border-[rgba(167,139,250,0.18)] p-8"
          style={{
            background: "linear-gradient(160deg, rgba(167,139,250,0.07) 0%, rgba(244,114,182,0.04) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 24px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="fullName">Full name</label>
              <input id="fullName" type="text" autoComplete="name" placeholder="Your name"
                className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                {...register("fullName")} />
              {errors.fullName && <p className="mt-1.5 text-xs text-red-400">{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" placeholder="you@example.com"
                className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                {...register("email")} />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground" htmlFor="password">Password</label>
              <div className="relative">
                <input id="password" type={showPw ? "text" : "password"} autoComplete="new-password" placeholder="At least 8 characters"
                  className="w-full rounded-2xl border border-[var(--glass-border)] bg-white/5 px-4 py-3.5 pr-12 text-sm outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/15 placeholder:text-muted-foreground/50"
                  {...register("password")} />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPw ? "Hide" : "Show"}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {pw.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ background: strength >= s ? strengthColors[strength] : "rgba(167,139,250,0.15)" }} />
                    ))}
                  </div>
                  <span className="text-xs font-medium" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</span>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input id="terms" type="checkbox"
                className="mt-0.5 h-4 w-4 cursor-pointer rounded border-[var(--glass-border)] accent-primary"
                {...register("terms")} />
              <label htmlFor="terms" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
                I agree to the{" "}
                <Link to="/contact" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/contact" className="text-primary hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.terms && <p className="text-xs text-red-400">{errors.terms.message}</p>}

            <button type="submit" disabled={isSubmitting}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-brand)] py-4 text-sm font-bold text-white shadow-[var(--shadow-glow-brand)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-8px_rgba(167,139,250,0.7)] disabled:opacity-60">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>Create account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-bold text-primary hover:text-primary/80 transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
