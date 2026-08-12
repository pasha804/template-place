-- ============================================================================
-- POPULATE EXTERNAL TEMPLATES
-- Inserts all 16 external template plugins into the templates table
-- This fixes the FK constraint issue where pages.template_id references templates.id
-- ============================================================================

-- ============================================================================
-- POPULATE EXTERNAL TEMPLATES
-- Inserts all 16 external template plugins into the templates table
-- This fixes the FK constraint issue where pages.template_id references templates.id
-- 
-- ⚠️ UUID COLLISIONS FIXED:
-- birthday-galaxy: OLD b2c3d4e5-f6a7-8901-bcde-f23456789012 → NEW b2c3d4e5-f6a7-8901-bcde-f12345678901
-- birthday-rose: OLD c3d4e5f6-a7b8-9012-cdef-345678901234 → NEW c3d4e5f6-a7b8-9012-cdef-345678901111
-- sorry-sweet: OLD c3d4e5f6-a7b8-9012-cdef-345678901234 → NEW c3d4e5f6-a7b8-9012-cdef-345678902222
-- ============================================================================

-- STEP 1: Temporarily disable FK constraints to allow data cleanup
ALTER TABLE public.pages DROP CONSTRAINT IF EXISTS pages_template_id_fkey;
ALTER TABLE public.order_items DROP CONSTRAINT IF EXISTS order_items_template_id_fkey;

-- STEP 2: Fix pages that reference OLD UUIDs to use NEW UUIDs
-- This is necessary because the old UUIDs had collisions

-- Fix birthday-rose pages (OLD uuid was shared with sorry-sweet)
-- We need to check the page content to determine which template it really is
UPDATE public.pages 
SET template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901111'
WHERE template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  AND (content->>'_template_id' = 'birthday-rose' OR content->>'templateId' = 'birthday-rose');

-- Fix sorry-sweet pages (OLD uuid was shared with birthday-rose)
UPDATE public.pages 
SET template_id = 'c3d4e5f6-a7b8-9012-cdef-345678902222'
WHERE template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  AND (content->>'_template_id' = 'sorry-sweet' OR content->>'templateId' = 'sorry-sweet');

-- Fix birthday-galaxy pages (OLD uuid was shared with sorry-apology)
UPDATE public.pages 
SET template_id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901'
WHERE template_id = 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  AND (content->>'_template_id' = 'birthday-galaxy' OR content->>'templateId' = 'birthday-galaxy');

-- sorry-apology keeps its OLD uuid (it's the first one with that uuid, so it's correct)
-- No update needed for sorry-apology pages

-- STEP 2b: Fix order_items that reference OLD UUIDs
-- Match order_items to their pages to determine correct template

-- Fix birthday-rose order items (via page join)
UPDATE public.order_items oi
SET template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901111'
FROM public.pages p
WHERE oi.page_id = p.id
  AND oi.template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  AND p.template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901111';

-- Fix sorry-sweet order items (via page join)
UPDATE public.order_items oi
SET template_id = 'c3d4e5f6-a7b8-9012-cdef-345678902222'
FROM public.pages p
WHERE oi.page_id = p.id
  AND oi.template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234'
  AND p.template_id = 'c3d4e5f6-a7b8-9012-cdef-345678902222';

-- Fix birthday-galaxy order items (via page join)
UPDATE public.order_items oi
SET template_id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901'
FROM public.pages p
WHERE oi.page_id = p.id
  AND oi.template_id = 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  AND p.template_id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';

-- STEP 3: Insert or update all 16 templates with correct UUIDs
-- This will insert new templates and update existing ones

