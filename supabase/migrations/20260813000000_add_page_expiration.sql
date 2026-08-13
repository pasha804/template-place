-- Add expiration system for published pages (15 days from publish)

-- Add expires_at column to pages table
ALTER TABLE public.pages 
ADD COLUMN IF NOT EXISTS expires_at timestamptz;

-- Create function to set expiration date when page is published
CREATE OR REPLACE FUNCTION set_page_expiration()
RETURNS TRIGGER AS $$
BEGIN
  -- If page status changed to 'published' and it doesn't have an expiration yet
  IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.expires_at IS NULL THEN
    NEW.expires_at = NEW.published_at + interval '15 days';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set expiration when published
DROP TRIGGER IF EXISTS set_page_expiration_trigger ON public.pages;
CREATE TRIGGER set_page_expiration_trigger
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION set_page_expiration();

-- Update existing published pages to have expiration dates
UPDATE public.pages
SET expires_at = published_at + interval '15 days'
WHERE status = 'published' 
  AND published_at IS NOT NULL 
  AND expires_at IS NULL;

-- Create function to delete expired pages
CREATE OR REPLACE FUNCTION delete_expired_pages()
RETURNS void AS $$
BEGIN
  -- Archive expired pages instead of hard delete
  UPDATE public.pages
  SET 
    status = 'expired',
    is_public = false,
    deleted_at = now()
  WHERE status = 'published'
    AND expires_at < now()
    AND expires_at IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- Create index for efficient expiration queries
CREATE INDEX IF NOT EXISTS idx_pages_expires_at ON public.pages(expires_at) 
WHERE expires_at IS NOT NULL AND status = 'published';

-- Add comment
COMMENT ON COLUMN public.pages.expires_at IS 'Timestamp when the published page will expire (15 days after publish)';

-- Create a cron job to run daily at midnight (requires pg_cron extension)
-- NOTE: This requires pg_cron extension to be enabled in Supabase
-- Alternative: Call delete_expired_pages() from your application backend daily

-- Example cron job (uncomment if pg_cron is available):
-- SELECT cron.schedule(
--   'delete-expired-pages-daily',
--   '0 0 * * *', -- Run at midnight every day
--   $$SELECT delete_expired_pages()$$
-- );

-- For Supabase Edge Functions approach, you can call this endpoint daily:
-- POST /functions/v1/cleanup-expired-pages
-- This function should call: SELECT delete_expired_pages();
