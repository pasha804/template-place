import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/components/home/PricingSection";
import { FAQSection } from "@/components/home/FAQSection";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Plans & Pricing — Greeting Vibes Templates" },
      { name: "description", content: "Simple, transparent pricing for every budget." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
