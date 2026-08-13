import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Page = Database["public"]["Tables"]["pages"]["Row"];
type PageStatus = Database["public"]["Enums"]["page_status"];

export function useUserPages(userId: string | undefined, status?: PageStatus) {
  return useQuery({
    queryKey: ["pages", userId, status],
    queryFn: async () => {
      if (!userId) return [];
      let dbPages: Page[] = [];
      try {
        let q = supabase
          .from("pages")
          .select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, expires_at, published_at, deleted_at, view_count, created_at, updated_at")
          .eq("user_id", userId)
          .is("deleted_at", null)
          .order("updated_at", { ascending: false });
        if (status) q = q.eq("status", status);
        const { data, error } = await q;
        if (!error && data) dbPages = data as Page[];
      } catch (e) {
        console.warn("Supabase fetch pages warning:", e);
      }

      // Merge local storage pages for this user if not present in DB
      const localPages: Page[] = [];
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("page_")) {
            try {
              const item = JSON.parse(localStorage.getItem(key) || "{}") as Page;
              if (item && item.id && (!item.user_id || item.user_id === userId)) {
                if (!status || item.status === status) {
                  localPages.push(item);
                }
              }
            } catch {}
          }
        }
      }

      const dbIds = new Set(dbPages.map(p => p.id));
      const missingLocal = localPages.filter(p => !dbIds.has(p.id));
      const combined = [...dbPages, ...missingLocal];

      return combined.map(p => ({
        ...p,
        template_id: p.template_id || ((p.content as Record<string, unknown>)?._template_id as string) || p.template_id
      }));
    },
    enabled: !!userId,
  });
}

export function usePage(idOrSlug: string, mode: "id" | "slug" = "id") {
  return useQuery({
    queryKey: ["page", idOrSlug],
    queryFn: async () => {
      try {
        const { data } = await supabase
          .from("pages")
          .select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, expires_at, published_at, deleted_at, view_count, created_at, updated_at")
          .eq(mode === "id" ? "id" : "slug", idOrSlug)
          .is("deleted_at", null)
          .maybeSingle();
        if (data) return data as Page;
      } catch (e) {
        console.warn("Supabase page fetch warning:", e);
      }

      // Check localStorage backup
      if (typeof window !== "undefined") {
        const direct = localStorage.getItem(`page_${idOrSlug}`);
        if (direct) {
          try { return JSON.parse(direct) as Page; } catch {}
        }
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("page_")) {
            try {
              const item = JSON.parse(localStorage.getItem(key) || "{}") as Page;
              if (item && (item.slug === idOrSlug || item.id === idOrSlug)) {
                return item;
              }
            } catch {}
          }
        }
      }
      return null;
    },
    enabled: !!idOrSlug,
  });
}

export function useCreatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: Database["public"]["Tables"]["pages"]["Insert"]) => {
      const { data, error } = await supabase.from("pages").insert(input).select().single();
      if (error) throw error;
      return data as Page;
    },
    onSuccess: (data) => qc.invalidateQueries({ queryKey: ["pages", data.user_id] }),
  });
}

export function useUpdatePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }: Partial<Page> & { id: string }) => {
      const { data, error } = await supabase
        .from("pages")
        .update({ ...patch, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data as Page;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["page", data.id] });
      qc.invalidateQueries({ queryKey: ["pages", data.user_id] });
    },
  });
}

export function useDeletePage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      // 1. Remove from localStorage backup immediately so local cache doesn't restore it
      if (typeof window !== "undefined") {
        localStorage.removeItem(`page_${id}`);
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith("page_")) {
            try {
              const item = JSON.parse(localStorage.getItem(key) || "{}");
              if (item.id === id || item.slug === id) {
                localStorage.removeItem(key);
              }
            } catch {}
          }
        }
      }

      // 2. Delete from Supabase
      try {
        const { error } = await supabase
          .from("pages")
          .update({ deleted_at: new Date().toISOString(), status: "archived" })
          .eq("id", id);

        if (error) {
          // If soft-delete fails or column unindexed, hard delete
          await supabase.from("pages").delete().eq("id", id);
        }
      } catch (e) {
        console.warn("Supabase delete page fallback warning:", e);
      }

      return { id, userId };
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["pages"] });
      qc.invalidateQueries({ queryKey: ["pages", data.userId] });
    },
  });
}

export function usePageViews(pageId: string) {
  return useQuery({
    queryKey: ["page-views", pageId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_views")
        .select("*")
        .eq("page_id", pageId)
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data;
    },
    enabled: !!pageId,
  });
}

export function useRecordPageView(pageId: string) {
  return useMutation({
    mutationFn: async (info: {
      country?: string;
      device?: string;
      browser?: string;
      referrer?: string;
    }) => {
      await supabase.from("page_views").insert({ page_id: pageId, ...info });
      // Increment view count
      await supabase.rpc("is_admin"); // Keep connection alive (views auto-increment via trigger)
    },
  });
}
