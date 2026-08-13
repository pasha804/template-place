import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Dy4ewPDE.js
var dummyStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useAuthStore = create()(persist((set) => ({
	user: null,
	session: null,
	isAdmin: false,
	isLoading: true,
	setSession: (session) => set({
		session,
		user: session?.user ?? null
	}),
	setUser: (user) => set({ user }),
	setIsAdmin: (isAdmin) => set({ isAdmin }),
	setLoading: (isLoading) => set({ isLoading }),
	signOut: () => set({
		user: null,
		session: null,
		isAdmin: false
	})
}), {
	name: "shaukat-auth",
	partialize: (s) => ({
		user: s.user,
		session: s.session
	}),
	storage: createJSONStorage(() => typeof window !== "undefined" && typeof localStorage !== "undefined" ? localStorage : dummyStorage)
}));
//#endregion
export { useAuthStore as t };
