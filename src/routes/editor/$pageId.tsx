import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { usePage, useUpdatePage } from "@/hooks/use-pages";
import { useAuthStore } from "@/store/auth";
import { useEditorStore } from "@/store/editor";
import type { BlockInstance, PageTheme } from "@/blocks/types";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { EditorTopbar } from "@/components/editor/EditorTopbar";

export const Route = createFileRoute("/editor/$pageId")({
  head: () => ({ meta: [{ title: "Editor — Greeting Vibes Templates" }] }),
  component: EditorPage,
});

function EditorPage() {
  const { pageId } = Route.useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data: page, isLoading, error } = usePage(pageId);
  const updatePage = useUpdatePage();
  const { setPage, page: editorPage, isDirty, setLastSaved, setIsSaving } = useEditorStore();

  useEffect(() => {
    if (!user) { navigate({ to: "/auth/login" }); return; }
  }, [user]);

  useEffect(() => {
    if (page) {
      setPage({
        id: page.id,
        slug: page.slug,
        title: page.title,
        templateId: page.template_id,
        blocks: (page.blocks as unknown as BlockInstance[]) ?? [],
        theme: (page.theme as unknown as PageTheme) ?? {},
        seoTitle: page.seo_title ?? "",
        seoDescription: page.seo_description ?? "",
        ogImageUrl: page.og_image_url ?? "",
        isPublic: page.is_public,
        passwordHash: "",
        pinCode: page.pin_code ?? "",
        expiresAt: page.expires_at ?? "",
        status: page.status,
      });
    }
  }, [page, setPage]);

  const handleSave = useCallback(async () => {
    if (!editorPage || !isDirty) return;
    setIsSaving(true);
    try {
      await updatePage.mutateAsync({
        id: editorPage.id,
        blocks: editorPage.blocks as unknown as import("@/integrations/supabase/types").Json,
        theme: editorPage.theme as unknown as import("@/integrations/supabase/types").Json,
        title: editorPage.title,
        seo_title: editorPage.seoTitle || null,
        seo_description: editorPage.seoDescription || null,
        is_public: editorPage.isPublic,
        pin_code: editorPage.pinCode || null,
        expires_at: editorPage.expiresAt || null,
      });
      setLastSaved(new Date());
      toast.success("Saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  }, [editorPage, isDirty, updatePage, setLastSaved, setIsSaving]);

  // Auto-save every 30s
  useEffect(() => {
    const interval = setInterval(() => { if (isDirty) handleSave(); }, 30_000);
    return () => clearInterval(interval);
  }, [isDirty, handleSave]);

  if (isLoading || !editorPage) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl font-semibold">Page not found</p>
        <Link to="/dashboard" className="text-primary">Go to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#08071a]">
      <EditorTopbar onSave={handleSave} />
      <div className="flex-1 overflow-y-auto">
        <EditorSidebar />
      </div>
    </div>
  );
}