-- Insert all 16 external templates with their ACTUAL manifest UUIDs from index.ts files
INSERT INTO public.templates (id, plugin_id, slug, name, tagline, description, category_id, tags, price_cents, plan_kind, is_premium, is_published, is_featured, cover_url, preview_video_url, rating_avg, rating_count, uses_count, views_count, sort_order)
VALUES
  -- Birthday Templates
  ('a9b0c1d2-e3f4-5678-9abc-def012345678', 'birthday-magical', 'birthday-magical', 'Birthday Magical', 'A 15-chapter cinematic birthday experience unlike anything else', 'A fully interactive, 15-chapter cinematic birthday gift with 3D cake, constellation, scratch cards, gift unboxing, and fireworks finale.', NULL, ARRAY['birthday','cinematic','interactive','3d','webgl','premium'], 2999, 'one_time', true, true, true, '/templates/birthday-magical/images/1.jpeg', NULL, 0, 0, 0, 0, 10),
  
  ('d4e5f6a7-b8c9-0123-def0-456789012345', 'birthday-aurora', 'birthday-aurora', 'Birthday Aurora', 'Aurora-themed birthday celebration', 'Interactive birthday template with aurora borealis effects and magical animations', NULL, ARRAY['birthday','aurora','magical','animated'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 20),
  
  ('e5f6a7b8-c9d0-1234-ef01-567890123456', 'birthday-bloom', 'birthday-bloom', 'Birthday Bloom', 'Floral birthday celebration', 'Beautiful floral-themed birthday template with blooming animations', NULL, ARRAY['birthday','floral','bloom','nature'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 21),
  
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'birthday-galaxy', 'birthday-galaxy', 'Birthday Galaxy', 'Space-themed birthday adventure', 'Cosmic birthday experience with galaxy backgrounds and star animations', NULL, ARRAY['birthday','space','galaxy','cosmic'], 1299, 'one_time', false, true, true, NULL, NULL, 0, 0, 0, 0, 11),
  
  ('c3d4e5f6-a7b8-9012-cdef-345678901111', 'birthday-rose', 'birthday-rose', 'Birthday Rose', 'Elegant rose-themed birthday', 'Sophisticated rose petal birthday template with romantic aesthetics', NULL, ARRAY['birthday','rose','elegant','romantic'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 22),
  
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'birthday-surprise', 'birthday-surprise', 'Birthday Surprise', 'Interactive surprise birthday reveal', 'Exciting surprise-themed birthday with reveal animations and confetti', NULL, ARRAY['birthday','surprise','interactive','celebration'], 1199, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 23),

  -- Anniversary Templates
  ('c1d2e3f4-a5b6-7890-cdef-012345678901', 'anniversary-galaxy', 'anniversary-galaxy', 'Anniversary Galaxy', 'Cosmic anniversary celebration', 'Stellar anniversary template with galaxy themes and romantic star effects', NULL, ARRAY['anniversary','galaxy','romantic','stars'], 1299, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 30),
  
  ('b5c6d7e8-f9a0-1234-bcde-f01234567890', 'anniversary-romantic', 'anniversary-romantic', 'Anniversary Romantic', 'Classic romantic anniversary', 'Timeless romantic anniversary template with hearts and love animations', NULL, ARRAY['anniversary','romantic','love','hearts'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 31),

  -- Sorry Templates
  ('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'sorry-apology', 'sorry-apology', 'Sorry Apology', 'A soft, interactive apology note with a runaway NO button', 'A 7-step interactive apology experience with mood selection, floating hearts, and runaway NO button.', NULL, ARRAY['sorry','apology','interactive','mood','glassmorphism','cute','pink'], 999, 'one_time', false, true, false, '/templates/sorry-apology/please.gif', NULL, 0, 0, 0, 0, 40),
  
  ('c3d4e5f6-a7b8-9012-cdef-345678902222', 'sorry-sweet', 'sorry-sweet', 'Sorry Sweet', 'Sweet and gentle apology', 'Soft and sweet apology template with cute animations and heartfelt messages', NULL, ARRAY['sorry','sweet','cute','gentle'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 41),
  
  ('e5f6a7b8-c9d0-1234-efab-567890123456', 'sorry-teddy', 'sorry-teddy', 'Sorry Teddy', 'Apology with adorable teddy bear', 'Cute teddy bear themed apology with playful animations', NULL, ARRAY['sorry','teddy','cute','playful'], 999, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 42),

  -- Proposal Templates
  ('a0b1c2d3-e4f5-6789-abcd-ef0123456789', 'proposal-cook', 'proposal-cook', 'Proposal Cook', 'Recipe for love proposal', 'Creative cooking-themed marriage proposal with recipe-style storytelling', NULL, ARRAY['proposal','cooking','creative','marriage'], 1999, 'one_time', true, true, false, NULL, NULL, 0, 0, 0, 0, 50),
  
  ('f6a7b8c9-d0e1-2345-fabc-678901234567', 'proposal-romantic', 'proposal-romantic', 'Proposal Romantic', 'Classic romantic proposal', 'Traditional romantic marriage proposal with elegant design and heartfelt moments', NULL, ARRAY['proposal','romantic','marriage','elegant'], 1999, 'one_time', true, true, true, NULL, NULL, 0, 0, 0, 0, 12),

  -- Congratulations Template
  ('d2e3f4a5-b6c7-8901-defa-123456789012', 'congratulations-triumph', 'congratulations-triumph', 'Congratulations Triumph', 'Celebrate achievements and victories', 'Triumphant congratulations template for achievements, graduations, and successes', NULL, ARRAY['congratulations','achievement','success','celebration'], 799, 'one_time', false, true, false, NULL, NULL, 0, 0, 0, 0, 60),

  -- Wedding Templates
  ('e3f4a5b6-c7d8-9012-efab-234567890123', 'wedding-eternal', 'wedding-eternal', 'Wedding Eternal', 'Timeless wedding celebration', 'Eternal love themed wedding template with elegant design and romantic elements', NULL, ARRAY['wedding','eternal','love','elegant'], 2499, 'one_time', true, true, false, NULL, NULL, 0, 0, 0, 0, 70),
  
  ('f4a5b6c7-d8e9-0123-fabc-345678901234', 'wedding-petals', 'wedding-petals', 'Wedding Petals', 'Flower petal wedding theme', 'Romantic wedding template with falling petals and floral aesthetics', NULL, ARRAY['wedding','petals','floral','romantic'], 2499, 'one_time', true, true, false, NULL, NULL, 0, 0, 0, 0, 71)

ON CONFLICT (slug) DO UPDATE SET
  id = EXCLUDED.id,
  plugin_id = EXCLUDED.plugin_id,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  tags = EXCLUDED.tags,
  price_cents = EXCLUDED.price_cents,
  is_premium = EXCLUDED.is_premium,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  updated_at = now();

-- Create index on plugin_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_templates_plugin_id ON public.templates(plugin_id);

-- STEP 3b: Fix any remaining pages/order_items with orphaned UUIDs
-- These are pages that don't have _template_id in content (corrupted data)
-- We'll infer from the page slug which template they should use

-- For the colliding UUID c3d4e5f6-a7b8-9012-cdef-345678901234:
-- If slug contains 'sorry-sweet', it's sorry-sweet (new UUID: ...902222)
-- If slug contains 'birthday-rose', it's birthday-rose (new UUID: ...901111)
-- Otherwise, default to sorry-sweet since that's what the slug pattern suggests

UPDATE public.pages 
SET template_id = CASE
  WHEN slug LIKE '%birthday-rose%' THEN 'c3d4e5f6-a7b8-9012-cdef-345678901111'::uuid
  ELSE 'c3d4e5f6-a7b8-9012-cdef-345678902222'::uuid  -- Default to sorry-sweet
END
WHERE template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234';

-- Fix order_items to match their pages
UPDATE public.order_items oi
SET template_id = p.template_id
FROM public.pages p
WHERE oi.page_id = p.id
  AND oi.template_id = 'c3d4e5f6-a7b8-9012-cdef-345678901234';

-- For the colliding UUID b2c3d4e5-f6a7-8901-bcde-f23456789012:
-- If slug contains 'birthday-galaxy', it's birthday-galaxy (new UUID: ...f12345678901)
-- Otherwise, it's sorry-apology (keeps old UUID: ...f23456789012)

UPDATE public.pages 
SET template_id = CASE
  WHEN slug LIKE '%birthday-galaxy%' THEN 'b2c3d4e5-f6a7-8901-bcde-f12345678901'::uuid
  ELSE 'b2c3d4e5-f6a7-8901-bcde-f23456789012'::uuid  -- sorry-apology keeps this UUID
END
WHERE template_id = 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  AND (content->>'_template_id' IS NULL OR content->>'templateId' IS NULL);

-- Fix order_items for birthday-galaxy
UPDATE public.order_items oi
SET template_id = p.template_id
FROM public.pages p
WHERE oi.page_id = p.id
  AND oi.template_id = 'b2c3d4e5-f6a7-8901-bcde-f23456789012'
  AND p.template_id = 'b2c3d4e5-f6a7-8901-bcde-f12345678901';

-- STEP 4: Re-enable FK constraints
ALTER TABLE public.pages 
ADD CONSTRAINT pages_template_id_fkey 
FOREIGN KEY (template_id) 
REFERENCES public.templates(id) 
ON DELETE SET NULL;

ALTER TABLE public.order_items 
ADD CONSTRAINT order_items_template_id_fkey 
FOREIGN KEY (template_id) 
REFERENCES public.templates(id) 
ON DELETE SET NULL;

-- ============================================================================
-- DIAGNOSTIC QUERY
-- Run this after migration to verify all 16 templates exist:
-- SELECT id, plugin_id, slug, name FROM public.templates ORDER BY slug;
-- ============================================================================
