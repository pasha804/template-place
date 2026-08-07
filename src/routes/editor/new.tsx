import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { getTemplate } from "@/templates/registry";
import { useCreatePage } from "@/hooks/use-pages";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";

const searchSchema = z.object({ template: z.string() });

export const Route = createFileRoute("/editor/new")({
  validateSearch: searchSchema,
  component: NewEditorPage,
});

function generateSlug(prefix: string) {
  const rand = Math.random().toString(36).slice(2, 8);
  return `${prefix}-${rand}`;
}

function NewEditorPage() {
  const { template: templateId } = Route.useSearch();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const createPage = useCreatePage();

  useEffect(() => {
    if (!user) {
      navigate({ to: "/auth/login" });
      return;
    }

    const plugin = getTemplate(templateId);
    if (!plugin) {
      toast.error("Template not found");
      navigate({ to: "/templates" });
      return;
    }

    async function init() {
      if (!user || !plugin) return;
      try {
        const page = await createPage.mutateAsync({
          user_id: user.id,
          template_id: plugin.manifest.id,
          title: `My ${plugin.manifest.name} page`,
          slug: generateSlug(plugin.manifest.slug),
          blocks: plugin.blocks as unknown as import("@/integrations/supabase/types").Json,
          theme: plugin.theme as unknown as import("@/integrations/supabase/types").Json,
          status: "draft",
          is_public: false,
          content: {},
        });
        navigate({ to: "/editor/$pageId", params: { pageId: page.id } });
      } catch (err) {
        toast.error("Failed to create page. Please try again.");
        navigate({ to: "/templates" });
      }
    }

    init();
  }, [user, templateId]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Setting up your page…</p>
      </div>
    </div>
  );
}
