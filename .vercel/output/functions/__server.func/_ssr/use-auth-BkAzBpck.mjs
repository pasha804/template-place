import { o as __toESM } from "../_runtime.mjs";
import { n as supabase } from "./client-Dc1BRJHd.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as useAuthStore } from "./auth-Dy4ewPDE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-BkAzBpck.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	const { user, session, isAdmin, isLoading, setSession, setIsAdmin, setLoading, signOut } = useAuthStore();
	(0, import_react.useEffect)(() => {
		let mounted = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			if (data.session?.user) checkAdminRole(data.session.user.id);
			setLoading(false);
		});
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!mounted) return;
			setSession(session);
			if (session?.user) checkAdminRole(session.user.id);
			else setIsAdmin(false);
			setLoading(false);
		});
		return () => {
			mounted = false;
			subscription.unsubscribe();
		};
	}, [
		setSession,
		setIsAdmin,
		setLoading
	]);
	async function checkAdminRole(userId) {
		const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).in("role", ["admin", "moderator"]).maybeSingle();
		setIsAdmin(!!data);
	}
	async function handleSignOut() {
		await supabase.auth.signOut();
		signOut();
	}
	return {
		user,
		session,
		isAdmin,
		isLoading,
		signOut: handleSignOut
	};
}
//#endregion
export { useAuth as t };
