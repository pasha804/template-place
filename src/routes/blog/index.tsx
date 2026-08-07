import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-black text-white mb-2">Blog</h1>
        <p className="text-muted-foreground text-sm">Coming soon.</p>
        <Link to="/" className="mt-6 text-sm text-primary hover:underline">← Back to home</Link>
      </main>
      <Footer />
    </div>
  );
}
