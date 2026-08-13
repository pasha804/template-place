import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/auth';

/**
 * Hook to periodically check and clean up expired pages
 * Runs on the client side as a backup to the server-side cron job
 */
export function useExpirationCleanup() {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  useEffect(() => {
    // Only run for admin users to avoid unnecessary DB calls
    if (!isAdmin) return;

    const checkExpiredPages = async () => {
      try {
        // Call the delete_expired_pages function
        await (supabase.rpc as any)('delete_expired_pages');
        console.log('[Expiration Cleanup] Checked for expired pages');
      } catch (error) {
        console.error('[Expiration Cleanup] Error:', error);
      }
    };

    // Run immediately
    checkExpiredPages();

    // Run every hour
    const interval = setInterval(checkExpiredPages, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isAdmin]);
}
