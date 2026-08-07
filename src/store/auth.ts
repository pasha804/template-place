import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setIsAdmin: (v: boolean) => void;
  setLoading: (v: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      isAdmin: false,
      isLoading: true,
      setSession: (session) => set({ session, user: session?.user ?? null }),
      setUser: (user) => set({ user }),
      setIsAdmin: (isAdmin) => set({ isAdmin }),
      setLoading: (isLoading) => set({ isLoading }),
      signOut: () => set({ user: null, session: null, isAdmin: false }),
    }),
    {
      name: "shaukat-auth",
      partialize: (s) => ({ user: s.user, session: s.session }),
      // SSR-safe: localStorage is not available on the server (Vercel/Cloudflare)
      storage: typeof window !== "undefined" ? undefined : { getItem: () => null, setItem: () => {}, removeItem: () => {} },
    },
  ),
);

