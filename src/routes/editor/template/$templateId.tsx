/**
 * Template Editor — configuration-only page
 * /editor/template/:templateId?pageId=xxx
 *
 * Pure data-entry form. No live preview. No split layout.
 * User fills in fields → Save → Continue → Checkout.
 */
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useCallback, useRef } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getExternalTemplate } from "@/engine/registry";
import { useTemplateEditorStore } from "@/store/templateEditor";
import { useAuthStore } from "@/store/auth";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { EditorTopBar }      from "@/components/template-editor/EditorTopBar";
import { EditorFormPanel }   from "@/components/template-editor/EditorFormPanel";
import type { TemplateConfig } from "@/engine/types";

const searchSchema = z.object({ pageId: z.string().optional() });

export const Route = createFileRoute("/editor/template/$templateId")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Edit Template — Greeting Vibes" }] }),
  component: TemplateEditorPage,
});

function generateSlug(name: string) {
  return (
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") +
    "-" + Math.random().toString(36).slice(2, 7)
  );
}

function TemplateEditorPage() {
  const { templateId }  = Route.useParams();
  const { pageId }      = Route.useSearch();
  const navigate        = useNavigate();
  const user            = useAuthStore((s) => s.user);
  const plugin          = getExternalTemplate(templateId);
  const store           = useTemplateEditorStore();
  const autosaveRef     = useRef<NodeJS.Timeout | null>(null);
  const initialized     = useRef(false);

  /* ── Guard: auth + valid plugin ── */
  useEffect(() => {
    if (!user) { navigate({ to: "/auth/login" }); return; }
    if (!plugin) {
      toast.error("Template not found");
      navigate({ to: "/templates" });
    }
  }, [user, plugin, navigate]);

  /* ── Init: load page from DB or create new ── */
  useEffect(() => {
    if (!user || !plugin || initialized.current) return;
    initialized.current = true;

    async function loadOrCreate() {
      if (!user || !plugin) return;

      if (pageId) {
        let pageData: Record<string, unknown> | null = null;
        try {
          const { data: isAdminUser } = await supabase.rpc("is_admin");
          let q = supabase.from("pages").select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, published_at, deleted_at, view_count, created_at, updated_at").eq("id", pageId);
          if (!isAdminUser) q = q.eq("user_id", user.id);
          const { data, error } = await q.single();
          if (!error && data) {
            pageData = data as Record<string, unknown>;
          }
        } catch (e) {
          console.warn("Supabase query error:", e);
        }

        if (!pageData) {
          const cached = localStorage.getItem(`page_${pageId}`);
          if (cached) {
            try { pageData = JSON.parse(cached); } catch {}
          }
        }

        if (!pageData) {
          toast.error("Page not found");
          navigate({ to: "/dashboard" });
          return;
        }

        const savedConfig = (pageData.content as Record<string, unknown>) ?? {};
        const merged: TemplateConfig = { ...plugin.defaults, ...savedConfig };
        store.init(templateId, pageId, merged);
      } else {
        const slug = generateSlug(plugin.manifest.name);
        let data: Record<string, unknown> | null = null;

        // Insert new page with template_id (FK constraint should be satisfied after migration)
        const res = await supabase
          .from("pages")
          .insert({
            user_id:     user.id,
            template_id: plugin.manifest.id,
            title:       (plugin.defaults._page_title as string) ?? plugin.manifest.name,
            slug,
            status:      "draft",
            blocks:      [],
            theme:       {},
            content:     { ...plugin.defaults, _template_id: plugin.manifest.id } as unknown as Json,
            is_public:   false,
          })
          .select()
          .single();

        if (res.data) {
          data = res.data as Record<string, unknown>;
        } else if (res.error) {
          console.error("Failed to create page:", res.error);
          toast.error("Failed to create page. Please try again.");
          navigate({ to: "/templates" });
          return;
        }

        // LocalStorage backup for offline resilience
        const finalPageId = (data?.id as string) || `draft-${Date.now()}`;
        const finalSlug = (data?.slug as string) || slug;
        const pageObj = {
          id: finalPageId,
          user_id: user.id,
          template_id: plugin.manifest.id,
          title: (plugin.defaults._page_title as string) ?? plugin.manifest.name,
          slug: finalSlug,
          status: "draft",
          content: plugin.defaults,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        localStorage.setItem(`page_${finalPageId}`, JSON.stringify(pageObj));

        store.init(templateId, finalPageId, { ...plugin.defaults, _page_slug: finalSlug });
        navigate({
          to: "/editor/template/$templateId",
          params: { templateId },
          search: { pageId: finalPageId },
          replace: true,
        });
      }
    }

    loadOrCreate();
  }, [user, plugin, pageId, templateId, navigate, store]);

  /* ── Save ── */
  const doSave = useCallback(async () => {
    const { config, pageId: pid, setIsSaving, setSaved } =
      useTemplateEditorStore.getState();
    if (!pid || !user) return;
    setIsSaving(true);

    const title = (config._page_title as string) || plugin?.manifest.name || "Untitled";
    const slug = (config._page_slug as string) || pid;
    const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(pid);

    try {
      const payload = {
        ...(isUuid ? { id: pid } : {}),
        user_id: user.id,
        template_id: plugin?.manifest.id || templateId,
        title,
        slug,
        status: "draft",
        content: { ...config, _template_id: plugin?.manifest.id || templateId } as unknown as Json,
        is_public: Boolean(config._page_isPublic),
        updated_at: new Date().toISOString(),
      };

      const res = await supabase.from("pages").upsert(payload as any).select("id, slug, status").single();
      let realPageId = pid;
      
      if (res.data?.id) {
        realPageId = res.data.id;
        useTemplateEditorStore.setState({ pageId: realPageId });
      } else if (res.error) {
        console.error("Save failed:", res.error);
        toast.error("Failed to save. Please check your connection.");
        setIsSaving(false);
        return;
      }

      // Update localStorage backup
      const existing = localStorage.getItem(`page_${realPageId}`);
      const baseObj = existing ? JSON.parse(existing) : { id: realPageId, user_id: user.id };
      const updatedObj = {
        ...baseObj,
        id: realPageId,
        title,
        slug,
        content: config,
        template_id: plugin?.manifest.id || templateId,
        updated_at: new Date().toISOString(),
      };
      localStorage.setItem(`page_${realPageId}`, JSON.stringify(updatedObj));
      if (pid !== realPageId) {
        localStorage.setItem(`page_${pid}`, JSON.stringify(updatedObj));
      }

      setSaved(new Date());
      toast.success("Saved");
      return realPageId;
    } catch (e) {
      console.error("Save failed error:", e);
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  }, [plugin, user, templateId]);

  /* ── Publish ── */
  const doPublish = useCallback(async () => {
    const { pageId: pid, setIsSaving } = useTemplateEditorStore.getState();
    if (!pid) return;
    setIsSaving(true);
    try {
      const activeId = (await doSave()) || pid;
      const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(activeId);

      let query = supabase
        .from("pages")
        .update({
          status:       "published",
          published_at: new Date().toISOString(),
          is_public:    true,
        });

      if (isUuid) {
        query = query.eq("id", activeId);
      } else {
        query = query.eq("slug", activeId);
      }

      const { error } = await query;
      if (error) throw error;
      toast.success("Page published! 🎉");
    } catch (e) {
      console.error("Publish failed error:", e);
      toast.error("Publish failed");
    } finally {
      useTemplateEditorStore.getState().setIsSaving(false);
    }
  }, [doSave]);

  /* ── Autosave every 30s when dirty ── */
  useEffect(() => {
    autosaveRef.current = setInterval(() => {
      if (useTemplateEditorStore.getState().isDirty) doSave();
    }, 30_000);
    return () => { if (autosaveRef.current) clearInterval(autosaveRef.current); };
  }, [doSave]);

  /* ── Loading state ── */
  if (!plugin || !store.pageId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08071a]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          <p className="text-sm text-white/40">Loading editor…</p>
        </div>
      </div>
    );
  }

  const handleSave = useCallback(async () => {
    await doSave();
  }, [doSave]);

  return (
    <div
      className="app-ui flex h-screen flex-col overflow-hidden bg-[#08071a]"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <EditorTopBar onSave={handleSave} onPublish={doPublish} />
      {/* Full-width configuration form — no sidebar, no preview */}
      <div className="flex-1 overflow-y-auto">
        <EditorFormPanel plugin={plugin} />
      </div>
    </div>
  );
}
