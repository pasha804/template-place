import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { usePage } from "@/hooks/use-pages";
import { getTemplate }         from "@/templates/registry";
import { getExternalTemplate } from "@/engine/registry";
import type { BlockInstance, PageTheme } from "@/blocks/types";
import type { TemplateConfig } from "@/engine/types";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/p/$slug")({
  component: PublicPageViewer,
});

type AccessState = "loading" | "granted" | "expired" | "notfound";

function PublicPageViewer() {
  const { slug } = Route.useParams();
  const { data: page, isLoading, error } = usePage(slug, "slug");
  const [access, setAccess] = useState<AccessState>("loading");

  // Apply template-page class to strip marketplace body styles
  useEffect(() => {
    document.body.classList.add("template-page");
    document.body.style.margin  = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.classList.remove("template-page");
      document.body.style.margin  = "";
      document.body.style.padding = "";
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!page || error) { setAccess("notfound"); return; }
    if (page.expires_at && new Date(page.expires_at) < new Date()) { setAccess("expired"); return; }
    // PIN protection removed — payment system controls access.
    // The birthday template's internal PIN (VaultScreen) is part of the
    // template experience itself and is separate from platform-level access.
    setAccess("granted");
    if (page.status === "published") recordView(page.id);
  }, [page, isLoading, error]);

  async function recordView(pageId: string) {
    const ua     = navigator.userAgent;
    const device = /mobile/i.test(ua) ? "mobile" : /tablet/i.test(ua) ? "tablet" : "desktop";
    await supabase.from("page_views").insert({ page_id: pageId, device, referrer: document.referrer || null });
  }

  /* ── Loading ── */
  if (access === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: "rgba(167,139,250,0.8)" }} />
      </div>
    );
  }

  /* ── Not found ── */
  if (access === "notfound") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]">
        <AlertCircle className="h-12 w-12 text-white/30" />
        <h1 className="text-2xl font-bold text-white">Page not found</h1>
        <p className="text-white/40">This page doesn't exist or may have been removed.</p>
      </div>
    );
  }

  /* ── Expired ── */
  if (access === "expired") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]">
        <AlertCircle className="h-12 w-12 text-amber-400" />
        <h1 className="text-2xl font-bold text-white">Page expired</h1>
        <p className="text-white/40">This page's access period has ended.</p>
      </div>
    );
  }

  /* ── Granted — render the template ── */
  if (access === "granted" && page) {
    // External template (birthday, proposal, wedding, etc.)
    // Use template_id as primary source, with content._template_id as fallback
    const templateId = page.template_id || (page.content as Record<string, unknown>)?._template_id as string;
    
    if (!templateId) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]">
          <AlertCircle className="h-12 w-12 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Template Error</h1>
          <p className="text-white/40">This page is missing template information.</p>
          <p className="text-xs text-white/25 font-mono">Page ID: {page.id}</p>
        </div>
      );
    }

    const extPlugin = getExternalTemplate(templateId);
    if (extPlugin) {
      const config = (page.content as TemplateConfig) ?? extPlugin.defaults;
      return (
        <div className="template-runtime">
          <extPlugin.Renderer config={config} mode="view" />
        </div>
      );
    }

    // Block-based template (legacy)
    const blockPlugin = getTemplate(templateId);
    if (blockPlugin) {
      const blocks = page.blocks as unknown as BlockInstance[];
      const theme  = page.theme  as unknown as PageTheme;
      return (
        <div className="template-runtime">
          <blockPlugin.Renderer blocks={blocks} theme={theme} mode="view" />
        </div>
      );
    }

    // Template not found in registry
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center bg-[#08071a]">
        <AlertCircle className="h-12 w-12 text-amber-400" />
        <h1 className="text-2xl font-bold text-white">Template Not Found</h1>
        <p className="text-white/40">The template for this page is not available.</p>
        <p className="text-xs text-white/25 font-mono">Template ID: {templateId}</p>
      </div>
    );
  }

  return null;
}
