import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as allExternalTemplates } from "./registry-BOtXfR_2.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/combined-BKJH_seF.js
function useFavorites(userId) {
	return useQuery({
		queryKey: ["favorites", userId],
		queryFn: async () => {
			if (!userId) return [];
			const { data, error } = await supabase.from("favorites").select("template_id").eq("user_id", userId);
			if (error) throw error;
			return data.map((f) => f.template_id);
		},
		enabled: !!userId
	});
}
function useToggleFavorite() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ templateId, userId, isFav }) => {
			if (isFav) await supabase.from("favorites").delete().eq("template_id", templateId).eq("user_id", userId);
			else await supabase.from("favorites").insert({
				template_id: templateId,
				user_id: userId
			});
		},
		onSuccess: (_, v) => qc.invalidateQueries({ queryKey: ["favorites", v.userId] })
	});
}
function fromExternal() {
	return allExternalTemplates.map((p) => ({
		id: p.manifest.id,
		slug: p.manifest.slug,
		name: p.manifest.name,
		tagline: p.manifest.tagline,
		description: p.manifest.description,
		category: p.manifest.category,
		tags: p.manifest.tags,
		priceCents: p.manifest.priceCents,
		isPremium: p.manifest.isPremium,
		coverGradient: p.manifest.coverGradient,
		accentEmoji: p.manifest.accentEmoji,
		features: p.manifest.features,
		thumbnailUrl: p.manifest.thumbnailUrl,
		kind: "external",
		defaultPin: p.manifest.defaultPin,
		pinProtected: p.manifest.pinProtected
	}));
}
var allUnifiedTemplates = [...fromExternal()];
function getUnifiedTemplate(idOrSlug) {
	return allUnifiedTemplates.find((t) => t.id === idOrSlug || t.slug === idOrSlug);
}
//#endregion
export { useToggleFavorite as i, getUnifiedTemplate as n, useFavorites as r, allUnifiedTemplates as t };
