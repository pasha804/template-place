/**
 * Checkout — /checkout/:pageId
 *
 * Shown after user finishes editing and clicks "Continue".
 * PKR pricing, JazzCash / EasyPaisa / Bank Transfer.
 * On "Place Order" → creates order, marks page pending_approval,
 * then shows WhatsApp redirect.
 */
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import {
  ArrowLeft, CheckCircle2, Loader2, Upload, X, MessageCircle,
  ShieldCheck, Sparkles, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { usePage } from "@/hooks/use-pages";
import { usePlaceOrder, useMarkWhatsappSent, PLANS_PKR, formatPKR } from "@/hooks/use-orders";
import { getExternalTemplate } from "@/engine/registry";
import { useAuthStore } from "@/store/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout/$pageId")({
  head: () => ({ meta: [{ title: "Checkout — Greeting Vibes" }] }),
  component: CheckoutPage,
});

const PAYMENT_METHODS = [
  {
    id:    "easypaisa",
    label: "EasyPaisa",
    emoji: "💚",
    instructions: [
      "Open EasyPaisa app or dial *786*2#",
      "Send payment to: +92 332 4967481",
      "Account name: Shaukat Ali",
      "Take a screenshot of the transaction",
      "Upload the screenshot below",
    ],
  },
  {
    id:    "bank",
    label: "Bank Transfer",
    emoji: "🏦",
    instructions: [
      "Bank: UBL (United Bank Limited)",
      "Account Title: Shaukat Ali",
      "IBAN: PK34UNIL0109000253737045",
      "Take a screenshot after transfer",
      "Upload the receipt below",
    ],
  },
  {
    id:    "paypal",
    label: "PayPal",
    emoji: "💙",
    instructions: [
      "Send payment to: shaukat.ali590@gmail.com",
      "PayPal username: @shaukatali5900",
      "Use 'Friends & Family' to avoid fees",
      "Add your Order ID in the note",
      "Upload the payment screenshot below",
    ],
  },
] as const;

type PlanKey = typeof PLANS_PKR[number]["key"];

