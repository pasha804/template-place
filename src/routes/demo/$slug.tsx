/**
 * Demo route — /demo/:slug
 * Renders the template fullscreen using its default config.
 * No editor, no header, no chrome — just the raw template experience.
 * Opens in a new tab when user clicks "Demo" on the detail page.
 *
 * IMPORTANT: No wrapper height/overflow constraints — the template renders
 * exactly as it would standalone. The body is the scroll container.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { getExternalTemplateBySlug } from "@/engine/registry";
import { getTemplateBySlug } from "@/templates/registry";
import { TemplateSurface } from "@/templates/surface";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/demo/$slug")({
  head: () => ({ meta: [{ title: "Live Demo — Greeting Vibes" }] }),
  component: DemoPage,
});

function DemoPage() {
  const { slug } = Route.useParams();

  // Reset any global body/html constraints so the template owns the viewport
  useEffect(() => {
    // Apply template-page class — strips marketplace body styles
    document.body.classList.add("template-page");
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.classList.remove("template-page");
      document.body.style.margin  = "";
      document.body.style.padding = "";
    };
  }, []);

  const extPlugin   = getExternalTemplateBySlug(slug);
  const blockPlugin = getTemplateBySlug(slug);

  /* ── External template (birthday, proposal, etc.) ── */
  if (extPlugin) {
    return (
      <>
        {/* Floating "back" pill — unobtrusive, does NOT affect layout */}
        <div className="fixed top-3 left-3 z-[9999] pointer-events-none">
          <Link to="/templates/$slug" params={{ slug }}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-black/80 transition-all">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </div>
        <div className="template-runtime">
          <extPlugin.Renderer config={extPlugin.defaults} mode="view" />
        </div>
      </>
    );
  }

  /* ── Block-based template ── */
  if (blockPlugin) {
    return (
      <>
        <div className="fixed top-3 left-3 z-[9999] pointer-events-none">
          <Link to="/templates/$slug" params={{ slug }}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/60 hover:text-white hover:bg-black/80 transition-all">
            <ArrowLeft className="h-3 w-3" /> Back
          </Link>
        </div>
        <div className="template-runtime">
          <TemplateSurface blocks={blockPlugin.blocks} theme={blockPlugin.theme} mode="view" />
        </div>
      </>
    );
  }

  /* ── Not found ── */
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#08071a]">
      <p className="text-white/40">Template not found</p>
      <Link to="/templates" className="text-sm text-violet-400 hover:underline">Browse templates</Link>
    </div>
  );
}
