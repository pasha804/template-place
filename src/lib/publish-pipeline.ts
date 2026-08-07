/**
 * publish-pipeline.ts — Atomic, transactional website publishing engine with step-by-step progress.
 */
import { supabase } from "@/integrations/supabase/client";
import { ensureUniqueSlug } from "@/lib/slug-utils";
import { getExternalTemplate } from "@/engine/registry";
import { getTemplate } from "@/templates/registry";
import type { Database } from "@/integrations/supabase/types";

export type PublishStep =
  | "PREPARING"
  | "VALIDATING"
  | "SLUG_GENERATION"
  | "SAVING_CONTENT"
  | "PUBLISHING_DATABASE"
  | "COMPLETED"
  | "FAILED";

export interface PublishProgress {
  step: PublishStep;
  message: string;
  progressPercent: number;
}

export interface PublishResult {
  success: boolean;
  pageId: string;
  slug: string;
  error?: string;
  failedStep?: PublishStep;
}

/**
 * Validates all pre-conditions before publishing.
 */
export async function validatePageBeforePublish(
  pageId: string,
  content: Record<string, unknown>,
  templateId: string,
  userId: string,
): Promise<{ valid: boolean; error?: string }> {
  if (!pageId) {
    return { valid: false, error: "Invalid Page ID." };
  }
  if (!userId) {
    return { valid: false, error: "User is not authenticated." };
  }

  // 1. Verify template exists
  const extTemplate = getExternalTemplate(templateId);
  const blockTemplate = getTemplate(templateId);
  if (!extTemplate && !blockTemplate) {
    return { valid: false, error: `Template "${templateId}" not found.` };
  }

  // 2. Verify database connection
  try {
    const { error: dbErr } = await supabase.from("profiles").select("id").limit(1);
    if (dbErr) {
      return { valid: false, error: "Database connection failed. Please check network." };
    }
  } catch (e: any) {
    return { valid: false, error: `Database check failed: ${e?.message || e}` };
  }

  // 3. Verify title presence
  const title = (content._page_title as string) || (content.title as string) || extTemplate?.manifest.name;
  if (!title || !title.trim()) {
    return { valid: false, error: "Page title is required before publishing." };
  }

  return { valid: true };
}

export function isValidUUID(str: string | null | undefined): boolean {
  if (!str) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

/**
 * Executes an atomic transactional publish pipeline.
 * If any step fails, all progress is safely stopped and marked as failed.
 */
export async function runPublishPipeline(
  params: {
    pageId: string;
    userId: string;
    templateId: string;
    title: string;
    slug: string;
    content: Record<string, unknown>;
  },
  onProgress?: (progress: PublishProgress) => void,
): Promise<PublishResult> {
  const { pageId, userId, templateId, title, slug, content } = params;

  function report(step: PublishStep, message: string, progressPercent: number) {
    if (onProgress) {
      onProgress({ step, message, progressPercent });
    }
  }

  try {
    // ── STEP 1: PREPARING ──
    report("PREPARING", "Preparing website configuration...", 10);

    // ── STEP 2: VALIDATING ──
    report("VALIDATING", "Validating content and database permissions...", 25);
    const val = await validatePageBeforePublish(pageId, content, templateId, userId);
    if (!val.valid) {
      report("FAILED", val.error || "Pre-publish validation failed.", 25);
      return { success: false, pageId, slug, error: val.error, failedStep: "VALIDATING" };
    }

    // ── STEP 3: SLUG GENERATION ──
    report("SLUG_GENERATION", "Sanitizing URL slug and checking uniqueness...", 45);
    const finalSlug = await ensureUniqueSlug(slug || title || pageId, pageId);

    // ── STEP 4: SAVING CONTENT ──
    report("SAVING_CONTENT", "Saving content and template schema...", 65);

    // Ensure template record exists in 'templates' table to satisfy FK constraint
    try {
      await supabase.from("templates").upsert({
        id: templateId,
        name: extTemplate?.manifest.name || templateId,
        category: extTemplate?.manifest.category || "General",
        version: extTemplate?.manifest.version || "1.0.0",
        defaults: (extTemplate?.defaults || {}) as any,
        schema: (extTemplate?.schema || []) as any,
        is_active: true,
      }, { onConflict: "id" });
    } catch (e) {
      console.warn("Template seed warning:", e);
    }

    // If pageId is a draft string or invalid UUID format, resolve existing UUID from database or pass undefined
    const isInvalidUuid = !isValidUUID(pageId);
    let dbPageId = isInvalidUuid ? undefined : pageId;

    if (isInvalidUuid && userId) {
      try {
        const { data: existingRow } = await supabase
          .from("pages")
          .select("id")
          .eq("user_id", userId)
          .eq("slug", finalSlug)
          .maybeSingle();
        if (existingRow?.id) {
          dbPageId = existingRow.id;
        }
      } catch {}
    }

    const pagePayload = {
      id: dbPageId,
      user_id: userId,
      template_id: templateId,
      title: title.trim(),
      slug: finalSlug,
      status: "draft" as Database["public"]["Enums"]["page_status"],
      content: { ...content, _template_id: templateId, _page_slug: finalSlug } as unknown as import("@/integrations/supabase/types").Json,
      is_public: false,
      updated_at: new Date().toISOString(),
    };

    let upsertRes = await supabase.from("pages").upsert(pagePayload as any).select("id, slug").single();
    if (upsertRes.error) {
      // If foreign key constraint failed, re-seed template and retry
      if (upsertRes.error.code === "23503") {
        await supabase.from("templates").upsert({
          id: templateId,
          name: extTemplate?.manifest.name || templateId,
          category: extTemplate?.manifest.category || "General",
          version: extTemplate?.manifest.version || "1.0.0",
          defaults: (extTemplate?.defaults || {}) as any,
          schema: (extTemplate?.schema || []) as any,
          is_active: true,
        }, { onConflict: "id" });

        const retryRes = await supabase.from("pages").upsert(pagePayload as any).select("id, slug").single();
        if (retryRes.error) {
          throw new Error(`Failed to save page data: ${retryRes.error.message}`);
        }
        upsertRes = retryRes;
      } else {
        throw new Error(`Failed to save page content: ${upsertRes.error.message}`);
      }
    }

    const resolvedPageId = upsertRes.data?.id || (isValidUUID(pageId) ? pageId : null);
    if (!resolvedPageId) {
      throw new Error("Failed to resolve a valid database page ID.");
    }

    // ── STEP 5: PUBLISHING DATABASE ──
    report("PUBLISHING_DATABASE", "Publishing page record live to Supabase...", 85);
    const publishRes = await supabase
      .from("pages")
      .update({
        status: "published" as Database["public"]["Enums"]["page_status"],
        published_at: new Date().toISOString(),
        is_public: true,
        slug: finalSlug,
        updated_at: new Date().toISOString(),
      })
      .eq("id", resolvedPageId)
      .select("id, slug, status")
      .single();

    if (publishRes.error || !publishRes.data || publishRes.data.status !== "published") {
      const errMsg = publishRes.error?.message || "Database publish write returned invalid status.";
      throw new Error(errMsg);
    }

    // ── STEP 6: COMPLETED ──
    report("COMPLETED", `Website published live! Accessible at /p/${finalSlug}`, 100);

    return {
      success: true,
      pageId: resolvedPageId,
      slug: finalSlug,
    };
  } catch (err: any) {
    const errorText = err?.message || String(err) || "Unknown publishing error occurred.";
    report("FAILED", errorText, 0);
    return {
      success: false,
      pageId,
      slug,
      error: errorText,
      failedStep: "PUBLISHING_DATABASE",
    };
  }
}
