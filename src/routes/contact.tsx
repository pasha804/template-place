import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Shaukat Techs Templates" }] }),
  component: ContactPage,
});

const schema = z.object({
  email: z.string().email(),
  subject: z.string().min(5, "Subject too short"),
  message: z.string().min(20, "Message too short"),
});
type FormData = z.infer<typeof schema>;

function ContactPage() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      await supabase.from("support_tickets").insert({
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: "open",
      });
      setSent(true);
    } catch {
      toast.error("Failed to send. Try emailing us directly.");
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold">Contact us</h1>
            <p className="mt-3 text-muted-foreground">
              Have a question or need help? Fill out the form and we'll get back to you within 24 hours.
            </p>

            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-10 flex flex-col items-center rounded-3xl border border-border/60 bg-surface p-12 text-center"
              >
                <CheckCircle2 className="mb-4 h-12 w-12 text-success" />
                <h2 className="text-xl font-bold">Message received</h2>
                <p className="mt-2 text-muted-foreground">We'll reply to your email within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5 rounded-3xl border border-border/60 bg-surface p-8">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Email</label>
                  <input type="email" placeholder="you@example.com"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("email")} />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Subject</label>
                  <input type="text" placeholder="What's on your mind?"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("subject")} />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Message</label>
                  <textarea rows={5} placeholder="Tell us more..."
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    {...register("message")} />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-aurora py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:scale-[1.02] disabled:opacity-60">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                  Send message
                </button>
              </form>
            )}

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface px-5 py-4">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">Email us directly</p>
                <a href="mailto:hello@shaukattechs.com" className="text-xs text-primary hover:underline">hello@shaukattechs.com</a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
