import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/auth";

export function useAuth() {
  const { user, session, isAdmin, isLoading, setSession, setIsAdmin, setLoading, signOut } =
    useAuthStore();

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session?.user) {
        checkAdminRole(data.session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        checkAdminRole(session.user.id);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setSession, setIsAdmin, setLoading]);

  async function checkAdminRole(userId: string) {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .in("role", ["admin", "moderator"])
      .maybeSingle();
    setIsAdmin(!!data);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    signOut();
  }

  return { user, session, isAdmin, isLoading, signOut: handleSignOut };
}
