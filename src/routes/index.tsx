import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedTemplates } from "@/components/home/FeaturedTemplates";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturesShowcase } from "@/components/home/FeaturesShowcase";
import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTABanner } from "@/components/home/CTABanner";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shaukat Techs Templates — Create Beautiful Moments" },
      {
        name: "description",
        content:
          "Build stunning personal websites for your loved ones in minutes. Choose a template, customize it your way and share your love.",
      },
      { property: "og:title", content: "Shaukat Techs Templates" },
      { property: "og:description", content: "Create beautiful moments with premium templates." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useAuth();
  return (
    <div className="min-h-screen" style={{ background: "#0a0914" }}>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <CategoriesSection />
        <FeaturedTemplates />
        <HowItWorks />
        <FeaturesShowcase />
        <PricingSection />
        <TestimonialsSection />
        <CTABanner />
        <FAQSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
