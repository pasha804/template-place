import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User, Session } from "@supabase/supabase-js";

const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

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
      storage: createJSONStorage(() => (typeof window !== "undefined" && typeof localStorage !== "undefined" ? localStorage : dummyStorage)),
    },
  ),
);

