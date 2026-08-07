import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Shaukat Techs Templates" }] }),
  component: ForgotPasswordPage,
});

const schema = z.object({ email: z.string().email("Enter a valid email") });
type FormData = z.infer<typeof schema>;

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) { toast.error(error.message); return; }
    setSent(true);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 60% at 50% 30%, color-mix(in oklab, var(--primary) 16%, transparent) 0%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-aurora shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="mt-1 text-sm text-muted-foreground">We'll send you a link to reset it</p>
        </div>

        {sent ? (
          <div className="glass rounded-3xl border border-border/60 p-10 text-center shadow-lift">
            <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-success" />
            <h2 className="text-lg font-bold">Check your inbox</h2>
            <p className="mt-2 text-sm text-muted-foreground">We sent a password reset link to your email.</p>
            <Link to="/auth/login" className="mt-6 block rounded-2xl bg-aurora py-3 text-sm font-semibold text-primary-foreground shadow-glow text-center">
              Back to sign in
            </Link>
          </div>
        ) : (
          <div className="glass rounded-3xl border border-border/60 p-8 shadow-lift">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("email")}
                />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-aurora py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Send reset link
              </button>
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember it?{" "}
          <Link to="/auth/login" className="font-semibold text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
