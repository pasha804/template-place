/**
 * slug-utils.ts — Slug sanitization, reserved words protection, and unique slug resolution.
 */
import { supabase } from "@/integrations/supabase/client";

export const RESERVED_SLUGS = new Set([
  "admin",
  "dashboard",
  "auth",
  "login",
  "signup",
  "checkout",
  "editor",
  "p",
  "pricing",
  "contact",
  "api",
  "templates",
  "blog",
  "demo",
]);

/**
 * Converts a raw string to a clean, lowercase, URL-safe slug.
 */
export function sanitizeSlug(input: string): string {
  if (!input) return "";
  let slug = input.toLowerCase().trim();

  // Replace spaces and underscores with hyphens
  slug = slug.replace(/[\s_]+/g, "-");

  // Remove non-alphanumeric and non-hyphen characters
  slug = slug.replace(/[^a-z0-9-]/g, "");

  // Remove duplicate hyphens
  slug = slug.replace(/-+/g, "-");

  // Strip leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

/**
 * Checks if a slug is reserved or already taken in Supabase.
 * Returns a guaranteed unique, clean slug.
 */
export async function ensureUniqueSlug(rawSlug: string, currentPageId?: string): Promise<string> {
  let baseSlug = sanitizeSlug(rawSlug);
  if (!baseSlug) baseSlug = "my-page";

  if (RESERVED_SLUGS.has(baseSlug)) {
    baseSlug = `${baseSlug}-page`;
  }

  let candidate = baseSlug;
  let counter = 1;

  while (counter <= 20) {
    try {
      let query = supabase.from("pages").select("id").eq("slug", candidate);
      if (currentPageId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentPageId)) {
        query = query.neq("id", currentPageId);
      }
      const { data, error } = await query.maybeSingle();
      if (!error && !data) {
        return candidate; // Slug is available
      }
    } catch {
      // Network issues or table warning — fallback candidate
    }

    candidate = `${baseSlug}-${counter}`;
    counter++;
  }

  // Fallback to random hash if still taken
  return `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`;
}
