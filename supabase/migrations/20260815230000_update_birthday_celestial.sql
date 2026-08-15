-- ============================================================================
-- UPDATE BIRTHDAY TEMPLATE: BIRTHDAY MAGICAL -> BIRTHDAY CELESTIAL
-- ============================================================================

-- Insert or update the Birthday Celestial template record
INSERT INTO public.templates (
  id, plugin_id, slug, name, tagline, description, category_id,
  tags, price_cents, plan_kind, is_premium, is_published, is_featured,
  cover_url, preview_video_url, rating_avg, rating_count, uses_count, views_count, sort_order
) VALUES (
  'a9b0c1d2-e3f4-5678-9abc-def012345678',
  'birthday-celestial',
  'birthday-celestial',
  'Birthday Celestial',
  'A 15-chapter cinematic romantic galaxy celebration',
  'A 15-chapter cinematic romantic galaxy celebration featuring interactive mic-blow candle cake, love quiz, polaroid memory wall, love letter, and celestial surprises.',
  (SELECT id FROM public.categories WHERE slug = 'birthday' LIMIT 1),
  ARRAY['birthday','celestial','galaxy','cinematic','interactive','romantic','love','cake','quiz','memories','letter','gift','premium'],
  2999,
  'one_time',
  true,
  true,
  true,
  '/templates/birthday-celestial/images/couple-galaxy.webp',
  NULL,
  0,
  0,
  0,
  0,
  10
)
ON CONFLICT (id) DO UPDATE SET
  plugin_id = EXCLUDED.plugin_id,
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags,
  price_cents = EXCLUDED.price_cents,
  is_premium = EXCLUDED.is_premium,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  cover_url = EXCLUDED.cover_url,
  sort_order = EXCLUDED.sort_order;

-- Update pages content if referencing old slug
UPDATE public.pages
SET content = jsonb_set(
  jsonb_set(content, '{_template_id}', '"birthday-celestial"'),
  '{templateId}', '"birthday-celestial"'
)
WHERE template_id = 'a9b0c1d2-e3f4-5678-9abc-def012345678'
  AND (content->>'_template_id' = 'birthday-magical' OR content->>'templateId' = 'birthday-magical');
