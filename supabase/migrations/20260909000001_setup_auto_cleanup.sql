-- ============================================================
-- AUTOMATIC CLEANUP CRON JOB
-- Runs daily to delete expired pages
-- ============================================================

-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily cleanup at 2 AM
SELECT cron.schedule(
  'cleanup-expired-pages',
  '0 2 * * *', -- Every day at 2 AM
  $$SELECT public.cleanup_expired_pages()$$
);

-- Alternative: Use Supabase Edge Functions for cleanup
-- If pg_cron is not available, create an edge function instead

COMMENT ON EXTENSION pg_cron IS 'Job scheduler for automatic cleanup of expired pages';
