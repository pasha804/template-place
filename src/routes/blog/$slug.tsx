import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostPage,
});

function BlogPostPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-black text-white mb-2">Post not found</h1>
        <Link to="/blog" className="mt-4 text-sm text-primary hover:underline">← Back to blog</Link>
      </main>
      <Footer />
    </div>
  );
}
