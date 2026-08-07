import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Template = Database["public"]["Tables"]["templates"]["Row"];

export function useTemplates(opts?: {
  category?: string;
  search?: string;
  sort?: "trending" | "newest" | "rating" | "price_asc" | "price_desc";
  isPremium?: boolean;
  limit?: number;
  offset?: number;
}) {
  return useQuery({
    queryKey: ["templates", opts],
    queryFn: async () => {
      let q = supabase
        .from("templates")
        .select("*")
        .eq("is_published", true)
        .is("deleted_at", null);

      if (opts?.category && opts.category !== "all") {
        // Join through categories
        const { data: cat } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", opts.category)
          .maybeSingle();
        if (cat) q = q.eq("category_id", cat.id);
      }
      if (opts?.search) {
        q = q.or(`name.ilike.%${opts.search}%,tagline.ilike.%${opts.search}%,tags.cs.{${opts.search}}`);
      }
      if (opts?.isPremium !== undefined) q = q.eq("is_premium", opts.isPremium);

      if (opts?.sort === "newest") q = q.order("created_at", { ascending: false });
      else if (opts?.sort === "rating") q = q.order("rating_avg", { ascending: false });
      else if (opts?.sort === "price_asc") q = q.order("price_cents", { ascending: true });
      else if (opts?.sort === "price_desc") q = q.order("price_cents", { ascending: false });
      else q = q.order("views_count", { ascending: false }); // trending default

      if (opts?.limit) q = q.limit(opts.limit);
      if (opts?.offset) q = q.range(opts.offset, (opts.offset ?? 0) + (opts.limit ?? 12) - 1);

      const { data, error } = await q;
      if (error) throw error;
      return data as Template[];
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useTemplate(idOrSlug: string) {
  return useQuery({
    queryKey: ["template", idOrSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*, categories(*), template_media(*)")
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .is("deleted_at", null)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!idOrSlug,
  });
}

export function useFeaturedTemplates() {
  return useQuery({
    queryKey: ["templates", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("templates")
        .select("*")
        .eq("is_published", true)
        .eq("is_featured", true)
        .is("deleted_at", null)
        .order("sort_order")
        .limit(8);
      if (error) throw error;
      return data as Template[];
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("is_active", true)
        .is("deleted_at", null)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useFavorites(userId: string | undefined) {
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("favorites")
        .select("template_id")
        .eq("user_id", userId);
      if (error) throw error;
      return data.map((f) => f.template_id);
    },
    enabled: !!userId,
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ templateId, userId, isFav }: { templateId: string; userId: string; isFav: boolean }) => {
      if (isFav) {
        await supabase.from("favorites").delete().eq("template_id", templateId).eq("user_id", userId);
      } else {
        await supabase.from("favorites").insert({ template_id: templateId, user_id: userId });
      }
    },
    onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ["favorites", v.userId] }),
  });
}