function CheckoutPage() {
  const { pageId } = Route.useParams();
  const navigate   = useNavigate();
  const user       = useAuthStore((s) => s.user);
  const { data: page, isLoading } = usePage(pageId);
  const placeOrder    = usePlaceOrder();
  const markWhatsapp  = useMarkWhatsappSent();

  const [selectedPlan, setSelectedPlan]     = useState<PlanKey>("premium");
  const [paymentMethod, setPaymentMethod]   = useState<string>("easypaisa");
  const [screenshot, setScreenshot]         = useState<string>("");
  const [step, setStep]                     = useState<"plan" | "payment" | "success">("plan");
  const [orderId, setOrderId]               = useState<string>("");
  const [orderRef, setOrderRef]             = useState<string>("");
  const [whatsappSent, setWhatsappSent]     = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (!user) navigate({ to: "/auth/login" }); }, [user, navigate]);

  const plugin = page ? getExternalTemplate(page.template_id) : null;
  const plan   = PLANS_PKR.find(p => p.key === selectedPlan) ?? PLANS_PKR[1];
  const method = PAYMENT_METHODS.find(m => m.id === paymentMethod) ?? PAYMENT_METHODS[0];

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File too large — max 5 MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setScreenshot(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handlePlaceOrder() {
    if (!user || !page || !plugin) return;
    if (!screenshot) { toast.error("Please upload your payment screenshot"); return; }

    try {
      const order = await placeOrder.mutateAsync({
        userId:            user.id,
        pageId:            page.id,
        templateId:        plugin.manifest.id,
        templateName:      plugin.manifest.name,
        planKey:           selectedPlan,
        pricePaisa:        plan.pricePaisa,
        paymentMethod,
        paymentScreenshot: screenshot,
      });
      const o = order as { id?: string; reference?: string };
      const ref = o?.reference || o?.id || `ORD-${Date.now().toString().slice(-6)}`;
      setOrderId(o?.id || ref);
      setOrderRef(ref);
      setStep("success");
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  }

  function buildWhatsAppMessage() {
    return encodeURIComponent(
`Hello Greeting Vibes,

I have customized the following template and completed payment.

Order ID: ${orderRef}
Template: ${plugin?.manifest.name ?? "—"}
Payment Method: ${method.label}
Amount: ${formatPKR(plan.pricePaisa)}

I have uploaded my payment screenshot in the order system.
Please verify my payment and publish my website.

Thank you.`
    );
  }

  function openWhatsApp() {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/923084453846?text=${msg}`, "_blank");
    if (orderId) markWhatsapp.mutate(orderId);
    setWhatsappSent(true);
  }

  if (isLoading || !page) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08071a]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08071a]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#08071a]/90 px-4 backdrop-blur">
        <button type="button" onClick={() => navigate({ to: "/editor/template/$templateId", params: { templateId: page.template_id }, search: { pageId: page.id } })}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to editor
        </button>
        <div className="flex items-center gap-2 text-sm font-semibold text-white/80">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Secure Checkout
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Progress steps */}
        <div className="mb-10 flex items-center justify-center gap-0">
          {["Select Plan", "Payment", "Confirmed"].map((s, i) => {
            const current = step === "plan" ? 0 : step === "payment" ? 1 : 2;
            return (
              <div key={s} className="flex items-center">
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all",
                  i < current ? "bg-emerald-500 text-white" : i === current ? "bg-violet-600 text-white" : "bg-white/[0.06] text-white/30")}>
                  {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("mx-2 text-xs font-medium hidden sm:block",
                  i === current ? "text-white" : "text-white/30")}>{s}</span>
                {i < 2 && <ChevronRight className="h-3.5 w-3.5 text-white/20 mx-1" />}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">

          {/* ── STEP 1: Plan selection ── */}
          {step === "plan" && (
            <motion.div key="plan" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="grid gap-8 lg:grid-cols-[1fr_380px]">

              {/* Plans */}
              <div>
                <h1 className="mb-2 text-2xl font-black text-white">Choose your plan</h1>
                <p className="mb-8 text-sm text-white/40">All plans publish your personalized page for you</p>
                <div className="space-y-4">
                  {PLANS_PKR.map((p) => (
                    <motion.button key={p.key} type="button" whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedPlan(p.key)}
                      className={cn("relative w-full rounded-2xl border p-5 text-left transition-all",
                        selectedPlan === p.key
                          ? "border-violet-500/60 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                          : "border-white/[0.07] bg-white/[0.03] hover:border-white/15")}>
                      {p.popular && (
                        <span className="absolute -top-3 right-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 py-0.5 text-[10px] font-bold text-white">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-white">{p.label}</p>
                          <ul className="mt-2 space-y-1">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-center gap-2 text-xs text-white/55">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="ml-4 text-right shrink-0">
                          <p className="text-2xl font-black text-white">Rs. {p.pricePKR.toLocaleString()}</p>
                          <p className="text-[10px] text-white/35">PKR</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <h2 className="mb-4 font-bold text-white">Order Summary</h2>

                  {/* Template preview thumb */}
                  <div className="mb-5 overflow-hidden rounded-2xl border border-white/[0.06]">
                    <div className="flex h-24 items-center justify-center text-4xl"
                      style={{ background: plugin?.manifest.coverGradient ?? "linear-gradient(135deg,#3d0000,#000)" }}>
                      {plugin?.manifest.thumbnailUrl
                        ? <img src={plugin.manifest.thumbnailUrl} alt="" className="h-full w-full object-cover" />
                        : plugin?.manifest.accentEmoji}
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-white">{page.title}</p>
                      <p className="text-xs text-white/40">{plugin?.manifest.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/[0.06] pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Plan</span>
                      <span className="text-white font-medium">{plan.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Subtotal</span>
                      <span className="text-white">Rs. {plan.pricePKR.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Discount</span>
                      <span className="text-emerald-400">—</span>
                    </div>
                    <div className="flex justify-between border-t border-white/[0.06] pt-3 text-base font-black">
                      <span className="text-white">Total</span>
                      <span className="text-white">Rs. {plan.pricePKR.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button whileTap={{ scale: 0.98 }} onClick={() => setStep("payment")}
                    className="mt-6 w-full rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:scale-[1.02] transition-all">
                    Continue to Payment →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Payment ── */}
          {step === "payment" && (
            <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="grid gap-8 lg:grid-cols-[1fr_380px]">

              <div>
                <h1 className="mb-2 text-2xl font-black text-white">Payment</h1>
                <p className="mb-6 text-sm text-white/40">Select a payment method and upload your receipt</p>

                {/* Method tabs */}
                <div className="mb-6 flex flex-col sm:flex-row gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)}
                      className={cn("flex-1 rounded-2xl border py-3 text-sm font-semibold transition-all",
                        paymentMethod === m.id
                          ? "border-violet-500/60 bg-violet-500/10 text-white"
                          : "border-white/[0.07] bg-white/[0.03] text-white/50 hover:text-white/80")}>
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>

                {/* Instructions */}
                <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">Instructions</p>
                  <ol className="space-y-2">
                    {method.instructions.map((ins, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400">{i + 1}</span>
                        {ins}
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Screenshot upload */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">Payment Screenshot *</p>
                  {screenshot ? (
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <img src={screenshot} alt="Payment proof" className="max-h-48 w-full object-contain bg-black/30" />
                      <button type="button" onClick={() => setScreenshot("")}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-red-400">
                        <X className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-medium">Screenshot uploaded</span>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 py-8 text-white/40 hover:border-violet-500/40 hover:text-white/70 transition-colors">
                      <Upload className="h-6 w-6" />
                      <span className="text-sm">Click to upload screenshot</span>
                      <span className="text-xs text-white/25">PNG, JPG — max 5 MB</span>
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
              </div>

              {/* Summary sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <h2 className="mb-4 font-bold text-white">Order Summary</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Template</span>
                      <span className="text-white font-medium">{plugin?.manifest.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Plan</span>
                      <span className="text-white font-medium">{plan.label}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Payment via</span>
                      <span className="text-white font-medium">{method.label}</span>
                    </div>
                    <div className="flex justify-between border-t border-white/[0.06] pt-3 text-lg font-black">
                      <span className="text-white">Total</span>
                      <span className="text-white">Rs. {plan.pricePKR.toLocaleString()}</span>
                    </div>
                  </div>

                  <motion.button type="button" whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={placeOrder.isPending || !screenshot}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-600 py-4 text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {placeOrder.isPending
                      ? <><Loader2 className="h-4 w-4 animate-spin" /> Placing Order…</>
                      : <><ShieldCheck className="h-4 w-4" /> Place Order — Rs. {plan.pricePKR.toLocaleString()}</>}
                  </motion.button>

                  <button type="button" onClick={() => setStep("plan")}
                    className="mt-3 w-full text-center text-xs text-white/30 hover:text-white/60 transition-colors">
                    ← Back to plans
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", bounce: 0.5 }}
                className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                </div>
              </motion.div>

              <h1 className="mb-2 text-3xl font-black text-white">Order Placed!</h1>
              <p className="mb-1 text-white/50 text-sm">Order ID: <span className="font-mono text-white/80">{orderRef}</span></p>
              <p className="mb-8 text-sm text-white/40">
                Your page is now <span className="text-amber-400 font-semibold">pending payment verification</span>.
                Send us your order details on WhatsApp so we can verify faster.
              </p>

              {/* WhatsApp CTA */}
              <motion.button type="button" whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.03 }}
                onClick={openWhatsApp}
                className={cn("mb-4 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-bold text-white transition-all",
                  whatsappSent
                    ? "bg-emerald-600/80 border border-emerald-500/40"
                    : "bg-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.3)] hover:shadow-[0_0_32px_rgba(37,211,102,0.45)]")}>
                <MessageCircle className="h-5 w-5" />
                {whatsappSent ? "Sent on WhatsApp ✓" : "Send Order to WhatsApp"}
              </motion.button>

              <div className="mb-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-left">
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-2">What happens next?</p>
                {[
                  "Admin receives your order & payment screenshot",
                  "Payment is verified (usually within 2-4 hours)",
                  "Your page goes live at greetingvibes.com/p/your-slug",
                  "You get notified when it's published",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-400">{i + 1}</span>
                    <span className="text-sm text-white/60">{step}</span>
                  </div>
                ))}
              </div>

              <Link to="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Go to dashboard
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
