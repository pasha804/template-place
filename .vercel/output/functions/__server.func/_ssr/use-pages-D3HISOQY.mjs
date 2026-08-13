import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-pages-D3HISOQY.js
function useUserPages(userId, status) {
	return useQuery({
		queryKey: [
			"pages",
			userId,
			status
		],
		queryFn: async () => {
			if (!userId) return [];
			let dbPages = [];
			try {
				let q = supabase.from("pages").select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, expires_at, published_at, deleted_at, view_count, created_at, updated_at").eq("user_id", userId).is("deleted_at", null).order("updated_at", { ascending: false });
				if (status) q = q.eq("status", status);
				const { data, error } = await q;
				if (!error && data) dbPages = data;
			} catch (e) {
				console.warn("Supabase fetch pages warning:", e);
			}
			const localPages = [];
			if (typeof window !== "undefined") for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key && key.startsWith("page_")) try {
					const item = JSON.parse(localStorage.getItem(key) || "{}");
					if (item && item.id && (!item.user_id || item.user_id === userId)) {
						if (!status || item.status === status) localPages.push(item);
					}
				} catch {}
			}
			const dbIds = new Set(dbPages.map((p) => p.id));
			const missingLocal = localPages.filter((p) => !dbIds.has(p.id));
			return [...dbPages, ...missingLocal].map((p) => ({
				...p,
				template_id: p.template_id || p.content?._template_id || p.template_id
			}));
		},
		enabled: !!userId
	});
}
function usePage(idOrSlug, mode = "id") {
	return useQuery({
		queryKey: ["page", idOrSlug],
		queryFn: async () => {
			try {
				const { data } = await supabase.from("pages").select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, expires_at, published_at, deleted_at, view_count, created_at, updated_at").eq(mode === "id" ? "id" : "slug", idOrSlug).is("deleted_at", null).maybeSingle();
				if (data) return data;
			} catch (e) {
				console.warn("Supabase page fetch warning:", e);
			}
			if (typeof window !== "undefined") {
				const direct = localStorage.getItem(`page_${idOrSlug}`);
				if (direct) try {
					return JSON.parse(direct);
				} catch {}
				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i);
					if (key && key.startsWith("page_")) try {
						const item = JSON.parse(localStorage.getItem(key) || "{}");
						if (item && (item.slug === idOrSlug || item.id === idOrSlug)) return item;
					} catch {}
				}
			}
			return null;
		},
		enabled: !!idOrSlug
	});
}
function useCreatePage() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			const { data, error } = await supabase.from("pages").insert(input).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => qc.invalidateQueries({ queryKey: ["pages", data.user_id] })
	});
}
function useUpdatePage() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, ...patch }) => {
			const { data, error } = await supabase.from("pages").update({
				...patch,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id).select().single();
			if (error) throw error;
			return data;
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ["page", data.id] });
			qc.invalidateQueries({ queryKey: ["pages", data.user_id] });
		}
	});
}
function useDeletePage() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, userId }) => {
			if (typeof window !== "undefined") {
				localStorage.removeItem(`page_${id}`);
				for (let i = localStorage.length - 1; i >= 0; i--) {
					const key = localStorage.key(i);
					if (key && key.startsWith("page_")) try {
						const item = JSON.parse(localStorage.getItem(key) || "{}");
						if (item.id === id || item.slug === id) localStorage.removeItem(key);
					} catch {}
				}
			}
			try {
				const { error } = await supabase.from("pages").update({
					deleted_at: (/* @__PURE__ */ new Date()).toISOString(),
					status: "archived"
				}).eq("id", id);
				if (error) await supabase.from("pages").delete().eq("id", id);
			} catch (e) {
				console.warn("Supabase delete page fallback warning:", e);
			}
			return {
				id,
				userId
			};
		},
		onSuccess: (data) => {
			qc.invalidateQueries({ queryKey: ["pages"] });
			qc.invalidateQueries({ queryKey: ["pages", data.userId] });
		}
	});
}
//#endregion
export { useUserPages as a, useUpdatePage as i, useDeletePage as n, usePage as r, useCreatePage as t };
