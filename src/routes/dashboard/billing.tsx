import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Check, Sparkles, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useAuthStore } from "@/store/auth";
import { format } from "date-fns";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — Dashboard" }] }),
  component: BillingPage,
});

function BillingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user]);

  const { data: subscription } = useQuery({
    queryKey: ["subscription", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("subscriptions").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*, order_items(*)").eq("user_id", user!.id).order("created_at", { ascending: false }).limit(10);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ["invoices", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("invoices").select("*").eq("user_id", user!.id).order("issued_at", { ascending: false }).limit(10);
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto flex max-w-7xl pt-20">
        <DashboardNav />
        <main className="flex-1 px-4 py-8 sm:px-6 pb-24 lg:pb-8">
          <h1 className="mb-8 text-2xl font-bold">Billing</h1>

          {/* Current plan */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 rounded-2xl border border-border/60 bg-surface p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current plan</p>
                <h2 className="mt-1 text-xl font-bold capitalize">
                  {subscription ? subscription.plan_name : "Free"}
                </h2>
                {subscription?.current_period_end && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Renews {format(new Date(subscription.current_period_end), "MMMM d, yyyy")}
                  </p>
                )}
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>

            {!subscription && (
              <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 p-4">
                <p className="text-sm font-medium">Upgrade to unlock more pages and features</p>
                <Link to="/pricing" className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                  View plans <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Orders */}
          {orders.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-4 font-semibold">Order history</h2>
              <div className="space-y-2">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">#{order.reference}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(order.created_at), "MMM d, yyyy")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">Rs. {(order.total_cents / 100).toLocaleString("en-PK")}</p>
                      <p className={`text-xs capitalize ${order.status === "paid" ? "text-success" : "text-muted-foreground"}`}>{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invoices */}
          {invoices.length > 0 && (
            <div>
              <h2 className="mb-4 font-semibold">Invoices</h2>
              <div className="space-y-2">
                {invoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between rounded-xl border border-border/60 bg-surface px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">Invoice {inv.number}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(inv.issued_at), "MMM d, yyyy")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-semibold">Rs. {(inv.amount_cents / 100).toLocaleString("en-PK")}</p>
                      {inv.pdf_url && (
                        <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">PDF</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {orders.length === 0 && invoices.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
              <CreditCard className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="font-semibold">No orders yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Your purchase history will appear here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
